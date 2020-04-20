import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase
import _each from '../_each';
import * as coerce from './coerce';
// eslint-disable-line camelcase
let googleProtobufTimestampPB = require('google-protobuf/google/protobuf/timestamp_pb.js');
let proto = require('./generated_proto/collector_pb.js');

export default class LogRecordImp {
    constructor(logFieldKeyHardLimit, logFieldValueHardLimit, timestampMicros, fields) {
        if (fields instanceof Error) {
            fields = {
                stack   : fields.stack,
                message : fields.message,
            };
        }

        this._logFieldKeyHardLimit = logFieldKeyHardLimit;
        this._logFieldValueHardLimit = logFieldValueHardLimit;
        this._timestampMicros = timestampMicros;
        this._fields = fields;
        this._keysOverLimit = 0;
        this._valuesOverLimit = 0;
    }

    _clearOverLimits() {
        this._keysOverLimit = 0;
        this._valuesOverLimit = 0;
    }

    getNumKeysOverLimit() {
        return this._keysOverLimit;
    }

    getNumValuesOverLimit() {
        return this._valuesOverLimit;
    }

    toThrift() {
        this._clearOverLimits();
        let thriftFields = [];
        _each(this._fields, (value, key) => {
            if (!key || !value) {
                return;
            }
            let keyStr = this.getFieldKey(key);
            let valStr = this.getFieldValue(value);
            thriftFields.push(new crouton_thrift.KeyValue({
                Key   : keyStr,
                Value : valStr,
            }));
        });

        return new crouton_thrift.LogRecord({
            timestamp_micros : this._timestampMicros,
            fields           : thriftFields,
        });
    }

    getFieldKey(key) {
        let keyStr = coerce.toString(key);
        if (keyStr.length > this._logFieldKeyHardLimit) {
            this._keysOverLimit += 1;
            keyStr = `${keyStr.substr(0, this._logFieldKeyHardLimit)}...`;
        }
        return keyStr;
    }

    getFieldValue(value) {
        let valStr = null;
        if (value instanceof Error) {
            try {
                // https://stackoverflow.com/a/26199752/9778850
                valStr = JSON.stringify(value, Object.getOwnPropertyNames(value));
            } catch (e) {
                valStr = `Could not encode value. Exception: ${e}`;
            }
        } else if (value instanceof Object) {
            try {
                valStr = JSON.stringify(value, null, '  ');
            } catch (e) {
                valStr = `Could not encode value. Exception: ${e}`;
            }
        } else {
            valStr = coerce.toString(value);
        }
        if (valStr.length > this._logFieldValueHardLimit) {
            this._valuesOverLimit += 1;
            valStr = `${valStr.substr(0, this._logFieldValueHardLimit)}...`;
        }
        return valStr;
    }

    toProto() {
        this._clearOverLimits();
        let log = new proto.Log();
        let ts = new googleProtobufTimestampPB.Timestamp();
        let secs = Math.floor(this._timestampMicros / 1000000);
        let nanos = (this._timestampMicros % 1000000) * 1000;
        ts.setSeconds(secs);
        ts.setNanos(nanos);
        log.setTimestamp(ts);
        let keyValues = [];
        _each(this._fields, (value, key) => {
            if (!key || !value) {
                return;
            }
            let keyStr = this.getFieldKey(key);
            let valStr = this.getFieldValue(value);

            let keyValue = new proto.KeyValue();
            keyValue.setKey(keyStr);
            keyValue.setStringValue(valStr);
            keyValues.push(keyValue);
        });

        log.setFieldsList(keyValues);

        return log;
    }
}
