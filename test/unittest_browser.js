var LocalStorageTransport = require('./util/localstorage_transport');

Tracer.initGlobalTracer(LightStep.tracer({
    access_token       : '{your_access_token}',
    component_name     : 'lightstep/unittests/browser',
    override_transport : new LocalStorageTransport('lightstep_report'),
}));

describe("LightStep Tracer", function() {
    describe("Common", function() {
        require("./suites/common.js");
    });
    describe("Browser-specific", function() {
        require("./suites/browser.js");
    });
});
