/* global TRANSPORT_PROTO */

import _each from '../_each';
import * as coerce from './coerce.js';
const packageObject = require('../../package.json');

let croutonThrift = null;
let proto = null;
let converter = null;
if ((typeof TRANSPORT_PROTO === 'undefined') || TRANSPORT_PROTO) {
    proto = require('./generated_proto/collector_pb.js'); // eslint-disable-line global-require
    converter = require('hex2dec'); // eslint-disable-line global-require
}
if ((typeof TRANSPORT_PROTO === 'undefined') || !TRANSPORT_PROTO) {
    croutonThrift = require('../platform_abstraction_layer').crouton_thrift; // eslint-disable-line global-require
}

export default class RuntimeImp {
    constructor(runtimeGUID, startMicros, componentName, attributes) {
        this._runtimeGUID = runtimeGUID;
        this._startMicros = startMicros;
        this._componentName = componentName;
        this._attributes = attributes;
    }

    toThrift() {
        if ((typeof TRANSPORT_PROTO === 'undefined') || !TRANSPORT_PROTO) {
            let thriftAttrs = [];
            _each(this._attributes, (val, key) => {
                thriftAttrs.push(new croutonThrift.KeyValue({
                    Key   : coerce.toString(key),
                    Value : coerce.toString(val),
                }));
            });

            // NOTE: for legacy reasons, the Thrift field is called "group_name"
            // but is semantically equivalent to the "component_name"
            return new croutonThrift.Runtime({
                guid         : this._runtimeGUID,
                start_micros : this._startMicros,
                group_name   : this._componentName,
                attrs        : thriftAttrs,
            });
        }
    }

    toProto() {
        if ((typeof TRANSPORT_PROTO === 'undefined') || TRANSPORT_PROTO) {
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
}
