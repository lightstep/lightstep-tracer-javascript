'use strict';

var lightstep = require('../..');

var tracer = new lightstep.Tracer({
    access_token   : '{your_access_token}',
    component_name : 'lightstep-tracer/examples/node-trivial',
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
}, 100);
setTimeout(function() {
    span.finish();
}, 200);

var url = span.generateTraceURL();
console.log('URL: ' + url);
