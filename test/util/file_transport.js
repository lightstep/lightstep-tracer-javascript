var fs           = require("fs");
var deepClone    = require("clone");
var _            = require("underscore");
var TestRequests = require("./test_requests");

function FileTransport(filename) {
    this._filename = filename;
    this._requests = [];

    if (fs.existsSync(this._filename)) {
        fs.unlink(this._filename);
    }
}

FileTransport.prototype.ensureConnection = function() {
    // No op
};

FileTransport.prototype.report = function(detached, auth, report, done) {

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

    fs.writeFileSync(this._filename, JSON.stringify({
        requests : this._requests,
    }, null, 4));

    done();
};

FileTransport.prototype.readReports = function() {
    var content = JSON.parse(fs.readFileSync(this._filename, "utf8"));
    return new TestRequests(content);
};

module.exports = FileTransport;
