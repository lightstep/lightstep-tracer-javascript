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
        for (let key in this._baggage) {
            f(key, this._baggage[key]);
        }
    }

    // ---------------------------------------------------------------------- //
    // Private methods
    // ---------------------------------------------------------------------- //

    constructor(spanGUID, traceGUID) {
        this._baggage = {};
        this._guid        = spanGUID;
        this._traceGUID   = traceGUID;
    }
}
