import _each from '../_each';
import SpanContextImp from './span_context_imp';

const CARRIER_TRACER_STATE_PREFIX = 'ot-tracer-';
const CARRIER_BAGGAGE_PREFIX = 'ot-baggage-';

export default class LightStepPropagator {
    constructor(tracer) {
        this._tracer = tracer;
        this._carrierPrefix = CARRIER_TRACER_STATE_PREFIX;
        this._baggagePrefix = CARRIER_BAGGAGE_PREFIX;
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
        carrier[`${this._carrierPrefix}traceid`] = spanContext._traceGUID;
        carrier[`${this._carrierPrefix}sampled`] = 'true';
        spanContext.forEachBaggageItem((key, value) => {
            carrier[`${this._baggagePrefix}${key}`] = value;
        });
        return carrier;
    }

    extract(carrier) {
        // Iterate over the contents of the carrier and set the properties
        // accordingly.
        let foundFields = 0;
        let spanGUID = null;
        let traceGUID = null;
        let sampled = true;

        _each(carrier, (value, key) => {
            key = key.toLowerCase();
            if (key.substr(0, this._carrierPrefix.length) !== this._carrierPrefix) {
                return;
            }
            let suffix = key.substr(this._carrierPrefix.length);

            switch (suffix) {
            case 'traceid':
                foundFields++;
                traceGUID = value;
                break;
            case 'spanid':
                foundFields++;
                spanGUID = value;
                break;
            case 'sampled':
                switch (value) {
                case 0:
                case '0':
                case false:
                case 'false':
                    sampled = false;
                    break;
                default:
                    sampled = true;
                    break;
                }
                break;
            default:
                this._tracer._error(`Unrecognized carrier key '${key}' with recognized prefix. Ignoring.`);
                break;
            }
        });

        if (foundFields === 0) {
            // This is not an error per se, there was simply no SpanContext
            // in the carrier.
            return null;
        }
        if (foundFields < 2) {
            // A partial SpanContext suggests some sort of data corruption.
            this._tracer._error(`Only found a partial SpanContext: ${carrier}`);
            return null;
        }

        let spanContext = new SpanContextImp(spanGUID, traceGUID, sampled);

        _each(carrier, (value, key) => {
            key = key.toLowerCase();
            if (key.substr(0, this._baggagePrefix.length) !== this._baggagePrefix) {
                return;
            }
            let suffix = key.substr(this._baggagePrefix.length);
            spanContext.setBaggageItem(suffix, value);
        });
        return spanContext;
    }
}
