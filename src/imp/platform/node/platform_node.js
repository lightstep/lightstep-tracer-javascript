const os = require('os');
const _each = require('../../../_each.js');

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
                // eslint-disable-next-line no-empty
            } else if (actual[0] < required[0]) {
                this.fatal(err);
            } else if (actual[1] > required[1]) {
                // eslint-disable-next-line no-empty
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

    /* eslint-disable no-empty */
    static initLibrary(lib) {}
    /* eslint-enable no-empty */

    nowMicros() {
        let hrTime = process.hrtime();
        return Math.floor(startTimeMicros + hrTime[0] * 1000000.0 + hrTime[1] / 1000.0);
    }

    runtimeGUID(groupName) {
        return this.generateUUID();
    }

    generateUUID() {
        /* eslint-disable no-bitwise */
        let p0 = `00000000${Math.abs((Math.random() * 0xFFFFFFFF) | 0).toString(16)}`.substr(-8);
        let p1 = `00000000${Math.abs((Math.random() * 0xFFFFFFFF) | 0).toString(16)}`.substr(-8);
        return `${p0}${p1}`;
        /* eslint-enable no-bitwise */
    }

    onBeforeExit(...args) {
        process.on('beforeExit', ...args);
    }

    plugins() {
        return [
            require('../../../plugins/instrument_nodejs'),
        ];
    }

    options() {
        if (!(process && process.argv)) {
            return;
        }
        let opts = {};
        _each(process.argv, (value, key) => {
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
        });
        return opts;
    }

    tracerTags() {
        let tags = {
            'lightstep.tracer_platform'         : 'node',
            'lightstep.tracer_platform_version' : process.version,
            'lightstep.node_platform'           : process.platform,
            'lightstep.node_arch'               : process.arch,
            'lightstep.hostname'                : os.hostname(),
        };
        if (process.argv) {
            tags['lightstep.command_line'] = process.argv.join(' ');
        }
        if (process.execArgv && process.execArgv.length > 0) {
            tags['lightstep.node_arguments'] = process.execArgv.join(' ');
        }

        return tags;
    }

    fatal(message) {
        console.error(message); // eslint-disable-line no-console
        process.exit(1);
    }

    localStoreGet(key) {
        return gLocalStorage[key];
    }

    localStoreSet(key, value) {
        gLocalStorage[key] = value;
    }
}
