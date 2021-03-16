// Underscore.js-like wrapper to left pad a string to a certain length with a character
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
