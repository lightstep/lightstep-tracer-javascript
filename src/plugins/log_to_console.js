const constants = require('../constants');

class LogToConsole {
    constructor() {
        this._enabled = false;
        this._tracer = null;
        this._optionsCb = this._handleOptions.bind(this);
        this._logAddedCb = this._handleLogAdded.bind(this);
    }

    name() {
        return 'log_to_console';
    }

    addOptions(tracerImp) {
        tracerImp.addOption('log_to_console', {
            type         : 'bool',
            defaultValue : false,
        });
        tracerImp.on('options', this._optionsCb);
    }

    start(tracer, tracerImp) {
        this._tracer = tracer;
    }

    stop() {
        this._tracer.removeListener('options', this._optionsCb);
    }

    _handleOptions(modified, current, tracerImp) {
        let enabled = current.log_to_console;
        if (this._enabled === enabled) {
            return;
        }
        this._enabled = enabled;
        if (this._enabled) {
            tracerImp.on('log_added', this._logAddedCb);
        } else {
            tracerImp.removeListener('log_added', this._logAddedCb);
        }
    }

    _handleLogAdded(record) {
        let level = constants.LOG_STRING_TO_LEVEL[record.level];
        let { message } = record;

        // Ignore records without a message (e.g. a stable_name log record)
        if (!message) {
            return;
        }

        let payload = record.payload_json;
        if (payload) {
            try {
                payload = JSON.parse(payload);
            } catch (_ignored) { /* ignored */ }
        }

        switch (level) {
        case constants.LOG_ERROR:
        case constants.LOG_FATAL:
            if (payload !== undefined) {
                console.error(message, payload); // eslint-disable-line no-console
            } else {
                console.error(message); // eslint-disable-line no-console
            }
            break;
        case constants.LOG_WARN:
            if (payload !== undefined) {
                console.warn(message, payload); // eslint-disable-line no-console
            } else {
                console.warn(message); // eslint-disable-line no-console
            }
            break;
        case constants.LOG_INFO:
        default:
            if (payload !== undefined) {
                console.log(message, payload); // eslint-disable-line no-console
            } else {
                console.log(message); // eslint-disable-line no-console
            }
            break;
        }
    }
}

module.exports = new LogToConsole();
