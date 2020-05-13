const packageJson = require('package-json');
const pJson = require('../package.json');

packageJson(pJson.name.toLowerCase()).then((result) => {
  if (result.version === pJson.version) {
    console.log('This version of package has been already released');
    process.exit(1);
  } else {
    console.log(pJson.version);
    process.exit(0);
  }
}).catch((error) => {
  process.exit(0);
});