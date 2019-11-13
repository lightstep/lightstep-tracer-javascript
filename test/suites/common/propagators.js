describe("Propagators", function() {
    describe("DDPropagator", function() {
        it('supports DD trace headers', function() {
            const id = (128).toString(16);
            const propagator = new lightstep.DDPropagator();
            const span = Tracer.startSpan('test1');
            span.context()._guid = id
            span.context()._traceGUID = id

            var textMap = {};
            propagator.inject(span.context(), textMap)
            expect(textMap['x-datadog-span-id']).to.equal('128');
            expect(textMap['x-datadog-trace-id']).to.equal('128');

            let context = propagator.extract(textMap);
            expect(context._guid).to.equal(span.context()._guid)
            expect(context._traceGUID).to.equal(span.context()._traceGUID)
        })
    })
})
