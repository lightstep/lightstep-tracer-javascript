var Tracer = require("../../dist/lightstep-node-debug");

Tracer.options({
    // These are the only required options: the access token identifies your
    // project and the group_name is string of your choosing to identify
    // individual services or processes within your project or application.
    access_token           : "{your_access_token}",
    group_name             : "js-example/hello_world",

    // Echo all logs to the console to make the demo more self-explanatory
    log_to_console         : true,

    // Use explicit calls to flush() so the demo is more clear. Normally, the
    // instrumentation library uses a background reporting loop to incrementally
    // report the data
    disable_reporting_loop : true,
});

// Standard logging
Tracer.infof("Hello World!");
Tracer.warnf("Favorite number = %d", 42);
Tracer.errorf("Favorite things = %j", { animal : 'dolphin' });

// A contrived trace
var outer = Tracer.span("outer_operation");
outer.endUserID("douglas_adams");
setTimeout(function() {
    var inner1 = outer.span("inner_operation_1");
    setTimeout(function() {
        inner1.end();
    }, 10);
    var inner2 = outer.span("inner_operation_2");
    setTimeout(function() {
        inner2.end();
    }, 60);
}, 10);
setTimeout(function() {
    outer.end();
}, 50);

setTimeout(function() {
    Tracer.flush();
    console.log("Done!");
}, 250);
