'use strict';

var Tracer    = require('opentracing');
var LightStep = require('../../dist/lightstep-tracer-node-debug');

//
// Initialize the OpenTracing APIs to use the LightStep binding
//
Tracer.initGlobalTracer(LightStep.tracer({
    // NOTE: this will need to be replaced with your project access
    // token in order to see the reported spans on the LightStep app.
    access_token   : '{your_access_token}',

    // String identifier of the service or process
    group_name     : 'lightstep-tracer/examples/opentracing',

    // Option to also log events to the console
    log_to_console : true,
}));

var span = Tracer.startSpan('test_span');
span.logEvent('start_span_event', {
    date : new Date(),
    message : "Starting span " + Date.now(),
});

function step1() {
    span.logEvent('step_1');
    var child = Tracer.startSpan('test_span_child', { parent : span });
    setTimeout(function() {
        child.logEvent('message', { message : 'Child span is done.' });
        child.finish();
    }, 50 + Math.floor(50 * Math.random()));
    setTimeout(step2, 150);
}
function step2() {
    span.logEvent('step_2');
    var child = Tracer.startSpan('test_child_from_context', { parent : span });
    setTimeout(function() {
        child.logEvent('message', { message : 'Child span from context is done.' });
        child.finish();
    }, 50 + Math.floor(50 * Math.random()));
    setTimeout(step3, 150);
}
function step3() {
    span.logEvent('message', { message : 'Step 3' });
    span.logEvent('message', {
        message : "Ending span " + Date.now(),
        favorite_bool   : true,
        favorite_number : 42,
        favorite_string : "twine",
        favorite_array  : [ 2, 3, 5, 7, 11, 13, 17 ],
        favorite_object : new Object,
    });
    span.finish();
}

setTimeout(step1, 250);
