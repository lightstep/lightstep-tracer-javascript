var coerce = requireES6("./src/imp/coerce.js");

it("should have the expected API", function() {
    expect(coerce.toString).to.be.a("function");
    expect(coerce.toNumber).to.be.a("function");
});

it("should coerce all types to strings", function() {
    var pairs = [
        [ "",           "" ],
        [ "abc",        "abc" ],
        [ 0,            "0" ],
        [ 1,            "1" ],
        [ null,         "null" ],
        [ undefined,    "undefined" ],
    ];
    _.each(pairs, function (pair) {
        expect(coerce.toString(pair[0])).to.equal(pair[1]);
    });
});
