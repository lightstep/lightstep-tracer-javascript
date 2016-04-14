# lightstep-tracer

[![npm version](https://badge.fury.io/js/lightstep-tracer.svg)](https://badge.fury.io/js/lightstep-tracer)
[![Circle CI](https://circleci.com/gh/lightstep/lightstep-tracer-javascript.svg?style=shield)](https://circleci.com/gh/lightstep/lightstep-tracer-javascript)
[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

LightStep implementation of the [OpenTracing API](http://opentracing.io/).

## Installation

```
npm install --save lightstep-tracer opentracing
```

All modern browsers and Node versions >= 0.12 are supported.

## Getting Started

To use LightStep as the OpenTracing binding, initialize the global tracer with the LightStep implementation:

```javascript
var Tracer    = require('opentracing');
var LightStep = require('lightstep-tracer');

Tracer.initGlobalTracer(LightStep.tracer({
    access_token   : '{your_access_token}',
    group_name     : '{your_service_or_app_name}',
}));
```

The **[LightStep JavaScript Tracing Cookbook](doc/cookbook.md)** is a good next stop for information on how to quickly instrument your system.

* For more information about using the OpenTracing API, see http://opentracing.io/
* See [examples/browser](https://github.com/lightstep/lightstep-tracer-javascript/tree/master/examples/browser) for a complete JavaScript browser example
* See [examples/node](https://github.com/lightstep/lightstep-tracer-javascript/tree/master/examples/node) for a complete Node.js server-side example

The browser version of the code can be explicitly included using the following, which can be helpful in some [`browserify`](https://github.com/substack/node-browserify) (or similar) setups:

```javascript
var LightStep = require('lightstep-tracer/browser');
```


## LightStep Specific API

### LightStep

---

### tracer(options)

* `access_token` `string` *required* - the project access token
* `group_name` `string` *required* - the string identifier for the application, service, or process. (*NOTE:* this parameter is subject to renaming for consistency with other LightStep / OpenTracing libraries and maybe be optional in the future.)

**Browser-specific initialization options**

* `xhr_instrumentation` `bool` - if false, disables automatic instrumentation of XMLHttpRequests (XHRs). This must be set at initialization; changes after initialization will have no effect. Defaults to false.  

* `xhr_url_inclusion_patterns` `RegExp[]` - an array of regular expressions used to whitelist URLs for `XMLHttpRequest` auto-instrumentation. The default value is wildcard matching all strings. For a given URL to be instrumented, it must match at least one regular expression in `xhr_url_inclusion_patterns` and not match any regular expressions in `xhr_url_exclusion_patterns`.

* `xhr_url_exclusion_patterns` `RegExp[]` - an array of regular expressions used to exclude URLs from `XMLHttpRequest` auto-instrumentation. The default value is an empty array. For a given URL to be instrumented, it must match at least one regular expression in `xhr_url_inclusion_patterns` and not match any regular expressions in `xhr_url_exclusion_patterns`.

### SpanImp

---

### generateTraceURL()

Returns an absolute URL to the LightStep application for the trace containing this span. It is safe to call this method after `finish()`.

```js
...
span.finish();

var url = span.imp().generateTraceURL())
console.log('View the trace for this span at:', url);
```

## License

[The MIT License](LICENSE).

Copyright (c) 2016, LightStep
