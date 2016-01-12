var Tracer = require("../../../../dist/lightstep-tracer-node-debug");
var util = require("../../../util/util");

util.runtimeReportToFile(Tracer, process.argv[2]);
Tracer.options({
    access_token           : "{your_access_token}",
    group_name             : "api-javascript/unit-test/cmdline_args",
});

var span = Tracer.span("test_span");
for (var i = 0; i < 10; i++) {
    Tracer.infof("log%d", i);
}
span.end();
