import * as opentracing from 'opentracing';
import http from 'http';
import https from 'https';
import urlCreator, { URL } from 'url';
// Capture the proxied values on script load (i.e. ASAP) in case there are
// multiple layers of instrumentation.
let proxiedHttpRequest;
let proxiedHttpsRequest;
let proxiedHttpGet;
let proxiedHttpsGet;
if (typeof window === 'undefined') {
    proxiedHttpRequest = http.request;
    proxiedHttpGet = http.get;

    proxiedHttpsRequest = https.request;
    proxiedHttpsGet = https.get;
}


// taken from following
// https://github.com/nodejs/node/blob/8507485fb242dfcaf07092414871aa9c185a28e4/lib/internal/url.js#L1254-L1276
// Utility function that converts a URL object into an ordinary
// options object as expected by the http.request and https.request
// APIs.
function urlToOptions(url) {
    const options = {
        protocol : url.protocol,
        hostname :
            typeof url.hostname === 'string' && url.hostname.startsWith('[')
                ? url.hostname.slice(1, -1)
                : url.hostname,
        hash     : url.hash,
        search   : url.search,
        pathname : url.pathname,
        path     : `${url.pathname || ''}${url.search || ''}`,
        href     : url.href,
    };
    if (url.port !== '') {
        options.port = Number(url.port);
    }
    if (url.username || url.password) {
        options.auth = `${url.username}:${url.password}`;
    }
    return options;
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
    }

    name() {
        return 'instrument_nodejs';
    }

    addOptions(tracerImp) {
        tracerImp.addOption('nodejs_instrumentation', { type : 'bool', defaultValue : false });
        tracerImp.addOption('nodejs_url_inclusion_patterns', { type : 'array', defaultValue : [/.*/] });
        tracerImp.addOption('nodejs_url_exclusion_patterns', { type : 'array', defaultValue : [] });
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
        http.get = proxiedHttpGet;

        https.request = proxiedHttpsRequest;
        https.get = proxiedHttpsGet;
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
     * Check if in node
     */
    _isValidContext() {
        const isNode = (typeof process !== 'undefined')
            && (typeof process.release !== 'undefined')
            && (process.release.name === 'node');
        return isNode;
    }

    _instrumentNodejs() {
        let self = this;
        let tracer = this._tracer;

        function requestOverride(originalRequest, ...args) {
            // http.request has two overrides, taking url/string first, or options
            // if url or string morph into an options object,
            // make it so that options and possible callback are only args passed
            let options;
            let callback;
            let urlObject;
            /* eslint-disable prefer-destructuring */
            if (typeof args[0] === 'string' || args[0] instanceof URL) {
                urlObject = args[0] instanceof URL ? args[0] : new URL(args[0]);
                options = urlToOptions(urlObject);
                if (typeof args[1] === 'object') {
                    options = { ...options, ...args[1] };
                    callback = args[2];
                } else if (typeof args[1] === 'function') {
                    callback = args[1];
                }
            } else {
                options = args[0];
                callback = args[1];
            }
            /* eslint-enable prefer-destructuring */

            // check if there are headers stated, and if not create them on the first arg
            // then grab reference so that we can inject headers into the request before sending the request out
            if (!options.headers) options.headers = {};

            const { headers } = options;
            const method = options.method || 'GET';
            const url = options.href || urlCreator.format(options);
            const protocol = options.protocol
                ? options.protocol.replace(':', '')
                : url.slice(0, url.indexOf(':'));
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
                // eslint-disable-next-line prefer-destructuring
                tags.url_pathname = url.split('?')[0];
            }


            try {
                const headersCarrier = {};
                tracer.inject(span.context(), opentracing.FORMAT_HTTP_HEADERS, headersCarrier);
                const keys = Object.keys(headersCarrier);
                // add tracing headers to request
                // have to set headers instead of modifying the request instance headers,
                // In an http.get call case, req.end will automatically be called,
                // setting headers will be impossible after that point
                // reference https://nodejs.org/api/http.html#http_class_http_clientrequest
                keys.forEach((key) => {
                    headers[key] = headersCarrier[key];
                });
                const request = originalRequest(options, callback);

                span.log({
                    event       : 'sending',
                    method      : method || 'GET',
                    url         : url,
                    openPayload : tags,
                });
                span.addTags(tags);

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

        http.get = requestOverride.bind(undefined, http.get);
        https.get = requestOverride.bind(undefined, https.get);
    }

    _shouldTrace(tracer, url) {
        // This shouldn't be possible, but let's be paranoid
        if (!tracer || !url) {
            return false;
        }

        let opts = tracer.options();
        if (opts.disabled || !opts.nodejs_instrumentation) {
            return false;
        }

        if (this._internalExclusions.some((ex) => ex.test(url))) {
            return false;
        }

        let include = false;
        if (opts.nodejs_url_inclusion_patterns.some((inc) => inc.test(url))) {
            include = true;
        }
        if (opts.nodejs_url_exclusion_patterns.some((ex) => ex.test(url))) {
            include = false;
        }
        return include;
    }
}

module.exports = new InstrumentNodejs();
