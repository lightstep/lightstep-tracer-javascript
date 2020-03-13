function makeLSTracer(extraOpts) {
    var opts = {
        access_token : 'your_access_token',
        component_name : 'test_suite',
        disable_reporting_loop : true,
        silent : true,
    };
    for (var key in extraOpts) {
        opts[key] = extraOpts[key];
    }
    return new lightstep.Tracer(opts);
}

describe("TracerImp", function() {
    describe("TracerImp#options", function() {
        it('is a method', function() {
            expect(Tracer.options).to.be.a("function");
        });

        it('should return an object', function() {
            var tracer = makeLSTracer();
            expect(tracer).to.be.an('object');
            expect(tracer.options()).to.be.an('object');
        });

        it('should allow empty access_token', function() {
            expect(function() {
                var t = new lightstep.Tracer({
                    component_name : 'no_token',
                    disable_reporting_loop : true,
                    silent : true,
                });
            }).to.not.throw();
        });

        it('should allow the component_name and access_token to be set only once', function() {
            expect(function () {
                var rt = makeLSTracer();
                rt.options({
                    component_name  : 'my_group',
                    access_token : '1',
                    disable_reporting_loop : true,
                });
                rt.options({
                    component_name  : 'your_group',
                });
            }).to.throw();

            expect(function () {
                var rt = makeLSTracer();
                rt.options({
                    component_name : 'my_group',
                    access_token : '1',
                    disable_reporting_loop : true,
                });
                rt.options({
                    access_token : '2',
                });
            }).to.throw();
        });

        it('should allow user-specified tracer tags', function() {
            var testTable = [
                [
                    {},
                    {},
                ],
                [
                    { 'my_tag' : 'strings_are_ok' },
                    { 'my_tag' : 'strings_are_ok' },
                ],
                [
                    { 'my_tag' : 'strings_are_ok', 'second_tag' : 'dolphins' },
                    { 'my_tag' : 'strings_are_ok', 'second_tag' : 'dolphins' },
                ],
                [
                    { 'my_tag' : 1233 },
                    { 'my_tag' : undefined },
                ],
                [
                    { 'my_array' : [ 1, 2, 3] },
                    {},
                ],
                [
                    { 'my_null' : null },
                    {},
                ],
            ];

            for (var i = 0; i < testTable.length; i++) {
                var tracer = new lightstep.Tracer({
                    access_token : '{your_access_token}',
                    component_name : '{node_test_suite}',
                    disable_reporting_loop : true,
                    silent       : true,
                    tags         : testTable[i][0],
                });
                var expectSet = testTable[i][1];
                for (var key in expectSet) {
                    expect(tracer._runtime._attributes[key]).to.equal(expectSet[key]);
                }
            }
        });

        it('should default to an HTTPS port', function() {
            expect(makeLSTracer().options().collector_port).to.equal(443);
        });

        it('should default to correct ports when collector_encryption is set', function() {
            expect(makeLSTracer({
                collector_encryption : 'none',
            }).options().collector_port).to.equal(80);
            expect(makeLSTracer({
                collector_encryption : 'tls',
            }).options().collector_port).to.equal(443);
        });

        it('should treat collector_port=0 as meaning "use the default"', function() {
            expect(makeLSTracer({
                collector_port : 4000,
            }).options().collector_port).to.equal(4000);

            expect(makeLSTracer({
                collector_port : 0,
            }).options().collector_port).to.equal(443);

            expect(makeLSTracer({
                collector_port : 0,
                collector_encryption : 'none',
            }).options().collector_port).to.equal(80);
        });

        it('should default to an empty base path', function() {
            expect(makeLSTracer().options().collector_path).to.equal('');
        });

        it('should allow setting collector_path', function() {
            expect(makeLSTracer({
                collector_path : '/my_path',
            }).options().collector_path).to.equal('/my_path');
        });

        it('should allow setting a custom logger', function () {
            let hasLogged = false;
            makeLSTracer({
                logger : function () { hasLogged = true; },
                silent : false,
                verbosity : 4,
            });
            expect(hasLogged).to.equal(true);
        });

        it('should default to not empty spans on errors', function() {
            expect(makeLSTracer().options().clear_span_buffer_consecutive_errors).to.equal(null);
        });
    });

    describe("TracerImp#on", function() {
        it('is a method', function() {
            expect(Tracer.on).to.be.a("function");
        });

        it("should emit a 'span_added' event when each span ends", function() {
            var count = 0;
            var onSpan = function (record) {
                count++;
            };

            Tracer.on('span_added', onSpan);
            var s = Tracer.startSpan("test");
            expect(count).to.equal(0);
            s.finish();
            expect(count).to.equal(1);
            s = Tracer.startSpan("test");
            expect(count).to.equal(1);
            s.finish();
            expect(count).to.equal(2);

            Tracer.removeListener('span_added', onSpan);
            s = Tracer.startSpan("test");
            expect(count).to.equal(2);
            s.finish();
            expect(count).to.equal(2);
        });
    });
    describe("TracerImp#once", function() {
        it('is a method', function() {
            expect(Tracer.once).to.be.a("function");
        });
    });
    describe("TracerImp#emit", function() {
        it('is a method', function() {
            expect(Tracer.emit).to.be.a("function");
        });
    });

    describe("TracerImp#clearSpanRecordsIfMaxErrors", function() {
        it('should leave spanRecords if not configured', function() {
            const tracer = makeLSTracer();
            const s = tracer.startSpan("test");
            s.finish();
            tracer._clearSpanRecordsIfMaxErrors();
            expect(tracer._spanRecords.length).to.equal(1);
        });

        it('should drop spanRecords when threshold his reached', function() {
            const tracer = makeLSTracer({
                clear_span_buffer_consecutive_errors : 0,
            });
            const s = tracer.startSpan("test");
            s.finish();
            tracer._clearSpanRecordsIfMaxErrors();
            expect(tracer._spanRecords.length).to.equal(0);
            expect(tracer._counters['spans.dropped']).to.equal(1);
        });
    });
});
