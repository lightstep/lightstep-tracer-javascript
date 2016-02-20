var Tracer = require('opentracing');
var LightStep = require("../../../../dist/lightstep-tracer-node-debug");
var FileTransport = require("../../../util/file_transport");
var path = require('path');

var reportFilename = path.join(__dirname, "../../../results/on_exit_child.json");

Tracer.initGlobalTracer(LightStep.tracer({
    access_token           : "{your_access_token}",
    group_name             : "lightstep-tracer/unit-test/on_exit",
    override_transport     : new FileTransport(reportFilename),
}));

var span = Tracer.startSpan("test_span");
for (var i = 0; i < 10; i++) {
    span.imp().info("log" + i);
}
span.finish();
