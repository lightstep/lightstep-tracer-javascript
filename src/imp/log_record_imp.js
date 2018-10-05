/* global TRANSPORT_PROTO */

import _each from '../_each';
import * as coerce from './coerce';

let croutonThrift = null;
let googleProtobufTimestampPB = null;
let proto = null;
if ((typeof TRANSPORT_PROTO === 'undefined') || TRANSPORT_PROTO) {
    googleProtobufTimestampPB =
        require('google-protobuf/google/protobuf/timestamp_pb.js'); // eslint-disable-line global-require
    proto = require('./generated_proto/collector_pb.js'); // eslint-disable-line global-require
}
if ((typeof TRANSPORT_PROTO === 'undefined') || !TRANSPORT_PROTO) {
    croutonThrift = require('../platform_abstraction_layer').crouton_thrift; // eslint-disable-line global-require
}

export default class LogRecordImp {
    constructor(logFieldKeyHardLimit, logFieldValueHardLimit, timestampMicros, fields) {
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
        if ((typeof TRANSPORT_PROTO === 'undefined') || !TRANSPORT_PROTO) {
            this._clearOverLimits();
            let thriftFields = [];
            _each(this._fields, (value, key) => {
                if (!key || !value) {
                    return;
                }
                let keyStr = this.getFieldKey(key);
                let valStr = this.getFieldValue(value);
                thriftFields.push(new croutonThrift.KeyValue({
                    Key   : keyStr,
                    Value : valStr,
                }));
            });

            return new croutonThrift.LogRecord({
                timestamp_micros : this._timestampMicros,
                fields           : thriftFields,
            });
        }
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
        if (value instanceof Object) {
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
        if ((typeof TRANSPORT_PROTO === 'undefined') || TRANSPORT_PROTO) {
            this._clearOverLimits();
            let log = new proto.Log();
            let ts = new googleProtobufTimestampPB.Timestamp();
            let secs = Math.floor(this._timestampMicros / 1000000);
            let nanos = this._timestampMicros % 1000000;
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
}
