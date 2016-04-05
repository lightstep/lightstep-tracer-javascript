const optionsParser = require('./options_parser.js');
const util = require('./util');

const kRuntimeGUIDCookiePrefix = 'lightstep_guid';
const kSessionIDCookieKey = 'lightstep_session_id';
const kCookieTimeToLiveSeconds = 7 * 24 * 60 * 60;

let nowMicrosImp = (function () {
    // Is a hi-res timer available?
    if (window.performance &&
        window.performance.now &&
        window.performance.timing &&
        window.performance.timing.navigationStart) {
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
        let cookieKey = `${kRuntimeGUIDCookiePrefix}/${groupName}`;
        let uuid = util.cookie(cookieKey) || this._generateLongUUID();
        util.cookie(cookieKey, uuid, kCookieTimeToLiveSeconds, '/');

        // Also create a session ID as well to give the server more information
        // to coordinate with.
        let sessionID = util.cookie(kSessionIDCookieKey) || this._generateLongUUID();
        util.cookie(kSessionIDCookieKey, sessionID, kCookieTimeToLiveSeconds, '/');

        return uuid;
    }

    // A low-quality UUID: this is just a 53-bit random integer! (53 bits since the
    // backing store for the number is a 64-bit float).
    generateUUID() {
        return Math.floor(Math.random() * 9e15).toString(16);
    }

    _generateLongUUID() {
        let a = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
        let b = Math.floor(Math.random() * 0xFFFFFFFF).toString(16);
        while (b.length < 8) {
            b = `0${b}`;
        }
        return a + b;
    }

    onBeforeExit(...args) {
        if (window) {
            window.addEventListener('beforeunload', ...args);
        }
    }

    plugins(opts) {
        return [
            require('../../../plugins/instrument_xhr'),
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
        if (typeof window.Tracer !== 'object') {
            return;
        }
        Tracer.initGlobalTracer(lib.tracer(opts));  // eslint-disable-line no-undef
    }

    tracerTags() {
        return {
            lightstep_tracer_platform : 'browser',
        };
    }

    // There's no way to truly "fatal" on the browser; the best approximation
    // is an Error exception.
    fatal(message) {
        throw new Error(message);
    }

    localStoreGet(key) {
        if (!window.sessionStorage) {
            return null;
        }
        try {
            return JSON.parse(sessionStorage.getItem(`lightstep/${key}`));
        } catch (_ignored) {
            return null;
        }
    }

    localStoreSet(key, value) {
        if (!window.sessionStorage) {
            return;
        }
        try {
            sessionStorage.setItem(`lightstep/${key}`, JSON.stringify(value));
        } catch (_ignored) { /* Ignored */ }
    }
}

module.exports = PlatformBrowser;
