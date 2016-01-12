
import thrift from './thrift.js';
import crouton_thrift from './crouton_thrift';

export default class TransportBrowser {

    constructor() {
        this._hostport = null;
        this._transport = null;
        this._protocol = null;
        this._client = null;
    }

    ensureConnection (opts) {
        // Already set up
        if (this._client) {
            return;
        }

        let host = opts.service_host;
        let port = opts.service_port;
        let scheme = opts.secure ? "https" : "http";
        this._hostport = `${scheme}://${host}:${port}`;

        // Currently the only support Thrift browser protocol is JSON.
        let serviceUrl = `${this._hostport}/_rpc/v1/reports/json`;
        this._transport  = new thrift.Transport(serviceUrl);
        this._protocol   = new thrift.Protocol(this._transport);
        this._client     = new crouton_thrift.ReportingServiceClient(this._protocol);
    }

    report (detached, auth, report, done) {
        try {
            if (!detached) {
                this._reportThriftRPC(auth, report, done);
            } else {
                this._reportAsyncScript(auth, report, done);
            }
        } catch (e) {
            return done(e, null);
        }
    }

    _reportThriftRPC(auth, report, done) {
        this._client.Report(auth, report, (res) => {
            // The Thrift browser-side convention here is non-standard. Valid
            // responses and errors are overloaded into the same variable and
            // need to be differentiated by a type-check.
            if (!(res instanceof crouton_thrift.ReportResponse)) {
                done(res, null);
            } else {
                done(null, res);
            }
        });
    }

    // Do a "tail flush" using an async browser script load.  This does not get
    // interrupted as a normal Thirft RPC would when navigating away from
    // the page.
    _reportAsyncScript(auth, report, done) {
        let authJSON   = JSON.stringify(auth);
        let reportJSON = JSON.stringify(report);

        let url = `${this._hostport}/_rpc/v1/reports/uri_encoded` +
            "?auth=" + encodeURIComponent(authJSON) +
            "&report=" + encodeURIComponent(reportJSON);

        let elem = document.createElement("script");
        elem.async = true;
        elem.defer = true;
        elem.src = url;
        elem.type = "text/javascript";

        let hostElem = document.getElementsByTagName("head")[0];
        if (hostElem) {
            hostElem.appendChild(elem);
        }
        return done(null, null);
    }
}
