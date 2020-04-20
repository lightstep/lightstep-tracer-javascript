//============================================================================//
// Imports
//============================================================================//

import EventEmitter from 'eventemitter3';
import * as opentracing from 'opentracing';

import SpanContextImp from './span_context_imp';
import SpanImp from './span_imp';
import _each from '../_each';
import { Platform, ProtoTransport, ThriftTransport } from '../platform_abstraction_layer';
import AuthImp from './auth_imp';
import RuntimeImp from './runtime_imp';
import ReportImp from './report_imp';
import UnsupportedPropagator from './propagator';
import LightStepPropagator from './propagator_ls';

const ClockState    = require('./util/clock_state');
const LogBuilder    = require('./log_builder');
const coerce        = require('./coerce');
const constants     = require('../constants');
const globals       = require('./globals');
const packageObject = require('../../package.json');
const util          = require('./util/util');

const DEFAULT_COLLECTOR_HOSTNAME   = 'collector.lightstep.com';
const DEFAULT_COLLECTOR_PORT_TLS   = 443;
const DEFAULT_COLLECTOR_PORT_PLAIN = 80;
const DEFAULT_COLLECTOR_PATH       = '';

// Internal errors should be rare. Set a low limit to ensure a cascading failure
// does not compound an existing problem by trying to send a great deal of
// internal error data.
const MAX_INTERNAL_LOGS = 20;

let _singleton = null;

export default class Tracer extends opentracing.Tracer {
    constructor(opts) {
        super();

        this._delegateEventEmitterMethods();

        opts = opts || {};

        if (!_singleton) {
            globals.setOptions(opts);
            _singleton = this;
        }

        // Platform abstraction layer
        this._platform = new Platform(this);
        this._runtimeGUID = opts.guid || this.override_runtime_guid || null; // Set once the group name is set
        this._plugins = {};
        this._options = {};
        this._optionDescs = [];
        this._makeOptionsTable();

        this._opentracing = opentracing;
        if (opts.opentracing_module) {
            this._opentracing = opts.opentracing_module;
        }

        let now = this._platform.nowMicros();

        // The thrift authentication and runtime struct are created as soon as
        // the necessary initialization options are available.
        this._startMicros = now;
        this._auth = null;
        this._runtime = null;

        let logger = {
            warn  : (msg, payload) => { this._warn(msg, payload); },
            error : (err, payload) => { this._error(err, payload); },
        };

        if (opts) {
            this._transport = opts.override_transport;
        }

        this._propagators = {};
        this._propagators[this._opentracing.FORMAT_HTTP_HEADERS] = new LightStepPropagator(this);
        this._propagators[this._opentracing.FORMAT_TEXT_MAP] = new LightStepPropagator(this);
        this._propagators[this._opentracing.FORMAT_BINARY] = new UnsupportedPropagator(this,
            this._opentracing.FORMAT_BINARY);

        if (opts && opts.propagators) {
            this._propagators = { ...this._propagators, ...opts.propagators };
        }


        this._reportingLoopActive = false;
        this._first_report_has_run = false;
        this._reportYoungestMicros = now;
        this._reportTimer = null;
        this._reportErrorStreak = 0; // Number of consecutive errors
        this._lastVisibleErrorMillis = 0;
        this._skippedVisibleErrors = 0;


        // Set addActiveRootSpan() for detail
        this._activeRootSpanSet = {};
        this._activeRootSpan = null;

        // Span reporting buffer and per-report data
        // These data are reset on every successful report.
        this._spanRecords = [];

        // The counter names need to match those accepted by the collector.
        // These are internal counters only.
        this._counters = {
            'internal.errors'        : 0,
            'internal.warnings'      : 0,
            'spans.dropped'          : 0,
            'logs.dropped'           : 0,
            'logs.keys.over_limit'   : 0,
            'logs.values.over_limit' : 0,
            'reports.errors.send'    : 0,
        };

        // For internal (not client) logs reported to the collector
        this._internalLogs = [];

        // Current runtime state / status
        this._flushIsActive = false;

        // Built-in plugins
        this.addPlugin(require('../plugins/log_to_console'));

        // Initialize the platform options after the built-in plugins in
        // case any of those options affect the built-ins.
        this.addPlatformPlugins(opts);
        this.setPlatformOptions(opts);

        // Set constructor arguments
        if (opts) {
            this.options(opts);
        }

        if (typeof this._transport === 'undefined' || this._transport === null) {
            switch (this._options.transport) {
            case 'proto':
                this._transport = new ProtoTransport(logger);
                this._info('Using protobuf over HTTP transport per user-defined option.');
                break;
            case 'thrift':
                this._transport = new ThriftTransport(logger);
                this._info('Using thrift transport per user-defined option.');
                break;
            default:
                this._transport = new ProtoTransport(logger);
                this._info('Using protobuf over HTTP transport as no user-defined option was supplied.');
            }
        }

        // For clock skew adjustment.
        // Must be set after options have been set.
        this._useClockState = !this._options.disable_clock_skew_correction;
        this._clockState = new ClockState({
            nowMicros     : () => this._platform.nowMicros(),
            localStoreGet : () => {
                let key = `clock_state/${this._options.collector_host}`;
                return this._platform.localStoreGet(key);
            },
            localStoreSet : (value) => {
                let key = `clock_state/${this._options.collector_host}`;
                return this._platform.localStoreSet(key, value);
            },
        });

        // This relies on the options being set: call this last.
        this._setupReportOnExit();

        this._info(`Tracer created with guid ${this._runtimeGUID}`);

        if (this._options.access_token.length === 0) {
            this._warn(
                `Access token not set -
            this requires a satellite with access token checking disabled,
            such as a developer satellite.`,
            );
        }

        this.startPlugins();
    }

    // Morally speaking, Tracer also inherits from EventEmmiter, but we must
    // fake it via composition.
    //
    // If not obvious on inspection: a hack.
    _delegateEventEmitterMethods() {
        let self = this;
        this._ee = new EventEmitter();
        // The list of methods at https://nodejs.org/api/events.html
        _each([
            'addListener',
            'emit',
            'eventNames',
            'getMaxListeners',
            'listenerCount',
            'listeners',
            'on',
            'once',
            'prependListener',
            'prependOnceListener',
            'removeAllListeners',
            'removeListener',
            'setMaxListeners',
        ], (methodName) => {
            self[methodName] = function () {
                if (self._ee[methodName]) {
                    // eslint-disable-next-line prefer-spread
                    self._ee[methodName].apply(self._ee, arguments);
                }
            };
        });
    }

    _makeOptionsTable() {
        /* eslint-disable key-spacing, no-multi-spaces */

        // NOTE: make 'verbosity' the first option so it is processed first on
        // options changes and takes effect as soon as possible.
        this.addOption('verbosity',             {
            type : 'int', min: 0, max: 9, defaultValue: 1,
        });

        // Core options
        this.addOption('access_token',          { type: 'string',  defaultValue: '' });
        this.addOption('component_name',        { type: 'string',  defaultValue: '' });
        this.addOption('collector_host',        { type: 'string',  defaultValue: DEFAULT_COLLECTOR_HOSTNAME });
        this.addOption('collector_port',        { type: 'int',     defaultValue: DEFAULT_COLLECTOR_PORT_TLS });
        this.addOption('collector_path',        { type: 'string',  defaultValue: DEFAULT_COLLECTOR_PATH });
        this.addOption('collector_encryption',  { type: 'string',  defaultValue: 'tls' });
        this.addOption('tags',                  { type: 'any',     defaultValue: {} });
        this.addOption('max_reporting_interval_millis',  { type: 'int',     defaultValue: 2500 });
        this.addOption('disable_clock_skew_correction', { type: 'bool', defaultValue: false });
        this.addOption('transport',             { type: 'string', defaultValue: 'proto' });

        // Non-standard, may be deprecated
        this.addOption('disabled',              { type: 'bool',    defaultValue: false });
        this.addOption('max_span_records',      { type: 'int',     defaultValue: 4096 });
        this.addOption('default_span_tags',     { type: 'any',     defaultValue: {} });
        this.addOption('report_timeout_millis', { type: 'int',     defaultValue: 30000 });
        this.addOption('gzip_json_requests',    { type: 'bool',    defaultValue: true });
        this.addOption('disable_reporting_loop', { type: 'bool',    defaultValue: false });
        this.addOption('disable_report_on_exit', { type: 'bool',    defaultValue: false });
        this.addOption('delay_initial_report_millis', { type: 'int', defaultValue: 1000 });
        this.addOption('error_throttle_millis', { type: 'int',     defaultValue: 60000 });
        this.addOption('logger',                { type: 'function', defaultValue: this._printToConsole.bind(this) });
        this.addOption('clear_span_buffer_consecutive_errors',
            { type: 'int', defaultValue: null });

        // Debugging options
        //
        // These are not part of the supported public API.
        //
        // If false, SSL certificate verification is skipped. Useful for testing.
        this.addOption('certificate_verification',      { type: 'bool',    defaultValue: true });
        // I.e. report only on explicit calls to flush()

        // Unit testing options
        this.addOption('override_transport',            { type : 'any',    defaultValue: null });
        this.addOption('silent',                        { type : 'bool',   defaultValue: false });

        // Hard upper limits to protect against worst-case scenarios for log field sizes.
        this.addOption('log_field_key_hard_limit',   { type: 'int',     defaultValue: 256 });
        this.addOption('log_field_value_hard_limit', { type: 'int',     defaultValue: 1024 });

        // Meta Event reporting options
        this.addOption('disable_meta_event_reporting', { type: 'bool', defaultValue: false });

        /* eslint-disable key-spacing, no-multi-spaces */
    }

    // ---------------------------------------------------------------------- //
    // opentracing.Tracer SPI
    // ---------------------------------------------------------------------- //

    _startSpan(name, fields) {
        // First, assemble the SpanContextImp for our SpanImp.
        let parentCtxImp = null;
        fields = fields || {};
        if (fields.references) {
            for (let i = 0; i < fields.references.length; i++) {
                let ref = fields.references[i];
                let type = ref.type();
                if (type === this._opentracing.REFERENCE_CHILD_OF
                    || type === this._opentracing.REFERENCE_FOLLOWS_FROM) {
                    let context = ref.referencedContext();
                    if (!context) {
                        this._error('Span reference has an invalid context', context);
                        // eslint-disable-next-line no-continue
                        continue;
                    }
                    parentCtxImp = context;
                    break;
                }
            }
        }

        let traceGUID = parentCtxImp ? parentCtxImp.traceGUID() : this.generateTraceGUIDForRootSpan();
        let sampled = parentCtxImp ? parentCtxImp._sampled : true;
        let spanCtx = new SpanContextImp(this._platform.generateUUID(), traceGUID, sampled);
        let spanImp = new SpanImp(this, name, spanCtx);
        spanImp.addTags(this._options.default_span_tags);

        _each(fields, (value, key) => {
            switch (key) {
            case 'references':
                // Ignore: handled before constructing the span
                break;
            case 'startTime':
                // startTime is in milliseconds
                spanImp.setBeginMicros(Math.floor(value * 1000));
                break;
            case 'tags':
                spanImp.addTags(value);
                break;
            default:
                this._warn(`Ignoring unknown field '${key}'`);
                break;
            }
        });

        if (parentCtxImp !== null) {
            spanImp.setParentGUID(parentCtxImp._guid);

            // Copy baggage items from parent to child
            parentCtxImp.forEachBaggageItem((k, v) => spanCtx.setBaggageItem(k, v));
        }

        this.emit('start_span', spanImp);

        if (util.shouldSendMetaSpan(this.options(), spanImp.getTags())) {
            this.startSpan(constants.LS_META_SP_START,
                {
                    tags : {
                        [constants.LS_META_EVENT_KEY]: true,
                        [constants.LS_META_TRACE_KEY]: spanImp.traceGUID(),
                        [constants.LS_META_SPAN_KEY]: spanImp.guid(),
                    },
                })
                .finish();
        }
        return spanImp;
    }

    _inject(spanContext, format, carrier) {
        if (this.options().meta_event_reporting === true) {
            this.startSpan(constants.LS_META_INJECT,
                {
                    tags: {
                        [constants.LS_META_EVENT_KEY]: true,
                        [constants.LS_META_TRACE_KEY]: spanContext._traceGUID,
                        [constants.LS_META_SPAN_KEY]: spanContext._guid,
                        [constants.LS_META_PROPAGATION_KEY]: format,
                    },
                })
                .finish();
        }
        switch (format) {
        case this._opentracing.FORMAT_HTTP_HEADERS:
            this._propagators[this._opentracing.FORMAT_HTTP_HEADERS].inject(spanContext, carrier);
            break;
        case this._opentracing.FORMAT_TEXT_MAP:
            this._propagators[this._opentracing.FORMAT_TEXT_MAP].inject(spanContext, carrier);
            break;
        case this._opentracing.FORMAT_BINARY:
            this._propagators[this._opentracing.FORMAT_BINARY].inject(spanContext, carrier);
            break;
        default:
            this._error(`Unknown format: ${format}`);
            break;
        }
    }

    _extract(format, carrier) {
        let sc = null;
        switch (format) {
        case this._opentracing.FORMAT_HTTP_HEADERS:
            sc = this._propagators[this._opentracing.FORMAT_HTTP_HEADERS].extract(carrier);
            break;
        case this._opentracing.FORMAT_TEXT_MAP:
            sc = this._propagators[this._opentracing.FORMAT_TEXT_MAP].extract(carrier);
            break;
        case this._opentracing.FORMAT_BINARY:
            sc = this._propagators[this._opentracing.FORMAT_BINARY].extract(carrier);
            break;
        default:
            this._error(`Unsupported format: ${format}`);
            return null;
        }
        if (this.options().meta_event_reporting === true && sc) {
            this.startSpan(constants.LS_META_EXTRACT,
                {
                    tags: {
                        [constants.LS_META_EVENT_KEY]: true,
                        [constants.LS_META_TRACE_KEY]: sc._traceGUID,
                        [constants.LS_META_SPAN_KEY]: sc._guid,
                        [constants.LS_META_PROPAGATION_KEY]: format,
                    },
                })
                .finish();
        }
        return sc;
    }

    // ---------------------------------------------------------------------- //
    // LightStep extensions
    // ---------------------------------------------------------------------- //

    /**
     * Manually sends a report of all buffered data.
     *
     * @param  {Function} done - callback function invoked when the report
     *         either succeeds or fails.
     */
    flush(done) {
        if (!done) {
            done = function () {};
        }
        if (this._options.disabled) {
            this._warn('Manual flush() called in disabled state.');
            return done(null);
        }
        this._flushReport(true, false, done);
    }

    //-----------------------------------------------------------------------//
    // Options
    //-----------------------------------------------------------------------//

    guid() {
        return this._runtimeGUID;
    }

    verbosity() {
        // The 'undefined' handling below is for logs that may occur before the
        // options are initialized.
        let v = this._options.verbosity;
        return (v === undefined) ? 1 : v;
    }

    // Call to generate a new Trace GUID
    generateTraceGUIDForRootSpan() {
        let guid = this._platform.generateUUID();
        if (this._activeRootSpan) {
            guid = this._activeRootSpan.traceGUID();
        }
        return guid;
    }

    setPlatformOptions(userOptions) {
        let opts = this._platform.options(this) || {};
        _each(userOptions, (val, key) => {
            opts[key] = val;
        });
        this.options(opts);
    }

    // Register a new option.  Used by plug-ins.
    addOption(name, desc) {
        desc.name = name;
        this._optionDescs.push(desc);
        this._options[desc.name] = desc.defaultValue;
    }

    options(opts) {
        if (arguments.length === 0) {
            console.assert(typeof this._options === 'object',   // eslint-disable-line
                'Internal error: _options field incorrect');
            return this._options;
        }
        if (typeof opts !== 'object') {
            throw new Error(`options() must be called with an object: type was ${typeof opts}`);
        }

        // "collector_port" 0 acts as an alias for "use the default".
        if (opts.collector_port === 0) {
            delete opts.collector_port;
        }

        // "collector_encryption" acts an alias for the common cases of 'collector_port'
        if (opts.collector_encryption !== undefined && opts.collector_port === undefined) {
            opts.collector_port = opts.collector_encryption !== 'none'
                ? DEFAULT_COLLECTOR_PORT_TLS
                : DEFAULT_COLLECTOR_PORT_PLAIN;
        }
        // set meta event reporting to false by default, it will be enabled by the satellite
        this.meta_event_reporting = false;

        // Track what options have been modified
        let modified = {};
        let unchanged = {};
        _each(this._optionDescs, (desc) => {
            this._setOptionInternal(modified, unchanged, opts, desc);
        });

        // Check for any invalid options: is there a key in the specified operation
        // that didn't result either in a change or a reset to the existing value?
        Object.keys(opts).forEach((key) => {
            if (modified[key] === undefined && unchanged[key] === undefined) {
                this._warn(`Invalid option ${key} with value ${opts[key]}`);
            }
        });

        //
        // Update the state information based on the changes
        //
        this._initReportingDataIfNeeded(modified);

        if (!this._reportingLoopActive) {
            this._startReportingLoop();
        }

        if (this.verbosity() >= 3) {
            let optionsString = '';
            let count = 0;
            _each(modified, (val, key) => {
                optionsString += `\t${JSON.stringify(key)}: ${JSON.stringify(val.newValue)}\n`;
                count++;
            });
            if (count > 0) {
                this._debug(`Options modified:\n${optionsString}`);
            }
        }
        this.emit('options', modified, this._options, this);
    }

    _setOptionInternal(modified, unchanged, opts, desc) {
        let { name } = desc;
        let value = opts[name];
        let valueType = typeof value;
        if (value === undefined) {
            return;
        }

        // Parse the option (and check constraints)
        switch (desc.type) {
        case 'any':
            break;

        case 'bool':
            if (value !== true && value !== false) {
                this._error(`Invalid boolean option '${name}' '${value}'`);
                return;
            }
            break;

        case 'function':
            if (typeof value !== 'function') {
                this._error(`Invalid function option '${name}' '${value}'`);
                return;
            }
            break;

        case 'int':
            if (valueType !== 'number' || Math.floor(value) !== value) {
                this._error(`Invalid int option '${name}' '${value}'`);
                return;
            }
            if (desc.min !== undefined && desc.max !== undefined) {
                if (!(value >= desc.min && value <= desc.max)) {
                    this._error(`Option '${name}' out of range '${value}' is not between ${desc.min} and ${desc.max}`);  // eslint-disable-line max-len
                    return;
                }
            }
            break;

        case 'string':
            switch (valueType) {
            case 'string':
                break;
            case 'number':
                value = coerce.toString(value);
                break;
            default:
                this._error(`Invalid string option ${name} ${value}`);
                return;
            }
            break;

        case 'array':
            // Per http://stackoverflow.com/questions/4775722/check-if-object-is-array
            if (Object.prototype.toString.call(value) !== '[object Array]') {
                this._error(`Invalid type for array option ${name}: found '${valueType}'`);
                return;
            }
            break;

        default:
            this._error(`Unknown option type '${desc.type}'`);
            return;
        }

        // Set the new value, recording any modifications
        let oldValue = this._options[name];
        if (oldValue === undefined) {
            throw new Error(`Attempt to set unknown option ${name}`);
        }

        // Ignore no-op changes for types that can be checked quickly
        if (valueType !== 'object' && oldValue === value) {
            unchanged[name] = true;
            return;
        }

        modified[name] = {
            oldValue : oldValue,
            newValue : value,
        };
        this._options[name] = value;
    }

    // The authorization and runtime information is initialized as soon
    // as it is available.  This allows logs and spans to be buffered before
    // the library is initialized, which can be helpul in a complex setup with
    // many subsystems.
    //
    _initReportingDataIfNeeded(modified) {
        // Ignore redundant initialization; complaint on inconsistencies
        if (this._auth !== null) {
            if (!this._runtime) {
                return this._error('Inconsistent state: auth initialized without runtime.');
            }
            if (modified.access_token) {
                throw new Error('Cannot change access_token after it has been set.');
            }
            if (modified.component_name) {
                throw new Error('Cannot change component_name after it has been set.');
            }
            if (modified.collector_host) {
                throw new Error('Cannot change collector_host after the connection is established');
            }
            if (modified.collector_port) {
                throw new Error('Cannot change collector_port after the connection is established');
            }
            if (modified.collector_path) {
                throw new Error('Cannot change collector_path after the connection is established');
            }
            if (modified.collector_encryption) {
                throw new Error('Cannot change collector_encryption after the connection is established');
            }
            return;
        }

        this._runtimeGUID = this._platform.runtimeGUID(this._options.component_name);

        this._auth = new AuthImp(this._options.access_token);

        //
        // Assemble the tracer tags from the user-specified and automatic,
        // internal tags.
        //
        let tags = {};
        _each(this._options.tags, (value, key) => {
            if (typeof value !== 'string') {
                this._error(`Tracer tag value is not a string: key=${key}`);
                return;
            }
            tags[key] = value;
        });
        tags['lightstep.tracer_version'] = packageObject.version;
        let platformTags = this._platform.tracerTags();
        _each(platformTags, (val, key) => {
            tags[key] = val;
        });

        this._runtime = new RuntimeImp(this._runtimeGUID, this._startMicros, this._options.component_name, tags);

        this._info('Initializing reporting data', {
            component_name : this._options.component_name,
            access_token   : this._auth.getAccessToken(),
        });
        this.emit('reporting_initialized');
    }

    getLogFieldKeyHardLimit() {
        return this._options.log_field_key_hard_limit;
    }

    getLogFieldValueHardLimit() {
        return this._options.log_field_value_hard_limit;
    }

    //-----------------------------------------------------------------------//
    // Plugins
    //-----------------------------------------------------------------------//

    addPlatformPlugins(opts) {
        let pluginSet = this._platform.plugins(opts);
        _each(pluginSet, (val) => {
            this.addPlugin(val);
        });
    }

    addPlugin(plugin) {
        // Don't add plug-ins twice
        let name = plugin.name();
        if (this._plugins[name]) {
            return;
        }

        this._plugins[name] = plugin;
        plugin.addOptions(this);
    }

    startPlugins() {
        _each(this._plugins, (val, key) => {
            this._plugins[key].start(this);
        });
    }

    //-----------------------------------------------------------------------//
    // Spans
    //-----------------------------------------------------------------------//

    // This is a LightStep-specific feature that should be used sparingly. It
    // sets a "global" root span such that spans that would *otherwise* be root
    // span instead inherit the trace GUID of the active root span. This is
    // best clarified by example:
    //
    // On document load in the browser, an "active root span" is created for
    // the page load process. Any spans started without an explicit parent
    // will the document load trace GUID instead of starting a trace GUID.
    // This implicit root remains active only until the page is done loading.
    //
    // Any span adding itself as a root span *must* remove itself along with
    // calling finish(). This will *not* be done automatically.
    //
    // NOTE: currently, only the trace GUID is transferred; it may or may not
    // make sure to make this a proper parent.
    //
    // NOTE: the root span tracking is handled as a set rather than a single
    // global to avoid conflicts between libraries.
    addActiveRootSpan(span) {
        this._activeRootSpanSet[span._guid] = span;
        this._setActiveRootSpanToYoungest();
    }

    removeActiveRootSpan(span) {
        delete this._activeRootSpanSet[span._guid];
        this._setActiveRootSpanToYoungest();
    }

    _setActiveRootSpanToYoungest() {
        // Set the _activeRootSpan to the youngest of the roots in case of
        // multiple.
        this._activeRootSpan = null;
        _each(this._activeRootSpanSet, (span) => {
            if (!this._activeRootSpan
                || span._beginMicros > this._activeRootSpan._beginMicros) {
                this._activeRootSpan = span;
            }
        });
    }

    //-----------------------------------------------------------------------//
    // Encoding / decoding
    //-----------------------------------------------------------------------//

    _objectToUint8Array(obj) {
        let jsonString;
        try {
            // encodeURIComponent() is a *very* inefficient, but simple and
            // well-supported way to avoid having to think about Unicode in
            // in the conversion to a UInt8Array.
            //
            // Writing multiple bytes for String.charCodeAt and
            // String.codePointAt would be an alternate approach; again,
            // simplicitly is being preferred over efficiency for the moment.
            jsonString = encodeURIComponent(JSON.stringify(obj));
        } catch (e) {
            this._error('Could not binary encode carrier data.');
            return null;
        }

        let buffer = new ArrayBuffer(jsonString.length);
        let view = new Uint8Array(buffer);
        for (let i = 0; i < jsonString.length; i++) {
            let code = jsonString.charCodeAt(i);
            if (!(code >= 0 && code <= 255)) {
                this._error('Unexpected character code');
                return null;
            }
            view[i] = code;
        }
        return view;
    }

    _uint8ArrayToObject(arr) {
        if (!arr) {
            this._error('Array is null');
            return null;
        }

        let jsonString = '';
        for (let i = 0; i < arr.length; i++) {
            jsonString += String.fromCharCode(arr[i]);
        }
        try {
            return JSON.parse(decodeURIComponent(jsonString));
        } catch (e) {
            this._error('Could not decode binary data.');
            return null;
        }
    }

    //-----------------------------------------------------------------------//
    // Logging
    //-----------------------------------------------------------------------//

    log() {
        let b = new LogBuilder(this);
        return b;
    }

    //-----------------------------------------------------------------------//
    // Buffers
    //-----------------------------------------------------------------------//

    _clearBuffers() {
        this._spanRecords = [];
        this._internalLogs = [];

        // Create a new object to avoid overwriting the values in any references
        // to the old object
        let counters = {};
        _each(this._counters, (unused, key) => {
            counters[key] = 0;
        });
        this._counters = counters;
    }

    _buffersAreEmpty() {
        if (this._spanRecords.length > 0) {
            return false;
        }
        if (this._internalLogs.length > 0) {
            return false;
        }

        let countersAllZero = true;
        _each(this._counters, (val) => {
            if (val > 0) {
                countersAllZero = false;
            }
        });
        return countersAllZero;
    }

    _addSpanRecord(record) {
        this._internalAddSpanRecord(record);
        this.emit('span_added', record);
    }

    _internalAddSpanRecord(record) {
        if (!record) {
            this._error('Attempt to add null record to buffer');
            return;
        }

        if (this._spanRecords.length >= this._options.max_span_records) {
            let index = Math.floor(this._spanRecords.length * Math.random());
            this._spanRecords[index] = record;
            this._counters['spans.dropped']++;
        } else {
            this._spanRecords.push(record);
        }
    }

    _restoreRecords(spans, internalLogs, counters) {
        _each(spans, (span) => {
            this._internalAddSpanRecord(span);
        });

        let currentInternalLogs = this._internalLogs;
        this._internalLogs = [];
        let toAdd = internalLogs.concat(currentInternalLogs);
        _each(toAdd, (log) => {
            this._pushInternalLog(log);
        });

        _each(counters, (value, key) => {
            if (key in this._counters) {
                this._counters[key] += value;
            } else {
                this._error(`Bad counter name: ${key}`);
            }
        });
    }

    /**
     * clearSpanRecordsIfMaxErrors checks to see if the tracer was configured to
     * empty the span buffer after a fixed amount of errors. If it is configured,
     * and there has been an error streak equal to the configured value,
     * it will empty spanRecords and record that the spans were dropped.
     *
     * @private
     */
    _clearSpanRecordsIfMaxErrors() {
        const maxErrorsToEmpty = this.options().clear_span_buffer_consecutive_errors;
        if (maxErrorsToEmpty === null || this._reportErrorStreak < maxErrorsToEmpty) {
            return;
        }

        // spanRecords is configured to be emptied
        // the number of dropped spans and reporting errors should still be maintained since
        // the loop may still in the process of a report.
        const numSpansToDrop = this._spanRecords.length;
        this._counters['spans.dropped'] += numSpansToDrop;
        this._spanRecords = [];

        this._warn('Span buffer flushed, max consecutive errors reached', {
            max_consecutive_errors: maxErrorsToEmpty,
            spans_dropped: numSpansToDrop,
        });
    }

    //-----------------------------------------------------------------------//
    // Reporting loop
    //-----------------------------------------------------------------------//

    _setupReportOnExit() {
        if (this._options.disable_report_on_exit) {
            this._debug('report-on-exit is disabled.');
            return;
        }

        // Do a final explicit flush. Note that the final flush may enqueue
        // asynchronous callbacks that cause the 'beforeExit' event to be
        // re-emitted when those callbacks finish.
        let finalFlushOnce = 0;
        let finalFlush = () => {
            if (finalFlushOnce++ > 0) { return; }
            this._info('Final flush before exit.');
            this._flushReport(false, true, (err) => {
                if (err) {
                    this._warn('Final report before exit failed', {
                        error                  : err,
                        unflushed_spans        : this._spanRecords.length,
                        buffer_youngest_micros : this._reportYoungestMicros,
                    });
                }
            });
        };
        this._platform.onBeforeExit(finalFlush);
    }

    _startReportingLoop() {
        if (this._options.disabled) {
            this._info('Not starting reporting loop: instrumentation is disabled.');
            return;
        }
        if (this._options.disable_reporting_loop) {
            this._info('Not starting reporting loop: reporting loop is disabled.');
            return;
        }
        if (this._auth === null) {
            // Don't start the loop until the thrift data necessary to do the
            // report is set up.
            return;
        }
        if (this._reportingLoopActive) {
            this._info('Reporting loop already started!');
            return;
        }

        this._info('Starting reporting loop:', this._runtime);
        this._reportingLoopActive = true;

        // Stop the reporting loop so the Node.js process does not become a
        // zombie waiting for the timers.
        let stopReportingOnce = 0;
        let stopReporting = () => {
            if (stopReportingOnce++ > 0) { return; }
            this._stopReportingLoop();
        };
        this._platform.onBeforeExit(stopReporting);

        // Begin the asynchronous reporting loop
        let loop = () => {
            this._enqueueNextReport((err) => {
                if (this._reportingLoopActive) {
                    loop();
                }
            });
        };

        const delay = Math.floor(Math.random() * this._options.delay_initial_report_millis);
        util.detachedTimeout(() => {
            loop();
        }, delay);
    }

    _stopReportingLoop() {
        this._debug('Stopping reporting loop');

        this._reportingLoopActive = false;
        clearTimeout(this._reportTimer);
        this._reportTimer = null;
    }

    _enqueueNextReport(done) {
        // If there's already a report request enqueued, ignore this new
        // request.
        if (this._reportTimer) {
            return;
        }

        // If the clock state is still being primed, potentially use the
        // shorted report interval.
        //
        // However, do not use the shorter interval in the case of an error.
        // That does not provide sufficient backoff.
        let reportInterval = this._options.max_reporting_interval_millis;
        if (this._reportErrorStreak === 0
            && this._useClockState
            && !this._clockState.isReady()) {
            reportInterval = Math.min(constants.CLOCK_STATE_REFRESH_INTERVAL_MS, reportInterval);
        }

        // After 3 consecutive errors, expand the retry delay up to 8x the
        // normal interval, jitter the delay by +/- 25%, and be sure to back off
        // *at least* the standard reporting interval in the case of an error.
        let backOff = 1 + Math.min(7, Math.max(0, this._reportErrorStreak));
        let basis = backOff * reportInterval;
        let jitter = 1.0 + (Math.random() * 0.5 - 0.25);
        let delay = Math.floor(Math.max(0, jitter * basis));

        this._debug(`Delaying next flush for ${delay}ms`);
        this._reportTimer = util.detachedTimeout(() => {
            this._reportTimer = null;
            this._flushReport(false, false, done);
        }, delay);
    }

    /**
     * Internal worker for a flush of buffered data into a report.
     *
     * @param  {bool} manual - this is a manually invoked flush request. Don't
     *         override this call with a clock state syncing flush, for example.
     * @param  {bool} detached - this is an "at exit" flush that should not block
     *         the calling process in any manner. This is specifically called
     *         "detached" due to the browser use case where the report is done,
     *         not just asynchronously, but as a script request that continues
     *         to run even if the page is navigated away from mid-request.
     * @param  {function} done - standard callback function called on success
     *         or error.
     */
    _flushReport(manual, detached, done) {
        done = done || function (err) {};

        let clockReady = this._clockState.isReady();
        let clockOffsetMicros = this._clockState.offsetMicros();

        // Diagnostic information on the clock correction
        this._debug('time correction state', {
            offset_micros  : clockOffsetMicros,
            active_samples : this._clockState.activeSampleCount(),
            ready          : clockReady,
        });

        let spanRecords = this._spanRecords;
        let counters = this._counters;
        let internalLogs = this._internalLogs;

        // If the clock is not ready, do an "empty" flush to build more clock
        // samples before the real data is reported.
        // A detached flush (i.e. one intended to fire at exit or other "last
        // ditch effort" event) should always use the real data.
        if (this._useClockState && !manual && !clockReady && !detached) {
            this._debug('Flushing empty report to prime clock state');
            spanRecords = [];
            counters    = {};
            internalLogs = [];
        } else {
            // Early out if we can.
            if (this._buffersAreEmpty()) {
                this._debug('Skipping empty report');
                return done(null);
            }

            // Clear the object buffers as the data is now in the local
            // variables
            this._clearBuffers();
            this._debug(`Flushing report (${spanRecords.length} spans)`);
        }

        this._transport.ensureConnection(this._options);

        // Ensure the runtime GUID is set as it is possible buffer logs and
        // spans before the GUID is necessarily set.
        console.assert(this._runtimeGUID !== null, 'No runtime GUID for Tracer'); // eslint-disable-line no-console

        let timestampOffset = this._useClockState ? clockOffsetMicros : 0;
        let now = this._platform.nowMicros();
        let report = new ReportImp(this._runtime, this._reportYoungestMicros, now,
            spanRecords, internalLogs, counters, timestampOffset);

        this.emit('prereport', report);
        let originMicros = this._platform.nowMicros();

        if (this._options.meta_event_reporting && !this._first_report_has_run) {
            this._first_report_has_run = true;
            this.startSpan(constants.LS_META_TRACER_CREATE, {
                tags: {
                    [constants.LS_META_EVENT_KEY]: true,
                    [constants.LS_META_TRACER_GUID_KEY]: this._runtimeGUID,
                },
            }).finish();
        }

        this._transport.report(detached, this._auth, report, (err, res) => {
            let destinationMicros = this._platform.nowMicros();
            let reportWindowSeconds = (now - report.oldest_micros) / 1e6;

            if (err) {
                // How many errors in a row? Influences the report backoff.
                this._reportErrorStreak++;

                // On a failed report, re-enqueue the data that was going to be
                // sent.
                let errString;
                if (err.message) {
                    errString = `${err.message}`;
                } else {
                    errString = `${err}`;
                }
                this._warn(`Error in report: ${errString}`, {
                    last_report_seconds_ago : reportWindowSeconds,
                });

                this._restoreRecords(
                    report.getSpanRecords(),
                    report.getInternalLogs(),
                    report.getCounters(),
                );

                // Increment the counter *after* the counters are restored
                this._counters['reports.errors.send']++;

                this._clearSpanRecordsIfMaxErrors();

                this.emit('report_error', err, {
                    error    : err,
                    streak   : this._reportErrorStreak,
                    detached : detached,
                });
            } else {
                if (this.verbosity() >= 4) {
                    this._debug(`Report flushed for last ${reportWindowSeconds} seconds`, {
                        spans_reported : report.getSpanRecords().length,
                    });
                }

                // Update internal data after the successful report
                this._reportErrorStreak = 0;
                this._reportYoungestMicros = now;

                // Update the clock state if there's info from the report
                if (res) {
                    if (res.timing && res.timing.receive_micros && res.timing.transmit_micros) {
                        // Handle thrift transport timing response.
                        this._clockState.addSample(
                            originMicros,
                            res.timing.receive_micros,
                            res.timing.transmit_micros,
                            destinationMicros,
                        );
                    } else if (res.receiveTimestamp && res.transmitTimestamp) {
                        // Handle protobuf transport timing response.
                        this._clockState.addSample(
                            originMicros,
                            res.receiveTimestamp.seconds * 1e6 + res.receiveTimestamp.nanos / 1e3,
                            res.transmitTimestamp.seconds * 1e6 + res.transmitTimestamp.nanos / 1e3,
                            destinationMicros,
                        );
                    } else {
                        // The response does not have timing information. Disable
                        // the clock state assuming there'll never be timing data
                        // to use.
                        this._useClockState = false;
                    }

                    if (res.errors && res.errors.length > 0) {
                        // Handle thrift errors.
                        this._warn('Errors in report', res.errors);
                    } else if (res.errorsList && res.errorsList.length > 0) {
                        // Handle protobuf errors.
                        this._warn('Errors in report', res.errorsList);
                    }

                    if (res.commandsList && res.commandsList.length > 0) {
                        // Handle both thrift and protobuf commands response.
                        if (res.commandsList[0].devMode && this.options().disable_meta_event_reporting !== true) {
                            this.options().meta_event_reporting = true;
                        }
                    }
                } else {
                    this._useClockState = false;
                }

                this.emit('report', report, res);
            }
            return done(err);
        });
    }

    //-----------------------------------------------------------------------//
    // Stats and metrics
    //-----------------------------------------------------------------------//

    /**
     * Internal API that returns some internal metrics.
     */
    stats() {
        return {
            counters : this._counters,
        };
    }

    //-----------------------------------------------------------------------//
    // Internal logging & errors
    //-----------------------------------------------------------------------//
    // The rules for how internal logs are processed:
    //
    // * Internal logs that are included in the Collector report:
    //      - Always send errors logs along with the reports
    //      - Never include any other logs
    // * Internal logs that are echoed to the host application:
    //      - See the README.md :)
    //
    _debug(msg, payload) {
        if (this.verbosity() < 4) {
            return;
        }
        this._options.logger('debug', msg, payload);
    }

    _info(msg, payload) {
        if (this.verbosity() < 3) {
            return;
        }
        this._options.logger('info', msg, payload);
    }

    _warn(msg, payload) {
        this._counters['internal.warnings']++;

        if (this.verbosity() < 3) {
            return;
        }
        this._options.logger('warn', msg, payload);
    }

    _error(msg, payload) {
        this._counters['internal.errors']++;

        // Internal errors are always reported to the collector
        let record = this.log()
            .level(constants.LOG_ERROR)
            .message(msg)
            .payload(payload)
            .record();
        this._pushInternalLog(record);

        // Internal errors are reported to the host console conditionally based
        // on the verbosity level.
        let verbosity = this.verbosity();
        if (verbosity === 0) {
            return;
        }

        // Error messages are throttled in verbosity === 1 mode
        const now = Date.now();
        if (verbosity === 1) {
            const nextVisible = this._lastVisibleErrorMillis + this._options.error_throttle_millis;
            if (now < nextVisible) {
                this._skippedVisibleErrors++;
                return;
            }
            if (this._skippedVisibleErrors > 0) {
                /* eslint-disable max-len */
                const s = `${this._skippedVisibleErrors} errors masked since last logged error. Increase 'verbosity' option to see all errors.`;
                /* eslint-enable max-len */
                this._options.logger('error', s, payload);
            }
        }

        this._options.logger('error', msg, payload);
        this._lastVisibleErrorMillis = now;
        this._skippedVisibleErrors = 0;
    }

    _printToConsole(level, msg, payload) {
        let method = 'log';
        let message = `[LightStep:INFO] ${msg}`;
        if (level === 'debug') {
            method = 'log';
            message = `[LightStep:DEBUG] ${msg}`;
        } else if (level === 'info') {
            method = 'log';
            message = `[LightStep:INFO] ${msg}`;
        } else if (level === 'warn') {
            method = 'warn';
            message = `[LightStep:WARN] ${msg}`;
        } else if (level === 'error') {
            method = 'error';
            message = `[LightStep:ERROR] ${msg}`;
        }

        // Internal option to silence intentional errors generated by the unit
        // tests.
        if (this._options.silent) {
            return;
        }

        if (payload !== undefined) {
            console[method](message, payload); // eslint-disable-line no-console
        }  else {
            console[method](message); // eslint-disable-line no-console
        }
    }

    _pushInternalLog(record) {
        if (!record) {
            return;
        }
        if (this._internalLogs.length >= MAX_INTERNAL_LOGS) {
            record.message = `MAX_INTERNAL_LOGS limit hit. Last error: ${record.message}`;
            this._internalLogs[this._internalLogs.length - 1] = record;
        } else {
            this._internalLogs.push(record);
        }
    }
}
