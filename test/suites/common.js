describe("API", function() {
    require("./common/tracer.js");
    require("./common/span.js");
    require("./common/span_context.js");
});
describe("Implementation-specific", function() {
    require("./common/tracer_imp.js");
    require("./common/propagators.js");
    require("./common/span_imp.js");
    require("./common/span_context_imp.js");
});
describe("Regression Tests", function() {
    require("./common/regress.js");
});
