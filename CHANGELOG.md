# CHANGELOG

*Log of significant changes, especially those affecting the supported API.*

## vNext

## 0.31.2
* Update to thrift v0.14.1

## 0.31.1
* Update versions of underscore, lodash, handlebars, and y18n.

## 0.31.0
* Improve performance of hexToDec by using native BigInt when available.

## 0.30.2
* Bugfix for nodejs: remove throw in fetch onError handler (#246)

## 0.30.1
* Fix misnamed configuration options. `nodejs_inclusion_patterns` was renamed to `nodejs_url_inclusion_patterns` and `nodejs_exclusion_patterns` was renamed to `nodejs_url_exclusion_patterns`. Because of this bug, the inclusion and exclusion patterns were not being recognized by instrumentation.

## 0.30.0

* Bug fix for eslint for Microsoft Edge (#241)
* Add options for auto-instrumented urls and tracing headers (#237)

## 0.29.0

* Truncate most significant 64 bits when all 0's in B3 propagator.Inject (#238)
* Support React Native with the browser tracer (#235)

## 0.28.0

* Bug fix for propagating baggage from parent span to child span
* SpanContext is now exported to facilitate creating custom propagators

## 0.27.0

* No changes

## 0.26.0

* Require node >= v8
* New option to empty span buffer on max error streak `clear_span_buffer_consecutive_errors`
* Upgrade eslint

## 0.25.2

* fix for fetch plugin: 'method' was always GET
* Fix missing clock offsets over proto transport
* Fix timestamp conversion for protobuf transport

## 0.25.1
* No changes (minor bump to align with 0.25.1-no-protobuf release)

## 0.25.0
* Bug fix on `fetch` instrumentation options headers being overwritten in some cases.
* Re-build dist to fix failed page load on IE11 (#207)

## 0.24.3
* Fix how the `fetch` shim so that it does not overwrite user-provided `Response.headers`
* Add clock correction and error handling for the protobuf transport's responses
* Specify correct modules in node instrumentation docs
* Add a CONTRIBUTING.md guide

## 0.24.2
* Upgrade thrift to 0.13.0 (#198)

## 0.24.1
* Guard session storage access
* update type of collector_encryption
* Fix propagator typo
* Update typing on inclusion/exclusion patterns to match docs

## 0.24.0
* Adds DataDog header support (#187)
* Removes for..of loop to support IE11 (#189)

## 0.23.0

* Add NodeJS instrumentation and shims (#184)
* Adds B3 propagator (#177)

## 0.22.3
* Fixes an issue where reporter cookies would be set with invalid key strings.

## 0.22.2
* Completely defines the `TracerOptions` interface.
* Updates `thrift` package to address a security vulnerability.

## 0.22.1
* Fixes a bug where certain tracer tags were not set when using `proto` transport.
* Adds TypeScript definitions for LightStep tracer specific options/methods
* Fixes a crash when `proto` transport was used and invalid responses were received.
* Adds an option to exclude cookies from tracing payloads.

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
