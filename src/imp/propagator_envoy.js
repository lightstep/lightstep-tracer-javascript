import pb from 'protobufjs';
import long from 'long';
import _each from '../_each';
import _leftpad from '../_leftpad';
import SpanContextImp from './span_context_imp';
import LightStepPropagator from './propagator_ls';

// const jsonDescriptor = require('./util/BinaryCarrier.json');

const CARRIER_ENVOY_HEADER_KEY = 'x-ot-span-context';

const BINARY_PROTO = {
    nested : {
        lightstep : {
            options : { go_package : 'lightsteppb' },
            nested  : {
                BinaryCarrier : {
                    fields : {
                        deprecated_text_ctx : {
                            rule : 'repeated',
                            type : 'bytes',
                            id   : 1,
                        },
                        basic_ctx : { type : 'BasicTracerCarrier', id : 2 },
                    },
                },
                BasicTracerCarrier : {
                    fields : {
                        trace_id      : { type : 'fixed64', id : 1 },
                        span_id       : { type : 'fixed64', id : 2 },
                        sampled       : { type : 'bool', id : 3 },
                        baggage_items : { keyType : 'string', type : 'string', id : 4 },
                    },
                },
            },
        },
    },
};


export default class EnvoyPropagator extends LightStepPropagator {
    constructor(tracer) {
        super(tracer);
        this._tracer = tracer;
        this._envoyHeaderKey = CARRIER_ENVOY_HEADER_KEY;
        this._carrierPb = pb.Root.fromJSON(BINARY_PROTO);
    }

    inject(spanContext, carrier) {
        if (!carrier) {
            console.log(
                'VGZSHOP: ',
                'Unexpected null carrier in call to inject',
            );
            this._tracer._error('Unexpected null carrier in call to inject');
            return;
        }
        if (typeof carrier !== 'object') {
            console.log(
                'VGZSHOP: ',
                `Unexpected '${typeof carrier}' FORMAT_BINARY carrier in call to inject`,
            );
            this._tracer._error(
                `Unexpected '${typeof carrier}' FORMAT_BINARY carrier in call to inject`,
            );
            return;
        }

        let basicContext = {
            span_id       : long.fromString(spanContext._guid, 16),
            trace_id      : long.fromString(spanContext._traceGUID, 16),
            sampled       : true,
            baggage_items : {},
        };
        spanContext.forEachBaggageItem((key, value) => {
            basicContext.baggage_items[key] = value;
        });

        let binaryCarrier = this._carrierPb.lookupType('BinaryCarrier');

        let payload = {
            basic_ctx : basicContext,
        };

        let err = binaryCarrier.verify(payload);
        if (err) {
            this._tracer._error(`Invalid Span Context: ${err}`);
            console.log(
                'VGZSHOP: ',
                err,
            );
            return null;
        }
        let msg = binaryCarrier.create(payload);
        let buffer = binaryCarrier.encode(msg).finish();
        let bufferString = pb.util.base64.encode(buffer, 0, buffer.length);
        carrier[this._envoyHeaderKey] = bufferString;
        console.log('VGZSHOP: ', carrier);

        return carrier;
    }

    extract(carrier) {
        // Iterate over the contents of the carrier and set the properties
        // accordingly.
        let foundFields = 0;
        let spanGUID = null;
        let traceGUID = null;
        let sampled = true;

        if (carrier[this._envoyHeaderKey] === undefined) {
            // This is not an error per se, there was simply no SpanContext
            // in the carrier.
            return null;
        }

        // Decode context
        const binaryData = Buffer.from(carrier[this._envoyHeaderKey], 'base64');
        let binaryCarrier = this._carrierPb.lookupType('BinaryCarrier');
        let msg = binaryCarrier.decode(binaryData);
        let basicContext = msg.basic_ctx.toJSON();

        if (basicContext === undefined) {
            // This is not an error per se, there was simply no SpanContext
            // in the carrier.
            return null;
        }

        // Validate span context
        _each(basicContext, (value, key) => {
            key = key.toLowerCase();
            if (key === 'baggage_items') {
                // We will address baggage after span context is verified
                return;
            }

            switch (key) {
            case 'trace_id':
                foundFields++;
                // left pad to length of 16
                traceGUID = _leftpad(
                    long.fromValue(value).toString(16),
                    16,
                    '0',
                );
                break;
            case 'span_id':
                foundFields++;
                // left pad to length of 16
                spanGUID = _leftpad(
                    long.fromValue(value).toString(16),
                    16,
                    '0',
                );
                // left pad

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
                this._tracer._error(
                    `Unrecognized carrier key '${key}'. Ignoring.`,
                );
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

        if (basicContext.baggage_items !== undefined) {
            _each(basicContext.baggage_items, (value, key) => {
                spanContext.setBaggageItem(key.toLowerCase(), value);
            });
        }

        return spanContext;
    }
}
