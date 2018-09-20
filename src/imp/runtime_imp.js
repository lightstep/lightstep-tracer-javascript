import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase
import _each from '../_each'; // eslint-disable-line camelcase
import * as coerce from './coerce.js';
let proto = require('./generated_proto/collector_pb.js');
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
        tracerVersion.setKey('lightstep.tracer_version');
        tracerVersion.setStringValue(packageObject.version);

        let tracerPlatform = new proto.KeyValue();
        tracerPlatform.setKey('lightstep.tracer_platform');
        tracerPlatform.setStringValue('browser');

        let componentName = new proto.KeyValue();
        componentName.setKey('lightstep.component_name');
        componentName.setStringValue(this._componentName);

        let reporterId = converter.hexToDec(this._runtimeGUID);

        let reporterProto = new proto.Reporter();
        reporterProto.setReporterId(reporterId);
        reporterProto.setTagsList([tracerVersion, tracerPlatform, componentName]);
        return reporterProto;
    }
}
