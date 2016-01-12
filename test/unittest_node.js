// For the convenience of unit testing, add these to the global namespace
global._ = require("underscore");
global.expect = require("chai").expect;
global.Tracer = require("../dist/lightstep-tracer-node-debug");
global.util = require("./util/util");

global.requireES6 = requireES6;

// Send reports to a file, not to the internet
util.runtimeReportToFile(Tracer, "unittest.json");

describe("LightStep Tracer", function() {
    describe("Common", function() {
        require("./suites/common.js");
    });
    describe("Node-specific", function() {
        require("./suites/node.js");
    });
});

// Dynamically transform a ES6 file
function requireES6(filename) {
    var loaded = require("babel-core").transformFileSync(filename, { presets : ["es2015"] });
    var exports = {};
    var module = { exports : exports };
    var f = new Function("module", "exports", loaded.code);
    f(module, exports);
    return module.exports;
}
