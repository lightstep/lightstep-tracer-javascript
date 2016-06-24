const os = require('os');

function computeStartMicros() {
    let startTimeMs = Date.now();
    let startHrTime = process.hrtime();
    let baseHrMicros = (startHrTime[0] * 1000000.0 + startHrTime[1] / 1000.0);

    let startTimeMicros = (startTimeMs * 1000.0) - baseHrMicros;
    return startTimeMicros;
}

let startTimeMicros = computeStartMicros();

// Local storage for Node is just memory
let gLocalStorage = {};

export default class PlatformNode {

    constructor(imp) {
        this._mustMatchVersion();
    }

    // An explicit runtime version check. The package.json cannot enforce the
    // runtime version requirement in all circumstances.  See:
    // http://www.marcusoft.net/2015/03/packagejson-and-engines-and-enginestrict.html
    //
    // Note: consider using the semver package if the logic in this function
    // gets any more complex.
    _mustMatchVersion() {
        let actualMatch = /^v(\d+)\.(\d+)\.(\d+)$/.exec(process.version);
        if (!actualMatch || actualMatch.length !== 4) {
            // The version string did not match the expected pattern;
            // optimistically assume this is fine.
            return;
        }

        let packageObject = require('../../../../package.json');
        let requiredVersionString = packageObject.engines.node;
        let requiredMatch = /^>=(\d+)\.(\d+)\.(\d+)$/.exec(requiredVersionString);
        if (!requiredMatch || requiredMatch.length !== 4) {
            throw new Error('Internal error: package.json node requirement malformed');
        }

        let err = `Fatal Error: insufficient node version. Requires node ${requiredVersionString}`;
        try {
            let actual = [
                parseInt(actualMatch[0], 10),
                parseInt(actualMatch[1], 10),
                parseInt(actualMatch[2], 10),
            ];
            let required = [
                parseInt(requiredMatch[0], 10),
                parseInt(requiredMatch[1], 10),
                parseInt(requiredMatch[2], 10),
            ];
            if (actual[0] > required[0]) {
                return;
            } else if (actual[0] < required[0]) {
                this.fatal(err);
            } else if (actual[1] > required[1]) {
                return;
            } else if (actual[1] < required[1]) {
                this.fatal(err);
            } else if (actual[2] < required[2]) {
                this.fatal(err);
            }
        } catch (e) {
            // Optimistically ignore the unexpected version format and keep
            // going.
        }
    }

    name() {
        return 'node';
    }

    static initLibrary(lib) {

    }

    nowMicros() {
        let hrTime = process.hrtime();
        return Math.floor(startTimeMicros + hrTime[0] * 1000000.0 + hrTime[1] / 1000.0);
    }

    runtimeGUID(groupName) {
        return this.generateUUID();
    }

    generateUUID() {
        return require('crypto').randomBytes(8).toString('hex');
    }

    onBeforeExit(...args) {
        process.on('beforeExit', ...args);
    }

    plugins() {
        return [];
    }

    options() {
        if (!(process && process.argv)) {
            return;
        }
        let opts = {};
        for (let key in process.argv) {
            const value = process.argv[key];

            // Keep the argument "parsing" simple.  These are primarily debug
            // options regardless.
            switch (value.toLowerCase()) {
            case '--lightstep-log_to_console':
            case '--lightstep-log_to_console=true':
            case '--lightstep-log_to_console=1':
                opts.log_to_console = true;
                break;
            case '--lightstep-verbosity=5':
                opts.verbosity = 5;
                break;
            case '--lightstep-verbosity=4':
                opts.verbosity = 4;
                break;
            case '--lightstep-verbosity=3':
                opts.verbosity = 3;
                break;
            case '--lightstep-verbosity=2':
                opts.verbosity = 2;
                break;
            case '--lightstep-verbosity=1':
                opts.verbosity = 1;
                break;
            default:
                // Ignore
                break;
            }
        }
        return opts;
    }

    tracerTags() {
        let tags = {
            lightstep_tracer_platform : 'node',
            node_version              : process.version,
            node_platform             : process.platform,
            node_arch                 : process.arch,
            hostname                  : os.hostname(),
        };
        if (process.argv) {
            tags.command_line = process.argv.join(' ');
        }
        if (process.execArgv) {
            tags.node_arguments = process.execArgv.join(' ');
        }

        return tags;
    }

    fatal(message) {
        console.error(message);     // eslint-disable-line no-console
        process.exit(1);
    }

    localStoreGet(key) {
        return gLocalStorage[key];
    }

    localStoreSet(key, value) {
        gLocalStorage[key] = value;
    }
}
