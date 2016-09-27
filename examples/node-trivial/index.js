'use strict';

var Tracer    = require('opentracing');
var LightStep = require('../..');

Tracer.initGlobalTracer(LightStep.tracer({
    access_token   : '{your_access_token}',
    component_name : 'lightstep-tracer/examples/node-trivial',
}));

var span = Tracer.startSpan('trivial_span');
setTimeout(function() {
    span.logEvent('log_event');
}, 100);
setTimeout(function() {
    span.finish();
}, 200);

var url = span.imp().generateTraceURL();
console.log('URL: ' + url);
