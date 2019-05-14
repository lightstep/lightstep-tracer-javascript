# CHANGELOG

*Log of significant changes, especially those affecting the supported API.*

## vNext

## 0.22.0

* The default transport has been changed to `proto`.
* The tracer supports empty access tokens.
* Several bugs have been fixed with the `proto` transport option around the report of LightStep-specific tags.
* Addresses an issue with `proto` transport usage in the browser.
* Fixes bug where error objects are not converted to log objects correctly.
* Implements plugin for fetch.
* Remove deprecated chrome.loadTimes() code.

## 0.21.1

* Passing fractional timestamps to span start/finish are now properly handled.
* Several bugs were fixed with the `proto` transport option around span duration and span ids.
* We now support a custom logger function (thanks @Rowno), see README for more details.

## 0.21.0

* Update `thrift` to `0.11.0`. This breaks support for node.js versions <= 5.8.

## 0.20.14

* Add new option to Tracer: `disable_clock_skew_correction` `bool` *optional, defaults to 'false'*, which disables client-side clock kew correction.

## 0.20.13

* Add new option to Tracer: `transport` `string` *optional, defaults to 'thrift'*, which controls the transport method used to send reports to LightStep. *Experimental Feature*
* Fixes a bug when logging verbosity was greater than 4 during report flushes.

## 0.20.9

* Add new option to Tracer: `collector_path` `string` *optional*, which is an optional custom collector base path (if served behind a reverse proxy)

## 0.20.6

* `options` function now only logs warnings when it sees a key name it doesn't know. Previously, it threw an error.

## 0.20.6

* `instrument_page_load` option now defaults to false.
* If `xhr_instrumentation` is enabled, Open Tracing headers are now properly sent with every xhr request, so long as that request is to a domain that matches the whitelist url rules and also does not match any of the blacklist url rules.

## 0.20.0

* **API CHANGE**: use `new lightstep.Tracer(opts)` to return a lightstep `Tracer` instance
* **API CHANGE**: `lightstep-browser.min.js` and `lightstep-browser.js` use a `lightstep` rather than `LightStep` prefix for LightStep symbols
* **API CHANGE**: two new length limits for key-value logs: `log_field_key_hard_limit` and `log_field_value_hard_limit`, both specified as a number of bytes
* Many implementation changes, especially support for key-value logging per OpenTracing-javascript `0.13.*`

## 0.11.17

* Update the internal, automatic tracer tags to follow the convention of using a `lightstep.*` prefix

## 0.11.16

* Option `verbosity=1` will now throttle the error logging to the first error per minute
* Option `delay_initial_report_millis` will delay the initial report to the collector by at least some value between 0 and this value. This is useful when spawning a large number of new processes to help distribute the load at startup. Note: this is a non-standard option that is not supported by other LightStep libraries and is subject to change.
* Back off on errors is more now more aggressive. The back off always uses the the reporting interval, not the clock calibration interval.

## 0.11.2

* Fixes defects where the XHR instrumentation was still using the old `parent` option
* Add documentation for the non-standard option `disable_reporting_loop`
* Add documentation and implementation for the non-standard option `disable_report_on_exit`
* Fixes the examples to use the newer OpenTracing APIs
* Internal logging methods renamed (no external impact)

## 0.11.1

* [Full changes](https://github.com/lightstep/lightstep-tracer-javascript/compare/v0.10.6...v0.11.1)
* **API CHANGE**: migrates to the latest OpenTracing API which introduces `SpanContext` and changes from `inject/join` to `inject/extract`. See [the OpenTracing migration docs](https://github.com/opentracing/opentracing-javascript#v09x-to-v010x) for details.

## 0.10.6

* Enable gzip compression of Node.js reports from the client by default (this is controlled by a non-standard option `gzip_json_requests`)

## 0.10.5

* Fix defect in error handling of failed requests

## 0.10.4

* **MINOR API CHANGE**: `verbosity` level semantics updated
    * `2`: echo all errors (but not warnings and info statements)
    * `3`: echo all errors, warnings, and info statements
    * `>3`: same as `3` but will increasing level of detail

## 0.10.3

* Add non-standard option `report_timeout_millis`

## 0.10.2

* Add non-standard option `default_span_tags`

## 0.10.1

* **API CHANGE**: Option `verbose` renamed to `verbosity`
    * `0`: never echo anything to the host application's console
    * `1`: echo only the first error to the host application's console
    * `> 1`: echo internal errors, warnings, and info statements to the host application's console. Higher values will yield more detailed logs
* **API CHANGE**: Option `debug` is no longer valid and will generate an error if used
* Internal errors, warnings, and info logs will no longer show up in the collected traces
* Option `log_to_console` will no longer echo internal errors, warnings, and info logs
* Adds `CHANGELOG.md`
