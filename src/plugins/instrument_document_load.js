import _each from '../_each';

class InstrumentPageLoad {
    constructor() {
        this._inited = false;
        this._span = null;
    }

    name() {
        return 'instrument_page_load';
    }

    addOptions(tracerImp) {
        tracerImp.addOption('instrument_page_load', { type : 'bool', defaultValue : false });
    }

    start(tracerImp) {
        if (this._inited) {
            return;
        }
        this._inited = true;

        if (typeof window !== 'object' || typeof document !== 'object') {
            return;
        }

        const currentOptions = tracerImp.options();
        if (currentOptions.instrument_page_load) {
            this._ensureSpanStarted(tracerImp);
            document.addEventListener('readystatechange', this._handleReadyStateChange.bind(this));
        }
    }

    stop() {
    }

    _ensureSpanStarted(tracerImp) {
        if (!this._span) {
            this._span = tracerImp.startSpan('document/load');
            tracerImp.addActiveRootSpan(this._span);
        }
    }

    _handleReadyStateChange() {
        if (!this._span) {
            return;
        }

        let span = this._span;
        let state = document.readyState;
        let payload;
        if (state === 'complete') {
            payload = {};
            if (window.performance && performance.timing) {
                this._addTimingSpans(span, performance.timing);
                payload['window.performance.timing'] = performance.timing;
            }
        }

        span.logEvent(`document.readystatechange ${state}`, payload);

        if (state === 'complete') {
            if (span.tracer()) {
                span.tracer().removeActiveRootSpan(span.tracer());
            }
            span.finish();
        }
    }

    _copyNavigatorProperties(nav) {
        let dst = {};
        for (let key in nav) { // eslint-disable-line guard-for-in, no-restricted-syntax
            try {
                let value = nav[key];
                switch (key) {
                case 'plugins': {
                    let p = [];
                    for (let i = 0; i < value.length; i++) {
                        let item = value.item(i);
                        p.push({
                            name        : item.name,
                            description : item.description,
                        });
                    }
                    dst[key] = p;
                } break;

                case 'mimeTypes': {
                    let p = [];
                    for (let i = 0; i < value.length; i++) {
                        let item = value.item(i);
                        p.push({
                            type        : item.type,
                            description : item.description,
                            suffixes    : item.suffixes,
                        });
                    }
                    dst[key] = p;
                } break;

                default:
                    dst[key] = value;
                    break;
                }
            } catch (e) {
                // Skip, just in case
            }
        }
        return dst;
    }

    // Retroactively create the appropriate spans and logs
    _addTimingSpans(parentImp, timing) {
        // NOTE: this currently relies on LightStep-specific APIs
        if (!parentImp) {
            return;
        }

        parentImp.setTag('user_agent', navigator.userAgent);

        _each(timing, (value, key) => {
            // e.g. secureConnectionStart is not always set
            if (typeof value !== 'number' || value === 0) {
                return;
            }

            let payload;

            if (key === 'navigationStart' && typeof navigator === 'object') {
                payload = {
                    navigator : this._copyNavigatorProperties(navigator),
                };
            }
            parentImp.log({
                message : `document ${key}`,
                payload : payload,
            }, value);
        });

        parentImp.setBeginMicros(timing.navigationStart * 1000.0);

        parentImp.tracer().startSpan('document/time_to_first_byte', { childOf : parentImp })
            .setBeginMicros(timing.requestStart * 1000.0)
            .setEndMicros(timing.responseStart * 1000.0)
            .finish();
        parentImp.tracer()
            .startSpan('document/response_transfer', { childOf : parentImp })
            .setBeginMicros(timing.responseStart * 1000.0)
            .setEndMicros(timing.responseEnd * 1000.0)
            .finish();
        parentImp.tracer().startSpan('document/dom_load', { childOf : parentImp })
            .setBeginMicros(timing.domLoading * 1000.0)
            .setEndMicros(timing.domInteractive * 1000.0)
            .finish();
    }
}

module.exports = new InstrumentPageLoad();
