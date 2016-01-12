'use strict';

const Tracer = require('opentracing');
const lightstep = require('../../dist/lightstep-node-debug');

Tracer.initialize({
    backend        : lightstep.openTracingAdapter(),
    log_to_console : true,
});

let span = Tracer.span('test_span');
span.info(`Starting span ${Date.now()}`);
setTimeout(()=> {
    span.info(`Ending span ${Date.now()}`);
    span.end();
}, 1500);
