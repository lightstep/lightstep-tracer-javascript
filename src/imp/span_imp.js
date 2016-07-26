import * as coerce from './coerce.js';
import * as constants from '../constants';
import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase

export default class SpanImp {

    // ---------------------------------------------------------------------- //
    // OpenTracing Implementation
    // ---------------------------------------------------------------------- //

    tracer() {
        return this._tracer;
    }

    context() {
        return this._context;
    }

    setOperationName(name) {
        this._operation = `${name}`;
    }

    addTags(keyValuePairs) {
        for (let key in keyValuePairs) {
            // NB: Older versions of IE don't support `String.prototype.startsWith()`
            if (key.substr(0, constants.JOIN_ID_PREFIX.length) === constants.JOIN_ID_PREFIX) {
                this.setJoinID(key, keyValuePairs[key]);
            } else {
                this._tags[key] = keyValuePairs[key];
            }
        }
    }

    /**
     * The set of OpenTracing fields is:
     * - 'event'
     * - 'timestamp'
     * - 'payload'
     */
    // Log record specified by fields
    log(fields) {
        const argumentType = typeof fields;
        if (argumentType !== 'string') {
            this._tracer._error('Span.log() expects an object as its argument');
            return;
        }

        let rec = this._tracer.log()
            .span(this.guid())
            .level(constants.LOG_STRING_TO_LEVEL[fields.level] || constants.LOG_INFO);

        //
        // OpenTracing attributes
        //
        if (fields.event !== undefined) {
            rec.name(fields.event);
        }
        if (fields.timestamp !== undefined) {
            // The incoming 'timestamp' field is in milliseconds. The internal
            // timestamp is in microseconds.
            rec.timestamp(fields.timestamp * 1000);
        }
        if (fields.payload !== undefined) {
            rec.payload(fields.payload);
        }

        //
        // LightStep-specific attributes
        //
        if (fields.message !== undefined) {
            rec.message(fields.message);
        }
        if (fields.timestamp_micros !== undefined) {
            rec.timestamp(fields.timestamp_micros);
        }
        rec.end();
    }

    finish(finishTime) {
        return this.end(finishTime);
    }

    // ---------------------------------------------------------------------- //
    // Private methods
    // ---------------------------------------------------------------------- //

    constructor(tracer, spanContext) {
        console.assert(typeof tracer === 'object', 'Invalid runtime');  // eslint-disable-line no-console

        this._tracer = tracer;
        this._context = spanContext;
        this._ended  = false;

        this._operation   = '';
        this._tags        = {};
        this._joinIDs     = {};
        this._beginMicros = tracer._platform.nowMicros();
        this._endMicros   = 0;
        this._errorFlag   = false;
    }

    // ---------------------------------------------------------------------- //
    // LightStep Extensions
    // ---------------------------------------------------------------------- //

    getOperationName() {
        return this._operation;
    }

    // Getter only. The GUID is immutable once set internally.
    guid() {
        return this._context._guid;
    }

    traceGUID() {
        return this._context._traceGUID;
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
            micros = this._tracer._platform.nowMicros();
        }

        let urlPrefix = constants.LIGHTSTEP_APP_URL_PREFIX;
        let accessToken = encodeURIComponent(this._tracer.options().access_token);
        let guid = encodeURIComponent(this.guid());
        return `${urlPrefix}/${accessToken}/trace?span_guid=${guid}&at_micros=${micros}`;
    }

    getTags() {
        return this._tags;
    }

    setJoinID(key, value) {
        this._tags[key] = value;
        this._joinIDs[key] = true;
        return this;
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
            this._endMicros = this._tracer._platform.nowMicros();
        }
        this._tracer._addSpanRecord(this._toThrift());
    }

    // Info log record with an optional payload
    info(msg, payload) {
        this._tracer.log()
            .span(this.guid())
            .level(constants.LOG_INFO)
            .message(msg)
            .payload(payload)
            .end();
    }

    warn(msg, payload) {
        this._tracer.log()
            .span(this.guid())
            .level(constants.LOG_WARN)
            .message(msg)
            .payload(payload)
            .end();
    }

    error(msg, payload) {
        this._tracer.log()
            .span(this.guid())
            .level(constants.LOG_ERROR)
            .message(msg)
            .payload(payload)
            .end();
    }

    // Special case to format exception information a little bit more nicely
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
    exception(msg, exception) {
        if (exception.message === undefined || exception.stack === undefined) {
            return this.error(msg, exception);
        }

        let stack = exception.stack.split('\n');
        this._tracer.log()
            .span(this.guid())
            .level(constants.LOG_ERROR)
            .message(msg)
            .payload({
                name        : exception.name,
                message     : exception.message,
                filename    : exception.filename,
                line_number : exception.lineNumber,
                stack       : stack,
            })
            .end();
    }

    fatal(msg, payload) {
        this._tracer.log()
            .span(this.guid())
            .level(constants.LOG_FATAL)
            .message(msg)
            .payload(payload)
            .end();
    }

    _toThrift() {
        // TODO: the backend understands join IDs and attributes.  The outer API
        // understands trace context attributes and tags.  The mapping is a
        // little confusing at the moment...

        let joinIDs = [];
        let attributes = [];
        for (let key in this._tags) {
            if (key in this._joinIDs) {
                this._addTagAsJoinID(joinIDs, key);
            } else {
                attributes.push(new crouton_thrift.KeyValue({
                    Key   : coerce.toString(key),
                    Value : coerce.toString(this._tags[key]),
                }));
            }
        }

        let record = new crouton_thrift.SpanRecord({
            span_guid       : this.guid(),
            trace_guid      : this.traceGUID(),
            runtime_guid    : this._tracer.guid(),
            span_name       : this._operation,
            join_ids        : joinIDs,
            oldest_micros   : this._beginMicros,
            youngest_micros : this._endMicros,
            attributes      : attributes,
            error_flag      : this._errorFlag,
        });
        return record;
    }

    // Helper to reduce duplicated code
    _addTagAsJoinID(joinIDs, key) {
        let value = this._tags[key];
        if (value === undefined) {
            return;
        }
        joinIDs.push(new crouton_thrift.TraceJoinId({
            TraceKey : coerce.toString(key),
            Value    : coerce.toString(value),
        }));
    }
}
