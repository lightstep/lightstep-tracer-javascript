
import Runtime from './runtime';
const constants = require('./constants');
require('babel-polyfill');

import openTracingAdapter from './opentracing-adapter';

/**
    For convenience, the library can be used directly as a singleton or Runtime
    objects can be explicitly created.
 */
class Lib extends Runtime {

    constructor() {
        super();
        this.constants = constants;
    }

    createRuntime() {
        let runtime = new Runtime();
        runtime.initialize(...arguments);
        return runtime;
    }
    
    createTracer() {
        return this.createRuntime();
    }

    /**
     * Temporary adapter layer to add compatibility with OpenTracing. OpenTracing
     * is intended to the be eventual, native interface, at which point there
     * will be no adapter layer.
     */
    openTracingAdapter() {
        return openTracingAdapter;
    }
}

// For ES5 compatibility, use `module.exports` instead of `export default` on
// the outermost package export.
module.exports = new Lib();
