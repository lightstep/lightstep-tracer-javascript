// Underscore.js-like wrapper to iterate object key-values. Note that even for completely
// internal objects, packages may modify default Object prototypes and properties
// (e.g. Ember.js) so it's almost never safe to assume a particular object can
// iterated with for-in.
export default function _each(obj, cb) {
    if (!obj) {
        return;
    }
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            cb(obj[key], key);
        }
    }
}
