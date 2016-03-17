import globals from './imp/globals';
import * as Constants from './constants';
import TracerImp from './imp/tracer_imp';
import { Platform } from './platform_abstraction_layer';

class Library {

    constructor() {
        this._singleton = null;

        // Make the constants accessible off the LightStep object
        for (let key in Constants) {
            this[key] = this[key] || Constants[key];
        }
    }

    /**
     * Creates a new OpenTracing-compatible tracer implementation object.
     */
    tracer(opts) {
        let tracerImp = new TracerImp(opts);
        if (!this._singleton) {
            globals.setOptions(opts);
            this._singleton = tracerImp;
        }
        return tracerImp;
    }
}

let library = new Library();
Platform.initLibrary(library);
module.exports = library;
