import * as Constants from './constants';
import Tracer from './imp/tracer_imp';
import { Platform } from './platform_abstraction_layer';
import _each from './_each';

var library = {
    Tracer : Tracer,
}

Platform.initLibrary(library);
module.exports = library;
