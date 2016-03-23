import * as coerce from './coerce.js';
import * as constants from '../constants';
import { crouton_thrift } from  '../platform_abstraction_layer';

export default class SpanImp {

    // ---------------------------------------------------------------------- //
    // OpenTracing Implementation
    // ---------------------------------------------------------------------- //

    tracer() {
        return this._tracer;
    }

    setOperationName(name) {
        return this._operation = name;
    }

    addTags(keyValuePairs) {
        for (let key in keyValuePairs) {
            this._tags[key] = keyValuePairs[key];
        }
    }

    setBaggageItem(key, value) {
        this._baggage[key] = value;
    }

    getBaggageItem(key) {
        return this._baggage[key];
    }

    /**
     * The set of OpenTracing fields is:
     * - 'event'
     * - 'timestamp'
     * - 'payload'
     */
    // Log record specified by fields
    log(fields) {
        let rec = this._tracer.log()
            .span(this._guid)
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
            rec.timestamp(fields.timestamp * 1000)
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

    constructor(tracer) {
        console.assert(typeof tracer === 'object', "Invalid runtime");

        this._tracer          = tracer;
        this._ended           = false;

        this._guid            = tracer._platform.generateUUID();
        this._traceGUID       = tracer.generateTraceGUIDForRootSpan();
        this._operation       = '';
        this._tags            = {};
        this._baggage         = {};
        this._joinIDs         = {};
        this._beginMicros     = tracer._platform.nowMicros();
        this._endMicros       = 0;
        this._errorFlag       = false;
    }

    // ---------------------------------------------------------------------- //
    // LightStep Extensions
    // ---------------------------------------------------------------------- //

    getOperationName() {
        return this._operation;
    }

    // Getter only. The GUID is immutable once set internally.
    guid() {
        return this._guid;
    }

    traceGUID() {
        return this._traceGUID;
    }

    parentGUID() {
        return this._tags['parent_span_guid'];
    }

    setParentGUID(guid) {
        this._tags['parent_span_guid'] = coerce.toString(guid);
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
        let accessToken = encodeURIComponent(this._tracer.options()['access_token']);
        let guid = encodeURIComponent(this.guid());
        return `${urlPrefix}/${accessToken}/trace?span_guid=${guid}&at_micros=${micros}`;
    }

    getTags() {
        return this._tags;
    }

    getBaggage() {
        return this._baggage;
    }

    setFields(fields) {
        for (let key in fields) {
            let value = fields[key];
            switch (key) {
                case 'operationName':
                    this._operation = value;
                    break;
                case 'startTime':
                    // startTime is in milliseconds
                    this._beginMicros = value * 1000;
                    break;
                case 'tags':
                    this.addTags(value);
                    break;
                case 'span_guid':
                    this._guid = coerce.toString(value);
                    break;
                case 'trace_guid':
                    this._traceGUID = coerce.toString(value);
                    break;
                case 'parent':
                    if (value) {
                        this.parent(value.imp());
                    }
                    break;
                case 'parent_guid':
                    this.setParentGUID(value);
                    break;
                default:
                    this._tracer._internalWarnf('Ignoring unknown field %s', key);
                    break;
            }
        }
    }

    // TODO: deprecate this and combine with setFields
    modify(fields) {
        if (!fields) {
            return this;
        }
        if (fields.begin_micros) {
            this._beginMicros = fields.begin_micros;
        }
        if (fields.end_micros) {
            this._endMicros = fields.end_micros;
        }
        return this;
    }

    setJoinID(key, value) {
        this._tags[key] = value;
        this._joinIDs[key] = true;
    }

    parent(parentSpan) {
        if (!parentSpan) {
            return;
        }
        this.setParentGUID(parentSpan.guid());
        this._traceGUID = parentSpan.traceGUID();
    }

    span(operation) {
        let child = new SpanImp(this._tracer);
        child.operation(operation);

        // TODO: what is the expected behavior on OpenTracing tags on
        // child spans? The legacy Traceguide behavior relies (?) on the
        // child spans inheriting the join IDs of the parent.
        for (let key in this._tags) {
            child._tags[key] = this._tags[key];
            if (this._joinIDs[key]) {
                child._joinIDs[key] = true;
            }
        }
        child.parent(this);
        return child;
    }

    // Used by the OpenTracing adapter layer ????
    newEmptySpan() {
        return new SpanImp(this._tracer);
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
            .span(this._guid)
            .level(constants.LOG_INFO)
            .message(msg)
            .payload(payload)
            .end();
    }
    warn(msg, payload) {
        this._tracer.log()
            .span(this._guid)
            .level(constants.LOG_WARN)
            .message(msg)
            .payload(payload)
            .end();
    }
    error(msg, payload) {
        this._tracer.log()
            .span(this._guid)
            .level(constants.LOG_ERROR)
            .message(msg)
            .payload(payload)
            .end();
    }
    // Special case to format exception information a little bit more nicely
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
    exception(msg, exception) {
        if (exception.message === undefined || exception.stack == undefined) {
            return this.error(msg, exception);
        }

        let stack = exception.stack.split('\n');
        this._tracer.log()
            .span(this._guid)
            .level(constants.LOG_ERROR)
            .message(msg)
            .payload({
                name: exception.name,
                message: exception.message,
                filename: exception.filename,
                line_number: exception.lineNumber,
                stack: stack,
            })
            .end();
    }
    fatal(msg, payload) {
        this._tracer.log()
            .span(this._guid)
            .level(constants.LOG_FATAL)
            .message(msg)
            .payload(payload)
            .end();
    }

    infof(fmt, ...args) {
        this._tracer.logFmt(constants.LOG_INFO, this._guid, fmt, ...args);
        return this;
    }
    warnf(fmt, ...args) {
        this._tracer.logFmt(constants.LOG_WARN, this._guid, fmt, ...args);
        return this;
    }
    errorf(fmt, ...args) {
        this._tracer.logFmt(constants.LOG_ERROR, this._guid, fmt, ...args);
        return this;
    }
    fatalf(fmt, ...args) {
        this._tracer.logFmt(constants.LOG_FATAL, this._guid, fmt, ...args);
        return this;
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
        this._addTagAsJoinID(joinIDs, 'end_user_id');

        // Explicitly set the trace GUID as a join ID
        if (this._traceGUID) {
            joinIDs.push(new crouton_thrift.TraceJoinId({
                TraceKey : 'join:trace_guid',
                Value    : coerce.toString(this._traceGUID),
            }));
        }

        // Add any runtime global join IDs (give preference to local tags,
        // though).
        let globalJoinIDs = this._tracer._options.join_ids;
        for (let key in globalJoinIDs) {
            if (this._tags[key] !== undefined) {
                continue;
            }
            let value = globalJoinIDs[key];
            joinIDs.push(new crouton_thrift.TraceJoinId({
                TraceKey : coerce.toString(key),
                Value    : coerce.toString(value),
            }));
        }

        let record = new crouton_thrift.SpanRecord({
            span_guid       : this._guid,
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
