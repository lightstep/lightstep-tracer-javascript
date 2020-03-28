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
            } else {
                this._reportAsyncScript(auth, report, done);
            }
        } catch (e) {
            return done(e, null);
        }
    }

    _reportAJAX(auth, report, done) {
        let payload = JSON.stringify(report.toThrift());
        let protocol = (this._encryption === 'none') ? 'http' : 'https';
        let url = `${protocol}://${this._host}:${this._port}${this._path}/api/v0/reports`;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // Note: the browser automatically sets 'Connection' and 'Content-Length'
        // and *does not* allow they to be set manually
        xhr.setRequestHeader('LightStep-Access-Token', auth.getAccessToken());
        xhr.setRequestHeader('Content-Type', 'application/json');
        //req.setRequestHeader('Content-Encoding', 'gzip');
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                let err = null;
                let resp = null;
                if (this.status !== 200) {
                    err = new Error(`status code = ${this.status}`);
                } else if (!this.responseText) {
                    err = new Error('unexpected empty response');
                } else {
                    try {
                        resp = JSON.parse(this.responseText);
                    } catch (exception) {
                        err = exception;
                    }
                }
                return done(err, resp);
            }
        };
        xhr.send(payload);
    }

    // Do a "tail flush" using an async browser script load.  This does not get
    // interrupted as a normal Thirft RPC would when navigating away from
    // the page.
    _reportAsyncScript(auth, report, done) {
        let authJSON   = JSON.stringify(auth.toThrift());
        let reportJSON = JSON.stringify(report.toThrift());
        let protocol = (this._encryption === 'none') ? 'http' : 'https';
        let url = `${protocol}://${this._host}:${this._port}${this._path}/_rpc/v1/reports/uri_encoded`
            + `?auth=${encodeURIComponent(authJSON)}`
            + `&report=${encodeURIComponent(reportJSON)}`;

        let elem = document.createElement('script');
        elem.async = true;
        elem.defer = true;
        elem.src = url;
        elem.type = 'text/javascript';

        let hostElem = document.getElementsByTagName('head')[0];
        if (hostElem) {
            hostElem.appendChild(elem);
        }
        return done(null, null);
    }
}
