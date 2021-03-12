import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase
import _each from '../_each'; // eslint-disable-line camelcase
import * as coerce from './coerce';
import util from './util/util';

let proto = require('./generated_proto/collector_pb');
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
        tracerPlatform.setStringValue(this._attributes['lightstep.tracer_platform']);

        let tracerPlatformVersion = new proto.KeyValue();
        tracerPlatformVersion.setKey('lightstep.tracer_platform_version');
        tracerPlatformVersion.setStringValue(this._attributes['lightstep.tracer_platform_version']);

        let componentName = new proto.KeyValue();
        componentName.setKey('lightstep.component_name');
        componentName.setStringValue(this._componentName);

        let commandLine = new proto.KeyValue();
        commandLine.setKey('lightstep.command_line');
        commandLine.setStringValue(this._attributes['lightstep.command_line']);

        let hostname = new proto.KeyValue();
        hostname.setKey('lightstep.hostname');
        hostname.setStringValue(this._attributes['lightstep.hostname']);

        let reporterId = util.hexToDec(this._runtimeGUID);

        let tracerTags = [];
        _each(this._attributes, (val, key) => {
            let ttag = new proto.KeyValue();
            ttag.setKey(key);
            ttag.setStringValue(val);
            tracerTags.push(ttag);
        });

        let reporterTags = [tracerVersion, tracerPlatform, componentName, commandLine, hostname, tracerPlatformVersion];
        let allTags = reporterTags.concat(tracerTags);

        let reporterProto = new proto.Reporter();
        reporterProto.setReporterId(reporterId);
        reporterProto.setTagsList(allTags);

        return reporterProto;
    }
}
