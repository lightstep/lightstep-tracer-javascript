'use strict';

var lightstep = require('../../..');

var Tracer = new lightstep.Tracer({
    access_token   : '{your_access_token}',
    component_name : 'lightstep-tracer/examples/node-trivial',
    collector_host : 'localhost',
    collector_port : 9998,
    collector_encryption : 'none',
    //disable_reporting_loop : true,
});

function loop() {
    var parent = Tracer.startSpan('parent');
    for (var i = 0; i < 20000; i++) {
        var child = Tracer.startSpan('child', { parent: parent });
        child.logEvent('log_event');

        // Intentional internal error
        if (Math.random() < 0.01) {
            Tracer.inject(child, "custom_format", []);
        }
        child.finish();
    }
    parent.finish();

    console.log(Tracer.stats());
    Tracer.flush(function() {
        var url = parent.generateTraceURL();
        console.log();
        console.log(url);
        console.log();
        setTimeout(loop, 3000 * Math.random());
    });
}
loop();
