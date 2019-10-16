import  LightStepPropagator from './propagator_ls';
import SpanContextImp from './span_context_imp';

const CARRIER_B3_TRACER_STATE_PREFIX = 'x-b3-';

export default class B3Propagator extends LightStepPropagator {
    constructor(tracer) {
        super(tracer);
        this._carrierPrefix = CARRIER_B3_TRACER_STATE_PREFIX;
    }

    inject(spanContext, carrier) {
        if (!carrier) {
            this._tracer._error(`Unexpected null carrier in call to inject`);
            return;
        }
        if (typeof carrier !== 'object') {
            this._tracer._error(`Unexpected '${typeof carrier}' FORMAT_TEXT_MAP carrier in call to inject`);
            return;
        }

        carrier[`${this._carrierPrefix}spanid`] = spanContext._guid;
        carrier[`${this._carrierPrefix}traceid`] = spanContext.traceGUID();
        carrier[`${this._carrierPrefix}sampled`] = 'true';
        spanContext.forEachBaggageItem((key, value) => {
            carrier[`${this._baggagePrefix}${key}`] = value;
        });
        return carrier;
    }
}
