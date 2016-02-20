'use strict';

/**
 *
 */
export default class TraceContextImp {

    // ---------------------------------------------------------------------- //
    // Constructor
    // ---------------------------------------------------------------------- //

    constructor(traceGuid, spanGuid) {
        this._trace_guid = traceGuid;
        this._span_guid = spanGuid;
        this._parent_span_guid = null;

        // TODO: Is this required?  Or at this point is the code Implementation
        // specific and other fields are not expected?
        this._custom = {};
    }

    // ---------------------------------------------------------------------- //
    // OpenTracing API
    // ---------------------------------------------------------------------- //

    setTraceAttribute(key, value) {
        switch (key) {
        case 'trace_guid':
            this._trace_guid = value;
            return;
        case 'span_guid':
            this._span_guid = value;
            return;
        case 'parent_span_guid':
            this._parent_span_guid = value;
            return;
        default:
            this._custom[key] = value;
        }
    }

    traceAttribute(key) {
        switch (key) {
        case 'trace_guid':
            return this._trace_guid;
        case 'span_guid':
            return this._span_guid;
        case 'parent_span_guid':
            return this._parent_span_guid;
        default:
            return this._custom[key];
        }
    }

    // ---------------------------------------------------------------------- //
    // Implementation specific
    // ---------------------------------------------------------------------- //

    clone() {
        let that = new TraceContextImp();
        that._trace_guid = this._trace_guid;
        that._span_guid = this._span_guid;
        this._parent_span_guid = this._parent_span_guid;

        for (let key in this._custom) {
            that._custom[key] = this._custom[key];
        }
        return that;
    }

    traceGuid() {
        return this._trace_guid;
    }

    setTraceGuid(traceGuid) {
        this._trace_guid = parentGuid;
    }

    spanGuid() {
        return this._span_guid;
    }
    setSpanGuid(guid) {
        this._span_guid = guid;
    }

    parentSpanGuid() {
        return this._parent_span_guid;
    }
    setParentSpanGuid(guid) {
        this._parent_span_guid = guid;
    }

    customAttributes() {
        return this._custom;
    }

    encode() {
        let m = {
            trace_guid       : this._trace_guid,
            span_guid        : this._span_guid,
            parent_span_guid : this._parent_span_guid,
        };
        for (let key in this._custom) {
            m[key] = this._custom[key];
        }
        return m;
    }

    decode(m) {
        for (let key in m) {
            this.setTraceAttribute(key, m);
        }
    }
}
