describe("SpanContext", function() {
    describe("SpanContext#setBaggageItem", function() {
        it('is a method', function() {
            var span = Tracer.startSpan('test');
            var spanContext = span.context();
            span.finish();

            expect(spanContext.setBaggageItem).to.be.a("function");
        });
    });

    describe("SpanContext#getBaggageItem", function() {
        it('is a method', function() {
            var span = Tracer.startSpan('test');
            var spanContext = span.context();
            span.finish();

            expect(spanContext.getBaggageItem).to.be.a("function");
        });
    });

    describe("SpanContext#toTraceId", function() {
        it('is a method', function() {
            var span = Tracer.startSpan('test');
            var spanContext = span.context();
            span.finish();

            expect(spanContext.toSpanId).to.be.a("function");
        });
    });

    describe("SpanContext#toSpanId", function() {
        it('is a method', function() {
            var span = Tracer.startSpan('test');
            var spanContext = span.context();
            span.finish();

            expect(spanContext.toTraceId).to.be.a("function");
        });
    });
});
