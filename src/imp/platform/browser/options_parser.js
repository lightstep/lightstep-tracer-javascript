const util = require('./util');

// Find the HTML element that included the tracing library (if there is one).
// This relies on the fact that scripts are executed as soon as they are
// included -- thus "this" script is the last one in the array at the time
// this is run.
let hostScriptElement = (function() {
    var scripts = document.getElementsByTagName("SCRIPT");
    if (!(scripts.length > 0)) {
        return null;
    }
    return scripts[scripts.length - 1];
})();

function urlQueryParameters(defaults) {
    let vars = {};
    let qi = window.location.href.indexOf('?');
    if (qi < 0) {
        return vars;
    }
    let slice = window.location.href.slice(qi + 1);
    if (slice.indexOf("#") >= 0) {
        slice = slice.slice(0, slice.indexOf("#"));
    }
    let hashes = slice.replace(/\+/, "%20").split('&');
    for (let i = 0; i < hashes.length; i++) {
        let hash = hashes[i].split('=');
        vars[decodeURIComponent(hash[0])] = decodeURIComponent(hash[1]);
    }
    return vars;
}

// Parses options out of the host <script> element. Allows for easy configuration
// via the HTML element. Example:
//
// <script src="lightstep.min.js"
//      access_token="{my_access_token}"
//      group_name="my_group"></script>
//
// Note: relies on the global hostScriptElement variable defined above.
//
module.exports.parseScriptElementOptions = function (opts) {
    if (!hostScriptElement) {
        return;
    }

    let dataset = hostScriptElement.dataset;

    let accessToken = dataset.access_token;
    if (typeof accessToken === "string" && accessToken.length > 0) {
        opts.access_token = accessToken;
    }
    let groupName = dataset.group_name;
    if (typeof groupName === "string" && groupName.length > 0) {
        opts.group_name = groupName;
    }
    let serviceHost = dataset.service_host;
    if (typeof serviceHost === "string" && serviceHost.length > 0) {
        opts.service_host = serviceHost;
    }
    let servicePort = dataset.service_port;
    if (servicePort) {
        opts.service_port = parseInt(servicePort);
    }
    let joinIds = dataset.join_ids;
    if (joinIds) {
        try {
            opts.join_ids = JSON.parse(joinIds);
        } catch (e) {
            console.error("Could not parse join_ids string:", joinIds);
        }
    }

    // Special case the "end_user_id" since that is by far the most likely
    // join ID to be set globally by browser instrumentation
    var endUserId = dataset.end_user_id;
    if (endUserId) {
        opts.join_ids = opts.join_ids || {};
        opts.join_ids.end_user_id = endUserId;
    }

    let enable = dataset.enable;
    if (typeof enable == "string") {
        if (enable == "true") {
            opts.enable = true;
        } else if (enable == "false") {
            opts.enable = false;
        }
    }
    let debug = dataset.debug;
    if (typeof debug == "string" && debug == "true") {
        opts.debug = true;
    }
    let verbosity = dataset.verbosity;
    if (typeof verbosity === "string") {
        opts.verbosity = parseInt(verbosity);
    }
};

// Parses options out of the current URL query string. The query parameters use
// the "lightstep_" prefix to reduce the chance of collision with
// application-specific query parameters.
//
// This mechanism is particularly useful for debugging purposes as it does not
// require any code or configuration changes.
//
module.exports.parseURLQueryOptions = function(opts) {
    if (!window) {
        return;
    }

    let params = urlQueryParameters();
    if (params.lightstep_debug) {
        opts.debug = true;
    }
    if (params.lightstep_verbosity) {
        try {
            opts.verbosity = parseInt(params.lightstep_verbosity);
        } catch (_ignored) {}
    }
    if (params.lightstep_log_to_console) {
        opts.log_to_console = true;
    }
};
