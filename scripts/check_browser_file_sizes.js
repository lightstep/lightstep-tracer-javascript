/**
 * Development script to should relative file sizes.
 *
 * NOTE: these are pre-minification sizes.
 */
'use strict';

const fs = require('fs');
const _ = require('underscore');
const sprintf = require('sprintf-js').sprintf;

let webpack = `node_modules/webpack/bin/webpack.js`;
let cmd = `BUILD_PLATFORM=browser BUILD_CONFIG=prod ${webpack}`;
let jsonString = require('child_process').execSync(cmd).toString('utf8');

let json = JSON.parse(jsonString);
let chunk = json.chunks[0];
let modules = _.sortBy(chunk.modules, 'size').reverse();

let total = 0;
_.each(modules, (val) => {
    total += val.size;
});

console.log(sprintf('Source contributions before minification: %d bytes total', total));
_.each(modules, (val) => {

    console.log(sprintf('  %4.1f%% %6d bytes   %s', (100 * val.size/total), val.size, val.name));
});

cmd = `BUILD_PLATFORM=browser BUILD_CONFIG=prod ${webpack}`;
require('child_process').execSync(cmd);
console.log('\nMinified size: ' + fs.statSync('dist/lightstep-tracer.min.js').size);
