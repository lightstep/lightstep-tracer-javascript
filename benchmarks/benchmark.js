'use strict';

const Suite = require('sc-benchmark').Suite;
const opentracing = require('opentracing');
const lightstep = require('..');


function createNoopTracer() {
    return new opentracing.Tracer();
}
function createNonReportingTracer() {
    return new lightstep.Tracer({
        component_name         : 'lightstep-tracer/benchmarks',
        access_token           : 'unused',
        disable_reporting_loop : true,
        disable_report_on_exit : true,
        collector_host         : 'example.com',
    });
}
function createNestedObject(n) {
    if (n === 0) {
        return 42;
    }
    let m = {};
    for (let i = 0; i < 2*n; i++) {
        m[`key-${i}`] = createNestedObject(n - 1);
    }
    return m;
}
function busyWait(ms) {
    let start = process.hrtime();
    let delta;
    do {
        let t = process.hrtime(start);
        delta = t[0] * 1e3 + t[1] / 1e6;
    } while (delta < ms);
}

let s = new Suite();

s.bench('sanity check (10ms)', (N, t) => {
    for (let i = 0; i < N; i++) {
        busyWait(10.0);
    }
});

s.bench('uuid w/ crypto.randomBytes', (N, t) => {
    for (let i = 0; i < N; i++) {
        let a = new Array(1000);
        for (let j = 0; j < a.length; j++) {
            a[j] = require('crypto').randomBytes(8).toString('hex');
        }
    }
});

s.bench('uuid w/ Math.random()', (N, t) => {
    for (let i = 0; i < N; i++) {
        let a = new Array(1000);
        for (let j = 0; j < a.length; j++) {
            let p0 = `00000000${((Math.random() * 0xFFFFFFFF)|0).toString(16)}`.substr(-8);
            let p1 = `00000000${((Math.random() * 0xFFFFFFFF)|0).toString(16)}`.substr(-8);
            a[j] = `${p0}${p1}`;
        }
    }
});

let setups = [
    {
        name        : 'noop',
        makeTracer  : createNoopTracer,
    },
    {
        name        : 'ls',
        makeTracer  : createNonReportingTracer,
    }
];

for (let setup of setups) {
    s.bench(`startSpan (${setup.name})`, (N, t) => {
        let tracer = setup.makeTracer();
        t.start();
        for (let i = 0; i < N; i++) {
            let span = tracer.startSpan('test');
            span.finish();
        }
    });

    s.bench(`span with logs (${setup.name})`, (N, t) => {
        let tracer = setup.makeTracer();
        t.start();
        for (let i = 0; i < N; i++) {
            let span = tracer.startSpan('test');
            span.log({ message : 'Hello world!' });
            span.finish();
        }
    });

    s.bench(`span with 100 logs (${setup.name})`, (N, t) => {
        let tracer = setup.makeTracer();
        t.start();
        for (let i = 0; i < N; i++) {
            let span = tracer.startSpan('test');
            for (let j = 0; j < 100; j++) {
                span.log({ message : 'Hello world!' });
            }
            span.finish();
        }
    });

    s.bench(`log with payload (${setup.name})`, (N, t) => {
        let tracer = setup.makeTracer();
        let payload = createNestedObject(5);
        t.start();
        for (let i = 0; i < N; i++) {
            let span = tracer.startSpan('test');
            span.log({ message : 'Hello world!', payload : payload });
            span.finish();
        }
    });

    s.bench(`nested spans (${setup.name})`, (N, t) => {
        let tracer = setup.makeTracer();
        function makeNested(depth, parent) {
            if (depth === 0) {
                return;
            }
            let span = tracer.startSpan('test', { parent : parent });
            makeNested(depth - 1, span);
            span.finish();
        }
        t.start();
        for (let i = 0; i < N; i++) {
            makeNested(32);
        }
    });
}

s.run();
