import ActiveSpan from '../active_span';
import * as coerce from './coerce.js';
import * as constants from '../constants';
import { crouton_thrift } from  '../platform_abstraction_layer';

export default class SpanImp extends ActiveSpan {

    constructor(runtime) {
        super();
        this._runtime     = runtime;
        this._ended       = false;

        this._guid        = this._runtime._platform.generateUUID();
        this._operation   = '';
        this._tags        = {};
        this._beginMicros = this._runtime._platform.nowMicros();
        this._endMicros   = 0;
        this._errorFlag   = false;
    }

    operation(name) {
        if (arguments.length === 0) {
            return this._operation;
        }
        this._operation = coerce.toString(name);
    }

    // Getter only. The GUID is immutable once set internally.
    guid() {
        return this._guid;
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

    setTagAsJoinID(tagKey) {
        this._joinIDs[tagKey] = true;
    }

    parent(parentSpan) {
        if (!parentSpan) {
            return;
        }
        this.tags({
            parent_span_guid : parentSpan._guid,
        });

        // Merge in any of the parent tags that have not already been set on
        // the child.
        let parentTags = parentSpan.tags();
        for (let key in parentTags) {
            if (this._tags[key] !== undefined) {
                continue;
            }
            this._tags[key] = parentTags[key];
            if (parentSpan._joinIDs[key]) {
                this._joinIDs[key] = true;
            }
        }
    }

    span(operation) {
        let child = new SpanImp(this._runtime);
        child.parent(this);
        child.operation(operation);
        return child;
    }

    // Used by the OpenTracing adapter layer
    newEmptySpan() {
        return new SpanImp(this._runtime);
    }

    end() {
        // Ensure a single span is not recorded multiple times
        if (this._ended) {
            return;
        }
        this._ended = true;

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

    // Log record specified by fields
    log(fields) {
        let rec = this._runtime.log()
            .span(this._guid)
            .level(constants.LOG_STRING_TO_LEVEL[fields.level] || constants.LOG_INFO);

        if (fields.message !== undefined) {
            rec.message(fields.message);
        }
        if (fields.payload !== undefined) {
            rec.payload(fields.payload);
        }
        if (fields.timestamp_micros !== undefined) {
            rec.timestamp(fields.timestamp_micros);
        }
        rec.end();
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
        let tags = [];
        for (let key in this._tags) {
            tags.push(new crouton_thrift.KeyValue({
                Key   : coerce.toString(key),
                Value : coerce.toString(this._tags[key]),
            }));
        }

        // For pre-OpenTracing, legacy reasons always include 'end_user_id' as
        // a join ID.
        let joinIDs = [];
        this._addTagAsJoinID('end_user_id');
        for (let key in this._joinIDs) {
            this._addTagAsJoinID(key);
        }

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
            span_guid       : this._guid,
            runtime_guid    : this._runtimeGUID,
            span_name       : this._operation,
            join_ids        : joinIDs,
            oldest_micros   : this._beginMicros,
            youngest_micros : this._endMicros,
            attributes      : tags,
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
