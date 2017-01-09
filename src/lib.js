import Tracer from './imp/tracer_imp';
import { Platform } from './platform_abstraction_layer';

const library = {
    Tracer : Tracer,
};

Platform.initLibrary(library);
module.exports = library;
