import https from 'https';
import http from 'http';

const kMaxDetailedErrorFrequencyMs = 30000;
const kMaxStringLength = 2048;

function truncatedString(s) {
    if (s.length <= kMaxStringLength) {
        return s;
    }
    let half = Math.floor(kMaxStringLength / 2);
    return `${s.substr(0, half)}...${s.substr(-half)}`;
}

function errorFromResponse(res, buffer) {
    buffer = truncatedString(`${buffer}`.replace(/\s+$/, ''));
    return new Error(`status code=${res.statusCode}, message='${res.statusMessage}', body='${buffer}'`);
}

export default class TransportHTTPJSON {
    constructor(logger) {
        this._host = '';
        this._port = 0;
        this._encryption = '';
        this._timeoutMs = 0;

        this._logger = logger;
        this._lastErrorMs = 0;
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

        let payload;
        try {
            payload = JSON.stringify(reportRequest);
        } catch (exception) {
            // This should never happen. The library should always be constructing
            // valid reports.
            this._error('Could not JSON.stringify report!');
            return;
        }

        let extraErrorData = [];
        let req = protocol.request(options, (res) => {
            let buffer = '';
            res.on('data', (chunk) => {
                buffer += chunk;
            });
            res.on('end', () => {
                let err = null;
                let resp = null;
                if (res.statusCode === 400) {
                    this._throttleError(() => {
                        this._error('transport status code = 400', {
                            code    : res.statusCode,
                            message : res.statusMessage,
                            body    : buffer,
                            extra   : extraErrorData,
                            report  : truncatedString(payload),
                        });
                    });
                    err = errorFromResponse(res, buffer);
                } else if (res.statusCode !== 200) {
                    err = errorFromResponse(res, buffer);
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
                extraErrorData.push(`Request timed out (${this._timeoutMs} ms)`);
            });
        });
        req.on('error', (err) => {
            this._throttleError(() => {
                this._error('HTTP request error', {
                    error  : err,
                    extra  : extraErrorData,
                    report : truncatedString(payload),
                });
            });
            done(err, null);
        });

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

    _throttleError(f) {
        let now = Date.now();
        if (now - this._lastErrorMs < kMaxDetailedErrorFrequencyMs) {
            return;
        }
        this._lastErrorMs = now;
        f();
    }

    _error(msg, payload) {
        this._logger.error(msg, payload);
    }
}
