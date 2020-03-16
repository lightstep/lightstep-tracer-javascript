describe("Span", function() {

    describe("Span#tracer", function() {
        it("should return an object", function() {
            var span = Tracer.startSpan('test');
            var tracer = span.tracer()
            expect(tracer).to.be.an('object');
            expect(tracer).to.not.eq(null);
            span.finish();
        });
    });

    describe("Span#setOperationName", function() {
        it("supports setOperationName", function() {
            var span = Tracer.startSpan('test');
            span.setOperationName('another_name');
            span.finish();
        });
    });

    describe("Span#setTag", function() {
        it("supports setTag", function() {
            var span = Tracer.startSpan('test');
            span.setTag('my_tag', 'my_value');
            span.finish();
        });
        it("supports setTag with boolean values", function() {
            var span = Tracer.startSpan('test');
            span.setTag('my_tag', true);
            span.finish();
        });
        it("supports setTag with number values", function() {
            var span = Tracer.startSpan('test');
            span.setTag('my_tag', 42);
            span.finish();
        });
    });

    describe("Span#setBaggageItem", function() {
        it("sets the baggage item in the context", function() {
            var span = Tracer.startSpan('test');
            span.setBaggageItem('my_baggage', 'my_value');
            span.finish();

            expect(span.context().getBaggageItem('my_baggage')).to.equal('my_value');
        });
    });

    describe("Span#getBaggageItem", function() {
        it("gets the baggage item from the context", function() {
            var span = Tracer.startSpan('test');
            span.context().setBaggageItem('my_baggage', 'my_value');
            span.finish();

            expect(span.getBaggageItem('my_baggage')).to.equal('my_value');
        });
    });

    describe("Span#addTags", function() {
        it("supports addTags", function() {
            var span = Tracer.startSpan('test');
            span.addTags({
                my_tag : 'my_value',
                bool_tag : true,
                number_tag : 42,
            });
            span.finish();
        });
    });

    describe("Span#log", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.log).to.be.a("function");
            span.finish();
        });

        it("should safely log circular data structures", function () {
            var a = { b : null };
            var b = { a : a };
            a.b = b;

            var span = Tracer.startSpan("test_operation");
            span.logEvent("info", a);
            span.finish();

            Tracer.flush();
        });

        it("should not throw an exception on lots of logs and spans", function () {
            this.timeout(5000);
            for (var i = 0; i < 10000; i++) {
                var span = Tracer.startSpan("test_operation");
                    var subspan = Tracer.startSpan("test_subspan", { childOf : span });
                    subspan.finish();
                span.finish();
            }
            Tracer.flush();
        });
    });

    describe("Span#logEvent", function() {
        it("is a method", function() {
            var span = Tracer.startSpan('test');
            expect(span.logEvent).to.be.a("function");
            span.finish();
        });
    });
});
