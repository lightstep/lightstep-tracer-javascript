import _each from '../_each';
import * as opentracing from 'opentracing';

// Capture the proxied values on script load (i.e. ASAP) in case there are
// multiple layers of instrumentation.
let proxied = {};
if (typeof window === 'object' && typeof window.XMLHttpRequest !== 'undefined') {
    proxied = {
        XMLHttpRequest   : XMLHttpRequest,
        open             : XMLHttpRequest.prototype.open,
        send             : XMLHttpRequest.prototype.send,
        setRequestHeader : XMLHttpRequest.prototype.setRequestHeader,
    };
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
function getResponseHeaders(xhr) {
    let raw = xhr.getAllResponseHeaders();
    let parts = raw.replace(/\s+$/, '').split(/\n/);
    for (let i = 0; i < parts.length; i++) {
        parts[i] = parts[i].replace(/\r/g, '').replace(/^\s+/, '').replace(/\s+$/, '');
    }
    return parts;
}

// Automatically create spans for all XMLHttpRequest objects.
//
// NOTE: this code currently works only with a single Tracer.
//
class InstrumentXHR {
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
        return 'instrument_xhr';
    }

    addOptions(tracerImp) {
        tracerImp.addOption('xhr_instrumentation', { type : 'bool', defaultValue : false });
        tracerImp.addOption('xhr_url_inclusion_patterns', { type : 'array', defaultValue : [/.*/] });
        tracerImp.addOption('xhr_url_exclusion_patterns', { type : 'array', defaultValue : [] });
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
        let proto = proxied.XMLHttpRequest.prototype;
        proto.open = proxied.open;
        proto.send = proxied.send;
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

        // Set up the proxied XHR calls unless disabled
        if (!this._proxyInited && current.xhr_instrumentation) {
            this._proxyInited = true;
            let proto = proxied.XMLHttpRequest.prototype;
            proto.setRequestHeader = this._instrumentSetRequestHeader();
            proto.open = this._instrumentOpen();
            proto.send = this._instrumentSend();
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
     * Check preconditions for the auto-instrumentation of XHRs to work properly.
     * There are a lot of potential JavaScript platforms.
     */
    _isValidContext() {
        if (typeof window === 'undefined') {
            return false;
        }
        if (!window.XMLHttpRequest) {
            return false;
        }
        if (!window.XMLHttpRequest.prototype) {
            return false;
        }
        return true;
    }

    _instrumentSetRequestHeader() {
        return function (header, value) {
            this.__requestHeaders = this.__requestHeaders || {};
            this.__requestHeaders[header] = value;
            return proxied.setRequestHeader.apply(this, arguments);
        };
    }

    _instrumentOpen() {
        let self = this;
        let tracer = this._tracer;

        return function (method, url, asyncArg, user, password) {
            if (!self._shouldTrace(tracer, this, url)) {
                return proxied.open.apply(this, arguments);
            }

            let span = tracer.startSpan('XMLHttpRequest');
            tracer.addActiveRootSpan(span);
            this.__tracer_span = span;
            this.__tracer_url = url;

            let tags = {
                method : method,
                url    : url,
                async  : asyncArg,
                user   : user,
            };
            if (url) {
                tags.url_pathname = url.split('?')[0];
            }

            let openPayload = {};
            _each(tags, (val, key) => {
                openPayload[key] = val;
            });
            openPayload.cookies = getCookies();

            // Note: async defaults to true
            let async = (asyncArg === undefined ? true : asyncArg);
            if (async) {
                this.addEventListener('readystatechange', function () {
                    if (this.readyState === 0) {
                        span.log({
                            readyState : 0,
                            event      : 'unsent',
                        });
                    } else if (this.readyState === 1) {
                        span.log({
                            readyState : 1,
                            event      : 'sending',
                        });
                    } else if (this.readyState === 2) {
                        span.log({
                            readyState  : 2,
                            event       : 'headers received',
                            method      : method,
                            url         : url,
                            openPayload : openPayload,
                            headers     : getResponseHeaders(this),
                        });
                        span.addTags(tags);
                    } else if (this.readyState === 3) {
                        span.log({
                            readyState : 3,
                            event      : 'loading',
                        });
                    } else if (this.readyState === 4) {
                        let responseType = this.responseType;
                        span.log({
                            readyState   : 4,
                            url          : url,
                            method       : method,
                            headers      : getResponseHeaders(this),
                            status       : this.status,
                            statusText   : this.statusText,
                            responseType : responseType,
                        });
                        tracer.removeActiveRootSpan(span);
                        span.finish();
                    } else {
                        span.log({
                            readyState : this.readyState,
                        });
                    }
                });
            }

            let result = proxied.open.apply(this, arguments);
            if (!async) {
                tracer.removeActiveRootSpan(span);
                span.finish();
            }
            return result;
        };
    }

    _instrumentSend() {
        let self = this;
        let tracer = this._tracer;
        return function () {
            if (!self._shouldTrace(tracer, this, this.__tracer_url)) {
                return proxied.send.apply(this, arguments);
            }

            let span = this.__tracer_span;
            if (!span) {
                return proxied.send.apply(this, arguments);
            }

            let data = Array.prototype.slice.call(arguments);
            let len = undefined;
            if (data.length === 1) {
                if (data[0] && data[0].length) {
                    len = data[0].length;
                }
                try {
                    data = JSON.parse(data[0]);
                } catch (e) {
                    // Ignore the error
                }
            }
            let lenStr = (len === undefined) ? '' : `, data length=${len}`;
            span.log({
                event       : 'send',
                data_length : lenStr,
            });

            // Add Open-Tracing headers
            const headersCarrier = {};
            tracer.inject(span.context(), opentracing.FORMAT_HTTP_HEADERS, headersCarrier);
            const keys = Object.keys(headersCarrier);
            keys.forEach((key) => {
                proxied.setRequestHeader.call(this, key, headersCarrier[key]);
            });

            return proxied.send.apply(this, arguments);
        };
    }

    _shouldTrace(tracer, xhr, url) {
        // This shouldn't be possible, but let's be paranoid
        if (!tracer) {
            return false;
        }

        let opts = tracer.options();
        if (opts.disabled) {
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
        for (let key in opts.xhr_url_inclusion_patterns) {
            if (!opts.xhr_url_inclusion_patterns.hasOwnProperty(key)) {
                continue;
            }
            const inc = opts.xhr_url_inclusion_patterns[key];
            if (inc.test(url)) {
                include = true;
                break;
            }
        }
        if (!include) {
            return false;
        }
        for (let key in opts.xhr_url_exclusion_patterns) {
            if (!opts.xhr_url_exclusion_patterns.hasOwnProperty(key)) {
                continue;
            }
            const ex = opts.xhr_url_exclusion_patterns[key];
            if (ex.test(url)) {
                return false;
            }
        }
        return true;
    }
}

module.exports = new InstrumentXHR();
