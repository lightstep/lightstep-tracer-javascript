describe('Propagators', () => {
    describe('DDPropagator', () => {
        it('supports DD trace headers', () => {
            const propagator = new lightstep.DDPropagator();

            let headers = {
                'x-datadog-trace-id'          : '100000000000456',
                'x-datadog-parent-id'         : '100000000000123',
                'x-datadog-sampling-priority' : '1',
            };
            let context = propagator.extract(headers);
            let textMap = {};
            propagator.inject(context, textMap);
            expect(headers).to.deep.equal(textMap);
        });
    });
    describe('EnvoyPropagator', () => {
        it('injects and extracts span context for envoy', () => {
            const propagator = new lightstep.EnvoyPropagator();

            let span = Tracer.startSpan('test');
            let carrier = propagator.inject(span.context(), {});

            let extracted = propagator.extract(carrier);
            expect(extracted._traceGUID).to.equal(span.context()._traceGUID);
            expect(extracted._guid).to.equal(span.context()._guid);
            expect(extracted.samples).to.equal(span.context().sampled);
        });
        it('injects and extracts baggage for envoy', () => {
            const propagator = new lightstep.EnvoyPropagator();

            let span = Tracer.startSpan('test');
            span.context().setBaggageItem('marco', 'polo');
            span.context().setBaggageItem('one', '1');
            span.context().setBaggageItem('truthy', 'true');

            let carrier = propagator.inject(span.context(), {});
            let extracted = propagator.extract(carrier);
            expect(extracted.getBaggageItem('marco')).to.equal('polo');
            expect(extracted.getBaggageItem('one')).to.equal('1');
            expect(extracted.getBaggageItem('truthy')).to.equal('true');
        });
    });
});
