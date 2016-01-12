import { sprintf } from 'sprintf-js';

export class UserException extends Error {
    constructor(fmt, ...args) {
        super(sprintf(fmt, ...args));
    }
}
export class InternalException extends Error {
    constructor(fmt, ...args) {
        super(sprintf(fmt, ...args));
    }
}

export class NotImplementedException extends Error {
    constructor(fmt, ...args) {
        super(sprintf(fmt, ...args));
    }
}
