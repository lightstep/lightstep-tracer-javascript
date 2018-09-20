import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase
let proto = require('./generated_proto/collector_pb.js');

export default class AuthImp {
    constructor(accessToken) {
        this._accessToken = accessToken;
    }

    getAccessToken() {
        return this._accessToken;
    }

    toThrift() {
        return new crouton_thrift.Auth({
            access_token : this._accessToken,
        });
    }

    toProto() {
        let authProto = new proto.Auth();
        authProto.setAccessToken(this._accessToken);
        return authProto;
    }
}
