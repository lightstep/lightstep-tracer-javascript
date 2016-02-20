'use strict';

const Tracer = require('opentracing');
const LightStep = require('../../dist/lightstep-tracer-node-debug');

Tracer.initGlobalTracer(LightStep.tracer({
    access_token   : '{your_access_token}',
    group_name     : "lightstep-tracer/examples/opentracing",
    log_to_console : true,
}));

let span = Tracer.startSpan('test_span');
span.setTag('end_user_id', 'sarah_smith');
span.logEvent('start_span_event', {
    date : new Date(),
    message : `Starting span ${Date.now()}`,
});

function step1() {
    span.logEvent('step_1');
    let child = span.startChildSpan('test_span_child');
    setTimeout(function() {
        child.logEvent('message', { message : 'Child span is done.' });
        child.finish();
    }, 50 + Math.floor(50 * Math.random()));
    setTimeout(step2, 150);
}
function step2() {
    span.logEvent('step_2');
    let child = span.startChildSpan("test_child_from_context");
    setTimeout(function() {
        child.logEvent('message', { message : 'Child span from context is done.' });
        child.finish();
    }, 50 + Math.floor(50 * Math.random()));
    setTimeout(step3, 150);
}
function step3() {
    span.logEvent('message', { message : 'Step 3' });
    span.logEvent('message', {
        message : `Ending span ${Date.now()}`,
        favorite_bool   : true,
        favorite_number : 42,
        favorite_string : "twine",
        favorite_array  : [ 2, 3, 5, 7, 11, 13, 17 ],
        favorite_object : new Object,
    });
    span.finish();
}

setTimeout(step1, 250);
