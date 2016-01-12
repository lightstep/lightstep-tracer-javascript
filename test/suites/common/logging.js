
it("should not throw an exception on simple operations", function () {
    Tracer.infof("Hello World %d", 42);
    Tracer.warnf("Hello World %d", 42);
    Tracer.errorf("Hello World %d", 42);

    var span = Tracer.span("test_operation");
        var subspan = span.span("test_subspan");
        subspan.infof("Hello World %d", 42);
        subspan.warnf("Hello %s %d", "World", 42);
        subspan.errorf("%s World %f", "Hello", 42.0);
        subspan.end();
    span.end();

    Tracer.flush();
});

it ("should safely log all types of values", function() {
    Tracer.infof("",
        undefined,
        null,
        true,
        false,
        0, 1, -1,
        0.0, 1.0, -1.0,
        "", "\t\n\r",
        [],
        [undefined],
        {},
        {field:undefined},
        function() {}
    );
});

it("should safely log circular data structures", function () {
    var a = { b : null };
    var b = { a : a };
    a.b = b;

    Tracer.infof("%j", a);
    Tracer.warnf("%j", a);
    Tracer.errorf("%j", a);

    var span = Tracer.span("test_operation");
    span.infof("%j", a);
    span.warnf("%j", a);
    span.errorf("%j", a);
    span.end();

    Tracer.flush();
});

it("should not throw an exception on lots of logs and spans", function () {
    this.timeout(5000);
    for (var i = 0; i < 10000; i++) {
        Tracer.infof("Hello World %d", 42);

        var span = Tracer.span("test_operation");
            var subspan = span.span("test_subspan");
            subspan.end();
        span.end();
    }
    Tracer.flush();
});

it("should emit a 'log_added' event for every log", function() {
    var count = 0;
    var onLog = function (record) {
        count++;
    };

    Tracer.on('log_added', onLog);
    Tracer.infof("Test %d", 124);
    Tracer.warnf("Test");
    Tracer.errorf("Test");
    for (var i = 0; i < 7; i++) {
        Tracer.infof("Loop");
    }
    Tracer.removeListener('log_added', onLog);
    Tracer.infof("Extra");

    expect(count).to.equal(10);
});
