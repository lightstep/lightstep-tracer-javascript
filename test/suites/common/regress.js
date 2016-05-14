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
    span.imp().info(msg);
    span.imp().warn(msg);
    span.imp().error(msg);
    span.finish();
});

it('should behave sanely with excessively large log payloads', function() {
    var arr =  [];
    for (var i = 0; i < 1024; i++) {
        arr.push((new Array(8*1024)).join('x'));
    }
    var span = Tracer.startSpan('test');
    span.imp().info('message', arr);
    span.imp().warn('message', arr);
    span.imp().error('message', arr);
    span.finish();
});

it('should generate correct URLs for both finished and unfinished spans', function() {
    var span = Tracer.startSpan('test');
    var url1 = span.imp().generateTraceURL();
    span.finish();

    var url2 = span.imp().generateTraceURL();

    expect(url1).to.be.a('string');
    expect(url2).to.be.a('string');
});

it('should fail gracefully on invalid inject format', function() {
    var span = Tracer.startSpan('test');
    Tracer.inject(span, "unknown_custom_format", {});
    span.finish();
});
