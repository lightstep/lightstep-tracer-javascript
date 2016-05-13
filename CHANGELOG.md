# CHANGELOG

## 0.10.1

* **API CHANGE**: Option `verbose` renamed to `verbosity`
    * `0`: never echo anything to the host application's console
    * `1`: echo only the first error to the host application's console
    * `> 1`: echo internal errors, warnings, and info statements to the host application's console. Higher values will yield more detailed logs
* **API CHANGE**: Option `debug` is no longer valid and will generate an error if used
* Internal errors, warnings, and info logs will no longer show up in the collected traces
* Option `log_to_console` will no longer echo internal errors, warnings, and info logs
* Adds `CHANGELOG.md`
