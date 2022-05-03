import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase
import _each from '../_each';
import * as coerce from './coerce';
// eslint-disable-line camelcase
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
            // eslint-disable-next-line camelcase
            thriftFields.push(new crouton_thrift.KeyValue({
                Key   : keyStr,
                Value : valStr,
            }));
        });

        // eslint-disable-next-line camelcase
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
}
