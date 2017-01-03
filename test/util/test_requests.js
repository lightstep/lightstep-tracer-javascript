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

TestRequests.prototype.hasSpanRecord = function (opName) {
    return _.any(this.requests, function (req) {
        return _.any(req.report.span_records, function (spanRec) {
            return spanRec.span_name == opName;
        });
    });
};

module.exports = TestRequests;
