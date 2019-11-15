describe("Propagators", function() {
    describe("DDPropagator", function() {
        it('supports DD trace headers', function() {
            const propagator = new lightstep.DDPropagator();

            let headers = {
                'x-datadog-trace-id':          '100000000000456',
                'x-datadog-parent-id':         '100000000000123',
                'x-datadog-sampling-priority': '1'
            }
            let context = propagator.extract(headers);
            let textMap = {};
            propagator.inject(context, textMap)
            expect(headers).to.deep.equal(textMap);
        })
    })
})
