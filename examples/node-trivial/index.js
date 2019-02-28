'use strict';

var lightstep = require('../..');
var opentracing = require('opentracing');

var tracer = new lightstep.Tracer({
    component_name : 'lightstep-tracer/examples/node-trivial',
    verbosity: 4
});

var span = tracer.startSpan('trivial_span');
setTimeout(function() {
    span.log({
        event    : 'log_event',
        my_field : 'a string',
        'generic string' : 'two words',
        number   : 42,
        float    : 4.2,
        obj      : {
            'property': 'value',
        },
    });
    var childSpan = tracer.startSpan('childSpan',{ childOf: span.context()});
    setTimeout(function() {
        childSpan.log({event: 'childevent'})
        childSpan.finish();
    }, 0.5)
}, 600);
setTimeout(function() {
    span.finish();
    tracer.inject(span, opentracing.FORMAT_TEXT_MAP, {});
}, 1000);

var url = span.generateTraceURL();
console.log('URL: ' + url);
tracer.flush();
