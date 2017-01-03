import globals from './imp/globals';
import * as Constants from './constants';
import TracerImp from './imp/tracer_imp';
import { Platform } from './platform_abstraction_layer';
import _each from './_each';

class Library {

    constructor() {
        this._singleton = null;

        // Make the constants accessible off the LightStep object
        _each(Constants, (val, key) => {
            this[key] = val;
        });
    }

    /**
     * Creates a new OpenTracing-compatible Tracer implementation object.
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
