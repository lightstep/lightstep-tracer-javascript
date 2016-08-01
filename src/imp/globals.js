import _each from '../_each';

class PackageGlobals {
    constructor() {
        this.options = {};
    }

    setOptions(opts) {
        _each(opts, (val, key) => {
            this.options[key] = val;
        });
    }
}

module.exports = new PackageGlobals();
