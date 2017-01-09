'use strict';

var lightstep = require('../..');

var tracer = new lightstep.Tracer({
    access_token   : '{your_access_token}',
    component_name : 'lightstep-tracer/examples/node-trivial',
});

var span = tracer.startSpan('trivial_span');
setTimeout(function() {
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

var url = span.generateTraceURL();
console.log('URL: ' + url);
