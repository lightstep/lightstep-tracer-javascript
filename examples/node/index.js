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
// var LightStep = require('lightstep');
//
var https     = require('https');
var url       = require('url');
var Tracer    = require('opentracing');
var LightStep = require('../../dist/lightstep-tracer-node');

//
// The first argument to the script is the GitHub user name
//
var username = process.argv[2] || 'lightstep';

// Initialize the OpenTracing APIs to use the LightStep bindings
//
// NOTE: the access token will need to be replaced with your project's access
// token. The group_name can be an identifier you wish to use to identify the
// service or process.
//
Tracer.initGlobalTracer(LightStep.tracer({
    access_token   : '{your_access_token}',
    group_name     : 'lightstep-tracer/examples/node',
}));

printUserInfo(username);

//
// Worker functions
//

function printUserInfo(username) {

    // Start the outer operation span
    var span = Tracer.startSpan('printUserInfo');
    span.logEvent('query_started');

    queryUserInfo(span, username, function(err, user) {
        span.logEvent('query_finished', user);

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
        httpGet(span, 'https://api.github.com/rate_limit', function (err, json) {
            span.logEvent('rate_limit', {
                error : err,
                json  : json,
            })
            span.finish();
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
        if (err) {
            remainingCalls = 0;
            return callback(err, null);
        }
        remainingCalls--;
        if (remainingCalls === 0) {
            callback(null, user);
        }
    };

    // First query the user info for the given username
    httpGet(parentSpan, 'https://api.github.com/users/' + username, function (err, json) {
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
    var dest = url.parse(urlString);
    var options = {
        host : dest.hostname,
        path : dest.path,
        headers: {
            // User-Agent is required by the GitHub APIs
            'User-Agent': 'LightStep Example',
        }
    };

    // Create a span representing the https request
    var span = Tracer.startSpan('https.get', { parent : parentSpan });
    span.setTag('url', urlString);
    span.logEvent('options', options);

    return https.get(options, function(response) {
        var bodyBuffer = '';
        response.on('data', function(chunk) {
            bodyBuffer += chunk;
        });
        response.on('end', function() {
            span.logEvent('response_end', {
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
                span.logEvent('error', err);
            }

            // Finish the span representing the request
            span.finish();
            callback(err, parsedJSON);
        });
    });
}
