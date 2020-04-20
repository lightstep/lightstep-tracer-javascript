let proto = require('../../generated_proto/collector_pb.js');

export default class TransportBrowser {
    constructor() {
        this._host = '';
        this._port = 0;
        this._path = '';
        this._encryption = '';
    }

    ensureConnection(opts) {
        this._host = opts.collector_host;
        this._port = opts.collector_port;
        this._path = opts.collector_path;
        this._encryption = opts.collector_encryption;
    }

    report(detached, auth, report, done) {
        try {
            if (!detached) {
                this._reportAJAX(auth, report, done);
            }
        } catch (e) {
            return done(e, null);
        }
    }

    _reportAJAX(auth, report, done) {
        let reportProto = report.toProto(auth);
        let protocol = (this._encryption === 'none') ? 'http' : 'https';
        let url = `${protocol}://${this._host}:${this._port}${this._path}/api/v2/reports`;
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open('POST', url);
        // Note: the browser automatically sets 'Connection' and 'Content-Length'
        // and *does not* allow they to be set manually
        xhr.setRequestHeader('Accept', 'application/octet-stream');
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                let err = null;
                let resp = null;
                if (this.status !== 200) {
                    err = new Error(`status code = ${this.status}`);
                } else if (!this.response) {
                    err = new Error('unexpected empty response');
                } else {
                    try {
                        resp = proto.ReportResponse.deserializeBinary(this.response).toObject();
                    } catch (exception) {
                        err = exception;
                    }
                }
                return done(err, resp);
            }
        };
        let serialized = reportProto.serializeBinary();
        xhr.send(serialized);
    }
}
