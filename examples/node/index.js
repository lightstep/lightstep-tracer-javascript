//
// node index.js [username]
//
// Makes a series of GitHub API calls to return information about the user.
// Creates a trace with spans for the overall query as well as the individual
// API requests.
//
'use strict';

//
// Dependencies
//
// Note: the LightStep package is included directly. Normally this require()
// would simply be:
//
//   var lightstep = require('lightstep');
//
var lightstep   = require('../..');

var http        = require('http');
var url         = require('url');
var opentracing = require('opentracing');

// Proxy the requests through a LightStep server
var PROXY_HOST = process.env.LIGHTSTEP_PROXY_HOST || 'example-proxy.lightstep.com';
var PROXY_PORT = process.env.LIGHTSTEP_PROXY_PORT || 80;

//
// The first argument to the script is the GitHub user name
//
var username = process.argv[2] || 'lightstep';

// Initialize the OpenTracing APIs to use the LightStep bindings
//
// NOTE: the access token will need to be replaced with your project's access
// token. The component_name can be an identifier you wish to use to identify the
// service or process.
//
opentracing.initGlobalTracer(new lightstep.Tracer({
    access_token   : '{your_access_token}',
    component_name : 'lightstep-tracer/examples/node',
}));

// Do the work.
printUserInfo(username);

//
// Worker functions
//
function printUserInfo(username) {

    // Start the outer operation span
    var span = opentracing.globalTracer().startSpan('printUserInfo');
    span.log({ event : 'query_started' });

    queryUserInfo(span, username, function(err, user) {
        if (err) {
            span.setTag('error', true);
            span.log({
                event : 'error',
                'error.object' : err,
            });
            span.finish();
            return;
        }
        span.log({
            event : 'query_finished',
            user  : user,
        });

        console.log('User: ' + user.login);
        console.log('Type: ' + user.type);
        console.log('Public repositories: ' + user.repoNames.length);
        for (var i = 0; i < user.repoNames.length; i++) {
            console.log('  ' + user.repoNames[i]);
        }
        console.log('Recent events: ' + user.recentEvents);
        for (var key in user.eventCounts) {
            console.log('  ' + key + ': ' + user.eventCounts[key]);
        }

        // Lastly, log the remaining rate limit data to see how many more times
        // the public GitHub APIs can be queried!
        httpGet(span, 'http://api.github.com/rate_limit', function (err, json) {
            if (err) {
                span.setTag('error', true);
                span.log({
                    event : 'error',
                    'error.object' : err,
                });
            }
            span.log({
                event : 'rate_limit',
                json  : json,
            });
            span.finish();

            // Generate a LightStep-specific URL
            var url = span.generateTraceURL();
            console.log('');
            console.log('View the trace at: ' + url);
        });
    });
}

/**
 * Make a series GitHub calls and aggregate the data into the `user` object
 * defined below.
 */
function queryUserInfo(parentSpan, username, callback) {
    // Aggregated user information across multiple API calls
    var user = {
        login        : null,
        type         : null,
        repoNames    : [],
        recentEvents : 0,
        eventCounts  : {},
    };

    // Call the callback only when all three API requests finish or on the
    // first error.
    var remainingCalls = 3;
    var next = function (err) {
        // Early terminate on any error
        remainingCalls -= err ? Math.max(remainingCalls, 1) : 1;
        if (remainingCalls === 0) {
            callback(err, err ? null : user);
        }
    };

    // First query the user info for the given username
    httpGet(parentSpan, 'http://api.github.com/users/' + username, function (err, json) {
        if (err) {
            return next(err);
        }
        user.login = json.login;
        user.type  = json.type;

        // Use the user info to query names of all the user's public repositories
        httpGet(parentSpan, json.repos_url, function (err, json) {
            if (err) {
                return next(err);
            }
            for (var i = 0; i < json.length; i++) {
                user.repoNames.push(json[i].name);
            }
            next(null);
        });

        // In parallel, query the recent events activity for the user
        httpGet(parentSpan, json.received_events_url, function (err, json) {
            if (err) {
                return next(err);
            }
            user.recentEvents = json.length;
            for (var i = 0; i < json.length; i++) {
                var eventType = json[i].type;
                user.eventCounts[eventType] = user.eventCounts[eventType] || 0;
                user.eventCounts[eventType]++;
            }
            next(null);
        });

        next(null);
    });
}

/**
 * Helper function to make a GET request and return parsed JSON data.
 */
function httpGet(parentSpan, urlString, callback) {
    var span = opentracing.globalTracer().startSpan('http.get', { childOf : parentSpan });
    var callbackWrapper = function (err, data) {
        span.finish();
        callback(err, data);
    };

    try {
        var carrier = {};
        opentracing.globalTracer().inject(span, opentracing.FORMAT_TEXT_MAP, carrier);

        var dest = url.parse(urlString);
        var options = {
            host : PROXY_HOST,
            path : dest.path,
            port : PROXY_PORT,
            headers: {
                // User-Agent is required by the GitHub APIs
                'User-Agent': 'LightStep Example',
            }
        };
        for (var key in carrier) {
            options.headers[key] = carrier[key];
        }

        // Create a span representing the https request
        span.setTag('url', urlString);
        span.log({
            event : 'options',
            'options': options,
        });
        return http.get(options, function(response) {
            var bodyBuffer = '';
            response.on('data', function(chunk) {
                bodyBuffer += chunk;
            });
            response.on('end', function() {
                span.log({
                    body   : bodyBuffer,
                    length : bodyBuffer.length,
                });

                var parsedJSON, err;
                try {
                    parsedJSON = JSON.parse(bodyBuffer);
                } catch (exception) {
                    err = {
                        buffer    : bodyBuffer,
                        exception : exception,
                    };
                    span.setTag('error', true);
                    span.log({
                        event : 'error',
                        'error.object': err,
                    });
                }

                callbackWrapper(err, parsedJSON);
            });
        });
    } catch (exception) {
        span.setTag('error', true);
        span.log({
            event : 'error',
            'error.object': exception,
        });
        callbackWrapper(exception, null);
    }
}
