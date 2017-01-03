var LocalStorageTransport = require('./util/localstorage_transport');

global.Tracer = LightStep.tracer({
    access_token       : '{your_access_token}',
    component_name     : 'lightstep/unittests/browser',
    override_transport : new LocalStorageTransport('lightstep_report'),
});

describe("Common", function() {
    require("./suites/common.js");
});
describe("Browser-specific", function() {
    require("./suites/browser.js");
});
