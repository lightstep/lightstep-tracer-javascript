describe("Library has the expected logging methods", function () {
    expectToBeFunctions("infof warnf errorf fatalf");
});

describe("Library has only the expected EventEmitter methods", function () {
    expectToBeFunctions("on once");
    expectToBeUndefined("emit");
});

function expectToBeUndefined(list) {
    _.each(list.split(/\s+/), function (name) {
        it("should not have a property named " + name, function() {
            expect(Tracer[name]).to.be.a("undefined");
        });
    });
}

function expectToBeFunctions(list) {
    _.each(list.split(/\s+/), function (name) {
        it("should have a method named " + name, function () {
            expect(Tracer[name]).to.be.a("function");
        });
    });
}
