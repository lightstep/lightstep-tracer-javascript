import * as coerce from './coerce.js';
import * as constants from '../constants';
import _each from '../_each';
import opentracing from 'opentracing';
import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase

export default class SpanImp extends opentracing.Span {

    // ---------------------------------------------------------------------- //
    // opentracing.Span SPI
    // ---------------------------------------------------------------------- //

    _tracer() {
        return this._tracerImp;
    }

    _context() {
        return this._ctx;
    }

    _setOperationName(name) {
        this._operationName = `${name}`;
    }

    _addTags(keyValuePairs) {
        let self = this;
        _each(keyValuePairs, (value, key) => {
            self._tags[key] = value;
        });
    }

    _log(keyValuePairs, timestamp) {
        let self = this;
        const argumentType = typeof keyValuePairs;
        if (argumentType !== 'object') {
            self._tracerImp._error('Span.log() expects an object as its first argument');
            return;
        }

        let tsMicros = null;
        if (timestamp) {
            tsMicros = timestamp * 1000;
        } else {
            tsMicros = self._tracerImp._platform.nowMicros();
        }
        let fields = [];
        _each(keyValuePairs, (value, key) => {
            if (!key || !value) {
                return;
            }
            let keyStr = coerce.toString(key);
            let valStr = null;
            if (value instanceof Object) {
                try {
                    valStr = JSON.stringify(value, null, '  ');
                } catch (e) {
                    valStr = `Could not encode value. Exception: ${e}`;
                }
            } else {
                valStr = coerce.toString(value);
            }
            if (keyStr.length > self._tracerImp._options.log_field_key_hard_limit) {
                self._tracerImp._counters['logs.keys.over_limit']++;
                keyStr = `${keyStr.substr(0, self._tracerImp._options.log_field_key_hard_limit)}...`;
            }
            if (valStr.length > self._tracerImp._options.log_field_value_hard_limit) {
                self._tracerImp._counters['logs.values.over_limit']++;
                valStr = `${valStr.substr(0, self._tracerImp._options.log_field_value_hard_limit)}...`;
            }
            fields.push(new crouton_thrift.KeyValue({
                Key   : keyStr,
                Value : valStr,
            }));
        });
        let record = new crouton_thrift.LogRecord({
            timestamp_micros : tsMicros,
            fields           : fields,
        });
        self._log_records = self._log_records || [];
        self._log_records.push(record);
        self._tracerImp.emit('log_added', record);
    }

    _finish(finishTime) {
        return this.end(finishTime);
    }

    // ---------------------------------------------------------------------- //
    // Private methods
    // ---------------------------------------------------------------------- //

    constructor(tracer, name, spanContext) {
        super();

        console.assert(typeof tracer === 'object', 'Invalid runtime');  // eslint-disable-line no-console

        this._tracerImp = tracer;
        this._ctx = spanContext;
        this._ended  = false;

        this._operationName = name;
        this._tags          = {};
        this._beginMicros   = tracer._platform.nowMicros();
        this._endMicros     = 0;
        this._errorFlag     = false;
        this._log_records   = null;
    }

    // ---------------------------------------------------------------------- //
    // LightStep Extensions
    // ---------------------------------------------------------------------- //

    getOperationName() {
        return this._operationName;
    }

    // Getter only. The GUID is immutable once set internally.
    guid() {
        return this._ctx._guid;
    }

    traceGUID() {
        return this._ctx._traceGUID;
    }

    parentGUID() {
        return this._tags.parent_span_guid;
    }

    setParentGUID(guid) {
        this._tags.parent_span_guid = coerce.toString(guid);
        return this;
    }

    beginMicros() {
        return this._beginMicros;
    }

    setBeginMicros(micros) {
        this._beginMicros = micros;
        return this;
    }

    endMicros() {
        return this._endMicros;
    }

    setEndMicros(micros) {
        this._endMicros = micros;
        return this;
    }

    /**
     * Returns a URL to the trace containing this span.
     *
     * Unlike most methods, it *is* safe to call this method after `finish()`.
     *
     * @return {string} the absolute URL for the span
     */
    generateTraceURL() {
        let micros;
        if (this._beginMicros > 0 && this._endMicros > 0) {
            micros = Math.floor((this._beginMicros + this._endMicros) / 2);
        } else {
            micros = this._tracerImp._platform.nowMicros();
        }

        let urlPrefix = constants.LIGHTSTEP_APP_URL_PREFIX;
        let accessToken = encodeURIComponent(this._tracerImp.options().access_token);
        let guid = encodeURIComponent(this.guid());
        return `${urlPrefix}/${accessToken}/trace?span_guid=${guid}&at_micros=${micros}`;
    }

    getTags() {
        return this._tags;
    }

    /**
     * Finishes the span.
     *
     * @param  {Number} finishTime
     *         	Optional Unix timestamp in milliseconds setting an explicit
     *         	finish time for the span.
     */
    end(finishTime) {
        // Ensure a single span is not recorded multiple times
        if (this._ended) {
            return;
        }
        this._ended = true;

        if (finishTime !== undefined) {
            this._endMicros = finishTime * 1000;
        }

        // Do not set endMicros if it has already been set. This accounts for
        // the case of a span that has had it's times set manually (i.e. allows
        // for retroactively created spans that might not be possible to create
        // in real-time).
        if (this._endMicros === 0) {
            this._endMicros = this._tracerImp._platform.nowMicros();
        }
        this._tracerImp._addSpanRecord(this._toThrift());
    }

    _toThrift() {
        let attributes = [];
        _each(this._tags, (value, key) => {
            attributes.push(new crouton_thrift.KeyValue({
                Key   : coerce.toString(key),
                Value : coerce.toString(value),
            }));
        });

        let record = new crouton_thrift.SpanRecord({
            span_guid       : this.guid(),
            trace_guid      : this.traceGUID(),
            runtime_guid    : this._tracerImp.guid(),
            span_name       : this._operationName,
            oldest_micros   : this._beginMicros,
            youngest_micros : this._endMicros,
            attributes      : attributes,
            error_flag      : this._errorFlag,
            log_records     : this._log_records,
        });
        return record;
    }

}
