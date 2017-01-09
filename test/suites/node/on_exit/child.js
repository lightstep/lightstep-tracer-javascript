var lightstep = require("../../../..");
var FileTransport = require("../../../util/file_transport");
var path = require('path');

var reportFilename = path.join(__dirname, "../../../results/on_exit_child.json");

Tracer = new lightstep.Tracer({
    access_token       : "{your_access_token}",
    component_name     : "lightstep-tracer/unit-test/on_exit",
    override_transport : new FileTransport(reportFilename),
});

for (var i = 0; i < 10; i++) {
    var span = Tracer.startSpan("test_span_" + i);
    span.log({"log_index" : i});
    span.finish();
}
