class InstrumentPageLoad {

    constructor() {
        this._inited = false;
        this._span = null;
    }

    name() {
        return 'instrument_page_load';
    }

    start() {
        if (this._inited) {
            return;
        }
        this._inited = true;

        if (typeof window !== 'object' || typeof document !== 'object') {
            return;
        }
        if (typeof window.Tracer !== 'object') {
            return;
        }

        document.addEventListener('readystatechange', this._handleReadyStateChange.bind(this));
    }

    stop() {
    }

    _handleReadyStateChange() {
        // TODO: LightStep plug-in initialization should be better defined. This
        // "lazy" initialization of the span should be more well-defined.
        if (!Tracer.imp()) {
            // The Tracer implementation has not yet been set up. Can't record
            // the span yet.
            return;
        }

        if (!this._span) {
            this._span = Tracer.startSpan('document/load');
            Tracer.imp().addActiveRootSpan(this._span.imp());
        }

        let span = this._span;
        let state = document.readyState;
        let payload = undefined;
        if (state === 'complete') {
            payload = {};
            if (window.performance && performance.timing) {
                this._addTimingSpans(span, performance.timing);
                payload['window.performance.timing'] = performance.timing;
            }
        }

        span.logEvent(`document.readystatechange ${state}`, payload);

        if (state === 'complete') {
            Tracer.imp().removeActiveRootSpan(span.imp());
            span.finish();
        }
    }

    _copyNavigatorProperties(nav) {
        let dst = {};
        for (let key in nav) {
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
    _addTimingSpans(parent, timing) {
        // NOTE: this currently relies on LightStep-specific APIs
        let parentImp = parent.imp();
        if (!parentImp) {
            return;
        }

        parent.setTag('user_agent', navigator.userAgent);

        for (let key in timing) {
            let value = timing[key];

            // e.g. secureConnectionStart is not always set
            if (typeof value !== 'number' || value === 0) {
                continue;
            }

            let micros = value * 1000.0;
            let payload = undefined;

            if (key === 'navigationStart' && typeof navigator === 'object') {
                payload = {
                    navigator : this._copyNavigatorProperties(navigator),
                };
            }
            parentImp.log({
                message          : `document ${key}`,
                timestamp_micros : micros,
                payload          : payload,
            });
        }

        if (window.chrome && window.chrome.loadTimes) {
            let chromeTimes = window.chrome.loadTimes();
            if (chromeTimes) {
                parentImp.log({
                    message          : 'window.chrome.loadTimes()',
                    timestamp_micros : timing.domComplete * 1000.0,
                    payload          : chromeTimes,
                });
            }
        }

        parentImp.modify({
            begin_micros : timing.navigationStart * 1000.0,
        });
        parent.tracer().startSpan('document/time_to_first_byte', { parent : parent }).imp().modify({
            begin_micros : timing.requestStart * 1000.0,
            end_micros   : timing.responseStart * 1000.0,
        }).finish();
        parent.tracer().startSpan('document/response_transfer', { parent : parent }).imp().modify({
            begin_micros : timing.responseStart * 1000.0,
            end_micros   : timing.responseEnd * 1000.0,
        }).finish();
        parent.tracer().startSpan('document/dom_load', { parent : parent }).imp().modify({
            begin_micros : timing.domLoading * 1000.0,
            end_micros   : timing.domInteractive * 1000.0,
        }).finish();
    }
}

module.exports = new InstrumentPageLoad();
