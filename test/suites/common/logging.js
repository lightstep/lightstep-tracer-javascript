
it("should not throw an exception on simple operations", function () {
    var span = Tracer.startSpan("test_operation");
        var subspan = Tracer.startSpan("test_subspan", { parent : span });
        subspan.imp().info("Hello World");
        subspan.imp().error("Hello World!!");
        subspan.finish();
    span.finish();

    Tracer.imp().flush();
});

it("should safely log circular data structures", function () {
    var a = { b : null };
    var b = { a : a };
    a.b = b;

    var span = Tracer.startSpan("test_operation");
    span.imp().info("info", a);
    span.imp().warn("warn", a);
    span.imp().error("error", a);
    span.finish();

    Tracer.imp().flush();
});

it("should not throw an exception on lots of logs and spans", function () {
    this.timeout(5000);
    for (var i = 0; i < 10000; i++) {
        var span = Tracer.startSpan("test_operation");
            var subspan = Tracer.startSpan("test_subspan", { parent : span });
            subspan.finish();
        span.finish();
    }
    Tracer.imp().flush();
});
