//
// Hide the differences in how the Thrift compiler generates code for the
// different platforms as well as expose a Platform class to abstract a few
// general differences in the platforms.
//

if ((typeof PLATFORM_BROWSER != 'undefined') && PLATFORM_BROWSER) {
    module.exports = {
        Platform       : require('./imp/platform/browser/platform_browser.js'),
        Transport      : require('./imp/platform/browser/transport_httpjson.js'),
        thrift         : require('./imp/platform/browser/thrift.js'),
        crouton_thrift : require('./imp/platform/browser/crouton_thrift.js'),
    };
} else {
    module.exports = {
        Platform       : require('./imp/platform/node/platform_node.js'),
        Transport      : require('./imp/platform/node/transport_httpjson.js'),
        thrift         : require('thrift'),
        crouton_thrift : require('./imp/platform/node/crouton_thrift.js'),
    };
}
