export default class UnsupportedPropagator {
    constructor(tracer, name) {
        this._tracer = tracer;
        this._name = name;
    }

    inject(spanContext, carrier) {
        this._tracer._error(`Unsupported format: ${this._name}`);
        return null;
    }

    extract(carrier) {
        this._tracer._error(`Unsupported format: ${this._name}`);
    }
}
