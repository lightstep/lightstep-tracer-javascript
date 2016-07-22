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
    component_name : '{your_service_or_app_name}',
}));
```

The **[LightStep JavaScript Tracing Cookbook](doc/cookbook.md)** is a good next stop for information on how to quickly instrument your system.  If you want to try something out quickly in your browser code, see the **[browser quick start example](doc/cookbook.md#browser-quick-start)**.

* For more information about using the OpenTracing API, see http://opentracing.io/
* See [examples/browser](https://github.com/lightstep/lightstep-tracer-javascript/tree/master/examples/browser) for a complete JavaScript browser example
* See [examples/node](https://github.com/lightstep/lightstep-tracer-javascript/tree/master/examples/node) for a complete Node.js server-side example

The browser version of the code can be explicitly included using the following, which can be helpful in some [`browserify`](https://github.com/substack/node-browserify) (or similar) setups:

```javascript
var LightStep = require('lightstep-tracer/browser');
```


## LightStep-specific API

The OpenTracing standard JavaScript API is [documented here](https://doc.esdoc.org/github.com/opentracing/opentracing-javascript/). The following describes LightStep-specific options and methods.

### LightStep

---

#### tracer(options)

**Required options**

* `access_token` `string` *required* - the project access token
* `component_name` `string` *required* - the string identifier for the application, service, or process

**Standard options**

* `verbosity` `number` *optional, default=1* - controls the level of logging to the console
    - `0` - the client library will *never* log to the console
    - `1` - only the first error encountered will be logged to the console
    - `2` - all errors are logged to the console
    - `3` - all errors, warnings, and info statements are logged to the console
    - `4` - all log statements, including debugging details
* `collector_host` `string` *optional* - custom collector hostname
* `collector_port` `number` *optional* - custom collector port
* `collector_encryption` `string` *optional, default='tls'*
    - `tls` - use HTTPS encrypted connections
    - `none` - use HTTP plain-text connections

**Browser-specific initialization options**

* `xhr_instrumentation` `bool` - if false, disables automatic instrumentation of XMLHttpRequests (XHRs). This must be set at initialization; changes after initialization will have no effect. Defaults to false.  

* `xhr_url_inclusion_patterns` `RegExp[]` - an array of regular expressions used to whitelist URLs for `XMLHttpRequest` auto-instrumentation. The default value is wildcard matching all strings. For a given URL to be instrumented, it must match at least one regular expression in `xhr_url_inclusion_patterns` and not match any regular expressions in `xhr_url_exclusion_patterns`.

* `xhr_url_exclusion_patterns` `RegExp[]` - an array of regular expressions used to exclude URLs from `XMLHttpRequest` auto-instrumentation. The default value is an empty array. For a given URL to be instrumented, it must match at least one regular expression in `xhr_url_inclusion_patterns` and not match any regular expressions in `xhr_url_exclusion_patterns`.

**Non-standard options**

*NOTE: Future API compatibility on non-standard options is not guaranteed.*

* `disable_reporting_loop` `bool` *optional*, *default=false* - if true, the timer that automatically sends reports to the collector will be disabled. This option is independent of `disable_report_on_exit`.
* `disable_report_on_exit` `bool` *optional*, *default=false* - if true, the final report that is automatically sent at process exit in Node or page unload in the browser will not be sent.
* `default_span_tags` `string` *optional* - an associative array of tags to add to every span started by the tracer (e.g., the active user id in a browser client)


### TracerImp

---

#### flush(done)

Causes a manual report of any buffered data.

* `done` `function(err)` *optional* - callback to invoke when the report finishes.

Example:

```
// Note: flush() is currently exposed by the OpenTracing JavaScript API. This
// may be subject to change and is not part of the API in all languages.
tracer.flush(function (err) {
    // ...
});
```

### SpanImp

---

#### generateTraceURL()

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
