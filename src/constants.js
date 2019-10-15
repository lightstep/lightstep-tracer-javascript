
export const LOG_INFO = 0;
export const LOG_WARN = 1;
export const LOG_ERROR = 2;
export const LOG_FATAL = 3;

export const LOG_LEVEL_TO_STRING = {
    LOG_INFO  : 'I',
    LOG_WARN  : 'W',
    LOG_ERROR : 'E',
    LOG_FATAL : 'F',
};
export const LOG_STRING_TO_LEVEL = {
    I : LOG_INFO,
    W : LOG_WARN,
    E : LOG_ERROR,
    F : LOG_FATAL,
};

// The report interval for empty reports used to sample the clock skew
export const CLOCK_STATE_REFRESH_INTERVAL_MS = 350;

export const LIGHTSTEP_APP_URL_PREFIX = 'https://app.lightstep.com';

export const JOIN_ID_PREFIX = 'join:';

export const LS_META_EVENT_KEY = 'lightstep.meta_event';
export const LS_META_PROPAGATION_KEY = 'lightstep.propagation_format';
export const LS_META_TRACE_KEY = 'lightstep.trace_id';
export const LS_META_SPAN_KEY = 'lightstep.span_id';
export const LS_META_TRACER_GUID_KEY = 'lightstep.tracer_guid';
export const LS_META_EXTRACT = 'lightstep.extract_span';
export const LS_META_INJECT = 'lightstep.inject_span';
export const LS_META_SP_START = 'lightstep.span_start';
export const LS_META_SP_FINISH = 'lightstep.span_finish';
export const LS_META_TRACER_CREATE = 'lightstep.tracer_create';

export const FORMAT_B3 = 'format.b3';
