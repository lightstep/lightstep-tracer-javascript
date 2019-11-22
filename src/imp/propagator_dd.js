import _each from '../_each';
import SpanContextImp from './span_context_imp';
import CARRIER_BAGGAGE_PREFIX from './propagator_ls';

const CARRIER_DD_TRACER_STATE_PREFIX = 'x-datadog-';

export default class DDPropagator {
    constructor(tracer) {
        this._tracer = tracer;
        this._baggagePrefix = CARRIER_BAGGAGE_PREFIX;
        this._carrierPrefix = CARRIER_DD_TRACER_STATE_PREFIX;
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

        // eslint-disable-next-line max-len
        // Per https://github.com/lightstep/lightstep-tracer-javascript/blob/master/src/imp/platform/node/platform_node.js#L91
        // all generated GUIDs are base 16 strings.
        // DD headers expect integers, not base 16 values.
        carrier[`${this._carrierPrefix}parent-id`] = parseInt(spanContext._guid, 16).toString();
        carrier[`${this._carrierPrefix}trace-id`] = parseInt(spanContext.traceGUID(), 16).toString();
        if (spanContext._sampled) {
            carrier[`${this._carrierPrefix}sampling-priority`] = '1';
        } else {
            carrier[`${this._carrierPrefix}sampling-priority`] = '0';
        }

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
            case 'trace-id':
                foundFields++;
                traceGUID = parseInt(value, 10).toString(16);
                break;
            case 'parent-id':
                foundFields++;
                spanGUID = parseInt(value, 10).toString(16);
                break;
            case 'sampling-priority':
                // TODO: support sampling priority somehow. This is a float64 that does not
                // necessarily represent the sampling decision
                if (value === 0) {
                    sampled = false;
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
