import * as opentracing from 'opentracing';

// Capture the proxied values on script load (i.e. ASAP) in case there are
// multiple layers of instrumentation.
let proxiedFetch;
if (typeof window === 'object' && typeof window.fetch !== 'undefined') {
    proxiedFetch = window.fetch;
}

function getCookies() {
    if (typeof document === 'undefined' || !document.cookie) {
        return null;
    }
    let cookies = document.cookie.split(';');
    let data = {};
    let count = 0;
    for (let i = 0; i < cookies.length; i++) {
        let parts = cookies[i].split('=', 2);
        if (parts.length === 2) {
            let key = parts[0].replace(/^\s+/, '').replace(/\s+$/, '');
            data[key] = decodeURIComponent(parts[1]);
            try {
                data[key] = JSON.parse(data[key]);
            } catch (_ignored) { /* Ignored */ }
            count++;
        }
    }
    if (count > 0) {
        return data;
    }
    return null;
}

// Normalize the getAllResponseHeaders output
function getResponseHeaders(response) {
    const result = {};
    const entries = response.headers.entries();
    for (let i = 0; i < entries.length; i++) {
        const pair = entries[i];
        const [key, val] = pair;
        result[key] = val;
    }
    return result;
}

// Automatically create spans for all requests made via window.fetch.
//
// NOTE: this code currently works only with a single Tracer.
//
class InstrumentFetch {
    constructor() {
        this._enabled = this._isValidContext();
        this._proxyInited = false;
        this._internalExclusions = [];
        this._tracer = null;
        this._handleOptions = this._handleOptions.bind(this);
    }

    name() {
        return 'instrument_fetch';
    }

    addOptions(tracerImp) {
        tracerImp.addOption('fetch_instrumentation', { type : 'bool', defaultValue : false });
        tracerImp.addOption('fetch_url_inclusion_patterns', { type : 'array', defaultValue : [/.*/] });
        tracerImp.addOption('fetch_url_exclusion_patterns', { type : 'array', defaultValue : [] });
        tracerImp.addOption('fetch_url_header_inclusion_patterns', { type : 'array', defaultValue : [/.*/] });
        tracerImp.addOption('fetch_url_header_exclusion_patterns', { type : 'array', defaultValue : [] });
        tracerImp.addOption('include_cookies', { type : 'bool', defaultValue : true });
    }

    start(tracerImp) {
        if (!this._enabled) {
            return;
        }
        this._tracer = tracerImp;

        let currentOptions = tracerImp.options();
        this._addServiceHostToExclusions(currentOptions);
        this._handleOptions({}, currentOptions);
        tracerImp.on('options', this._handleOptions);
    }

    stop() {
        if (!this._enabled) {
            return;
        }
        window.fetch = proxiedFetch;
    }

    /**
     * Respond to options changes on the Tracer.
     *
     * Note that `modified` is the options that have changed in this call,
     * along with their previous and new values. `current` is the full set of
     * current options *including* the newly modified values.
     */
    _handleOptions(modified, current) {
        // Automatically add the service host itself to the list of exclusions
        // to avoid reporting on the reports themselves
        let serviceHost = modified.collector_host;
        if (serviceHost) {
            this._addServiceHostToExclusions(current);
        }

        // Set up the proxied fetch calls unless disabled
        if (!this._proxyInited && current.fetch_instrumentation) {
            this._proxyInited = true;
            window.fetch = this._instrumentFetch();
        }
    }

    /**
     * Ensure that the reports to the collector don't get instrumented as well,
     * as that recursive instrumentation is more confusing than valuable!
     */
    _addServiceHostToExclusions(opts) {
        if (opts.collector_host.length === 0) {
            return;
        }

        // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
        function escapeRegExp(str) {
            return (`${str}`).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        // Check against the hostname without the port as well as the canonicalized
        // URL may drop the standard port.
        let host = escapeRegExp(opts.collector_host);
        let port = escapeRegExp(opts.collector_port);
        let set = [new RegExp(`^https?://${host}:${port}`)];
        if (port === '80') {
            set.push(new RegExp(`^http://${host}`));
        } else if (port === '443') {
            set.push(new RegExp(`^https://${host}`));
        }
        this._internalExclusions = set;
    }

    /**
     * Check preconditions for the auto-instrumentation of fetch to work properly.
     * There are a lot of potential JavaScript platforms.
     */
    _isValidContext() {
        if (typeof window === 'undefined') {
            return false;
        }
        if (!window.fetch) {
            return false;
        }
        return true;
    }

    _instrumentFetch() {
        let self = this;
        let tracer = this._tracer;

        return function (input, init) {
            const request = new Request(input, init);
            const opts = tracer.options();

            if (!self._shouldTrace(tracer, request.url)) {
                // eslint-disable-next-line prefer-spread
                return proxiedFetch(request);
            }

            let span = tracer.startSpan('fetch');
            tracer.addActiveRootSpan(span);

            const parsed = new URL(request.url);
            let tags = {
                method : request.method,
                url    : request.url,

                // NOTE: Purposefully excluding username:password from tags.
                // TODO: consider sanitizing URL to mask / remove that information from the trace in general
                hash     : parsed.hash,
                href     : parsed.href,
                protocol : parsed.protocol,
                origin   : parsed.origin,
                host     : parsed.host,
                hostname : parsed.hostname,
                port     : parsed.port,
                pathname : parsed.pathname,
                search   : parsed.search,
            };
            if (opts.include_cookies) {
                tags.cookies = getCookies();
            }

            // Add Open-Tracing headers
            if (self._shouldAddHeadersToRequest(tracer, request.url)) {
                const headersCarrier = {};
                tracer.inject(span.context(), opentracing.FORMAT_HTTP_HEADERS, headersCarrier);
                Object.keys(headersCarrier).forEach((key) => {
                    if (!request.headers.get(key)) request.headers.set(key, headersCarrier[key]);
                });
            }
            span.log({
                event       : 'sending',
                method      : request.method,
                url         : request.url,
                openPayload : tags,
            });
            span.addTags(tags);

            return proxiedFetch(request).then((response) => {
                if (!response.ok) {
                    span.addTags({ error : true });
                }
                span.log({
                    method       : request.method,
                    headers      : getResponseHeaders(response),
                    status       : response.status,
                    statusText   : response.statusText,
                    responseType : response.type,
                    url          : response.url,
                });
                tracer.removeActiveRootSpan(span);
                span.finish();
                return response;
            }).catch((e) => {
                span.addTags({ error : true });
                tracer.removeActiveRootSpan(span);
                span.log({
                    event : 'error',
                    error : e,
                });
                span.finish();
                throw e;
            });
        };
    }

    _shouldTrace(tracer, url) {
        // This shouldn't be possible, but let's be paranoid
        if (!tracer || !url) {
            return false;
        }

        let opts = tracer.options();
        if (opts.disabled) {
            return false;
        }

        if (this._internalExclusions.some((ex) => ex.test(url))) {
            return false;
        }

        if (opts.fetch_url_exclusion_patterns.some((ex) => ex.test(url))) {
            return false;
        }
        if (opts.fetch_url_inclusion_patterns.some((inc) => inc.test(url))) {
            return true;
        }
        return false;
    }

    _shouldAddHeadersToRequest(tracer, url) {
        // This shouldn't be possible, but let's be paranoid
        if (!tracer || !url) {
            return false;
        }

        let opts = tracer.options();
        if (opts.disabled) {
            return false;
        }

        if (opts.fetch_url_header_exclusion_patterns.some((ex) => ex.test(url))) {
            return false;
        }
        if (opts.fetch_url_header_inclusion_patterns.some((inc) => inc.test(url))) {
            return true;
        }
        return false;
    }
}

module.exports = new InstrumentFetch();
