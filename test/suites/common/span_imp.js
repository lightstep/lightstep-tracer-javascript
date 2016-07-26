describe("SpanImp", function() {
    describe("SpanImp#getOperationName", function() {
        it("should return the operation name", function() {
            var span = Tracer.startSpan('hello_world');
            expect(span.imp().getOperationName()).to.be.eq("hello_world");
            span.finish();
        });
    });

    // Used by the browser to create spans retroactively
    describe("SpanImp#setBeginMicros", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.imp().setBeginMicros).to.be.a("function");
            span.finish();
        });
    });

    describe("SpanImp#beginMicros", function() {
        it("returns a number", function() {
            var span = Tracer.startSpan('test');
            expect(span.imp().beginMicros()).to.be.a("number");
            span.finish();
        });
    });

    // Used by the browser to create spans retroactively
    describe("SpanImp#setEndMicros", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.imp().setEndMicros).to.be.a("function");
            span.finish();
        });
    });

    describe("SpanImp#endMicros", function() {
        it("returns a number", function() {
            var span = Tracer.startSpan('test');
            expect(span.imp().endMicros()).to.be.a("number");
            span.finish();
        });
    });

    describe("SpanImp#guid", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.imp().guid).to.be.a("function");
            span.finish();
        });
    });

    describe("SpanImp#parentGUID", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.imp().parentGUID).to.be.a("function");
            span.finish();
        });

        it("should return the parent's guid", function() {
            var parent = Tracer.startSpan("A");
            var child = Tracer.startSpan("B", {
                childOf : parent.context(),
            });
            child.finish();
            parent.finish();

            expect(parent.imp().guid()).not.to.be.undefined;
            expect(parent.imp().parentGUID()).to.be.falsey;

            expect(child.imp().guid()).not.to.be.undefined;
            expect(child.imp().parentGUID()).to.equal(parent.imp().guid());
        });
    });

    describe("SpanImp#traceGUID", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.imp().traceGUID).to.be.a("function");
            span.finish();
        });

        it("should be a valid non-zero length string", function() {
            var span = Tracer.startSpan('test');
            var traceGUID = span.imp().traceGUID();
            expect(traceGUID).to.be.a("string");
            expect(traceGUID.length).to.be.gt(0);
            span.finish();
        });
    });

    describe("SpanImp#warn", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.imp().warn).to.be.a("function");
            span.finish();
        });
    });

    describe("SpanImp#fatal", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.imp().fatal).to.be.a("function");
            span.finish();
        });
    });

    describe("SpanImp#generateTraceURL", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.imp().generateTraceURL).to.be.a("function");
            span.finish();
        });
    });
});
