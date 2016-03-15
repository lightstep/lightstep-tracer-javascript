# lightstep-tracer

LightStep implementation of the [OpenTracing API](http://opentracing.io/).

## Installation

```
npm install --save lightstep-tracer opentracing
```

## Getting Started

To use LightStep as the OpenTracing binding, initialize the global tracer with the LightStep implementation:

```javascript
Tracer.initGlobalTracer(LightStep.tracer({
    access_token   : '{your_access_token}',
    group_name     : '{your_service_or_app_name}',
}));
```

* For more information about using the OpenTracing API, see http://opentracing.io/.
* See [examples/browser](https://github.com/lightstep/lightstep-tracer-javascript/tree/master/examples/browser) for a JavaScript browser example
* See [examples/node](https://github.com/lightstep/lightstep-tracer-javascript/tree/master/examples/node) for a Node.js server-side example


## Supported Platforms

* **Node**: Node versions >= 0.12 are supported.

## License

[The MIT License](LICENSE).

Copyright (c) 2016, LightStep
