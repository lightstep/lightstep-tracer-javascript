'use strict';

//
// Dependencies
//
var http        = require('http');
var https       = require('https');
var url         = require('url');
var opentracing = require('opentracing');

// During development, this will need to be
//
//   var lightstep   = require('../..');
var lightstep   = require('lightstep');

var PROXY_PORT = process.env.LIGHTSTEP_PROXY_PORT || 80;

var githubAuth = '';
if (process.env.GITHUB_CLIENT_ID) {
    githubAuth = '?client_id=' + process.env.GITHUB_CLIENT_ID +
        '&client_secret=' + process.env.GITHUB_CLIENT_SECRET;
}

var tracerMap = {};

var server = http.createServer(function (req, res) {

    // CORS options handling
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Accept',
        });
        res.end();
        return;
    }

    var accessToken = '{your_access_token}';
    var headers = {
        // User-Agent is required by the GitHub APIs
        'User-Agent': 'LightStep Example Proxy'
    };
    var requestHeaders = {};
    for (var i = 0; i + 1 < req.rawHeaders.length; i += 2) {
        var key = req.rawHeaders[i];
        var value = req.rawHeaders[i+1];
        requestHeaders[key] = value;
        if (key.toLowerCase() === 'lightstep-access-token') {
            accessToken = value;
        }
    }

    var tracer = tracerMap[accessToken];
    if (!tracer) {
        tracer = new lightstep.Tracer({
            access_token   : accessToken,
            component_name : 'lightstep-tracer/examples/node_proxy',
        });
        tracerMap[accessToken] = tracer;
    }

    // Create a span representing the https request
    // The span "carrier" data is presumed to have been transmitted interleaved
    // among the other HTTP headers.  join() is presumed to ignore unrecognized
    // keys in the map.

    var ctx = tracer.extract(opentracing.FORMAT_TEXT_MAP, requestHeaders);
    var span = tracer.startSpan('request_proxy', { childOf : ctx });
    var options = {
        host: 'api.github.com',
        path: req.url + githubAuth,
        headers: headers,
    };
    span.setTag('url', req.url);
    span.logEvent('Request headers', requestHeaders);
    span.log({
        event   : 'forwarding request to gitHub',
        url     : req.url,
        host    : options.host,
        path    : req.url,
        method  : req.method,
        headers : headers,
    });

    // Queue up the request in main Node event queue
    setTimeout(function() {
        var ghSpan = tracer.startSpan('github_request', { parent : span });
        ghSpan.log({
            url : req.url,
        });

        https.get(options, function(proxyResp) {
            if (proxyResp.statusCode >= 400) {
                ghSpan.setTag('error', true);
                ghSpan.log({
                    status_code : proxyResp.statusCode,
                });
            } else {
                ghSpan.log({
                    status_code : proxyResp.statusCode,
                });
            }
            ghSpan.logEvent('Response headers', proxyResp.headers);

            var bodyBuffer = '';
            proxyResp.on('data', function(chunk) {
                bodyBuffer += chunk;
            });
            proxyResp.on('end', function() {
                span.log({
                    body_length : bodyBuffer.length,
                    body        : bodyBuffer,
                });
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Accept',
                    'Content-Length' : bodyBuffer.length,
                });
                res.end(bodyBuffer);

                ghSpan.finish();
                span.finish();
            });
        });
    }, 12);
});
server.listen(PROXY_PORT, function() {
    console.log('Listening on port '+PROXY_PORT+'...');
});
