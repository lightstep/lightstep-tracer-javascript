'use strict';

//
// Dependencies
//
var http      = require('http');
var https     = require('https');
var url       = require('url');
var Tracer    = require('opentracing');
var LightStep = require('lightstep-tracer');

var githubAuth = '';
if (process.env.GITHUB_CLIENT_ID) {
    githubAuth = '?client_id=' + process.env.GITHUB_CLIENT_ID +
        'client_secret=' + process.env.GITHUB_CLIENT_SECRET;
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
    var traceGUID = null;
    var parentGUID = null;
    var headers = {
        // User-Agent is required by the GitHub APIs
        'User-Agent': 'LightStep Example Proxy'
    };
    for (var i = 0; i + 1 < req.rawHeaders.length; i += 2) {
        var key = req.rawHeaders[i];
        var value = req.rawHeaders[i+1];
        if (key == 'LightStep-Trace-GUID') {
            traceGUID = value;
        } else if (key == 'LightStep-Parent-GUID') {
            parentGUID = value;
        } else if (key == 'LightStep-Access-Token') {
            accessToken = value;
        }
    }

    var tracer = tracerMap[accessToken];
    if (!tracer) {
        tracer = Tracer.initNewTracer(LightStep.tracer({
            access_token   : accessToken,
            group_name     : 'lightstep-tracer/examples/node_proxy',
        }));
        tracerMap[accessToken] = tracer;
    }

    // Create a span representing the https request
    var span = tracer.startSpan('request_proxy');
    if (traceGUID) {
        span.imp().setFields({'trace_guid' : traceGUID });
    }
    if (parentGUID) {
        span.imp().setFields({'parent_guid' : parentGUID });
    }

    var options = {
        host: 'api.github.com',
        path: req.url + githubAuth,
        headers: headers,
    };
    span.setTag('url', req.url);

    // Queue up the request in main Node event queue
    setTimeout(function() {
        var ghSpan = tracer.startSpan('github_request', { parent : span });
        https.get(options, function(proxyResp) {
            var bodyBuffer = '';
            proxyResp.on('data', function(chunk) {
                bodyBuffer += chunk;
            });
            proxyResp.on('end', function() {
                span.logEvent('response_end', {
                    body   : bodyBuffer,
                    length : bodyBuffer.length,
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
    }, 0);
});
server.listen(8080, function() {
    console.log('Listening on port 8080...');
});
