describe("SpanContextImp", function() {
    describe("SpanContextImp#forEachBaggageItem", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.context().forEachBaggageItem).to.be.a("function");
            span.finish();
        });
    });
});
