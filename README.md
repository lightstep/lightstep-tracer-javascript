# lightstep-tracer

[![npm version](https://badge.fury.io/js/lightstep-tracer.svg)](https://badge.fury.io/js/lightstep-tracer)
[![Circle CI](https://circleci.com/gh/lightstep/lightstep-tracer-javascript.svg?style=shield)](https://circleci.com/gh/lightstep/lightstep-tracer-javascript)
[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

LightStep distributed tracing library for Node.js and the browser.

## Installation

```
npm install --save lightstep-tracer opentracing
```

All modern browsers and Node versions >= 8 are supported.

## Getting started

To use LightStep as the OpenTracing binding, initialize the global `Tracer` with the LightStep implementation:

```javascript
var opentracing = require('opentracing');
var lightstep   = require('lightstep-tracer');

opentracing.initGlobalTracer(new lightstep.Tracer({
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
var lightstep = require('lightstep-tracer/browser');
```


## LightStep-specific API

The OpenTracing standard JavaScript API is [documented here](https://doc.esdoc.org/github.com/opentracing/opentracing-javascript/). The following describes LightStep-specific options and methods.

### LightStep

---

#### new Tracer(options)

**Required options**

* `access_token` `string` *required* - the project access token
* `component_name` `string` *required* - the string identifier for the application, service, or process

**Standard options**

* `verbosity` `number` *optional, default=1* - controls the level of logging to the console
    - `0` - the client library will *never* log to the console
    - `1` - error reporting will be throttled to the first error per minute
    - `2` - all errors are logged to the console
    - `3` - all errors, warnings, and info statements are logged to the console
    - `4` - all log statements, including debugging details
* `collector_host` `string` *optional* - custom collector hostname
* `collector_port` `number` *optional* - custom collector port
* `collector_path` `string` *optional* - custom collector base path (if served behind a reverse proxy)
* `collector_encryption` `string` *optional, default='tls'*
    - `tls` - use HTTPS encrypted connections
    - `none` - use HTTP plain-text connections

**Browser-specific initialization options**

* `instrument_page_load` `bool` - creates a long-lived single span for the entire page view and is recommended for short-page visits in a multi-page website. For a single-page web app, this behavior may be undesirable. Defaults to false. This must be set at initialization, changes after initialization will have no effect.

* `xhr_instrumentation` `bool` - if false, disables automatic instrumentation of XMLHttpRequests (XHRs). This must be set at initialization; changes after initialization will have no effect. Defaults to false.

* `xhr_url_inclusion_patterns` `RegExp[]` - an array of regular expressions used to whitelist URLs for `XMLHttpRequest` auto-instrumentation. The default value is wildcard matching all strings. For a given URL to be instrumented, it must match at least one regular expression in `xhr_url_inclusion_patterns` and not match any regular expressions in `xhr_url_exclusion_patterns`.

* `xhr_url_exclusion_patterns` `RegExp[]` - an array of regular expressions used to exclude URLs from `XMLHttpRequest` auto-instrumentation. The default value is an empty array. For a given URL to be instrumented, it must match at least one regular expression in `xhr_url_inclusion_patterns` and not match any regular expressions in `xhr_url_exclusion_patterns`.

* `xhr_url_header_inclusion_patterns` `RegExp[]` - an array of regular expressions used to include URLs which auto-instrumented `XMLHttpRequest`s add tracing headers to. The default value is wildcard matching all strings. For a given URL to have tracing headers added, it must match at least one regular expression in `xhr_url_header_inclusion_patterns` and not match any regular expressions in `xhr_url_header_exclusion_patterns`.

* `xhr_url_header_exclusion_patterns` `RegExp[]` - an array of regular expressions used to exclude URLs that auto-instrumented `XMLHttpRequest`s add tracing headers to. The default value is an empty array. For a given URL to have tracing headers added, it must match at least one regular expression in `xhr_url_header_inclusion_patterns` and not match any regular expressions in `xhr_url_header_exclusion_patterns`.

* `fetch_instrumentation` `bool` - if false, disables automatic instrumentation of `window.fetch`. This must be set at initialization; changes after initialization will have no effect. Defaults to false.

* `fetch_url_inclusion_patterns` `RegExp[]` - an array of regular expressions used to whitelist URLs for `window.fetch` auto-instrumentation. The default value is wildcard matching all strings. For a given URL to be instrumented, it must match at least one regular expression in `fetch_url_inclusion_patterns` and not match any regular expressions in `fetch_url_exclusion_patterns`.

* `fetch_url_exclusion_patterns` `RegExp[]` - an array of regular expressions used to exclude URLs from `window.fetch` auto-instrumentation. The default value is an empty array. For a given URL to be instrumented, it must match at least one regular expression in `fetch_url_inclusion_patterns` and not match any regular expressions in `fetch_url_exclusion_patterns`.

* `fetch_url_header_inclusion_patterns` `RegExp[]` - an array of regular expressions used to include URLs for `window.fetch` tracer header inclusion. The default value is wildcard matching all strings. For a given URL to be have tracing headers added, it must match at least one regular expression in `fetch_url_header_inclusion_patterns` and not match any regular expressions in `fetch_url_header_exclusion_patterns`.

* `fetch_url_header_exclusion_patterns` `RegExp[]` - an array of regular expressions used to exclude header insertion onto URLs from `window.fetch` auto-instrumentation. The default value is an empty array. For a given URL to have tracing headers added, it must match at least one regular expression in `fetch_url_header_inclusion_patterns` and not match any regular expressions in `fetch_url_header_exclusion_patterns`.

* `include_cookies` `bool` - if true, includes cookies in the span logs for both `window.fetch` and `XMLHttpRequest`. Defaults to true.

**node-specific initialization options**

* `nodejs_instrumentation` `bool` - if false, disables automatic instrumentation of node requests.
This must be set at initialization; changes after initialization will have no effect. Defaults to false.

* `nodejs_url_inclusion_patterns` `RegExp[]` - an array of regular expressions used to whitelist
URLs
for the `http` and `https` modules auto-instrumentation. The default value is wildcard matching all strings.
For a given URL to be instrumented, it must match at least one regular expression in
`nodejs_url_inclusion_patterns` and not match any regular expressions in
`nodejs_url_exclusion_patterns`.

* `nodejs_url_exclusion_patterns` `RegExp[]` - an array of regular expressions used to exclude URLs
from the `http` and `https` modules auto-instrumentation. The default value is an empty array. For a given URL
to be instrumented, it must match at least one regular expression in
`nodejs_url_inclusion_patterns`
and not match any regular expressions in `nodejs_url_exclusion_patterns`.

**Non-standard options**

*NOTE: Future API compatibility on non-standard options is not guaranteed.*

* `disable_reporting_loop` `bool` *optional*, *default=false* - if true, the timer that automatically sends reports to the collector will be disabled. This option is independent of `disable_report_on_exit`.
* `disable_report_on_exit` `bool` *optional*, *default=false* - if true, the final report that is automatically sent at process exit in Node or page unload in the browser will not be sent.
* `report_timeout_millis` `number` *optional*, *default=30000* - the default timeout value, in milliseconds, for reports to the LightStep collector
* `gzip_json_requests` `bool` *optional*, *default=true* - if true, the reports will be gzipped before sent to the collector.
* `default_span_tags` `string` *optional* - an associative array of tags to add to every span started by the tracer (e.g., the active user id in a browser client)
* `delay_initial_report_millis` `int` *optional*, *default=1000* - maximum additional delay of the initial report in addition to the normal reporting interval. A value between zero and this maximum will be selected as the actual delay. This can be useful when concurrently launching a large number of new processes and there is a desire to distribute the initial reports over a window of time.
* `error_throttle_millis` `int` *optional*, *default=60000* - when `verbosity` is set to `1`, this the minimum time between logged errors.
* `transport` `string` *optional*, *default=proto* - when `transport` is set to `thrift`, the Tracer will use Thrift as its transport instead of Proto over HTTP. (Not supported in React-Native)
* `logger` `function(level: string, message: string, payload: any): void` *optional* - specify a custom logger function. Possible `level` values are `debug`, `info`, `warn` and `error`. By default messages will be logged to the console.
* `disable_meta_event_reporting` `bool` *optional*, *default=false* - when `disable_meta_event_reporting` is set to `true`, the tracer will disable meta event reporting even if requested by the Satellite.
* `propagators` `dictionary` *optional*, *defaults=*`{ [opentracing.FORMAT_HTTP_HEADERS]: new lightstep.LightStepPropagator(), [opentracing.FORMAT_TEXT_MAP]: new lightstep.LightStepPropagator(), [opentracing.FORMAT_BINARY]: new lightstep.UnsupportedPropagator() }`: Allows inject/extract to use custom propagators for different formats. This package includes `B3Propagator` that supports B3 headers on text maps and http headers. `DDPropagator` supports DataDog trace headers.
* `clear_span_buffer_consecutive_errors` `number` *optional*, *default=null* - each consecutive buffer flush error will check to see if `clear_span_buffer_consecutive_errors` has been reached.  If reached, the span buffer will be emptied.  This is useful for auto-recovering from errors based on request size constraints, particularly max payload size on intermediate load balancers. 

An example configuration using custom propagators might look like:
```js
const tracer = new lightstep.Tracer({
  propagators: {
    [opentracing.FORMAT_HTTP_HEADERS]: new lightstep.DDPropagator(),
    [opentracing.FORMAT_TEXT_MAP]: new lightstep.B3Propagator()
  }
})
```

### SpanImp

---

#### generateTraceURL()

Returns an absolute URL to the LightStep application for the trace containing this span. It is safe to call this method after `finish()`.

```js
...
span.finish();

var url = span.generateTraceURL())
console.log('View the trace for this span at:', url);
```


### Release process using circleCI 
1. Run command
```commandline
make release RELEASE_TYPE=patch
```


## License

[The MIT License](LICENSE).

Copyright (c) 2016, LightStep
