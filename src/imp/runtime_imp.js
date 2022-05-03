import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase
import _each from '../_each'; // eslint-disable-line camelcase
import * as coerce from './coerce';

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
            // eslint-disable-next-line camelcase
            thriftAttrs.push(new crouton_thrift.KeyValue({
                Key   : coerce.toString(key),
                Value : coerce.toString(val),
            }));
        });

        // NOTE: for legacy reasons, the Thrift field is called "group_name"
        // but is semantically equivalent to the "component_name"
        // eslint-disable-next-line camelcase
        return new crouton_thrift.Runtime({
            guid         : this._runtimeGUID,
            start_micros : this._startMicros,
            group_name   : this._componentName,
            attrs        : thriftAttrs,
        });
    }
}
