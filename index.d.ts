
/** Original definitions by felixfbecker: https://github.com/lightstep/lightstep-tracer-javascript/issues/99#issuecomment-436823685 */
declare module 'lightstep-tracer' {
  import * as opentracing from 'opentracing';

  export interface TracerOptions {
    /** the project access token. Access tokens are used by the LightStep tracer client libraries to identify the project the tracer is reporting for */
    access_token: string

    /** the string identifier for the application, service, or process. A Component is a logical service (or client) in a distributed system. The component usually represents a particular process or script in the distributed system */
    component_name: string

    /**
     * controls the level of logging to the console
     *
     * - 0 - the client library will never log to the console
     * - 1 - error reporting will be throttled to the first error per minute
     * - 2 - all errors are logged to the console
     * - 3 - all errors, warnings, and info statements are logged to the console
     * - 4 - all log statements, including debugging details
     *
     * @default 1
     */
    verbosity?: number

    /** custom collector hostname */
    collector_host?: string

    /** custom collector port */
    collector_port?: number

    /** custom collector base path (if served behind a reverse proxy) */
    collector_path?: string

    /** optional, default='tls'
     * `tls` - use HTTPS encrypted connections
     * `none` - use HTTP plain-text connections
    */
    collector_encryption?: "tls" | "none"

    /**
     * optional tag object that will be applied to all reports.
     */
    tags?: any

    /**
     * optional, the maximum time before the tracer reports. default = 2500
     */
    max_reporting_interval_millis?: number

    /**
     * optional, disables clock skew correction. default = false
     */
    disable_clock_skew_correction?: boolean

    /**
     * optional, specifies the transport method used for communication to the Satellite. default = proto.
     * `proto` - use protobuf over HTTP(S)
     * `thrift` - use thrift
     */
    transport?: string

    /**
     * optional, disables the tracer. default = false
     */
    disabled?: boolean

    /**
     * optional, defines the maximum number of spans per report. default = 4096
     */
    max_span_records?: number

    /**
     * optional tag object that will be applied to all spans.
     */
    default_span_tags?: any

    /**
     * optional, sets the timeout for flushing reports to Satellite. default = 30000 (30s)
     */
    report_timeout_millis?: number

    /**
     * optional, if enabled will use gzip compression of reports from node.js. default = true
     */
    gzip_json_requests?: boolean

    /**
     * optional, if enabled the tracer will not flush reports to Satellite. default = false
     */
    disable_reporting_loop?: boolean

    /**
     * optional, if enabled the tracer will not attempt to flush at process exit. default = false
     */
    disable_report_on_exit?: boolean

    /**
     * optional, specifies how long the tracer should wait before its first flush in ms. default = 1000
     */
    delay_initial_report_millis?: number

    /**
     * optional, specifies how quickly error logging should throttle in ms. default = 60000
     */
    error_throttle_millis?: number

    /**
     * optional, an override of the existing logging function for the tracer. by default, log to console.
     */
    logger?: any

    /**
     * optional. browser-only. creates a single long-lived span for the entire page view. default = false
     */
    instrument_page_load?: boolean

    /**
     * optional. browser-only. if enabled, automatically instruments all XHR requests with context headers.
     * see `xhr_url_inclusion_patterns` and `xhr_url_exclusion_patterns`.
     */
    xhr_instrumentation?: boolean

    /**
     * optional. browser-only. a regex to indicate which URLs should be automatically instrumented for XHRs.
     * default value is all urls.
     */
    xhr_url_inclusion_patterns?: RegExp[]

    /**
     * optional. browser-only. a regex to indicate which URLs should not be automatically instrumented for XHRs.
     * default value is no urls.
     */
    xhr_url_exclusion_patterns?: RegExp[]

    /**
     * optional. browser-only. a regex to indicate which automatically instrumented XHR URLs should include headers for continuing the trace on the server.
     * default value is all urls.
     */
    xhr_url_header_inclusion_patterns?: RegExp[]

    /**
     * optional. browser-only. a regex to indicate which automatically instrumented XHR URLs should not include headers for continuing the trace on the server.
     * default value is no urls.
     */
    xhr_url_header_exclusion_patterns?: RegExp[]

    /**
     * optional. browser-only. if enabled, automatically instrument all window.fetch requests with context.headers.
     * see `fetch_url_inclusion_patterns` and `fetch_url_exclusion_patterns`.
     */
    fetch_instrumentation?: boolean

    /**
     * optional. browser-only. a regex to indicate which URLs should be automatically instrumented for window.fetch.
     * default value is all urls.
     */
    fetch_url_inclusion_patterns?: RegExp[]

    /**
     * optional. browser-only. a regex to indicate which URLs should not be automatically instrumented for window.fetch.
     * default value is no urls.
     */
    fetch_url_exclusion_patterns?: RegExp[]

    /**
     * optional. browser-only. a regex to indicate which automatically instrumented URLs should include headers for continuing the trace on the server.
     * default value is all urls.
     */
    fetch_url_header_inclusion_patterns?: RegExp[]

    /**
     * optional. browser-only. a regex to indicate which automatically instrumented URLs should not include headers for continuing the trace on the server.
     * default value is no urls.
     */
    fetch_url_header_exclusion_patterns?: RegExp[]

    /**
     * optional. node-only. if enabled, automatically instrument all node requests with
     * context.headers.
     */
    nodejs_instrumentation?: boolean

    /**
     * optional. node-only. a regex to indicate which URLs should be automatically instrumented for
     * node's native http, https modules.
     * default value is all urls.
     */
    nodejs_url_inclusion_patterns?: RegExp[]

    /**
     * optional. node-only. a regex to indicate which URLs should not be automatically instrumented
     * for node's native http, https modules.
     * default value is no urls.
     */
    nodejs_url_exclusion_patterns?: RegExp[]

    /**
     * optional. browser-only. if true, includes cookies in the span logs for both `window.fetch` and `XMLHttpRequest`.
     * defaults to true.
     */
    include_cookies?: boolean
  }

  export class Tracer extends opentracing.Tracer {
    constructor(options: TracerOptions)
  }

}

