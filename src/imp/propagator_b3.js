import LightStepPropagator from './propagator_ls';

const CARRIER_B3_TRACER_STATE_PREFIX = 'x-b3-';

export default class B3Propagator extends LightStepPropagator {
    constructor(tracer) {
        super(tracer);
        this._carrierPrefix = CARRIER_B3_TRACER_STATE_PREFIX;
    }

    inject(spanContext, carrier) {
        if (!carrier) {
            this._tracer._error('Unexpected null carrier in call to inject');
            return;
        }
        if (typeof carrier !== 'object') {
            this._tracer._error(`Unexpected '${typeof carrier}' FORMAT_TEXT_MAP carrier in call to inject`);
            return;
        }

        carrier[`${this._carrierPrefix}spanid`] = spanContext._guid;
        carrier[`${this._carrierPrefix}traceid`] = spanContext.traceGUID();
        if (spanContext._sampled) {
            carrier[`${this._carrierPrefix}sampled`] = '1';
        } else {
            carrier[`${this._carrierPrefix}sampled`] = '0';
        }
        spanContext.forEachBaggageItem((key, value) => {
            carrier[`${this._baggagePrefix}${key}`] = value;
        });
        return carrier;
    }
}
