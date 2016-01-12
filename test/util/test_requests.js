// Wrapper class to make checking properties on the request set easier.
function TestRequests(content) {
    this.requests = content.requests;
}

TestRequests.prototype.reportCount = function() {
    return this.requests.length;
};

TestRequests.prototype.spanRecordCount = function () {
    var count = 0;
    _.each(this.requests, function(req) {
        count += req.report.span_records.length;
    });
    return count;
};

TestRequests.prototype.logRecordCount = function () {
    var count = 0;
    _.each(this.requests, function(req) {
        count += req.report.log_records.length;
    });
    return count;
};

TestRequests.prototype.hasLogMessage = function (msg) {
    return _.any(this.requests, function (req) {
        return _.any(req.report.log_records, function (log) {
            return log.message == msg;
        });
    });
};

module.exports = TestRequests;
