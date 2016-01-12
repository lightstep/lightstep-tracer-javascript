var path = require("path");
var fs   = require("fs");
var child_process = require("child_process");

describe("Reporting loop", function() {
    it("should flush at a regular interval", function(done) {
        this.timeout(5000);
        var runtime = Tracer.createTracer();
        util.runtimeReportToFile(runtime, "report_flush_loop.json");
        runtime.options({
            access_token           : "{your_access_token}",
            group_name             : "api-javascript/unit-test/report_flush_loop",
            report_period_millis   : 10,
        });

        var count = 0;
        var timer = setInterval(function() {
            runtime.infof("Count = %d", count);
            count++;
            if (count === 20) {
                clearInterval(timer);
                var reqs = util.requestsFromFile("report_flush_loop.json");

                // Conservatively check below the theoretical values since this
                // test inherent has timing issues.
                expect(reqs.logRecordCount()).to.be.at.least(10);
                expect(reqs.reportCount()).to.be.at.least(2);
                return done();
            }
        }, 10);
    });
});

describe("Final report", function () {
    it("flush on exit", function (done) {
        var script = path.join(__dirname, "on_exit/child.js");
        var reportFile = "on_exit.child.json";

        var child = child_process.fork(script, [ reportFile ]);
        child.on('close', function() {
            var reqs = util.requestsFromFile(reportFile);

            expect(reqs.logRecordCount()).to.be.at.least(10);
            expect(reqs.hasLogMessage("log0")).to.be.true;
            expect(reqs.hasLogMessage("log1")).to.be.true;
            expect(reqs.hasLogMessage("log2")).to.be.true;
            expect(reqs.hasLogMessage("log3")).to.be.true;
            expect(reqs.hasLogMessage("log4")).to.be.true;
            expect(reqs.hasLogMessage("log5")).to.be.true;
            expect(reqs.hasLogMessage("log6")).to.be.true;
            expect(reqs.hasLogMessage("log7")).to.be.true;
            expect(reqs.hasLogMessage("log8")).to.be.true;
            expect(reqs.hasLogMessage("log9")).to.be.true;

            expect(reqs.spanRecordCount()).to.be.at.least(1);

            done();
        });
    });
});
