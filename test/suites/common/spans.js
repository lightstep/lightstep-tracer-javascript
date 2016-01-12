it("should capture parent span guids", function () {

    var parent = Tracer.span("A");
    var child = parent.span("B");
    child.end();
    parent.end();

    var parentTags = parent.tags();
    var childTags = child.tags();

    expect(parent.guid()).not.to.be.undefined;
    expect(parentTags['parent_span_guid']).to.be.undefined;

    expect(child.guid()).not.to.be.undefined;
    expect(childTags['parent_span_guid']).to.equal(parent.guid());

    Tracer.flush();
});

it("should emit a 'span_added' event when each span ends", function() {
    var count = 0;
    var onSpan = function (record) {
        count++;
    };

    Tracer.on('span_added', onSpan);
    var s = Tracer.span("test");
    expect(count).to.equal(0);
    s.end();
    expect(count).to.equal(1);
    s = Tracer.span("test");
    expect(count).to.equal(1);
    s.end();
    expect(count).to.equal(2);

    Tracer.removeListener('span_added', onSpan);
    s = Tracer.span("test");
    expect(count).to.equal(2);
    s.end();
    expect(count).to.equal(2);
});
