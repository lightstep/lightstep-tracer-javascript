describe("LightStep Tracer", function() {
    describe("Common", function() {
        require("./suites/common.js");
    });
    describe("Browser-specific", function() {
        require("./suites/browser.js");
    });
});
