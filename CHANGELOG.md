# CHANGELOG

*Log of significant changes, especially those affecting the supported API.*

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
