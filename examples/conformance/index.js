'use strict';

var lightstep = require('../..');
var opentracing = require('opentracing');
var readline = require('readline');

var tracer = new lightstep.Tracer({
    component_name : 'lightstep-tracer/examples/conformance',
    disable_reporting_loop: true
});

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  /*
var output = {'textMap': undefined}
var headers = {};
var span = tracer.startSpan('test');
span.finish();
var ctx = tracer.inject(span, opentracing.FORMAT_TEXT_MAP, headers);
output.textMap = headers;
console.error(output);
console.log(output);
*/



rl.on('line', function (line) {
  var input = JSON.parse(line)
  console.error(input.text_map)
  var ctx = tracer.extract(opentracing.FORMAT_TEXT_MAP, input.text_map);
  console.error(ctx)
  var headers = {}
  var outCtx = tracer._inject(ctx, opentracing.FORMAT_TEXT_MAP, headers)
  var output = JSON.stringify({'text_map': headers, 'binary':input.binary})
  console.error(output)
  console.log(output)
});
