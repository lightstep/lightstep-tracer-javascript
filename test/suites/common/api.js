describe("LightStep Tracer has the expected methods", function () {
    describe("OpenTracing 1.0", function() {
        expectToBeFunctions(Tracer, "startSpan inject extract");
    });
    describe("Implementation-specific", function() {
        expectToBeFunctions(Tracer.imp(), "options");
        expectToBeFunctions(Tracer.imp(), "on once emit");
    });
});


describe("LightStep Span has the expected methods", function() {
    describe("OpenTracing 1.0", function() {
        var span = Tracer.startSpan('test');
        expectToBeFunctions(span, "setTag addTags");
        expectToBeFunctions(span, "log logEvent");
        expectToBeFunctions(span, "finish");
        expectToBeFunctions(span.context(), "setBaggageItem getBaggageItem");
        span.finish();
    });
    describe("Implementation-specific", function() {
        var span = Tracer.startSpan('test');
        expectToBeFunctions(span.imp(), "guid parentGUID");
        expectToBeFunctions(span.imp(), "warn fatal");
        expectToBeFunctions(span.context().imp(), "forEachBaggageItem");
        span.finish();
    });
});

function expectToBeFunctions(obj, list) {
    _.each(list.split(/\s+/), function (name) {
        it("should have a method named " + name, function () {
            expect(obj[name]).to.be.a("function");
        });
    });
}

function expectToBeUndefined(obj, list) {
    _.each(list.split(/\s+/), function (name) {
        it("should not have a property named " + name, function() {
            expect(obj[name]).to.be.a("undefined");
        });
    });
}
