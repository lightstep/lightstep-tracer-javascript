var path = require("path");
var child_process = require("child_process");

describe("Command-line arguments", function() {
    it("--lightstep-debug=true", function (done) {
        var script = path.join(__dirname, "child_process/cmdline_args.js");
        var reportFile = "cmdline_args.json";

        var child = child_process.fork(script, [
            reportFile, "--lightstep-debug=true", "--lightstep-verbosity=1",
        ]);
        child.on('close', function() {
            var reqs = util.requestsFromFile(reportFile);
            expect(reqs.spanRecordCount()).to.be.at.least(10);
            done();
        });
    });
});
