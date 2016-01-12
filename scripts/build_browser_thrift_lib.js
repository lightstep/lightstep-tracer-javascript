// Combine and patch the various Thrift files in the browser into a single file.

var fs      = require("fs"),
    path    = require("path");

// Grab the raw source code
var baseDir = path.join(__dirname, "../src/imp/platform/browser");
var src = {
    types   : fs.readFileSync(path.join(baseDir, "thrift_api/crouton_types.js"), "utf8"),
    service : fs.readFileSync(path.join(baseDir, "thrift_api/ReportingService.js"), "utf8"),
    thrift  : fs.readFileSync(path.join(baseDir, "thrift/thrift.js"), "utf8"),
    patch   : fs.readFileSync(path.join(baseDir, "thrift_patch.js"), "utf8"),
};

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
    "var crouton_thrift = {};",
    src.types,
    src.service,
    src.thrift,
    src.patch,
    "module.exports.crouton_thrift = crouton_thrift;",
    "module.exports.Thrift = Thrift;",
    "})();"
].join("\n"));
