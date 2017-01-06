import Tracer from './imp/tracer_imp';
import { Platform } from './platform_abstraction_layer';

var library = {
    Tracer : Tracer,
};

Platform.initLibrary(library);
module.exports = library;
