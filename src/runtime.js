
import RuntimeImp from './imp/runtime_imp';
import * as Constants from './constants';

export default class Runtime {

    constructor() {
        this._imp = new RuntimeImp();

        // Built-in plugins
        this._imp.addPlugin(this, require('./plugins/log_to_console'));

        // Initialize the platform options after the built-in plugins in
        // case any of those options affect the built-ins.
        this._imp.addPlatformPlugins(this);
        this._imp.setPlatformOptions();
    }

    guid() {
        return this._imp.guid();
    }

    initialize(opts) {
        return this._imp.initialize(opts);
    }

    options() {
        return this._imp.options(...arguments);
    }

    span(operation) {
        return this._imp.span(operation);
    }

    info(message, payload) {

    }
    warn(message, payload) {

    }
    error(message, payload) {

    }
    fatal(message, payload) {

    }

    infof(fmt, ...args) {
        return this._imp.logFmt(Constants.LOG_INFO, null, fmt, ...args);
    }
    warnf(fmt, ...args) {
        return this._imp.logFmt(Constants.LOG_WARN, null, fmt, ...args);
    }
    errorf(fmt, ...args) {
        return this._imp.logFmt(Constants.LOG_ERROR, null, fmt, ...args);
    }
    fatalf(fmt, ...args) {
        return this._imp.logFmt(Constants.LOG_FATAL, null, fmt, ...args);
    }

    flush(doneCallback) {
        return this._imp.flush(doneCallback);
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

    addPlugin(plugin) {
        return this._imp.addPlugin(plugin);
    }
    addOption(name, desc) {
        return this._imp.addOption(name, desc);
    }
}
