
// Capture the proxied values as soon as possible in case there are
// multiple layers of instrumentation.
let proxied = {};
if (typeof window === "object" && typeof window.XMLHttpRequest !== "undefined") {
    proxied = {
        XMLHttpRequest : XMLHttpRequest,
        open           : XMLHttpRequest.prototype.open,
        send           : XMLHttpRequest.prototype.send,
    };
}


// Automatically create spans for all XMLHttpRequest objects.
//
// NOTE: this code currently works only with a single runtime.
//
class InstrumentXHR {
    constructor() {
        this._enabled = this._isValidContext();
        this._runtime = null;
        this._handleOptions = this._handleOptions.bind(this);

        if (!this._enabled) {
            return;
        }
    }

    name() {
        return "instrument_xhr";
    }

    start(runtime) {
        if (!this._enabled) {
            return;
        }
        this._runtime = runtime;

        let proto = proxied.XMLHttpRequest.prototype;
        proto.open = this._instrumentOpen();
        proto.send = this._instrumentSend();

        runtime.addOption("xhr_url_exclusion_patterns", { type : "any", defaultValue: [] });
        this._addServiceHostToExclusions(runtime.options());
        runtime.on('options', this._handleOptions);
    }

    stop(runtime) {
        if (!this._enabled) {
            return;
        }
        let proto = proxied.XMLHttpRequest.prototype;
        proto.open = proxied.open;
        proto.send = proxied.send;
    }

    _handleOptions(modified, current) {
        // Automatically add the service host itself to the list of exclusions
        // to avoid reporting on the reports themselves
        let serviceHost = modified.service_host;
        if (serviceHost) {
            this._addServiceHostToExclusions(current);
        }
    }

    _addServiceHostToExclusions(opts) {
        if (opts.service_host.length === 0) {
            return;
        }

        // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
        function escapeRegExp(str) {
            return ('' + str).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }

        // Check against the hostname without the port as well as the canonicalized
        // URL may drop the standard port.
        let host = escapeRegExp(opts.service_host);
        let port = escapeRegExp(opts.service_port);
        let set = [ new RegExp('^https?://' + host + ':' + port) ];
        if (port == "80") {
            set.push(new RegExp('^http://' + host));
        } else if (port == "443") {
            set.push(new RegExp('^https://' + host));
        }
        let patterns = opts.xhr_url_exclusion_patterns.concat(set);
        this._runtime.options({ xhr_url_exclusion_patterns : patterns });
    }

    _isValidContext() {
        if (typeof window === "undefined") {
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

    _instrumentOpen() {
        let self = this;
        let tracer = this._runtime;

        return function (method, url, asyncArg, user, password) {
            if (!self._shouldTrace(tracer, this, url)) {
                return proxied.open.apply(this, arguments);
            }

            let span = tracer.span('XMLHttpRequest');
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
            for (let key in tags) {
                openPayload[key] = tags[key];
            }
            openPayload.cookies = getCookies();

            span.info(`XMLHttpRequest open ${method} ${url}`, openPayload);
            span.tags(tags);

            // Note: async defaults to true
            let async = (asyncArg === undefined ? true : asyncArg);
            if (async) {
                this.addEventListener('readystatechange', function() {
                    if (this.readyState == 1) {
                        span.info('XMLHttpRequest unsent (readyState=0)');
                    } else if (this.readyState == 1) {
                        span.info('XMLHttpRequest opened (readyState=1)');
                    } else if (this.readyState == 2) {
                        span.info('XMLHttpRequest headers received (readyState=2)', {
                            headers : getResponseHeaders(this),
                        });
                    } else if (this.readyState == 3) {
                            span.info('XMLHttpRequest loading (readyState=3)');
                    } else  if (this.readyState == 4) {
                        let responseType = this.responseType;
                        let payload = {
                            url          : url,
                            method       : method,
                            headers      : getResponseHeaders(this),
                            status       : this.status,
                            statusText   : this.statusText,
                            responseType : responseType,
                        };

                        // The responseText property is only valid if the responseType is
                        // '' or 'text'.  There are other types like 'arraybuffer' for which
                        // attempting to read responseText will throw an exception.
                        let validResponseType = (responseType === '' || responseType == 'text');
                        if (validResponseType && this.responseText) {
                            // Display the payload as JSON if it's parseable as such
                            try {
                                payload.responseJSON = JSON.parse(this.responseText);
                            } catch (e) {
                                payload.responseText = this.responseText;
                            }
                        } else {
                            payload.response = this.response;
                        }

                        let prefix = `XMLHttpRequest ${tags.method} done (readyState=4), status ${this.status}`;
                        if (!(this.status > 99)) {
                            span.error(`${prefix} (unknown)`, payload);
                        } else if (this.status < 199) {
                            span.info(`${prefix} (informational)`, payload);
                        } else if (this.status < 299) {
                            span.info(`${prefix} (successful)`, payload);
                        } else if (this.status < 399) {
                            span.info(`${prefix} (redirection)`, payload);
                        } else if (this.status < 499) {
                            span.error(`${prefix} (client error)`, payload);
                        } else if (this.status < 599) {
                            span.error(`${prefix} (server error)`, payload);
                        } else {
                            span.error(`${prefix} (unknown)`, payload);
                        }
                        span.end();
                    } else {
                        span.info(`XMLHttpRequest readyState=${this.readyState}`);
                    }
                });
            }

            let result = proxied.open.apply(this, arguments);
            if (!async) {
                span.end();
            }
            return result;
        };
    }

    _instrumentSend() {
        let self = this;
        let tracer = this._runtime;
        return function() {
            let url = this.__tracer_url;
            if (!self._shouldTrace(tracer, this, this.__tracer_url)) {
                return proxied.send.apply(this, arguments);
            }
            let span = this.__tracer_span;
            if (!span) {
                return proxied.send.apply(this, arguments);
            }

            let data = Array.prototype.slice.call(arguments);
            let len = undefined;
            if (data.length == 1) {
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
            span.info(`XMLHttpRequest send${lenStr}`, { data : data });
            return proxied.send.apply(this, arguments);
        }
    }

    _shouldTrace(tracer, xhr, url) {
        let opts = tracer.options();
        if (opts.disabled) {
            return false;
        }
        if (!url) {
            return false;
        }
        for (let ex of opts.xhr_url_exclusion_patterns) {
            if (ex.test(url)) {
                return false;
            }
        }
        return true;
    }
}

function getCookies() {
    if (typeof document === "undefined" || !document.cookie) {
        return null;
    }

    let cookies = document.cookie.split(";");
    let data = {};
    let count = 0;
    for (let i = 0; i < cookies.length; i++) {
        let parts = cookies[i].split("=", 2);
        if (parts.length === 2) {
            let key = parts[0].replace(/^\s+/,"").replace(/\s+$/, "");
            data[key] = decodeURIComponent(parts[1]);
            try {
                data[key] = JSON.parse(data[key]);
            } catch (_ignored) {}
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
    let parts = raw.replace(/\s+$/, "").split(/\n/);
    for (let i in parts) {
        parts[i] = parts[i].replace(/\r/g, "").replace(/^\s+/,"").replace(/\s+$/,"");
    }
    return parts;
}

module.exports = new InstrumentXHR();
