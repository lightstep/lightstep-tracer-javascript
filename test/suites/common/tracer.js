describe("Tracer", function() {
    describe("Tracer#startSpan", function() {
        it('supports operation name only', function() {
            var span = Tracer.startSpan('test');
            span.finish();
        });

        it('supports childOf with a Span object', function() {
            var parent = Tracer.startSpan('test1');
            var span = Tracer.startSpan('test2', { childOf : parent });
            span.finish();
            parent.finish();
        });
        it('supports childOf with a SpanContext object', function() {
            var parent = Tracer.startSpan('test1');
            var span = Tracer.startSpan('test2', { childOf : parent.context() });
            span.finish();
            parent.finish();
        });

        it('supports followsFrom with a Span object', function() {
            var parent = Tracer.startSpan('test1');
            var span = Tracer.startSpan('test2', { followsFrom : parent });
            span.finish();
            parent.finish();
        });
        it('supports childOf with a SpanContext object', function() {
            var parent = Tracer.startSpan('test1');
            var parentContext = parent.context();
            parent.finish();

            var span = Tracer.startSpan('test2', { followsFrom : parentContext });
            span.finish();
        });

        it('supports startTime', function() {
            var now = Date.now() - 5000;
            var span = Tracer.startSpan('test2', { startTime : now });
            span.finish();
        });

        it("supports tags", function() {
            // Verify that we can add tags at startSpan time.
            var span = Tracer.startSpan("test", {
                tags: {
                    tag_a: 1,
                    tag_b: "b",
                    tag_c: true,
                }
            });
            span.finish();
        });

        it('should handle a large number of spans gracefully', function() {
            Tracer.flush();
            for (var i = 0; i < 10000; i++) {
                var span = Tracer.startSpan('microspan');
                span.finish();
            }
            Tracer.flush();
        });
    });

    describe("Tracer#finish", function() {
        it('is a method', function() {
            var span = Tracer.startSpan('test');
            expect(span.finish).to.be.a("function");
            span.finish();
        });
    });

    describe("Tracer#inject", function() {
        it('is a method', function() {
            expect(Tracer.inject).to.be.a("function");
        });

        it("should propagate text map carriers" , function() {
            var span = Tracer.startSpan('my_span');
            var spanContext = span.context();
            spanContext.setBaggageItem('footwear', 'sandals');
            spanContext.setBaggageItem('creditcard', 'visa');

            var carrier = {};
            Tracer.inject(spanContext, opentracing.FORMAT_TEXT_MAP, carrier);
            expect(carrier['ot-tracer-traceid']).to.equal(spanContext._traceGUID);
            expect(carrier['ot-tracer-spanid']).to.equal(spanContext._guid);
            expect(carrier['ot-baggage-footwear']).to.equal('sandals');
            expect(carrier['ot-baggage-creditcard']).to.equal('visa');

            var extractedContext = Tracer.extract(opentracing.FORMAT_TEXT_MAP, carrier);
            expect(extractedContext._guid).to.equal(spanContext._guid);
            expect(extractedContext.getBaggageItem('footwear')).to.equal('sandals');
            expect(extractedContext.getBaggageItem('creditcard')).to.equal('visa');
        });

        it("should propagate http header carriers", function() {
            var span = Tracer.startSpan('my_span');
            var spanContext = span.context();
            spanContext.setBaggageItem('footwear', 'sandals');
            spanContext.setBaggageItem('creditcard', 'visa');

            var carrier = {};
            Tracer.inject(spanContext, opentracing.FORMAT_HTTP_HEADERS, carrier);
            expect(carrier['ot-tracer-traceid']).to.equal(spanContext._traceGUID);
            expect(carrier['ot-tracer-spanid']).to.equal(spanContext._guid);
            expect(carrier['ot-baggage-footwear']).to.equal('sandals');
            expect(carrier['ot-baggage-creditcard']).to.equal('visa');

            var extractedContext = Tracer.extract(opentracing.FORMAT_HTTP_HEADERS, carrier);
            expect(extractedContext._guid).to.equal(spanContext._guid);
            expect(extractedContext.getBaggageItem('footwear')).to.equal('sandals');
            expect(extractedContext.getBaggageItem('creditcard')).to.equal('visa');
        });

        it("should propagate binary carriers");
    });

    describe("Tracer#extract", function() {
        it('is a method', function() {
            expect(Tracer.extract).to.be.a("function");
        });

        it("should extract from an empty text map carrier correctly" , function() {
            var carrier = {};
            var extractedContext = Tracer.extract(opentracing.FORMAT_TEXT_MAP, carrier);
            expect(extractedContext).to.be.null;
        });
    });

    describe("Tracer#flush", function() {
        it("supports passing no arguments", function() {
            var span = Tracer.startSpan('test');
            span.finish();
            Tracer.flush();
        });
        it("supports passing a callback argument", function(done) {
            var span = Tracer.startSpan('test');
            span.finish();
            Tracer.flush(function(err) {
                done();
            });
        });
    });
});
