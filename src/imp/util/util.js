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
        return opts.meta_event_reporting === true && !tags['lightstep.meta_event'] === true;
    }
}

export default new Util();
