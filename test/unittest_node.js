// For the convenience of unit testing, add these to the global namespace
global._ = require('underscore');
global.expect = require('chai').expect;
global.Tracer = require('opentracing');
global.util = require('./util/util');
global.requireES6 = requireES6;
global.LightStep = require('../dist/lightstep-tracer-node-debug');
var path = require('path');
var FileTransport = require("./util/file_transport");

// Use for "override" options specifically for unit testing
Tracer.initGlobalTracer(LightStep.tracer({
    override_transport     : new FileTransport(path.join(__dirname, 'results/default_report.json')),
    component_name         : 'lightstep-tracer/unit-tests',
    access_token           : '010101010101010101020101010',
    disable_reporting_loop : true,
}));

describe('LightStep Tracer', function() {
    describe('Common', function() {
        require('./suites/common.js');
    });
    describe('Node-specific', function() {
        require('./suites/node.js');
    });
});

// Dynamically transform a ES6 file
function requireES6(filename) {
    var loaded = require('babel-core').transformFileSync(filename, { presets : ['es2015'] });
    var exports = {};
    var module = { exports : exports };
    var f = new Function('module', 'exports', loaded.code);
    f(module, exports);
    return module.exports;
}
