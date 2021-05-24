/* global PLATFORM_BROWSER */

// Hide the differences in how the Thrift compiler generates code for the
// different platforms as well as expose a Platform class to abstract a few
// general differences in the platforms.
if ((typeof PLATFORM_BROWSER !== 'undefined') && PLATFORM_BROWSER) {
    module.exports = {
        Platform        : require('./imp/platform/browser/platform_browser.js'),
        ThriftTransport : require('./imp/platform/browser/transport_httpthrift.js'),
        ProtoTransport  : require('./imp/platform/browser/transport_httpproto.js'),
        thrift          : require('./imp/platform/browser/thrift.js'),
        crouton_thrift  : require('./imp/platform/browser/crouton_thrift.js'),
        proto           : require('./imp/generated_proto/collector_pb.js'),
    };
} else {
    module.exports = {
        Platform        : require('./imp/platform/node/platform_node.js'),
        ThriftTransport : require('./imp/platform/node/transport_httpthrift.js'),
        ProtoTransport  : require('./imp/platform/node/transport_httpproto.js'),
        // Note: THRIFT-5029 requires us to use a non-standard require
        // TODO: remove non-standard require after https://github.com/apache/thrift/pull/1947 merges
        thrift          : require('thrift/lib/nodejs/lib/thrift'),
        crouton_thrift  : require('./imp/platform/node/crouton_thrift.js'),
        proto           : require('./imp/generated_proto/collector_pb.js'),
    };
}
