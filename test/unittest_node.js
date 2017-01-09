// For the convenience of unit testing, add these to the global namespace
global._ = require('underscore');
global.expect = require('chai').expect;
global.opentracing = require('opentracing');
global.util = require('./util/util');
global.requireES6 = requireES6;
global.lightstep = require('..');
var path = require('path');
var FileTransport = require("./util/file_transport");

// For the unit tests, set a high event listener count since lots of
// temporary tracers are created
process.setMaxListeners(256);

// Use for "override" options specifically for unit testing
global.Tracer = new lightstep.Tracer({
    override_transport     : new FileTransport(path.join(__dirname, 'results/default_report.json')),
    component_name         : 'lightstep-tracer/unit-tests',
    access_token           : '010101010101010101020101010',
    disable_reporting_loop : true,
    verbosity              : 0,
});

describe('Common tests', function() {
    require('./suites/common.js');
});
describe('Node-specific', function() {
    require('./suites/node.js');
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
