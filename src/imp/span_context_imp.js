import _each from '../_each';

export default class SpanContextImp {
    // ---------------------------------------------------------------------- //
    // OpenTracing Implementation
    // ---------------------------------------------------------------------- //

    setBaggageItem(key, value) {
        this._baggage[key] = value;
    }

    getBaggageItem(key) {
        return this._baggage[key];
    }

    // ---------------------------------------------------------------------- //
    // LightStep Extensions
    // ---------------------------------------------------------------------- //

    // This is part of the formal OT API in Go; and will likely be supported
    // across platforms.
    //
    // https://github.com/opentracing/opentracing.github.io/issues/103
    forEachBaggageItem(f) {
        _each(this._baggage, (val, key) => {
            f(key, val);
        });
    }

    // traceGUID returns a 128 bit trace ID.
    traceGUID() {
        return `${this._upperTraceGUID}${this._traceGUID}`;
    }

    // ---------------------------------------------------------------------- //
    // Private methods
    // ---------------------------------------------------------------------- //

    constructor(spanGUID, traceGUID, sampled) {
        this._baggage = {};
        this._guid = spanGUID;
        this._sampled = true;
        // Ignore undefined or null when determining truthiness.
        if (sampled === false) {
            this._sampled = sampled;
        }
        // upperTraceGUID is the most significant 8 bytes of a B3/TraceContext
        // 16 byte trace ID. Represented in base16.
        this._upperTraceGUID = '0000000000000000';
        this._traceGUID = traceGUID;
        if (this._traceGUID && this._traceGUID.length === 32) {
            this._upperTraceGUID = traceGUID.substr(0, 16);
            this._traceGUID = traceGUID.substr(16);
        }
    }
}
