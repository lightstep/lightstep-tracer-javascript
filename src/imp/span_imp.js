import ActiveSpan from '../active_span';
import * as coerce from './coerce.js';
import * as constants from '../constants';
import { crouton_thrift } from  '../platform_abstraction_layer';
import TraceContextImp from './trace_context_imp';

export default class SpanImp extends ActiveSpan {

    // ---------------------------------------------------------------------- //
    // OpenTracing Implementation
    // ---------------------------------------------------------------------- //

    addTags(keyValuePairs) {
        this.tags(keyValuePairs);
    }

    setTraceAttribute(key, value) {
        console.warn("NOT YET SUPPORTED");
    }

    getTraceAttribute(key) {
        console.warn("NOT YET SUPPORTED")
    }

    startChildSpan(fields) {
        let span = this.startChild(fields.operationName);
        for (let key in fields) {
            switch (key) {
                case 'operationName':
                    // Already handled. Ignore.
                    break;
                case 'startTime':
                    // startTime is in milliseconds
                    span._beginMicros = fields.startTime * 1000;
                    break;
                case 'tags':
                    span.addTags(fields.tags);
                    break;
                case 'parent':
                    setParentGUID(fields.parent.imp().guid());
                    break;
                default:
                    this._runtime._internalWarnf('Ignoring unknown field %s', key);
                    break;
            }
        }
        return span;
    }


    /**
     * The set of OpenTracing fields is:
     * - 'event'
     * - 'timestamp'
     * - 'payload'
     */
    // Log record specified by fields
    log(fields) {
        let rec = this._runtime.log()
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

    finish() {
        return this.end(...arguments);
    }


    // ---------------------------------------------------------------------- //
    // LightStep Extensions
    // ---------------------------------------------------------------------- //

    // ---------------------------------------------------------------------- //
    // Private methods, etc.
    // ---------------------------------------------------------------------- //

    constructor(runtime, context) {
        super();

        console.assert(typeof runtime === 'object', "Invalid runtime");

        if (!context) {
            let traceGuid = runtime._platform.generateUUID();
            let spanGuid = runtime._platform.generateUUID();
            context = new TraceContextImp(traceGuid, spanGuid);
        }
        console.assert(context instanceof TraceContextImp, 'Invalid context object');

        this._runtime         = runtime;
        this._ended           = false;

        this._context         = context;
        this._operation       = '';
        this._tags            = {};
        this._joinIDs         = {};
        this._beginMicros     = this._runtime._platform.nowMicros();
        this._endMicros       = 0;
        this._errorFlag       = false;
    }

    operation(name) {
        if (arguments.length === 0) {
            return this._operation;
        }
        this._operation = coerce.toString(name);
    }

    getOperation() {
        return this.operation();
    }
    setOperation(name) {
        return this.operation(name);
    }

    // Getter only. The GUID is immutable once set internally.
    guid() {
        return this._context.spanGuid();
    }

    parentGuid() {
        return this._context.parentSpanGuid();
    }

    setParentGUID(guid) {
        this.tags({ 'parent_span_guid' : guid });
    }

    setTag(key, value) {
        let m = {};
        m[key] = value;
        this.tags(m)
    }
    setTags(keyValuePairs) {
        return this.tags(keyValuePairs);
    }
    getTags() {
        return this.tags();
    }

    tags(tagMap) {
        if (arguments.length === 0) {
            return this._tags;
        }
        if (arguments.length !== 1 || typeof tagMap !== 'object') {
            this._runtime._internalWarnf("Bad arguments to attributes()", arguments);
            return;
        }
        for (let key in tagMap) {
            this._tags[key] = tagMap[key];
        }
    }

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

    traceContext(traceContextImp) {
        if (arguments.length === 0) {
            return this._context;
        } else {
            this._context = traceContextImp;
        }
    }

    setJoinID(key, value) {
        this._tags[key] = value;
        this._joinIDs[key] = true;
    }

    parent(parentSpan) {
        if (!parentSpan) {
            return;
        }

        this._context.setParentGuid(parentSpan.guid());
    }

    startChild(operation) {
        return this.span(operation);
    }

    span(operation) {
        let context = this._context.clone();
        context.setParentSpanGuid(context.spanGuid());
        context.setSpanGuid(this._runtime._platform.generateUUID());

        let child = new SpanImp(this._runtime, context);
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
        return child;
    }

    // Used by the OpenTracing adapter layer ????
    newEmptySpan() {
        return new SpanImp(this._runtime);
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
        //
        if (this._endMicros === 0) {
            this._endMicros = this._runtime._platform.nowMicros();
        }
        this._runtime._addSpanRecord(this._toThrift());
    }



    // Info log record with an optional payload
    info(msg, payload) {
        this._runtime.log()
            .span(this._guid)
            .level(constants.LOG_INFO)
            .message(msg)
            .payload(payload)
            .end();
    }
    warn(msg, payload) {
        this._runtime.log()
            .span(this._guid)
            .level(constants.LOG_WARN)
            .message(msg)
            .payload(payload)
            .end();
    }
    error(msg, payload) {
        this._runtime.log()
            .span(this._guid)
            .level(constants.LOG_ERROR)
            .message(msg)
            .payload(payload)
            .end();
    }
    fatal(msg, payload) {
        this._runtime.log()
            .span(this._guid)
            .level(constants.LOG_FATAL)
            .message(msg)
            .payload(payload)
            .end();
    }

    infof(fmt, ...args) {
        this._runtime.logFmt(constants.LOG_INFO, this._guid, fmt, ...args);
        return this;
    }
    warnf(fmt, ...args) {
        this._runtime.logFmt(constants.LOG_WARN, this._guid, fmt, ...args);
        return this;
    }
    errorf(fmt, ...args) {
        this._runtime.logFmt(constants.LOG_ERROR, this._guid, fmt, ...args);
        return this;
    }
    fatalf(fmt, ...args) {
        this._runtime.logFmt(constants.LOG_FATAL, this._guid, fmt, ...args);
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

        // The backend relies on the 'parent_span_guid' attribute to create
        // parent-child relationships
        if (this._context.parentSpanGuid()) {
            attributes.push(new crouton_thrift.KeyValue({
                Key   : 'parent_span_guid',
                Value : coerce.toString(this._context.parentSpanGuid()),
            }));
        }

        // Explicitly set the trace GUID as a join ID
        joinIDs.push(new crouton_thrift.TraceJoinId({
            TraceKey : 'trace_guid',
            Value    : coerce.toString(this._context.traceGuid()),
        }));

        // Add any runtime global join IDs (give preference to local tags,
        // though).
        let globalJoinIDs = this._runtime._options.join_ids;
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
            span_guid       : this._context.spanGuid(),
            runtime_guid    : this._runtime.guid(),
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
