// Underscore.js-like wrapper to iterate object key-values. Note that even for completely
// internal objects, packages may modify default Object prototypes and properties
// (e.g. Ember.js) so it's almost never safe to assume a particular object can
// iterated with for-in.
// TODO: remove this function and replace with Object.keys, Object.values, ... (spread) or other.
export default function _each(obj, cb) {
    if (!obj) {
        return;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            cb(obj[key], key);
        }
    }
}
