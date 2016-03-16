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

## LightStep Initialization Options

### Browser-specific

#### `xhr_url_inclusion_patterns RegExp[]`

The LightStep browser library automatically instruments all XMLHttpRequests (i.e. AJAX requests). This array allows an inclusion list to be specified: only URLs that match one or more of the regular expressions in this list will be considered for auto-instrumentation.

The default value is a single regular expression wildcard matching all strings.

For a given URL to be auto-instrumented, it must match at least one regular expression in `xhr_url_inclusion_patterns` and not match any regular expressions in `xhr_url_exclusion_patterns`.

#### `xhr_url_exclusion_patterns RegExp[]`

The LightStep browser library automatically instruments all XMLHttpRequests (i.e. AJAX requests). This array allows an exclusion list to be specified: a URL matching any of the exclusion patterns will not be instrumented.

The default value is an empty array.

For a given URL to be auto-instrumented, it must match at least one regular expression in `xhr_url_inclusion_patterns` and not match any regular expressions in `xhr_url_exclusion_patterns`.

## License

[The MIT License](LICENSE).

Copyright (c) 2016, LightStep
