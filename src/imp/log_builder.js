import LogRecordImp from './log_record_imp';

const constants = require('../constants');
const coerce    = require('./coerce');

// Facade on the thrift log data structure to make constructing log records more
// convenient.
class LogBuilder {

    constructor(runtime) {
        this._runtime = runtime;
        this._record = new LogRecordImp();
        this._record.timestamp_micros = runtime._platform.nowMicros();
    }

    record() {
        return this._record;
    }

    end() {
        this._runtime._addLogRecord(this._record);
    }

    timestamp(micros) {
        this._record.timestamp_micros = coerce.toNumber(micros);
        return this;
    }

    message(msg) {
        this._record.message = coerce.toString(msg);
        return this;
    }

    level(num) {
        this._record.level = constants.LOG_LEVEL_TO_STRING[num] || null;
        if (num >= constants.LOG_ERROR) {
            this.error(true);
        }
        return this;
    }

    span(guid) {
        if (guid !== undefined) {
            this._record.span_guid = coerce.toString(guid);
        }
        return this;
    }

    name(stableName) {
        this._record.stable_name = coerce.toString(stableName);
        return this;
    }

    error(flag) {
        this._record.error_flag = coerce.toBoolean(flag);
        return this;
    }

    payload(data) {
        if (data !== undefined) {
            this._record.payload_json = this._encodePayload(data);
        }
        return this;
    }

    _encodePayload(data) {
        let payloadJSON = null;
        try {
            payloadJSON = JSON.stringify(data);
        } catch (_ignored) {
            // TODO: this should log an internal warning that a payload could
            // not be encoded as JSON.
            return undefined;
        }
        return payloadJSON;
    }
}

module.exports = LogBuilder;
