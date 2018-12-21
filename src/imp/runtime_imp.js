import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase
import _each from '../_each'; // eslint-disable-line camelcase
import * as coerce from './coerce.js';
import { lightstep } from './generated_proto';
let proto = lightstep.collector;
let converter = require('hex2dec');
const packageObject = require('../../package.json');

export default class RuntimeImp {
    constructor(runtimeGUID, startMicros, componentName, attributes) {
        this._runtimeGUID = runtimeGUID;
        this._startMicros = startMicros;
        this._componentName = componentName;
        this._attributes = attributes;
    }

    toThrift() {
        let thriftAttrs = [];
        _each(this._attributes, (val, key) => {
            thriftAttrs.push(new crouton_thrift.KeyValue({
                Key   : coerce.toString(key),
                Value : coerce.toString(val),
            }));
        });

        // NOTE: for legacy reasons, the Thrift field is called "group_name"
        // but is semantically equivalent to the "component_name"
        return new crouton_thrift.Runtime({
            guid         : this._runtimeGUID,
            start_micros : this._startMicros,
            group_name   : this._componentName,
            attrs        : thriftAttrs,
        });
    }

    toProto() {
        let tracerVersion = new proto.KeyValue();
        tracerVersion.key = 'lightstep.tracer_version';
        tracerVersion.stringValue = packageObject.version;

        let tracerPlatform = new proto.KeyValue();
        tracerPlatform.key = 'lightstep.tracer_platform';
        tracerPlatform.stringValue = 'browser';

        let componentName = new proto.KeyValue();
        componentName.key = 'lightstep.component_name';
        componentName.stringValue = this._componentName;

        let reporterId = parseInt(converter.hexToDec(this._runtimeGUID), 10);

        let reporterProto = new proto.Reporter();
        reporterProto.reporterId = reporterId;
        reporterProto.tags = [tracerVersion, tracerPlatform, componentName];
        return reporterProto;
    }
}
