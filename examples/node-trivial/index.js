'use strict';

var lightstep = require('../..');

var tracer = new lightstep.Tracer({
    component_name : 'lightstep-tracer/examples/node-trivial'
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
}, 1000);

tracer.flush();
