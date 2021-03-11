// Underscore.js-like wrapper to iterate object key-values. Note that even for completely
// internal objects, packages may modify default Object prototypes and properties
// (e.g. Ember.js) so it's almost never safe to assume a particular object can
// iterated with for-in.
export default function _leftpad(str, len, ch) {
    str = String(str);
    let i = -1;
    if (!ch && ch !== 0) ch = ' ';
    len -= str.length;
    while (++i < len) {
        str = ch + str;
    }
    return str;
}
