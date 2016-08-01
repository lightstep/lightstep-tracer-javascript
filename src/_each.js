// Underscore.js-like wrapper to iterate for keys. Note that even for completely
// internal objects, packages may modify default Object prototypes and properties
// (e.g. Ember.js) so it's almost never safe to assume a particular object can
// iterated with for-in.
export default function _each(obj, cb) {
    if (!obj) {
        return;
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cb(obj[key], key);
        }
    }
}
