describe("SpanImp", function() {
    describe("SpanImp#getOperationName", function() {
        it("should return the operation name", function() {
            var span = Tracer.startSpan('hello_world');
            expect(span.getOperationName()).to.be.eq("hello_world");
            span.finish();
        });
    });

    // Used by the browser to create spans retroactively
    describe("SpanImp#setBeginMicros", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.setBeginMicros).to.be.a("function");
            span.finish();
        });
    });

    describe("SpanImp#beginMicros", function() {
        it("returns a number", function() {
            var span = Tracer.startSpan('test');
            expect(span.beginMicros()).to.be.a("number");
            span.finish();
        });
    });

    describe("SpanImp#beginMicrosWithNanos", function() {
        it("handles fractional timestamps", function() {
            var span = Tracer.startSpan('test', {startTime: 1550584089648.123456789})
            expect(span.beginMicros() % 1).to.be.eq(0)
            span.finish();
        });
    });

    // Used by the browser to create spans retroactively
    describe("SpanImp#setEndMicros", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.setEndMicros).to.be.a("function");
            span.finish();
        });
    });

    describe("SpanImp#endMicros", function() {
        it("returns a number", function() {
            var span = Tracer.startSpan('test');
            expect(span.endMicros()).to.be.a("number");
            span.finish();
        });
    });

    describe("SpanImp#guid", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.guid).to.be.a("function");
            span.finish();
        });

        it("is a valid 64-bit hex UUID", function() {
            for (var i = 0; i < 256; i++) {
                var span = Tracer.startSpan('test');
                var guid = span.guid();
                expect(guid).to.be.a('string');
                expect(guid.length).to.eq(16);
                var c = guid.split('');
                expect(c.length).to.eq(16);
                for (var j = 0; j < 16; j++) {
                    var v = parseInt(c[j], 16);
                    expect(v).to.be.gte(0);
                    expect(v).to.be.lte(15);
                }
                span.finish();
            }
        });
    });

    describe("SpanImp#parentGUID", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.parentGUID).to.be.a("function");
            span.finish();
        });

        it("should return the parent's guid", function() {
            var parent = Tracer.startSpan("A");
            var child = Tracer.startSpan("B", {
                childOf : parent.context(),
            });
            child.finish();
            parent.finish();

            expect(parent.guid()).not.to.be.undefined;
            expect(parent.parentGUID()).to.be.falsey;

            expect(child.guid()).not.to.be.undefined;
            expect(child.parentGUID()).to.equal(parent.guid());
        });
    });

    describe("SpanImp#traceGUID", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.traceGUID).to.be.a("function");
            span.finish();
        });

        it("should be a valid non-zero length string", function() {
            var span = Tracer.startSpan('test');
            var traceGUID = span.traceGUID();
            expect(traceGUID).to.be.a("string");
            expect(traceGUID.length).to.be.gt(0);
            span.finish();
        });
    });

    describe("SpanImp#generateTraceURL", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.generateTraceURL).to.be.a("function");
            span.finish();
        });
    });
});
