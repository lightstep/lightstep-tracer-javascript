class PackageGlobals {
    constructor() {
        this.options = {};
    }

    setOptions(opts) {
        for (let key in opts) {
            this.options[key] = opts[key];
        }
    }
}

module.exports = new PackageGlobals();
