'use strict';

//
// Dependencies
//
var http      = require('http');
var https     = require('https');
var url       = require('url');
var Tracer    = require('opentracing');
var LightStep = require('../../dist/lightstep-tracer-node');

// Initialize the OpenTracing APIs to use the LightStep bindings
//
// NOTE: the access token will need to be replaced with your project's access
// token. The group_name can be an identifier you wish to use to identify the
// service or process.
//
Tracer.initGlobalTracer(LightStep.tracer({
    access_token   : '{your_access_token}',
    group_name     : 'lightstep-tracer/examples/node_proxy',
}));

var githubAuth = '';
if (process.env.GITHUB_CLIENT_ID) {
    githubAuth = '?client_id=' + process.env.GITHUB_CLIENT_ID +
        'client_secret=' + process.env.GITHUB_CLIENT_SECRET;
}

var server = http.createServer(function (req, res) {
    // Create a span representing the https request
    var span = Tracer.startSpan('request_proxy');

    var headers = {};
    var traceGUID = null;
    for (var i = 0; i + 1 < req.rawHeaders.length; i += 2) {
        var key = req.rawHeaders[i];
        var value = req.rawHeaders[i+1];
        headers[key] = value;

        if (key == 'LightStep-Trace-GUID') {
            span.imp().setFields({'trace_guid' : value });
        } else if (key == 'LightStep-Parent-GUID') {
            span.imp().setFields({'parent_guid' : value });
        }
    }
    // User-Agent is required by the GitHub APIs
    headers['User-Agent'] = 'LightStep Example Proxy';
    delete headers['Host'];

    var options = {
        host: 'api.github.com',
        path: req.url + githubAuth,
        headers: headers,
    };

    span.setTag('url', req.url);

    return https.get(options, function(proxyResp) {
        var bodyBuffer = '';
        proxyResp.on('data', function(chunk) {
            bodyBuffer += chunk;
        });
        proxyResp.on('end', function() {
            span.logEvent('response_end', {
                body   : bodyBuffer,
                length : bodyBuffer.length,
            });
            console.log(bodyBuffer.toString('utf8'));
            res.writeHead(200, {
                'Content-Length' : bodyBuffer.length,
            });
            res.end(bodyBuffer);

            span.finish();
        });
    });
});
server.listen(8080, function() {
    console.log('Listening on port 8080...');
});
