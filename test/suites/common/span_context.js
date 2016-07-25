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
});
