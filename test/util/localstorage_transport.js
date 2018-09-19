var deepClone = require("clone");
var _         = require("underscore");

function LocalStorageTransport(keyname) {
    this._keyname = keyname;
    this._requests = [];

    localStorage.removeItem(this._keyname);
}

LocalStorageTransport.prototype.ensureConnection = function() {
};

LocalStorageTransport.prototype.report = function(detached, auth, report, done) {

    // For convenience of debugging strip null fields (they are not sent over
    // the wire by the JS thrift implementation anyway).
    report = deepClone(report);
    _.each(report.log_records, function (log) {
        _.each(log, function (val, key) {
            if (val === null) {
                delete log[key];
            }
        });
    });
    _.each(report.span_records, function (span) {
        _.each(span, function (val, key) {
            if (val === null) {
                delete span[key];
            }
        });
    });

    this._requests.push({
        detached : detached,
        auth : auth.toThrift(),
        report : report.toThrift(),
    });

    localStorage.setItem(this._keyname, JSON.stringify({
        requests : this._requests,
    }, null, 4));
    done();
};

module.exports = LocalStorageTransport;
