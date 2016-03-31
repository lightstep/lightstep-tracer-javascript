//============================================================================//
// Imports
//============================================================================//

import OpenTracing from 'opentracing';
import EventEmitter from 'eventemitter3';
import { Platform, Transport, crouton_thrift } from '../platform_abstraction_layer';    // eslint-disable-line camelcase
import SpanImp from './span_imp';
import globals from './globals';

const constants     = require('../constants');
const coerce        = require('./coerce');
const util          = require('./util/util');
const LogBuilder    = require('./log_builder');
const ClockState    = require('./util/clock_state');
const packageObject = require('../../package.json');

const CARRIER_TRACER_STATE_PREFIX = 'ot-tracer-';
const CARRIER_BAGGAGE_PREFIX = 'ot-baggage-';

const DEFAULT_COLLECTOR_HOSTNAME   = 'collector.lightstep.com';
const DEFAULT_COLLECTOR_PORT_TLS   = 443;
const DEFAULT_COLLECTOR_PORT_PLAIN = 80;

export default class TracerImp extends EventEmitter {

    constructor(opts) {
        super();
        opts = opts || {};

        this._interface = null;

        // Platform abstraction layer
        this._platform = new Platform(this);
        this._runtimeGUID = opts.guid || this.override_runtime_guid || null;  // Set once the group name is set
        this._plugins = {};
        this._options = {};
        this._optionDescs = [];

        this._makeOptionsTable();

        let now = this._platform.nowMicros();

        // The thrift authentication and runtime struct are created as soon as
        // the necessary initialization options are available.
        this._startMicros = now;
        this._thriftAuth = null;
        this._thriftRuntime = null;
        this._transport = (opts ? opts.override_transport : null) || new Transport();

        this._reportingLoopActive = false;
        this._reportYoungestMicros = now;
        this._reportTimer = null;
        this._reportErrorStreak = 0;    // Number of consecuetive errors
        this._visibleErrorCount = 0;

        // Set addActiveRootSpan() for detail
        this._activeRootSpanSet = {};
        this._activeRootSpan = null;

        // For clock skew adjustment.
        this._useClockState = true;
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

        // Report buffers and per-report data
        // These data are reset on every successful report.
        this._logRecords = [];
        this._spanRecords = [];
        this._counters = {
            dropped_logs       : 0,
            dropped_spans      : 0,
            flush_with_no_data : 0,
            flush_errors       : 0,
            flush_exceptions   : 0,
        };

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
    }

    _makeOptionsTable() {
        /* eslint-disable key-spacing, no-multi-spaces */

        // Core options
        this.addOption('access_token',          { type: 'string',  defaultValue: '' });
        this.addOption('group_name',            { type: 'string',  defaultValue: '' });
        this.addOption('collector_host',        { type: 'string',  defaultValue: DEFAULT_COLLECTOR_HOSTNAME });
        this.addOption('collector_port',        { type: 'int',     defaultValue: DEFAULT_COLLECTOR_PORT_TLS });
        this.addOption('collector_encryption',  { type: 'string',  defaultValue: 'tls' });
        this.addOption('tags',                  { type: 'any',     defaultValue: {} });
        this.addOption('max_reporting_interval_millis',  { type: 'int',     defaultValue: 2500 });

        // Non-standard, may be deprecated
        this.addOption('disabled',              { type: 'bool',    defaultValue: false });
        this.addOption('max_log_records',       { type: 'int',     defaultValue: 4096 });
        this.addOption('max_span_records',      { type: 'int',     defaultValue: 4096 });
        this.addOption('join_ids',              { type: 'any',     defaultValue: {} });

        // Debugging options
        //
        // These are not part of the supported public API.
        //
        // If false, SSL certificate verification is skipped. Useful for testing.
        this.addOption('certificate_verification',      { type: 'bool',    defaultValue: true });
        // If true, internal logs will be included in the reports
        this.addOption('debug',                         { type: 'bool',    defaultValue: false });
        // I.e. report only on explicit calls to flush()
        this.addOption('disable_reporting_loop',        { type: 'bool',    defaultValue: false });
        // Log verbosity level
        this.addOption('verbose',               { type : 'int', min: 0, max: 9, defaultValue: 0 });

        // Unit testing options
        this.addOption('override_transport',    { type : 'any',    defaultValue: null });
        this.addOption('silent',                { type : 'bool',   defaultValue: false });

        // Hard upper limits to protect against worst-case scenarios
        this.addOption('log_message_length_hard_limit', { type: 'int',     defaultValue: 512 * 1024 });
        this.addOption('log_payload_length_hard_limit', { type: 'int',     defaultValue: 512 * 1024 });

        /* eslint-disable key-spacing, no-multi-spaces */
    }

    // ---------------------------------------------------------------------- //
    // OpenTracing API
    // ---------------------------------------------------------------------- //

    setInterface(tracerInterface) {
        this._interface = tracerInterface;
        this.startPlugins();
    }

    newTracer(opts) {
        // Inherit all options of the global tracer unless explicitly specified
        // otherwise
        opts = opts || {};
        for (let key in globals.options) {
            if (opts[key] === undefined) {
                opts[key] = globals.options[key];
            }
        }
        return new TracerImp(opts);
    }

    startSpan(fields) {
        let spanImp = new SpanImp(this);
        spanImp.setFields(fields);

        this.emit('start_trace', spanImp);
        return spanImp;
    }

    inject(span, format, carrier) {
        switch (format) {
        case OpenTracing.FORMAT_TEXT_MAP:
            this._injectToTextMap(span, carrier);
            break;

        // The binary encoding here is optimized for correctness and uniformity
        // across platforms: it is currently not efficient.
        case OpenTracing.FORMAT_BINARY:
            carrier.buffer = this._objectToUint8Array(this._injectToTextMap(span, {}));
            break;

        default:
            this._error(`Unknown format: ${format}`);
            break;
        }
    }

    _injectToTextMap(span, carrier) {
        let baggage = span.getBaggage();
        let traceGUID = span.traceGUID();

        carrier[`${CARRIER_TRACER_STATE_PREFIX}spanid`] = span.guid();
        if (traceGUID) {
            carrier[`${CARRIER_TRACER_STATE_PREFIX}traceid`] = traceGUID;
        }
        carrier[`${CARRIER_TRACER_STATE_PREFIX}sampled`] = 'true';
        for (let key in baggage) {
            carrier[`${CARRIER_BAGGAGE_PREFIX}${key}`] = baggage[key];
        }
        return carrier;
    }

    join(operationName, format, carrier) {
        // Simplify the logic by converting the binary carrier to a split text
        // carrier.
        if (format === OpenTracing.FORMAT_BINARY) {
            format = OpenTracing.FORMAT_TEXT_MAP;
            carrier = this._uint8ArrayToObject(carrier.buffer);
        }

        // Create the empty, raw span
        let span = new SpanImp(this);
        span.setOperationName(operationName);

        switch (format) {

            // Iterate over the contents of the carrier and set the properties
            // accordingly.
        case OpenTracing.FORMAT_TEXT_MAP:
            for (let key in carrier) {
                let value = carrier[key];
                if (key.substr(0, CARRIER_TRACER_STATE_PREFIX.length) !== CARRIER_TRACER_STATE_PREFIX) {
                    continue;
                }
                let suffix = key.substr(CARRIER_TRACER_STATE_PREFIX.length);

                switch (suffix) {
                case 'traceid':
                    span.setFields({ trace_guid : value });
                    break;
                case 'spanid':
                    // Transfer the carrier's "span_guid" to be the parent of this
                    // new span
                    span.setFields({ parent_guid : value });
                    break;
                default:
                    this._error('Unrecognized carrier key with recognized prefix. Ignoring.');
                    break;
                }
            }
            for (let key in carrier) {
                let value = carrier[key];
                if (key.substr(0, CARRIER_BAGGAGE_PREFIX.length) !== CARRIER_BAGGAGE_PREFIX) {
                    continue;
                }
                let suffix = key.substr(CARRIER_BAGGAGE_PREFIX.length);
                span.setBaggageItem(suffix, value);
            }
            break;

        default:
            this._error(`Unknown format: ${format}`);
            break;
        }

        return span;
    }

    flush(done) {
        if (arguments.length === 0) {
            done = function () {};
        }
        this._flushReport(false, done);
    }

    //-----------------------------------------------------------------------//
    // Options
    //-----------------------------------------------------------------------//

    guid() {
        return this._runtimeGUID;
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
        if (userOptions) {
            for (let key in userOptions) {
                opts[key] = userOptions[key];
            }
        }
        this.options(opts);
    }

    // Register a new option.  Used by plug-ins.
    addOption(name, desc) {
        this._infoV(2, `Adding options ${name} with value = ${desc.defaultValue}`);

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
            opts.collector_port = opts.collector_encryption !== 'none' ?
                DEFAULT_COLLECTOR_PORT_TLS :
                DEFAULT_COLLECTOR_PORT_PLAIN;
        }

        // Track what options have been modified
        let modified = {};
        let unchanged = {};
        for (let key in this._optionDescs) {
            const desc = this._optionDescs[key];
            this._setOptionInternal(modified, unchanged, opts, desc);
        }

        // Check for any invalid options: is there a key in the specified operation
        // that didn't result either in a change or a reset to the existing value?
        for (let key in opts) {
            if (modified[key] === undefined && unchanged[key] === undefined) {
                throw new Error(`Invalid option ${key}`);
            }
        }

        //
        // Update the state information based on the changes
        //
        this._initReportingDataIfNeeded(modified);

        if (!this._reportingLoopActive) {
            this._startReportingLoop();
        }

        if (this._options.debug) {
            let optionsString = '';
            for (let key in modified) {
                let val = modified[key];
                optionsString += `\t${JSON.stringify(key)} : ${JSON.stringify(val)}`;
            }
            this._infoV(2, `Options modified:\n${optionsString}`);
        }
        this.emit('options', modified, this._options);
    }

    _setOptionInternal(modified, unchanged, opts, desc) {
        let name = desc.name;
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
                this._warnOnce(`Invalid boolean option '${name}' '${value}'`);
                return;
            }
            break;

        case 'int':
            if (valueType !== 'number' || Math.floor(value) !== value) {
                this._warnOnce(`Invalid int option '${name}' '${value}'`);
                return;
            }
            if (desc.min !== undefined && desc.max !== undefined) {
                if (!(value >= desc.min && value <= desc.max)) {
                    this._warnOnce(`Option '${name}' out of range '${value}' is not between ${desc.min} and ${desc.max}`);  // eslint-disable-line max-len
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
                this._warnOnce(`Invalid string option ${name} ${value}`);
                return;
            }
            break;

        case 'array':
            // Per http://stackoverflow.com/questions/4775722/check-if-object-is-array
            if (Object.prototype.toString.call(value) !== '[object Array]') {
                this._warnOnce(`Invalid type for array option ${name}: found '${valueType}'`);
                return;
            }
            break;

        default:
            this._warnOnce(`Unknown option type '${desc.type}'`);
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

    // The Thrift authorization and runtime information is initializaed as soon
    // as it is available.  This allows logs and spans to be buffered before
    // the library is initialized, which can be helpul in a complex setup with
    // many subsystems.
    //
    _initReportingDataIfNeeded(modified) {
        // Ignore redundant initialization; complaint on inconsistencies
        if (this._thriftAuth !== null) {
            if (!this._thriftRuntime) {
                return this._error('Inconsistent state: thrift auth initialized without runtime.');
            }
            if (modified.access_token) {
                throw new Error('Cannot change access_token after it has been set.');
            }
            if (modified.group_name) {
                throw new Error('Cannot change group_name after it has been set.');
            }
            if (modified.collector_host) {
                throw new Error('Cannot change collector_host after the connection is established');
            }
            if (modified.collector_port) {
                throw new Error('Cannot change collector_port after the connection is established');
            }
            if (modified.collector_encryption) {
                throw new Error('Cannot change collector_encryption after the connection is established');
            }
            return;
        }

        // See if the Thrift data can be initialized
        if (this._options.access_token.length > 0 && this._options.group_name.length > 0) {
            this._infoV(2, 'Initializing thrift reporting data');

            this._runtimeGUID = this._platform.runtimeGUID(this._options.group_name);

            this._thriftAuth = new crouton_thrift.Auth({
                access_token : this._options.access_token,
            });

            //
            // Assemble the tracer tags from the user-specified and automatic,
            // internal tags.
            //
            let tags = {};
            for (let key in this._options.tags) {
                let value = this._options.tags[key];
                if (typeof value !== 'string') {
                    this._warnOnce(`Tracer tag value is not a string: key=${key}`);
                    continue;
                }
                tags[key] = value;
            }
            tags.lightstep_tracer_version = packageObject.version;
            let platformTags = this._platform.tracerTags();
            for (let key in platformTags) {
                tags[key] = platformTags[key];
            }

            let thriftAttrs = [];
            for (let key in tags) {
                thriftAttrs.push(new crouton_thrift.KeyValue({
                    Key   : coerce.toString(key),
                    Value : coerce.toString(tags[key]),
                }));
            }
            this._thriftRuntime = new crouton_thrift.Runtime({
                guid         : this._runtimeGUID,
                start_micros : this._startMicros,
                group_name   : this._options.group_name,
                attrs        : thriftAttrs,
            });

            this.emit('reporting_initialized');
        }
    }

    //-----------------------------------------------------------------------//
    // Plugins
    //-----------------------------------------------------------------------//

    addPlatformPlugins(opts) {
        let pluginSet = this._platform.plugins(opts);
        for (let key in pluginSet) {
            this.addPlugin(pluginSet[key]);
        }
    }

    addPlugin(plugin) {
        // Don't initialize plug-ins twice
        let name = plugin.name();
        if (this._plugins[name]) {
            return;
        }
        this._plugins[name] = plugin;
    }

    startPlugins() {
        for (let key in this._plugins) {
            this._plugins[key].start(this._interface, this);
        }
    }

    //-----------------------------------------------------------------------//
    // Spans
    //-----------------------------------------------------------------------//

    // This is a LightStep-specific feature that should be sparingly. It sets
    // a "global" root span such that spans that would *otherwise* be root span
    // instead inherit the trace GUID of the active root span. This is best
    // clarified by example:
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
        for (let guid in this._activeRootSpanSet) {
            let span = this._activeRootSpanSet[guid];
            if (!this._activeRootSpan ||
                span._beginMicros > this._activeRootSpan._beginMicros) {
                this._activeRootSpan = span;
            }
        }
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

    logStable(stableName, payload) {
        this.log()
            .name(stableName)
            .payload(payload)
            .end();
    }

    // Create a thrift log record and add it to the internal buffer
    logDetail(level, spanGUID, msg, payload) {
        let log = this.log()
            .level(level)
            .span(spanGUID)
            .message(msg);
        if (payload !== undefined) {
            log.payload(payload);
        }
        log.end();
    }

    //-----------------------------------------------------------------------//
    // Buffers
    //-----------------------------------------------------------------------//

    _clearBuffers() {
        this._logRecords = [];
        this._spanRecords = [];

        for (let key in this._counters) {
            this._counters[key] = 0;
        }
    }

    _buffersAreEmpty() {
        if (this._logRecords.length > 0) {
            return false;
        }
        if (this._spanRecords.length > 0) {
            return false;
        }
        for (let key in this._counters) {
            if (this._counters[key] > 0) {
                return false;
            }
        }
        return true;
    }

    // Adds a completed record into the log buffer
    _addLogRecord(record) {
        // Check record content against the hard-limits
        if (record.message && record.message.length > this._options.log_message_length_hard_limit) {
            let truncated = record.message.substr(0, this._options.log_message_length_hard_limit - 1);
            record.message = `${truncated}…`;
        }
        if (record.payload_json && record.payload_json.length > this._options.log_payload_length_hard_limit) {
            record.payload_json = '{"error":"payload exceeded maximum size"}';
        }

        this._internalAddLogRecord(record);
        this.emit('log_added', record);

        if (record.level === constants.LOG_FATAL) {
            this._platform.fatal(record.message);
        }
    }

    // Internal worker for adding the log record to the buffer.
    //
    // Note: this is also used when a failed report needs to restores records
    // back to the buffer, therefore it should not do things like echo the
    // log message to the console with the assumption this is a new record.
    _internalAddLogRecord(record) {
        if (!record) {
            this._error('Attempt to add null record to buffer');
            return;
        }

        if (this._logRecords.length >= this._options.max_log_records) {
            let index = Math.floor(this._logRecords.length * Math.random());
            this._logRecords[index] = record;
            this._counters.dropped_logs++;
        } else {
            this._logRecords.push(record);
        }
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
            this._counters.dropped_spans++;
        } else {
            this._spanRecords.push(record);
        }
    }

    _restoreRecords(logs, spans, counters) {
        for (let key in logs) {
            this._internalAddLogRecord(logs[key]);
        }
        for (let key in spans) {
            this._internalAddSpanRecord(spans[key]);
        }
        for (let key in counters) {
            const record = counters[key];
            if (this._counters[record.Name]) {
                this._counters[record.Name] += record.Value;
            } else {
                this._error(`Bad counter name: ${record.Name}`);
            }
        }
    }

    //-----------------------------------------------------------------------//
    // Reporting loop
    //-----------------------------------------------------------------------//

    // flush()
    //
    // detached bool - indicates the report should assume the script is about
    //      to exit or otherwise wants the report to be sent as quickly and
    //      low-overhead as possible.
    //
    _flush(detached) {
        detached = detached || false;

        if (this._options.disabled) {
            return;
        }
        this._flushReport(detached, (err) => {});
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
        if (this._thriftAuth === null) {
            // Don't start the loop until the thrift data necessary to do the
            // report is set up.
            return;
        }
        if (this._reportingLoopActive) {
            this._info('Reporting loop already started!');
            return;
        }

        this._infoV(1, 'Starting reporting loop:', this._thriftRuntime);
        this._reportingLoopActive = true;

        // Set up the script exit clean-up: stop the reporting loop (so it does
        // not turn a Node process into a zombie) and do a final explicit flush.
        // Note that the final flush may enqueue asynchronous callbacks that cause
        // the 'beforeExit' event to be re-emitted when those callbacks finish.
        let finalFlushOnce = 0;
        let finalFlush = () => {
            if (finalFlushOnce++ > 0) { return; }
            this._info('Final flush before exit.');
            this._flushReport(true);
        };
        let stopReportingOnce = 0;
        let stopReporting = () => {
            if (stopReportingOnce++ > 0) { return; }
            this._stopReportingLoop();
        };
        this._platform.onBeforeExit(stopReporting);
        this._platform.onBeforeExit(finalFlush);

        // Begin the asynchronous reporting loop
        let loop = () => {
            this._enqueueNextReport((err) => {
                if (this._reportingLoopActive) {
                    loop();
                }
            });
        };
        loop();
    }

    _stopReportingLoop() {
        this._infoV(2, 'Stopping reporting loop');

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
        // shorted report interval
        let reportInterval = this._options.max_reporting_interval_millis;
        if (this._useClockState && !this._clockState.isReady()) {
            reportInterval = Math.min(constants.CLOCK_STATE_REFRESH_INTERVAL_MS, reportInterval);
        }

        // After 3 consecutive errors, expand the retry delay up to 8x the
        // normal interval. Also, jitter the delay by +/- 10%
        let backOff = 1 + Math.min(7, Math.max(0, this._reportErrorStreak - 3));
        let basis = backOff * reportInterval;
        let jitter = 1.0 + (Math.random() * 0.2 - 0.1);
        let delay = Math.floor(Math.max(0, jitter * basis));

        this._infoV(3, `Delaying next flush for ${delay}ms`);
        this._reportTimer = util.detachedTimeout(() => {
            this._reportTimer = null;
            this._flushReport(false, done);
        }, delay);
    }

    _flushReport(detached, done) {
        done = done || function (err) {};

        let clockReady = this._clockState.isReady();
        let clockOffsetMicros = this._clockState.offsetMicros();

        // Diagnostic information on the clock correction
        this.logStable('cr/time_correction_state', {
            offset_micros  : clockOffsetMicros,
            active_samples : this._clockState.activeSampleCount(),
            ready          : clockReady,
        });

        let logRecords = this._logRecords;
        let spanRecords = this._spanRecords;
        let counters = this._counters;

        // If the clock is not ready, do an "empty" flush to build more clock
        // samples before the real data is reported.
        // A detached flush (i.e. one intended to fire at exit or other "last
        // ditch effort" event) should always use the real data.
        if (this._useClockState && !clockReady && !detached) {
            this._infoV(2, 'Flushing empty report to prime clock state');
            logRecords  = [];
            spanRecords = [];
            counters    = {};
        } else {
            // Early out if we can.
            if (this._buffersAreEmpty()) {
                this._infoV(2, 'Skipping empty report');
                return done(null);
            }

            // Clear the object buffers as the data is now in the local
            // variables
            this._clearBuffers();
            this._infoV(2, `Flushing report (${logRecords.length} logs, ${spanRecords.length} spans)`);
        }

        this._transport.ensureConnection(this._options);

        // Ensure the runtime GUID is set as it is possible buffer logs and
        // spans before the GUID is necessarily set.
        console.assert(this._runtimeGUID !== null, 'No runtime GUID for Tracer'); // eslint-disable-line no-console

        for (let key in logRecords) {
            logRecords[key].runtime_guid = this._runtimeGUID;
        }
        for (let key in spanRecords) {
            spanRecords[key].runtime_guid = this._runtimeGUID;
        }

        let thriftCounters = [];
        for (let key in counters) {
            let value = counters[key];
            if (value === 0) {
                continue;
            }
            thriftCounters.push(new crouton_thrift.NamedCounter({
                Name  : coerce.toString(key),
                Value : coerce.toNumber(value),
            }));
        }

        let timestampOffset = this._useClockState ? clockOffsetMicros : 0;
        let now = this._platform.nowMicros();
        let report = new crouton_thrift.ReportRequest({
            runtime                 : this._thriftRuntime,
            oldest_micros           : this._reportYoungestMicros,
            youngest_micros         : now,
            log_records             : logRecords,
            span_records            : spanRecords,
            counters                : thriftCounters,
            timestamp_offset_micros : timestampOffset,
        });
        this._infoV(2, `timestamp_offset_micros = ${timestampOffset}`);

        this.emit('prereport', report);
        let originMicros = this._platform.nowMicros();

        this._transport.report(detached, this._thriftAuth, report, (err, res) => {
            let destinationMicros = this._platform.nowMicros();
            if (err) {
                // How many errors in a row?
                this._reportErrorStreak++;

                // On a failed report, re-enqueue the data that was going to be
                // sent.
                if (err.message) {
                    this._error(`Error in report: ${err.message}`, err);
                } else {
                    this._error(`Error in report: ${err}`, err);
                }
                this._restoreRecords(report.log_records, report.span_records, report.counters);

                this.emit('report_error', err, {
                    error    : err,
                    streak   : this._reportErrorStreak,
                    detached : detached,
                });
            } else {
                if (this._options.debug) {
                    let reportWindowSeconds = (now - report.oldest_micros) / 1e6;
                    this._infoV(2, `Report flushed for last ${reportWindowSeconds} seconds`);
                }

                // Update internal data after the successful report
                this._reportErrorStreak = 0;
                this._reportYoungestMicros = now;

                // Update the clock state if there's info from the report
                if (res && res.timing && res.timing.receive_micros && res.timing.transmit_micros) {
                    this._clockState.addSample(
                        originMicros,
                        res.timing.receive_micros,
                        res.timing.transmit_micros,
                        destinationMicros);
                } else {
                    // The response does not have timing information. Disable
                    // the clock state assuming there'll never be timing data
                    // to use.
                    this._useClockState = false;
                }

                this.emit('report', report, res);
            }
            return done(err);
        });
    }

    //-----------------------------------------------------------------------//
    // Internal logging & errors
    //-----------------------------------------------------------------------//

    _infoV(v, msg, payload) {
        if (v > this._options.verbose) {
            return;
        }
        this._internalLog(constants.LOG_INFO, `[LS:V${v}] ${msg}`, payload);
    }
    _info(msg, payload) {
        this._internalLog(constants.LOG_INFO, `[LS:I] ${msg}`, payload);
    }
    _warn(msg, payload) {
        this._internalLog(constants.LOG_WARN, `[LS:W] ${msg}`, payload);
    }
    _error(msg, payload) {
        this._internalLog(constants.LOG_ERROR, `[LS:E] ${msg}`, payload);
    }
    _internalLog(level, msg, payload) {
        if (this._options.debug) {
            this.logDetail(level, null, msg, payload);
        }
    }

    /**
     * Display a user-visible warning - but only once (for all warnings) to
     * avoid spamming the host application.  Also creates an internal log of
     * the warning.
     */
    _warnOnce(msg, payload) {
        this._visibleErrorCount++;
        if (this._visibleErrorCount === 1) {
            if (!this._options.silent) {
                console.warn(msg, payload); // eslint-disable-line no-console
            }
        }
        this._warn(msg, payload);
    }
}
