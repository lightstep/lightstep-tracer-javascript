const fs = require('fs');
const path = require('path');
const appRoot = process.cwd()
const packageJsonUrl = path.resolve(`${appRoot}/package.json`)
const text = fs.readFileSync(packageJsonUrl, "utf8");
const newVersion = process.argv[2];
if (newVersion) {
  const version = `"version": "${newVersion.replace('v', '')}"`;
  const content = text.replace(/\"version\": \"[0-9]+\.[0-9]+\.[0-9]+-no-protobuf\"/, version);
  fs.writeFileSync(packageJsonUrl, content);
  process.exit(0);
  return;
}
process.exit(1);