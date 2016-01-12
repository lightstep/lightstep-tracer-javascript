# lightstep-tracer

LightStep implementation of the [OpenTracing API](http://opentracing.io/).

Current build status: [![Circle CI](https://circleci.com/gh/lightstephq/lightstep-tracer-javascript/tree/master.svg?style=svg)](https://circleci.com/gh/lightstephq/lightstep-tracer-javascript/tree/master)

## Installation

```
npm install --save lightstep-tracer opentracing
```

## Getting Started

```javascript

var Tracer = require('opentracing');
var LightStep = require('lightstep-tracer');

Tracer.initialize({
    backend      : LightStep.createOpenTracingAdapter(),
    group_name   : "my_server",
    access_token : "{your_access_token}"
});

// Send a regular global log along with a data payload
Tracer.info('Hello Tracer', { "now" : Date.now() });

// Send a span record for a given operation
var span = Tracer.span('trivial/sample_span');
span.tags({ 'end_user_id', 'john_smith' });
span.info('User data', {
    favorite_number : 42,
});
span.end();
```

See `example/hello_world` for a longer example.

## Supported Platforms

* **Node**: Node versions >= 0.12 are supported.

## License

[The MIT License](LICENSE).

Copyright (c) 2015, Resonance Labs.
