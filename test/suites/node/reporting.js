var path = require("path");
var fs   = require("fs");
var child_process = require("child_process");
var FileTransport = require("../../util/file_transport");
var LightStep = require('../../..');

describe("Reporting loop", function() {
    it("should flush at a regular interval", function(done) {
        this.timeout(5000);

        var transport = new FileTransport(path.join(__dirname, '../../results/report_flush_loop.json'));
        var tracer = Tracer.initNewTracer(LightStep.tracer({
            access_token                  : "{your_access_token}",
            component_name                : "api-javascript/unit-test/report_flush_loop",
            max_reporting_interval_millis : 10,
            override_transport            : transport,
            disable_reporting_loop        : false,
            delay_initial_report_millis   : 0,
        }));

        var count = 0;
        var timer = setInterval(function() {
            var span = tracer.startSpan("test");
            span.logEvent("Count = " + count);
            span.finish();
            count++;
            if (count === 20) {
                clearInterval(timer);
                var reqs = transport.readReports();

                // Conservatively check below the theoretical values since this
                // test inherently has timing issues.
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
        var reportFile = "on_exit_child.json";

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
