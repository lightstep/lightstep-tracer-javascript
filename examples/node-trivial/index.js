'use strict';

var Tracer    = require('opentracing');
var LightStep = require('../..');

Tracer.initGlobalTracer(LightStep.tracer({
    access_token   : 'DEVELOPMENT_TOKEN_bhs',
    component_name : 'lightstep-tracer/examples/node-trivial',
}));

var span = Tracer.startSpan('trivial_span');
setTimeout(function() {
    span.logEvent('log_event');
    span.log({
        foo: 'foo string',
        'bar bar': 'two words',
        number: 42,
        floaty: 4.2,
        obj: {
            'baz': 'boo',
        },
    });
}, 100);
setTimeout(function() {
    span.finish();
}, 200);

var url = span.imp().generateTraceURL();
console.log('URL: ' + url);
