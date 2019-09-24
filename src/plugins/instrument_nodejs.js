import * as opentracing from 'opentracing';
import http from 'http';
import https from 'https';
import { URL } from 'url';
// Capture the proxied values on script load (i.e. ASAP) in case there are
// multiple layers of instrumentation.
let proxiedHttpRequest;
let proxiedHttpsRequest;
if (typeof window === 'undefined') {
    proxiedHttpRequest = http.request;
    proxiedHttpsRequest = https.request;
}



// Automatically create spans for all requests made via window.fetch.
//
// NOTE: this code currently works only with a single Tracer.
//
class InstrumentNodejs {
    constructor() {
        this._enabled = this._isValidContext();
        this._proxyInited = false;
        this._internalExclusions = [];
        this._tracer = null;
        this._handleOptions = this._handleOptions.bind(this);

        if (!this._enabled) {
            return;
        }
    }

    name() {
        return 'instrument_nodejs';
    }

    addOptions(tracerImp) {
        tracerImp.addOption('nodejs_instrumentation', { type : 'bool', defaultValue : false });
        tracerImp.addOption('nodejs_inclusion_patterns', { type : 'array', defaultValue : [/.*/] });
        tracerImp.addOption('nodejs_exclusion_patterns', { type : 'array', defaultValue : [] });
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
        http.request = proxiedHttpRequest;
        https.request = proxiedHttpsRequest;
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
        if (!this._proxyInited && current.nodejs_instrumentation) {
            this._proxyInited = true;
            this._instrumentNodejs();
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
            return (`${str}`).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
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
     * Check if window is here, if so then this can't be done
     */
    _isValidContext() {
        if (typeof window === 'undefined') {
            return true;
        }
        return false;
    }

    _instrumentNodejs() {
        let self = this;
        let tracer = this._tracer;
        function requestOverride(originalRequest, ...args) {
            let url;
            let method;
            let protocol;

            // http.request has two overrides, taking url first or options
            if (typeof args[0] === 'string') {
                url = args[0];
                method = typeof args[1] === 'object' ? args[1].method || 'GET' : 'GET';
                protocol = new URL(url).protocol.replace(':', '');
            } else if (typeof args[0] === 'object') {
                url = args[0].href;
                method = args[0].method;
                protocol = args[0].protocol ? args[0].protocol.replace(':', '') : 'http';
            }
            if (!self._shouldTrace(tracer, url)) {
                return originalRequest(...args);
            }

            const span = tracer.startSpan('node request');
            tracer.addActiveRootSpan(span);

            let tags = {
                method   : method || 'GET',
                url      : url,
                protocol : protocol,
            };
            if (url) {
                tags.url_pathname = url.split('?')[0];
            }


            try {
                const request = originalRequest(...args);

                // add tracing headers to request
                const headersCarrier = {};
                tracer.inject(span.context(), opentracing.FORMAT_HTTP_HEADERS, headersCarrier);
                const keys = Object.keys(headersCarrier);
                keys.forEach(key => {
                    request.setHeader(key, headersCarrier[key]);
                });

                span.log({
                    event       : 'sending',
                    method      : method || 'GET',
                    url         : url,
                    openPayload : tags,
                });
                span.addTags(tags);

                request.on('error', (e) => {
                    throw e;
                });

                request.on('response', (res) => {
                    if (res.statusCode >= 500 && res.statusCode <= 599) {
                        span.addTags({ error : true });
                    }
                    span.log({
                        method       : method || 'GET',
                        headers      : res.headers,
                        status       : res.status,
                        statusText   : res.statusText,
                        responseType : res.type,
                        url          : res.url,
                    });
                    span.finish();
                    tracer.removeActiveRootSpan(span);
                });

                return request;
            } catch (e) {
                span.addTags({ error : true });
                tracer.removeActiveRootSpan(span);
                span.log({
                    event : 'error',
                    error : e,
                });
                span.finish();
                throw e;
            }
        }
        http.request = requestOverride.bind(undefined, http.request);
        https.request = requestOverride.bind(undefined, https.request);
    }

    _shouldTrace(tracer, url) {
        // This shouldn't be possible, but let's be paranoid
        if (!tracer) {
            return false;
        }

        let opts = tracer.options();
        if (opts.disabled) {
            return false;
        }
        if (!opts.nodejs_instrumentation) {
            return false;
        }
        if (!url) {
            return false;
        }
        for (let key in this._internalExclusions) {
            if (!this._internalExclusions.hasOwnProperty(key)) {
                continue;
            }
            const ex = this._internalExclusions[key];
            if (ex.test(url)) {
                return false;
            }
        }
        let include = false;
        for (let key in opts.nodejs_inclusion_patterns) {
            if (!opts.nodejs_inclusion_patterns.hasOwnProperty(key)) {
                continue;
            }
            const inc = opts.nodejs_inclusion_patterns[key];
            if (inc.test(url)) {
                include = true;
                break;
            }
        }
        if (!include) {
            return false;
        }
        for (let key in opts.nodejs_exclusion_patterns) {
            if (!opts.nodejs_exclusion_patterns.hasOwnProperty(key)) {
                continue;
            }
            const ex = opts.nodejs_exclusion_patterns[key];
            if (ex.test(url)) {
                return false;
            }
        }
        return true;
    }
}

module.exports = new InstrumentNodejs();
