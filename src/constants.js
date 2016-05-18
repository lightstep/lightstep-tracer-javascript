
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

export const JOIN_ID_PREFIX = "join:";
