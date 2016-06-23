import https from 'https';
import http from 'http';

export default class TransportHTTPJSON {
    constructor() {
        this._host = '';
        this._port = 0;
        this._encryption = '';
        this._timeoutMs = 0;
    }

    ensureConnection(opts) {
        this._host       = opts.collector_host;
        this._port       = opts.collector_port;
        this._encryption = opts.collector_encryption;
        this._timeoutMs  = opts.report_timeout_millis;
    }

    report(detached, auth, reportRequest, done) {
        let options = {
            hostname : this._host,
            port     : this._port,
            method   : 'POST',
            path     : '/api/v0/reports',
        };
        let protocol = (this._encryption === 'none') ? http : https;
        let req = protocol.request(options, (res) => {
            let buffer = '';
            res.on('data', (chunk) => {
                buffer += chunk;
            });
            res.on('end', () => {
                let err = null;
                let resp = null;
                if (res.statusCode !== 200) {
                    err = new Error(`status code = ${res.statusCode}`);
                } else if (!buffer) {
                    err = new Error('unexpected empty response');
                } else {
                    try {
                        resp = JSON.parse(buffer);
                    } catch (exception) {
                        err = exception;
                    }
                }
                return done(err, resp);
            });
        });
        req.on('socket', (socket, head) => {
            socket.setTimeout(this._timeoutMs);
            socket.on('timeout', () => {
                // abort() will generate an error, so done() is called as a
                // result.
                req.abort();
            });
        });
        req.on('error', (err) => {
            done(err, null);
        });

        let payload = JSON.stringify(reportRequest);

        req.setHeader('Host', this._host);
        req.setHeader('User-Agent', 'LightStep-JavaScript-Node');
        req.setHeader('LightStep-Access-Token', auth.access_token);
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Content-Length', payload.length);
        //req.setHeader('Content-Encoding', 'gzip');
        if (!detached) {
            req.setHeader('Connection', 'keep-alive');
        }
        req.write(payload);
        req.end();
    }
}
