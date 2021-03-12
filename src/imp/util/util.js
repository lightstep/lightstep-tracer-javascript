const converter = require('hex2dec');

class Util {
    // Similar to a regular setTimeout() call, but dereferences the timer so the
    // program execution will not be held up by this timer.
    detachedTimeout(callback, delay) {
        let timer = setTimeout(callback, delay);
        if (timer.unref) {
            timer.unref();
        }
        return timer;
    }

    shouldSendMetaSpan(opts, tags) {
        let shouldSendSpan = opts.meta_event_reporting === true && tags['lightstep.meta_event'] !== true;
        return shouldSendSpan;
    }

    // Use native BigInt if available. Native BigInt has a significant
    // performance improvement over hex2dec
    hexToDec(hexString) {
        if (typeof global.BigInt !== 'function') {
            return converter.hexToDec(hexString);
        }

        // eslint-ignore-line
        return global.BigInt(`0x${hexString}`).toString(10);
    }
}

export default new Util();
