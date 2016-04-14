# LightStep JavaScript Tracing Cookbook

Creating a useful trace in LightStep takes only a few minutes. Once a single trace has been created in your system, the same logic can be applied to create more complex traces that will give you new insight into the operation of your production code.

The cookbook recipes here assume you've already successfully installed the OpenTracing and LightStep NPM packages.  If not, check out the [README](../README.md).

* Creating spans
    * [Spans in Promise-based code](#promises)
    * [Spans in callback-based code](#callbacks)
    * [Spans in code using "context" objects](#context-objects)
* Joining spans into traces
    * [Child spans in the same process](#parent-spans)
    * [Joining spans in different processes / services by tag](#join-by-tag)
    * [Joining spans in different processes / services by injection](#join-by-inject)

*Something missing from the Cookbook? Log a GitHub issue and we'll get on it :)*


<a name='promises'></a>
## Instrumenting Promise-based code

Instrumenting code using [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) objects is easy.

1. Before initiating the request that request that returns the `Promise` create a span
2. Be sure to assign your span a good name to help highlight what the code is doing
2. In handling the Promise completion, be sure to always `finish()` the span

(Note: if you're using a custom promise library or wrapper, it's easy to make spans part of the promise implementation itself.)

```javascript
// Let's assume you have an application-specific object representing a request
// to a remote system (a database, an external API, etc.)
let req = ...;

// Before initiating the request, start a span: the name (here 'remote_request')
// will show up in the LightStep UI, so the more specific you can be, the
// better.  Setting a tag prefixed with "join:" will allow spans to be connected
// by LightStep across different services and systems (spans with the same
// key-value pairs are made part of the same trace).
let span = Tracer.startSpan('remote_request');
span.setTag('join:request_id', req.id);

// Initiate your normal request
yourApp.makeRemoteRequest(req)
    .then((response) => {
        // Log information that'll be useful when looking at this trace.
        // This particular span might be part of a larger anomalous trace
        // so logging details is useful even on 'local' success.
        span.logEvent('remote request ok', {
            response_size : response.contentLength,
            handler_id    : response.handlerID,            
        });

        yourApp.doNormalWork(response);  // etc.
    })
    .catch((err) => {
        // The 'error' tag is a special tag letting LightStep know an error
        // occurred during this span        
        span.setTag('error', 'true');
        span.logEvent('remote request failed', {
            error   : err,
            request : req,
        });

        yourApp.doNormalErrorHandling(err); // etc.
    })
    .then(() => {
        // Always finish the span: both in the case of success or an error.
        span.finish();
    });
```

<a name='promises'></a>
## Instrumenting callback-based code

Instrumenting code using asynchronous callbacks is simple:

1. Create the span before initiating the asynchronous operation
2. During the callback, whether an error has occurred or not, be sure to call `span.finish()` to denote the operation is done

```javascript
// Let's assume you have an application-specific object representing a request
// to a remote system (a database, an external API, etc.)
let req = ...;

// Before initiating the request, start a span: the name (here 'remote_request')
// will show up in the LightStep UI, so the more specific you can be, the
// better.  Setting a tag prefixed with "join:" will allow spans to be connected
// by LightStep across different services and systems (spans with the same
// key-value pairs are made part of the same trace).
let span = Tracer.startSpan('remote_request');
span.setTag('join:request_id', req.id);

// Initiate your normal request
yourApp.makeRemoteRequest(req, function (err, response) {
    if (err) {
        // The 'error' tag is a special tag letting LightStep know an error
        // occurred during this span
        span.setTag('error', 'true');
        span.logEvent('remote request failed', {
            error   : err,
            request : req,
        });

        yourApp.doNormalErrorHandling(err); // etc.
    } else {
        // Log information that'll be useful when looking at this trace.
        // This particular span might be part of a larger anomalous trace
        // so logging details is useful even on 'local' success.
        span.logEvent('remote request ok', {
            response_size : response.contentLength,
            handler_id    : response.handlerID,            
        });

        yourApp.doNormalWork(response);  // etc.
    }
    // Always finish the span: both in the case of success or an error.
    span.finish();
});
```

<a name='context-objects'></a>
## Instrumenting 'context object'-based code

Some applications already have a "context" object that is passed around as part of complex operations. In such systems, simple object composition provide good instrumentation data.  

Depending on your programming conventions, this object might also be called a `Transaction` object.


```javascript
function Context() {
    this._yourNormalField1 = ...;
    this._yourNormalField2 = ...;

    // Add a span object that will start and finish along with the Context
    // object
    this._span = ...;
}

Context.prototype.begin = function(appDomain, name, transactionID) {
    this._span = Tracer.startSpan(appDomain + '/' + name);
    this._span.setTag('join:transaction_id', transactionID);

    //
    // <Normal implementation code here>
    //
};

Context.prototype.end = function() {
    //
    // <Normal implementation code here>
    //

    this._span.finish();
}
```


<a name="parent-spans"></a>
## Child spans in the same process

In a single process, creating parent-child relationships between spans is trivial:

1. Be sure to pass the parent span object into the code creating the child
2. Call `startSpan()` with the additional `parent` option

```javascript

function startSubOperation(parentSpan, param1, param2, param3) {

    let childSpan = Tracer.startSpan('my_child', { parent : parentSpan });

    //
    // Do normal work here...
    //

    childSpan.finish();
}

```

<a name="join-by-tag"></a>
## Joining spans in different processes / services by tag

Joining spans from different processes or services by tag in LightStep is easy. LightStep recognizes a special `"join:"` prefix on tag keys. Any spans with the same value for a given "join key" and overlapping in time will automatically be considered part of the same trace.

This is usually a very easy way to create cross-service traces in a system that is already maintaining a request ID or transaction ID.

*Note: the "join:" prefix is a LightStep-specific feature and is not part of the OpenTracing specification.*

```javascript

// in parent_process.js
function startParallelWorkers() {

    let transactionId = generateNewTransactionID();

    let span = Tracer.startSpan('large_operation');
    span.setTag('join:transaction_id', transactionId);

    // Launch a bunch of parallel child processes
    async.parallel(jobArray, function(job, next) {
        // Ensure the transaction ID is sent to the child
        job.transactionId = transactionId;
        let child = child_process.fork('./child_process.js', job);
        child.on('message', function (msg) {
            span.log('Received message', msg);
            next();
        });
    }, function() {
        span.finish();
    });
}

// in child_process.js
function doWork(job) {
    let span = Tracer.startSpan('worker_operation');
    span.setTag('join:transaction_id', job.transactionId);

    asyncWork(function(result) {
        span.logEvent('Worker finished', result);
        span.finish();
    });
}

```

<a name="join-by-inject)"></a>
## Joining spans in different processes / services by injection

Joining spans from different processes or services using the OpenTracing `inject` and `join` methods is an alternative to using tags. While the tag approach is more concise, injection allows parent-child relationships to be conveyed unambiguously across processes and services without relying on timing information.

The injection approach also has the advantage of being part of all OpenTracing compliant implementations. A disadvantage is that this approach requires all "links in the chain" of operations to be instrumented for a trace to be constructed between services (join tags, on the other hand, can be used to join between service A and service C without knowledge of an intermediary service B).

```javascript

// in parent_process.js
function startParallelWorkers() {

    let transactionId = generateNewTransactionID();

    let span = Tracer.startSpan('large_operation');

    var carrier = {};
    Tracer.inject(span, Tracer.FORMAT_TEXT_MAP, carrier);

    // Launch a bunch of parallel child processes
    async.parallel(jobArray, function(job, next) {
        // Ensure the 'carrier' information is transmitted to the child
        job.spanCarrier = carrier;
        let child = child_process.fork('./child_process.js', job);
        child.on('message', function (msg) {
            span.log('Received message', msg);
            next();
        });
    }, function() {
        span.finish();
    });
}

// in child_process.js
function doWork(job) {
    let span = Tracer.join('worker_operation', Tracer.FORMAT_TEXT_MAP, job.spanCarrier);

    asyncWork(function(result) {
        span.logEvent('Worker finished', result);
        span.finish();
    });
}

```
