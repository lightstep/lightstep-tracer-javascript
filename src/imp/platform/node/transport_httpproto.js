import * as https from 'https';
import * as http from 'http';

let proto = require('../../generated_proto/collector_pb.js');

const kMaxDetailedErrorFrequencyMs = 30000;
const kMaxStringLength = 2048;

function truncatedString(s) {
    if (!s || s.length <= kMaxStringLength) {
        return s;
    }
    let half = Math.floor(kMaxStringLength / 2);
    return `${s.substr(0, half)}...${s.substr(-half)}`;
}

function encodeAndTruncate(obj) {
    try {
        return truncatedString(obj.toString('utf8'));
    } catch (exception) {
        return exception;
    }
}

function errorFromResponse(res, buffer) {
    if (buffer && buffer.length) {
        buffer = truncatedString(`${buffer}`.replace(/\s+$/, ''));
    }
    return new Error(`status code=${res.statusCode}, message='${res.statusMessage}', body='${buffer}'`);
}

export default class TransportHTTPProto {
    constructor(logger) {
        this._host = '';
        this._port = 0;
        this._encryption = '';
        this._timeoutMs = 0;

        this._logger = logger;
        this._lastLogMs = 0;
    }

    ensureConnection(opts) {
        this._host       = opts.collector_host;
        this._port       = opts.collector_port;
        this._encryption = opts.collector_encryption;
        this._timeoutMs  = opts.report_timeout_millis;
    }

    _preparePayload(reportRequest, auth, cb) {
        let payload;
        try {
            let reportProto = reportRequest.toProto(auth);
            let binary = reportProto.serializeBinary();
            payload = Buffer.from(binary);
        } catch (exception) {
            // This should never happen. The library should always be constructing
            // valid reports.
            this._error('Could not serialize report!');
            return cb(exception);
        }

        return cb(null, payload);
    }

    report(detached, auth, reportRequest, done) {
        let options = {
            hostname : this._host,
            port     : this._port,
            method   : 'POST',
            path     : '/api/v2/reports',
        };

        let protocol = (this._encryption === 'none') ? http : https;

        this._preparePayload(reportRequest, auth, (payloadErr, payload) => {
            if (payloadErr) {
                this._error('Error serializing payload');
                return done(payloadErr);
            }

            let extraErrorData = [];

            let req = protocol.request(options, (res) => {
                let buffer = [];
                res.on('data', (chunk) => {
                    buffer.push(chunk);
                });
                res.on('end', () => {
                    buffer = Buffer.concat(buffer);
                    let err = null;
                    let resp = null;
                    if (res.statusCode === 400) {
                        this._throttleLog(() => {
                            this._warning('transport status code = 400', {
                                code    : res.statusCode,
                                message : res.statusMessage,
                                body    : buffer,
                                extra   : extraErrorData,
                                report  : encodeAndTruncate(payload),
                            });
                        });
                        err = errorFromResponse(res, buffer);
                    } else if (res.statusCode !== 200) {
                        err = errorFromResponse(res, buffer);
                    } else if (!buffer) {
                        err = new Error('unexpected empty response');
                    } else {
                        try {
                            resp = proto.ReportResponse.deserializeBinary(buffer).toObject();
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
                this._throttleLog(() => {
                    this._warning('HTTP request error', {
                        error  : err,
                        extra  : extraErrorData,
                        report : encodeAndTruncate(reportRequest),
                    });
                });
                done(err, null);
            });

            req.setHeader('Host', this._host);
            req.setHeader('User-Agent', 'LightStep-JavaScript-Node');
            req.setHeader('LightStep-Access-Token', auth.getAccessToken());
            req.setHeader('Accept', 'application/octet-stream');
            req.setHeader('Content-Type', 'application/octet-stream');
            req.setHeader('Content-Length', payload.length);
            if (!detached) {
                req.setHeader('Connection', 'keep-alive');
            }
            req.write(payload);
            req.end();
        });
    }

    _throttleLog(f) {
        let now = Date.now();
        if (now - this._lastLogMs < kMaxDetailedErrorFrequencyMs) {
            return;
        }
        this._lastLogMs = now;
        f();
    }

    _warning(msg, payload) {
        this._logger.warn(msg, payload);
    }

    _error(msg, payload) {
        this._logger.error(msg, payload);
    }
}
