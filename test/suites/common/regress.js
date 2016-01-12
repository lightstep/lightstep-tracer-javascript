//
// regress.js
//
// Intended to miscellaneous tests for specific cases that have been addressed
// in the past to prevent implementation regressions that do not fit cleanly
// into the more "spec"-driven unit tests.
//

it("should behave sanely with excessively large log messages", function() {
    var msg = (new Array(8*1024*1024)).join("x");
    Tracer.infof("%s", msg);
    Tracer.warnf("%s", msg);
    Tracer.errorf("%s", msg);
});

it("should behave sanely with excessively large log payloads", function() {
    var arr =  [];
    for (var i = 0; i < 1024; i++) {
        arr.push((new Array(8*1024)).join("x"));
    }
    Tracer.infof("%j", arr);
    Tracer.warnf("%j", arr);
    Tracer.errorf("%j", arr);
});
