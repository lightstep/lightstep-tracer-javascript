var fs            = require("fs");
var path          = require("path");
var deepClone     = require("clone");
var _             = require("underscore");
var FileTransport = require("./file_transport");
var TestRequests  = require("./test_requests");

function Util() {
}

Util.prototype.runtimeReportToFile = function (runtime, filename) {
    // Testing workaround to allow the runtime to flush without a component_name
    runtime._runtimeGUID = Math.floor(Math.random() * 1e24);

    // Put all output in the "results" directory
    filename = path.join(__dirname, "../results/", filename);

    // This is a unit testing utility: unabashedly reach into the object and
    // change what we need to change for testing purposes!
    var previous = runtime._transport;
    runtime._transport = new FileTransport(filename);
    return previous;
};

Util.prototype.requestsFromFile = function (filename) {
    filename = path.join(__dirname, "../results/", filename);
    var content = JSON.parse(fs.readFileSync(filename, "utf8"));
    return new TestRequests(content);
};

module.exports = new Util();
