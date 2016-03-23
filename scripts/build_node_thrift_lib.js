// Combine and patch the various Thrift files in the browser into a single file.

var fs      = require("fs"),
    path    = require("path");

// Grab the raw source code
var baseDir = path.join(__dirname, "../src/imp/platform/node");
var src = {
    types   : fs.readFileSync(path.join(baseDir, "thrift_api/crouton_types.js"), "utf8"),
};

fs.writeFileSync(path.join(baseDir, "/generated/crouton_types.js"), [
    "// Declare crouton_thrift to make the source ES6 compliant",
    "var crouton_thrift = {};",
    src.types,
].join("\n"));
