import * as opentracing from 'opentracing';
import * as coerce from './coerce';
import * as constants from '../constants';
import _each from '../_each';
import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase
import LogRecordImp from './log_record_imp'; // eslint-disable-line camelcase
import util from './util/util';

let googleProtobufTimestampPB = require('google-protobuf/google/protobuf/timestamp_pb');
let proto = require('./generated_proto/collector_pb');

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

    _setBaggageItem(key, value) {
        this._ctx.setBaggageItem(key, value);
    }

    _getBaggageItem(key) {
        return this._ctx.getBaggageItem(key);
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

        let tsMicros = timestamp
            ? (timestamp * 1000)
            : self._tracerImp._platform.nowMicros();

        let record = new LogRecordImp(
            self._tracerImp.getLogFieldKeyHardLimit(),
            self._tracerImp.getLogFieldValueHardLimit(),
            tsMicros,
            keyValuePairs,
        );
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

        console.assert(typeof tracer === 'object', 'Invalid runtime'); // eslint-disable-line no-console

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
     *         Optional Unix timestamp in milliseconds setting an explicit
     *         finish time for the span.
     */
    end(finishTime) {
        // Ensure a single span is not recorded multiple times
        if (this._ended) {
            return;
        }
        this._ended = true;

        if (finishTime !== undefined) {
            this.setEndMicros(Math.floor(finishTime * 1000));
        }

        // Do not set endMicros if it has already been set. This accounts for
        // the case of a span that has had it's times set manually (i.e. allows
        // for retroactively created spans that might not be possible to create
        // in real-time).
        if (this._endMicros === 0) {
            this.setEndMicros(this._tracerImp._platform.nowMicros());
        }

        if (util.shouldSendMetaSpan(this._tracer().options(), this.getTags())) {
            this._tracerImp.startSpan(constants.LS_META_SP_FINISH, {
                tags : {
                    [constants.LS_META_EVENT_KEY] : true,
                    [constants.LS_META_TRACE_KEY] : this.traceGUID(),
                    [constants.LS_META_SPAN_KEY]  : this.guid(),
                },
            }).finish();
        }

        this._tracerImp._addSpanRecord(this);
    }

    _toThrift() {
        let attributes = [];
        _each(this._tags, (value, key) => {
            attributes.push(new crouton_thrift.KeyValue({
                Key   : coerce.toString(key),
                Value : coerce.toString(value),
            }));
        });

        let logs = [];
        _each(this._log_records, (logRecord) => {
            let logThrift = logRecord.toThrift();
            this._tracerImp._counters['logs.keys.over_limit'] += logRecord.getNumKeysOverLimit();
            this._tracerImp._counters['logs.values.over_limit'] += logRecord.getNumValuesOverLimit();
            logs.push(logThrift);
        });

        return new crouton_thrift.SpanRecord({
            span_guid       : this.guid(),
            trace_guid      : this.traceGUID(),
            runtime_guid    : this._tracerImp.guid(),
            span_name       : this._operationName,
            oldest_micros   : this._beginMicros,
            youngest_micros : this._endMicros,
            attributes      : attributes,
            error_flag      : this._errorFlag,
            log_records     : logs,
        });
    }

    _toProto() {
        let spanContextProto = new proto.SpanContext();

        spanContextProto.setTraceId(util.hexToDec(this.traceGUID()));
        spanContextProto.setSpanId(util.hexToDec(this.guid()));

        let spanProto = new proto.Span();
        spanProto.setSpanContext(spanContextProto);
        spanProto.setOperationName(this._operationName);

        let startTimestamp = new googleProtobufTimestampPB.Timestamp();
        let startSeconds = Math.floor(this._beginMicros / 1000000);
        let startNanos = (this._beginMicros % 1000000) * 1000;
        startTimestamp.setSeconds(startSeconds);
        startTimestamp.setNanos(startNanos);
        spanProto.setStartTimestamp(startTimestamp);
        spanProto.setDurationMicros((this._endMicros - this._beginMicros).toString());

        let logs = [];
        _each(this._log_records, (logRecord) => {
            let logProto = logRecord.toProto();
            this._tracerImp._counters['logs.keys.over_limit'] += logRecord.getNumKeysOverLimit();
            this._tracerImp._counters['logs.values.over_limit'] += logRecord.getNumValuesOverLimit();
            logs.push(logProto);
        });
        spanProto.setLogsList(logs);

        let parentSpanGUID;
        let tags = [];
        _each(this._tags, (value, key) => {
            let strValue = coerce.toString(value);
            let strKey = coerce.toString(key);
            let tag = new proto.KeyValue();
            if (strKey === 'parent_span_guid') {
                parentSpanGUID = strValue;
            }
            tag.setKey(strKey);
            tag.setStringValue(strValue);
            tags.push(tag);
        });
        spanProto.setTagsList(tags);

        if (parentSpanGUID !== undefined) {
            let ref = new proto.Reference();
            ref.setRelationship(proto.Reference.Relationship.CHILD_OF);
            let parentSpanContext = new proto.SpanContext();
            parentSpanContext.setSpanId(util.hexToDec(parentSpanGUID));
            ref.setSpanContext(parentSpanContext);
            spanProto.setReferencesList([ref]);
        }

        return spanProto;
    }
}
