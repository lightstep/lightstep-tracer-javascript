//, {"Content-Type": "application/json"}, '{"dummy":"data"}'
function getExpectedHeaderKeys() {
    const dummySpan = Tracer.startSpan('dummy');
    const headersCarrier = {};
    Tracer.inject(dummySpan.context(), opentracing.FORMAT_HTTP_HEADERS, headersCarrier);
    return Object.keys(headersCarrier);
}

function confirmHeadersHaveBeenSet(headers) {
    const expectedHeaderKeys = getExpectedHeaderKeys();
    expectedHeaderKeys.forEach(expectedKey => expect(headers[expectedKey]).to.be.a("string"))
}

function confirmHeadersHaventBeenSet(headers) {
    const expectedHeaderKeys = getExpectedHeaderKeys();
    expectedHeaderKeys.forEach(expectedKey => expect(headers && headers[expectedKey]).to.equal(undefined))
}

describe("Request auto-instrumentation", function() {
    describe("xhr", function() {
        Tracer.options({
            xhr_instrumentation: true,
        });

        afterEach(function() {
            Tracer.options({
                xhr_url_inclusion_patterns: [/.*/],
                xhr_url_exclusion_patterns: [],
                xhr_url_header_inclusion_patterns: [/.*/],
                xhr_url_header_exclusion_patterns: [],
            });
        });

        after(function() {
          Tracer.options({
              xhr_instrumentation: false,
          });
        });

        it("auto instruments xhr requests", function(done) {
            function spanStarted(span) {
                expect(span._operationName).to.equal("XMLHttpRequest");
                done();
            }
            Tracer.once('start_span', spanStarted);
            const request = new XMLHttpRequest();
            request.open("GET", "http://include-me-header-test.com");
            request.send();
            request.respond(200);
        });
        it("only traces urls that have been included", function(done) {
            Tracer.options({
                xhr_url_inclusion_patterns: [/.*include-me.*/],
            });
            const includedUrl = "http://include-me-header-test.com";

            Tracer.once('span_added', function(span) {
                expect(span._tags.url).to.equal(includedUrl);
                done();
            });
            const ignoredRequest = new XMLHttpRequest();
            ignoredRequest.open("GET", "http://exclude-me-header-test.com");
            ignoredRequest.send();
            ignoredRequest.respond(200);

            const request = new XMLHttpRequest();
            request.open("GET", includedUrl);
            request.send();
            request.respond(200);
        });

        it("doesnt trace urls that have been excluded", function(done) {
            Tracer.options({
                xhr_url_exclusion_patterns: [/.*exclude-me.*/],
            });
            const excludedUrl = "http://exclude-me-header-test.com";

            Tracer.once('span_added', function(span) {
                expect(span._tags.url).to.not.equal(excludedUrl);
                done();
            });
            const ignoredRequest = new XMLHttpRequest();
            ignoredRequest.open("GET", "http://exclude-me-header-test.com");
            ignoredRequest.send();
            ignoredRequest.respond(200);

            const request = new XMLHttpRequest();
            request.open("GET", "http://include-me-header-test.com");
            request.send();
            request.respond(200);
        });

        it("includes tracing headers on all urls by default", function() {
            const request = new XMLHttpRequest();
            request.open("GET", "http://exclude-me-header-test.com");
            request.send();
            confirmHeadersHaveBeenSet(request.requestHeaders); 
        });

        it("includes tracing headers on included urls", function() {
            Tracer.options({
                xhr_url_header_inclusion_patterns: [/.*include-me.*/],
            });

            const ignoredRequest = new XMLHttpRequest();
            ignoredRequest.open("GET", "http://exclude-me-header-test.com");
            ignoredRequest.send();
            confirmHeadersHaventBeenSet(ignoredRequest.requestHeaders);

            const request = new XMLHttpRequest();
            request.open("GET", "http://include-me-header-test.com");
            request.send();
            confirmHeadersHaveBeenSet(request.requestHeaders);
        });

        it("excludes tracing headers on excludes urls", function() {
            Tracer.options({
                xhr_url_header_exclusion_patterns: [/.*exclude-me.*/],
            });

            const ignoredRequest = new XMLHttpRequest();
            ignoredRequest.open("GET", "http://exclude-me-header-test.com");
            ignoredRequest.send();
            confirmHeadersHaventBeenSet(ignoredRequest.requestHeaders);

            const request = new XMLHttpRequest();
            request.open("GET", "http://include-me-header-test.com");
            request.send();
            confirmHeadersHaveBeenSet(request.requestHeaders);
        });
    });
    describe("fetch", function() {

        Tracer.options({
            fetch_instrumentation: true,
        });

        afterEach(function(done) {
            Tracer.options({
                fetch_url_inclusion_patterns: [/.*/],
                fetch_url_exclusion_patterns: [],
                fetch_url_header_inclusion_patterns: [/.*/],
                fetch_url_header_exclusion_patterns: [],
            });
            fetchMock.flush().then(done);
        });

        after(function() {
            Tracer.options({
                fetch_instrumentation: false,
            });
        });

        it("auto instruments fetch requests", function(done) {
            function spanStarted(span) {
                expect(span._operationName).to.equal("fetch");
                done();
            }
            Tracer.once('start_span', spanStarted);
            fetch("http://include-me-header-test.com");
        });
        it("only traces urls that have been included", function(done) {
            Tracer.options({
                fetch_url_inclusion_patterns: [/.*include-me.*/],
            });
            const includedUrl = "http://include-me-header-test.com/";

            Tracer.once('span_added', function(span) {
                expect(span._tags.url).to.equal(includedUrl);
                done();
            });
            fetch("http://exclude-me-header-test.com");
            fetch(includedUrl);
        });

        it("doesnt trace urls that have been excluded", function(done) {
            Tracer.options({
                fetch_url_exclusion_patterns: [/.*exclude-me.*/],
            });
            const excludedUrl = "http://exclude-me-header-test.com";

            Tracer.once('span_added', function(span) {
                expect(span._tags.url).to.not.equal(excludedUrl);
                done();
            });
            fetch("http://exclude-me-header-test.com");
            fetch("http://include-me-header-test.com");
        });

        it("includes tracing headers on all urls by default", function() {
            fetch("http://include-me-header-test.com");
            const request = fetchMock.lastCall()[1];
            confirmHeadersHaveBeenSet(request.headers);
        });

        it("includes tracing headers on included urls", function() {
            Tracer.options({
                fetch_url_header_inclusion_patterns: [/.*include-me.*/],
            });

            fetch("http://exclude-me-header-test.com");
            const ignoredRequest = fetchMock.lastCall()[1];
            confirmHeadersHaventBeenSet(ignoredRequest.ignoredRequest);

            fetch("http://include-me-header-test.com");
            const request = fetchMock.lastCall()[1];
            confirmHeadersHaveBeenSet(request.headers);
        });

        it("excludes tracing headers on excludes urls", function() {
            Tracer.options({
                fetch_url_header_exclusion_patterns: [/.*exclude-me.*/],
            });

            fetch("http://exclude-me-header-test.com");
            const ignoredRequest = fetchMock.lastCall()[1];
            confirmHeadersHaventBeenSet(ignoredRequest.headers);

            fetch("http://include-me-header-test.com");
            const request = fetchMock.lastCall()[1];
            confirmHeadersHaveBeenSet(request.headers);
        });
    });
});
