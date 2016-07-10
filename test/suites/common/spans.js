it("should record a trace GUID with every span");

it("should capture parent span guids", function () {

    var parent = Tracer.startSpan("A");
    var child = Tracer.startSpan("B", {
        reference : Tracer.childOf(parent.context()),
    });
    child.finish();
    parent.finish();

    expect(parent.imp().guid()).not.to.be.undefined;
    expect(parent.imp().parentGUID()).to.be.falsey;

    expect(child.imp().guid()).not.to.be.undefined;
    expect(child.imp().parentGUID()).to.equal(parent.imp().guid());
});

it("should emit a 'span_added' event when each span ends", function() {
    var count = 0;
    var onSpan = function (record) {
        count++;
    };

    Tracer.imp().on('span_added', onSpan);
    var s = Tracer.startSpan("test");
    expect(count).to.equal(0);
    s.finish();
    expect(count).to.equal(1);
    s = Tracer.startSpan("test");
    expect(count).to.equal(1);
    s.finish();
    expect(count).to.equal(2);

    Tracer.imp().removeListener('span_added', onSpan);
    s = Tracer.startSpan("test");
    expect(count).to.equal(2);
    s.finish();
    expect(count).to.equal(2);
});

it("should handle inject / extract to text map carriers correctly" , function() {
    var span = Tracer.startSpan('my_span');
    var spanContext = span.context();
    spanContext.setBaggageItem('footwear', 'sandals');
    spanContext.setBaggageItem('creditcard', 'visa');

    var carrier = {};
    Tracer.inject(spanContext, Tracer.FORMAT_TEXT_MAP, carrier);
    expect(carrier['ot-tracer-traceid']).to.equal(spanContext.imp()._traceGUID);
    expect(carrier['ot-tracer-spanid']).to.equal(spanContext.imp()._guid);
    expect(carrier['ot-baggage-footwear']).to.equal('sandals');
    expect(carrier['ot-baggage-creditcard']).to.equal('visa');

    var extractedContext = Tracer.extract(Tracer.FORMAT_TEXT_MAP, carrier);
    expect(extractedContext.imp()._guid).to.equal(spanContext.imp()._guid);
    expect(extractedContext.getBaggageItem('footwear')).to.equal('sandals');
    expect(extractedContext.getBaggageItem('creditcard')).to.equal('visa');
});

it('should gracefully handle a large number of spans', function() {
    Tracer.imp().flush();
    for (var i = 0; i < 10000; i++) {
        var span = Tracer.startSpan('microspan');
        span.finish();
    }
    Tracer.imp().flush();
});
