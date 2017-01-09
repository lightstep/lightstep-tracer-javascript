//
// regress.js
//
// Intended to miscellaneous tests for specific cases that have been addressed
// in the past to prevent implementation regressions that do not fit cleanly
// into the more spec-driven unit tests.
//

it('should behave sanely with excessively large log messages', function() {
    var msg = (new Array(8*1024*1024)).join('x');

    var span = Tracer.startSpan('test');
    span.log({msg: msg});
    span.finish();
});

it('should behave sanely with excessively large log payloads', function() {
    var arr =  [];
    for (var i = 0; i < 1024; i++) {
        arr.push((new Array(8*1024)).join('x'));
    }
    var span = Tracer.startSpan('test');
    span.log({arr: arr});
    span.finish();
});

it('should generate correct URLs for both finished and unfinished spans', function() {
    var span = Tracer.startSpan('test');
    var url1 = span.generateTraceURL();
    span.finish();

    var url2 = span.generateTraceURL();

    expect(url1).to.be.a('string');
    expect(url2).to.be.a('string');
});

it('should fail gracefully on invalid inject format', function() {
    var span = Tracer.startSpan('test');
    Tracer.inject(span.context(), "unknown_custom_format", {});
    span.finish();
});

it('should coerce non-string operation names to strings', function() {
    var cases = [
        'test', 42, true
    ];
    var i;
    for (i = 0; i < cases.length; i++) {
        var span = Tracer.startSpan('valid_name');
        span.setOperationName(cases[i]);
        var name = span.getOperationName();
        expect(name).to.be.a('string');
        span.finish();
    }
});
