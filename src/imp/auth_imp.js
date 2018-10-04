/* global TRANSPORT_PROTO */

let croutonThrift = null;
let proto  = null;
if ((typeof TRANSPORT_PROTO === 'undefined') || TRANSPORT_PROTO) {
    proto = require('./generated_proto/collector_pb.js');
}
if ((typeof TRANSPORT_PROTO === 'undefined') || !TRANSPORT_PROTO) {
    croutonThrift = require('../platform_abstraction_layer').crouton_thrift;
}

export default class AuthImp {
    constructor(accessToken) {
        this._accessToken = accessToken;
    }

    getAccessToken() {
        return this._accessToken;
    }

    toThrift() {
        if ((typeof TRANSPORT_PROTO === 'undefined') || !TRANSPORT_PROTO) {
            return new croutonThrift.Auth({
                access_token : this._accessToken,
            });
        }
    }

    toProto() {
        if ((typeof TRANSPORT_PROTO === 'undefined') || TRANSPORT_PROTO) {
            let authProto = new proto.Auth();
            authProto.setAccessToken(this._accessToken);
            return authProto;
        }
    }
}
