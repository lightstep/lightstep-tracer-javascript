let combined = require('./generated/crouton_types.js');
let service =  require('./generated/ReportingService.js');
for (let key in service.crouton_thrift) {
    combined[key] = service.crouton_thrift[key];
}
module.exports = combined;
