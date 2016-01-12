/**
 * This file adapts the api-javascript package to function as an OpenTracing API
 * backend. The eventual goal is for this package to exist *solely* as an
 * OpenTracing API backend, therefore this is merely a transitional component.
 * The intermediate adapter layer can be removed once all client code is moved
 * to the OpenTracing APIs.
 */

'use strict';

import RuntimeImp from './imp/runtime_imp';
import * as Constants from './constants';

class Backend {
    newTracer() {
        return new TracerAdapter();
    }
};

class TracerAdapter {
    constructor() {
        this._imp = new RuntimeImp();

        this._imp.addOption('backend', { defaultValue : null, type : 'any' });

        // Built-in plugins
        this._imp.addPlugin(this, require('./plugins/log_to_console'));

        // Initialize the platform options after the built-in plugins in
        // case any of those options affect the built-ins.
        this._imp.addPlatformPlugins(this);
        this._imp.setPlatformOptions();
    }

    uuid() {
        return this._imp.guid(...arguments);
    }
    on() {
        return this._imp.on(...arguments);
    }
    once() {
        return this._imp.once(...arguments);
    }
    removeListener() {
        return this._imp.removeListener(...arguments);
    }
    initialize() {
        return this._imp.initialize(...arguments);
    }
    options() {
        return this._imp.options(...arguments);
    }

    newSpan() {
        return new SpanAdapter(this._imp.span(...arguments));
    }
    flush() {
        return this._imp.flush(...arguments);
    }

    // ---------------------------------------------------------------------- //
    // Extensions
    // ---------------------------------------------------------------------- //
    //
    addPlugin(plugin) {
        return this._imp.addPlugin(plugin);
    }
    addOption(name, desc) {
        return this._imp.addOption(name, desc);
    }
}

class SpanAdapter {
    constructor(imp) {
        this._imp = imp;
    }

    uuid() {
        return this._imp.uuid(...arguments);
    }

    getOperation() {
        return this._imp.operation();
    }
    setOperation(name) {
        return this._imp.operation(name);
    }

    getTags() {
        return this._imp.tags();
    }
    setTags(keyValues) {
        return this._imp.tags(keyValues);
    }

    setParentUUID(uuid) {
        this._imp.tags({ 'parent_span_guid' : uuid });
    }

    newChildSpan(parentSpan) {
        return this._imp.emptySpan();
    }

    log() {
        return this._imp.log(...arguments);
    }

    end() {
        return this._imp.end(...arguments);
    }
}

module.exports = new Backend();
