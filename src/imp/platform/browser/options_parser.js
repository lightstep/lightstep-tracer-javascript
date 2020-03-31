const util = require('./util');

/* global WorkerGlobalScope */
// Find the HTML element that included the tracing library (if there is one).
// This relies on the fact that scripts are executed as soon as they are
// included -- thus 'this' script is the last one in the array at the time
// this is run.
let hostScriptElement = (function () {
    // check to see if we're in a webworker
    // eslint-disable-next-line no-restricted-globals
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        return null;
    }
    if (!util.isBrowser()) {
        return null;
    }
    let scripts = document.getElementsByTagName('SCRIPT');
    if (!(scripts.length > 0)) {
        return null;
    }
    return scripts[scripts.length - 1];
}());

function urlQueryParameters(defaults) {
    let vars = {};
    let qi = window.location.href.indexOf('?');
    if (qi < 0) {
        return vars;
    }
    let slice = window.location.href.slice(qi + 1);
    if (slice.indexOf('#') >= 0) {
        slice = slice.slice(0, slice.indexOf('#'));
    }
    let hashes = slice.replace(/\+/, '%20').split('&');
    for (let i = 0; i < hashes.length; i++) {
        let hash = hashes[i].split('=');
        vars[decodeURIComponent(hash[0])] = decodeURIComponent(hash[1]);
    }
    return vars;
}

// Parses options out of the host <script> element. Allows for easy configuration
// via the HTML element. Example:
//
// <script src='lightstep.min.js'
//      data-access_token='{my_access_token}'
//      data-component_name='my_component'></script>
//
// Note: relies on the global hostScriptElement variable defined above.
//
function parseScriptElementOptions(opts, browserOpts) {
    if (!hostScriptElement) {
        return;
    }

    let { dataset } = hostScriptElement;

    let accessToken = dataset.access_token;
    if (typeof accessToken === 'string' && accessToken.length > 0) {
        opts.access_token = accessToken;
    }

    let componentName = dataset.component_name;
    if (typeof componentName === 'string' && componentName.length > 0) {
        opts.component_name = componentName;
    }

    let collectorHost = dataset.collector_host;
    if (typeof collectorHost === 'string' && collectorHost.length > 0) {
        opts.collector_host = collectorHost;
    }
    let collectorPort = dataset.collector_port;
    if (collectorPort) {
        opts.collector_port = parseInt(collectorPort, 10);
    }
    let collectorPath = dataset.collector_path;
    if (typeof collectorPath === 'string' && collectorPath.length > 0) {
        opts.collector_path = collectorPath;
    }
    let collectorEncryption = dataset.collector_encryption;
    if (collectorEncryption) {
        opts.collector_encryption = collectorEncryption;
    }

    let { enable } = dataset;
    if (typeof enable === 'string') {
        if (enable === 'true') {
            opts.enable = true;
        } else if (enable === 'false') {
            opts.enable = false;
        }
    }
    let { verbosity } = dataset;
    if (typeof verbosity === 'string') {
        opts.verbosity = parseInt(verbosity, 10);
    }

    let init = dataset.init_global_tracer;
    if (typeof init === 'string') {
        if (init === 'true') {
            browserOpts.init_global_tracer = true;
        } else if (init === 'false') {
            browserOpts.init_global_tracer = false;
        }
    }

    // NOTE: this is a little inelegant as this is hard-coding support for a
    // "plug-in" option.
    if (typeof dataset.xhr_instrumentation === 'string' && dataset.xhr_instrumentation === 'true') {
        opts.xhr_instrumentation = true;
    }

    if (typeof dataset.instrument_page_load === 'string' && dataset.instrument_page_load === 'true') {
        opts.instrument_page_load = true;
    }
}

function parseScriptElementOptionsNoop(opts, browserOpts) {

}

// Parses options out of the current URL query string. The query parameters use
// the 'lightstep_' prefix to reduce the chance of collision with
// application-specific query parameters.
//
// This mechanism is particularly useful for debugging purposes as it does not
// require any code or configuration changes.
//
function parseURLQueryOptions(opts) {
    let params = urlQueryParameters();
    if (params.lightstep_verbosity) {
        try {
            opts.verbosity = parseInt(params.lightstep_verbosity, 10);
        } catch (_ignored) { /* Ignored */ }
    }
    if (params.lightstep_log_to_console) {
        opts.log_to_console = true;
    }
}

function parseURLQueryOptionsNoop(opts) {
    return {};
}

module.exports = {
    parseScriptElementOptions : util.isBrowser() ? parseScriptElementOptions : parseScriptElementOptionsNoop,
    parseURLQueryOptions      : util.isBrowser() ? parseURLQueryOptions : parseURLQueryOptionsNoop,
};
