// eslint-disable-next-line camelcase
import { crouton_thrift } from '../platform_abstraction_layer';

export default class AuthImp {
    constructor(accessToken) {
        this._accessToken = accessToken;
    }

    getAccessToken() {
        if (typeof this._accessToken === 'undefined' || this._accessToken === null || this._accessToken.length === 0) {
            return 'empty';
        }

        return this._accessToken;
    }

    toThrift() {
        return new crouton_thrift.Auth({
            access_token : this._accessToken,
        });
    }
}
