const optionsParser = require('./options_parser.js');
const util = require('./util');

const kRuntimeGUIDCookiePrefix = 'lightstep_guid';
const kSessionIDCookieKey = 'lightstep_session_id';
const kCookieTimeToLiveSeconds = 7 * 24 * 60 * 60;

let nowMicrosImp = (function () {
    // Is a hi-res timer available?
    if (window.performance
        && window.performance.now
        && window.performance.timing
        && window.performance.timing.navigationStart) {
        let start = performance.timing.navigationStart;
        return function () {
            return Math.floor((start + performance.now()) * 1000.0);
        };
    }
    // The low-res timer is the best we can do
    return function () {
        return Date.now() * 1000.0;
    };
}());

class PlatformBrowser {
    name() {
        return 'browser';
    }

    nowMicros() {
        return nowMicrosImp();
    }

    // Return the GUID to use for the runtime. The intention is to reuse the
    // GUID so that logically a single browser session looks like a single
    // runtime.
    runtimeGUID(groupName) {
        // Account for the groupName in the same that multiple apps or services
        // are running on the same domain (and should not share the same
        // runtime GUID).
        let cookieKey = encodeURIComponent(`${kRuntimeGUIDCookiePrefix}/${groupName}`);
        let uuid = util.cookie(cookieKey) || this._generateLongUUID();
        util.cookie(cookieKey, uuid, kCookieTimeToLiveSeconds, '/');

        // Also create a session ID as well to give the server more information
        // to coordinate with.
        let sessionID = util.cookie(kSessionIDCookieKey) || this._generateLongUUID();
        util.cookie(kSessionIDCookieKey, sessionID, kCookieTimeToLiveSeconds, '/');

        return uuid;
    }

    generateUUID() {
        return this._generateLongUUID();
    }

    _generateLongUUID() {
        /* eslint-disable no-bitwise */
        let p0 = `00000000${Math.abs((Math.random() * 0xFFFFFFFF) | 0).toString(16)}`.substr(-8);
        let p1 = `00000000${Math.abs((Math.random() * 0xFFFFFFFF) | 0).toString(16)}`.substr(-8);
        return `${p0}${p1}`;
        /* eslint-enable no-bitwise */
    }

    onBeforeExit(...args) {
        // This will result in the final report not being made in non-browser
        // environments like React Native. Flush should be called explicitly in
        // those environments
        if (util.isBrowser()) {
            window.addEventListener('beforeunload', ...args);
        }
    }

    plugins(opts) {
        return [
            require('../../../plugins/instrument_xhr'),
            require('../../../plugins/instrument_fetch'),
            require('../../../plugins/instrument_document_load'),
        ];
    }

    options(imp) {
        let tracerOpts = {};
        let browserOpts = {};
        optionsParser.parseScriptElementOptions(tracerOpts, browserOpts);
        optionsParser.parseURLQueryOptions(tracerOpts, browserOpts);
        return tracerOpts;
    }

    static initLibrary(lib) {
        let tracerOpts = {};
        let browserOpts = {};
        optionsParser.parseScriptElementOptions(tracerOpts, browserOpts);

        if (browserOpts.init_global_tracer) {
            PlatformBrowser.initGlobalTracer(lib, tracerOpts);
        }
    }

    static initGlobalTracer(lib, opts) {
        if (typeof window !== 'object') {
            return;
        }
        if (typeof window.opentracing !== 'object') {
            return;
        }
        opentracing.initGlobalTracer(new lib.Tracer(opts)); // eslint-disable-line no-undef
    }

    tracerTags() {
        return {
            'lightstep.tracer_platform' : 'browser',
        };
    }

    // There's no way to truly "fatal" on the browser; the best approximation
    // is an Error exception.
    fatal(message) {
        throw new Error(message);
    }

    localStoreGet(key) {
        try {
            if (!window.sessionStorage) {
                return null;
            }
        } catch (_ignored) {
            // Accessing `sessionStorage` or `localStorage` in an `<iframe>` in Chrome throws when
            // the user setting "block third-party cookies and site data" is turned on.
            //
            // eslint-disable-next-line max-len
            // https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
            return null;
        }
        try {
            return JSON.parse(sessionStorage.getItem(`lightstep/${key}`));
        } catch (_ignored) {
            return null;
        }
    }

    localStoreSet(key, value) {
        try {
            if (!window.sessionStorage) {
                return;
            }
        } catch (_ignored) {
            // (See comment above)
            return;
        }
        try {
            sessionStorage.setItem(`lightstep/${key}`, JSON.stringify(value));
        } catch (_ignored) { /* Ignored */ }
    }
}

module.exports = PlatformBrowser;
