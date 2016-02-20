it("should capture parent span guids", function () {

    var parent = Tracer.startSpan("A");
    var child = parent.startChildSpan("B");
    child.finish();
    parent.finish();

    expect(parent.imp().guid()).not.to.be.undefined;
    expect(parent.imp().parentGuid()).to.be.falsey;

    expect(child.imp().guid()).not.to.be.undefined;
    expect(child.imp().parentGuid()).to.equal(parent.imp().guid());
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
