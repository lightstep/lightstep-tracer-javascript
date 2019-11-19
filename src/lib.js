import Tracer from './imp/tracer_imp';
import LightStepPropagator from './imp/propagator_ls';
import B3Propagator from './imp/propagator_b3';
import DDPropagator from './imp/propagator_dd';
import { Platform } from './platform_abstraction_layer';

const library = {
    Tracer              : Tracer,
    LightStepPropagator : LightStepPropagator,
    B3Propagator        : B3Propagator,
    DDPropagator        : DDPropagator,
};

Platform.initLibrary(library);
module.exports = library;
