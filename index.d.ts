
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
    collector_encryption?: string     
  }
  export namespace lightstep{

  }
  export class Tracer extends opentracing.Tracer {
    constructor(options: TracerOptions)

    public startSpan(name: string, options?: opentracing.SpanOptions): Span
  }
  
  class Span extends opentracing.Span {
      public generateTraceURL(): string
  }
}

