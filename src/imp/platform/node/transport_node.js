import thrift from 'thrift';
import crouton_thrift from './crouton_thrift';

export default class TransportNode {

    constructor() {
        this._connection = null;
        this._connectionErrorCallback = null;
        this._client = null;
    }

    ensureConnection(opts) {
        // Connection already established. Nothing to do.
        if (this._connection) {
            return;
        }

        var thriftOptions = {
            transport   : thrift.TBufferedTransport,
            protocol    : thrift.TBinaryProtocol,
            path        : "/_rpc/v1/reports/binary",
            https       : (opts.collector_encryption !== 'none'),
            nodeOptions : {},
        };
        if (!opts.certificate_verification) {
            // https://github.com/request/request/issues/418
            thriftOptions.nodeOptions.rejectUnauthorized = false;
            thriftOptions.nodeOptions.strictSSL = false;
        }

        this._connection = thrift.createHttpConnection(opts.collector_host, opts.collector_port, thriftOptions);
        this._client = thrift.createHttpClient(crouton_thrift.ReportingServiceClient, this._connection);
    }

    report (detached, auth, reportRequest, done) {
        // The Thrift Node implementation does not call the callback on HTTP
        // connection errors (e.g. ECONNREFUSED).  Therefore, this code hooks
        // directly into the error event and uses *either* the error or the
        // callback response to close the RPC.
        let doneWrapper = (err, res) => {
            if (done) {
                let once = done;
                done = null;
                this._connection.removeListener("error", doneWrapper);
                once(err, res);
            }
        };
        this._connection.on("error", doneWrapper);

        try {
            this._client.Report(auth, reportRequest, doneWrapper);
        } catch (exception) {
            // Pass along the exception as the error parameter
            let err = {
                exception : exception
            };
            if (exception.message) {
                err.message = exception.message;
            }
            if (exception.stack && typeof exception.stack === "string") {
                err.stack = exception.stack.split("\n");
            }
            doneWrapper(err, null);
        }
    }

}
