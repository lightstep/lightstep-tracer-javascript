// Combine and patch the various Thrift files in the browser into a single file.

var fs      = require("fs"),
    path    = require("path");

// Grab the raw source code
var baseDir = path.join(__dirname, "../src/imp/platform/browser");
var src = {
    types   : fs.readFileSync(path.join(baseDir, "thrift_api/crouton_types.js"), "utf8"),
};

// Use constant propogation to remove code not needed from the Thrift libraries
src.types = src.types.replace(/(crouton_thrift\.[\w_]+\.prototype.(read|write)) = func/g, "$1 = false && func");

// Concatenate into one file and explicitly add exports (for package compatibility)
var outfile = path.join(baseDir, "/generated/thrift_all.js");
console.log("Writing " + outfile);
fs.writeFileSync(outfile, [
    "//",
    "// GENERATED FILE - DO NOT EDIT DIRECTLY",
    "//",
    "// See scripts/" + path.basename(__filename),
    "//",
    "//",
    "(function() {",
    // This next line is needed to keep crouton_types.js from injecting itself into
    // the global namespace.
    "var Thrift = {};",
    "var crouton_thrift = {};",
    src.types,
    "module.exports.crouton_thrift = crouton_thrift;",
    "module.exports.Thrift = {}",
    "})();"
].join("\n"));
