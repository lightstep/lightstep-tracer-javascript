(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["lightstep"] = factory();
	else
		root["lightstep"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lib.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
// We store our EE objects in a plain object whose properties are event names.
// If `Object.create(null)` is not supported we prefix the event names with a
// `~` to make sure that the built-in object properties are not overridden or
// used as an attack vector.
// We also assume that `Object.create(null)` is available when the event name
// is an ES6 Symbol.
//
var prefix = typeof Object.create !== 'function' ? '~' : false;

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @param {Boolean} exists We only need to know if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events && this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events || !this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events) this._events = prefix ? {} : Object.create(null);
  if (!this._events[evt]) this._events[evt] = listener;
  else {
    if (!this._events[evt].fn) this._events[evt].push(listener);
    else this._events[evt] = [
      this._events[evt], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events) this._events = prefix ? {} : Object.create(null);
  if (!this._events[evt]) this._events[evt] = listener;
  else {
    if (!this._events[evt].fn) this._events[evt].push(listener);
    else this._events[evt] = [
      this._events[evt], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Mixed} context Only remove listeners matching this context.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events || !this._events[evt]) return this;

  var listeners = this._events[evt]
    , events = [];

  if (fn) {
    if (listeners.fn) {
      if (
           listeners.fn !== fn
        || (once && !listeners.once)
        || (context && listeners.context !== context)
      ) {
        events.push(listeners);
      }
    } else {
      for (var i = 0, length = listeners.length; i < length; i++) {
        if (
             listeners[i].fn !== fn
          || (once && !listeners[i].once)
          || (context && listeners[i].context !== context)
        ) {
          events.push(listeners[i]);
        }
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[evt] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[prefix ? prefix + event : event];
  else this._events = prefix ? {} : Object.create(null);

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/google-protobuf/google-protobuf.js":
/*!*********************************************************!*\
  !*** ./node_modules/google-protobuf/google-protobuf.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, Buffer) {var $jscomp={scope:{},getGlobal:function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global?global:a}};$jscomp.global=$jscomp.getGlobal(this);$jscomp.initSymbol=function(){$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol);$jscomp.initSymbol=function(){}};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return"jscomp_symbol_"+a+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();$jscomp.global.Symbol.iterator||($jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));$jscomp.initSymbolIterator=function(){}};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();$jscomp.initSymbol();$jscomp.initSymbolIterator();var b=a[Symbol.iterator];if(b)return b.call(a);var c=0;return{next:function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}}};
$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]};$jscomp.array=$jscomp.array||{};
$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};$jscomp.initSymbol();$jscomp.initSymbolIterator();d[Symbol.iterator]=function(){return d};return d};
$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};
$jscomp.array.from=function(a,b,c){$jscomp.initSymbolIterator();b=null!=b?b:function(a){return a};var d=[];$jscomp.initSymbol();$jscomp.initSymbolIterator();var e=a[Symbol.iterator];"function"==typeof e&&(a=e.call(a));if("function"==typeof a.next)for(;!(e=a.next()).done;)d.push(b.call(c,e.value));else for(var e=a.length,f=0;f<e;f++)d.push(b.call(c,a[f]));return d};$jscomp.array.of=function(a){return $jscomp.array.from(arguments)};
$jscomp.array.entries=function(){return $jscomp.iteratorFromArray(this,function(a,b){return[a,b]})};$jscomp.array.installHelper_=function(a,b){!Array.prototype[a]&&Object.defineProperties&&Object.defineProperty&&Object.defineProperty(Array.prototype,a,{configurable:!0,enumerable:!1,writable:!0,value:b})};$jscomp.array.entries$install=function(){$jscomp.array.installHelper_("entries",$jscomp.array.entries)};$jscomp.array.keys=function(){return $jscomp.iteratorFromArray(this,function(a){return a})};
$jscomp.array.keys$install=function(){$jscomp.array.installHelper_("keys",$jscomp.array.keys)};$jscomp.array.values=function(){return $jscomp.iteratorFromArray(this,function(a,b){return b})};$jscomp.array.values$install=function(){$jscomp.array.installHelper_("values",$jscomp.array.values)};
$jscomp.array.copyWithin=function(a,b,c){var d=this.length;a=Number(a);b=Number(b);c=Number(null!=c?c:d);if(a<b)for(c=Math.min(c,d);b<c;)b in this?this[a++]=this[b++]:(delete this[a++],b++);else for(c=Math.min(c,d+b-a),a+=c-b;c>b;)--c in this?this[--a]=this[c]:delete this[a];return this};$jscomp.array.copyWithin$install=function(){$jscomp.array.installHelper_("copyWithin",$jscomp.array.copyWithin)};
$jscomp.array.fill=function(a,b,c){var d=this.length||0;0>b&&(b=Math.max(0,d+b));if(null==c||c>d)c=d;c=Number(c);0>c&&(c=Math.max(0,d+c));for(b=Number(b||0);b<c;b++)this[b]=a;return this};$jscomp.array.fill$install=function(){$jscomp.array.installHelper_("fill",$jscomp.array.fill)};$jscomp.array.find=function(a,b){return $jscomp.findInternal(this,a,b).v};$jscomp.array.find$install=function(){$jscomp.array.installHelper_("find",$jscomp.array.find)};
$jscomp.array.findIndex=function(a,b){return $jscomp.findInternal(this,a,b).i};$jscomp.array.findIndex$install=function(){$jscomp.array.installHelper_("findIndex",$jscomp.array.findIndex)};$jscomp.ASSUME_NO_NATIVE_MAP=!1;
$jscomp.Map$isConformant=function(){if($jscomp.ASSUME_NO_NATIVE_MAP)return!1;var a=$jscomp.global.Map;if(!a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var b=Object.seal({x:4}),c=new a($jscomp.makeIterator([[b,"s"]]));if("s"!=c.get(b)||1!=c.size||c.get({x:4})||c.set({x:4},"t")!=c||2!=c.size)return!1;var d=c.entries(),e=d.next();if(e.done||e.value[0]!=b||"s"!=e.value[1])return!1;e=d.next();return e.done||4!=e.value[0].x||"t"!=e.value[1]||!d.next().done?!1:!0}catch(f){return!1}};
$jscomp.Map=function(a){this.data_={};this.head_=$jscomp.Map.createHead();this.size=0;if(a){a=$jscomp.makeIterator(a);for(var b;!(b=a.next()).done;)b=b.value,this.set(b[0],b[1])}};
$jscomp.Map.prototype.set=function(a,b){var c=$jscomp.Map.maybeGetEntry(this,a);c.list||(c.list=this.data_[c.id]=[]);c.entry?c.entry.value=b:(c.entry={next:this.head_,previous:this.head_.previous,head:this.head_,key:a,value:b},c.list.push(c.entry),this.head_.previous.next=c.entry,this.head_.previous=c.entry,this.size++);return this};
$jscomp.Map.prototype["delete"]=function(a){a=$jscomp.Map.maybeGetEntry(this,a);return a.entry&&a.list?(a.list.splice(a.index,1),a.list.length||delete this.data_[a.id],a.entry.previous.next=a.entry.next,a.entry.next.previous=a.entry.previous,a.entry.head=null,this.size--,!0):!1};$jscomp.Map.prototype.clear=function(){this.data_={};this.head_=this.head_.previous=$jscomp.Map.createHead();this.size=0};$jscomp.Map.prototype.has=function(a){return!!$jscomp.Map.maybeGetEntry(this,a).entry};
$jscomp.Map.prototype.get=function(a){return(a=$jscomp.Map.maybeGetEntry(this,a).entry)&&a.value};$jscomp.Map.prototype.entries=function(){return $jscomp.Map.makeIterator_(this,function(a){return[a.key,a.value]})};$jscomp.Map.prototype.keys=function(){return $jscomp.Map.makeIterator_(this,function(a){return a.key})};$jscomp.Map.prototype.values=function(){return $jscomp.Map.makeIterator_(this,function(a){return a.value})};
$jscomp.Map.prototype.forEach=function(a,b){for(var c=this.entries(),d;!(d=c.next()).done;)d=d.value,a.call(b,d[1],d[0],this)};$jscomp.Map.maybeGetEntry=function(a,b){var c=$jscomp.Map.getId(b),d=a.data_[c];if(d&&Object.prototype.hasOwnProperty.call(a.data_,c))for(var e=0;e<d.length;e++){var f=d[e];if(b!==b&&f.key!==f.key||b===f.key)return{id:c,list:d,index:e,entry:f}}return{id:c,list:d,index:-1,entry:void 0}};
$jscomp.Map.makeIterator_=function(a,b){var c=a.head_,d={next:function(){if(c){for(;c.head!=a.head_;)c=c.previous;for(;c.next!=c.head;)return c=c.next,{done:!1,value:b(c)};c=null}return{done:!0,value:void 0}}};$jscomp.initSymbol();$jscomp.initSymbolIterator();d[Symbol.iterator]=function(){return d};return d};$jscomp.Map.mapIndex_=0;$jscomp.Map.createHead=function(){var a={};return a.previous=a.next=a.head=a};
$jscomp.Map.getId=function(a){if(!(a instanceof Object))return"p_"+a;if(!($jscomp.Map.idKey in a))try{$jscomp.Map.defineProperty(a,$jscomp.Map.idKey,{value:++$jscomp.Map.mapIndex_})}catch(b){}return $jscomp.Map.idKey in a?a[$jscomp.Map.idKey]:"o_ "+a};$jscomp.Map.defineProperty=Object.defineProperty?function(a,b,c){Object.defineProperty(a,b,{value:String(c)})}:function(a,b,c){a[b]=String(c)};$jscomp.Map.Entry=function(){};
$jscomp.Map$install=function(){$jscomp.initSymbol();$jscomp.initSymbolIterator();$jscomp.Map$isConformant()?$jscomp.Map=$jscomp.global.Map:($jscomp.initSymbol(),$jscomp.initSymbolIterator(),$jscomp.Map.prototype[Symbol.iterator]=$jscomp.Map.prototype.entries,$jscomp.initSymbol(),$jscomp.Map.idKey=Symbol("map-id-key"),$jscomp.Map$install=function(){})};$jscomp.math=$jscomp.math||{};
$jscomp.math.clz32=function(a){a=Number(a)>>>0;if(0===a)return 32;var b=0;0===(a&4294901760)&&(a<<=16,b+=16);0===(a&4278190080)&&(a<<=8,b+=8);0===(a&4026531840)&&(a<<=4,b+=4);0===(a&3221225472)&&(a<<=2,b+=2);0===(a&2147483648)&&b++;return b};$jscomp.math.imul=function(a,b){a=Number(a);b=Number(b);var c=a&65535,d=b&65535;return c*d+((a>>>16&65535)*d+c*(b>>>16&65535)<<16>>>0)|0};$jscomp.math.sign=function(a){a=Number(a);return 0===a||isNaN(a)?a:0<a?1:-1};
$jscomp.math.log10=function(a){return Math.log(a)/Math.LN10};$jscomp.math.log2=function(a){return Math.log(a)/Math.LN2};$jscomp.math.log1p=function(a){a=Number(a);if(.25>a&&-.25<a){for(var b=a,c=1,d=a,e=0,f=1;e!=d;)b*=a,f*=-1,d=(e=d)+f*b/++c;return d}return Math.log(1+a)};$jscomp.math.expm1=function(a){a=Number(a);if(.25>a&&-.25<a){for(var b=a,c=1,d=a,e=0;e!=d;)b*=a/++c,d=(e=d)+b;return d}return Math.exp(a)-1};$jscomp.math.cosh=function(a){a=Number(a);return(Math.exp(a)+Math.exp(-a))/2};
$jscomp.math.sinh=function(a){a=Number(a);return 0===a?a:(Math.exp(a)-Math.exp(-a))/2};$jscomp.math.tanh=function(a){a=Number(a);if(0===a)return a;var b=Math.exp(-2*Math.abs(a)),b=(1-b)/(1+b);return 0>a?-b:b};$jscomp.math.acosh=function(a){a=Number(a);return Math.log(a+Math.sqrt(a*a-1))};$jscomp.math.asinh=function(a){a=Number(a);if(0===a)return a;var b=Math.log(Math.abs(a)+Math.sqrt(a*a+1));return 0>a?-b:b};
$jscomp.math.atanh=function(a){a=Number(a);return($jscomp.math.log1p(a)-$jscomp.math.log1p(-a))/2};$jscomp.math.hypot=function(a,b,c){a=Number(a);b=Number(b);var d,e,f,g=Math.max(Math.abs(a),Math.abs(b));for(d=2;d<arguments.length;d++)g=Math.max(g,Math.abs(arguments[d]));if(1E100<g||1E-100>g){a/=g;b/=g;f=a*a+b*b;for(d=2;d<arguments.length;d++)e=Number(arguments[d])/g,f+=e*e;return Math.sqrt(f)*g}f=a*a+b*b;for(d=2;d<arguments.length;d++)e=Number(arguments[d]),f+=e*e;return Math.sqrt(f)};
$jscomp.math.trunc=function(a){a=Number(a);if(isNaN(a)||Infinity===a||-Infinity===a||0===a)return a;var b=Math.floor(Math.abs(a));return 0>a?-b:b};$jscomp.math.cbrt=function(a){if(0===a)return a;a=Number(a);var b=Math.pow(Math.abs(a),1/3);return 0>a?-b:b};$jscomp.number=$jscomp.number||{};$jscomp.number.isFinite=function(a){return"number"!==typeof a?!1:!isNaN(a)&&Infinity!==a&&-Infinity!==a};$jscomp.number.isInteger=function(a){return $jscomp.number.isFinite(a)?a===Math.floor(a):!1};
$jscomp.number.isNaN=function(a){return"number"===typeof a&&isNaN(a)};$jscomp.number.isSafeInteger=function(a){return $jscomp.number.isInteger(a)&&Math.abs(a)<=$jscomp.number.MAX_SAFE_INTEGER};$jscomp.number.EPSILON=function(){return Math.pow(2,-52)}();$jscomp.number.MAX_SAFE_INTEGER=function(){return 9007199254740991}();$jscomp.number.MIN_SAFE_INTEGER=function(){return-9007199254740991}();$jscomp.object=$jscomp.object||{};
$jscomp.object.assign=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)Object.prototype.hasOwnProperty.call(d,e)&&(a[e]=d[e])}return a};$jscomp.object.is=function(a,b){return a===b?0!==a||1/a===1/b:a!==a&&b!==b};$jscomp.ASSUME_NO_NATIVE_SET=!1;
$jscomp.Set$isConformant=function(){if($jscomp.ASSUME_NO_NATIVE_SET)return!1;var a=$jscomp.global.Set;if(!a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var b=Object.seal({x:4}),c=new a($jscomp.makeIterator([b]));if(!c.has(b)||1!=c.size||c.add(b)!=c||1!=c.size||c.add({x:4})!=c||2!=c.size)return!1;var d=c.entries(),e=d.next();if(e.done||e.value[0]!=b||e.value[1]!=b)return!1;e=d.next();return e.done||e.value[0]==b||4!=e.value[0].x||e.value[1]!=e.value[0]?!1:d.next().done}catch(f){return!1}};
$jscomp.Set=function(a){this.map_=new $jscomp.Map;if(a){a=$jscomp.makeIterator(a);for(var b;!(b=a.next()).done;)this.add(b.value)}this.size=this.map_.size};$jscomp.Set.prototype.add=function(a){this.map_.set(a,a);this.size=this.map_.size;return this};$jscomp.Set.prototype["delete"]=function(a){a=this.map_["delete"](a);this.size=this.map_.size;return a};$jscomp.Set.prototype.clear=function(){this.map_.clear();this.size=0};$jscomp.Set.prototype.has=function(a){return this.map_.has(a)};
$jscomp.Set.prototype.entries=function(){return this.map_.entries()};$jscomp.Set.prototype.values=function(){return this.map_.values()};$jscomp.Set.prototype.forEach=function(a,b){var c=this;this.map_.forEach(function(d){return a.call(b,d,d,c)})};$jscomp.Set$install=function(){$jscomp.Map$install();$jscomp.Set$isConformant()?$jscomp.Set=$jscomp.global.Set:($jscomp.initSymbol(),$jscomp.initSymbolIterator(),$jscomp.Set.prototype[Symbol.iterator]=$jscomp.Set.prototype.values,$jscomp.Set$install=function(){})};
$jscomp.string=$jscomp.string||{};$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};
$jscomp.string.fromCodePoint=function(a){for(var b="",c=0;c<arguments.length;c++){var d=Number(arguments[c]);if(0>d||1114111<d||d!==Math.floor(d))throw new RangeError("invalid_code_point "+d);65535>=d?b+=String.fromCharCode(d):(d-=65536,b+=String.fromCharCode(d>>>10&1023|55296),b+=String.fromCharCode(d&1023|56320))}return b};
$jscomp.string.repeat=function(a){var b=$jscomp.checkStringArgs(this,null,"repeat");if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var c="";a;)if(a&1&&(c+=b),a>>>=1)b+=b;return c};$jscomp.string.repeat$install=function(){String.prototype.repeat||(String.prototype.repeat=$jscomp.string.repeat)};
$jscomp.string.codePointAt=function(a){var b=$jscomp.checkStringArgs(this,null,"codePointAt"),c=b.length;a=Number(a)||0;if(0<=a&&a<c){a|=0;var d=b.charCodeAt(a);if(55296>d||56319<d||a+1===c)return d;a=b.charCodeAt(a+1);return 56320>a||57343<a?d:1024*(d-55296)+a+9216}};$jscomp.string.codePointAt$install=function(){String.prototype.codePointAt||(String.prototype.codePointAt=$jscomp.string.codePointAt)};
$jscomp.string.includes=function(a,b){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,b||0)};$jscomp.string.includes$install=function(){String.prototype.includes||(String.prototype.includes=$jscomp.string.includes)};$jscomp.string.startsWith=function(a,b){var c=$jscomp.checkStringArgs(this,a,"startsWith");a+="";for(var d=c.length,e=a.length,f=Math.max(0,Math.min(b|0,c.length)),g=0;g<e&&f<d;)if(c[f++]!=a[g++])return!1;return g>=e};
$jscomp.string.startsWith$install=function(){String.prototype.startsWith||(String.prototype.startsWith=$jscomp.string.startsWith)};$jscomp.string.endsWith=function(a,b){var c=$jscomp.checkStringArgs(this,a,"endsWith");a+="";void 0===b&&(b=c.length);for(var d=Math.max(0,Math.min(b|0,c.length)),e=a.length;0<e&&0<d;)if(c[--d]!=a[--e])return!1;return 0>=e};$jscomp.string.endsWith$install=function(){String.prototype.endsWith||(String.prototype.endsWith=$jscomp.string.endsWith)};
var COMPILED=!0,goog=goog||{};goog.global=this;goog.isDef=function(a){return void 0!==a};goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&goog.isDef(b)?c[d]=b:c=c[d]?c[d]:c[d]={}};
goog.define=function(a,b){var c=b;COMPILED||(goog.global.CLOSURE_UNCOMPILED_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES,a)?c=goog.global.CLOSURE_UNCOMPILED_DEFINES[a]:goog.global.CLOSURE_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES,a)&&(c=goog.global.CLOSURE_DEFINES[a]));goog.exportPath_(a,c)};goog.DEBUG=!0;goog.LOCALE="en";goog.TRUSTED_SITE=!0;goog.STRICT_MODE_COMPATIBLE=!1;goog.DISALLOW_TEST_ONLY_CODE=COMPILED&&!goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING=!1;goog.provide=function(a){if(!COMPILED&&goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');goog.constructNamespace_(a)};goog.constructNamespace_=function(a,b){if(!COMPILED){delete goog.implicitNamespaces_[a];for(var c=a;(c=c.substring(0,c.lastIndexOf(".")))&&!goog.getObjectByName(c);)goog.implicitNamespaces_[c]=!0}goog.exportPath_(a,b)};goog.VALID_MODULE_RE_=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module=function(a){if(!goog.isString(a)||!a||-1==a.search(goog.VALID_MODULE_RE_))throw Error("Invalid module identifier");if(!goog.isInModuleLoader_())throw Error("Module "+a+" has been loaded incorrectly.");if(goog.moduleLoaderState_.moduleName)throw Error("goog.module may only be called once per module.");goog.moduleLoaderState_.moduleName=a;if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a]}};goog.module.get=function(a){return goog.module.getInternal_(a)};
goog.module.getInternal_=function(a){if(!COMPILED)return goog.isProvided_(a)?a in goog.loadedModules_?goog.loadedModules_[a]:goog.getObjectByName(a):null};goog.moduleLoaderState_=null;goog.isInModuleLoader_=function(){return null!=goog.moduleLoaderState_};
goog.module.declareLegacyNamespace=function(){if(!COMPILED&&!goog.isInModuleLoader_())throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");if(!COMPILED&&!goog.moduleLoaderState_.moduleName)throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");goog.moduleLoaderState_.declareLegacyNamespace=!0};
goog.setTestOnly=function(a){if(goog.DISALLOW_TEST_ONLY_CODE)throw a=a||"",Error("Importing test-only code into non-debug environment"+(a?": "+a:"."));};goog.forwardDeclare=function(a){};COMPILED||(goog.isProvided_=function(a){return a in goog.loadedModules_||!goog.implicitNamespaces_[a]&&goog.isDefAndNotNull(goog.getObjectByName(a))},goog.implicitNamespaces_={"goog.module":!0});
goog.getObjectByName=function(a,b){for(var c=a.split("."),d=b||goog.global,e;e=c.shift();)if(goog.isDefAndNotNull(d[e]))d=d[e];else return null;return d};goog.globalize=function(a,b){var c=b||goog.global,d;for(d in a)c[d]=a[d]};goog.addDependency=function(a,b,c,d){if(goog.DEPENDENCIES_ENABLED){var e;a=a.replace(/\\/g,"/");for(var f=goog.dependencies_,g=0;e=b[g];g++)f.nameToPath[e]=a,f.pathIsModule[a]=!!d;for(d=0;b=c[d];d++)a in f.requires||(f.requires[a]={}),f.requires[a][b]=!0}};
goog.ENABLE_DEBUG_LOADER=!0;goog.logToConsole_=function(a){goog.global.console&&goog.global.console.error(a)};goog.require=function(a){if(!COMPILED){goog.ENABLE_DEBUG_LOADER&&goog.IS_OLD_IE_&&goog.maybeProcessDeferredDep_(a);if(goog.isProvided_(a))return goog.isInModuleLoader_()?goog.module.getInternal_(a):null;if(goog.ENABLE_DEBUG_LOADER){var b=goog.getPathFromDeps_(a);if(b)return goog.writeScripts_(b),null}a="goog.require could not find: "+a;goog.logToConsole_(a);throw Error(a);}};
goog.basePath="";goog.nullFunction=function(){};goog.abstractMethod=function(){throw Error("unimplemented abstract method");};goog.addSingletonGetter=function(a){a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a}};goog.instantiatedSingletons_=[];goog.LOAD_MODULE_USING_EVAL=!0;goog.SEAL_MODULE_EXPORTS=goog.DEBUG;goog.loadedModules_={};goog.DEPENDENCIES_ENABLED=!COMPILED&&goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED&&(goog.dependencies_={pathIsModule:{},nameToPath:{},requires:{},visited:{},written:{},deferred:{}},goog.inHtmlDocument_=function(){var a=goog.global.document;return null!=a&&"write"in a},goog.findBasePath_=function(){if(goog.isDef(goog.global.CLOSURE_BASE_PATH))goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_())for(var a=goog.global.document.getElementsByTagName("SCRIPT"),b=a.length-1;0<=b;--b){var c=a[b].src,d=c.lastIndexOf("?"),d=-1==d?c.length:
d;if("base.js"==c.substr(d-7,7)){goog.basePath=c.substr(0,d-7);break}}},goog.importScript_=function(a,b){(goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_)(a,b)&&(goog.dependencies_.written[a]=!0)},goog.IS_OLD_IE_=!(goog.global.atob||!goog.global.document||!goog.global.document.all),goog.importModule_=function(a){goog.importScript_("",'goog.retrieveAndExecModule_("'+a+'");')&&(goog.dependencies_.written[a]=!0)},goog.queuedModules_=[],goog.wrapModule_=function(a,b){return goog.LOAD_MODULE_USING_EVAL&&
goog.isDef(goog.global.JSON)?"goog.loadModule("+goog.global.JSON.stringify(b+"\n//# sourceURL="+a+"\n")+");":'goog.loadModule(function(exports) {"use strict";'+b+"\n;return exports});\n//# sourceURL="+a+"\n"},goog.loadQueuedModules_=function(){var a=goog.queuedModules_.length;if(0<a){var b=goog.queuedModules_;goog.queuedModules_=[];for(var c=0;c<a;c++)goog.maybeProcessDeferredPath_(b[c])}},goog.maybeProcessDeferredDep_=function(a){goog.isDeferredModule_(a)&&goog.allDepsAreAvailable_(a)&&(a=goog.getPathFromDeps_(a),
goog.maybeProcessDeferredPath_(goog.basePath+a))},goog.isDeferredModule_=function(a){return(a=goog.getPathFromDeps_(a))&&goog.dependencies_.pathIsModule[a]?goog.basePath+a in goog.dependencies_.deferred:!1},goog.allDepsAreAvailable_=function(a){if((a=goog.getPathFromDeps_(a))&&a in goog.dependencies_.requires)for(var b in goog.dependencies_.requires[a])if(!goog.isProvided_(b)&&!goog.isDeferredModule_(b))return!1;return!0},goog.maybeProcessDeferredPath_=function(a){if(a in goog.dependencies_.deferred){var b=
goog.dependencies_.deferred[a];delete goog.dependencies_.deferred[a];goog.globalEval(b)}},goog.loadModuleFromUrl=function(a){goog.retrieveAndExecModule_(a)},goog.loadModule=function(a){var b=goog.moduleLoaderState_;try{goog.moduleLoaderState_={moduleName:void 0,declareLegacyNamespace:!1};var c;if(goog.isFunction(a))c=a.call(goog.global,{});else if(goog.isString(a))c=goog.loadModuleFromSource_.call(goog.global,a);else throw Error("Invalid module definition");var d=goog.moduleLoaderState_.moduleName;
if(!goog.isString(d)||!d)throw Error('Invalid module name "'+d+'"');goog.moduleLoaderState_.declareLegacyNamespace?goog.constructNamespace_(d,c):goog.SEAL_MODULE_EXPORTS&&Object.seal&&Object.seal(c);goog.loadedModules_[d]=c}finally{goog.moduleLoaderState_=b}},goog.loadModuleFromSource_=function(a){eval(a);return{}},goog.writeScriptSrcNode_=function(a){goog.global.document.write('<script type="text/javascript" src="'+a+'">\x3c/script>')},goog.appendScriptSrcNode_=function(a){var b=goog.global.document,
c=b.createElement("script");c.type="text/javascript";c.src=a;c.defer=!1;c.async=!1;b.head.appendChild(c)},goog.writeScriptTag_=function(a,b){if(goog.inHtmlDocument_()){var c=goog.global.document;if(!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING&&"complete"==c.readyState){if(/\bdeps.js$/.test(a))return!1;throw Error('Cannot write "'+a+'" after document load');}var d=goog.IS_OLD_IE_;void 0===b?d?(d=" onreadystatechange='goog.onScriptLoad_(this, "+ ++goog.lastNonModuleScriptIndex_+")' ",c.write('<script type="text/javascript" src="'+
a+'"'+d+">\x3c/script>")):goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING?goog.appendScriptSrcNode_(a):goog.writeScriptSrcNode_(a):c.write('<script type="text/javascript">'+b+"\x3c/script>");return!0}return!1},goog.lastNonModuleScriptIndex_=0,goog.onScriptLoad_=function(a,b){"complete"==a.readyState&&goog.lastNonModuleScriptIndex_==b&&goog.loadQueuedModules_();return!0},goog.writeScripts_=function(a){function b(a){if(!(a in e.written||a in e.visited)){e.visited[a]=!0;if(a in e.requires)for(var f in e.requires[a])if(!goog.isProvided_(f))if(f in
e.nameToPath)b(e.nameToPath[f]);else throw Error("Undefined nameToPath for "+f);a in d||(d[a]=!0,c.push(a))}}var c=[],d={},e=goog.dependencies_;b(a);for(a=0;a<c.length;a++){var f=c[a];goog.dependencies_.written[f]=!0}var g=goog.moduleLoaderState_;goog.moduleLoaderState_=null;for(a=0;a<c.length;a++)if(f=c[a])e.pathIsModule[f]?goog.importModule_(goog.basePath+f):goog.importScript_(goog.basePath+f);else throw goog.moduleLoaderState_=g,Error("Undefined script input");goog.moduleLoaderState_=g},goog.getPathFromDeps_=
function(a){return a in goog.dependencies_.nameToPath?goog.dependencies_.nameToPath[a]:null},goog.findBasePath_(),goog.global.CLOSURE_NO_DEPS||goog.importScript_(goog.basePath+"deps.js"));goog.normalizePath_=function(a){a=a.split("/");for(var b=0;b<a.length;)"."==a[b]?a.splice(b,1):b&&".."==a[b]&&a[b-1]&&".."!=a[b-1]?a.splice(--b,2):b++;return a.join("/")};
goog.loadFileSync_=function(a){if(goog.global.CLOSURE_LOAD_FILE_SYNC)return goog.global.CLOSURE_LOAD_FILE_SYNC(a);var b=new goog.global.XMLHttpRequest;b.open("get",a,!1);b.send();return b.responseText};
goog.retrieveAndExecModule_=function(a){if(!COMPILED){var b=a;a=goog.normalizePath_(a);var c=goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_,d=goog.loadFileSync_(a);if(null!=d)d=goog.wrapModule_(a,d),goog.IS_OLD_IE_?(goog.dependencies_.deferred[b]=d,goog.queuedModules_.push(b)):c(a,d);else throw Error("load of "+a+"failed");}};
goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return"array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return"array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isString=function(a){return"string"==typeof a};
goog.isBoolean=function(a){return"boolean"==typeof a};goog.isNumber=function(a){return"number"==typeof a};goog.isFunction=function(a){return"function"==goog.typeOf(a)};goog.isObject=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.hasUid=function(a){return!!a[goog.UID_PROPERTY_]};
goog.removeUid=function(a){null!==a&&"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_]}catch(b){}};goog.UID_PROPERTY_="closure_uid_"+(1E9*Math.random()>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.cloneObject(a[c]);return b}return a};
goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};
goog.bind=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_;return goog.bind.apply(null,arguments)};goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c]};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date};
goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval){if(null==goog.evalWorksForGlobals_)if(goog.global.eval("var _evalTest_ = 1;"),"undefined"!=typeof goog.global._evalTest_){try{delete goog.global._evalTest_}catch(d){}goog.evalWorksForGlobals_=!0}else goog.evalWorksForGlobals_=!1;if(goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("SCRIPT");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));
b.body.appendChild(c);b.body.removeChild(c)}}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;goog.getCssName=function(a,b){var c=function(a){return goog.cssNameMapping_[a]||a},d=function(a){a=a.split("-");for(var b=[],d=0;d<a.length;d++)b.push(c(a[d]));return b.join("-")},d=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:d:function(a){return a};return b?a+"-"+d(b):d(a)};
goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b};!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING);goog.getMsg=function(a,b){b&&(a=a.replace(/\{\$([^}]+)}/g,function(a,d){return null!=b&&d in b?b[d]:a}));return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c)};goog.exportProperty=function(a,b,c){a[b]=c};
goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[c].apply(a,g)}};
goog.base=function(a,b,c){var d=arguments.callee.caller;if(goog.STRICT_MODE_COMPATIBLE||goog.DEBUG&&!d)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(d.superClass_){for(var e=Array(arguments.length-1),f=1;f<arguments.length;f++)e[f-1]=arguments[f];return d.superClass_.constructor.apply(a,e)}e=Array(arguments.length-2);for(f=2;f<arguments.length;f++)e[f-2]=arguments[f];for(var f=!1,g=a.constructor;g;g=
g.superClass_&&g.superClass_.constructor)if(g.prototype[b]===d)f=!0;else if(f)return g.prototype[b].apply(a,e);if(a[b]===d)return a.constructor.prototype[b].apply(a,e);throw Error("goog.base called from a method of one name to a method of a different name");};goog.scope=function(a){a.call(goog.global)};COMPILED||(goog.global.COMPILED=COMPILED);
goog.defineClass=function(a,b){var c=b.constructor,d=b.statics;c&&c!=Object.prototype.constructor||(c=function(){throw Error("cannot instantiate an interface (no constructor defined).");});c=goog.defineClass.createSealingConstructor_(c,a);a&&goog.inherits(c,a);delete b.constructor;delete b.statics;goog.defineClass.applyProperties_(c.prototype,b);null!=d&&(d instanceof Function?d(c):goog.defineClass.applyProperties_(c,d));return c};goog.defineClass.SEAL_CLASS_INSTANCES=goog.DEBUG;
goog.defineClass.createSealingConstructor_=function(a,b){if(goog.defineClass.SEAL_CLASS_INSTANCES&&Object.seal instanceof Function){if(b&&b.prototype&&b.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_])return a;var c=function(){var b=a.apply(this,arguments)||this;b[goog.UID_PROPERTY_]=b[goog.UID_PROPERTY_];this.constructor===c&&Object.seal(b);return b};return c}return a};goog.defineClass.OBJECT_PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_=function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c]);for(var d=0;d<goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++)c=goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d],Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])};goog.tagUnsealableClass=function(a){!COMPILED&&goog.defineClass.SEAL_CLASS_INSTANCES&&(a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]=!0)};goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_="goog_defineClass_legacy_unsealable";goog.dom={};goog.dom.NodeType={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12};goog.debug={};goog.debug.Error=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,goog.debug.Error);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a));this.reportErrorToServer=!0};goog.inherits(goog.debug.Error,Error);goog.debug.Error.prototype.name="CustomError";goog.string={};goog.string.DETECT_DOUBLE_ESCAPING=!1;goog.string.FORCE_NON_DOM_HTML_UNESCAPING=!1;goog.string.Unicode={NBSP:"\u00a0"};goog.string.startsWith=function(a,b){return 0==a.lastIndexOf(b,0)};goog.string.endsWith=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c};goog.string.caseInsensitiveStartsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(0,b.length))};
goog.string.caseInsensitiveEndsWith=function(a,b){return 0==goog.string.caseInsensitiveCompare(b,a.substr(a.length-b.length,b.length))};goog.string.caseInsensitiveEquals=function(a,b){return a.toLowerCase()==b.toLowerCase()};goog.string.subs=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};goog.string.collapseWhitespace=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};
goog.string.isEmptyOrWhitespace=function(a){return/^[\s\xa0]*$/.test(a)};goog.string.isEmptyString=function(a){return 0==a.length};goog.string.isEmpty=goog.string.isEmptyOrWhitespace;goog.string.isEmptyOrWhitespaceSafe=function(a){return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))};goog.string.isEmptySafe=goog.string.isEmptyOrWhitespaceSafe;goog.string.isBreakingWhitespace=function(a){return!/[^\t\n\r ]/.test(a)};goog.string.isAlpha=function(a){return!/[^a-zA-Z]/.test(a)};
goog.string.isNumeric=function(a){return!/[^0-9]/.test(a)};goog.string.isAlphaNumeric=function(a){return!/[^a-zA-Z0-9]/.test(a)};goog.string.isSpace=function(a){return" "==a};goog.string.isUnicodeChar=function(a){return 1==a.length&&" "<=a&&"~">=a||"\u0080"<=a&&"\ufffd">=a};goog.string.stripNewlines=function(a){return a.replace(/(\r\n|\r|\n)+/g," ")};goog.string.canonicalizeNewlines=function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")};
goog.string.normalizeWhitespace=function(a){return a.replace(/\xa0|\s/g," ")};goog.string.normalizeSpaces=function(a){return a.replace(/\xa0|[ \t]+/g," ")};goog.string.collapseBreakingSpaces=function(a){return a.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};goog.string.trim=goog.TRUSTED_SITE&&String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};goog.string.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,"")};
goog.string.trimRight=function(a){return a.replace(/[\s\xa0]+$/,"")};goog.string.caseInsensitiveCompare=function(a,b){var c=String(a).toLowerCase(),d=String(b).toLowerCase();return c<d?-1:c==d?0:1};
goog.string.numberAwareCompare_=function(a,b,c){if(a==b)return 0;if(!a)return-1;if(!b)return 1;for(var d=a.toLowerCase().match(c),e=b.toLowerCase().match(c),f=Math.min(d.length,e.length),g=0;g<f;g++){c=d[g];var h=e[g];if(c!=h)return a=parseInt(c,10),!isNaN(a)&&(b=parseInt(h,10),!isNaN(b)&&a-b)?a-b:c<h?-1:1}return d.length!=e.length?d.length-e.length:a<b?-1:1};goog.string.intAwareCompare=function(a,b){return goog.string.numberAwareCompare_(a,b,/\d+|\D+/g)};
goog.string.floatAwareCompare=function(a,b){return goog.string.numberAwareCompare_(a,b,/\d+|\.\d+|\D+/g)};goog.string.numerateCompare=goog.string.floatAwareCompare;goog.string.urlEncode=function(a){return encodeURIComponent(String(a))};goog.string.urlDecode=function(a){return decodeURIComponent(a.replace(/\+/g," "))};goog.string.newLineToBr=function(a,b){return a.replace(/(\r\n|\r|\n)/g,b?"<br />":"<br>")};
goog.string.htmlEscape=function(a,b){if(b)a=a.replace(goog.string.AMP_RE_,"&amp;").replace(goog.string.LT_RE_,"&lt;").replace(goog.string.GT_RE_,"&gt;").replace(goog.string.QUOT_RE_,"&quot;").replace(goog.string.SINGLE_QUOTE_RE_,"&#39;").replace(goog.string.NULL_RE_,"&#0;"),goog.string.DETECT_DOUBLE_ESCAPING&&(a=a.replace(goog.string.E_RE_,"&#101;"));else{if(!goog.string.ALL_RE_.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(goog.string.AMP_RE_,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(goog.string.LT_RE_,
"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(goog.string.GT_RE_,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(goog.string.QUOT_RE_,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(goog.string.SINGLE_QUOTE_RE_,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(goog.string.NULL_RE_,"&#0;"));goog.string.DETECT_DOUBLE_ESCAPING&&-1!=a.indexOf("e")&&(a=a.replace(goog.string.E_RE_,"&#101;"))}return a};goog.string.AMP_RE_=/&/g;goog.string.LT_RE_=/</g;goog.string.GT_RE_=/>/g;goog.string.QUOT_RE_=/"/g;
goog.string.SINGLE_QUOTE_RE_=/'/g;goog.string.NULL_RE_=/\x00/g;goog.string.E_RE_=/e/g;goog.string.ALL_RE_=goog.string.DETECT_DOUBLE_ESCAPING?/[\x00&<>"'e]/:/[\x00&<>"']/;goog.string.unescapeEntities=function(a){return goog.string.contains(a,"&")?!goog.string.FORCE_NON_DOM_HTML_UNESCAPING&&"document"in goog.global?goog.string.unescapeEntitiesUsingDom_(a):goog.string.unescapePureXmlEntities_(a):a};
goog.string.unescapeEntitiesWithDocument=function(a,b){return goog.string.contains(a,"&")?goog.string.unescapeEntitiesUsingDom_(a,b):a};
goog.string.unescapeEntitiesUsingDom_=function(a,b){var c={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'},d;d=b?b.createElement("div"):goog.global.document.createElement("div");return a.replace(goog.string.HTML_ENTITY_PATTERN_,function(a,b){var g=c[a];if(g)return g;if("#"==b.charAt(0)){var h=Number("0"+b.substr(1));isNaN(h)||(g=String.fromCharCode(h))}g||(d.innerHTML=a+" ",g=d.firstChild.nodeValue.slice(0,-1));return c[a]=g})};
goog.string.unescapePureXmlEntities_=function(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:if("#"==c.charAt(0)){var d=Number("0"+c.substr(1));if(!isNaN(d))return String.fromCharCode(d)}return a}})};goog.string.HTML_ENTITY_PATTERN_=/&([^;\s<&]+);?/g;goog.string.whitespaceEscape=function(a,b){return goog.string.newLineToBr(a.replace(/  /g," &#160;"),b)};
goog.string.preserveSpaces=function(a){return a.replace(/(^|[\n ]) /g,"$1"+goog.string.Unicode.NBSP)};goog.string.stripQuotes=function(a,b){for(var c=b.length,d=0;d<c;d++){var e=1==c?b:b.charAt(d);if(a.charAt(0)==e&&a.charAt(a.length-1)==e)return a.substring(1,a.length-1)}return a};goog.string.truncate=function(a,b,c){c&&(a=goog.string.unescapeEntities(a));a.length>b&&(a=a.substring(0,b-3)+"...");c&&(a=goog.string.htmlEscape(a));return a};
goog.string.truncateMiddle=function(a,b,c,d){c&&(a=goog.string.unescapeEntities(a));if(d&&a.length>b){d>b&&(d=b);var e=a.length-d;a=a.substring(0,b-d)+"..."+a.substring(e)}else a.length>b&&(d=Math.floor(b/2),e=a.length-d,a=a.substring(0,d+b%2)+"..."+a.substring(e));c&&(a=goog.string.htmlEscape(a));return a};goog.string.specialEscapeChars_={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"<"};goog.string.jsEscapeCache_={"'":"\\'"};
goog.string.quote=function(a){a=String(a);for(var b=['"'],c=0;c<a.length;c++){var d=a.charAt(c),e=d.charCodeAt(0);b[c+1]=goog.string.specialEscapeChars_[d]||(31<e&&127>e?d:goog.string.escapeChar(d))}b.push('"');return b.join("")};goog.string.escapeString=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=goog.string.escapeChar(a.charAt(c));return b.join("")};
goog.string.escapeChar=function(a){if(a in goog.string.jsEscapeCache_)return goog.string.jsEscapeCache_[a];if(a in goog.string.specialEscapeChars_)return goog.string.jsEscapeCache_[a]=goog.string.specialEscapeChars_[a];var b,c=a.charCodeAt(0);if(31<c&&127>c)b=a;else{if(256>c){if(b="\\x",16>c||256<c)b+="0"}else b="\\u",4096>c&&(b+="0");b+=c.toString(16).toUpperCase()}return goog.string.jsEscapeCache_[a]=b};goog.string.contains=function(a,b){return-1!=a.indexOf(b)};
goog.string.caseInsensitiveContains=function(a,b){return goog.string.contains(a.toLowerCase(),b.toLowerCase())};goog.string.countOf=function(a,b){return a&&b?a.split(b).length-1:0};goog.string.removeAt=function(a,b,c){var d=a;0<=b&&b<a.length&&0<c&&(d=a.substr(0,b)+a.substr(b+c,a.length-b-c));return d};goog.string.remove=function(a,b){var c=new RegExp(goog.string.regExpEscape(b),"");return a.replace(c,"")};
goog.string.removeAll=function(a,b){var c=new RegExp(goog.string.regExpEscape(b),"g");return a.replace(c,"")};goog.string.regExpEscape=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};goog.string.repeat=String.prototype.repeat?function(a,b){return a.repeat(b)}:function(a,b){return Array(b+1).join(a)};
goog.string.padNumber=function(a,b,c){a=goog.isDef(c)?a.toFixed(c):String(a);c=a.indexOf(".");-1==c&&(c=a.length);return goog.string.repeat("0",Math.max(0,b-c))+a};goog.string.makeSafe=function(a){return null==a?"":String(a)};goog.string.buildString=function(a){return Array.prototype.join.call(arguments,"")};goog.string.getRandomString=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^goog.now()).toString(36)};
goog.string.compareVersions=function(a,b){for(var c=0,d=goog.string.trim(String(a)).split("."),e=goog.string.trim(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var h=d[g]||"",k=e[g]||"",l=RegExp("(\\d*)(\\D*)","g"),p=RegExp("(\\d*)(\\D*)","g");do{var m=l.exec(h)||["","",""],n=p.exec(k)||["","",""];if(0==m[0].length&&0==n[0].length)break;var c=0==m[1].length?0:parseInt(m[1],10),q=0==n[1].length?0:parseInt(n[1],10),c=goog.string.compareElements_(c,q)||goog.string.compareElements_(0==
m[2].length,0==n[2].length)||goog.string.compareElements_(m[2],n[2])}while(0==c)}return c};goog.string.compareElements_=function(a,b){return a<b?-1:a>b?1:0};goog.string.hashCode=function(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b};goog.string.uniqueStringCounter_=2147483648*Math.random()|0;goog.string.createUniqueString=function(){return"goog_"+goog.string.uniqueStringCounter_++};
goog.string.toNumber=function(a){var b=Number(a);return 0==b&&goog.string.isEmptyOrWhitespace(a)?NaN:b};goog.string.isLowerCamelCase=function(a){return/^[a-z]+([A-Z][a-z]*)*$/.test(a)};goog.string.isUpperCamelCase=function(a){return/^([A-Z][a-z]*)+$/.test(a)};goog.string.toCamelCase=function(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})};goog.string.toSelectorCase=function(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()};
goog.string.toTitleCase=function(a,b){var c=goog.isString(b)?goog.string.regExpEscape(b):"\\s";return a.replace(new RegExp("(^"+(c?"|["+c+"]+":"")+")([a-z])","g"),function(a,b,c){return b+c.toUpperCase()})};goog.string.capitalize=function(a){return String(a.charAt(0)).toUpperCase()+String(a.substr(1)).toLowerCase()};goog.string.parseInt=function(a){isFinite(a)&&(a=String(a));return goog.isString(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};
goog.string.splitLimit=function(a,b,c){a=a.split(b);for(var d=[];0<c&&a.length;)d.push(a.shift()),c--;a.length&&d.push(a.join(b));return d};goog.string.editDistance=function(a,b){var c=[],d=[];if(a==b)return 0;if(!a.length||!b.length)return Math.max(a.length,b.length);for(var e=0;e<b.length+1;e++)c[e]=e;for(e=0;e<a.length;e++){d[0]=e+1;for(var f=0;f<b.length;f++)d[f+1]=Math.min(d[f]+1,c[f+1]+1,c[f]+Number(a[e]!=b[f]));for(f=0;f<c.length;f++)c[f]=d[f]}return d[b.length]};goog.asserts={};goog.asserts.ENABLE_ASSERTS=goog.DEBUG;goog.asserts.AssertionError=function(a,b){b.unshift(a);goog.debug.Error.call(this,goog.string.subs.apply(null,b));b.shift();this.messagePattern=a};goog.inherits(goog.asserts.AssertionError,goog.debug.Error);goog.asserts.AssertionError.prototype.name="AssertionError";goog.asserts.DEFAULT_ERROR_HANDLER=function(a){throw a;};goog.asserts.errorHandler_=goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);a=new goog.asserts.AssertionError(""+e,f||[]);goog.asserts.errorHandler_(a)};goog.asserts.setErrorHandler=function(a){goog.asserts.ENABLE_ASSERTS&&(goog.asserts.errorHandler_=a)};goog.asserts.assert=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!a&&goog.asserts.doAssertFailure_("",null,b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.fail=function(a,b){goog.asserts.ENABLE_ASSERTS&&goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1)))};goog.asserts.assertNumber=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isNumber(a)&&goog.asserts.doAssertFailure_("Expected number but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertString=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isString(a)&&goog.asserts.doAssertFailure_("Expected string but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertFunction=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isFunction(a)&&goog.asserts.doAssertFailure_("Expected function but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertObject=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isObject(a)&&goog.asserts.doAssertFailure_("Expected object but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertArray=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isArray(a)&&goog.asserts.doAssertFailure_("Expected array but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertBoolean=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isBoolean(a)&&goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertElement=function(a,b,c){!goog.asserts.ENABLE_ASSERTS||goog.isObject(a)&&a.nodeType==goog.dom.NodeType.ELEMENT||goog.asserts.doAssertFailure_("Expected Element but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertInstanceof=function(a,b,c,d){!goog.asserts.ENABLE_ASSERTS||a instanceof b||goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.",[goog.asserts.getType_(b),goog.asserts.getType_(a)],c,Array.prototype.slice.call(arguments,3));return a};goog.asserts.assertObjectPrototypeIsIntact=function(){for(var a in Object.prototype)goog.asserts.fail(a+" should not be enumerable in Object.prototype.")};
goog.asserts.getType_=function(a){return a instanceof Function?a.displayName||a.name||"unknown type name":a instanceof Object?a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a):null===a?"null":typeof a};var jspb={Map:function(a,b){this.arr_=a;this.valueCtor_=b;this.map_={};this.arrClean=!0;0<this.arr_.length&&this.loadFromArray_()}};jspb.Map.prototype.loadFromArray_=function(){for(var a=0;a<this.arr_.length;a++){var b=this.arr_[a],c=b[0];this.map_[c.toString()]=new jspb.Map.Entry_(c,b[1])}this.arrClean=!0};
jspb.Map.prototype.toArray=function(){if(this.arrClean){if(this.valueCtor_){var a=this.map_,b;for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b].valueWrapper;c&&c.toArray()}}}else{this.arr_.length=0;a=this.stringKeys_();a.sort();for(b=0;b<a.length;b++){var d=this.map_[a[b]];(c=d.valueWrapper)&&c.toArray();this.arr_.push([d.key,d.value])}this.arrClean=!0}return this.arr_};
jspb.Map.prototype.toObject=function(a,b){for(var c=this.toArray(),d=[],e=0;e<c.length;e++){var f=this.map_[c[e][0].toString()];this.wrapEntry_(f);var g=f.valueWrapper;g?(goog.asserts.assert(b),d.push([f.key,b(a,g)])):d.push([f.key,f.value])}return d};jspb.Map.fromObject=function(a,b,c){b=new jspb.Map([],b);for(var d=0;d<a.length;d++){var e=a[d][0],f=c(a[d][1]);b.set(e,f)}return b};jspb.Map.ArrayIteratorIterable_=function(a){this.idx_=0;this.arr_=a};
jspb.Map.ArrayIteratorIterable_.prototype.next=function(){return this.idx_<this.arr_.length?{done:!1,value:this.arr_[this.idx_++]}:{done:!0,value:void 0}};$jscomp.initSymbol();"undefined"!=typeof Symbol&&($jscomp.initSymbol(),$jscomp.initSymbolIterator(),jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator]=function(){return this});jspb.Map.prototype.getLength=function(){return this.stringKeys_().length};jspb.Map.prototype.clear=function(){this.map_={};this.arrClean=!1};
jspb.Map.prototype.del=function(a){a=a.toString();var b=this.map_.hasOwnProperty(a);delete this.map_[a];this.arrClean=!1;return b};jspb.Map.prototype.getEntryList=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++){var d=this.map_[b[c]];a.push([d.key,d.value])}return a};jspb.Map.prototype.entries=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++){var d=this.map_[b[c]];a.push([d.key,this.wrapEntry_(d)])}return new jspb.Map.ArrayIteratorIterable_(a)};
jspb.Map.prototype.keys=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++)a.push(this.map_[b[c]].key);return new jspb.Map.ArrayIteratorIterable_(a)};jspb.Map.prototype.values=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++)a.push(this.wrapEntry_(this.map_[b[c]]));return new jspb.Map.ArrayIteratorIterable_(a)};
jspb.Map.prototype.forEach=function(a,b){var c=this.stringKeys_();c.sort();for(var d=0;d<c.length;d++){var e=this.map_[c[d]];a.call(b,this.wrapEntry_(e),e.key,this)}};jspb.Map.prototype.set=function(a,b){var c=new jspb.Map.Entry_(a);this.valueCtor_?(c.valueWrapper=b,c.value=b.toArray()):c.value=b;this.map_[a.toString()]=c;this.arrClean=!1;return this};jspb.Map.prototype.wrapEntry_=function(a){return this.valueCtor_?(a.valueWrapper||(a.valueWrapper=new this.valueCtor_(a.value)),a.valueWrapper):a.value};
jspb.Map.prototype.get=function(a){if(a=this.map_[a.toString()])return this.wrapEntry_(a)};jspb.Map.prototype.has=function(a){return a.toString()in this.map_};jspb.Map.prototype.serializeBinary=function(a,b,c,d,e){var f=this.stringKeys_();f.sort();for(var g=0;g<f.length;g++){var h=this.map_[f[g]];b.beginSubMessage(a);c.call(b,1,h.key);this.valueCtor_?d.call(b,2,this.wrapEntry_(h),e):d.call(b,2,h.value);b.endSubMessage()}};
jspb.Map.deserializeBinary=function(a,b,c,d,e,f){for(var g=void 0;b.nextField()&&!b.isEndGroup();){var h=b.getFieldNumber();1==h?f=c.call(b):2==h&&(a.valueCtor_?(goog.asserts.assert(e),g=new a.valueCtor_,d.call(b,g,e)):g=d.call(b))}goog.asserts.assert(void 0!=f);goog.asserts.assert(void 0!=g);a.set(f,g)};jspb.Map.prototype.stringKeys_=function(){var a=this.map_,b=[],c;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b};
jspb.Map.Entry_=function(a,b){this.key=a;this.value=b;this.valueWrapper=void 0};goog.array={};goog.NATIVE_ARRAY_PROTOTYPES=goog.TRUSTED_SITE;goog.array.ASSUME_NATIVE_FUNCTIONS=!1;goog.array.peek=function(a){return a[a.length-1]};goog.array.last=goog.array.peek;
goog.array.indexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.indexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(goog.isString(a))return goog.isString(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};
goog.array.lastIndexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.lastIndexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.lastIndexOf.call(a,b,null==c?a.length-1:c)}:function(a,b,c){c=null==c?a.length-1:c;0>c&&(c=Math.max(0,a.length+c));if(goog.isString(a))return goog.isString(b)&&1==b.length?a.lastIndexOf(b,c):-1;for(;0<=c;c--)if(c in a&&a[c]===b)return c;return-1};
goog.array.forEach=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.forEach)?function(a,b,c){goog.asserts.assert(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};goog.array.forEachRight=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,d=d-1;0<=d;--d)d in e&&b.call(c,e[d],d,a)};
goog.array.filter=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.filter)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=goog.isString(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var k=g[h];b.call(c,k,h,a)&&(e[f++]=k)}return e};
goog.array.map=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.map)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=goog.isString(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e};
goog.array.reduce=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.reduce)?function(a,b,c,d){goog.asserts.assert(null!=a.length);d&&(b=goog.bind(b,d));return Array.prototype.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEach(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.reduceRight=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.reduceRight)?function(a,b,c,d){goog.asserts.assert(null!=a.length);goog.asserts.assert(null!=b);d&&(b=goog.bind(b,d));return Array.prototype.reduceRight.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEachRight(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.some=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.some)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1};
goog.array.every=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.every)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};goog.array.count=function(a,b,c){var d=0;goog.array.forEach(a,function(a,f,g){b.call(c,a,f,g)&&++d},c);return d};
goog.array.find=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};goog.array.findIndex=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1};goog.array.findRight=function(a,b,c){b=goog.array.findIndexRight(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};
goog.array.findIndexRight=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,d=d-1;0<=d;d--)if(d in e&&b.call(c,e[d],d,a))return d;return-1};goog.array.contains=function(a,b){return 0<=goog.array.indexOf(a,b)};goog.array.isEmpty=function(a){return 0==a.length};goog.array.clear=function(a){if(!goog.isArray(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0};goog.array.insert=function(a,b){goog.array.contains(a,b)||a.push(b)};
goog.array.insertAt=function(a,b,c){goog.array.splice(a,c,0,b)};goog.array.insertArrayAt=function(a,b,c){goog.partial(goog.array.splice,a,c,0).apply(null,b)};goog.array.insertBefore=function(a,b,c){var d;2==arguments.length||0>(d=goog.array.indexOf(a,c))?a.push(b):goog.array.insertAt(a,b,d)};goog.array.remove=function(a,b){var c=goog.array.indexOf(a,b),d;(d=0<=c)&&goog.array.removeAt(a,c);return d};
goog.array.removeAt=function(a,b){goog.asserts.assert(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length};goog.array.removeIf=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0<=b?(goog.array.removeAt(a,b),!0):!1};goog.array.removeAllIf=function(a,b,c){var d=0;goog.array.forEachRight(a,function(e,f){b.call(c,e,f,a)&&goog.array.removeAt(a,f)&&d++});return d};goog.array.concat=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)};
goog.array.join=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)};goog.array.toArray=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};goog.array.clone=goog.array.toArray;goog.array.extend=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(goog.isArrayLike(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}};
goog.array.splice=function(a,b,c,d){goog.asserts.assert(null!=a.length);return Array.prototype.splice.apply(a,goog.array.slice(arguments,1))};goog.array.slice=function(a,b,c){goog.asserts.assert(null!=a.length);return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)};
goog.array.removeDuplicates=function(a,b,c){b=b||a;var d=function(a){return goog.isObject(a)?"o"+goog.getUid(a):(typeof a).charAt(0)+a};c=c||d;for(var d={},e=0,f=0;f<a.length;){var g=a[f++],h=c(g);Object.prototype.hasOwnProperty.call(d,h)||(d[h]=!0,b[e++]=g)}b.length=e};goog.array.binarySearch=function(a,b,c){return goog.array.binarySearch_(a,c||goog.array.defaultCompare,!1,b)};goog.array.binarySelect=function(a,b,c){return goog.array.binarySearch_(a,b,!0,void 0,c)};
goog.array.binarySearch_=function(a,b,c,d,e){for(var f=0,g=a.length,h;f<g;){var k=f+g>>1,l;l=c?b.call(e,a[k],k,a):b(d,a[k]);0<l?f=k+1:(g=k,h=!l)}return h?f:~f};goog.array.sort=function(a,b){a.sort(b||goog.array.defaultCompare)};goog.array.stableSort=function(a,b){for(var c=0;c<a.length;c++)a[c]={index:c,value:a[c]};var d=b||goog.array.defaultCompare;goog.array.sort(a,function(a,b){return d(a.value,b.value)||a.index-b.index});for(c=0;c<a.length;c++)a[c]=a[c].value};
goog.array.sortByKey=function(a,b,c){var d=c||goog.array.defaultCompare;goog.array.sort(a,function(a,c){return d(b(a),b(c))})};goog.array.sortObjectsByKey=function(a,b,c){goog.array.sortByKey(a,function(a){return a[b]},c)};goog.array.isSorted=function(a,b,c){b=b||goog.array.defaultCompare;for(var d=1;d<a.length;d++){var e=b(a[d-1],a[d]);if(0<e||0==e&&c)return!1}return!0};
goog.array.equals=function(a,b,c){if(!goog.isArrayLike(a)||!goog.isArrayLike(b)||a.length!=b.length)return!1;var d=a.length;c=c||goog.array.defaultCompareEquality;for(var e=0;e<d;e++)if(!c(a[e],b[e]))return!1;return!0};goog.array.compare3=function(a,b,c){c=c||goog.array.defaultCompare;for(var d=Math.min(a.length,b.length),e=0;e<d;e++){var f=c(a[e],b[e]);if(0!=f)return f}return goog.array.defaultCompare(a.length,b.length)};goog.array.defaultCompare=function(a,b){return a>b?1:a<b?-1:0};
goog.array.inverseDefaultCompare=function(a,b){return-goog.array.defaultCompare(a,b)};goog.array.defaultCompareEquality=function(a,b){return a===b};goog.array.binaryInsert=function(a,b,c){c=goog.array.binarySearch(a,b,c);return 0>c?(goog.array.insertAt(a,b,-(c+1)),!0):!1};goog.array.binaryRemove=function(a,b,c){b=goog.array.binarySearch(a,b,c);return 0<=b?goog.array.removeAt(a,b):!1};
goog.array.bucket=function(a,b,c){for(var d={},e=0;e<a.length;e++){var f=a[e],g=b.call(c,f,e,a);goog.isDef(g)&&(d[g]||(d[g]=[])).push(f)}return d};goog.array.toObject=function(a,b,c){var d={};goog.array.forEach(a,function(e,f){d[b.call(c,e,f,a)]=e});return d};goog.array.range=function(a,b,c){var d=[],e=0,f=a;c=c||1;void 0!==b&&(e=a,f=b);if(0>c*(f-e))return[];if(0<c)for(a=e;a<f;a+=c)d.push(a);else for(a=e;a>f;a+=c)d.push(a);return d};
goog.array.repeat=function(a,b){for(var c=[],d=0;d<b;d++)c[d]=a;return c};goog.array.flatten=function(a){for(var b=[],c=0;c<arguments.length;c++){var d=arguments[c];if(goog.isArray(d))for(var e=0;e<d.length;e+=8192)for(var f=goog.array.slice(d,e,e+8192),f=goog.array.flatten.apply(null,f),g=0;g<f.length;g++)b.push(f[g]);else b.push(d)}return b};
goog.array.rotate=function(a,b){goog.asserts.assert(null!=a.length);a.length&&(b%=a.length,0<b?Array.prototype.unshift.apply(a,a.splice(-b,b)):0>b&&Array.prototype.push.apply(a,a.splice(0,-b)));return a};goog.array.moveItem=function(a,b,c){goog.asserts.assert(0<=b&&b<a.length);goog.asserts.assert(0<=c&&c<a.length);b=Array.prototype.splice.call(a,b,1);Array.prototype.splice.call(a,c,0,b[0])};
goog.array.zip=function(a){if(!arguments.length)return[];for(var b=[],c=arguments[0].length,d=1;d<arguments.length;d++)arguments[d].length<c&&(c=arguments[d].length);for(d=0;d<c;d++){for(var e=[],f=0;f<arguments.length;f++)e.push(arguments[f][d]);b.push(e)}return b};goog.array.shuffle=function(a,b){for(var c=b||Math.random,d=a.length-1;0<d;d--){var e=Math.floor(c()*(d+1)),f=a[d];a[d]=a[e];a[e]=f}};goog.array.copyByIndex=function(a,b){var c=[];goog.array.forEach(b,function(b){c.push(a[b])});return c};goog.crypt={};goog.crypt.stringToByteArray=function(a){for(var b=[],c=0,d=0;d<a.length;d++){for(var e=a.charCodeAt(d);255<e;)b[c++]=e&255,e>>=8;b[c++]=e}return b};goog.crypt.byteArrayToString=function(a){if(8192>=a.length)return String.fromCharCode.apply(null,a);for(var b="",c=0;c<a.length;c+=8192)var d=goog.array.slice(a,c,c+8192),b=b+String.fromCharCode.apply(null,d);return b};goog.crypt.byteArrayToHex=function(a){return goog.array.map(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join("")};
goog.crypt.hexToByteArray=function(a){goog.asserts.assert(0==a.length%2,"Key string length must be multiple of 2");for(var b=[],c=0;c<a.length;c+=2)b.push(parseInt(a.substring(c,c+2),16));return b};
goog.crypt.stringToUtf8ByteArray=function(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(55296==(e&64512)&&d+1<a.length&&56320==(a.charCodeAt(d+1)&64512)?(e=65536+((e&1023)<<10)+(a.charCodeAt(++d)&1023),b[c++]=e>>18|240,b[c++]=e>>12&63|128):b[c++]=e>>12|224,b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b};
goog.crypt.utf8ByteArrayToString=function(a){for(var b=[],c=0,d=0;c<a.length;){var e=a[c++];if(128>e)b[d++]=String.fromCharCode(e);else if(191<e&&224>e){var f=a[c++];b[d++]=String.fromCharCode((e&31)<<6|f&63)}else if(239<e&&365>e){var f=a[c++],g=a[c++],h=a[c++],e=((e&7)<<18|(f&63)<<12|(g&63)<<6|h&63)-65536;b[d++]=String.fromCharCode(55296+(e>>10));b[d++]=String.fromCharCode(56320+(e&1023))}else f=a[c++],g=a[c++],b[d++]=String.fromCharCode((e&15)<<12|(f&63)<<6|g&63)}return b.join("")};
goog.crypt.xorByteArray=function(a,b){goog.asserts.assert(a.length==b.length,"XOR array lengths must match");for(var c=[],d=0;d<a.length;d++)c.push(a[d]^b[d]);return c};goog.labs={};goog.labs.userAgent={};goog.labs.userAgent.util={};goog.labs.userAgent.util.getNativeUserAgentString_=function(){var a=goog.labs.userAgent.util.getNavigator_();return a&&(a=a.userAgent)?a:""};goog.labs.userAgent.util.getNavigator_=function(){return goog.global.navigator};goog.labs.userAgent.util.userAgent_=goog.labs.userAgent.util.getNativeUserAgentString_();goog.labs.userAgent.util.setUserAgent=function(a){goog.labs.userAgent.util.userAgent_=a||goog.labs.userAgent.util.getNativeUserAgentString_()};
goog.labs.userAgent.util.getUserAgent=function(){return goog.labs.userAgent.util.userAgent_};goog.labs.userAgent.util.matchUserAgent=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.contains(b,a)};goog.labs.userAgent.util.matchUserAgentIgnoreCase=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.caseInsensitiveContains(b,a)};
goog.labs.userAgent.util.extractVersionTuples=function(a){for(var b=RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?","g"),c=[],d;d=b.exec(a);)c.push([d[1],d[2],d[3]||void 0]);return c};goog.labs.userAgent.platform={};goog.labs.userAgent.platform.isAndroid=function(){return goog.labs.userAgent.util.matchUserAgent("Android")};goog.labs.userAgent.platform.isIpod=function(){return goog.labs.userAgent.util.matchUserAgent("iPod")};goog.labs.userAgent.platform.isIphone=function(){return goog.labs.userAgent.util.matchUserAgent("iPhone")&&!goog.labs.userAgent.util.matchUserAgent("iPod")&&!goog.labs.userAgent.util.matchUserAgent("iPad")};goog.labs.userAgent.platform.isIpad=function(){return goog.labs.userAgent.util.matchUserAgent("iPad")};
goog.labs.userAgent.platform.isIos=function(){return goog.labs.userAgent.platform.isIphone()||goog.labs.userAgent.platform.isIpad()||goog.labs.userAgent.platform.isIpod()};goog.labs.userAgent.platform.isMacintosh=function(){return goog.labs.userAgent.util.matchUserAgent("Macintosh")};goog.labs.userAgent.platform.isLinux=function(){return goog.labs.userAgent.util.matchUserAgent("Linux")};goog.labs.userAgent.platform.isWindows=function(){return goog.labs.userAgent.util.matchUserAgent("Windows")};
goog.labs.userAgent.platform.isChromeOS=function(){return goog.labs.userAgent.util.matchUserAgent("CrOS")};
goog.labs.userAgent.platform.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent(),b="";goog.labs.userAgent.platform.isWindows()?(b=/Windows (?:NT|Phone) ([0-9.]+)/,b=(a=b.exec(a))?a[1]:"0.0"):goog.labs.userAgent.platform.isIos()?(b=/(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,b=(a=b.exec(a))&&a[1].replace(/_/g,".")):goog.labs.userAgent.platform.isMacintosh()?(b=/Mac OS X ([0-9_.]+)/,b=(a=b.exec(a))?a[1].replace(/_/g,"."):"10"):goog.labs.userAgent.platform.isAndroid()?(b=/Android\s+([^\);]+)(\)|;)/,
b=(a=b.exec(a))&&a[1]):goog.labs.userAgent.platform.isChromeOS()&&(b=/(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,b=(a=b.exec(a))&&a[1]);return b||""};goog.labs.userAgent.platform.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(),a)};goog.object={};goog.object.forEach=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};goog.object.filter=function(a,b,c){var d={},e;for(e in a)b.call(c,a[e],e,a)&&(d[e]=a[e]);return d};goog.object.map=function(a,b,c){var d={},e;for(e in a)d[e]=b.call(c,a[e],e,a);return d};goog.object.some=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return!0;return!1};goog.object.every=function(a,b,c){for(var d in a)if(!b.call(c,a[d],d,a))return!1;return!0};
goog.object.getCount=function(a){var b=0,c;for(c in a)b++;return b};goog.object.getAnyKey=function(a){for(var b in a)return b};goog.object.getAnyValue=function(a){for(var b in a)return a[b]};goog.object.contains=function(a,b){return goog.object.containsValue(a,b)};goog.object.getValues=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};goog.object.getKeys=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};
goog.object.getValueByKeys=function(a,b){for(var c=goog.isArrayLike(b),d=c?b:arguments,c=c?0:1;c<d.length&&(a=a[d[c]],goog.isDef(a));c++);return a};goog.object.containsKey=function(a,b){return null!==a&&b in a};goog.object.containsValue=function(a,b){for(var c in a)if(a[c]==b)return!0;return!1};goog.object.findKey=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d};goog.object.findValue=function(a,b,c){return(b=goog.object.findKey(a,b,c))&&a[b]};
goog.object.isEmpty=function(a){for(var b in a)return!1;return!0};goog.object.clear=function(a){for(var b in a)delete a[b]};goog.object.remove=function(a,b){var c;(c=b in a)&&delete a[b];return c};goog.object.add=function(a,b,c){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');goog.object.set(a,b,c)};goog.object.get=function(a,b,c){return null!==a&&b in a?a[b]:c};goog.object.set=function(a,b,c){a[b]=c};
goog.object.setIfUndefined=function(a,b,c){return b in a?a[b]:a[b]=c};goog.object.setWithReturnValueIfNotSet=function(a,b,c){if(b in a)return a[b];c=c();return a[b]=c};goog.object.equals=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0};goog.object.clone=function(a){var b={},c;for(c in a)b[c]=a[c];return b};
goog.object.unsafeClone=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(goog.isFunction(a.clone))return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.object.unsafeClone(a[c]);return b}return a};goog.object.transpose=function(a){var b={},c;for(c in a)b[a[c]]=c;return b};goog.object.PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<goog.object.PROTOTYPE_FIELDS_.length;f++)c=goog.object.PROTOTYPE_FIELDS_[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};
goog.object.create=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.create.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c};goog.object.createSet=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.createSet.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};
goog.object.createImmutableView=function(a){var b=a;Object.isFrozen&&!Object.isFrozen(a)&&(b=Object.create(a),Object.freeze(b));return b};goog.object.isImmutableView=function(a){return!!Object.isFrozen&&Object.isFrozen(a)};goog.labs.userAgent.browser={};goog.labs.userAgent.browser.matchOpera_=function(){return goog.labs.userAgent.util.matchUserAgent("Opera")||goog.labs.userAgent.util.matchUserAgent("OPR")};goog.labs.userAgent.browser.matchIE_=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.browser.matchEdge_=function(){return goog.labs.userAgent.util.matchUserAgent("Edge")};goog.labs.userAgent.browser.matchFirefox_=function(){return goog.labs.userAgent.util.matchUserAgent("Firefox")};
goog.labs.userAgent.browser.matchSafari_=function(){return goog.labs.userAgent.util.matchUserAgent("Safari")&&!(goog.labs.userAgent.browser.matchChrome_()||goog.labs.userAgent.browser.matchCoast_()||goog.labs.userAgent.browser.matchOpera_()||goog.labs.userAgent.browser.matchEdge_()||goog.labs.userAgent.browser.isSilk()||goog.labs.userAgent.util.matchUserAgent("Android"))};goog.labs.userAgent.browser.matchCoast_=function(){return goog.labs.userAgent.util.matchUserAgent("Coast")};
goog.labs.userAgent.browser.matchIosWebview_=function(){return(goog.labs.userAgent.util.matchUserAgent("iPad")||goog.labs.userAgent.util.matchUserAgent("iPhone"))&&!goog.labs.userAgent.browser.matchSafari_()&&!goog.labs.userAgent.browser.matchChrome_()&&!goog.labs.userAgent.browser.matchCoast_()&&goog.labs.userAgent.util.matchUserAgent("AppleWebKit")};
goog.labs.userAgent.browser.matchChrome_=function(){return(goog.labs.userAgent.util.matchUserAgent("Chrome")||goog.labs.userAgent.util.matchUserAgent("CriOS"))&&!goog.labs.userAgent.browser.matchOpera_()&&!goog.labs.userAgent.browser.matchEdge_()};goog.labs.userAgent.browser.matchAndroidBrowser_=function(){return goog.labs.userAgent.util.matchUserAgent("Android")&&!(goog.labs.userAgent.browser.isChrome()||goog.labs.userAgent.browser.isFirefox()||goog.labs.userAgent.browser.isOpera()||goog.labs.userAgent.browser.isSilk())};
goog.labs.userAgent.browser.isOpera=goog.labs.userAgent.browser.matchOpera_;goog.labs.userAgent.browser.isIE=goog.labs.userAgent.browser.matchIE_;goog.labs.userAgent.browser.isEdge=goog.labs.userAgent.browser.matchEdge_;goog.labs.userAgent.browser.isFirefox=goog.labs.userAgent.browser.matchFirefox_;goog.labs.userAgent.browser.isSafari=goog.labs.userAgent.browser.matchSafari_;goog.labs.userAgent.browser.isCoast=goog.labs.userAgent.browser.matchCoast_;goog.labs.userAgent.browser.isIosWebview=goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome=goog.labs.userAgent.browser.matchChrome_;goog.labs.userAgent.browser.isAndroidBrowser=goog.labs.userAgent.browser.matchAndroidBrowser_;goog.labs.userAgent.browser.isSilk=function(){return goog.labs.userAgent.util.matchUserAgent("Silk")};
goog.labs.userAgent.browser.getVersion=function(){function a(a){a=goog.array.find(a,d);return c[a]||""}var b=goog.labs.userAgent.util.getUserAgent();if(goog.labs.userAgent.browser.isIE())return goog.labs.userAgent.browser.getIEVersion_(b);var b=goog.labs.userAgent.util.extractVersionTuples(b),c={};goog.array.forEach(b,function(a){c[a[0]]=a[1]});var d=goog.partial(goog.object.containsKey,c);return goog.labs.userAgent.browser.isOpera()?a(["Version","Opera","OPR"]):goog.labs.userAgent.browser.isEdge()?
a(["Edge"]):goog.labs.userAgent.browser.isChrome()?a(["Chrome","CriOS"]):(b=b[2])&&b[1]||""};goog.labs.userAgent.browser.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(),a)};
goog.labs.userAgent.browser.getIEVersion_=function(a){var b=/rv: *([\d\.]*)/.exec(a);if(b&&b[1])return b[1];var b="",c=/MSIE +([\d\.]+)/.exec(a);if(c&&c[1])if(a=/Trident\/(\d.\d)/.exec(a),"7.0"==c[1])if(a&&a[1])switch(a[1]){case "4.0":b="8.0";break;case "5.0":b="9.0";break;case "6.0":b="10.0";break;case "7.0":b="11.0"}else b="7.0";else b=c[1];return b};goog.labs.userAgent.engine={};goog.labs.userAgent.engine.isPresto=function(){return goog.labs.userAgent.util.matchUserAgent("Presto")};goog.labs.userAgent.engine.isTrident=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.engine.isEdge=function(){return goog.labs.userAgent.util.matchUserAgent("Edge")};
goog.labs.userAgent.engine.isWebKit=function(){return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit")&&!goog.labs.userAgent.engine.isEdge()};goog.labs.userAgent.engine.isGecko=function(){return goog.labs.userAgent.util.matchUserAgent("Gecko")&&!goog.labs.userAgent.engine.isWebKit()&&!goog.labs.userAgent.engine.isTrident()&&!goog.labs.userAgent.engine.isEdge()};
goog.labs.userAgent.engine.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent();if(a){var a=goog.labs.userAgent.util.extractVersionTuples(a),b=goog.labs.userAgent.engine.getEngineTuple_(a);if(b)return"Gecko"==b[0]?goog.labs.userAgent.engine.getVersionForKey_(a,"Firefox"):b[1];var a=a[0],c;if(a&&(c=a[2])&&(c=/Trident\/([^\s;]+)/.exec(c)))return c[1]}return""};
goog.labs.userAgent.engine.getEngineTuple_=function(a){if(!goog.labs.userAgent.engine.isEdge())return a[1];for(var b=0;b<a.length;b++){var c=a[b];if("Edge"==c[0])return c}};goog.labs.userAgent.engine.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(),a)};goog.labs.userAgent.engine.getVersionForKey_=function(a,b){var c=goog.array.find(a,function(a){return b==a[0]});return c&&c[1]||""};goog.userAgent={};goog.userAgent.ASSUME_IE=!1;goog.userAgent.ASSUME_EDGE=!1;goog.userAgent.ASSUME_GECKO=!1;goog.userAgent.ASSUME_WEBKIT=!1;goog.userAgent.ASSUME_MOBILE_WEBKIT=!1;goog.userAgent.ASSUME_OPERA=!1;goog.userAgent.ASSUME_ANY_VERSION=!1;goog.userAgent.BROWSER_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_EDGE||goog.userAgent.ASSUME_GECKO||goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_OPERA;goog.userAgent.getUserAgentString=function(){return goog.labs.userAgent.util.getUserAgent()};
goog.userAgent.getNavigator=function(){return goog.global.navigator||null};goog.userAgent.OPERA=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_OPERA:goog.labs.userAgent.browser.isOpera();goog.userAgent.IE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_IE:goog.labs.userAgent.browser.isIE();goog.userAgent.EDGE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_EDGE:goog.labs.userAgent.engine.isEdge();goog.userAgent.EDGE_OR_IE=goog.userAgent.EDGE||goog.userAgent.IE;
goog.userAgent.GECKO=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_GECKO:goog.labs.userAgent.engine.isGecko();goog.userAgent.WEBKIT=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_MOBILE_WEBKIT:goog.labs.userAgent.engine.isWebKit();goog.userAgent.isMobile_=function(){return goog.userAgent.WEBKIT&&goog.labs.userAgent.util.matchUserAgent("Mobile")};goog.userAgent.MOBILE=goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.isMobile_();goog.userAgent.SAFARI=goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_=function(){var a=goog.userAgent.getNavigator();return a&&a.platform||""};goog.userAgent.PLATFORM=goog.userAgent.determinePlatform_();goog.userAgent.ASSUME_MAC=!1;goog.userAgent.ASSUME_WINDOWS=!1;goog.userAgent.ASSUME_LINUX=!1;goog.userAgent.ASSUME_X11=!1;goog.userAgent.ASSUME_ANDROID=!1;goog.userAgent.ASSUME_IPHONE=!1;goog.userAgent.ASSUME_IPAD=!1;
goog.userAgent.PLATFORM_KNOWN_=goog.userAgent.ASSUME_MAC||goog.userAgent.ASSUME_WINDOWS||goog.userAgent.ASSUME_LINUX||goog.userAgent.ASSUME_X11||goog.userAgent.ASSUME_ANDROID||goog.userAgent.ASSUME_IPHONE||goog.userAgent.ASSUME_IPAD;goog.userAgent.MAC=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_MAC:goog.labs.userAgent.platform.isMacintosh();goog.userAgent.WINDOWS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_WINDOWS:goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_=function(){return goog.labs.userAgent.platform.isLinux()||goog.labs.userAgent.platform.isChromeOS()};goog.userAgent.LINUX=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_LINUX:goog.userAgent.isLegacyLinux_();goog.userAgent.isX11_=function(){var a=goog.userAgent.getNavigator();return!!a&&goog.string.contains(a.appVersion||"","X11")};goog.userAgent.X11=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_X11:goog.userAgent.isX11_();
goog.userAgent.ANDROID=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_ANDROID:goog.labs.userAgent.platform.isAndroid();goog.userAgent.IPHONE=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPHONE:goog.labs.userAgent.platform.isIphone();goog.userAgent.IPAD=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPAD:goog.labs.userAgent.platform.isIpad();goog.userAgent.operaVersion_=function(){var a=goog.global.opera.version;try{return a()}catch(b){return a}};
goog.userAgent.determineVersion_=function(){if(goog.userAgent.OPERA&&goog.global.opera)return goog.userAgent.operaVersion_();var a="",b=goog.userAgent.getVersionRegexResult_();b&&(a=b?b[1]:"");return goog.userAgent.IE&&(b=goog.userAgent.getDocumentMode_(),b>parseFloat(a))?String(b):a};
goog.userAgent.getVersionRegexResult_=function(){var a=goog.userAgent.getUserAgentString();if(goog.userAgent.GECKO)return/rv\:([^\);]+)(\)|;)/.exec(a);if(goog.userAgent.EDGE)return/Edge\/([\d\.]+)/.exec(a);if(goog.userAgent.IE)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(goog.userAgent.WEBKIT)return/WebKit\/(\S+)/.exec(a)};goog.userAgent.getDocumentMode_=function(){var a=goog.global.document;return a?a.documentMode:void 0};goog.userAgent.VERSION=goog.userAgent.determineVersion_();
goog.userAgent.compare=function(a,b){return goog.string.compareVersions(a,b)};goog.userAgent.isVersionOrHigherCache_={};goog.userAgent.isVersionOrHigher=function(a){return goog.userAgent.ASSUME_ANY_VERSION||goog.userAgent.isVersionOrHigherCache_[a]||(goog.userAgent.isVersionOrHigherCache_[a]=0<=goog.string.compareVersions(goog.userAgent.VERSION,a))};goog.userAgent.isVersion=goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher=function(a){return Number(goog.userAgent.DOCUMENT_MODE)>=a};goog.userAgent.isDocumentMode=goog.userAgent.isDocumentModeOrHigher;goog.userAgent.DOCUMENT_MODE=function(){var a=goog.global.document,b=goog.userAgent.getDocumentMode_();return a&&goog.userAgent.IE?b||("CSS1Compat"==a.compatMode?parseInt(goog.userAgent.VERSION,10):5):void 0}();goog.userAgent.product={};goog.userAgent.product.ASSUME_FIREFOX=!1;goog.userAgent.product.ASSUME_IPHONE=!1;goog.userAgent.product.ASSUME_IPAD=!1;goog.userAgent.product.ASSUME_ANDROID=!1;goog.userAgent.product.ASSUME_CHROME=!1;goog.userAgent.product.ASSUME_SAFARI=!1;
goog.userAgent.product.PRODUCT_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_EDGE||goog.userAgent.ASSUME_OPERA||goog.userAgent.product.ASSUME_FIREFOX||goog.userAgent.product.ASSUME_IPHONE||goog.userAgent.product.ASSUME_IPAD||goog.userAgent.product.ASSUME_ANDROID||goog.userAgent.product.ASSUME_CHROME||goog.userAgent.product.ASSUME_SAFARI;goog.userAgent.product.OPERA=goog.userAgent.OPERA;goog.userAgent.product.IE=goog.userAgent.IE;goog.userAgent.product.EDGE=goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_FIREFOX:goog.labs.userAgent.browser.isFirefox();goog.userAgent.product.isIphoneOrIpod_=function(){return goog.labs.userAgent.platform.isIphone()||goog.labs.userAgent.platform.isIpod()};goog.userAgent.product.IPHONE=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPHONE:goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPAD:goog.labs.userAgent.platform.isIpad();goog.userAgent.product.ANDROID=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_ANDROID:goog.labs.userAgent.browser.isAndroidBrowser();goog.userAgent.product.CHROME=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_CHROME:goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_=function(){return goog.labs.userAgent.browser.isSafari()&&!goog.labs.userAgent.platform.isIos()};goog.userAgent.product.SAFARI=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_SAFARI:goog.userAgent.product.isSafariDesktop_();goog.crypt.base64={};goog.crypt.base64.byteToCharMap_=null;goog.crypt.base64.charToByteMap_=null;goog.crypt.base64.byteToCharMapWebSafe_=null;goog.crypt.base64.ENCODED_VALS_BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";goog.crypt.base64.ENCODED_VALS=goog.crypt.base64.ENCODED_VALS_BASE+"+/=";goog.crypt.base64.ENCODED_VALS_WEBSAFE=goog.crypt.base64.ENCODED_VALS_BASE+"-_.";
goog.crypt.base64.ASSUME_NATIVE_SUPPORT_=goog.userAgent.GECKO||goog.userAgent.WEBKIT&&!goog.userAgent.product.SAFARI||goog.userAgent.OPERA;goog.crypt.base64.HAS_NATIVE_ENCODE_=goog.crypt.base64.ASSUME_NATIVE_SUPPORT_||"function"==typeof goog.global.btoa;goog.crypt.base64.HAS_NATIVE_DECODE_=goog.crypt.base64.ASSUME_NATIVE_SUPPORT_||!goog.userAgent.product.SAFARI&&!goog.userAgent.IE&&"function"==typeof goog.global.atob;
goog.crypt.base64.encodeByteArray=function(a,b){goog.asserts.assert(goog.isArrayLike(a),"encodeByteArray takes an array as a parameter");goog.crypt.base64.init_();for(var c=b?goog.crypt.base64.byteToCharMapWebSafe_:goog.crypt.base64.byteToCharMap_,d=[],e=0;e<a.length;e+=3){var f=a[e],g=e+1<a.length,h=g?a[e+1]:0,k=e+2<a.length,l=k?a[e+2]:0,p=f>>2,f=(f&3)<<4|h>>4,h=(h&15)<<2|l>>6,l=l&63;k||(l=64,g||(h=64));d.push(c[p],c[f],c[h],c[l])}return d.join("")};
goog.crypt.base64.encodeString=function(a,b){return goog.crypt.base64.HAS_NATIVE_ENCODE_&&!b?goog.global.btoa(a):goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a),b)};goog.crypt.base64.decodeString=function(a,b){if(goog.crypt.base64.HAS_NATIVE_DECODE_&&!b)return goog.global.atob(a);var c="";goog.crypt.base64.decodeStringInternal_(a,function(a){c+=String.fromCharCode(a)});return c};
goog.crypt.base64.decodeStringToByteArray=function(a,b){var c=[];goog.crypt.base64.decodeStringInternal_(a,function(a){c.push(a)});return c};goog.crypt.base64.decodeStringToUint8Array=function(a){goog.asserts.assert(!goog.userAgent.IE||goog.userAgent.isVersionOrHigher("10"),"Browser does not support typed arrays");var b=new Uint8Array(Math.ceil(3*a.length/4)),c=0;goog.crypt.base64.decodeStringInternal_(a,function(a){b[c++]=a});return b.subarray(0,c)};
goog.crypt.base64.decodeStringInternal_=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=goog.crypt.base64.charToByteMap_[c];if(null!=e)return e;if(!goog.string.isEmptyOrWhitespace(c))throw Error("Unknown base64 encoding at char: "+c);}return b}goog.crypt.base64.init_();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),h=c(64);if(64===h&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=h&&b(g<<6&192|h))}};
goog.crypt.base64.init_=function(){if(!goog.crypt.base64.byteToCharMap_){goog.crypt.base64.byteToCharMap_={};goog.crypt.base64.charToByteMap_={};goog.crypt.base64.byteToCharMapWebSafe_={};for(var a=0;a<goog.crypt.base64.ENCODED_VALS.length;a++)goog.crypt.base64.byteToCharMap_[a]=goog.crypt.base64.ENCODED_VALS.charAt(a),goog.crypt.base64.charToByteMap_[goog.crypt.base64.byteToCharMap_[a]]=a,goog.crypt.base64.byteToCharMapWebSafe_[a]=goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(a),a>=goog.crypt.base64.ENCODED_VALS_BASE.length&&
(goog.crypt.base64.charToByteMap_[goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(a)]=a)}};jspb.ExtensionFieldInfo=function(a,b,c,d,e){this.fieldIndex=a;this.fieldName=b;this.ctor=c;this.toObjectFn=d;this.isRepeated=e};jspb.ExtensionFieldBinaryInfo=function(a,b,c,d,e,f){this.fieldInfo=a;this.binaryReaderFn=b;this.binaryWriterFn=c;this.binaryMessageSerializeFn=d;this.binaryMessageDeserializeFn=e;this.isPacked=f};jspb.ExtensionFieldInfo.prototype.isMessageType=function(){return!!this.ctor};jspb.Message=function(){};jspb.Message.GENERATE_TO_OBJECT=!0;jspb.Message.GENERATE_FROM_OBJECT=!goog.DISALLOW_TEST_ONLY_CODE;
jspb.Message.GENERATE_TO_STRING=!0;jspb.Message.ASSUME_LOCAL_ARRAYS=!1;jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS=!0;jspb.Message.SUPPORTS_UINT8ARRAY_="function"==typeof Uint8Array;jspb.Message.prototype.getJsPbMessageId=function(){return this.messageId_};jspb.Message.getIndex_=function(a,b){return b+a.arrayIndexOffset_};jspb.Message.getFieldNumber_=function(a,b){return b-a.arrayIndexOffset_};
jspb.Message.initialize=function(a,b,c,d,e,f){a.wrappers_=null;b||(b=c?[c]:[]);a.messageId_=c?String(c):void 0;a.arrayIndexOffset_=0===c?-1:0;a.array=b;jspb.Message.initPivotAndExtensionObject_(a,d);a.convertedFloatingPointFields_={};jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS||(a.repeatedFields=e);if(e)for(b=0;b<e.length;b++)c=e[b],c<a.pivot_?(c=jspb.Message.getIndex_(a,c),a.array[c]=a.array[c]||jspb.Message.EMPTY_LIST_SENTINEL_):(jspb.Message.maybeInitEmptyExtensionObject_(a),a.extensionObject_[c]=
a.extensionObject_[c]||jspb.Message.EMPTY_LIST_SENTINEL_);if(f&&f.length)for(b=0;b<f.length;b++)jspb.Message.computeOneofCase(a,f[b])};jspb.Message.EMPTY_LIST_SENTINEL_=goog.DEBUG&&Object.freeze?Object.freeze([]):[];jspb.Message.isArray_=function(a){return jspb.Message.ASSUME_LOCAL_ARRAYS?a instanceof Array:goog.isArray(a)};
jspb.Message.initPivotAndExtensionObject_=function(a,b){if(a.array.length){var c=a.array.length-1,d=a.array[c];if(d&&"object"==typeof d&&!jspb.Message.isArray_(d)&&!(jspb.Message.SUPPORTS_UINT8ARRAY_&&d instanceof Uint8Array)){a.pivot_=jspb.Message.getFieldNumber_(a,c);a.extensionObject_=d;return}}-1<b?(a.pivot_=b,a.extensionObject_=null):a.pivot_=Number.MAX_VALUE};
jspb.Message.maybeInitEmptyExtensionObject_=function(a){var b=jspb.Message.getIndex_(a,a.pivot_);a.array[b]||(a.extensionObject_=a.array[b]={})};jspb.Message.toObjectList=function(a,b,c){for(var d=[],e=0;e<a.length;e++)d[e]=b.call(a[e],c,a[e]);return d};
jspb.Message.toObjectExtension=function(a,b,c,d,e){for(var f in c){var g=c[f],h=d.call(a,g);if(null!=h){for(var k in g.fieldName)if(g.fieldName.hasOwnProperty(k))break;b[k]=g.toObjectFn?g.isRepeated?jspb.Message.toObjectList(h,g.toObjectFn,e):g.toObjectFn(e,h):h}}};
jspb.Message.serializeBinaryExtensions=function(a,b,c,d){for(var e in c){var f=c[e],g=f.fieldInfo;if(!f.binaryWriterFn)throw Error("Message extension present that was generated without binary serialization support");var h=d.call(a,g);if(null!=h)if(g.isMessageType())if(f.binaryMessageSerializeFn)f.binaryWriterFn.call(b,g.fieldIndex,h,f.binaryMessageSerializeFn);else throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
else f.binaryWriterFn.call(b,g.fieldIndex,h)}};jspb.Message.readBinaryExtension=function(a,b,c,d,e){var f=c[b.getFieldNumber()];if(f){c=f.fieldInfo;if(!f.binaryReaderFn)throw Error("Deserializing extension whose generated code does not support binary format");var g;c.isMessageType()?(g=new c.ctor,f.binaryReaderFn.call(b,g,f.binaryMessageDeserializeFn)):g=f.binaryReaderFn.call(b);c.isRepeated&&!f.isPacked?(b=d.call(a,c))?b.push(g):e.call(a,c,[g]):e.call(a,c,g)}else b.skipField()};
jspb.Message.getField=function(a,b){if(b<a.pivot_){var c=jspb.Message.getIndex_(a,b),d=a.array[c];return d===jspb.Message.EMPTY_LIST_SENTINEL_?a.array[c]=[]:d}if(a.extensionObject_)return d=a.extensionObject_[b],d===jspb.Message.EMPTY_LIST_SENTINEL_?a.extensionObject_[b]=[]:d};
jspb.Message.getRepeatedField=function(a,b){if(b<a.pivot_){var c=jspb.Message.getIndex_(a,b),d=a.array[c];return d===jspb.Message.EMPTY_LIST_SENTINEL_?a.array[c]=[]:d}d=a.extensionObject_[b];return d===jspb.Message.EMPTY_LIST_SENTINEL_?a.extensionObject_[b]=[]:d};jspb.Message.getOptionalFloatingPointField=function(a,b){var c=jspb.Message.getField(a,b);return null==c?c:+c};
jspb.Message.getRepeatedFloatingPointField=function(a,b){var c=jspb.Message.getRepeatedField(a,b);a.convertedFloatingPointFields_||(a.convertedFloatingPointFields_={});if(!a.convertedFloatingPointFields_[b]){for(var d=0;d<c.length;d++)c[d]=+c[d];a.convertedFloatingPointFields_[b]=!0}return c};
jspb.Message.bytesAsB64=function(a){if(null==a||goog.isString(a))return a;if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)return goog.crypt.base64.encodeByteArray(a);goog.asserts.fail("Cannot coerce to b64 string: "+goog.typeOf(a));return null};jspb.Message.bytesAsU8=function(a){if(null==a||a instanceof Uint8Array)return a;if(goog.isString(a))return goog.crypt.base64.decodeStringToUint8Array(a);goog.asserts.fail("Cannot coerce to Uint8Array: "+goog.typeOf(a));return null};
jspb.Message.bytesListAsB64=function(a){jspb.Message.assertConsistentTypes_(a);return!a.length||goog.isString(a[0])?a:goog.array.map(a,jspb.Message.bytesAsB64)};jspb.Message.bytesListAsU8=function(a){jspb.Message.assertConsistentTypes_(a);return!a.length||a[0]instanceof Uint8Array?a:goog.array.map(a,jspb.Message.bytesAsU8)};
jspb.Message.assertConsistentTypes_=function(a){if(goog.DEBUG&&a&&1<a.length){var b=goog.typeOf(a[0]);goog.array.forEach(a,function(a){goog.typeOf(a)!=b&&goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got "+goog.typeOf(a)+" expected "+b)})}};jspb.Message.getFieldWithDefault=function(a,b,c){a=jspb.Message.getField(a,b);return null==a?c:a};jspb.Message.getFieldProto3=jspb.Message.getFieldWithDefault;
jspb.Message.getMapField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});if(b in a.wrappers_)return a.wrappers_[b];if(!c)return c=jspb.Message.getField(a,b),c||(c=[],jspb.Message.setField(a,b,c)),a.wrappers_[b]=new jspb.Map(c,d)};jspb.Message.setField=function(a,b,c){b<a.pivot_?a.array[jspb.Message.getIndex_(a,b)]=c:(jspb.Message.maybeInitEmptyExtensionObject_(a),a.extensionObject_[b]=c)};jspb.Message.setProto3IntField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};
jspb.Message.setProto3StringIntField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,"0")};jspb.Message.setProto3FloatField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};jspb.Message.setProto3BooleanField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,!1)};jspb.Message.setProto3StringField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,"")};jspb.Message.setProto3BytesField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,"")};
jspb.Message.setProto3EnumField=function(a,b,c){jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};jspb.Message.setFieldIgnoringDefault_=function(a,b,c,d){c!=d?jspb.Message.setField(a,b,c):a.array[jspb.Message.getIndex_(a,b)]=null};jspb.Message.addToRepeatedField=function(a,b,c,d){a=jspb.Message.getRepeatedField(a,b);void 0!=d?a.splice(d,0,c):a.push(c)};
jspb.Message.setOneofField=function(a,b,c,d){(c=jspb.Message.computeOneofCase(a,c))&&c!==b&&void 0!==d&&(a.wrappers_&&c in a.wrappers_&&(a.wrappers_[c]=void 0),jspb.Message.setField(a,c,void 0));jspb.Message.setField(a,b,d)};jspb.Message.computeOneofCase=function(a,b){for(var c,d,e=0;e<b.length;e++){var f=b[e],g=jspb.Message.getField(a,f);null!=g&&(c=f,d=g,jspb.Message.setField(a,f,void 0))}return c?(jspb.Message.setField(a,c,d),c):0};
jspb.Message.getWrapperField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});if(!a.wrappers_[c]){var e=jspb.Message.getField(a,c);if(d||e)a.wrappers_[c]=new b(e)}return a.wrappers_[c]};jspb.Message.getRepeatedWrapperField=function(a,b,c){jspb.Message.wrapRepeatedField_(a,b,c);b=a.wrappers_[c];b==jspb.Message.EMPTY_LIST_SENTINEL_&&(b=a.wrappers_[c]=[]);return b};
jspb.Message.wrapRepeatedField_=function(a,b,c){a.wrappers_||(a.wrappers_={});if(!a.wrappers_[c]){for(var d=jspb.Message.getRepeatedField(a,c),e=[],f=0;f<d.length;f++)e[f]=new b(d[f]);a.wrappers_[c]=e}};jspb.Message.setWrapperField=function(a,b,c){a.wrappers_||(a.wrappers_={});var d=c?c.toArray():c;a.wrappers_[b]=c;jspb.Message.setField(a,b,d)};
jspb.Message.setOneofWrapperField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});var e=d?d.toArray():d;a.wrappers_[b]=d;jspb.Message.setOneofField(a,b,c,e)};jspb.Message.setRepeatedWrapperField=function(a,b,c){a.wrappers_||(a.wrappers_={});c=c||[];for(var d=[],e=0;e<c.length;e++)d[e]=c[e].toArray();a.wrappers_[b]=c;jspb.Message.setField(a,b,d)};
jspb.Message.addToRepeatedWrapperField=function(a,b,c,d,e){jspb.Message.wrapRepeatedField_(a,d,b);var f=a.wrappers_[b];f||(f=a.wrappers_[b]=[]);c=c?c:new d;a=jspb.Message.getRepeatedField(a,b);void 0!=e?(f.splice(e,0,c),a.splice(e,0,c.toArray())):(f.push(c),a.push(c.toArray()));return c};jspb.Message.toMap=function(a,b,c,d){for(var e={},f=0;f<a.length;f++)e[b.call(a[f])]=c?c.call(a[f],d,a[f]):a[f];return e};
jspb.Message.prototype.syncMapFields_=function(){if(this.wrappers_)for(var a in this.wrappers_){var b=this.wrappers_[a];if(goog.isArray(b))for(var c=0;c<b.length;c++)b[c]&&b[c].toArray();else b&&b.toArray()}};jspb.Message.prototype.toArray=function(){this.syncMapFields_();return this.array};jspb.Message.GENERATE_TO_STRING&&(jspb.Message.prototype.toString=function(){this.syncMapFields_();return this.array.toString()});
jspb.Message.prototype.getExtension=function(a){if(this.extensionObject_){this.wrappers_||(this.wrappers_={});var b=a.fieldIndex;if(a.isRepeated){if(a.isMessageType())return this.wrappers_[b]||(this.wrappers_[b]=goog.array.map(this.extensionObject_[b]||[],function(b){return new a.ctor(b)})),this.wrappers_[b]}else if(a.isMessageType())return!this.wrappers_[b]&&this.extensionObject_[b]&&(this.wrappers_[b]=new a.ctor(this.extensionObject_[b])),this.wrappers_[b];return this.extensionObject_[b]}};
jspb.Message.prototype.setExtension=function(a,b){this.wrappers_||(this.wrappers_={});jspb.Message.maybeInitEmptyExtensionObject_(this);var c=a.fieldIndex;a.isRepeated?(b=b||[],a.isMessageType()?(this.wrappers_[c]=b,this.extensionObject_[c]=goog.array.map(b,function(a){return a.toArray()})):this.extensionObject_[c]=b):a.isMessageType()?(this.wrappers_[c]=b,this.extensionObject_[c]=b?b.toArray():b):this.extensionObject_[c]=b;return this};
jspb.Message.difference=function(a,b){if(!(a instanceof b.constructor))throw Error("Messages have different types.");var c=a.toArray(),d=b.toArray(),e=[],f=0,g=c.length>d.length?c.length:d.length;a.getJsPbMessageId()&&(e[0]=a.getJsPbMessageId(),f=1);for(;f<g;f++)jspb.Message.compareFields(c[f],d[f])||(e[f]=d[f]);return new a.constructor(e)};jspb.Message.equals=function(a,b){return a==b||!(!a||!b)&&a instanceof b.constructor&&jspb.Message.compareFields(a.toArray(),b.toArray())};
jspb.Message.compareExtensions=function(a,b){a=a||{};b=b||{};var c={},d;for(d in a)c[d]=0;for(d in b)c[d]=0;for(d in c)if(!jspb.Message.compareFields(a[d],b[d]))return!1;return!0};
jspb.Message.compareFields=function(a,b){if(a==b)return!0;if(!goog.isObject(a)||!goog.isObject(b))return goog.isNumber(a)&&isNaN(a)||goog.isNumber(b)&&isNaN(b)?String(a)==String(b):!1;if(a.constructor!=b.constructor)return!1;if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a.constructor===Uint8Array){if(a.length!=b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!=b[c])return!1;return!0}if(a.constructor===Array){for(var d=void 0,e=void 0,f=Math.max(a.length,b.length),c=0;c<f;c++){var g=a[c],h=b[c];g&&g.constructor==
Object&&(goog.asserts.assert(void 0===d),goog.asserts.assert(c===a.length-1),d=g,g=void 0);h&&h.constructor==Object&&(goog.asserts.assert(void 0===e),goog.asserts.assert(c===b.length-1),e=h,h=void 0);if(!jspb.Message.compareFields(g,h))return!1}return d||e?(d=d||{},e=e||{},jspb.Message.compareExtensions(d,e)):!0}if(a.constructor===Object)return jspb.Message.compareExtensions(a,b);throw Error("Invalid type in JSPB array");};jspb.Message.prototype.cloneMessage=function(){return jspb.Message.cloneMessage(this)};
jspb.Message.prototype.clone=function(){return jspb.Message.cloneMessage(this)};jspb.Message.clone=function(a){return jspb.Message.cloneMessage(a)};jspb.Message.cloneMessage=function(a){return new a.constructor(jspb.Message.clone_(a.toArray()))};
jspb.Message.copyInto=function(a,b){goog.asserts.assertInstanceof(a,jspb.Message);goog.asserts.assertInstanceof(b,jspb.Message);goog.asserts.assert(a.constructor==b.constructor,"Copy source and target message should have the same type.");for(var c=jspb.Message.clone(a),d=b.toArray(),e=c.toArray(),f=d.length=0;f<e.length;f++)d[f]=e[f];b.wrappers_=c.wrappers_;b.extensionObject_=c.extensionObject_};
jspb.Message.clone_=function(a){var b;if(goog.isArray(a)){for(var c=Array(a.length),d=0;d<a.length;d++)b=a[d],null!=b&&(c[d]="object"==typeof b?jspb.Message.clone_(goog.asserts.assert(b)):b);return c}if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)return new Uint8Array(a);c={};for(d in a)b=a[d],null!=b&&(c[d]="object"==typeof b?jspb.Message.clone_(goog.asserts.assert(b)):b);return c};jspb.Message.registerMessageType=function(a,b){jspb.Message.registry_[a]=b;b.messageId=a};
jspb.Message.registry_={};jspb.Message.messageSetExtensions={};jspb.Message.messageSetExtensionsBinary={};jspb.arith={};jspb.arith.UInt64=function(a,b){this.lo=a;this.hi=b};jspb.arith.UInt64.prototype.cmp=function(a){return this.hi<a.hi||this.hi==a.hi&&this.lo<a.lo?-1:this.hi==a.hi&&this.lo==a.lo?0:1};jspb.arith.UInt64.prototype.rightShift=function(){return new jspb.arith.UInt64((this.lo>>>1|(this.hi&1)<<31)>>>0,this.hi>>>1>>>0)};jspb.arith.UInt64.prototype.leftShift=function(){return new jspb.arith.UInt64(this.lo<<1>>>0,(this.hi<<1|this.lo>>>31)>>>0)};
jspb.arith.UInt64.prototype.msb=function(){return!!(this.hi&2147483648)};jspb.arith.UInt64.prototype.lsb=function(){return!!(this.lo&1)};jspb.arith.UInt64.prototype.zero=function(){return 0==this.lo&&0==this.hi};jspb.arith.UInt64.prototype.add=function(a){return new jspb.arith.UInt64((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};
jspb.arith.UInt64.prototype.sub=function(a){return new jspb.arith.UInt64((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};jspb.arith.UInt64.mul32x32=function(a,b){for(var c=a&65535,d=a>>>16,e=b&65535,f=b>>>16,g=c*e+65536*(c*f&65535)+65536*(d*e&65535),c=d*f+(c*f>>>16)+(d*e>>>16);4294967296<=g;)g-=4294967296,c+=1;return new jspb.arith.UInt64(g>>>0,c>>>0)};
jspb.arith.UInt64.prototype.mul=function(a){var b=jspb.arith.UInt64.mul32x32(this.lo,a);a=jspb.arith.UInt64.mul32x32(this.hi,a);a.hi=a.lo;a.lo=0;return b.add(a)};
jspb.arith.UInt64.prototype.div=function(a){if(0==a)return[];var b=new jspb.arith.UInt64(0,0),c=new jspb.arith.UInt64(this.lo,this.hi);a=new jspb.arith.UInt64(a,0);for(var d=new jspb.arith.UInt64(1,0);!a.msb();)a=a.leftShift(),d=d.leftShift();for(;!d.zero();)0>=a.cmp(c)&&(b=b.add(d),c=c.sub(a)),a=a.rightShift(),d=d.rightShift();return[b,c]};jspb.arith.UInt64.prototype.toString=function(){for(var a="",b=this;!b.zero();)var b=b.div(10),c=b[0],a=b[1].lo+a,b=c;""==a&&(a="0");return a};
jspb.arith.UInt64.fromString=function(a){for(var b=new jspb.arith.UInt64(0,0),c=new jspb.arith.UInt64(0,0),d=0;d<a.length;d++){if("0">a[d]||"9"<a[d])return null;var e=parseInt(a[d],10);c.lo=e;b=b.mul(10).add(c)}return b};jspb.arith.UInt64.prototype.clone=function(){return new jspb.arith.UInt64(this.lo,this.hi)};jspb.arith.Int64=function(a,b){this.lo=a;this.hi=b};
jspb.arith.Int64.prototype.add=function(a){return new jspb.arith.Int64((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};jspb.arith.Int64.prototype.sub=function(a){return new jspb.arith.Int64((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};jspb.arith.Int64.prototype.clone=function(){return new jspb.arith.Int64(this.lo,this.hi)};
jspb.arith.Int64.prototype.toString=function(){var a=0!=(this.hi&2147483648),b=new jspb.arith.UInt64(this.lo,this.hi);a&&(b=(new jspb.arith.UInt64(0,0)).sub(b));return(a?"-":"")+b.toString()};jspb.arith.Int64.fromString=function(a){var b=0<a.length&&"-"==a[0];b&&(a=a.substring(1));a=jspb.arith.UInt64.fromString(a);if(null===a)return null;b&&(a=(new jspb.arith.UInt64(0,0)).sub(a));return new jspb.arith.Int64(a.lo,a.hi)};jspb.BinaryConstants={};jspb.ConstBinaryMessage=function(){};jspb.BinaryMessage=function(){};jspb.BinaryConstants.FieldType={INVALID:-1,DOUBLE:1,FLOAT:2,INT64:3,UINT64:4,INT32:5,FIXED64:6,FIXED32:7,BOOL:8,STRING:9,GROUP:10,MESSAGE:11,BYTES:12,UINT32:13,ENUM:14,SFIXED32:15,SFIXED64:16,SINT32:17,SINT64:18,FHASH64:30,VHASH64:31};jspb.BinaryConstants.WireType={INVALID:-1,VARINT:0,FIXED64:1,DELIMITED:2,START_GROUP:3,END_GROUP:4,FIXED32:5};
jspb.BinaryConstants.FieldTypeToWireType=function(a){var b=jspb.BinaryConstants.FieldType,c=jspb.BinaryConstants.WireType;switch(a){case b.INT32:case b.INT64:case b.UINT32:case b.UINT64:case b.SINT32:case b.SINT64:case b.BOOL:case b.ENUM:case b.VHASH64:return c.VARINT;case b.DOUBLE:case b.FIXED64:case b.SFIXED64:case b.FHASH64:return c.FIXED64;case b.STRING:case b.MESSAGE:case b.BYTES:return c.DELIMITED;case b.FLOAT:case b.FIXED32:case b.SFIXED32:return c.FIXED32;default:return c.INVALID}};
jspb.BinaryConstants.INVALID_FIELD_NUMBER=-1;jspb.BinaryConstants.FLOAT32_EPS=1.401298464324817E-45;jspb.BinaryConstants.FLOAT32_MIN=1.1754943508222875E-38;jspb.BinaryConstants.FLOAT32_MAX=3.4028234663852886E38;jspb.BinaryConstants.FLOAT64_EPS=4.9E-324;jspb.BinaryConstants.FLOAT64_MIN=2.2250738585072014E-308;jspb.BinaryConstants.FLOAT64_MAX=1.7976931348623157E308;jspb.BinaryConstants.TWO_TO_20=1048576;jspb.BinaryConstants.TWO_TO_23=8388608;jspb.BinaryConstants.TWO_TO_31=2147483648;
jspb.BinaryConstants.TWO_TO_32=4294967296;jspb.BinaryConstants.TWO_TO_52=4503599627370496;jspb.BinaryConstants.TWO_TO_63=0x7fffffffffffffff;jspb.BinaryConstants.TWO_TO_64=1.8446744073709552E19;jspb.BinaryConstants.ZERO_HASH="\x00\x00\x00\x00\x00\x00\x00\x00";jspb.utils={};jspb.utils.split64Low=0;jspb.utils.split64High=0;jspb.utils.splitUint64=function(a){var b=a>>>0;a=Math.floor((a-b)/jspb.BinaryConstants.TWO_TO_32)>>>0;jspb.utils.split64Low=b;jspb.utils.split64High=a};jspb.utils.splitInt64=function(a){var b=0>a;a=Math.abs(a);var c=a>>>0;a=Math.floor((a-c)/jspb.BinaryConstants.TWO_TO_32);a>>>=0;b&&(a=~a>>>0,c=(~c>>>0)+1,4294967295<c&&(c=0,a++,4294967295<a&&(a=0)));jspb.utils.split64Low=c;jspb.utils.split64High=a};
jspb.utils.splitZigzag64=function(a){var b=0>a;a=2*Math.abs(a);jspb.utils.splitUint64(a);a=jspb.utils.split64Low;var c=jspb.utils.split64High;b&&(0==a?0==c?c=a=4294967295:(c--,a=4294967295):a--);jspb.utils.split64Low=a;jspb.utils.split64High=c};
jspb.utils.splitFloat32=function(a){var b=0>a?1:0;a=b?-a:a;var c;0===a?0<1/a?(jspb.utils.split64High=0,jspb.utils.split64Low=0):(jspb.utils.split64High=0,jspb.utils.split64Low=2147483648):isNaN(a)?(jspb.utils.split64High=0,jspb.utils.split64Low=2147483647):a>jspb.BinaryConstants.FLOAT32_MAX?(jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|2139095040)>>>0):a<jspb.BinaryConstants.FLOAT32_MIN?(a=Math.round(a/Math.pow(2,-149)),jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|a)>>>0):(c=Math.floor(Math.log(a)/
Math.LN2),a*=Math.pow(2,-c),a=Math.round(a*jspb.BinaryConstants.TWO_TO_23)&8388607,jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|c+127<<23|a)>>>0)};
jspb.utils.splitFloat64=function(a){var b=0>a?1:0;a=b?-a:a;if(0===a)jspb.utils.split64High=0<1/a?0:2147483648,jspb.utils.split64Low=0;else if(isNaN(a))jspb.utils.split64High=2147483647,jspb.utils.split64Low=4294967295;else if(a>jspb.BinaryConstants.FLOAT64_MAX)jspb.utils.split64High=(b<<31|2146435072)>>>0,jspb.utils.split64Low=0;else if(a<jspb.BinaryConstants.FLOAT64_MIN){var c=a/Math.pow(2,-1074);a=c/jspb.BinaryConstants.TWO_TO_32;jspb.utils.split64High=(b<<31|a)>>>0;jspb.utils.split64Low=c>>>0}else{var d=
Math.floor(Math.log(a)/Math.LN2);1024==d&&(d=1023);c=a*Math.pow(2,-d);a=c*jspb.BinaryConstants.TWO_TO_20&1048575;c=c*jspb.BinaryConstants.TWO_TO_52>>>0;jspb.utils.split64High=(b<<31|d+1023<<20|a)>>>0;jspb.utils.split64Low=c}};
jspb.utils.splitHash64=function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=a.charCodeAt(4),g=a.charCodeAt(5),h=a.charCodeAt(6);a=a.charCodeAt(7);jspb.utils.split64Low=b+(c<<8)+(d<<16)+(e<<24)>>>0;jspb.utils.split64High=f+(g<<8)+(h<<16)+(a<<24)>>>0};jspb.utils.joinUint64=function(a,b){return b*jspb.BinaryConstants.TWO_TO_32+a};
jspb.utils.joinInt64=function(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b>>>0,0==a&&(b=b+1>>>0));var d=jspb.utils.joinUint64(a,b);return c?-d:d};jspb.utils.joinZigzag64=function(a,b){var c=a&1;a=(a>>>1|b<<31)>>>0;b>>>=1;c&&(a=a+1>>>0,0==a&&(b=b+1>>>0));var d=jspb.utils.joinUint64(a,b);return c?-d:d};jspb.utils.joinFloat32=function(a,b){var c=2*(a>>31)+1,d=a>>>23&255,e=a&8388607;return 255==d?e?NaN:Infinity*c:0==d?c*Math.pow(2,-149)*e:c*Math.pow(2,d-150)*(e+Math.pow(2,23))};
jspb.utils.joinFloat64=function(a,b){var c=2*(b>>31)+1,d=b>>>20&2047,e=jspb.BinaryConstants.TWO_TO_32*(b&1048575)+a;return 2047==d?e?NaN:Infinity*c:0==d?c*Math.pow(2,-1074)*e:c*Math.pow(2,d-1075)*(e+jspb.BinaryConstants.TWO_TO_52)};jspb.utils.joinHash64=function(a,b){return String.fromCharCode(a>>>0&255,a>>>8&255,a>>>16&255,a>>>24&255,b>>>0&255,b>>>8&255,b>>>16&255,b>>>24&255)};jspb.utils.DIGITS="0123456789abcdef".split("");
jspb.utils.joinUnsignedDecimalString=function(a,b){function c(a){for(var b=1E7,c=0;7>c;c++){var b=b/10,d=a/b%10>>>0;if(0!=d||h)h=!0,k+=g[d]}}if(2097151>=b)return""+(jspb.BinaryConstants.TWO_TO_32*b+a);var d=(a>>>24|b<<8)>>>0&16777215,e=b>>16&65535,f=(a&16777215)+6777216*d+6710656*e,d=d+8147497*e,e=2*e;1E7<=f&&(d+=Math.floor(f/1E7),f%=1E7);1E7<=d&&(e+=Math.floor(d/1E7),d%=1E7);var g=jspb.utils.DIGITS,h=!1,k="";(e||h)&&c(e);(d||h)&&c(d);(f||h)&&c(f);return k};
jspb.utils.joinSignedDecimalString=function(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b+(0==a?1:0)>>>0);var d=jspb.utils.joinUnsignedDecimalString(a,b);return c?"-"+d:d};jspb.utils.hash64ToDecimalString=function(a,b){jspb.utils.splitHash64(a);var c=jspb.utils.split64Low,d=jspb.utils.split64High;return b?jspb.utils.joinSignedDecimalString(c,d):jspb.utils.joinUnsignedDecimalString(c,d)};
jspb.utils.hash64ArrayToDecimalStrings=function(a,b){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=jspb.utils.hash64ToDecimalString(a[d],b);return c};
jspb.utils.decimalStringToHash64=function(a){function b(a,b){for(var c=0;8>c&&(1!==a||0<b);c++){var d=a*e[c]+b;e[c]=d&255;b=d>>>8}}function c(){for(var a=0;8>a;a++)e[a]=~e[a]&255}goog.asserts.assert(0<a.length);var d=!1;"-"===a[0]&&(d=!0,a=a.slice(1));for(var e=[0,0,0,0,0,0,0,0],f=0;f<a.length;f++)b(10,jspb.utils.DIGITS.indexOf(a[f]));d&&(c(),b(1,1));return goog.crypt.byteArrayToString(e)};jspb.utils.splitDecimalString=function(a){jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a))};
jspb.utils.hash64ToHexString=function(a){var b=Array(18);b[0]="0";b[1]="x";for(var c=0;8>c;c++){var d=a.charCodeAt(7-c);b[2*c+2]=jspb.utils.DIGITS[d>>4];b[2*c+3]=jspb.utils.DIGITS[d&15]}return b.join("")};jspb.utils.hexStringToHash64=function(a){a=a.toLowerCase();goog.asserts.assert(18==a.length);goog.asserts.assert("0"==a[0]);goog.asserts.assert("x"==a[1]);for(var b="",c=0;8>c;c++)var d=jspb.utils.DIGITS.indexOf(a[2*c+2]),e=jspb.utils.DIGITS.indexOf(a[2*c+3]),b=String.fromCharCode(16*d+e)+b;return b};
jspb.utils.hash64ToNumber=function(a,b){jspb.utils.splitHash64(a);var c=jspb.utils.split64Low,d=jspb.utils.split64High;return b?jspb.utils.joinInt64(c,d):jspb.utils.joinUint64(c,d)};jspb.utils.numberToHash64=function(a){jspb.utils.splitInt64(a);return jspb.utils.joinHash64(jspb.utils.split64Low,jspb.utils.split64High)};jspb.utils.countVarints=function(a,b,c){for(var d=0,e=b;e<c;e++)d+=a[e]>>7;return c-b-d};
jspb.utils.countVarintFields=function(a,b,c,d){var e=0;d=8*d+jspb.BinaryConstants.WireType.VARINT;if(128>d)for(;b<c&&a[b++]==d;)for(e++;;){var f=a[b++];if(0==(f&128))break}else for(;b<c;){for(f=d;128<f;){if(a[b]!=(f&127|128))return e;b++;f>>=7}if(a[b++]!=f)break;for(e++;f=a[b++],0!=(f&128););}return e};jspb.utils.countFixedFields_=function(a,b,c,d,e){var f=0;if(128>d)for(;b<c&&a[b++]==d;)f++,b+=e;else for(;b<c;){for(var g=d;128<g;){if(a[b++]!=(g&127|128))return f;g>>=7}if(a[b++]!=g)break;f++;b+=e}return f};
jspb.utils.countFixed32Fields=function(a,b,c,d){return jspb.utils.countFixedFields_(a,b,c,8*d+jspb.BinaryConstants.WireType.FIXED32,4)};jspb.utils.countFixed64Fields=function(a,b,c,d){return jspb.utils.countFixedFields_(a,b,c,8*d+jspb.BinaryConstants.WireType.FIXED64,8)};
jspb.utils.countDelimitedFields=function(a,b,c,d){var e=0;for(d=8*d+jspb.BinaryConstants.WireType.DELIMITED;b<c;){for(var f=d;128<f;){if(a[b++]!=(f&127|128))return e;f>>=7}if(a[b++]!=f)break;e++;for(var g=0,h=1;f=a[b++],g+=(f&127)*h,h*=128,0!=(f&128););b+=g}return e};jspb.utils.debugBytesToTextFormat=function(a){var b='"';if(a){a=jspb.utils.byteSourceToUint8Array(a);for(var c=0;c<a.length;c++)b+="\\x",16>a[c]&&(b+="0"),b+=a[c].toString(16)}return b+'"'};
jspb.utils.debugScalarToTextFormat=function(a){return goog.isString(a)?goog.string.quote(a):a.toString()};jspb.utils.stringToByteArray=function(a){for(var b=new Uint8Array(a.length),c=0;c<a.length;c++){var d=a.charCodeAt(c);if(255<d)throw Error("Conversion error: string contains codepoint outside of byte range");b[c]=d}return b};
jspb.utils.byteSourceToUint8Array=function(a){if(a.constructor===Uint8Array)return a;if(a.constructor===ArrayBuffer||a.constructor===Buffer||a.constructor===Array)return new Uint8Array(a);if(a.constructor===String)return goog.crypt.base64.decodeStringToUint8Array(a);goog.asserts.fail("Type not convertible to Uint8Array.");return new Uint8Array(0)};jspb.BinaryEncoder=function(){this.buffer_=[]};jspb.BinaryEncoder.prototype.length=function(){return this.buffer_.length};jspb.BinaryEncoder.prototype.end=function(){var a=this.buffer_;this.buffer_=[];return a};
jspb.BinaryEncoder.prototype.writeSplitVarint64=function(a,b){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(b==Math.floor(b));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);for(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32);0<b||127<a;)this.buffer_.push(a&127|128),a=(a>>>7|b<<25)>>>0,b>>>=7;this.buffer_.push(a)};
jspb.BinaryEncoder.prototype.writeSplitFixed64=function(a,b){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(b==Math.floor(b));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32);this.writeUint32(a);this.writeUint32(b)};
jspb.BinaryEncoder.prototype.writeUnsignedVarint32=function(a){goog.asserts.assert(a==Math.floor(a));for(goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);127<a;)this.buffer_.push(a&127|128),a>>>=7;this.buffer_.push(a)};
jspb.BinaryEncoder.prototype.writeSignedVarint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);if(0<=a)this.writeUnsignedVarint32(a);else{for(var b=0;9>b;b++)this.buffer_.push(a&127|128),a>>=7;this.buffer_.push(1)}};
jspb.BinaryEncoder.prototype.writeUnsignedVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_64);jspb.utils.splitInt64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeSignedVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitInt64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeZigzagVarint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.writeUnsignedVarint32((a<<1^a>>31)>>>0)};jspb.BinaryEncoder.prototype.writeZigzagVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitZigzag64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeZigzagVarint64String=function(a){this.writeZigzagVarint64(parseInt(a,10))};jspb.BinaryEncoder.prototype.writeUint8=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&256>a);this.buffer_.push(a>>>0&255)};jspb.BinaryEncoder.prototype.writeUint16=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&65536>a);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255)};
jspb.BinaryEncoder.prototype.writeUint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);this.buffer_.push(a>>>16&255);this.buffer_.push(a>>>24&255)};jspb.BinaryEncoder.prototype.writeUint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_64);jspb.utils.splitUint64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeInt8=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(-128<=a&&128>a);this.buffer_.push(a>>>0&255)};jspb.BinaryEncoder.prototype.writeInt16=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(-32768<=a&&32768>a);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255)};
jspb.BinaryEncoder.prototype.writeInt32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);this.buffer_.push(a>>>16&255);this.buffer_.push(a>>>24&255)};
jspb.BinaryEncoder.prototype.writeInt64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitInt64(a);this.writeSplitFixed64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeInt64String=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(+a>=-jspb.BinaryConstants.TWO_TO_63&&+a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));this.writeSplitFixed64(jspb.utils.split64Low,jspb.utils.split64High)};jspb.BinaryEncoder.prototype.writeFloat=function(a){goog.asserts.assert(a>=-jspb.BinaryConstants.FLOAT32_MAX&&a<=jspb.BinaryConstants.FLOAT32_MAX);jspb.utils.splitFloat32(a);this.writeUint32(jspb.utils.split64Low)};
jspb.BinaryEncoder.prototype.writeDouble=function(a){goog.asserts.assert(a>=-jspb.BinaryConstants.FLOAT64_MAX&&a<=jspb.BinaryConstants.FLOAT64_MAX);jspb.utils.splitFloat64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};jspb.BinaryEncoder.prototype.writeBool=function(a){goog.asserts.assert(goog.isBoolean(a)||goog.isNumber(a));this.buffer_.push(a?1:0)};
jspb.BinaryEncoder.prototype.writeEnum=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.writeSignedVarint32(a)};jspb.BinaryEncoder.prototype.writeBytes=function(a){this.buffer_.push.apply(this.buffer_,a)};jspb.BinaryEncoder.prototype.writeVarintHash64=function(a){jspb.utils.splitHash64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeFixedHash64=function(a){jspb.utils.splitHash64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeString=function(a){for(var b=this.buffer_.length,c=0;c<a.length;c++){var d=a.charCodeAt(c);if(128>d)this.buffer_.push(d);else if(2048>d)this.buffer_.push(d>>6|192),this.buffer_.push(d&63|128);else if(65536>d)if(55296<=d&&56319>=d&&c+1<a.length){var e=a.charCodeAt(c+1);56320<=e&&57343>=e&&(d=1024*(d-55296)+e-56320+65536,this.buffer_.push(d>>18|240),this.buffer_.push(d>>12&63|128),this.buffer_.push(d>>6&63|128),this.buffer_.push(d&63|128),c++)}else this.buffer_.push(d>>
12|224),this.buffer_.push(d>>6&63|128),this.buffer_.push(d&63|128)}return this.buffer_.length-b};jspb.BinaryWriter=function(){this.blocks_=[];this.totalLength_=0;this.encoder_=new jspb.BinaryEncoder;this.bookmarks_=[]};jspb.BinaryWriter.prototype.appendUint8Array_=function(a){var b=this.encoder_.end();this.blocks_.push(b);this.blocks_.push(a);this.totalLength_+=b.length+a.length};
jspb.BinaryWriter.prototype.beginDelimited_=function(a){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);a=this.encoder_.end();this.blocks_.push(a);this.totalLength_+=a.length;a.push(this.totalLength_);return a};jspb.BinaryWriter.prototype.endDelimited_=function(a){var b=a.pop(),b=this.totalLength_+this.encoder_.length()-b;for(goog.asserts.assert(0<=b);127<b;)a.push(b&127|128),b>>>=7,this.totalLength_++;a.push(b);this.totalLength_++};
jspb.BinaryWriter.prototype.writeSerializedMessage=function(a,b,c){this.appendUint8Array_(a.subarray(b,c))};jspb.BinaryWriter.prototype.maybeWriteSerializedMessage=function(a,b,c){null!=a&&null!=b&&null!=c&&this.writeSerializedMessage(a,b,c)};jspb.BinaryWriter.prototype.reset=function(){this.blocks_=[];this.encoder_.end();this.totalLength_=0;this.bookmarks_=[]};
jspb.BinaryWriter.prototype.getResultBuffer=function(){goog.asserts.assert(0==this.bookmarks_.length);for(var a=new Uint8Array(this.totalLength_+this.encoder_.length()),b=this.blocks_,c=b.length,d=0,e=0;e<c;e++){var f=b[e];a.set(f,d);d+=f.length}b=this.encoder_.end();a.set(b,d);d+=b.length;goog.asserts.assert(d==a.length);this.blocks_=[a];return a};jspb.BinaryWriter.prototype.getResultBase64String=function(a){return goog.crypt.base64.encodeByteArray(this.getResultBuffer(),a)};
jspb.BinaryWriter.prototype.beginSubMessage=function(a){this.bookmarks_.push(this.beginDelimited_(a))};jspb.BinaryWriter.prototype.endSubMessage=function(){goog.asserts.assert(0<=this.bookmarks_.length);this.endDelimited_(this.bookmarks_.pop())};jspb.BinaryWriter.prototype.writeFieldHeader_=function(a,b){goog.asserts.assert(1<=a&&a==Math.floor(a));this.encoder_.writeUnsignedVarint32(8*a+b)};
jspb.BinaryWriter.prototype.writeAny=function(a,b,c){var d=jspb.BinaryConstants.FieldType;switch(a){case d.DOUBLE:this.writeDouble(b,c);break;case d.FLOAT:this.writeFloat(b,c);break;case d.INT64:this.writeInt64(b,c);break;case d.UINT64:this.writeUint64(b,c);break;case d.INT32:this.writeInt32(b,c);break;case d.FIXED64:this.writeFixed64(b,c);break;case d.FIXED32:this.writeFixed32(b,c);break;case d.BOOL:this.writeBool(b,c);break;case d.STRING:this.writeString(b,c);break;case d.GROUP:goog.asserts.fail("Group field type not supported in writeAny()");
break;case d.MESSAGE:goog.asserts.fail("Message field type not supported in writeAny()");break;case d.BYTES:this.writeBytes(b,c);break;case d.UINT32:this.writeUint32(b,c);break;case d.ENUM:this.writeEnum(b,c);break;case d.SFIXED32:this.writeSfixed32(b,c);break;case d.SFIXED64:this.writeSfixed64(b,c);break;case d.SINT32:this.writeSint32(b,c);break;case d.SINT64:this.writeSint64(b,c);break;case d.FHASH64:this.writeFixedHash64(b,c);break;case d.VHASH64:this.writeVarintHash64(b,c);break;default:goog.asserts.fail("Invalid field type in writeAny()")}};
jspb.BinaryWriter.prototype.writeUnsignedVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeUnsignedVarint32(b))};jspb.BinaryWriter.prototype.writeSignedVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(b))};jspb.BinaryWriter.prototype.writeUnsignedVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeUnsignedVarint64(b))};
jspb.BinaryWriter.prototype.writeSignedVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint64(b))};jspb.BinaryWriter.prototype.writeZigzagVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint32(b))};jspb.BinaryWriter.prototype.writeZigzagVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint64(b))};
jspb.BinaryWriter.prototype.writeZigzagVarint64String_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint64String(b))};jspb.BinaryWriter.prototype.writeInt32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeSignedVarint32_(a,b))};
jspb.BinaryWriter.prototype.writeInt32String=function(a,b){if(null!=b){var c=parseInt(b,10);goog.asserts.assert(c>=-jspb.BinaryConstants.TWO_TO_31&&c<jspb.BinaryConstants.TWO_TO_31);this.writeSignedVarint32_(a,c)}};jspb.BinaryWriter.prototype.writeInt64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeSignedVarint64_(a,b))};
jspb.BinaryWriter.prototype.writeInt64String=function(a,b){if(null!=b){var c=jspb.arith.Int64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT);this.encoder_.writeSplitVarint64(c.lo,c.hi)}};jspb.BinaryWriter.prototype.writeUint32=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeUnsignedVarint32_(a,b))};
jspb.BinaryWriter.prototype.writeUint32String=function(a,b){if(null!=b){var c=parseInt(b,10);goog.asserts.assert(0<=c&&c<jspb.BinaryConstants.TWO_TO_32);this.writeUnsignedVarint32_(a,c)}};jspb.BinaryWriter.prototype.writeUint64=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_64),this.writeUnsignedVarint64_(a,b))};
jspb.BinaryWriter.prototype.writeUint64String=function(a,b){if(null!=b){var c=jspb.arith.UInt64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT);this.encoder_.writeSplitVarint64(c.lo,c.hi)}};jspb.BinaryWriter.prototype.writeSint32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeZigzagVarint32_(a,b))};
jspb.BinaryWriter.prototype.writeSint64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeZigzagVarint64_(a,b))};jspb.BinaryWriter.prototype.writeSint64String=function(a,b){null!=b&&(goog.asserts.assert(+b>=-jspb.BinaryConstants.TWO_TO_63&&+b<jspb.BinaryConstants.TWO_TO_63),this.writeZigzagVarint64String_(a,b))};
jspb.BinaryWriter.prototype.writeFixed32=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeUint32(b))};jspb.BinaryWriter.prototype.writeFixed64=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_64),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeUint64(b))};
jspb.BinaryWriter.prototype.writeFixed64String=function(a,b){if(null!=b){var c=jspb.arith.UInt64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64);this.encoder_.writeSplitFixed64(c.lo,c.hi)}};jspb.BinaryWriter.prototype.writeSfixed32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeInt32(b))};
jspb.BinaryWriter.prototype.writeSfixed64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeInt64(b))};jspb.BinaryWriter.prototype.writeSfixed64String=function(a,b){if(null!=b){var c=jspb.arith.Int64.fromString(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64);this.encoder_.writeSplitFixed64(c.lo,c.hi)}};
jspb.BinaryWriter.prototype.writeFloat=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeFloat(b))};jspb.BinaryWriter.prototype.writeDouble=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeDouble(b))};jspb.BinaryWriter.prototype.writeBool=function(a,b){null!=b&&(goog.asserts.assert(goog.isBoolean(b)||goog.isNumber(b)),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeBool(b))};
jspb.BinaryWriter.prototype.writeEnum=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(b))};jspb.BinaryWriter.prototype.writeString=function(a,b){if(null!=b){var c=this.beginDelimited_(a);this.encoder_.writeString(b);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writeBytes=function(a,b){if(null!=b){var c=jspb.utils.byteSourceToUint8Array(b);this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(c.length);this.appendUint8Array_(c)}};jspb.BinaryWriter.prototype.writeMessage=function(a,b,c){null!=b&&(a=this.beginDelimited_(a),c(b,this),this.endDelimited_(a))};
jspb.BinaryWriter.prototype.writeGroup=function(a,b,c){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.START_GROUP),c(b,this),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.END_GROUP))};jspb.BinaryWriter.prototype.writeFixedHash64=function(a,b){null!=b&&(goog.asserts.assert(8==b.length),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeFixedHash64(b))};
jspb.BinaryWriter.prototype.writeVarintHash64=function(a,b){null!=b&&(goog.asserts.assert(8==b.length),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeVarintHash64(b))};jspb.BinaryWriter.prototype.writeRepeatedInt32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSignedVarint32_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedInt32String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeInt32String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedInt64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSignedVarint64_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedInt64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeInt64String(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUnsignedVarint32_(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedUint32String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUint32String(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUnsignedVarint64_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUint64String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedSint32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint32_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSint64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint64_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSint64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint64String_(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedFixed32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed32(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedFixed64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed64(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedFixed64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed64String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedSfixed32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed32(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSfixed64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed64(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSfixed64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed64String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedFloat=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFloat(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedDouble=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeDouble(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedBool=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeBool(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedEnum=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeEnum(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedString=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeString(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedBytes=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeBytes(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedMessage=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++){var e=this.beginDelimited_(a);c(b[d],this);this.endDelimited_(e)}};
jspb.BinaryWriter.prototype.writeRepeatedGroup=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++)this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.START_GROUP),c(b[d],this),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.END_GROUP)};jspb.BinaryWriter.prototype.writeRepeatedFixedHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixedHash64(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedVarintHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeVarintHash64(a,b[c])};jspb.BinaryWriter.prototype.writePackedInt32=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeSignedVarint32(b[d]);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedInt32String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeSignedVarint32(parseInt(b[d],10));this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedInt64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeSignedVarint64(b[d]);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedInt64String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++){var e=jspb.arith.Int64.fromString(b[d]);this.encoder_.writeSplitVarint64(e.lo,e.hi)}this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedUint32=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeUnsignedVarint32(b[d]);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedUint32String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeUnsignedVarint32(parseInt(b[d],10));this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedUint64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeUnsignedVarint64(b[d]);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedUint64String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++){var e=jspb.arith.UInt64.fromString(b[d]);this.encoder_.writeSplitVarint64(e.lo,e.hi)}this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedSint32=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeZigzagVarint32(b[d]);this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedSint64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeZigzagVarint64(b[d]);this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedSint64String=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeZigzagVarint64(parseInt(b[d],10));this.endDelimited_(c)}};
jspb.BinaryWriter.prototype.writePackedFixed32=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(4*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeUint32(b[c])}};jspb.BinaryWriter.prototype.writePackedFixed64=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeUint64(b[c])}};
jspb.BinaryWriter.prototype.writePackedFixed64String=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++){var d=jspb.arith.UInt64.fromString(b[c]);this.encoder_.writeSplitFixed64(d.lo,d.hi)}}};
jspb.BinaryWriter.prototype.writePackedSfixed32=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(4*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeInt32(b[c])}};jspb.BinaryWriter.prototype.writePackedSfixed64=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeInt64(b[c])}};
jspb.BinaryWriter.prototype.writePackedSfixed64String=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeInt64String(b[c])}};jspb.BinaryWriter.prototype.writePackedFloat=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(4*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeFloat(b[c])}};
jspb.BinaryWriter.prototype.writePackedDouble=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeDouble(b[c])}};jspb.BinaryWriter.prototype.writePackedBool=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(b.length);for(var c=0;c<b.length;c++)this.encoder_.writeBool(b[c])}};
jspb.BinaryWriter.prototype.writePackedEnum=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeEnum(b[d]);this.endDelimited_(c)}};jspb.BinaryWriter.prototype.writePackedFixedHash64=function(a,b){if(null!=b&&b.length){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);this.encoder_.writeUnsignedVarint32(8*b.length);for(var c=0;c<b.length;c++)this.encoder_.writeFixedHash64(b[c])}};
jspb.BinaryWriter.prototype.writePackedVarintHash64=function(a,b){if(null!=b&&b.length){for(var c=this.beginDelimited_(a),d=0;d<b.length;d++)this.encoder_.writeVarintHash64(b[d]);this.endDelimited_(c)}};jspb.BinaryIterator=function(a,b,c){this.elements_=this.nextMethod_=this.decoder_=null;this.cursor_=0;this.nextValue_=null;this.atEnd_=!0;this.init_(a,b,c)};jspb.BinaryIterator.prototype.init_=function(a,b,c){a&&b&&(this.decoder_=a,this.nextMethod_=b);this.elements_=c||null;this.cursor_=0;this.nextValue_=null;this.atEnd_=!this.decoder_&&!this.elements_;this.next()};jspb.BinaryIterator.instanceCache_=[];
jspb.BinaryIterator.alloc=function(a,b,c){if(jspb.BinaryIterator.instanceCache_.length){var d=jspb.BinaryIterator.instanceCache_.pop();d.init_(a,b,c);return d}return new jspb.BinaryIterator(a,b,c)};jspb.BinaryIterator.prototype.free=function(){this.clear();100>jspb.BinaryIterator.instanceCache_.length&&jspb.BinaryIterator.instanceCache_.push(this)};
jspb.BinaryIterator.prototype.clear=function(){this.decoder_&&this.decoder_.free();this.elements_=this.nextMethod_=this.decoder_=null;this.cursor_=0;this.nextValue_=null;this.atEnd_=!0};jspb.BinaryIterator.prototype.get=function(){return this.nextValue_};jspb.BinaryIterator.prototype.atEnd=function(){return this.atEnd_};
jspb.BinaryIterator.prototype.next=function(){var a=this.nextValue_;this.decoder_?this.decoder_.atEnd()?(this.nextValue_=null,this.atEnd_=!0):this.nextValue_=this.nextMethod_.call(this.decoder_):this.elements_&&(this.cursor_==this.elements_.length?(this.nextValue_=null,this.atEnd_=!0):this.nextValue_=this.elements_[this.cursor_++]);return a};jspb.BinaryDecoder=function(a,b,c){this.bytes_=null;this.tempHigh_=this.tempLow_=this.cursor_=this.end_=this.start_=0;this.error_=!1;a&&this.setBlock(a,b,c)};
jspb.BinaryDecoder.instanceCache_=[];jspb.BinaryDecoder.alloc=function(a,b,c){if(jspb.BinaryDecoder.instanceCache_.length){var d=jspb.BinaryDecoder.instanceCache_.pop();a&&d.setBlock(a,b,c);return d}return new jspb.BinaryDecoder(a,b,c)};jspb.BinaryDecoder.prototype.free=function(){this.clear();100>jspb.BinaryDecoder.instanceCache_.length&&jspb.BinaryDecoder.instanceCache_.push(this)};jspb.BinaryDecoder.prototype.clone=function(){return jspb.BinaryDecoder.alloc(this.bytes_,this.start_,this.end_-this.start_)};
jspb.BinaryDecoder.prototype.clear=function(){this.bytes_=null;this.cursor_=this.end_=this.start_=0;this.error_=!1};jspb.BinaryDecoder.prototype.getBuffer=function(){return this.bytes_};jspb.BinaryDecoder.prototype.setBlock=function(a,b,c){this.bytes_=jspb.utils.byteSourceToUint8Array(a);this.start_=goog.isDef(b)?b:0;this.end_=goog.isDef(c)?this.start_+c:this.bytes_.length;this.cursor_=this.start_};jspb.BinaryDecoder.prototype.getEnd=function(){return this.end_};
jspb.BinaryDecoder.prototype.setEnd=function(a){this.end_=a};jspb.BinaryDecoder.prototype.reset=function(){this.cursor_=this.start_};jspb.BinaryDecoder.prototype.getCursor=function(){return this.cursor_};jspb.BinaryDecoder.prototype.setCursor=function(a){this.cursor_=a};jspb.BinaryDecoder.prototype.advance=function(a){this.cursor_+=a;goog.asserts.assert(this.cursor_<=this.end_)};jspb.BinaryDecoder.prototype.atEnd=function(){return this.cursor_==this.end_};
jspb.BinaryDecoder.prototype.pastEnd=function(){return this.cursor_>this.end_};jspb.BinaryDecoder.prototype.getError=function(){return this.error_||0>this.cursor_||this.cursor_>this.end_};
jspb.BinaryDecoder.prototype.readSplitVarint64_=function(){for(var a,b=0,c,d=0;4>d;d++)if(a=this.bytes_[this.cursor_++],b|=(a&127)<<7*d,128>a){this.tempLow_=b>>>0;this.tempHigh_=0;return}a=this.bytes_[this.cursor_++];b|=(a&127)<<28;c=0|(a&127)>>4;if(128>a)this.tempLow_=b>>>0,this.tempHigh_=c>>>0;else{for(d=0;5>d;d++)if(a=this.bytes_[this.cursor_++],c|=(a&127)<<7*d+3,128>a){this.tempLow_=b>>>0;this.tempHigh_=c>>>0;return}goog.asserts.fail("Failed to read varint, encoding is invalid.");this.error_=
!0}};jspb.BinaryDecoder.prototype.skipVarint=function(){for(;this.bytes_[this.cursor_]&128;)this.cursor_++;this.cursor_++};jspb.BinaryDecoder.prototype.unskipVarint=function(a){for(;128<a;)this.cursor_--,a>>>=7;this.cursor_--};
jspb.BinaryDecoder.prototype.readUnsignedVarint32=function(){var a,b=this.bytes_;a=b[this.cursor_+0];var c=a&127;if(128>a)return this.cursor_+=1,goog.asserts.assert(this.cursor_<=this.end_),c;a=b[this.cursor_+1];c|=(a&127)<<7;if(128>a)return this.cursor_+=2,goog.asserts.assert(this.cursor_<=this.end_),c;a=b[this.cursor_+2];c|=(a&127)<<14;if(128>a)return this.cursor_+=3,goog.asserts.assert(this.cursor_<=this.end_),c;a=b[this.cursor_+3];c|=(a&127)<<21;if(128>a)return this.cursor_+=4,goog.asserts.assert(this.cursor_<=
this.end_),c;a=b[this.cursor_+4];c|=(a&15)<<28;if(128>a)return this.cursor_+=5,goog.asserts.assert(this.cursor_<=this.end_),c>>>0;this.cursor_+=5;128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&128<=b[this.cursor_++]&&goog.asserts.assert(!1);goog.asserts.assert(this.cursor_<=this.end_);return c};jspb.BinaryDecoder.prototype.readSignedVarint32=jspb.BinaryDecoder.prototype.readUnsignedVarint32;jspb.BinaryDecoder.prototype.readUnsignedVarint32String=function(){return this.readUnsignedVarint32().toString()};
jspb.BinaryDecoder.prototype.readSignedVarint32String=function(){return this.readSignedVarint32().toString()};jspb.BinaryDecoder.prototype.readZigzagVarint32=function(){var a=this.readUnsignedVarint32();return a>>>1^-(a&1)};jspb.BinaryDecoder.prototype.readUnsignedVarint64=function(){this.readSplitVarint64_();return jspb.utils.joinUint64(this.tempLow_,this.tempHigh_)};
jspb.BinaryDecoder.prototype.readUnsignedVarint64String=function(){this.readSplitVarint64_();return jspb.utils.joinUnsignedDecimalString(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readSignedVarint64=function(){this.readSplitVarint64_();return jspb.utils.joinInt64(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readSignedVarint64String=function(){this.readSplitVarint64_();return jspb.utils.joinSignedDecimalString(this.tempLow_,this.tempHigh_)};
jspb.BinaryDecoder.prototype.readZigzagVarint64=function(){this.readSplitVarint64_();return jspb.utils.joinZigzag64(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readZigzagVarint64String=function(){return this.readZigzagVarint64().toString()};jspb.BinaryDecoder.prototype.readUint8=function(){var a=this.bytes_[this.cursor_+0];this.cursor_+=1;goog.asserts.assert(this.cursor_<=this.end_);return a};
jspb.BinaryDecoder.prototype.readUint16=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1];this.cursor_+=2;goog.asserts.assert(this.cursor_<=this.end_);return a<<0|b<<8};jspb.BinaryDecoder.prototype.readUint32=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1],c=this.bytes_[this.cursor_+2],d=this.bytes_[this.cursor_+3];this.cursor_+=4;goog.asserts.assert(this.cursor_<=this.end_);return(a<<0|b<<8|c<<16|d<<24)>>>0};
jspb.BinaryDecoder.prototype.readUint64=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinUint64(a,b)};jspb.BinaryDecoder.prototype.readUint64String=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinUnsignedDecimalString(a,b)};jspb.BinaryDecoder.prototype.readInt8=function(){var a=this.bytes_[this.cursor_+0];this.cursor_+=1;goog.asserts.assert(this.cursor_<=this.end_);return a<<24>>24};
jspb.BinaryDecoder.prototype.readInt16=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1];this.cursor_+=2;goog.asserts.assert(this.cursor_<=this.end_);return(a<<0|b<<8)<<16>>16};jspb.BinaryDecoder.prototype.readInt32=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1],c=this.bytes_[this.cursor_+2],d=this.bytes_[this.cursor_+3];this.cursor_+=4;goog.asserts.assert(this.cursor_<=this.end_);return a<<0|b<<8|c<<16|d<<24};
jspb.BinaryDecoder.prototype.readInt64=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinInt64(a,b)};jspb.BinaryDecoder.prototype.readInt64String=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinSignedDecimalString(a,b)};jspb.BinaryDecoder.prototype.readFloat=function(){var a=this.readUint32();return jspb.utils.joinFloat32(a,0)};
jspb.BinaryDecoder.prototype.readDouble=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinFloat64(a,b)};jspb.BinaryDecoder.prototype.readBool=function(){return!!this.bytes_[this.cursor_++]};jspb.BinaryDecoder.prototype.readEnum=function(){return this.readSignedVarint32()};
jspb.BinaryDecoder.prototype.readString=function(a){var b=this.bytes_,c=this.cursor_;a=c+a;for(var d=[],e="";c<a;){var f=b[c++];if(128>f)d.push(f);else if(192>f)continue;else if(224>f){var g=b[c++];d.push((f&31)<<6|g&63)}else if(240>f){var g=b[c++],h=b[c++];d.push((f&15)<<12|(g&63)<<6|h&63)}else if(248>f){var g=b[c++],h=b[c++],k=b[c++],f=(f&7)<<18|(g&63)<<12|(h&63)<<6|k&63,f=f-65536;d.push((f>>10&1023)+55296,(f&1023)+56320)}8192<=d.length&&(e+=String.fromCharCode.apply(null,d),d.length=0)}e+=goog.crypt.byteArrayToString(d);
this.cursor_=c;return e};jspb.BinaryDecoder.prototype.readStringWithLength=function(){var a=this.readUnsignedVarint32();return this.readString(a)};jspb.BinaryDecoder.prototype.readBytes=function(a){if(0>a||this.cursor_+a>this.bytes_.length)return this.error_=!0,goog.asserts.fail("Invalid byte length!"),new Uint8Array(0);var b=this.bytes_.subarray(this.cursor_,this.cursor_+a);this.cursor_+=a;goog.asserts.assert(this.cursor_<=this.end_);return b};
jspb.BinaryDecoder.prototype.readVarintHash64=function(){this.readSplitVarint64_();return jspb.utils.joinHash64(this.tempLow_,this.tempHigh_)};jspb.BinaryDecoder.prototype.readFixedHash64=function(){var a=this.bytes_,b=this.cursor_,c=a[b+0],d=a[b+1],e=a[b+2],f=a[b+3],g=a[b+4],h=a[b+5],k=a[b+6],a=a[b+7];this.cursor_+=8;return String.fromCharCode(c,d,e,f,g,h,k,a)};jspb.BinaryReader=function(a,b,c){this.decoder_=jspb.BinaryDecoder.alloc(a,b,c);this.fieldCursor_=this.decoder_.getCursor();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;this.error_=!1;this.readCallbacks_=null};jspb.BinaryReader.instanceCache_=[];
jspb.BinaryReader.alloc=function(a,b,c){if(jspb.BinaryReader.instanceCache_.length){var d=jspb.BinaryReader.instanceCache_.pop();a&&d.decoder_.setBlock(a,b,c);return d}return new jspb.BinaryReader(a,b,c)};jspb.BinaryReader.prototype.alloc=jspb.BinaryReader.alloc;
jspb.BinaryReader.prototype.free=function(){this.decoder_.clear();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;this.error_=!1;this.readCallbacks_=null;100>jspb.BinaryReader.instanceCache_.length&&jspb.BinaryReader.instanceCache_.push(this)};jspb.BinaryReader.prototype.getFieldCursor=function(){return this.fieldCursor_};jspb.BinaryReader.prototype.getCursor=function(){return this.decoder_.getCursor()};
jspb.BinaryReader.prototype.getBuffer=function(){return this.decoder_.getBuffer()};jspb.BinaryReader.prototype.getFieldNumber=function(){return this.nextField_};jspb.BinaryReader.prototype.getWireType=function(){return this.nextWireType_};jspb.BinaryReader.prototype.isEndGroup=function(){return this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP};jspb.BinaryReader.prototype.getError=function(){return this.error_||this.decoder_.getError()};
jspb.BinaryReader.prototype.setBlock=function(a,b,c){this.decoder_.setBlock(a,b,c);this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID};jspb.BinaryReader.prototype.reset=function(){this.decoder_.reset();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID};jspb.BinaryReader.prototype.advance=function(a){this.decoder_.advance(a)};
jspb.BinaryReader.prototype.nextField=function(){if(this.decoder_.atEnd())return!1;if(this.getError())return goog.asserts.fail("Decoder hit an error"),!1;this.fieldCursor_=this.decoder_.getCursor();var a=this.decoder_.readUnsignedVarint32(),b=a>>>3,a=a&7;if(a!=jspb.BinaryConstants.WireType.VARINT&&a!=jspb.BinaryConstants.WireType.FIXED32&&a!=jspb.BinaryConstants.WireType.FIXED64&&a!=jspb.BinaryConstants.WireType.DELIMITED&&a!=jspb.BinaryConstants.WireType.START_GROUP&&a!=jspb.BinaryConstants.WireType.END_GROUP)return goog.asserts.fail("Invalid wire type"),
this.error_=!0,!1;this.nextField_=b;this.nextWireType_=a;return!0};jspb.BinaryReader.prototype.unskipHeader=function(){this.decoder_.unskipVarint(this.nextField_<<3|this.nextWireType_)};jspb.BinaryReader.prototype.skipMatchingFields=function(){var a=this.nextField_;for(this.unskipHeader();this.nextField()&&this.getFieldNumber()==a;)this.skipField();this.decoder_.atEnd()||this.unskipHeader()};
jspb.BinaryReader.prototype.skipVarintField=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.VARINT?(goog.asserts.fail("Invalid wire type for skipVarintField"),this.skipField()):this.decoder_.skipVarint()};jspb.BinaryReader.prototype.skipDelimitedField=function(){if(this.nextWireType_!=jspb.BinaryConstants.WireType.DELIMITED)goog.asserts.fail("Invalid wire type for skipDelimitedField"),this.skipField();else{var a=this.decoder_.readUnsignedVarint32();this.decoder_.advance(a)}};
jspb.BinaryReader.prototype.skipFixed32Field=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.FIXED32?(goog.asserts.fail("Invalid wire type for skipFixed32Field"),this.skipField()):this.decoder_.advance(4)};jspb.BinaryReader.prototype.skipFixed64Field=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.FIXED64?(goog.asserts.fail("Invalid wire type for skipFixed64Field"),this.skipField()):this.decoder_.advance(8)};
jspb.BinaryReader.prototype.skipGroup=function(){var a=[this.nextField_];do{if(!this.nextField()){goog.asserts.fail("Unmatched start-group tag: stream EOF");this.error_=!0;break}if(this.nextWireType_==jspb.BinaryConstants.WireType.START_GROUP)a.push(this.nextField_);else if(this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP&&this.nextField_!=a.pop()){goog.asserts.fail("Unmatched end-group tag");this.error_=!0;break}}while(0<a.length)};
jspb.BinaryReader.prototype.skipField=function(){switch(this.nextWireType_){case jspb.BinaryConstants.WireType.VARINT:this.skipVarintField();break;case jspb.BinaryConstants.WireType.FIXED64:this.skipFixed64Field();break;case jspb.BinaryConstants.WireType.DELIMITED:this.skipDelimitedField();break;case jspb.BinaryConstants.WireType.FIXED32:this.skipFixed32Field();break;case jspb.BinaryConstants.WireType.START_GROUP:this.skipGroup();break;default:goog.asserts.fail("Invalid wire encoding for field.")}};
jspb.BinaryReader.prototype.registerReadCallback=function(a,b){goog.isNull(this.readCallbacks_)&&(this.readCallbacks_={});goog.asserts.assert(!this.readCallbacks_[a]);this.readCallbacks_[a]=b};jspb.BinaryReader.prototype.runReadCallback=function(a){goog.asserts.assert(!goog.isNull(this.readCallbacks_));a=this.readCallbacks_[a];goog.asserts.assert(a);return a(this)};
jspb.BinaryReader.prototype.readAny=function(a){this.nextWireType_=jspb.BinaryConstants.FieldTypeToWireType(a);var b=jspb.BinaryConstants.FieldType;switch(a){case b.DOUBLE:return this.readDouble();case b.FLOAT:return this.readFloat();case b.INT64:return this.readInt64();case b.UINT64:return this.readUint64();case b.INT32:return this.readInt32();case b.FIXED64:return this.readFixed64();case b.FIXED32:return this.readFixed32();case b.BOOL:return this.readBool();case b.STRING:return this.readString();
case b.GROUP:goog.asserts.fail("Group field type not supported in readAny()");case b.MESSAGE:goog.asserts.fail("Message field type not supported in readAny()");case b.BYTES:return this.readBytes();case b.UINT32:return this.readUint32();case b.ENUM:return this.readEnum();case b.SFIXED32:return this.readSfixed32();case b.SFIXED64:return this.readSfixed64();case b.SINT32:return this.readSint32();case b.SINT64:return this.readSint64();case b.FHASH64:return this.readFixedHash64();case b.VHASH64:return this.readVarintHash64();
default:goog.asserts.fail("Invalid field type in readAny()")}return 0};jspb.BinaryReader.prototype.readMessage=function(a,b){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var c=this.decoder_.getEnd(),d=this.decoder_.readUnsignedVarint32(),d=this.decoder_.getCursor()+d;this.decoder_.setEnd(d);b(a,this);this.decoder_.setCursor(d);this.decoder_.setEnd(c)};
jspb.BinaryReader.prototype.readGroup=function(a,b,c){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.START_GROUP);goog.asserts.assert(this.nextField_==a);c(b,this);this.error_||this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP||(goog.asserts.fail("Group submessage did not end with an END_GROUP tag"),this.error_=!0)};
jspb.BinaryReader.prototype.getFieldDecoder=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32(),b=this.decoder_.getCursor(),c=b+a,a=jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(),b,a);this.decoder_.setCursor(c);return a};jspb.BinaryReader.prototype.readInt32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint32()};
jspb.BinaryReader.prototype.readInt32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint32String()};jspb.BinaryReader.prototype.readInt64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64()};jspb.BinaryReader.prototype.readInt64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64String()};
jspb.BinaryReader.prototype.readUint32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint32()};jspb.BinaryReader.prototype.readUint32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint32String()};jspb.BinaryReader.prototype.readUint64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint64()};
jspb.BinaryReader.prototype.readUint64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint64String()};jspb.BinaryReader.prototype.readSint32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint32()};jspb.BinaryReader.prototype.readSint64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint64()};
jspb.BinaryReader.prototype.readSint64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint64String()};jspb.BinaryReader.prototype.readFixed32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readUint32()};jspb.BinaryReader.prototype.readFixed64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readUint64()};
jspb.BinaryReader.prototype.readFixed64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readUint64String()};jspb.BinaryReader.prototype.readSfixed32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readInt32()};jspb.BinaryReader.prototype.readSfixed32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readInt32().toString()};
jspb.BinaryReader.prototype.readSfixed64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readInt64()};jspb.BinaryReader.prototype.readSfixed64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readInt64String()};jspb.BinaryReader.prototype.readFloat=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readFloat()};
jspb.BinaryReader.prototype.readDouble=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readDouble()};jspb.BinaryReader.prototype.readBool=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return!!this.decoder_.readUnsignedVarint32()};jspb.BinaryReader.prototype.readEnum=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64()};
jspb.BinaryReader.prototype.readString=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32();return this.decoder_.readString(a)};jspb.BinaryReader.prototype.readBytes=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32();return this.decoder_.readBytes(a)};
jspb.BinaryReader.prototype.readVarintHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readVarintHash64()};jspb.BinaryReader.prototype.readFixedHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readFixedHash64()};
jspb.BinaryReader.prototype.readPackedField_=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);for(var b=this.decoder_.readUnsignedVarint32(),b=this.decoder_.getCursor()+b,c=[];this.decoder_.getCursor()<b;)c.push(a.call(this.decoder_));return c};jspb.BinaryReader.prototype.readPackedInt32=function(){return this.readPackedField_(this.decoder_.readSignedVarint32)};jspb.BinaryReader.prototype.readPackedInt32String=function(){return this.readPackedField_(this.decoder_.readSignedVarint32String)};
jspb.BinaryReader.prototype.readPackedInt64=function(){return this.readPackedField_(this.decoder_.readSignedVarint64)};jspb.BinaryReader.prototype.readPackedInt64String=function(){return this.readPackedField_(this.decoder_.readSignedVarint64String)};jspb.BinaryReader.prototype.readPackedUint32=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint32)};jspb.BinaryReader.prototype.readPackedUint32String=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint32String)};
jspb.BinaryReader.prototype.readPackedUint64=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint64)};jspb.BinaryReader.prototype.readPackedUint64String=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint64String)};jspb.BinaryReader.prototype.readPackedSint32=function(){return this.readPackedField_(this.decoder_.readZigzagVarint32)};jspb.BinaryReader.prototype.readPackedSint64=function(){return this.readPackedField_(this.decoder_.readZigzagVarint64)};
jspb.BinaryReader.prototype.readPackedSint64String=function(){return this.readPackedField_(this.decoder_.readZigzagVarint64String)};jspb.BinaryReader.prototype.readPackedFixed32=function(){return this.readPackedField_(this.decoder_.readUint32)};jspb.BinaryReader.prototype.readPackedFixed64=function(){return this.readPackedField_(this.decoder_.readUint64)};jspb.BinaryReader.prototype.readPackedFixed64String=function(){return this.readPackedField_(this.decoder_.readUint64String)};
jspb.BinaryReader.prototype.readPackedSfixed32=function(){return this.readPackedField_(this.decoder_.readInt32)};jspb.BinaryReader.prototype.readPackedSfixed64=function(){return this.readPackedField_(this.decoder_.readInt64)};jspb.BinaryReader.prototype.readPackedSfixed64String=function(){return this.readPackedField_(this.decoder_.readInt64String)};jspb.BinaryReader.prototype.readPackedFloat=function(){return this.readPackedField_(this.decoder_.readFloat)};
jspb.BinaryReader.prototype.readPackedDouble=function(){return this.readPackedField_(this.decoder_.readDouble)};jspb.BinaryReader.prototype.readPackedBool=function(){return this.readPackedField_(this.decoder_.readBool)};jspb.BinaryReader.prototype.readPackedEnum=function(){return this.readPackedField_(this.decoder_.readEnum)};jspb.BinaryReader.prototype.readPackedVarintHash64=function(){return this.readPackedField_(this.decoder_.readVarintHash64)};
jspb.BinaryReader.prototype.readPackedFixedHash64=function(){return this.readPackedField_(this.decoder_.readFixedHash64)};jspb.Export={};exports.Map=jspb.Map;exports.Message=jspb.Message;exports.BinaryReader=jspb.BinaryReader;exports.BinaryWriter=jspb.BinaryWriter;exports.ExtensionFieldInfo=jspb.ExtensionFieldInfo;exports.ExtensionFieldBinaryInfo=jspb.ExtensionFieldBinaryInfo;exports.exportSymbol=goog.exportSymbol;exports.inherits=goog.inherits;exports.object={extend:goog.object.extend};exports.typeOf=goog.typeOf;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/google-protobuf/google/protobuf/descriptor_pb.js":
/*!***********************************************************************!*\
  !*** ./node_modules/google-protobuf/google/protobuf/descriptor_pb.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(/*! google-protobuf */ "./node_modules/google-protobuf/google-protobuf.js");
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.google.protobuf.DescriptorProto', null, global);
goog.exportSymbol('proto.google.protobuf.DescriptorProto.ExtensionRange', null, global);
goog.exportSymbol('proto.google.protobuf.DescriptorProto.ReservedRange', null, global);
goog.exportSymbol('proto.google.protobuf.EnumDescriptorProto', null, global);
goog.exportSymbol('proto.google.protobuf.EnumDescriptorProto.EnumReservedRange', null, global);
goog.exportSymbol('proto.google.protobuf.EnumOptions', null, global);
goog.exportSymbol('proto.google.protobuf.EnumValueDescriptorProto', null, global);
goog.exportSymbol('proto.google.protobuf.EnumValueOptions', null, global);
goog.exportSymbol('proto.google.protobuf.ExtensionRangeOptions', null, global);
goog.exportSymbol('proto.google.protobuf.FieldDescriptorProto', null, global);
goog.exportSymbol('proto.google.protobuf.FieldDescriptorProto.Label', null, global);
goog.exportSymbol('proto.google.protobuf.FieldDescriptorProto.Type', null, global);
goog.exportSymbol('proto.google.protobuf.FieldOptions', null, global);
goog.exportSymbol('proto.google.protobuf.FieldOptions.CType', null, global);
goog.exportSymbol('proto.google.protobuf.FieldOptions.JSType', null, global);
goog.exportSymbol('proto.google.protobuf.FileDescriptorProto', null, global);
goog.exportSymbol('proto.google.protobuf.FileDescriptorSet', null, global);
goog.exportSymbol('proto.google.protobuf.FileOptions', null, global);
goog.exportSymbol('proto.google.protobuf.FileOptions.OptimizeMode', null, global);
goog.exportSymbol('proto.google.protobuf.GeneratedCodeInfo', null, global);
goog.exportSymbol('proto.google.protobuf.GeneratedCodeInfo.Annotation', null, global);
goog.exportSymbol('proto.google.protobuf.MessageOptions', null, global);
goog.exportSymbol('proto.google.protobuf.MethodDescriptorProto', null, global);
goog.exportSymbol('proto.google.protobuf.MethodOptions', null, global);
goog.exportSymbol('proto.google.protobuf.MethodOptions.IdempotencyLevel', null, global);
goog.exportSymbol('proto.google.protobuf.OneofDescriptorProto', null, global);
goog.exportSymbol('proto.google.protobuf.OneofOptions', null, global);
goog.exportSymbol('proto.google.protobuf.ServiceDescriptorProto', null, global);
goog.exportSymbol('proto.google.protobuf.ServiceOptions', null, global);
goog.exportSymbol('proto.google.protobuf.SourceCodeInfo', null, global);
goog.exportSymbol('proto.google.protobuf.SourceCodeInfo.Location', null, global);
goog.exportSymbol('proto.google.protobuf.UninterpretedOption', null, global);
goog.exportSymbol('proto.google.protobuf.UninterpretedOption.NamePart', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.FileDescriptorSet = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.FileDescriptorSet.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.FileDescriptorSet, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.FileDescriptorSet.displayName = 'proto.google.protobuf.FileDescriptorSet';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.FileDescriptorSet.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.FileDescriptorSet.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.FileDescriptorSet.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.FileDescriptorSet} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.FileDescriptorSet.toObject = function(includeInstance, msg) {
  var f, obj = {
    fileList: jspb.Message.toObjectList(msg.getFileList(),
    proto.google.protobuf.FileDescriptorProto.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.FileDescriptorSet}
 */
proto.google.protobuf.FileDescriptorSet.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.FileDescriptorSet;
  return proto.google.protobuf.FileDescriptorSet.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.FileDescriptorSet} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.FileDescriptorSet}
 */
proto.google.protobuf.FileDescriptorSet.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.google.protobuf.FileDescriptorProto;
      reader.readMessage(value,proto.google.protobuf.FileDescriptorProto.deserializeBinaryFromReader);
      msg.addFile(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.FileDescriptorSet.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.FileDescriptorSet.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.FileDescriptorSet} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.FileDescriptorSet.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFileList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.google.protobuf.FileDescriptorProto.serializeBinaryToWriter
    );
  }
};


/**
 * repeated FileDescriptorProto file = 1;
 * @return {!Array<!proto.google.protobuf.FileDescriptorProto>}
 */
proto.google.protobuf.FileDescriptorSet.prototype.getFileList = function() {
  return /** @type{!Array<!proto.google.protobuf.FileDescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.FileDescriptorProto, 1));
};


/** @param {!Array<!proto.google.protobuf.FileDescriptorProto>} value */
proto.google.protobuf.FileDescriptorSet.prototype.setFileList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.google.protobuf.FileDescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.FileDescriptorProto}
 */
proto.google.protobuf.FileDescriptorSet.prototype.addFile = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.google.protobuf.FileDescriptorProto, opt_index);
};


proto.google.protobuf.FileDescriptorSet.prototype.clearFileList = function() {
  this.setFileList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.FileDescriptorProto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.FileDescriptorProto.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.FileDescriptorProto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.FileDescriptorProto.displayName = 'proto.google.protobuf.FileDescriptorProto';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.FileDescriptorProto.repeatedFields_ = [3,10,11,4,5,6,7];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.FileDescriptorProto.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.FileDescriptorProto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.FileDescriptorProto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.FileDescriptorProto.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getField(msg, 1),
    pb_package: jspb.Message.getField(msg, 2),
    dependencyList: jspb.Message.getRepeatedField(msg, 3),
    publicDependencyList: jspb.Message.getRepeatedField(msg, 10),
    weakDependencyList: jspb.Message.getRepeatedField(msg, 11),
    messageTypeList: jspb.Message.toObjectList(msg.getMessageTypeList(),
    proto.google.protobuf.DescriptorProto.toObject, includeInstance),
    enumTypeList: jspb.Message.toObjectList(msg.getEnumTypeList(),
    proto.google.protobuf.EnumDescriptorProto.toObject, includeInstance),
    serviceList: jspb.Message.toObjectList(msg.getServiceList(),
    proto.google.protobuf.ServiceDescriptorProto.toObject, includeInstance),
    extensionList: jspb.Message.toObjectList(msg.getExtensionList(),
    proto.google.protobuf.FieldDescriptorProto.toObject, includeInstance),
    options: (f = msg.getOptions()) && proto.google.protobuf.FileOptions.toObject(includeInstance, f),
    sourceCodeInfo: (f = msg.getSourceCodeInfo()) && proto.google.protobuf.SourceCodeInfo.toObject(includeInstance, f),
    syntax: jspb.Message.getField(msg, 12)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.FileDescriptorProto}
 */
proto.google.protobuf.FileDescriptorProto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.FileDescriptorProto;
  return proto.google.protobuf.FileDescriptorProto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.FileDescriptorProto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.FileDescriptorProto}
 */
proto.google.protobuf.FileDescriptorProto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPackage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addDependency(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.addPublicDependency(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.addWeakDependency(value);
      break;
    case 4:
      var value = new proto.google.protobuf.DescriptorProto;
      reader.readMessage(value,proto.google.protobuf.DescriptorProto.deserializeBinaryFromReader);
      msg.addMessageType(value);
      break;
    case 5:
      var value = new proto.google.protobuf.EnumDescriptorProto;
      reader.readMessage(value,proto.google.protobuf.EnumDescriptorProto.deserializeBinaryFromReader);
      msg.addEnumType(value);
      break;
    case 6:
      var value = new proto.google.protobuf.ServiceDescriptorProto;
      reader.readMessage(value,proto.google.protobuf.ServiceDescriptorProto.deserializeBinaryFromReader);
      msg.addService(value);
      break;
    case 7:
      var value = new proto.google.protobuf.FieldDescriptorProto;
      reader.readMessage(value,proto.google.protobuf.FieldDescriptorProto.deserializeBinaryFromReader);
      msg.addExtension$(value);
      break;
    case 8:
      var value = new proto.google.protobuf.FileOptions;
      reader.readMessage(value,proto.google.protobuf.FileOptions.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    case 9:
      var value = new proto.google.protobuf.SourceCodeInfo;
      reader.readMessage(value,proto.google.protobuf.SourceCodeInfo.deserializeBinaryFromReader);
      msg.setSourceCodeInfo(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setSyntax(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.FileDescriptorProto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.FileDescriptorProto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.FileDescriptorProto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.FileDescriptorProto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDependencyList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getPublicDependencyList();
  if (f.length > 0) {
    writer.writeRepeatedInt32(
      10,
      f
    );
  }
  f = message.getWeakDependencyList();
  if (f.length > 0) {
    writer.writeRepeatedInt32(
      11,
      f
    );
  }
  f = message.getMessageTypeList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.google.protobuf.DescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getEnumTypeList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.google.protobuf.EnumDescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getServiceList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.google.protobuf.ServiceDescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getExtensionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.google.protobuf.FieldDescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.google.protobuf.FileOptions.serializeBinaryToWriter
    );
  }
  f = message.getSourceCodeInfo();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.google.protobuf.SourceCodeInfo.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 12));
  if (f != null) {
    writer.writeString(
      12,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.protobuf.FileDescriptorProto.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearName = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileDescriptorProto.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string package = 2;
 * @return {string}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getPackage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.google.protobuf.FileDescriptorProto.prototype.setPackage = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearPackage = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileDescriptorProto.prototype.hasPackage = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated string dependency = 3;
 * @return {!Array<string>}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getDependencyList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/** @param {!Array<string>} value */
proto.google.protobuf.FileDescriptorProto.prototype.setDependencyList = function(value) {
  jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.google.protobuf.FileDescriptorProto.prototype.addDependency = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearDependencyList = function() {
  this.setDependencyList([]);
};


/**
 * repeated int32 public_dependency = 10;
 * @return {!Array<number>}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getPublicDependencyList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 10));
};


/** @param {!Array<number>} value */
proto.google.protobuf.FileDescriptorProto.prototype.setPublicDependencyList = function(value) {
  jspb.Message.setField(this, 10, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.google.protobuf.FileDescriptorProto.prototype.addPublicDependency = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 10, value, opt_index);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearPublicDependencyList = function() {
  this.setPublicDependencyList([]);
};


/**
 * repeated int32 weak_dependency = 11;
 * @return {!Array<number>}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getWeakDependencyList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 11));
};


/** @param {!Array<number>} value */
proto.google.protobuf.FileDescriptorProto.prototype.setWeakDependencyList = function(value) {
  jspb.Message.setField(this, 11, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.google.protobuf.FileDescriptorProto.prototype.addWeakDependency = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 11, value, opt_index);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearWeakDependencyList = function() {
  this.setWeakDependencyList([]);
};


/**
 * repeated DescriptorProto message_type = 4;
 * @return {!Array<!proto.google.protobuf.DescriptorProto>}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getMessageTypeList = function() {
  return /** @type{!Array<!proto.google.protobuf.DescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.DescriptorProto, 4));
};


/** @param {!Array<!proto.google.protobuf.DescriptorProto>} value */
proto.google.protobuf.FileDescriptorProto.prototype.setMessageTypeList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.google.protobuf.DescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.DescriptorProto}
 */
proto.google.protobuf.FileDescriptorProto.prototype.addMessageType = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.google.protobuf.DescriptorProto, opt_index);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearMessageTypeList = function() {
  this.setMessageTypeList([]);
};


/**
 * repeated EnumDescriptorProto enum_type = 5;
 * @return {!Array<!proto.google.protobuf.EnumDescriptorProto>}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getEnumTypeList = function() {
  return /** @type{!Array<!proto.google.protobuf.EnumDescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.EnumDescriptorProto, 5));
};


/** @param {!Array<!proto.google.protobuf.EnumDescriptorProto>} value */
proto.google.protobuf.FileDescriptorProto.prototype.setEnumTypeList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.google.protobuf.EnumDescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.EnumDescriptorProto}
 */
proto.google.protobuf.FileDescriptorProto.prototype.addEnumType = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.google.protobuf.EnumDescriptorProto, opt_index);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearEnumTypeList = function() {
  this.setEnumTypeList([]);
};


/**
 * repeated ServiceDescriptorProto service = 6;
 * @return {!Array<!proto.google.protobuf.ServiceDescriptorProto>}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getServiceList = function() {
  return /** @type{!Array<!proto.google.protobuf.ServiceDescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.ServiceDescriptorProto, 6));
};


/** @param {!Array<!proto.google.protobuf.ServiceDescriptorProto>} value */
proto.google.protobuf.FileDescriptorProto.prototype.setServiceList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.google.protobuf.ServiceDescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.ServiceDescriptorProto}
 */
proto.google.protobuf.FileDescriptorProto.prototype.addService = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.google.protobuf.ServiceDescriptorProto, opt_index);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearServiceList = function() {
  this.setServiceList([]);
};


/**
 * repeated FieldDescriptorProto extension = 7;
 * @return {!Array<!proto.google.protobuf.FieldDescriptorProto>}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getExtensionList = function() {
  return /** @type{!Array<!proto.google.protobuf.FieldDescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.FieldDescriptorProto, 7));
};


/** @param {!Array<!proto.google.protobuf.FieldDescriptorProto>} value */
proto.google.protobuf.FileDescriptorProto.prototype.setExtensionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.google.protobuf.FieldDescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.FieldDescriptorProto}
 */
proto.google.protobuf.FileDescriptorProto.prototype.addExtension$ = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.google.protobuf.FieldDescriptorProto, opt_index);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearExtensionList = function() {
  this.setExtensionList([]);
};


/**
 * optional FileOptions options = 8;
 * @return {?proto.google.protobuf.FileOptions}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getOptions = function() {
  return /** @type{?proto.google.protobuf.FileOptions} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.FileOptions, 8));
};


/** @param {?proto.google.protobuf.FileOptions|undefined} value */
proto.google.protobuf.FileDescriptorProto.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 8, value);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileDescriptorProto.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional SourceCodeInfo source_code_info = 9;
 * @return {?proto.google.protobuf.SourceCodeInfo}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getSourceCodeInfo = function() {
  return /** @type{?proto.google.protobuf.SourceCodeInfo} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.SourceCodeInfo, 9));
};


/** @param {?proto.google.protobuf.SourceCodeInfo|undefined} value */
proto.google.protobuf.FileDescriptorProto.prototype.setSourceCodeInfo = function(value) {
  jspb.Message.setWrapperField(this, 9, value);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearSourceCodeInfo = function() {
  this.setSourceCodeInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileDescriptorProto.prototype.hasSourceCodeInfo = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional string syntax = 12;
 * @return {string}
 */
proto.google.protobuf.FileDescriptorProto.prototype.getSyntax = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/** @param {string} value */
proto.google.protobuf.FileDescriptorProto.prototype.setSyntax = function(value) {
  jspb.Message.setField(this, 12, value);
};


proto.google.protobuf.FileDescriptorProto.prototype.clearSyntax = function() {
  jspb.Message.setField(this, 12, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileDescriptorProto.prototype.hasSyntax = function() {
  return jspb.Message.getField(this, 12) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.DescriptorProto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.DescriptorProto.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.DescriptorProto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.DescriptorProto.displayName = 'proto.google.protobuf.DescriptorProto';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.DescriptorProto.repeatedFields_ = [2,6,3,4,5,8,9,10];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.DescriptorProto.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.DescriptorProto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.DescriptorProto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.DescriptorProto.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getField(msg, 1),
    fieldList: jspb.Message.toObjectList(msg.getFieldList(),
    proto.google.protobuf.FieldDescriptorProto.toObject, includeInstance),
    extensionList: jspb.Message.toObjectList(msg.getExtensionList(),
    proto.google.protobuf.FieldDescriptorProto.toObject, includeInstance),
    nestedTypeList: jspb.Message.toObjectList(msg.getNestedTypeList(),
    proto.google.protobuf.DescriptorProto.toObject, includeInstance),
    enumTypeList: jspb.Message.toObjectList(msg.getEnumTypeList(),
    proto.google.protobuf.EnumDescriptorProto.toObject, includeInstance),
    extensionRangeList: jspb.Message.toObjectList(msg.getExtensionRangeList(),
    proto.google.protobuf.DescriptorProto.ExtensionRange.toObject, includeInstance),
    oneofDeclList: jspb.Message.toObjectList(msg.getOneofDeclList(),
    proto.google.protobuf.OneofDescriptorProto.toObject, includeInstance),
    options: (f = msg.getOptions()) && proto.google.protobuf.MessageOptions.toObject(includeInstance, f),
    reservedRangeList: jspb.Message.toObjectList(msg.getReservedRangeList(),
    proto.google.protobuf.DescriptorProto.ReservedRange.toObject, includeInstance),
    reservedNameList: jspb.Message.getRepeatedField(msg, 10)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.DescriptorProto}
 */
proto.google.protobuf.DescriptorProto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.DescriptorProto;
  return proto.google.protobuf.DescriptorProto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.DescriptorProto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.DescriptorProto}
 */
proto.google.protobuf.DescriptorProto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.google.protobuf.FieldDescriptorProto;
      reader.readMessage(value,proto.google.protobuf.FieldDescriptorProto.deserializeBinaryFromReader);
      msg.addField(value);
      break;
    case 6:
      var value = new proto.google.protobuf.FieldDescriptorProto;
      reader.readMessage(value,proto.google.protobuf.FieldDescriptorProto.deserializeBinaryFromReader);
      msg.addExtension$(value);
      break;
    case 3:
      var value = new proto.google.protobuf.DescriptorProto;
      reader.readMessage(value,proto.google.protobuf.DescriptorProto.deserializeBinaryFromReader);
      msg.addNestedType(value);
      break;
    case 4:
      var value = new proto.google.protobuf.EnumDescriptorProto;
      reader.readMessage(value,proto.google.protobuf.EnumDescriptorProto.deserializeBinaryFromReader);
      msg.addEnumType(value);
      break;
    case 5:
      var value = new proto.google.protobuf.DescriptorProto.ExtensionRange;
      reader.readMessage(value,proto.google.protobuf.DescriptorProto.ExtensionRange.deserializeBinaryFromReader);
      msg.addExtensionRange(value);
      break;
    case 8:
      var value = new proto.google.protobuf.OneofDescriptorProto;
      reader.readMessage(value,proto.google.protobuf.OneofDescriptorProto.deserializeBinaryFromReader);
      msg.addOneofDecl(value);
      break;
    case 7:
      var value = new proto.google.protobuf.MessageOptions;
      reader.readMessage(value,proto.google.protobuf.MessageOptions.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    case 9:
      var value = new proto.google.protobuf.DescriptorProto.ReservedRange;
      reader.readMessage(value,proto.google.protobuf.DescriptorProto.ReservedRange.deserializeBinaryFromReader);
      msg.addReservedRange(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.addReservedName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.DescriptorProto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.DescriptorProto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.DescriptorProto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.DescriptorProto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFieldList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.google.protobuf.FieldDescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getExtensionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.google.protobuf.FieldDescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getNestedTypeList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.google.protobuf.DescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getEnumTypeList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.google.protobuf.EnumDescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getExtensionRangeList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.google.protobuf.DescriptorProto.ExtensionRange.serializeBinaryToWriter
    );
  }
  f = message.getOneofDeclList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.google.protobuf.OneofDescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.google.protobuf.MessageOptions.serializeBinaryToWriter
    );
  }
  f = message.getReservedRangeList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.google.protobuf.DescriptorProto.ReservedRange.serializeBinaryToWriter
    );
  }
  f = message.getReservedNameList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      10,
      f
    );
  }
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.DescriptorProto.ExtensionRange = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.DescriptorProto.ExtensionRange, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.DescriptorProto.ExtensionRange.displayName = 'proto.google.protobuf.DescriptorProto.ExtensionRange';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.DescriptorProto.ExtensionRange.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.DescriptorProto.ExtensionRange} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.toObject = function(includeInstance, msg) {
  var f, obj = {
    start: jspb.Message.getField(msg, 1),
    end: jspb.Message.getField(msg, 2),
    options: (f = msg.getOptions()) && proto.google.protobuf.ExtensionRangeOptions.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.DescriptorProto.ExtensionRange}
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.DescriptorProto.ExtensionRange;
  return proto.google.protobuf.DescriptorProto.ExtensionRange.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.DescriptorProto.ExtensionRange} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.DescriptorProto.ExtensionRange}
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStart(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEnd(value);
      break;
    case 3:
      var value = new proto.google.protobuf.ExtensionRangeOptions;
      reader.readMessage(value,proto.google.protobuf.ExtensionRangeOptions.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.DescriptorProto.ExtensionRange.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.DescriptorProto.ExtensionRange} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.google.protobuf.ExtensionRangeOptions.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 start = 1;
 * @return {number}
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.getStart = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.setStart = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.clearStart = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.hasStart = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 end = 2;
 * @return {number}
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.getEnd = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.setEnd = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.clearEnd = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.hasEnd = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ExtensionRangeOptions options = 3;
 * @return {?proto.google.protobuf.ExtensionRangeOptions}
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.getOptions = function() {
  return /** @type{?proto.google.protobuf.ExtensionRangeOptions} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.ExtensionRangeOptions, 3));
};


/** @param {?proto.google.protobuf.ExtensionRangeOptions|undefined} value */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.DescriptorProto.ExtensionRange.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.DescriptorProto.ReservedRange = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.DescriptorProto.ReservedRange, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.DescriptorProto.ReservedRange.displayName = 'proto.google.protobuf.DescriptorProto.ReservedRange';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.DescriptorProto.ReservedRange.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.DescriptorProto.ReservedRange.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.DescriptorProto.ReservedRange} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.DescriptorProto.ReservedRange.toObject = function(includeInstance, msg) {
  var f, obj = {
    start: jspb.Message.getField(msg, 1),
    end: jspb.Message.getField(msg, 2)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.DescriptorProto.ReservedRange}
 */
proto.google.protobuf.DescriptorProto.ReservedRange.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.DescriptorProto.ReservedRange;
  return proto.google.protobuf.DescriptorProto.ReservedRange.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.DescriptorProto.ReservedRange} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.DescriptorProto.ReservedRange}
 */
proto.google.protobuf.DescriptorProto.ReservedRange.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStart(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEnd(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.DescriptorProto.ReservedRange.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.DescriptorProto.ReservedRange.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.DescriptorProto.ReservedRange} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.DescriptorProto.ReservedRange.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 start = 1;
 * @return {number}
 */
proto.google.protobuf.DescriptorProto.ReservedRange.prototype.getStart = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.google.protobuf.DescriptorProto.ReservedRange.prototype.setStart = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.DescriptorProto.ReservedRange.prototype.clearStart = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.DescriptorProto.ReservedRange.prototype.hasStart = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 end = 2;
 * @return {number}
 */
proto.google.protobuf.DescriptorProto.ReservedRange.prototype.getEnd = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.google.protobuf.DescriptorProto.ReservedRange.prototype.setEnd = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.DescriptorProto.ReservedRange.prototype.clearEnd = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.DescriptorProto.ReservedRange.prototype.hasEnd = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.DescriptorProto.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.protobuf.DescriptorProto.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.DescriptorProto.prototype.clearName = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.DescriptorProto.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated FieldDescriptorProto field = 2;
 * @return {!Array<!proto.google.protobuf.FieldDescriptorProto>}
 */
proto.google.protobuf.DescriptorProto.prototype.getFieldList = function() {
  return /** @type{!Array<!proto.google.protobuf.FieldDescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.FieldDescriptorProto, 2));
};


/** @param {!Array<!proto.google.protobuf.FieldDescriptorProto>} value */
proto.google.protobuf.DescriptorProto.prototype.setFieldList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.google.protobuf.FieldDescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.FieldDescriptorProto}
 */
proto.google.protobuf.DescriptorProto.prototype.addField = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.google.protobuf.FieldDescriptorProto, opt_index);
};


proto.google.protobuf.DescriptorProto.prototype.clearFieldList = function() {
  this.setFieldList([]);
};


/**
 * repeated FieldDescriptorProto extension = 6;
 * @return {!Array<!proto.google.protobuf.FieldDescriptorProto>}
 */
proto.google.protobuf.DescriptorProto.prototype.getExtensionList = function() {
  return /** @type{!Array<!proto.google.protobuf.FieldDescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.FieldDescriptorProto, 6));
};


/** @param {!Array<!proto.google.protobuf.FieldDescriptorProto>} value */
proto.google.protobuf.DescriptorProto.prototype.setExtensionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.google.protobuf.FieldDescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.FieldDescriptorProto}
 */
proto.google.protobuf.DescriptorProto.prototype.addExtension$ = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.google.protobuf.FieldDescriptorProto, opt_index);
};


proto.google.protobuf.DescriptorProto.prototype.clearExtensionList = function() {
  this.setExtensionList([]);
};


/**
 * repeated DescriptorProto nested_type = 3;
 * @return {!Array<!proto.google.protobuf.DescriptorProto>}
 */
proto.google.protobuf.DescriptorProto.prototype.getNestedTypeList = function() {
  return /** @type{!Array<!proto.google.protobuf.DescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.DescriptorProto, 3));
};


/** @param {!Array<!proto.google.protobuf.DescriptorProto>} value */
proto.google.protobuf.DescriptorProto.prototype.setNestedTypeList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.google.protobuf.DescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.DescriptorProto}
 */
proto.google.protobuf.DescriptorProto.prototype.addNestedType = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.google.protobuf.DescriptorProto, opt_index);
};


proto.google.protobuf.DescriptorProto.prototype.clearNestedTypeList = function() {
  this.setNestedTypeList([]);
};


/**
 * repeated EnumDescriptorProto enum_type = 4;
 * @return {!Array<!proto.google.protobuf.EnumDescriptorProto>}
 */
proto.google.protobuf.DescriptorProto.prototype.getEnumTypeList = function() {
  return /** @type{!Array<!proto.google.protobuf.EnumDescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.EnumDescriptorProto, 4));
};


/** @param {!Array<!proto.google.protobuf.EnumDescriptorProto>} value */
proto.google.protobuf.DescriptorProto.prototype.setEnumTypeList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.google.protobuf.EnumDescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.EnumDescriptorProto}
 */
proto.google.protobuf.DescriptorProto.prototype.addEnumType = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.google.protobuf.EnumDescriptorProto, opt_index);
};


proto.google.protobuf.DescriptorProto.prototype.clearEnumTypeList = function() {
  this.setEnumTypeList([]);
};


/**
 * repeated ExtensionRange extension_range = 5;
 * @return {!Array<!proto.google.protobuf.DescriptorProto.ExtensionRange>}
 */
proto.google.protobuf.DescriptorProto.prototype.getExtensionRangeList = function() {
  return /** @type{!Array<!proto.google.protobuf.DescriptorProto.ExtensionRange>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.DescriptorProto.ExtensionRange, 5));
};


/** @param {!Array<!proto.google.protobuf.DescriptorProto.ExtensionRange>} value */
proto.google.protobuf.DescriptorProto.prototype.setExtensionRangeList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.google.protobuf.DescriptorProto.ExtensionRange=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.DescriptorProto.ExtensionRange}
 */
proto.google.protobuf.DescriptorProto.prototype.addExtensionRange = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.google.protobuf.DescriptorProto.ExtensionRange, opt_index);
};


proto.google.protobuf.DescriptorProto.prototype.clearExtensionRangeList = function() {
  this.setExtensionRangeList([]);
};


/**
 * repeated OneofDescriptorProto oneof_decl = 8;
 * @return {!Array<!proto.google.protobuf.OneofDescriptorProto>}
 */
proto.google.protobuf.DescriptorProto.prototype.getOneofDeclList = function() {
  return /** @type{!Array<!proto.google.protobuf.OneofDescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.OneofDescriptorProto, 8));
};


/** @param {!Array<!proto.google.protobuf.OneofDescriptorProto>} value */
proto.google.protobuf.DescriptorProto.prototype.setOneofDeclList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.google.protobuf.OneofDescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.OneofDescriptorProto}
 */
proto.google.protobuf.DescriptorProto.prototype.addOneofDecl = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.google.protobuf.OneofDescriptorProto, opt_index);
};


proto.google.protobuf.DescriptorProto.prototype.clearOneofDeclList = function() {
  this.setOneofDeclList([]);
};


/**
 * optional MessageOptions options = 7;
 * @return {?proto.google.protobuf.MessageOptions}
 */
proto.google.protobuf.DescriptorProto.prototype.getOptions = function() {
  return /** @type{?proto.google.protobuf.MessageOptions} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.MessageOptions, 7));
};


/** @param {?proto.google.protobuf.MessageOptions|undefined} value */
proto.google.protobuf.DescriptorProto.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 7, value);
};


proto.google.protobuf.DescriptorProto.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.DescriptorProto.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * repeated ReservedRange reserved_range = 9;
 * @return {!Array<!proto.google.protobuf.DescriptorProto.ReservedRange>}
 */
proto.google.protobuf.DescriptorProto.prototype.getReservedRangeList = function() {
  return /** @type{!Array<!proto.google.protobuf.DescriptorProto.ReservedRange>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.DescriptorProto.ReservedRange, 9));
};


/** @param {!Array<!proto.google.protobuf.DescriptorProto.ReservedRange>} value */
proto.google.protobuf.DescriptorProto.prototype.setReservedRangeList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.google.protobuf.DescriptorProto.ReservedRange=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.DescriptorProto.ReservedRange}
 */
proto.google.protobuf.DescriptorProto.prototype.addReservedRange = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.google.protobuf.DescriptorProto.ReservedRange, opt_index);
};


proto.google.protobuf.DescriptorProto.prototype.clearReservedRangeList = function() {
  this.setReservedRangeList([]);
};


/**
 * repeated string reserved_name = 10;
 * @return {!Array<string>}
 */
proto.google.protobuf.DescriptorProto.prototype.getReservedNameList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 10));
};


/** @param {!Array<string>} value */
proto.google.protobuf.DescriptorProto.prototype.setReservedNameList = function(value) {
  jspb.Message.setField(this, 10, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.google.protobuf.DescriptorProto.prototype.addReservedName = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 10, value, opt_index);
};


proto.google.protobuf.DescriptorProto.prototype.clearReservedNameList = function() {
  this.setReservedNameList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.ExtensionRangeOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.google.protobuf.ExtensionRangeOptions.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.ExtensionRangeOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.ExtensionRangeOptions.displayName = 'proto.google.protobuf.ExtensionRangeOptions';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.ExtensionRangeOptions.repeatedFields_ = [999];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.ExtensionRangeOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.ExtensionRangeOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.ExtensionRangeOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.ExtensionRangeOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    uninterpretedOptionList: jspb.Message.toObjectList(msg.getUninterpretedOptionList(),
    proto.google.protobuf.UninterpretedOption.toObject, includeInstance)
  };

  jspb.Message.toObjectExtension(/** @type {!jspb.Message} */ (msg), obj,
      proto.google.protobuf.ExtensionRangeOptions.extensions, proto.google.protobuf.ExtensionRangeOptions.prototype.getExtension,
      includeInstance);
  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.ExtensionRangeOptions}
 */
proto.google.protobuf.ExtensionRangeOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.ExtensionRangeOptions;
  return proto.google.protobuf.ExtensionRangeOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.ExtensionRangeOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.ExtensionRangeOptions}
 */
proto.google.protobuf.ExtensionRangeOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 999:
      var value = new proto.google.protobuf.UninterpretedOption;
      reader.readMessage(value,proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader);
      msg.addUninterpretedOption(value);
      break;
    default:
      jspb.Message.readBinaryExtension(msg, reader, proto.google.protobuf.ExtensionRangeOptions.extensionsBinary,
        proto.google.protobuf.ExtensionRangeOptions.prototype.getExtension,
        proto.google.protobuf.ExtensionRangeOptions.prototype.setExtension);
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.ExtensionRangeOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.ExtensionRangeOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.ExtensionRangeOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.ExtensionRangeOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUninterpretedOptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      999,
      f,
      proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter
    );
  }
  jspb.Message.serializeBinaryExtensions(message, writer,
    proto.google.protobuf.ExtensionRangeOptions.extensionsBinary, proto.google.protobuf.ExtensionRangeOptions.prototype.getExtension);
};


/**
 * repeated UninterpretedOption uninterpreted_option = 999;
 * @return {!Array<!proto.google.protobuf.UninterpretedOption>}
 */
proto.google.protobuf.ExtensionRangeOptions.prototype.getUninterpretedOptionList = function() {
  return /** @type{!Array<!proto.google.protobuf.UninterpretedOption>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.UninterpretedOption, 999));
};


/** @param {!Array<!proto.google.protobuf.UninterpretedOption>} value */
proto.google.protobuf.ExtensionRangeOptions.prototype.setUninterpretedOptionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 999, value);
};


/**
 * @param {!proto.google.protobuf.UninterpretedOption=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.ExtensionRangeOptions.prototype.addUninterpretedOption = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 999, opt_value, proto.google.protobuf.UninterpretedOption, opt_index);
};


proto.google.protobuf.ExtensionRangeOptions.prototype.clearUninterpretedOptionList = function() {
  this.setUninterpretedOptionList([]);
};



/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldInfo>}
 */
proto.google.protobuf.ExtensionRangeOptions.extensions = {};


/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldBinaryInfo>}
 */
proto.google.protobuf.ExtensionRangeOptions.extensionsBinary = {};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.FieldDescriptorProto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.FieldDescriptorProto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.FieldDescriptorProto.displayName = 'proto.google.protobuf.FieldDescriptorProto';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.FieldDescriptorProto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.FieldDescriptorProto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.FieldDescriptorProto.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getField(msg, 1),
    number: jspb.Message.getField(msg, 3),
    label: jspb.Message.getField(msg, 4),
    type: jspb.Message.getField(msg, 5),
    typeName: jspb.Message.getField(msg, 6),
    extendee: jspb.Message.getField(msg, 2),
    defaultValue: jspb.Message.getField(msg, 7),
    oneofIndex: jspb.Message.getField(msg, 9),
    jsonName: jspb.Message.getField(msg, 10),
    options: (f = msg.getOptions()) && proto.google.protobuf.FieldOptions.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.FieldDescriptorProto}
 */
proto.google.protobuf.FieldDescriptorProto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.FieldDescriptorProto;
  return proto.google.protobuf.FieldDescriptorProto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.FieldDescriptorProto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.FieldDescriptorProto}
 */
proto.google.protobuf.FieldDescriptorProto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumber(value);
      break;
    case 4:
      var value = /** @type {!proto.google.protobuf.FieldDescriptorProto.Label} */ (reader.readEnum());
      msg.setLabel(value);
      break;
    case 5:
      var value = /** @type {!proto.google.protobuf.FieldDescriptorProto.Type} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setTypeName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setExtendee(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setDefaultValue(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setOneofIndex(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setJsonName(value);
      break;
    case 8:
      var value = new proto.google.protobuf.FieldOptions;
      reader.readMessage(value,proto.google.protobuf.FieldOptions.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.FieldDescriptorProto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.FieldDescriptorProto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.FieldDescriptorProto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = /** @type {!proto.google.protobuf.FieldDescriptorProto.Label} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = /** @type {!proto.google.protobuf.FieldDescriptorProto.Type} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeString(
      6,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeString(
      7,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 9));
  if (f != null) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 10));
  if (f != null) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.google.protobuf.FieldOptions.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.google.protobuf.FieldDescriptorProto.Type = {
  TYPE_DOUBLE: 1,
  TYPE_FLOAT: 2,
  TYPE_INT64: 3,
  TYPE_UINT64: 4,
  TYPE_INT32: 5,
  TYPE_FIXED64: 6,
  TYPE_FIXED32: 7,
  TYPE_BOOL: 8,
  TYPE_STRING: 9,
  TYPE_GROUP: 10,
  TYPE_MESSAGE: 11,
  TYPE_BYTES: 12,
  TYPE_UINT32: 13,
  TYPE_ENUM: 14,
  TYPE_SFIXED32: 15,
  TYPE_SFIXED64: 16,
  TYPE_SINT32: 17,
  TYPE_SINT64: 18
};

/**
 * @enum {number}
 */
proto.google.protobuf.FieldDescriptorProto.Label = {
  LABEL_OPTIONAL: 1,
  LABEL_REQUIRED: 2,
  LABEL_REPEATED: 3
};

/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.protobuf.FieldDescriptorProto.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.FieldDescriptorProto.prototype.clearName = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 number = 3;
 * @return {number}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.getNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.google.protobuf.FieldDescriptorProto.prototype.setNumber = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.google.protobuf.FieldDescriptorProto.prototype.clearNumber = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.hasNumber = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Label label = 4;
 * @return {!proto.google.protobuf.FieldDescriptorProto.Label}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.getLabel = function() {
  return /** @type {!proto.google.protobuf.FieldDescriptorProto.Label} */ (jspb.Message.getFieldWithDefault(this, 4, 1));
};


/** @param {!proto.google.protobuf.FieldDescriptorProto.Label} value */
proto.google.protobuf.FieldDescriptorProto.prototype.setLabel = function(value) {
  jspb.Message.setField(this, 4, value);
};


proto.google.protobuf.FieldDescriptorProto.prototype.clearLabel = function() {
  jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.hasLabel = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Type type = 5;
 * @return {!proto.google.protobuf.FieldDescriptorProto.Type}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.getType = function() {
  return /** @type {!proto.google.protobuf.FieldDescriptorProto.Type} */ (jspb.Message.getFieldWithDefault(this, 5, 1));
};


/** @param {!proto.google.protobuf.FieldDescriptorProto.Type} value */
proto.google.protobuf.FieldDescriptorProto.prototype.setType = function(value) {
  jspb.Message.setField(this, 5, value);
};


proto.google.protobuf.FieldDescriptorProto.prototype.clearType = function() {
  jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.hasType = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string type_name = 6;
 * @return {string}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.getTypeName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.google.protobuf.FieldDescriptorProto.prototype.setTypeName = function(value) {
  jspb.Message.setField(this, 6, value);
};


proto.google.protobuf.FieldDescriptorProto.prototype.clearTypeName = function() {
  jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.hasTypeName = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional string extendee = 2;
 * @return {string}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.getExtendee = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.google.protobuf.FieldDescriptorProto.prototype.setExtendee = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.FieldDescriptorProto.prototype.clearExtendee = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.hasExtendee = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string default_value = 7;
 * @return {string}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.getDefaultValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/** @param {string} value */
proto.google.protobuf.FieldDescriptorProto.prototype.setDefaultValue = function(value) {
  jspb.Message.setField(this, 7, value);
};


proto.google.protobuf.FieldDescriptorProto.prototype.clearDefaultValue = function() {
  jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.hasDefaultValue = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional int32 oneof_index = 9;
 * @return {number}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.getOneofIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/** @param {number} value */
proto.google.protobuf.FieldDescriptorProto.prototype.setOneofIndex = function(value) {
  jspb.Message.setField(this, 9, value);
};


proto.google.protobuf.FieldDescriptorProto.prototype.clearOneofIndex = function() {
  jspb.Message.setField(this, 9, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.hasOneofIndex = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional string json_name = 10;
 * @return {string}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.getJsonName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/** @param {string} value */
proto.google.protobuf.FieldDescriptorProto.prototype.setJsonName = function(value) {
  jspb.Message.setField(this, 10, value);
};


proto.google.protobuf.FieldDescriptorProto.prototype.clearJsonName = function() {
  jspb.Message.setField(this, 10, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.hasJsonName = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional FieldOptions options = 8;
 * @return {?proto.google.protobuf.FieldOptions}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.getOptions = function() {
  return /** @type{?proto.google.protobuf.FieldOptions} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.FieldOptions, 8));
};


/** @param {?proto.google.protobuf.FieldOptions|undefined} value */
proto.google.protobuf.FieldDescriptorProto.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 8, value);
};


proto.google.protobuf.FieldDescriptorProto.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldDescriptorProto.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 8) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.OneofDescriptorProto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.OneofDescriptorProto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.OneofDescriptorProto.displayName = 'proto.google.protobuf.OneofDescriptorProto';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.OneofDescriptorProto.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.OneofDescriptorProto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.OneofDescriptorProto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.OneofDescriptorProto.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getField(msg, 1),
    options: (f = msg.getOptions()) && proto.google.protobuf.OneofOptions.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.OneofDescriptorProto}
 */
proto.google.protobuf.OneofDescriptorProto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.OneofDescriptorProto;
  return proto.google.protobuf.OneofDescriptorProto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.OneofDescriptorProto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.OneofDescriptorProto}
 */
proto.google.protobuf.OneofDescriptorProto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.google.protobuf.OneofOptions;
      reader.readMessage(value,proto.google.protobuf.OneofOptions.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.OneofDescriptorProto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.OneofDescriptorProto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.OneofDescriptorProto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.OneofDescriptorProto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.google.protobuf.OneofOptions.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.OneofDescriptorProto.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.protobuf.OneofDescriptorProto.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.OneofDescriptorProto.prototype.clearName = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.OneofDescriptorProto.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional OneofOptions options = 2;
 * @return {?proto.google.protobuf.OneofOptions}
 */
proto.google.protobuf.OneofDescriptorProto.prototype.getOptions = function() {
  return /** @type{?proto.google.protobuf.OneofOptions} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.OneofOptions, 2));
};


/** @param {?proto.google.protobuf.OneofOptions|undefined} value */
proto.google.protobuf.OneofDescriptorProto.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.google.protobuf.OneofDescriptorProto.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.OneofDescriptorProto.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.EnumDescriptorProto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.EnumDescriptorProto.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.EnumDescriptorProto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.EnumDescriptorProto.displayName = 'proto.google.protobuf.EnumDescriptorProto';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.EnumDescriptorProto.repeatedFields_ = [2,4,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.EnumDescriptorProto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.EnumDescriptorProto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.EnumDescriptorProto.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getField(msg, 1),
    valueList: jspb.Message.toObjectList(msg.getValueList(),
    proto.google.protobuf.EnumValueDescriptorProto.toObject, includeInstance),
    options: (f = msg.getOptions()) && proto.google.protobuf.EnumOptions.toObject(includeInstance, f),
    reservedRangeList: jspb.Message.toObjectList(msg.getReservedRangeList(),
    proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.toObject, includeInstance),
    reservedNameList: jspb.Message.getRepeatedField(msg, 5)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.EnumDescriptorProto}
 */
proto.google.protobuf.EnumDescriptorProto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.EnumDescriptorProto;
  return proto.google.protobuf.EnumDescriptorProto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.EnumDescriptorProto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.EnumDescriptorProto}
 */
proto.google.protobuf.EnumDescriptorProto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.google.protobuf.EnumValueDescriptorProto;
      reader.readMessage(value,proto.google.protobuf.EnumValueDescriptorProto.deserializeBinaryFromReader);
      msg.addValue(value);
      break;
    case 3:
      var value = new proto.google.protobuf.EnumOptions;
      reader.readMessage(value,proto.google.protobuf.EnumOptions.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    case 4:
      var value = new proto.google.protobuf.EnumDescriptorProto.EnumReservedRange;
      reader.readMessage(value,proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.deserializeBinaryFromReader);
      msg.addReservedRange(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.addReservedName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.EnumDescriptorProto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.EnumDescriptorProto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.EnumDescriptorProto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValueList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.google.protobuf.EnumValueDescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.google.protobuf.EnumOptions.serializeBinaryToWriter
    );
  }
  f = message.getReservedRangeList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.serializeBinaryToWriter
    );
  }
  f = message.getReservedNameList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      5,
      f
    );
  }
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.EnumDescriptorProto.EnumReservedRange, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.displayName = 'proto.google.protobuf.EnumDescriptorProto.EnumReservedRange';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.EnumDescriptorProto.EnumReservedRange} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.toObject = function(includeInstance, msg) {
  var f, obj = {
    start: jspb.Message.getField(msg, 1),
    end: jspb.Message.getField(msg, 2)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.EnumDescriptorProto.EnumReservedRange}
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.EnumDescriptorProto.EnumReservedRange;
  return proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.EnumDescriptorProto.EnumReservedRange} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.EnumDescriptorProto.EnumReservedRange}
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStart(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEnd(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.EnumDescriptorProto.EnumReservedRange} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 start = 1;
 * @return {number}
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.prototype.getStart = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.prototype.setStart = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.prototype.clearStart = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.prototype.hasStart = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 end = 2;
 * @return {number}
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.prototype.getEnd = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.prototype.setEnd = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.prototype.clearEnd = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.EnumDescriptorProto.EnumReservedRange.prototype.hasEnd = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.protobuf.EnumDescriptorProto.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.EnumDescriptorProto.prototype.clearName = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated EnumValueDescriptorProto value = 2;
 * @return {!Array<!proto.google.protobuf.EnumValueDescriptorProto>}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.getValueList = function() {
  return /** @type{!Array<!proto.google.protobuf.EnumValueDescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.EnumValueDescriptorProto, 2));
};


/** @param {!Array<!proto.google.protobuf.EnumValueDescriptorProto>} value */
proto.google.protobuf.EnumDescriptorProto.prototype.setValueList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.google.protobuf.EnumValueDescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.EnumValueDescriptorProto}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.addValue = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.google.protobuf.EnumValueDescriptorProto, opt_index);
};


proto.google.protobuf.EnumDescriptorProto.prototype.clearValueList = function() {
  this.setValueList([]);
};


/**
 * optional EnumOptions options = 3;
 * @return {?proto.google.protobuf.EnumOptions}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.getOptions = function() {
  return /** @type{?proto.google.protobuf.EnumOptions} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.EnumOptions, 3));
};


/** @param {?proto.google.protobuf.EnumOptions|undefined} value */
proto.google.protobuf.EnumDescriptorProto.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.google.protobuf.EnumDescriptorProto.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated EnumReservedRange reserved_range = 4;
 * @return {!Array<!proto.google.protobuf.EnumDescriptorProto.EnumReservedRange>}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.getReservedRangeList = function() {
  return /** @type{!Array<!proto.google.protobuf.EnumDescriptorProto.EnumReservedRange>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.EnumDescriptorProto.EnumReservedRange, 4));
};


/** @param {!Array<!proto.google.protobuf.EnumDescriptorProto.EnumReservedRange>} value */
proto.google.protobuf.EnumDescriptorProto.prototype.setReservedRangeList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.google.protobuf.EnumDescriptorProto.EnumReservedRange=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.EnumDescriptorProto.EnumReservedRange}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.addReservedRange = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.google.protobuf.EnumDescriptorProto.EnumReservedRange, opt_index);
};


proto.google.protobuf.EnumDescriptorProto.prototype.clearReservedRangeList = function() {
  this.setReservedRangeList([]);
};


/**
 * repeated string reserved_name = 5;
 * @return {!Array<string>}
 */
proto.google.protobuf.EnumDescriptorProto.prototype.getReservedNameList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 5));
};


/** @param {!Array<string>} value */
proto.google.protobuf.EnumDescriptorProto.prototype.setReservedNameList = function(value) {
  jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.google.protobuf.EnumDescriptorProto.prototype.addReservedName = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


proto.google.protobuf.EnumDescriptorProto.prototype.clearReservedNameList = function() {
  this.setReservedNameList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.EnumValueDescriptorProto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.EnumValueDescriptorProto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.EnumValueDescriptorProto.displayName = 'proto.google.protobuf.EnumValueDescriptorProto';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.EnumValueDescriptorProto.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.EnumValueDescriptorProto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.EnumValueDescriptorProto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.EnumValueDescriptorProto.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getField(msg, 1),
    number: jspb.Message.getField(msg, 2),
    options: (f = msg.getOptions()) && proto.google.protobuf.EnumValueOptions.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.EnumValueDescriptorProto}
 */
proto.google.protobuf.EnumValueDescriptorProto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.EnumValueDescriptorProto;
  return proto.google.protobuf.EnumValueDescriptorProto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.EnumValueDescriptorProto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.EnumValueDescriptorProto}
 */
proto.google.protobuf.EnumValueDescriptorProto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNumber(value);
      break;
    case 3:
      var value = new proto.google.protobuf.EnumValueOptions;
      reader.readMessage(value,proto.google.protobuf.EnumValueOptions.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.EnumValueDescriptorProto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.EnumValueDescriptorProto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.EnumValueDescriptorProto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.EnumValueDescriptorProto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.google.protobuf.EnumValueOptions.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.EnumValueDescriptorProto.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.protobuf.EnumValueDescriptorProto.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.EnumValueDescriptorProto.prototype.clearName = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.EnumValueDescriptorProto.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 number = 2;
 * @return {number}
 */
proto.google.protobuf.EnumValueDescriptorProto.prototype.getNumber = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.google.protobuf.EnumValueDescriptorProto.prototype.setNumber = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.EnumValueDescriptorProto.prototype.clearNumber = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.EnumValueDescriptorProto.prototype.hasNumber = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional EnumValueOptions options = 3;
 * @return {?proto.google.protobuf.EnumValueOptions}
 */
proto.google.protobuf.EnumValueDescriptorProto.prototype.getOptions = function() {
  return /** @type{?proto.google.protobuf.EnumValueOptions} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.EnumValueOptions, 3));
};


/** @param {?proto.google.protobuf.EnumValueOptions|undefined} value */
proto.google.protobuf.EnumValueDescriptorProto.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.google.protobuf.EnumValueDescriptorProto.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.EnumValueDescriptorProto.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.ServiceDescriptorProto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.ServiceDescriptorProto.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.ServiceDescriptorProto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.ServiceDescriptorProto.displayName = 'proto.google.protobuf.ServiceDescriptorProto';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.ServiceDescriptorProto.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.ServiceDescriptorProto.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.ServiceDescriptorProto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.ServiceDescriptorProto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.ServiceDescriptorProto.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getField(msg, 1),
    methodList: jspb.Message.toObjectList(msg.getMethodList(),
    proto.google.protobuf.MethodDescriptorProto.toObject, includeInstance),
    options: (f = msg.getOptions()) && proto.google.protobuf.ServiceOptions.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.ServiceDescriptorProto}
 */
proto.google.protobuf.ServiceDescriptorProto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.ServiceDescriptorProto;
  return proto.google.protobuf.ServiceDescriptorProto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.ServiceDescriptorProto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.ServiceDescriptorProto}
 */
proto.google.protobuf.ServiceDescriptorProto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.google.protobuf.MethodDescriptorProto;
      reader.readMessage(value,proto.google.protobuf.MethodDescriptorProto.deserializeBinaryFromReader);
      msg.addMethod(value);
      break;
    case 3:
      var value = new proto.google.protobuf.ServiceOptions;
      reader.readMessage(value,proto.google.protobuf.ServiceOptions.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.ServiceDescriptorProto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.ServiceDescriptorProto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.ServiceDescriptorProto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.ServiceDescriptorProto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getMethodList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.google.protobuf.MethodDescriptorProto.serializeBinaryToWriter
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.google.protobuf.ServiceOptions.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.ServiceDescriptorProto.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.protobuf.ServiceDescriptorProto.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.ServiceDescriptorProto.prototype.clearName = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.ServiceDescriptorProto.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated MethodDescriptorProto method = 2;
 * @return {!Array<!proto.google.protobuf.MethodDescriptorProto>}
 */
proto.google.protobuf.ServiceDescriptorProto.prototype.getMethodList = function() {
  return /** @type{!Array<!proto.google.protobuf.MethodDescriptorProto>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.MethodDescriptorProto, 2));
};


/** @param {!Array<!proto.google.protobuf.MethodDescriptorProto>} value */
proto.google.protobuf.ServiceDescriptorProto.prototype.setMethodList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.google.protobuf.MethodDescriptorProto=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.MethodDescriptorProto}
 */
proto.google.protobuf.ServiceDescriptorProto.prototype.addMethod = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.google.protobuf.MethodDescriptorProto, opt_index);
};


proto.google.protobuf.ServiceDescriptorProto.prototype.clearMethodList = function() {
  this.setMethodList([]);
};


/**
 * optional ServiceOptions options = 3;
 * @return {?proto.google.protobuf.ServiceOptions}
 */
proto.google.protobuf.ServiceDescriptorProto.prototype.getOptions = function() {
  return /** @type{?proto.google.protobuf.ServiceOptions} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.ServiceOptions, 3));
};


/** @param {?proto.google.protobuf.ServiceOptions|undefined} value */
proto.google.protobuf.ServiceDescriptorProto.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.google.protobuf.ServiceDescriptorProto.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.ServiceDescriptorProto.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.MethodDescriptorProto = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.MethodDescriptorProto, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.MethodDescriptorProto.displayName = 'proto.google.protobuf.MethodDescriptorProto';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.MethodDescriptorProto.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.MethodDescriptorProto} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.MethodDescriptorProto.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getField(msg, 1),
    inputType: jspb.Message.getField(msg, 2),
    outputType: jspb.Message.getField(msg, 3),
    options: (f = msg.getOptions()) && proto.google.protobuf.MethodOptions.toObject(includeInstance, f),
    clientStreaming: jspb.Message.getFieldWithDefault(msg, 5, false),
    serverStreaming: jspb.Message.getFieldWithDefault(msg, 6, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.MethodDescriptorProto}
 */
proto.google.protobuf.MethodDescriptorProto.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.MethodDescriptorProto;
  return proto.google.protobuf.MethodDescriptorProto.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.MethodDescriptorProto} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.MethodDescriptorProto}
 */
proto.google.protobuf.MethodDescriptorProto.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setInputType(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setOutputType(value);
      break;
    case 4:
      var value = new proto.google.protobuf.MethodOptions;
      reader.readMessage(value,proto.google.protobuf.MethodOptions.deserializeBinaryFromReader);
      msg.setOptions(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setClientStreaming(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setServerStreaming(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.MethodDescriptorProto.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.MethodDescriptorProto} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.MethodDescriptorProto.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getOptions();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.google.protobuf.MethodOptions.serializeBinaryToWriter
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeBool(
      5,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeBool(
      6,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.protobuf.MethodDescriptorProto.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.MethodDescriptorProto.prototype.clearName = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string input_type = 2;
 * @return {string}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.getInputType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.google.protobuf.MethodDescriptorProto.prototype.setInputType = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.MethodDescriptorProto.prototype.clearInputType = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.hasInputType = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string output_type = 3;
 * @return {string}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.getOutputType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.google.protobuf.MethodDescriptorProto.prototype.setOutputType = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.google.protobuf.MethodDescriptorProto.prototype.clearOutputType = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.hasOutputType = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional MethodOptions options = 4;
 * @return {?proto.google.protobuf.MethodOptions}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.getOptions = function() {
  return /** @type{?proto.google.protobuf.MethodOptions} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.MethodOptions, 4));
};


/** @param {?proto.google.protobuf.MethodOptions|undefined} value */
proto.google.protobuf.MethodDescriptorProto.prototype.setOptions = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.google.protobuf.MethodDescriptorProto.prototype.clearOptions = function() {
  this.setOptions(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.hasOptions = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional bool client_streaming = 5;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.getClientStreaming = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 5, false));
};


/** @param {boolean} value */
proto.google.protobuf.MethodDescriptorProto.prototype.setClientStreaming = function(value) {
  jspb.Message.setField(this, 5, value);
};


proto.google.protobuf.MethodDescriptorProto.prototype.clearClientStreaming = function() {
  jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.hasClientStreaming = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional bool server_streaming = 6;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.getServerStreaming = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 6, false));
};


/** @param {boolean} value */
proto.google.protobuf.MethodDescriptorProto.prototype.setServerStreaming = function(value) {
  jspb.Message.setField(this, 6, value);
};


proto.google.protobuf.MethodDescriptorProto.prototype.clearServerStreaming = function() {
  jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MethodDescriptorProto.prototype.hasServerStreaming = function() {
  return jspb.Message.getField(this, 6) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.FileOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.google.protobuf.FileOptions.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.FileOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.FileOptions.displayName = 'proto.google.protobuf.FileOptions';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.FileOptions.repeatedFields_ = [999];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.FileOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.FileOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.FileOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.FileOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    javaPackage: jspb.Message.getField(msg, 1),
    javaOuterClassname: jspb.Message.getField(msg, 8),
    javaMultipleFiles: jspb.Message.getFieldWithDefault(msg, 10, false),
    javaGenerateEqualsAndHash: jspb.Message.getField(msg, 20),
    javaStringCheckUtf8: jspb.Message.getFieldWithDefault(msg, 27, false),
    optimizeFor: jspb.Message.getFieldWithDefault(msg, 9, 1),
    goPackage: jspb.Message.getField(msg, 11),
    ccGenericServices: jspb.Message.getFieldWithDefault(msg, 16, false),
    javaGenericServices: jspb.Message.getFieldWithDefault(msg, 17, false),
    pyGenericServices: jspb.Message.getFieldWithDefault(msg, 18, false),
    phpGenericServices: jspb.Message.getFieldWithDefault(msg, 42, false),
    deprecated: jspb.Message.getFieldWithDefault(msg, 23, false),
    ccEnableArenas: jspb.Message.getFieldWithDefault(msg, 31, false),
    objcClassPrefix: jspb.Message.getField(msg, 36),
    csharpNamespace: jspb.Message.getField(msg, 37),
    swiftPrefix: jspb.Message.getField(msg, 39),
    phpClassPrefix: jspb.Message.getField(msg, 40),
    phpNamespace: jspb.Message.getField(msg, 41),
    phpMetadataNamespace: jspb.Message.getField(msg, 44),
    rubyPackage: jspb.Message.getField(msg, 45),
    uninterpretedOptionList: jspb.Message.toObjectList(msg.getUninterpretedOptionList(),
    proto.google.protobuf.UninterpretedOption.toObject, includeInstance)
  };

  jspb.Message.toObjectExtension(/** @type {!jspb.Message} */ (msg), obj,
      proto.google.protobuf.FileOptions.extensions, proto.google.protobuf.FileOptions.prototype.getExtension,
      includeInstance);
  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.FileOptions}
 */
proto.google.protobuf.FileOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.FileOptions;
  return proto.google.protobuf.FileOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.FileOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.FileOptions}
 */
proto.google.protobuf.FileOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setJavaPackage(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setJavaOuterClassname(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setJavaMultipleFiles(value);
      break;
    case 20:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setJavaGenerateEqualsAndHash(value);
      break;
    case 27:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setJavaStringCheckUtf8(value);
      break;
    case 9:
      var value = /** @type {!proto.google.protobuf.FileOptions.OptimizeMode} */ (reader.readEnum());
      msg.setOptimizeFor(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setGoPackage(value);
      break;
    case 16:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCcGenericServices(value);
      break;
    case 17:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setJavaGenericServices(value);
      break;
    case 18:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPyGenericServices(value);
      break;
    case 42:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPhpGenericServices(value);
      break;
    case 23:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeprecated(value);
      break;
    case 31:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCcEnableArenas(value);
      break;
    case 36:
      var value = /** @type {string} */ (reader.readString());
      msg.setObjcClassPrefix(value);
      break;
    case 37:
      var value = /** @type {string} */ (reader.readString());
      msg.setCsharpNamespace(value);
      break;
    case 39:
      var value = /** @type {string} */ (reader.readString());
      msg.setSwiftPrefix(value);
      break;
    case 40:
      var value = /** @type {string} */ (reader.readString());
      msg.setPhpClassPrefix(value);
      break;
    case 41:
      var value = /** @type {string} */ (reader.readString());
      msg.setPhpNamespace(value);
      break;
    case 44:
      var value = /** @type {string} */ (reader.readString());
      msg.setPhpMetadataNamespace(value);
      break;
    case 45:
      var value = /** @type {string} */ (reader.readString());
      msg.setRubyPackage(value);
      break;
    case 999:
      var value = new proto.google.protobuf.UninterpretedOption;
      reader.readMessage(value,proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader);
      msg.addUninterpretedOption(value);
      break;
    default:
      jspb.Message.readBinaryExtension(msg, reader, proto.google.protobuf.FileOptions.extensionsBinary,
        proto.google.protobuf.FileOptions.prototype.getExtension,
        proto.google.protobuf.FileOptions.prototype.setExtension);
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.FileOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.FileOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.FileOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.FileOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeString(
      8,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 10));
  if (f != null) {
    writer.writeBool(
      10,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 20));
  if (f != null) {
    writer.writeBool(
      20,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 27));
  if (f != null) {
    writer.writeBool(
      27,
      f
    );
  }
  f = /** @type {!proto.google.protobuf.FileOptions.OptimizeMode} */ (jspb.Message.getField(message, 9));
  if (f != null) {
    writer.writeEnum(
      9,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 11));
  if (f != null) {
    writer.writeString(
      11,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 16));
  if (f != null) {
    writer.writeBool(
      16,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 17));
  if (f != null) {
    writer.writeBool(
      17,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 18));
  if (f != null) {
    writer.writeBool(
      18,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 42));
  if (f != null) {
    writer.writeBool(
      42,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 23));
  if (f != null) {
    writer.writeBool(
      23,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 31));
  if (f != null) {
    writer.writeBool(
      31,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 36));
  if (f != null) {
    writer.writeString(
      36,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 37));
  if (f != null) {
    writer.writeString(
      37,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 39));
  if (f != null) {
    writer.writeString(
      39,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 40));
  if (f != null) {
    writer.writeString(
      40,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 41));
  if (f != null) {
    writer.writeString(
      41,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 44));
  if (f != null) {
    writer.writeString(
      44,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 45));
  if (f != null) {
    writer.writeString(
      45,
      f
    );
  }
  f = message.getUninterpretedOptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      999,
      f,
      proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter
    );
  }
  jspb.Message.serializeBinaryExtensions(message, writer,
    proto.google.protobuf.FileOptions.extensionsBinary, proto.google.protobuf.FileOptions.prototype.getExtension);
};


/**
 * @enum {number}
 */
proto.google.protobuf.FileOptions.OptimizeMode = {
  SPEED: 1,
  CODE_SIZE: 2,
  LITE_RUNTIME: 3
};

/**
 * optional string java_package = 1;
 * @return {string}
 */
proto.google.protobuf.FileOptions.prototype.getJavaPackage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.protobuf.FileOptions.prototype.setJavaPackage = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.FileOptions.prototype.clearJavaPackage = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasJavaPackage = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string java_outer_classname = 8;
 * @return {string}
 */
proto.google.protobuf.FileOptions.prototype.getJavaOuterClassname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/** @param {string} value */
proto.google.protobuf.FileOptions.prototype.setJavaOuterClassname = function(value) {
  jspb.Message.setField(this, 8, value);
};


proto.google.protobuf.FileOptions.prototype.clearJavaOuterClassname = function() {
  jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasJavaOuterClassname = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional bool java_multiple_files = 10;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FileOptions.prototype.getJavaMultipleFiles = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 10, false));
};


/** @param {boolean} value */
proto.google.protobuf.FileOptions.prototype.setJavaMultipleFiles = function(value) {
  jspb.Message.setField(this, 10, value);
};


proto.google.protobuf.FileOptions.prototype.clearJavaMultipleFiles = function() {
  jspb.Message.setField(this, 10, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasJavaMultipleFiles = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional bool java_generate_equals_and_hash = 20;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FileOptions.prototype.getJavaGenerateEqualsAndHash = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 20, false));
};


/** @param {boolean} value */
proto.google.protobuf.FileOptions.prototype.setJavaGenerateEqualsAndHash = function(value) {
  jspb.Message.setField(this, 20, value);
};


proto.google.protobuf.FileOptions.prototype.clearJavaGenerateEqualsAndHash = function() {
  jspb.Message.setField(this, 20, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasJavaGenerateEqualsAndHash = function() {
  return jspb.Message.getField(this, 20) != null;
};


/**
 * optional bool java_string_check_utf8 = 27;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FileOptions.prototype.getJavaStringCheckUtf8 = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 27, false));
};


/** @param {boolean} value */
proto.google.protobuf.FileOptions.prototype.setJavaStringCheckUtf8 = function(value) {
  jspb.Message.setField(this, 27, value);
};


proto.google.protobuf.FileOptions.prototype.clearJavaStringCheckUtf8 = function() {
  jspb.Message.setField(this, 27, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasJavaStringCheckUtf8 = function() {
  return jspb.Message.getField(this, 27) != null;
};


/**
 * optional OptimizeMode optimize_for = 9;
 * @return {!proto.google.protobuf.FileOptions.OptimizeMode}
 */
proto.google.protobuf.FileOptions.prototype.getOptimizeFor = function() {
  return /** @type {!proto.google.protobuf.FileOptions.OptimizeMode} */ (jspb.Message.getFieldWithDefault(this, 9, 1));
};


/** @param {!proto.google.protobuf.FileOptions.OptimizeMode} value */
proto.google.protobuf.FileOptions.prototype.setOptimizeFor = function(value) {
  jspb.Message.setField(this, 9, value);
};


proto.google.protobuf.FileOptions.prototype.clearOptimizeFor = function() {
  jspb.Message.setField(this, 9, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasOptimizeFor = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional string go_package = 11;
 * @return {string}
 */
proto.google.protobuf.FileOptions.prototype.getGoPackage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/** @param {string} value */
proto.google.protobuf.FileOptions.prototype.setGoPackage = function(value) {
  jspb.Message.setField(this, 11, value);
};


proto.google.protobuf.FileOptions.prototype.clearGoPackage = function() {
  jspb.Message.setField(this, 11, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasGoPackage = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional bool cc_generic_services = 16;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FileOptions.prototype.getCcGenericServices = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 16, false));
};


/** @param {boolean} value */
proto.google.protobuf.FileOptions.prototype.setCcGenericServices = function(value) {
  jspb.Message.setField(this, 16, value);
};


proto.google.protobuf.FileOptions.prototype.clearCcGenericServices = function() {
  jspb.Message.setField(this, 16, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasCcGenericServices = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * optional bool java_generic_services = 17;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FileOptions.prototype.getJavaGenericServices = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 17, false));
};


/** @param {boolean} value */
proto.google.protobuf.FileOptions.prototype.setJavaGenericServices = function(value) {
  jspb.Message.setField(this, 17, value);
};


proto.google.protobuf.FileOptions.prototype.clearJavaGenericServices = function() {
  jspb.Message.setField(this, 17, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasJavaGenericServices = function() {
  return jspb.Message.getField(this, 17) != null;
};


/**
 * optional bool py_generic_services = 18;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FileOptions.prototype.getPyGenericServices = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 18, false));
};


/** @param {boolean} value */
proto.google.protobuf.FileOptions.prototype.setPyGenericServices = function(value) {
  jspb.Message.setField(this, 18, value);
};


proto.google.protobuf.FileOptions.prototype.clearPyGenericServices = function() {
  jspb.Message.setField(this, 18, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasPyGenericServices = function() {
  return jspb.Message.getField(this, 18) != null;
};


/**
 * optional bool php_generic_services = 42;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FileOptions.prototype.getPhpGenericServices = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 42, false));
};


/** @param {boolean} value */
proto.google.protobuf.FileOptions.prototype.setPhpGenericServices = function(value) {
  jspb.Message.setField(this, 42, value);
};


proto.google.protobuf.FileOptions.prototype.clearPhpGenericServices = function() {
  jspb.Message.setField(this, 42, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasPhpGenericServices = function() {
  return jspb.Message.getField(this, 42) != null;
};


/**
 * optional bool deprecated = 23;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FileOptions.prototype.getDeprecated = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 23, false));
};


/** @param {boolean} value */
proto.google.protobuf.FileOptions.prototype.setDeprecated = function(value) {
  jspb.Message.setField(this, 23, value);
};


proto.google.protobuf.FileOptions.prototype.clearDeprecated = function() {
  jspb.Message.setField(this, 23, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasDeprecated = function() {
  return jspb.Message.getField(this, 23) != null;
};


/**
 * optional bool cc_enable_arenas = 31;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FileOptions.prototype.getCcEnableArenas = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 31, false));
};


/** @param {boolean} value */
proto.google.protobuf.FileOptions.prototype.setCcEnableArenas = function(value) {
  jspb.Message.setField(this, 31, value);
};


proto.google.protobuf.FileOptions.prototype.clearCcEnableArenas = function() {
  jspb.Message.setField(this, 31, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasCcEnableArenas = function() {
  return jspb.Message.getField(this, 31) != null;
};


/**
 * optional string objc_class_prefix = 36;
 * @return {string}
 */
proto.google.protobuf.FileOptions.prototype.getObjcClassPrefix = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 36, ""));
};


/** @param {string} value */
proto.google.protobuf.FileOptions.prototype.setObjcClassPrefix = function(value) {
  jspb.Message.setField(this, 36, value);
};


proto.google.protobuf.FileOptions.prototype.clearObjcClassPrefix = function() {
  jspb.Message.setField(this, 36, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasObjcClassPrefix = function() {
  return jspb.Message.getField(this, 36) != null;
};


/**
 * optional string csharp_namespace = 37;
 * @return {string}
 */
proto.google.protobuf.FileOptions.prototype.getCsharpNamespace = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 37, ""));
};


/** @param {string} value */
proto.google.protobuf.FileOptions.prototype.setCsharpNamespace = function(value) {
  jspb.Message.setField(this, 37, value);
};


proto.google.protobuf.FileOptions.prototype.clearCsharpNamespace = function() {
  jspb.Message.setField(this, 37, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasCsharpNamespace = function() {
  return jspb.Message.getField(this, 37) != null;
};


/**
 * optional string swift_prefix = 39;
 * @return {string}
 */
proto.google.protobuf.FileOptions.prototype.getSwiftPrefix = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 39, ""));
};


/** @param {string} value */
proto.google.protobuf.FileOptions.prototype.setSwiftPrefix = function(value) {
  jspb.Message.setField(this, 39, value);
};


proto.google.protobuf.FileOptions.prototype.clearSwiftPrefix = function() {
  jspb.Message.setField(this, 39, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasSwiftPrefix = function() {
  return jspb.Message.getField(this, 39) != null;
};


/**
 * optional string php_class_prefix = 40;
 * @return {string}
 */
proto.google.protobuf.FileOptions.prototype.getPhpClassPrefix = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 40, ""));
};


/** @param {string} value */
proto.google.protobuf.FileOptions.prototype.setPhpClassPrefix = function(value) {
  jspb.Message.setField(this, 40, value);
};


proto.google.protobuf.FileOptions.prototype.clearPhpClassPrefix = function() {
  jspb.Message.setField(this, 40, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasPhpClassPrefix = function() {
  return jspb.Message.getField(this, 40) != null;
};


/**
 * optional string php_namespace = 41;
 * @return {string}
 */
proto.google.protobuf.FileOptions.prototype.getPhpNamespace = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 41, ""));
};


/** @param {string} value */
proto.google.protobuf.FileOptions.prototype.setPhpNamespace = function(value) {
  jspb.Message.setField(this, 41, value);
};


proto.google.protobuf.FileOptions.prototype.clearPhpNamespace = function() {
  jspb.Message.setField(this, 41, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasPhpNamespace = function() {
  return jspb.Message.getField(this, 41) != null;
};


/**
 * optional string php_metadata_namespace = 44;
 * @return {string}
 */
proto.google.protobuf.FileOptions.prototype.getPhpMetadataNamespace = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 44, ""));
};


/** @param {string} value */
proto.google.protobuf.FileOptions.prototype.setPhpMetadataNamespace = function(value) {
  jspb.Message.setField(this, 44, value);
};


proto.google.protobuf.FileOptions.prototype.clearPhpMetadataNamespace = function() {
  jspb.Message.setField(this, 44, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasPhpMetadataNamespace = function() {
  return jspb.Message.getField(this, 44) != null;
};


/**
 * optional string ruby_package = 45;
 * @return {string}
 */
proto.google.protobuf.FileOptions.prototype.getRubyPackage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 45, ""));
};


/** @param {string} value */
proto.google.protobuf.FileOptions.prototype.setRubyPackage = function(value) {
  jspb.Message.setField(this, 45, value);
};


proto.google.protobuf.FileOptions.prototype.clearRubyPackage = function() {
  jspb.Message.setField(this, 45, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FileOptions.prototype.hasRubyPackage = function() {
  return jspb.Message.getField(this, 45) != null;
};


/**
 * repeated UninterpretedOption uninterpreted_option = 999;
 * @return {!Array<!proto.google.protobuf.UninterpretedOption>}
 */
proto.google.protobuf.FileOptions.prototype.getUninterpretedOptionList = function() {
  return /** @type{!Array<!proto.google.protobuf.UninterpretedOption>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.UninterpretedOption, 999));
};


/** @param {!Array<!proto.google.protobuf.UninterpretedOption>} value */
proto.google.protobuf.FileOptions.prototype.setUninterpretedOptionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 999, value);
};


/**
 * @param {!proto.google.protobuf.UninterpretedOption=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.FileOptions.prototype.addUninterpretedOption = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 999, opt_value, proto.google.protobuf.UninterpretedOption, opt_index);
};


proto.google.protobuf.FileOptions.prototype.clearUninterpretedOptionList = function() {
  this.setUninterpretedOptionList([]);
};



/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldInfo>}
 */
proto.google.protobuf.FileOptions.extensions = {};


/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldBinaryInfo>}
 */
proto.google.protobuf.FileOptions.extensionsBinary = {};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.MessageOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.google.protobuf.MessageOptions.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.MessageOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.MessageOptions.displayName = 'proto.google.protobuf.MessageOptions';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.MessageOptions.repeatedFields_ = [999];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.MessageOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.MessageOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.MessageOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.MessageOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    messageSetWireFormat: jspb.Message.getFieldWithDefault(msg, 1, false),
    noStandardDescriptorAccessor: jspb.Message.getFieldWithDefault(msg, 2, false),
    deprecated: jspb.Message.getFieldWithDefault(msg, 3, false),
    mapEntry: jspb.Message.getField(msg, 7),
    uninterpretedOptionList: jspb.Message.toObjectList(msg.getUninterpretedOptionList(),
    proto.google.protobuf.UninterpretedOption.toObject, includeInstance)
  };

  jspb.Message.toObjectExtension(/** @type {!jspb.Message} */ (msg), obj,
      proto.google.protobuf.MessageOptions.extensions, proto.google.protobuf.MessageOptions.prototype.getExtension,
      includeInstance);
  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.MessageOptions}
 */
proto.google.protobuf.MessageOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.MessageOptions;
  return proto.google.protobuf.MessageOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.MessageOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.MessageOptions}
 */
proto.google.protobuf.MessageOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setMessageSetWireFormat(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setNoStandardDescriptorAccessor(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeprecated(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setMapEntry(value);
      break;
    case 999:
      var value = new proto.google.protobuf.UninterpretedOption;
      reader.readMessage(value,proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader);
      msg.addUninterpretedOption(value);
      break;
    default:
      jspb.Message.readBinaryExtension(msg, reader, proto.google.protobuf.MessageOptions.extensionsBinary,
        proto.google.protobuf.MessageOptions.prototype.getExtension,
        proto.google.protobuf.MessageOptions.prototype.setExtension);
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.MessageOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.MessageOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.MessageOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.MessageOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {boolean} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBool(
      1,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeBool(
      2,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeBool(
      3,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getUninterpretedOptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      999,
      f,
      proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter
    );
  }
  jspb.Message.serializeBinaryExtensions(message, writer,
    proto.google.protobuf.MessageOptions.extensionsBinary, proto.google.protobuf.MessageOptions.prototype.getExtension);
};


/**
 * optional bool message_set_wire_format = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.MessageOptions.prototype.getMessageSetWireFormat = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 1, false));
};


/** @param {boolean} value */
proto.google.protobuf.MessageOptions.prototype.setMessageSetWireFormat = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.MessageOptions.prototype.clearMessageSetWireFormat = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MessageOptions.prototype.hasMessageSetWireFormat = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bool no_standard_descriptor_accessor = 2;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.MessageOptions.prototype.getNoStandardDescriptorAccessor = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 2, false));
};


/** @param {boolean} value */
proto.google.protobuf.MessageOptions.prototype.setNoStandardDescriptorAccessor = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.MessageOptions.prototype.clearNoStandardDescriptorAccessor = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MessageOptions.prototype.hasNoStandardDescriptorAccessor = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bool deprecated = 3;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.MessageOptions.prototype.getDeprecated = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 3, false));
};


/** @param {boolean} value */
proto.google.protobuf.MessageOptions.prototype.setDeprecated = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.google.protobuf.MessageOptions.prototype.clearDeprecated = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MessageOptions.prototype.hasDeprecated = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional bool map_entry = 7;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.MessageOptions.prototype.getMapEntry = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 7, false));
};


/** @param {boolean} value */
proto.google.protobuf.MessageOptions.prototype.setMapEntry = function(value) {
  jspb.Message.setField(this, 7, value);
};


proto.google.protobuf.MessageOptions.prototype.clearMapEntry = function() {
  jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MessageOptions.prototype.hasMapEntry = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * repeated UninterpretedOption uninterpreted_option = 999;
 * @return {!Array<!proto.google.protobuf.UninterpretedOption>}
 */
proto.google.protobuf.MessageOptions.prototype.getUninterpretedOptionList = function() {
  return /** @type{!Array<!proto.google.protobuf.UninterpretedOption>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.UninterpretedOption, 999));
};


/** @param {!Array<!proto.google.protobuf.UninterpretedOption>} value */
proto.google.protobuf.MessageOptions.prototype.setUninterpretedOptionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 999, value);
};


/**
 * @param {!proto.google.protobuf.UninterpretedOption=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.MessageOptions.prototype.addUninterpretedOption = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 999, opt_value, proto.google.protobuf.UninterpretedOption, opt_index);
};


proto.google.protobuf.MessageOptions.prototype.clearUninterpretedOptionList = function() {
  this.setUninterpretedOptionList([]);
};



/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldInfo>}
 */
proto.google.protobuf.MessageOptions.extensions = {};


/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldBinaryInfo>}
 */
proto.google.protobuf.MessageOptions.extensionsBinary = {};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.FieldOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.google.protobuf.FieldOptions.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.FieldOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.FieldOptions.displayName = 'proto.google.protobuf.FieldOptions';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.FieldOptions.repeatedFields_ = [999];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.FieldOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.FieldOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.FieldOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.FieldOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    ctype: jspb.Message.getFieldWithDefault(msg, 1, 0),
    packed: jspb.Message.getField(msg, 2),
    jstype: jspb.Message.getFieldWithDefault(msg, 6, 0),
    lazy: jspb.Message.getFieldWithDefault(msg, 5, false),
    deprecated: jspb.Message.getFieldWithDefault(msg, 3, false),
    weak: jspb.Message.getFieldWithDefault(msg, 10, false),
    uninterpretedOptionList: jspb.Message.toObjectList(msg.getUninterpretedOptionList(),
    proto.google.protobuf.UninterpretedOption.toObject, includeInstance)
  };

  jspb.Message.toObjectExtension(/** @type {!jspb.Message} */ (msg), obj,
      proto.google.protobuf.FieldOptions.extensions, proto.google.protobuf.FieldOptions.prototype.getExtension,
      includeInstance);
  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.FieldOptions}
 */
proto.google.protobuf.FieldOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.FieldOptions;
  return proto.google.protobuf.FieldOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.FieldOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.FieldOptions}
 */
proto.google.protobuf.FieldOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.google.protobuf.FieldOptions.CType} */ (reader.readEnum());
      msg.setCtype(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPacked(value);
      break;
    case 6:
      var value = /** @type {!proto.google.protobuf.FieldOptions.JSType} */ (reader.readEnum());
      msg.setJstype(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setLazy(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeprecated(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setWeak(value);
      break;
    case 999:
      var value = new proto.google.protobuf.UninterpretedOption;
      reader.readMessage(value,proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader);
      msg.addUninterpretedOption(value);
      break;
    default:
      jspb.Message.readBinaryExtension(msg, reader, proto.google.protobuf.FieldOptions.extensionsBinary,
        proto.google.protobuf.FieldOptions.prototype.getExtension,
        proto.google.protobuf.FieldOptions.prototype.setExtension);
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.FieldOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.FieldOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.FieldOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.FieldOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!proto.google.protobuf.FieldOptions.CType} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeBool(
      2,
      f
    );
  }
  f = /** @type {!proto.google.protobuf.FieldOptions.JSType} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeEnum(
      6,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeBool(
      5,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeBool(
      3,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 10));
  if (f != null) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getUninterpretedOptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      999,
      f,
      proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter
    );
  }
  jspb.Message.serializeBinaryExtensions(message, writer,
    proto.google.protobuf.FieldOptions.extensionsBinary, proto.google.protobuf.FieldOptions.prototype.getExtension);
};


/**
 * @enum {number}
 */
proto.google.protobuf.FieldOptions.CType = {
  STRING: 0,
  CORD: 1,
  STRING_PIECE: 2
};

/**
 * @enum {number}
 */
proto.google.protobuf.FieldOptions.JSType = {
  JS_NORMAL: 0,
  JS_STRING: 1,
  JS_NUMBER: 2
};

/**
 * optional CType ctype = 1;
 * @return {!proto.google.protobuf.FieldOptions.CType}
 */
proto.google.protobuf.FieldOptions.prototype.getCtype = function() {
  return /** @type {!proto.google.protobuf.FieldOptions.CType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.google.protobuf.FieldOptions.CType} value */
proto.google.protobuf.FieldOptions.prototype.setCtype = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.FieldOptions.prototype.clearCtype = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldOptions.prototype.hasCtype = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bool packed = 2;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FieldOptions.prototype.getPacked = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 2, false));
};


/** @param {boolean} value */
proto.google.protobuf.FieldOptions.prototype.setPacked = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.FieldOptions.prototype.clearPacked = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldOptions.prototype.hasPacked = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional JSType jstype = 6;
 * @return {!proto.google.protobuf.FieldOptions.JSType}
 */
proto.google.protobuf.FieldOptions.prototype.getJstype = function() {
  return /** @type {!proto.google.protobuf.FieldOptions.JSType} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/** @param {!proto.google.protobuf.FieldOptions.JSType} value */
proto.google.protobuf.FieldOptions.prototype.setJstype = function(value) {
  jspb.Message.setField(this, 6, value);
};


proto.google.protobuf.FieldOptions.prototype.clearJstype = function() {
  jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldOptions.prototype.hasJstype = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional bool lazy = 5;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FieldOptions.prototype.getLazy = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 5, false));
};


/** @param {boolean} value */
proto.google.protobuf.FieldOptions.prototype.setLazy = function(value) {
  jspb.Message.setField(this, 5, value);
};


proto.google.protobuf.FieldOptions.prototype.clearLazy = function() {
  jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldOptions.prototype.hasLazy = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional bool deprecated = 3;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FieldOptions.prototype.getDeprecated = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 3, false));
};


/** @param {boolean} value */
proto.google.protobuf.FieldOptions.prototype.setDeprecated = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.google.protobuf.FieldOptions.prototype.clearDeprecated = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldOptions.prototype.hasDeprecated = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional bool weak = 10;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.FieldOptions.prototype.getWeak = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 10, false));
};


/** @param {boolean} value */
proto.google.protobuf.FieldOptions.prototype.setWeak = function(value) {
  jspb.Message.setField(this, 10, value);
};


proto.google.protobuf.FieldOptions.prototype.clearWeak = function() {
  jspb.Message.setField(this, 10, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.FieldOptions.prototype.hasWeak = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * repeated UninterpretedOption uninterpreted_option = 999;
 * @return {!Array<!proto.google.protobuf.UninterpretedOption>}
 */
proto.google.protobuf.FieldOptions.prototype.getUninterpretedOptionList = function() {
  return /** @type{!Array<!proto.google.protobuf.UninterpretedOption>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.UninterpretedOption, 999));
};


/** @param {!Array<!proto.google.protobuf.UninterpretedOption>} value */
proto.google.protobuf.FieldOptions.prototype.setUninterpretedOptionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 999, value);
};


/**
 * @param {!proto.google.protobuf.UninterpretedOption=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.FieldOptions.prototype.addUninterpretedOption = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 999, opt_value, proto.google.protobuf.UninterpretedOption, opt_index);
};


proto.google.protobuf.FieldOptions.prototype.clearUninterpretedOptionList = function() {
  this.setUninterpretedOptionList([]);
};



/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldInfo>}
 */
proto.google.protobuf.FieldOptions.extensions = {};


/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldBinaryInfo>}
 */
proto.google.protobuf.FieldOptions.extensionsBinary = {};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.OneofOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.google.protobuf.OneofOptions.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.OneofOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.OneofOptions.displayName = 'proto.google.protobuf.OneofOptions';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.OneofOptions.repeatedFields_ = [999];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.OneofOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.OneofOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.OneofOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.OneofOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    uninterpretedOptionList: jspb.Message.toObjectList(msg.getUninterpretedOptionList(),
    proto.google.protobuf.UninterpretedOption.toObject, includeInstance)
  };

  jspb.Message.toObjectExtension(/** @type {!jspb.Message} */ (msg), obj,
      proto.google.protobuf.OneofOptions.extensions, proto.google.protobuf.OneofOptions.prototype.getExtension,
      includeInstance);
  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.OneofOptions}
 */
proto.google.protobuf.OneofOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.OneofOptions;
  return proto.google.protobuf.OneofOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.OneofOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.OneofOptions}
 */
proto.google.protobuf.OneofOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 999:
      var value = new proto.google.protobuf.UninterpretedOption;
      reader.readMessage(value,proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader);
      msg.addUninterpretedOption(value);
      break;
    default:
      jspb.Message.readBinaryExtension(msg, reader, proto.google.protobuf.OneofOptions.extensionsBinary,
        proto.google.protobuf.OneofOptions.prototype.getExtension,
        proto.google.protobuf.OneofOptions.prototype.setExtension);
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.OneofOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.OneofOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.OneofOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.OneofOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUninterpretedOptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      999,
      f,
      proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter
    );
  }
  jspb.Message.serializeBinaryExtensions(message, writer,
    proto.google.protobuf.OneofOptions.extensionsBinary, proto.google.protobuf.OneofOptions.prototype.getExtension);
};


/**
 * repeated UninterpretedOption uninterpreted_option = 999;
 * @return {!Array<!proto.google.protobuf.UninterpretedOption>}
 */
proto.google.protobuf.OneofOptions.prototype.getUninterpretedOptionList = function() {
  return /** @type{!Array<!proto.google.protobuf.UninterpretedOption>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.UninterpretedOption, 999));
};


/** @param {!Array<!proto.google.protobuf.UninterpretedOption>} value */
proto.google.protobuf.OneofOptions.prototype.setUninterpretedOptionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 999, value);
};


/**
 * @param {!proto.google.protobuf.UninterpretedOption=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.OneofOptions.prototype.addUninterpretedOption = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 999, opt_value, proto.google.protobuf.UninterpretedOption, opt_index);
};


proto.google.protobuf.OneofOptions.prototype.clearUninterpretedOptionList = function() {
  this.setUninterpretedOptionList([]);
};



/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldInfo>}
 */
proto.google.protobuf.OneofOptions.extensions = {};


/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldBinaryInfo>}
 */
proto.google.protobuf.OneofOptions.extensionsBinary = {};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.EnumOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.google.protobuf.EnumOptions.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.EnumOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.EnumOptions.displayName = 'proto.google.protobuf.EnumOptions';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.EnumOptions.repeatedFields_ = [999];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.EnumOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.EnumOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.EnumOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.EnumOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    allowAlias: jspb.Message.getField(msg, 2),
    deprecated: jspb.Message.getFieldWithDefault(msg, 3, false),
    uninterpretedOptionList: jspb.Message.toObjectList(msg.getUninterpretedOptionList(),
    proto.google.protobuf.UninterpretedOption.toObject, includeInstance)
  };

  jspb.Message.toObjectExtension(/** @type {!jspb.Message} */ (msg), obj,
      proto.google.protobuf.EnumOptions.extensions, proto.google.protobuf.EnumOptions.prototype.getExtension,
      includeInstance);
  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.EnumOptions}
 */
proto.google.protobuf.EnumOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.EnumOptions;
  return proto.google.protobuf.EnumOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.EnumOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.EnumOptions}
 */
proto.google.protobuf.EnumOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAllowAlias(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeprecated(value);
      break;
    case 999:
      var value = new proto.google.protobuf.UninterpretedOption;
      reader.readMessage(value,proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader);
      msg.addUninterpretedOption(value);
      break;
    default:
      jspb.Message.readBinaryExtension(msg, reader, proto.google.protobuf.EnumOptions.extensionsBinary,
        proto.google.protobuf.EnumOptions.prototype.getExtension,
        proto.google.protobuf.EnumOptions.prototype.setExtension);
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.EnumOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.EnumOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.EnumOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.EnumOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {boolean} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeBool(
      2,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getUninterpretedOptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      999,
      f,
      proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter
    );
  }
  jspb.Message.serializeBinaryExtensions(message, writer,
    proto.google.protobuf.EnumOptions.extensionsBinary, proto.google.protobuf.EnumOptions.prototype.getExtension);
};


/**
 * optional bool allow_alias = 2;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.EnumOptions.prototype.getAllowAlias = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 2, false));
};


/** @param {boolean} value */
proto.google.protobuf.EnumOptions.prototype.setAllowAlias = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.EnumOptions.prototype.clearAllowAlias = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.EnumOptions.prototype.hasAllowAlias = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bool deprecated = 3;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.EnumOptions.prototype.getDeprecated = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 3, false));
};


/** @param {boolean} value */
proto.google.protobuf.EnumOptions.prototype.setDeprecated = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.google.protobuf.EnumOptions.prototype.clearDeprecated = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.EnumOptions.prototype.hasDeprecated = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated UninterpretedOption uninterpreted_option = 999;
 * @return {!Array<!proto.google.protobuf.UninterpretedOption>}
 */
proto.google.protobuf.EnumOptions.prototype.getUninterpretedOptionList = function() {
  return /** @type{!Array<!proto.google.protobuf.UninterpretedOption>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.UninterpretedOption, 999));
};


/** @param {!Array<!proto.google.protobuf.UninterpretedOption>} value */
proto.google.protobuf.EnumOptions.prototype.setUninterpretedOptionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 999, value);
};


/**
 * @param {!proto.google.protobuf.UninterpretedOption=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.EnumOptions.prototype.addUninterpretedOption = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 999, opt_value, proto.google.protobuf.UninterpretedOption, opt_index);
};


proto.google.protobuf.EnumOptions.prototype.clearUninterpretedOptionList = function() {
  this.setUninterpretedOptionList([]);
};



/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldInfo>}
 */
proto.google.protobuf.EnumOptions.extensions = {};


/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldBinaryInfo>}
 */
proto.google.protobuf.EnumOptions.extensionsBinary = {};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.EnumValueOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.google.protobuf.EnumValueOptions.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.EnumValueOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.EnumValueOptions.displayName = 'proto.google.protobuf.EnumValueOptions';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.EnumValueOptions.repeatedFields_ = [999];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.EnumValueOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.EnumValueOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.EnumValueOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.EnumValueOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    deprecated: jspb.Message.getFieldWithDefault(msg, 1, false),
    uninterpretedOptionList: jspb.Message.toObjectList(msg.getUninterpretedOptionList(),
    proto.google.protobuf.UninterpretedOption.toObject, includeInstance)
  };

  jspb.Message.toObjectExtension(/** @type {!jspb.Message} */ (msg), obj,
      proto.google.protobuf.EnumValueOptions.extensions, proto.google.protobuf.EnumValueOptions.prototype.getExtension,
      includeInstance);
  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.EnumValueOptions}
 */
proto.google.protobuf.EnumValueOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.EnumValueOptions;
  return proto.google.protobuf.EnumValueOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.EnumValueOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.EnumValueOptions}
 */
proto.google.protobuf.EnumValueOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeprecated(value);
      break;
    case 999:
      var value = new proto.google.protobuf.UninterpretedOption;
      reader.readMessage(value,proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader);
      msg.addUninterpretedOption(value);
      break;
    default:
      jspb.Message.readBinaryExtension(msg, reader, proto.google.protobuf.EnumValueOptions.extensionsBinary,
        proto.google.protobuf.EnumValueOptions.prototype.getExtension,
        proto.google.protobuf.EnumValueOptions.prototype.setExtension);
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.EnumValueOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.EnumValueOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.EnumValueOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.EnumValueOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {boolean} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getUninterpretedOptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      999,
      f,
      proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter
    );
  }
  jspb.Message.serializeBinaryExtensions(message, writer,
    proto.google.protobuf.EnumValueOptions.extensionsBinary, proto.google.protobuf.EnumValueOptions.prototype.getExtension);
};


/**
 * optional bool deprecated = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.EnumValueOptions.prototype.getDeprecated = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 1, false));
};


/** @param {boolean} value */
proto.google.protobuf.EnumValueOptions.prototype.setDeprecated = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.EnumValueOptions.prototype.clearDeprecated = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.EnumValueOptions.prototype.hasDeprecated = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated UninterpretedOption uninterpreted_option = 999;
 * @return {!Array<!proto.google.protobuf.UninterpretedOption>}
 */
proto.google.protobuf.EnumValueOptions.prototype.getUninterpretedOptionList = function() {
  return /** @type{!Array<!proto.google.protobuf.UninterpretedOption>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.UninterpretedOption, 999));
};


/** @param {!Array<!proto.google.protobuf.UninterpretedOption>} value */
proto.google.protobuf.EnumValueOptions.prototype.setUninterpretedOptionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 999, value);
};


/**
 * @param {!proto.google.protobuf.UninterpretedOption=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.EnumValueOptions.prototype.addUninterpretedOption = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 999, opt_value, proto.google.protobuf.UninterpretedOption, opt_index);
};


proto.google.protobuf.EnumValueOptions.prototype.clearUninterpretedOptionList = function() {
  this.setUninterpretedOptionList([]);
};



/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldInfo>}
 */
proto.google.protobuf.EnumValueOptions.extensions = {};


/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldBinaryInfo>}
 */
proto.google.protobuf.EnumValueOptions.extensionsBinary = {};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.ServiceOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.google.protobuf.ServiceOptions.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.ServiceOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.ServiceOptions.displayName = 'proto.google.protobuf.ServiceOptions';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.ServiceOptions.repeatedFields_ = [999];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.ServiceOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.ServiceOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.ServiceOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.ServiceOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    deprecated: jspb.Message.getFieldWithDefault(msg, 33, false),
    uninterpretedOptionList: jspb.Message.toObjectList(msg.getUninterpretedOptionList(),
    proto.google.protobuf.UninterpretedOption.toObject, includeInstance)
  };

  jspb.Message.toObjectExtension(/** @type {!jspb.Message} */ (msg), obj,
      proto.google.protobuf.ServiceOptions.extensions, proto.google.protobuf.ServiceOptions.prototype.getExtension,
      includeInstance);
  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.ServiceOptions}
 */
proto.google.protobuf.ServiceOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.ServiceOptions;
  return proto.google.protobuf.ServiceOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.ServiceOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.ServiceOptions}
 */
proto.google.protobuf.ServiceOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 33:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeprecated(value);
      break;
    case 999:
      var value = new proto.google.protobuf.UninterpretedOption;
      reader.readMessage(value,proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader);
      msg.addUninterpretedOption(value);
      break;
    default:
      jspb.Message.readBinaryExtension(msg, reader, proto.google.protobuf.ServiceOptions.extensionsBinary,
        proto.google.protobuf.ServiceOptions.prototype.getExtension,
        proto.google.protobuf.ServiceOptions.prototype.setExtension);
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.ServiceOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.ServiceOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.ServiceOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.ServiceOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {boolean} */ (jspb.Message.getField(message, 33));
  if (f != null) {
    writer.writeBool(
      33,
      f
    );
  }
  f = message.getUninterpretedOptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      999,
      f,
      proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter
    );
  }
  jspb.Message.serializeBinaryExtensions(message, writer,
    proto.google.protobuf.ServiceOptions.extensionsBinary, proto.google.protobuf.ServiceOptions.prototype.getExtension);
};


/**
 * optional bool deprecated = 33;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.ServiceOptions.prototype.getDeprecated = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 33, false));
};


/** @param {boolean} value */
proto.google.protobuf.ServiceOptions.prototype.setDeprecated = function(value) {
  jspb.Message.setField(this, 33, value);
};


proto.google.protobuf.ServiceOptions.prototype.clearDeprecated = function() {
  jspb.Message.setField(this, 33, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.ServiceOptions.prototype.hasDeprecated = function() {
  return jspb.Message.getField(this, 33) != null;
};


/**
 * repeated UninterpretedOption uninterpreted_option = 999;
 * @return {!Array<!proto.google.protobuf.UninterpretedOption>}
 */
proto.google.protobuf.ServiceOptions.prototype.getUninterpretedOptionList = function() {
  return /** @type{!Array<!proto.google.protobuf.UninterpretedOption>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.UninterpretedOption, 999));
};


/** @param {!Array<!proto.google.protobuf.UninterpretedOption>} value */
proto.google.protobuf.ServiceOptions.prototype.setUninterpretedOptionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 999, value);
};


/**
 * @param {!proto.google.protobuf.UninterpretedOption=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.ServiceOptions.prototype.addUninterpretedOption = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 999, opt_value, proto.google.protobuf.UninterpretedOption, opt_index);
};


proto.google.protobuf.ServiceOptions.prototype.clearUninterpretedOptionList = function() {
  this.setUninterpretedOptionList([]);
};



/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldInfo>}
 */
proto.google.protobuf.ServiceOptions.extensions = {};


/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldBinaryInfo>}
 */
proto.google.protobuf.ServiceOptions.extensionsBinary = {};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.MethodOptions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, proto.google.protobuf.MethodOptions.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.MethodOptions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.MethodOptions.displayName = 'proto.google.protobuf.MethodOptions';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.MethodOptions.repeatedFields_ = [999];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.MethodOptions.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.MethodOptions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.MethodOptions} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.MethodOptions.toObject = function(includeInstance, msg) {
  var f, obj = {
    deprecated: jspb.Message.getFieldWithDefault(msg, 33, false),
    idempotencyLevel: jspb.Message.getFieldWithDefault(msg, 34, 0),
    uninterpretedOptionList: jspb.Message.toObjectList(msg.getUninterpretedOptionList(),
    proto.google.protobuf.UninterpretedOption.toObject, includeInstance)
  };

  jspb.Message.toObjectExtension(/** @type {!jspb.Message} */ (msg), obj,
      proto.google.protobuf.MethodOptions.extensions, proto.google.protobuf.MethodOptions.prototype.getExtension,
      includeInstance);
  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.MethodOptions}
 */
proto.google.protobuf.MethodOptions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.MethodOptions;
  return proto.google.protobuf.MethodOptions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.MethodOptions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.MethodOptions}
 */
proto.google.protobuf.MethodOptions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 33:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDeprecated(value);
      break;
    case 34:
      var value = /** @type {!proto.google.protobuf.MethodOptions.IdempotencyLevel} */ (reader.readEnum());
      msg.setIdempotencyLevel(value);
      break;
    case 999:
      var value = new proto.google.protobuf.UninterpretedOption;
      reader.readMessage(value,proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader);
      msg.addUninterpretedOption(value);
      break;
    default:
      jspb.Message.readBinaryExtension(msg, reader, proto.google.protobuf.MethodOptions.extensionsBinary,
        proto.google.protobuf.MethodOptions.prototype.getExtension,
        proto.google.protobuf.MethodOptions.prototype.setExtension);
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.MethodOptions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.MethodOptions.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.MethodOptions} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.MethodOptions.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {boolean} */ (jspb.Message.getField(message, 33));
  if (f != null) {
    writer.writeBool(
      33,
      f
    );
  }
  f = /** @type {!proto.google.protobuf.MethodOptions.IdempotencyLevel} */ (jspb.Message.getField(message, 34));
  if (f != null) {
    writer.writeEnum(
      34,
      f
    );
  }
  f = message.getUninterpretedOptionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      999,
      f,
      proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter
    );
  }
  jspb.Message.serializeBinaryExtensions(message, writer,
    proto.google.protobuf.MethodOptions.extensionsBinary, proto.google.protobuf.MethodOptions.prototype.getExtension);
};


/**
 * @enum {number}
 */
proto.google.protobuf.MethodOptions.IdempotencyLevel = {
  IDEMPOTENCY_UNKNOWN: 0,
  NO_SIDE_EFFECTS: 1,
  IDEMPOTENT: 2
};

/**
 * optional bool deprecated = 33;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.MethodOptions.prototype.getDeprecated = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 33, false));
};


/** @param {boolean} value */
proto.google.protobuf.MethodOptions.prototype.setDeprecated = function(value) {
  jspb.Message.setField(this, 33, value);
};


proto.google.protobuf.MethodOptions.prototype.clearDeprecated = function() {
  jspb.Message.setField(this, 33, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MethodOptions.prototype.hasDeprecated = function() {
  return jspb.Message.getField(this, 33) != null;
};


/**
 * optional IdempotencyLevel idempotency_level = 34;
 * @return {!proto.google.protobuf.MethodOptions.IdempotencyLevel}
 */
proto.google.protobuf.MethodOptions.prototype.getIdempotencyLevel = function() {
  return /** @type {!proto.google.protobuf.MethodOptions.IdempotencyLevel} */ (jspb.Message.getFieldWithDefault(this, 34, 0));
};


/** @param {!proto.google.protobuf.MethodOptions.IdempotencyLevel} value */
proto.google.protobuf.MethodOptions.prototype.setIdempotencyLevel = function(value) {
  jspb.Message.setField(this, 34, value);
};


proto.google.protobuf.MethodOptions.prototype.clearIdempotencyLevel = function() {
  jspb.Message.setField(this, 34, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.MethodOptions.prototype.hasIdempotencyLevel = function() {
  return jspb.Message.getField(this, 34) != null;
};


/**
 * repeated UninterpretedOption uninterpreted_option = 999;
 * @return {!Array<!proto.google.protobuf.UninterpretedOption>}
 */
proto.google.protobuf.MethodOptions.prototype.getUninterpretedOptionList = function() {
  return /** @type{!Array<!proto.google.protobuf.UninterpretedOption>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.UninterpretedOption, 999));
};


/** @param {!Array<!proto.google.protobuf.UninterpretedOption>} value */
proto.google.protobuf.MethodOptions.prototype.setUninterpretedOptionList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 999, value);
};


/**
 * @param {!proto.google.protobuf.UninterpretedOption=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.MethodOptions.prototype.addUninterpretedOption = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 999, opt_value, proto.google.protobuf.UninterpretedOption, opt_index);
};


proto.google.protobuf.MethodOptions.prototype.clearUninterpretedOptionList = function() {
  this.setUninterpretedOptionList([]);
};



/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldInfo>}
 */
proto.google.protobuf.MethodOptions.extensions = {};


/**
 * The extensions registered with this message class. This is a map of
 * extension field number to fieldInfo object.
 *
 * For example:
 *     { 123: {fieldIndex: 123, fieldName: {my_field_name: 0}, ctor: proto.example.MyMessage} }
 *
 * fieldName contains the JsCompiler renamed field name property so that it
 * works in OPTIMIZED mode.
 *
 * @type {!Object<number, jspb.ExtensionFieldBinaryInfo>}
 */
proto.google.protobuf.MethodOptions.extensionsBinary = {};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.UninterpretedOption = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.UninterpretedOption.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.UninterpretedOption, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.UninterpretedOption.displayName = 'proto.google.protobuf.UninterpretedOption';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.UninterpretedOption.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.UninterpretedOption.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.UninterpretedOption.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.UninterpretedOption} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.UninterpretedOption.toObject = function(includeInstance, msg) {
  var f, obj = {
    nameList: jspb.Message.toObjectList(msg.getNameList(),
    proto.google.protobuf.UninterpretedOption.NamePart.toObject, includeInstance),
    identifierValue: jspb.Message.getField(msg, 3),
    positiveIntValue: jspb.Message.getField(msg, 4),
    negativeIntValue: jspb.Message.getField(msg, 5),
    doubleValue: jspb.Message.getOptionalFloatingPointField(msg, 6),
    stringValue: msg.getStringValue_asB64(),
    aggregateValue: jspb.Message.getField(msg, 8)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.UninterpretedOption.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.UninterpretedOption;
  return proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.UninterpretedOption} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.UninterpretedOption}
 */
proto.google.protobuf.UninterpretedOption.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = new proto.google.protobuf.UninterpretedOption.NamePart;
      reader.readMessage(value,proto.google.protobuf.UninterpretedOption.NamePart.deserializeBinaryFromReader);
      msg.addName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setIdentifierValue(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setPositiveIntValue(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNegativeIntValue(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDoubleValue(value);
      break;
    case 7:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setStringValue(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setAggregateValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.UninterpretedOption.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.UninterpretedOption} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.UninterpretedOption.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNameList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.google.protobuf.UninterpretedOption.NamePart.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeUint64(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeDouble(
      6,
      f
    );
  }
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeBytes(
      7,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeString(
      8,
      f
    );
  }
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.UninterpretedOption.NamePart = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.UninterpretedOption.NamePart, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.UninterpretedOption.NamePart.displayName = 'proto.google.protobuf.UninterpretedOption.NamePart';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.UninterpretedOption.NamePart.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.UninterpretedOption.NamePart.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.UninterpretedOption.NamePart} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.UninterpretedOption.NamePart.toObject = function(includeInstance, msg) {
  var f, obj = {
    namePart: jspb.Message.getField(msg, 1),
    isExtension: jspb.Message.getField(msg, 2)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.UninterpretedOption.NamePart}
 */
proto.google.protobuf.UninterpretedOption.NamePart.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.UninterpretedOption.NamePart;
  return proto.google.protobuf.UninterpretedOption.NamePart.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.UninterpretedOption.NamePart} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.UninterpretedOption.NamePart}
 */
proto.google.protobuf.UninterpretedOption.NamePart.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setNamePart(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsExtension(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.UninterpretedOption.NamePart.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.UninterpretedOption.NamePart.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.UninterpretedOption.NamePart} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.UninterpretedOption.NamePart.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {boolean} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * required string name_part = 1;
 * @return {string}
 */
proto.google.protobuf.UninterpretedOption.NamePart.prototype.getNamePart = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.google.protobuf.UninterpretedOption.NamePart.prototype.setNamePart = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.google.protobuf.UninterpretedOption.NamePart.prototype.clearNamePart = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.UninterpretedOption.NamePart.prototype.hasNamePart = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required bool is_extension = 2;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.protobuf.UninterpretedOption.NamePart.prototype.getIsExtension = function() {
  return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 2, false));
};


/** @param {boolean} value */
proto.google.protobuf.UninterpretedOption.NamePart.prototype.setIsExtension = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.UninterpretedOption.NamePart.prototype.clearIsExtension = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.UninterpretedOption.NamePart.prototype.hasIsExtension = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated NamePart name = 2;
 * @return {!Array<!proto.google.protobuf.UninterpretedOption.NamePart>}
 */
proto.google.protobuf.UninterpretedOption.prototype.getNameList = function() {
  return /** @type{!Array<!proto.google.protobuf.UninterpretedOption.NamePart>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.UninterpretedOption.NamePart, 2));
};


/** @param {!Array<!proto.google.protobuf.UninterpretedOption.NamePart>} value */
proto.google.protobuf.UninterpretedOption.prototype.setNameList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.google.protobuf.UninterpretedOption.NamePart=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.UninterpretedOption.NamePart}
 */
proto.google.protobuf.UninterpretedOption.prototype.addName = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.google.protobuf.UninterpretedOption.NamePart, opt_index);
};


proto.google.protobuf.UninterpretedOption.prototype.clearNameList = function() {
  this.setNameList([]);
};


/**
 * optional string identifier_value = 3;
 * @return {string}
 */
proto.google.protobuf.UninterpretedOption.prototype.getIdentifierValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.google.protobuf.UninterpretedOption.prototype.setIdentifierValue = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.google.protobuf.UninterpretedOption.prototype.clearIdentifierValue = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.UninterpretedOption.prototype.hasIdentifierValue = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional uint64 positive_int_value = 4;
 * @return {number}
 */
proto.google.protobuf.UninterpretedOption.prototype.getPositiveIntValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.google.protobuf.UninterpretedOption.prototype.setPositiveIntValue = function(value) {
  jspb.Message.setField(this, 4, value);
};


proto.google.protobuf.UninterpretedOption.prototype.clearPositiveIntValue = function() {
  jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.UninterpretedOption.prototype.hasPositiveIntValue = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional int64 negative_int_value = 5;
 * @return {number}
 */
proto.google.protobuf.UninterpretedOption.prototype.getNegativeIntValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.google.protobuf.UninterpretedOption.prototype.setNegativeIntValue = function(value) {
  jspb.Message.setField(this, 5, value);
};


proto.google.protobuf.UninterpretedOption.prototype.clearNegativeIntValue = function() {
  jspb.Message.setField(this, 5, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.UninterpretedOption.prototype.hasNegativeIntValue = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional double double_value = 6;
 * @return {number}
 */
proto.google.protobuf.UninterpretedOption.prototype.getDoubleValue = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 6, 0.0));
};


/** @param {number} value */
proto.google.protobuf.UninterpretedOption.prototype.setDoubleValue = function(value) {
  jspb.Message.setField(this, 6, value);
};


proto.google.protobuf.UninterpretedOption.prototype.clearDoubleValue = function() {
  jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.UninterpretedOption.prototype.hasDoubleValue = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional bytes string_value = 7;
 * @return {!(string|Uint8Array)}
 */
proto.google.protobuf.UninterpretedOption.prototype.getStringValue = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * optional bytes string_value = 7;
 * This is a type-conversion wrapper around `getStringValue()`
 * @return {string}
 */
proto.google.protobuf.UninterpretedOption.prototype.getStringValue_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getStringValue()));
};


/**
 * optional bytes string_value = 7;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getStringValue()`
 * @return {!Uint8Array}
 */
proto.google.protobuf.UninterpretedOption.prototype.getStringValue_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getStringValue()));
};


/** @param {!(string|Uint8Array)} value */
proto.google.protobuf.UninterpretedOption.prototype.setStringValue = function(value) {
  jspb.Message.setField(this, 7, value);
};


proto.google.protobuf.UninterpretedOption.prototype.clearStringValue = function() {
  jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.UninterpretedOption.prototype.hasStringValue = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional string aggregate_value = 8;
 * @return {string}
 */
proto.google.protobuf.UninterpretedOption.prototype.getAggregateValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/** @param {string} value */
proto.google.protobuf.UninterpretedOption.prototype.setAggregateValue = function(value) {
  jspb.Message.setField(this, 8, value);
};


proto.google.protobuf.UninterpretedOption.prototype.clearAggregateValue = function() {
  jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.UninterpretedOption.prototype.hasAggregateValue = function() {
  return jspb.Message.getField(this, 8) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.SourceCodeInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.SourceCodeInfo.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.SourceCodeInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.SourceCodeInfo.displayName = 'proto.google.protobuf.SourceCodeInfo';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.SourceCodeInfo.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.SourceCodeInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.SourceCodeInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.SourceCodeInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.SourceCodeInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    locationList: jspb.Message.toObjectList(msg.getLocationList(),
    proto.google.protobuf.SourceCodeInfo.Location.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.SourceCodeInfo}
 */
proto.google.protobuf.SourceCodeInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.SourceCodeInfo;
  return proto.google.protobuf.SourceCodeInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.SourceCodeInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.SourceCodeInfo}
 */
proto.google.protobuf.SourceCodeInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.google.protobuf.SourceCodeInfo.Location;
      reader.readMessage(value,proto.google.protobuf.SourceCodeInfo.Location.deserializeBinaryFromReader);
      msg.addLocation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.SourceCodeInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.SourceCodeInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.SourceCodeInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.SourceCodeInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLocationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.google.protobuf.SourceCodeInfo.Location.serializeBinaryToWriter
    );
  }
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.SourceCodeInfo.Location = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.SourceCodeInfo.Location.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.SourceCodeInfo.Location, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.SourceCodeInfo.Location.displayName = 'proto.google.protobuf.SourceCodeInfo.Location';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.SourceCodeInfo.Location.repeatedFields_ = [1,2,6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.SourceCodeInfo.Location.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.SourceCodeInfo.Location} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.SourceCodeInfo.Location.toObject = function(includeInstance, msg) {
  var f, obj = {
    pathList: jspb.Message.getRepeatedField(msg, 1),
    spanList: jspb.Message.getRepeatedField(msg, 2),
    leadingComments: jspb.Message.getField(msg, 3),
    trailingComments: jspb.Message.getField(msg, 4),
    leadingDetachedCommentsList: jspb.Message.getRepeatedField(msg, 6)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.SourceCodeInfo.Location}
 */
proto.google.protobuf.SourceCodeInfo.Location.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.SourceCodeInfo.Location;
  return proto.google.protobuf.SourceCodeInfo.Location.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.SourceCodeInfo.Location} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.SourceCodeInfo.Location}
 */
proto.google.protobuf.SourceCodeInfo.Location.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array<number>} */ (reader.readPackedInt32());
      msg.setPathList(value);
      break;
    case 2:
      var value = /** @type {!Array<number>} */ (reader.readPackedInt32());
      msg.setSpanList(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setLeadingComments(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTrailingComments(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.addLeadingDetachedComments(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.SourceCodeInfo.Location.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.SourceCodeInfo.Location} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.SourceCodeInfo.Location.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPathList();
  if (f.length > 0) {
    writer.writePackedInt32(
      1,
      f
    );
  }
  f = message.getSpanList();
  if (f.length > 0) {
    writer.writePackedInt32(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getLeadingDetachedCommentsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
};


/**
 * repeated int32 path = 1;
 * @return {!Array<number>}
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.getPathList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/** @param {!Array<number>} value */
proto.google.protobuf.SourceCodeInfo.Location.prototype.setPathList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.addPath = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


proto.google.protobuf.SourceCodeInfo.Location.prototype.clearPathList = function() {
  this.setPathList([]);
};


/**
 * repeated int32 span = 2;
 * @return {!Array<number>}
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.getSpanList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 2));
};


/** @param {!Array<number>} value */
proto.google.protobuf.SourceCodeInfo.Location.prototype.setSpanList = function(value) {
  jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.addSpan = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


proto.google.protobuf.SourceCodeInfo.Location.prototype.clearSpanList = function() {
  this.setSpanList([]);
};


/**
 * optional string leading_comments = 3;
 * @return {string}
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.getLeadingComments = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.google.protobuf.SourceCodeInfo.Location.prototype.setLeadingComments = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.google.protobuf.SourceCodeInfo.Location.prototype.clearLeadingComments = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.hasLeadingComments = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string trailing_comments = 4;
 * @return {string}
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.getTrailingComments = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.google.protobuf.SourceCodeInfo.Location.prototype.setTrailingComments = function(value) {
  jspb.Message.setField(this, 4, value);
};


proto.google.protobuf.SourceCodeInfo.Location.prototype.clearTrailingComments = function() {
  jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.hasTrailingComments = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * repeated string leading_detached_comments = 6;
 * @return {!Array<string>}
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.getLeadingDetachedCommentsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/** @param {!Array<string>} value */
proto.google.protobuf.SourceCodeInfo.Location.prototype.setLeadingDetachedCommentsList = function(value) {
  jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.google.protobuf.SourceCodeInfo.Location.prototype.addLeadingDetachedComments = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


proto.google.protobuf.SourceCodeInfo.Location.prototype.clearLeadingDetachedCommentsList = function() {
  this.setLeadingDetachedCommentsList([]);
};


/**
 * repeated Location location = 1;
 * @return {!Array<!proto.google.protobuf.SourceCodeInfo.Location>}
 */
proto.google.protobuf.SourceCodeInfo.prototype.getLocationList = function() {
  return /** @type{!Array<!proto.google.protobuf.SourceCodeInfo.Location>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.SourceCodeInfo.Location, 1));
};


/** @param {!Array<!proto.google.protobuf.SourceCodeInfo.Location>} value */
proto.google.protobuf.SourceCodeInfo.prototype.setLocationList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.google.protobuf.SourceCodeInfo.Location=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.SourceCodeInfo.Location}
 */
proto.google.protobuf.SourceCodeInfo.prototype.addLocation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.google.protobuf.SourceCodeInfo.Location, opt_index);
};


proto.google.protobuf.SourceCodeInfo.prototype.clearLocationList = function() {
  this.setLocationList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.GeneratedCodeInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.GeneratedCodeInfo.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.GeneratedCodeInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.GeneratedCodeInfo.displayName = 'proto.google.protobuf.GeneratedCodeInfo';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.GeneratedCodeInfo.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.GeneratedCodeInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.GeneratedCodeInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.GeneratedCodeInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.GeneratedCodeInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    annotationList: jspb.Message.toObjectList(msg.getAnnotationList(),
    proto.google.protobuf.GeneratedCodeInfo.Annotation.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.GeneratedCodeInfo}
 */
proto.google.protobuf.GeneratedCodeInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.GeneratedCodeInfo;
  return proto.google.protobuf.GeneratedCodeInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.GeneratedCodeInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.GeneratedCodeInfo}
 */
proto.google.protobuf.GeneratedCodeInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.google.protobuf.GeneratedCodeInfo.Annotation;
      reader.readMessage(value,proto.google.protobuf.GeneratedCodeInfo.Annotation.deserializeBinaryFromReader);
      msg.addAnnotation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.GeneratedCodeInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.GeneratedCodeInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.GeneratedCodeInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.GeneratedCodeInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAnnotationList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.google.protobuf.GeneratedCodeInfo.Annotation.serializeBinaryToWriter
    );
  }
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.protobuf.GeneratedCodeInfo.Annotation.repeatedFields_, null);
};
goog.inherits(proto.google.protobuf.GeneratedCodeInfo.Annotation, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.GeneratedCodeInfo.Annotation.displayName = 'proto.google.protobuf.GeneratedCodeInfo.Annotation';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.GeneratedCodeInfo.Annotation.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.GeneratedCodeInfo.Annotation} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.toObject = function(includeInstance, msg) {
  var f, obj = {
    pathList: jspb.Message.getRepeatedField(msg, 1),
    sourceFile: jspb.Message.getField(msg, 2),
    begin: jspb.Message.getField(msg, 3),
    end: jspb.Message.getField(msg, 4)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.GeneratedCodeInfo.Annotation}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.GeneratedCodeInfo.Annotation;
  return proto.google.protobuf.GeneratedCodeInfo.Annotation.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.GeneratedCodeInfo.Annotation} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.GeneratedCodeInfo.Annotation}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array<number>} */ (reader.readPackedInt32());
      msg.setPathList(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSourceFile(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBegin(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEnd(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.GeneratedCodeInfo.Annotation.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.GeneratedCodeInfo.Annotation} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPathList();
  if (f.length > 0) {
    writer.writePackedInt32(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeInt32(
      4,
      f
    );
  }
};


/**
 * repeated int32 path = 1;
 * @return {!Array<number>}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.getPathList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/** @param {!Array<number>} value */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.setPathList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.addPath = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.clearPathList = function() {
  this.setPathList([]);
};


/**
 * optional string source_file = 2;
 * @return {string}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.getSourceFile = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.setSourceFile = function(value) {
  jspb.Message.setField(this, 2, value);
};


proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.clearSourceFile = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.hasSourceFile = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional int32 begin = 3;
 * @return {number}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.getBegin = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.setBegin = function(value) {
  jspb.Message.setField(this, 3, value);
};


proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.clearBegin = function() {
  jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.hasBegin = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional int32 end = 4;
 * @return {number}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.getEnd = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.setEnd = function(value) {
  jspb.Message.setField(this, 4, value);
};


proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.clearEnd = function() {
  jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.protobuf.GeneratedCodeInfo.Annotation.prototype.hasEnd = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * repeated Annotation annotation = 1;
 * @return {!Array<!proto.google.protobuf.GeneratedCodeInfo.Annotation>}
 */
proto.google.protobuf.GeneratedCodeInfo.prototype.getAnnotationList = function() {
  return /** @type{!Array<!proto.google.protobuf.GeneratedCodeInfo.Annotation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.GeneratedCodeInfo.Annotation, 1));
};


/** @param {!Array<!proto.google.protobuf.GeneratedCodeInfo.Annotation>} value */
proto.google.protobuf.GeneratedCodeInfo.prototype.setAnnotationList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.google.protobuf.GeneratedCodeInfo.Annotation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.protobuf.GeneratedCodeInfo.Annotation}
 */
proto.google.protobuf.GeneratedCodeInfo.prototype.addAnnotation = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.google.protobuf.GeneratedCodeInfo.Annotation, opt_index);
};


proto.google.protobuf.GeneratedCodeInfo.prototype.clearAnnotationList = function() {
  this.setAnnotationList([]);
};


goog.object.extend(exports, proto.google.protobuf);


/***/ }),

/***/ "./node_modules/google-protobuf/google/protobuf/timestamp_pb.js":
/*!**********************************************************************!*\
  !*** ./node_modules/google-protobuf/google/protobuf/timestamp_pb.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(/*! google-protobuf */ "./node_modules/google-protobuf/google-protobuf.js");
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.google.protobuf.Timestamp', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.protobuf.Timestamp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.Timestamp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.protobuf.Timestamp.displayName = 'proto.google.protobuf.Timestamp';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.google.protobuf.Timestamp.prototype.toObject = function(opt_includeInstance) {
  return proto.google.protobuf.Timestamp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.google.protobuf.Timestamp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.Timestamp.toObject = function(includeInstance, msg) {
  var f, obj = {
    seconds: jspb.Message.getFieldWithDefault(msg, 1, 0),
    nanos: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.protobuf.Timestamp}
 */
proto.google.protobuf.Timestamp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.protobuf.Timestamp;
  return proto.google.protobuf.Timestamp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.protobuf.Timestamp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.protobuf.Timestamp}
 */
proto.google.protobuf.Timestamp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setSeconds(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setNanos(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.protobuf.Timestamp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.google.protobuf.Timestamp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.protobuf.Timestamp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.protobuf.Timestamp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSeconds();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getNanos();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int64 seconds = 1;
 * @return {number}
 */
proto.google.protobuf.Timestamp.prototype.getSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.google.protobuf.Timestamp.prototype.setSeconds = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 nanos = 2;
 * @return {number}
 */
proto.google.protobuf.Timestamp.prototype.getNanos = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.google.protobuf.Timestamp.prototype.setNanos = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


goog.object.extend(exports, proto.google.protobuf);
/* This code will be inserted into generated code for
 * google/protobuf/timestamp.proto. */

/**
 * Returns a JavaScript 'Date' object corresponding to this Timestamp.
 * @return {!Date}
 */
proto.google.protobuf.Timestamp.prototype.toDate = function() {
  var seconds = this.getSeconds();
  var nanos = this.getNanos();

  return new Date((seconds * 1000) + (nanos / 1000000));
};


/**
 * Sets the value of this Timestamp object to be the given Date.
 * @param {!Date} value The value to set.
 */
proto.google.protobuf.Timestamp.prototype.fromDate = function(value) {
  this.setSeconds(Math.floor(value.getTime() / 1000));
  this.setNanos(value.getMilliseconds() * 1000000);
};


/***/ }),

/***/ "./node_modules/hex2dec/index.js":
/*!***************************************!*\
  !*** ./node_modules/hex2dec/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A function for converting hex <-> dec w/o loss of precision.
 *
 * The problem is that parseInt("0x12345...") isn't precise enough to convert
 * 64-bit integers correctly.
 *
 * Internally, this uses arrays to encode decimal digits starting with the least
 * significant:
 * 8 = [8]
 * 16 = [6, 1]
 * 1024 = [4, 2, 0, 1]
 *
 * Source: http://www.danvk.org/hex2dec.html
 */

// Adds two arrays for the given base (10 or 16), returning the result.
// This turns out to be the only "primitive" operation we need.
function add(x, y, base) {
  var z = [];
  var n = Math.max(x.length, y.length);
  var carry = 0;
  var i = 0;
  while (i < n || carry) {
    var xi = i < x.length ? x[i] : 0;
    var yi = i < y.length ? y[i] : 0;
    var zi = carry + xi + yi;
    z.push(zi % base);
    carry = Math.floor(zi / base);
    i++;
  }
  return z;
}

// Returns a*x, where x is an array of decimal digits and a is an ordinary
// JavaScript number. base is the number base of the array x.
function multiplyByNumber(num, x, base) {
  if (num < 0) return null;
  if (num == 0) return [];

  var result = [];
  var power = x;
  while (true) {
    if (num & 1) {
      result = add(result, power, base);
    }
    num = num >> 1;
    if (num === 0) break;
    power = add(power, power, base);
  }

  return result;
}

function parseToDigitsArray(str, base) {
  var digits = str.split('');
  var ary = [];
  for (var i = digits.length - 1; i >= 0; i--) {
    var n = parseInt(digits[i], base);
    if (isNaN(n)) return null;
    ary.push(n);
  }
  return ary;
}

function convertBase(str, fromBase, toBase) {
  var digits = parseToDigitsArray(str, fromBase);
  if (digits === null) return null;

  var outArray = [];
  var power = [1];
  for (var i = 0; i < digits.length; i++) {
    // invariant: at this point, fromBase^i = power
    if (digits[i]) {
      outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase);
    }
    power = multiplyByNumber(fromBase, power, toBase);
  }

  var out = '';
  for (var i = outArray.length - 1; i >= 0; i--) {
    out += outArray[i].toString(toBase);
  }
  return out;
}

function decToHex(decStr) {
  var hex = convertBase(decStr, 10, 16);
  return hex ? '0x' + hex : null;
}

function hexToDec(hexStr) {
  if (hexStr.substring(0, 2) === '0x') hexStr = hexStr.substring(2);
  hexStr = hexStr.toLowerCase();
  return convertBase(hexStr, 16, 10);
}

module.exports = {
  hexToDec: hexToDec,
  decToHex: decToHex
};


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/opentracing/lib/binary_carrier.js":
/*!********************************************************!*\
  !*** ./node_modules/opentracing/lib/binary_carrier.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convenience class to use as a binary carrier.
 *
 * Any valid Object with a field named `buffer` may be used as a binary carrier;
 * this class is only one such type of object that can be used.
 */
var BinaryCarrier = /** @class */ (function () {
    function BinaryCarrier(buffer) {
        this.buffer = buffer;
    }
    return BinaryCarrier;
}());
exports.default = BinaryCarrier;
//# sourceMappingURL=binary_carrier.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/constants.js":
/*!***************************************************!*\
  !*** ./node_modules/opentracing/lib/constants.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The FORMAT_BINARY format represents SpanContexts in an opaque binary
 * carrier.
 *
 * Tracer.inject() will set the buffer field to an Array-like (Array,
 * ArrayBuffer, or TypedBuffer) object containing the injected binary data.
 * Any valid Object can be used as long as the buffer field of the object
 * can be set.
 *
 * Tracer.extract() will look for `carrier.buffer`, and that field is
 * expected to be an Array-like object (Array, ArrayBuffer, or
 * TypedBuffer).
 */
exports.FORMAT_BINARY = 'binary';
/**
 * The FORMAT_TEXT_MAP format represents SpanContexts using a
 * string->string map (backed by a Javascript Object) as a carrier.
 *
 * NOTE: Unlike FORMAT_HTTP_HEADERS, FORMAT_TEXT_MAP places no restrictions
 * on the characters used in either the keys or the values of the map
 * entries.
 *
 * The FORMAT_TEXT_MAP carrier map may contain unrelated data (e.g.,
 * arbitrary gRPC metadata); as such, the Tracer implementation should use
 * a prefix or other convention to distinguish Tracer-specific key:value
 * pairs.
 */
exports.FORMAT_TEXT_MAP = 'text_map';
/**
 * The FORMAT_HTTP_HEADERS format represents SpanContexts using a
 * character-restricted string->string map (backed by a Javascript Object)
 * as a carrier.
 *
 * Keys and values in the FORMAT_HTTP_HEADERS carrier must be suitable for
 * use as HTTP headers (without modification or further escaping). That is,
 * the keys have a greatly restricted character set, casing for the keys
 * may not be preserved by various intermediaries, and the values should be
 * URL-escaped.
 *
 * The FORMAT_HTTP_HEADERS carrier map may contain unrelated data (e.g.,
 * arbitrary HTTP headers); as such, the Tracer implementation should use a
 * prefix or other convention to distinguish Tracer-specific key:value
 * pairs.
 */
exports.FORMAT_HTTP_HEADERS = 'http_headers';
/**
 * A Span may be the "child of" a parent Span. In a “child of” reference,
 * the parent Span depends on the child Span in some capacity.
 *
 * See more about reference types at https://github.com/opentracing/specification
 */
exports.REFERENCE_CHILD_OF = 'child_of';
/**
 * Some parent Spans do not depend in any way on the result of their child
 * Spans. In these cases, we say merely that the child Span “follows from”
 * the parent Span in a causal sense.
 *
 * See more about reference types at https://github.com/opentracing/specification
 */
exports.REFERENCE_FOLLOWS_FROM = 'follows_from';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/ext/tags.js":
/*!**************************************************!*\
  !*** ./node_modules/opentracing/lib/ext/tags.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** SPAN_KIND hints at relationship between spans, e.g. client/server */
exports.SPAN_KIND = 'span.kind';
/** Marks a span representing the client-side of an RPC or other remote call */
exports.SPAN_KIND_RPC_CLIENT = 'client';
/** Marks a span representing the server-side of an RPC or other remote call */
exports.SPAN_KIND_RPC_SERVER = 'server';
/** Marks a span representing the producing-side within a messaging system or other remote call */
exports.SPAN_KIND_MESSAGING_PRODUCER = 'producer';
/** Marks a span representing the consuming-side within a messaging system or other remote call */
exports.SPAN_KIND_MESSAGING_CONSUMER = 'consumer';
/**
 * ERROR (boolean) true if and only if the application considers the operation
 * represented by the Span to have failed
 */
exports.ERROR = 'error';
/**
 * COMPONENT (string) ia s low-cardinality identifier of the module, library,
 * or package that is generating a span.
 */
exports.COMPONENT = 'component';
/**
 * SAMPLING_PRIORITY (number) determines the priority of sampling this Span.
 * If greater than 0, a hint to the Tracer to do its best to capture the trace.
 * If 0, a hint to the trace to not-capture the trace. If absent, the Tracer
 * should use its default sampling mechanism.
 */
exports.SAMPLING_PRIORITY = 'sampling.priority';
// ---------------------------------------------------------------------------
// PEER_* tags can be emitted by either client-side of server-side to describe
// the other side/service in a peer-to-peer communications, like an RPC call.
// ---------------------------------------------------------------------------
/**
 * PEER_SERVICE (string) Remote service name (for some unspecified
 * definition of "service"). E.g., "elasticsearch", "a_custom_microservice", "memcache"
 */
exports.PEER_SERVICE = 'peer.service';
/** PEER_HOSTNAME (string) Remote hostname. E.g., "opentracing.io", "internal.dns.name" */
exports.PEER_HOSTNAME = 'peer.hostname';
/**
 * PEER_ADDRESS (string) Remote "address", suitable for use in a
 * networking client library. This may be a "ip:port", a bare
 * "hostname", a FQDN, or even a JDBC substring like "mysql://prod-db:3306"
 */
exports.PEER_ADDRESS = 'peer.address';
/**
 * PEER_HOST_IPV4 (number) Remote IPv4 address as a .-separated tuple.
 * E.g., "127.0.0.1"
 */
exports.PEER_HOST_IPV4 = 'peer.ipv4';
// PEER_HOST_IPV6 (string) Remote IPv6 address as a string of
// colon-separated 4-char hex tuples. E.g., "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
exports.PEER_HOST_IPV6 = 'peer.ipv6';
// PEER_PORT (number) Remote port. E.g., 80
exports.PEER_PORT = 'peer.port';
// ---------------------------------------------------------------------------
// HTTP tags
// ---------------------------------------------------------------------------
/**
 * HTTP_URL (string) URL of the request being handled in this segment of the
 * trace, in standard URI format. E.g., "https://domain.net/path/to?resource=here"
 */
exports.HTTP_URL = 'http.url';
/**
 * HTTP_METHOD (string) HTTP method of the request for the associated Span. E.g.,
 * "GET", "POST"
 */
exports.HTTP_METHOD = 'http.method';
/**
 * HTTP_STATUS_CODE (number) HTTP response status code for the associated Span.
 * E.g., 200, 503, 404
 */
exports.HTTP_STATUS_CODE = 'http.status_code';
// -------------------------------------------------------------------------
// Messaging tags
// -------------------------------------------------------------------------
/**
 * MESSAGE_BUS_DESTINATION (string) An address at which messages can be exchanged.
 * E.g. A Kafka record has an associated "topic name" that can be extracted
 * by the instrumented producer or consumer and stored using this tag.
 */
exports.MESSAGE_BUS_DESTINATION = 'message_bus.destination';
// --------------------------------------------------------------------------
// Database tags
// --------------------------------------------------------------------------
/**
 * DB_INSTANCE (string) Database instance name. E.g., In java, if the
 * jdbc.url="jdbc:mysql://127.0.0.1:3306/customers", the instance name is "customers".
 */
exports.DB_INSTANCE = 'db.instance';
/**
 * DB_STATEMENT (string) A database statement for the given database type.
 * E.g., for db.type="SQL", "SELECT * FROM wuser_table";
 * for db.type="redis", "SET mykey 'WuValue'".
 */
exports.DB_STATEMENT = 'db.statement';
/**
 * DB_TYPE (string) Database type. For any SQL database, "sql". For others,
 * the lower-case database category, e.g. "cassandra", "hbase", or "redis".
 */
exports.DB_TYPE = 'db.type';
/**
 * DB_USER (string) Username for accessing database. E.g., "readonly_user"
 * or "reporting_user"
 */
exports.DB_USER = 'db.user';
//# sourceMappingURL=tags.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/functions.js":
/*!***************************************************!*\
  !*** ./node_modules/opentracing/lib/functions.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Constants = __webpack_require__(/*! ./constants */ "./node_modules/opentracing/lib/constants.js");
var reference_1 = __webpack_require__(/*! ./reference */ "./node_modules/opentracing/lib/reference.js");
var span_1 = __webpack_require__(/*! ./span */ "./node_modules/opentracing/lib/span.js");
/**
 * Return a new REFERENCE_CHILD_OF reference.
 *
 * @param {SpanContext} spanContext - the parent SpanContext instance to
 *        reference.
 * @return a REFERENCE_CHILD_OF reference pointing to `spanContext`
 */
function childOf(spanContext) {
    // Allow the user to pass a Span instead of a SpanContext
    if (spanContext instanceof span_1.default) {
        spanContext = spanContext.context();
    }
    return new reference_1.default(Constants.REFERENCE_CHILD_OF, spanContext);
}
exports.childOf = childOf;
/**
 * Return a new REFERENCE_FOLLOWS_FROM reference.
 *
 * @param {SpanContext} spanContext - the parent SpanContext instance to
 *        reference.
 * @return a REFERENCE_FOLLOWS_FROM reference pointing to `spanContext`
 */
function followsFrom(spanContext) {
    // Allow the user to pass a Span instead of a SpanContext
    if (spanContext instanceof span_1.default) {
        spanContext = spanContext.context();
    }
    return new reference_1.default(Constants.REFERENCE_FOLLOWS_FROM, spanContext);
}
exports.followsFrom = followsFrom;
//# sourceMappingURL=functions.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/global_tracer.js":
/*!*******************************************************!*\
  !*** ./node_modules/opentracing/lib/global_tracer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tracer_1 = __webpack_require__(/*! ./tracer */ "./node_modules/opentracing/lib/tracer.js");
var noopTracer = new tracer_1.default();
var _globalTracer = null;
// Allows direct importing/requiring of the global tracer:
//
// let globalTracer = require('opentracing/global');
//      OR
// import globalTracer from 'opentracing/global';
//
// Acts a bridge to the global tracer that can be safely called before the
// global tracer is initialized. The purpose of the delegation is to avoid the
// sometimes nearly intractible initialization order problems that can arise in
// applications with a complex set of dependencies, while also avoiding the
// case where
var GlobalTracerDelegate = /** @class */ (function (_super) {
    __extends(GlobalTracerDelegate, _super);
    function GlobalTracerDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalTracerDelegate.prototype.startSpan = function () {
        var tracer = _globalTracer || noopTracer;
        return tracer.startSpan.apply(tracer, arguments);
    };
    GlobalTracerDelegate.prototype.inject = function () {
        var tracer = _globalTracer || noopTracer;
        return tracer.inject.apply(tracer, arguments);
    };
    GlobalTracerDelegate.prototype.extract = function () {
        var tracer = _globalTracer || noopTracer;
        return tracer.extract.apply(tracer, arguments);
    };
    return GlobalTracerDelegate;
}(tracer_1.default));
var globalTracerDelegate = new GlobalTracerDelegate();
/**
 * Set the global Tracer.
 *
 * The behavior is undefined if this function is called more than once.
 *
 * @param {Tracer} tracer - the Tracer implementation
 */
function initGlobalTracer(tracer) {
    _globalTracer = tracer;
}
exports.initGlobalTracer = initGlobalTracer;
/**
 * Returns the global tracer.
 */
function globalTracer() {
    // Return the delegate.  Since the global tracer is largely a convenience
    // (the user can always create their own tracers), the delegate is used to
    // give the added convenience of not needing to worry about initialization
    // order.
    return globalTracerDelegate;
}
exports.globalTracer = globalTracer;
//# sourceMappingURL=global_tracer.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/opentracing/lib/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var binary_carrier_1 = __webpack_require__(/*! ./binary_carrier */ "./node_modules/opentracing/lib/binary_carrier.js");
exports.BinaryCarrier = binary_carrier_1.default;
var Tags = __webpack_require__(/*! ./ext/tags */ "./node_modules/opentracing/lib/ext/tags.js");
exports.Tags = Tags;
var Noop = __webpack_require__(/*! ./noop */ "./node_modules/opentracing/lib/noop.js");
var reference_1 = __webpack_require__(/*! ./reference */ "./node_modules/opentracing/lib/reference.js");
exports.Reference = reference_1.default;
var span_1 = __webpack_require__(/*! ./span */ "./node_modules/opentracing/lib/span.js");
exports.Span = span_1.default;
var span_context_1 = __webpack_require__(/*! ./span_context */ "./node_modules/opentracing/lib/span_context.js");
exports.SpanContext = span_context_1.default;
var tracer_1 = __webpack_require__(/*! ./tracer */ "./node_modules/opentracing/lib/tracer.js");
exports.Tracer = tracer_1.Tracer;
var mock_tracer_1 = __webpack_require__(/*! ./mock_tracer */ "./node_modules/opentracing/lib/mock_tracer/index.js");
exports.MockTracer = mock_tracer_1.MockTracer;
__export(__webpack_require__(/*! ./global_tracer */ "./node_modules/opentracing/lib/global_tracer.js"));
__export(__webpack_require__(/*! ./constants */ "./node_modules/opentracing/lib/constants.js"));
__export(__webpack_require__(/*! ./functions */ "./node_modules/opentracing/lib/functions.js"));
// Initialize the noops last to avoid a dependecy cycle between the classes.
Noop.initialize();
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/mock_tracer/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/opentracing/lib/mock_tracer/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mock_context_1 = __webpack_require__(/*! ./mock_context */ "./node_modules/opentracing/lib/mock_tracer/mock_context.js");
exports.MockContext = mock_context_1.default;
var mock_span_1 = __webpack_require__(/*! ./mock_span */ "./node_modules/opentracing/lib/mock_tracer/mock_span.js");
exports.MockSpan = mock_span_1.default;
var mock_tracer_1 = __webpack_require__(/*! ./mock_tracer */ "./node_modules/opentracing/lib/mock_tracer/mock_tracer.js");
exports.MockTracer = mock_tracer_1.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/mock_tracer/mock_context.js":
/*!******************************************************************!*\
  !*** ./node_modules/opentracing/lib/mock_tracer/mock_context.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var opentracing = __webpack_require__(/*! ../index */ "./node_modules/opentracing/lib/index.js");
/**
 * OpenTracing Context implementation designed for use in
 * unit tests.
 */
var MockContext = /** @class */ (function (_super) {
    __extends(MockContext, _super);
    function MockContext(span) {
        var _this = _super.call(this) || this;
        // Store a reference to the span itself since this is a mock tracer
        // intended to make debugging and unit testing easier.
        _this._span = span;
        return _this;
    }
    MockContext.prototype.span = function () {
        return this._span;
    };
    return MockContext;
}(opentracing.SpanContext));
exports.MockContext = MockContext;
exports.default = MockContext;
//# sourceMappingURL=mock_context.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/mock_tracer/mock_report.js":
/*!*****************************************************************!*\
  !*** ./node_modules/opentracing/lib/mock_tracer/mock_report.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Index a collection of reported MockSpans in a way that's easy to run unit
 * test assertions against.
 */
var MockReport = /** @class */ (function () {
    function MockReport(spans) {
        var _this = this;
        this.spans = spans;
        this.spansByUUID = {};
        this.spansByTag = {};
        this.debugSpans = [];
        this.unfinishedSpans = [];
        spans.forEach(function (span) {
            if (span._finishMs === 0) {
                _this.unfinishedSpans.push(span);
            }
            _this.spansByUUID[span.uuid()] = span;
            _this.debugSpans.push(span.debug());
            var tags = span.tags();
            Object.keys(tags).forEach(function (key) {
                var val = tags[key];
                _this.spansByTag[key] = _this.spansByTag[key] || {};
                _this.spansByTag[key][val] = _this.spansByTag[key][val] || [];
                _this.spansByTag[key][val].push(span);
            });
        });
    }
    MockReport.prototype.firstSpanWithTagValue = function (key, val) {
        var m = this.spansByTag[key];
        if (!m) {
            return null;
        }
        var n = m[val];
        if (!n) {
            return null;
        }
        return n[0];
    };
    return MockReport;
}());
exports.MockReport = MockReport;
exports.default = MockReport;
//# sourceMappingURL=mock_report.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/mock_tracer/mock_span.js":
/*!***************************************************************!*\
  !*** ./node_modules/opentracing/lib/mock_tracer/mock_span.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable import/no-extraneous-dependencies */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var opentracing = __webpack_require__(/*! ../index */ "./node_modules/opentracing/lib/index.js");
var mock_context_1 = __webpack_require__(/*! ./mock_context */ "./node_modules/opentracing/lib/mock_tracer/mock_context.js");
/**
 * OpenTracing Span implementation designed for use in unit tests.
 */
var MockSpan = /** @class */ (function (_super) {
    __extends(MockSpan, _super);
    //------------------------------------------------------------------------//
    // MockSpan-specific
    //------------------------------------------------------------------------//
    function MockSpan(tracer) {
        var _this = _super.call(this) || this;
        _this._mockTracer = tracer;
        _this._uuid = _this._generateUUID();
        _this._startMs = Date.now();
        _this._finishMs = 0;
        _this._operationName = '';
        _this._tags = {};
        _this._logs = [];
        return _this;
    }
    //------------------------------------------------------------------------//
    // OpenTracing implementation
    //------------------------------------------------------------------------//
    MockSpan.prototype._context = function () {
        return new mock_context_1.default(this);
    };
    MockSpan.prototype._setOperationName = function (name) {
        this._operationName = name;
    };
    MockSpan.prototype._addTags = function (set) {
        var keys = Object.keys(set);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            this._tags[key] = set[key];
        }
    };
    MockSpan.prototype._log = function (fields, timestamp) {
        this._logs.push({
            fields: fields,
            timestamp: timestamp
        });
    };
    MockSpan.prototype._finish = function (finishTime) {
        this._finishMs = finishTime || Date.now();
    };
    MockSpan.prototype.uuid = function () {
        return this._uuid;
    };
    MockSpan.prototype.operationName = function () {
        return this._operationName;
    };
    MockSpan.prototype.durationMs = function () {
        return this._finishMs - this._startMs;
    };
    MockSpan.prototype.tags = function () {
        return this._tags;
    };
    MockSpan.prototype.tracer = function () {
        return this._mockTracer;
    };
    MockSpan.prototype._generateUUID = function () {
        var p0 = ("00000000" + Math.abs((Math.random() * 0xFFFFFFFF) | 0).toString(16)).substr(-8);
        var p1 = ("00000000" + Math.abs((Math.random() * 0xFFFFFFFF) | 0).toString(16)).substr(-8);
        return "" + p0 + p1;
    };
    MockSpan.prototype.addReference = function (ref) {
    };
    /**
     * Returns a simplified object better for console.log()'ing.
     */
    MockSpan.prototype.debug = function () {
        var obj = {
            uuid: this._uuid,
            operation: this._operationName,
            millis: [this._finishMs - this._startMs, this._startMs, this._finishMs]
        };
        if (Object.keys(this._tags).length) {
            obj.tags = this._tags;
        }
        return obj;
    };
    return MockSpan;
}(opentracing.Span));
exports.MockSpan = MockSpan;
exports.default = MockSpan;
//# sourceMappingURL=mock_span.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/mock_tracer/mock_tracer.js":
/*!*****************************************************************!*\
  !*** ./node_modules/opentracing/lib/mock_tracer/mock_tracer.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Move mock-tracer to its own NPM package once it is complete and tested.
var opentracing = __webpack_require__(/*! ../index */ "./node_modules/opentracing/lib/index.js");
var mock_report_1 = __webpack_require__(/*! ./mock_report */ "./node_modules/opentracing/lib/mock_tracer/mock_report.js");
var mock_span_1 = __webpack_require__(/*! ./mock_span */ "./node_modules/opentracing/lib/mock_tracer/mock_span.js");
/**
 * OpenTracing Tracer implementation designed for use in unit tests.
 */
var MockTracer = /** @class */ (function (_super) {
    __extends(MockTracer, _super);
    //------------------------------------------------------------------------//
    // MockTracer-specific
    //------------------------------------------------------------------------//
    function MockTracer() {
        var _this = _super.call(this) || this;
        _this._spans = [];
        return _this;
    }
    //------------------------------------------------------------------------//
    // OpenTracing implementation
    //------------------------------------------------------------------------//
    MockTracer.prototype._startSpan = function (name, fields) {
        // _allocSpan is given it's own method so that derived classes can
        // allocate any type of object they want, but not have to duplicate
        // the other common logic in startSpan().
        var span = this._allocSpan();
        span.setOperationName(name);
        this._spans.push(span);
        if (fields.references) {
            for (var _i = 0, _a = fields.references; _i < _a.length; _i++) {
                var ref = _a[_i];
                span.addReference(ref);
            }
        }
        // Capture the stack at the time the span started
        span._startStack = new Error().stack;
        return span;
    };
    MockTracer.prototype._inject = function (span, format, carrier) {
        throw new Error('NOT YET IMPLEMENTED');
    };
    MockTracer.prototype._extract = function (format, carrier) {
        throw new Error('NOT YET IMPLEMENTED');
    };
    MockTracer.prototype._allocSpan = function () {
        return new mock_span_1.default(this);
    };
    /**
     * Discard any buffered data.
     */
    MockTracer.prototype.clear = function () {
        this._spans = [];
    };
    /**
     * Return the buffered data in a format convenient for making unit test
     * assertions.
     */
    MockTracer.prototype.report = function () {
        return new mock_report_1.default(this._spans);
    };
    return MockTracer;
}(opentracing.Tracer));
exports.MockTracer = MockTracer;
exports.default = MockTracer;
//# sourceMappingURL=mock_tracer.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/noop.js":
/*!**********************************************!*\
  !*** ./node_modules/opentracing/lib/noop.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var span_1 = __webpack_require__(/*! ./span */ "./node_modules/opentracing/lib/span.js");
var span_context_1 = __webpack_require__(/*! ./span_context */ "./node_modules/opentracing/lib/span_context.js");
var tracer_1 = __webpack_require__(/*! ./tracer */ "./node_modules/opentracing/lib/tracer.js");
exports.tracer = null;
exports.spanContext = null;
exports.span = null;
// Deferred initialization to avoid a dependency cycle where Tracer depends on
// Span which depends on the noop tracer.
function initialize() {
    exports.tracer = new tracer_1.default();
    exports.span = new span_1.default();
    exports.spanContext = new span_context_1.default();
}
exports.initialize = initialize;
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/reference.js":
/*!***************************************************!*\
  !*** ./node_modules/opentracing/lib/reference.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var span_1 = __webpack_require__(/*! ./span */ "./node_modules/opentracing/lib/span.js");
/**
 * Reference pairs a reference type constant (e.g., REFERENCE_CHILD_OF or
 * REFERENCE_FOLLOWS_FROM) with the SpanContext it points to.
 *
 * See the exported childOf() and followsFrom() functions at the package level.
 */
var Reference = /** @class */ (function () {
    /**
     * Initialize a new Reference instance.
     *
     * @param {string} type - the Reference type constant (e.g.,
     *        REFERENCE_CHILD_OF or REFERENCE_FOLLOWS_FROM).
     * @param {SpanContext} referencedContext - the SpanContext being referred
     *        to. As a convenience, a Span instance may be passed in instead
     *        (in which case its .context() is used here).
     */
    function Reference(type, referencedContext) {
        this._type = type;
        this._referencedContext = (referencedContext instanceof span_1.default ?
            referencedContext.context() :
            referencedContext);
    }
    /**
     * @return {string} The Reference type (e.g., REFERENCE_CHILD_OF or
     *         REFERENCE_FOLLOWS_FROM).
     */
    Reference.prototype.type = function () {
        return this._type;
    };
    /**
     * @return {SpanContext} The SpanContext being referred to (e.g., the
     *         parent in a REFERENCE_CHILD_OF Reference).
     */
    Reference.prototype.referencedContext = function () {
        return this._referencedContext;
    };
    return Reference;
}());
exports.default = Reference;
//# sourceMappingURL=reference.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/span.js":
/*!**********************************************!*\
  !*** ./node_modules/opentracing/lib/span.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var noop = __webpack_require__(/*! ./noop */ "./node_modules/opentracing/lib/noop.js");
/**
 * Span represents a logical unit of work as part of a broader Trace. Examples
 * of span might include remote procedure calls or a in-process function calls
 * to sub-components. A Trace has a single, top-level "root" Span that in turn
 * may have zero or more child Spans, which in turn may have children.
 */
var Span = /** @class */ (function () {
    function Span() {
    }
    // ---------------------------------------------------------------------- //
    // OpenTracing API methods
    // ---------------------------------------------------------------------- //
    /**
     * Returns the SpanContext object associated with this Span.
     *
     * @return {SpanContext}
     */
    Span.prototype.context = function () {
        return this._context();
    };
    /**
     * Returns the Tracer object used to create this Span.
     *
     * @return {Tracer}
     */
    Span.prototype.tracer = function () {
        return this._tracer();
    };
    /**
     * Sets the string name for the logical operation this span represents.
     *
     * @param {string} name
     */
    Span.prototype.setOperationName = function (name) {
        this._setOperationName(name);
        return this;
    };
    /**
     * Sets a key:value pair on this Span that also propagates to future
     * children of the associated Span.
     *
     * setBaggageItem() enables powerful functionality given a full-stack
     * opentracing integration (e.g., arbitrary application data from a web
     * client can make it, transparently, all the way into the depths of a
     * storage system), and with it some powerful costs: use this feature with
     * care.
     *
     * IMPORTANT NOTE #1: setBaggageItem() will only propagate baggage items to
     * *future* causal descendants of the associated Span.
     *
     * IMPORTANT NOTE #2: Use this thoughtfully and with care. Every key and
     * value is copied into every local *and remote* child of the associated
     * Span, and that can add up to a lot of network and cpu overhead.
     *
     * @param {string} key
     * @param {string} value
     */
    Span.prototype.setBaggageItem = function (key, value) {
        this._setBaggageItem(key, value);
        return this;
    };
    /**
     * Returns the value for a baggage item given its key.
     *
     * @param  {string} key
     *         The key for the given trace attribute.
     * @return {string}
     *         String value for the given key, or undefined if the key does not
     *         correspond to a set trace attribute.
     */
    Span.prototype.getBaggageItem = function (key) {
        return this._getBaggageItem(key);
    };
    /**
     * Adds a single tag to the span.  See `addTags()` for details.
     *
     * @param {string} key
     * @param {any} value
     */
    Span.prototype.setTag = function (key, value) {
        var _a;
        // NOTE: the call is normalized to a call to _addTags()
        this._addTags((_a = {}, _a[key] = value, _a));
        return this;
    };
    /**
     * Adds the given key value pairs to the set of span tags.
     *
     * Multiple calls to addTags() results in the tags being the superset of
     * all calls.
     *
     * The behavior of setting the same key multiple times on the same span
     * is undefined.
     *
     * The supported type of the values is implementation-dependent.
     * Implementations are expected to safely handle all types of values but
     * may choose to ignore unrecognized / unhandle-able values (e.g. objects
     * with cyclic references, function objects).
     *
     * @return {[type]} [description]
     */
    Span.prototype.addTags = function (keyValueMap) {
        this._addTags(keyValueMap);
        return this;
    };
    /**
     * Add a log record to this Span, optionally at a user-provided timestamp.
     *
     * For example:
     *
     *     span.log({
     *         size: rpc.size(),  // numeric value
     *         URI: rpc.URI(),  // string value
     *         payload: rpc.payload(),  // Object value
     *         "keys can be arbitrary strings": rpc.foo(),
     *     });
     *
     *     span.log({
     *         "error.description": someError.description(),
     *     }, someError.timestampMillis());
     *
     * @param {object} keyValuePairs
     *        An object mapping string keys to arbitrary value types. All
     *        Tracer implementations should support bool, string, and numeric
     *        value types, and some may also support Object values.
     * @param {number} timestamp
     *        An optional parameter specifying the timestamp in milliseconds
     *        since the Unix epoch. Fractional values are allowed so that
     *        timestamps with sub-millisecond accuracy can be represented. If
     *        not specified, the implementation is expected to use its notion
     *        of the current time of the call.
     */
    Span.prototype.log = function (keyValuePairs, timestamp) {
        this._log(keyValuePairs, timestamp);
        return this;
    };
    /**
     * DEPRECATED
     */
    Span.prototype.logEvent = function (eventName, payload) {
        return this._log({ event: eventName, payload: payload });
    };
    /**
     * Sets the end timestamp and finalizes Span state.
     *
     * With the exception of calls to Span.context() (which are always allowed),
     * finish() must be the last call made to any span instance, and to do
     * otherwise leads to undefined behavior.
     *
     * @param  {number} finishTime
     *         Optional finish time in milliseconds as a Unix timestamp. Decimal
     *         values are supported for timestamps with sub-millisecond accuracy.
     *         If not specified, the current time (as defined by the
     *         implementation) will be used.
     */
    Span.prototype.finish = function (finishTime) {
        this._finish(finishTime);
        // Do not return `this`. The Span generally should not be used after it
        // is finished so chaining is not desired in this context.
    };
    // ---------------------------------------------------------------------- //
    // Derived classes can choose to implement the below
    // ---------------------------------------------------------------------- //
    // By default returns a no-op SpanContext.
    Span.prototype._context = function () {
        return noop.spanContext;
    };
    // By default returns a no-op tracer.
    //
    // The base class could store the tracer that created it, but it does not
    // in order to ensure the no-op span implementation has zero members,
    // which allows V8 to aggressively optimize calls to such objects.
    Span.prototype._tracer = function () {
        return noop.tracer;
    };
    // By default does nothing
    Span.prototype._setOperationName = function (name) {
    };
    // By default does nothing
    Span.prototype._setBaggageItem = function (key, value) {
    };
    // By default does nothing
    Span.prototype._getBaggageItem = function (key) {
        return undefined;
    };
    // By default does nothing
    //
    // NOTE: both setTag() and addTags() map to this function. keyValuePairs
    // will always be an associative array.
    Span.prototype._addTags = function (keyValuePairs) {
    };
    // By default does nothing
    Span.prototype._log = function (keyValuePairs, timestamp) {
    };
    // By default does nothing
    //
    // finishTime is expected to be either a number or undefined.
    Span.prototype._finish = function (finishTime) {
    };
    return Span;
}());
exports.Span = Span;
exports.default = Span;
//# sourceMappingURL=span.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/span_context.js":
/*!******************************************************!*\
  !*** ./node_modules/opentracing/lib/span_context.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * SpanContext represents Span state that must propagate to descendant Spans
 * and across process boundaries.
 *
 * SpanContext is logically divided into two pieces: the user-level "Baggage"
 * (see setBaggageItem and getBaggageItem) that propagates across Span
 * boundaries and any Tracer-implementation-specific fields that are needed to
 * identify or otherwise contextualize the associated Span instance (e.g., a
 * <trace_id, span_id, sampled> tuple).
 */
var SpanContext = /** @class */ (function () {
    function SpanContext() {
    }
    // The SpanContext is entirely implementation dependent
    /**
     * Returns a string representation of the implementation internal trace ID.
     *
     * @returns {string}
     */
    SpanContext.prototype.toTraceId = function () {
        return '';
    };
    /**
     * Returns a string representation of the implementation internal span ID.
     *
     * @returns {string}
     */
    SpanContext.prototype.toSpanId = function () {
        return '';
    };
    return SpanContext;
}());
exports.SpanContext = SpanContext;
exports.default = SpanContext;
//# sourceMappingURL=span_context.js.map

/***/ }),

/***/ "./node_modules/opentracing/lib/tracer.js":
/*!************************************************!*\
  !*** ./node_modules/opentracing/lib/tracer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Functions = __webpack_require__(/*! ./functions */ "./node_modules/opentracing/lib/functions.js");
var Noop = __webpack_require__(/*! ./noop */ "./node_modules/opentracing/lib/noop.js");
var span_1 = __webpack_require__(/*! ./span */ "./node_modules/opentracing/lib/span.js");
/**
 * Tracer is the entry-point between the instrumentation API and the tracing
 * implementation.
 *
 * The default object acts as a no-op implementation.
 *
 * Note to implementators: derived classes can choose to directly implement the
 * methods in the "OpenTracing API methods" section, or optionally the subset of
 * underscore-prefixed methods to pick up the argument checking and handling
 * automatically from the base class.
 */
var Tracer = /** @class */ (function () {
    function Tracer() {
    }
    // ---------------------------------------------------------------------- //
    // OpenTracing API methods
    // ---------------------------------------------------------------------- //
    /**
     * Starts and returns a new Span representing a logical unit of work.
     *
     * For example:
     *
     *     // Start a new (parentless) root Span:
     *     var parent = Tracer.startSpan('DoWork');
     *
     *     // Start a new (child) Span:
     *     var child = Tracer.startSpan('load-from-db', {
     *         childOf: parent.context(),
     *     });
     *
     *     // Start a new async (FollowsFrom) Span:
     *     var child = Tracer.startSpan('async-cache-write', {
     *         references: [
     *             opentracing.followsFrom(parent.context())
     *         ],
     *     });
     *
     * @param {string} name - the name of the operation (REQUIRED).
     * @param {SpanOptions} [options] - options for the newly created span.
     * @return {Span} - a new Span object.
     */
    Tracer.prototype.startSpan = function (name, options) {
        if (options === void 0) { options = {}; }
        // Convert options.childOf to fields.references as needed.
        if (options.childOf) {
            // Convert from a Span or a SpanContext into a Reference.
            var childOf = Functions.childOf(options.childOf);
            if (options.references) {
                options.references.push(childOf);
            }
            else {
                options.references = [childOf];
            }
            delete (options.childOf);
        }
        return this._startSpan(name, options);
    };
    /**
     * Injects the given SpanContext instance for cross-process propagation
     * within `carrier`. The expected type of `carrier` depends on the value of
     * `format.
     *
     * OpenTracing defines a common set of `format` values (see
     * FORMAT_TEXT_MAP, FORMAT_HTTP_HEADERS, and FORMAT_BINARY), and each has
     * an expected carrier type.
     *
     * Consider this pseudocode example:
     *
     *     var clientSpan = ...;
     *     ...
     *     // Inject clientSpan into a text carrier.
     *     var headersCarrier = {};
     *     Tracer.inject(clientSpan.context(), Tracer.FORMAT_HTTP_HEADERS, headersCarrier);
     *     // Incorporate the textCarrier into the outbound HTTP request header
     *     // map.
     *     Object.assign(outboundHTTPReq.headers, headersCarrier);
     *     // ... send the httpReq
     *
     * @param  {SpanContext} spanContext - the SpanContext to inject into the
     *         carrier object. As a convenience, a Span instance may be passed
     *         in instead (in which case its .context() is used for the
     *         inject()).
     * @param  {string} format - the format of the carrier.
     * @param  {any} carrier - see the documentation for the chosen `format`
     *         for a description of the carrier object.
     */
    Tracer.prototype.inject = function (spanContext, format, carrier) {
        // Allow the user to pass a Span instead of a SpanContext
        if (spanContext instanceof span_1.default) {
            spanContext = spanContext.context();
        }
        return this._inject(spanContext, format, carrier);
    };
    /**
     * Returns a SpanContext instance extracted from `carrier` in the given
     * `format`.
     *
     * OpenTracing defines a common set of `format` values (see
     * FORMAT_TEXT_MAP, FORMAT_HTTP_HEADERS, and FORMAT_BINARY), and each has
     * an expected carrier type.
     *
     * Consider this pseudocode example:
     *
     *     // Use the inbound HTTP request's headers as a text map carrier.
     *     var headersCarrier = inboundHTTPReq.headers;
     *     var wireCtx = Tracer.extract(Tracer.FORMAT_HTTP_HEADERS, headersCarrier);
     *     var serverSpan = Tracer.startSpan('...', { childOf : wireCtx });
     *
     * @param  {string} format - the format of the carrier.
     * @param  {any} carrier - the type of the carrier object is determined by
     *         the format.
     * @return {SpanContext}
     *         The extracted SpanContext, or null if no such SpanContext could
     *         be found in `carrier`
     */
    Tracer.prototype.extract = function (format, carrier) {
        return this._extract(format, carrier);
    };
    // ---------------------------------------------------------------------- //
    // Derived classes can choose to implement the below
    // ---------------------------------------------------------------------- //
    // NOTE: the input to this method is *always* an associative array. The
    // public-facing startSpan() method normalizes the arguments so that
    // all N implementations do not need to worry about variations in the call
    // signature.
    //
    // The default behavior returns a no-op span.
    Tracer.prototype._startSpan = function (name, fields) {
        return Noop.span;
    };
    // The default behavior is a no-op.
    Tracer.prototype._inject = function (spanContext, format, carrier) {
    };
    // The default behavior is to return a no-op SpanContext.
    Tracer.prototype._extract = function (format, carrier) {
        return Noop.spanContext;
    };
    return Tracer;
}());
exports.Tracer = Tracer;
exports.default = Tracer;
//# sourceMappingURL=tracer.js.map

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, main, types, browser, engines, scripts, license, repository, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"lightstep-tracer\",\"version\":\"0.31.2\",\"main\":\"index.js\",\"types\":\"index.d.ts\",\"browser\":\"browser.js\",\"engines\":{\"node\":\">=8.0.0\"},\"scripts\":{\"release\":\"./scripts/release.sh\",\"release:prepare\":\"./scripts/release-prepare.sh\",\"test\":\"rm -f test/results/*.json && node node_modules/mocha/bin/mocha -c test/unittest_node.js\",\"version\":\"make build && git add -A dist\"},\"license\":\"MIT\",\"repository\":{\"type\":\"git\",\"url\":\"http://github.com/lightstep/lightstep-tracer-javascript.git\"},\"dependencies\":{\"async\":\"1.5.0\",\"eventemitter3\":\"1.1.1\",\"google-protobuf\":\"3.6.1\",\"hex2dec\":\"1.0.1\",\"opentracing\":\"^0.14.4\",\"source-map-support\":\"0.3.3\",\"thrift\":\"^0.14.1\"},\"devDependencies\":{\"babel-cli\":\"^6.26.0\",\"babel-core\":\"^6.26.3\",\"babel-loader\":\"7\",\"babel-plugin-add-module-exports\":\"^1.0.4\",\"babel-plugin-check-es2015-constants\":\"6.7.2\",\"babel-plugin-syntax-object-rest-spread\":\"^6.13.0\",\"babel-plugin-transform-es2015-arrow-functions\":\"6.5.2\",\"babel-plugin-transform-es2015-block-scoped-functions\":\"6.6.5\",\"babel-plugin-transform-es2015-block-scoping\":\"^6.26.0\",\"babel-plugin-transform-es2015-classes\":\"6.6.5\",\"babel-plugin-transform-es2015-computed-properties\":\"6.6.5\",\"babel-plugin-transform-es2015-destructuring\":\"6.6.5\",\"babel-plugin-transform-es2015-duplicate-keys\":\"6.6.4\",\"babel-plugin-transform-es2015-literals\":\"6.5.0\",\"babel-plugin-transform-es2015-modules-commonjs\":\"6.7.4\",\"babel-plugin-transform-es2015-object-super\":\"6.6.5\",\"babel-plugin-transform-es2015-parameters\":\"6.7.0\",\"babel-plugin-transform-es2015-spread\":\"^6.6.5\",\"babel-plugin-transform-es2015-sticky-regex\":\"6.5.0\",\"babel-plugin-transform-es2015-template-literals\":\"6.6.5\",\"babel-plugin-transform-es2015-unicode-regex\":\"6.5.0\",\"babel-plugin-transform-object-rest-spread\":\"^6.26.0\",\"babel-polyfill\":\"6.3.14\",\"babel-preset-es2015\":\"6.3.13\",\"chai\":\"3.4.1\",\"clone\":\"1.0.2\",\"colors\":\"1.1.2\",\"eslint\":\"^6.8.0\",\"eslint-config-airbnb\":\"^18.0.1\",\"eslint-plugin-import\":\"^2.20.0\",\"eslint-plugin-jsx-a11y\":\"^6.2.3\",\"eslint-plugin-react\":\"^7.18.0\",\"express\":\"^4.16.3\",\"fetch-mock\":\"^9.2.1\",\"istanbul\":\"^0.4.5\",\"mocha\":\"^7.1.2\",\"package-json\":\"^6.5.0\",\"shelljs\":\"0.5.3\",\"sinon\":\"^9.0.1\",\"sprintf-js\":\"1.0.3\",\"underscore\":\"1.12.1\",\"watch-trigger\":\"0.0.5\",\"webpack\":\"4.46.0\",\"webpack-cli\":\"^4.7.0\"}}");

/***/ }),

/***/ "./src/_each.js":
/*!**********************!*\
  !*** ./src/_each.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _each;
// Underscore.js-like wrapper to iterate object key-values. Note that even for completely
// internal objects, packages may modify default Object prototypes and properties
// (e.g. Ember.js) so it's almost never safe to assume a particular object can
// iterated with for-in.
// TODO: remove this function and replace with Object.keys, Object.values, ... (spread) or other.
function _each(obj, cb) {
    if (!obj) {
        return;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            cb(obj[key], key);
        }
    }
}
module.exports = exports.default;

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var LOG_INFO = exports.LOG_INFO = 0;
var LOG_WARN = exports.LOG_WARN = 1;
var LOG_ERROR = exports.LOG_ERROR = 2;
var LOG_FATAL = exports.LOG_FATAL = 3;

var LOG_LEVEL_TO_STRING = exports.LOG_LEVEL_TO_STRING = {
    LOG_INFO: 'I',
    LOG_WARN: 'W',
    LOG_ERROR: 'E',
    LOG_FATAL: 'F'
};
var LOG_STRING_TO_LEVEL = exports.LOG_STRING_TO_LEVEL = {
    I: LOG_INFO,
    W: LOG_WARN,
    E: LOG_ERROR,
    F: LOG_FATAL
};

// The report interval for empty reports used to sample the clock skew
var CLOCK_STATE_REFRESH_INTERVAL_MS = exports.CLOCK_STATE_REFRESH_INTERVAL_MS = 350;

var LIGHTSTEP_APP_URL_PREFIX = exports.LIGHTSTEP_APP_URL_PREFIX = 'https://app.lightstep.com';

var JOIN_ID_PREFIX = exports.JOIN_ID_PREFIX = 'join:';

var LS_META_EVENT_KEY = exports.LS_META_EVENT_KEY = 'lightstep.meta_event';
var LS_META_PROPAGATION_KEY = exports.LS_META_PROPAGATION_KEY = 'lightstep.propagation_format';
var LS_META_TRACE_KEY = exports.LS_META_TRACE_KEY = 'lightstep.trace_id';
var LS_META_SPAN_KEY = exports.LS_META_SPAN_KEY = 'lightstep.span_id';
var LS_META_TRACER_GUID_KEY = exports.LS_META_TRACER_GUID_KEY = 'lightstep.tracer_guid';
var LS_META_EXTRACT = exports.LS_META_EXTRACT = 'lightstep.extract_span';
var LS_META_INJECT = exports.LS_META_INJECT = 'lightstep.inject_span';
var LS_META_SP_START = exports.LS_META_SP_START = 'lightstep.span_start';
var LS_META_SP_FINISH = exports.LS_META_SP_FINISH = 'lightstep.span_finish';
var LS_META_TRACER_CREATE = exports.LS_META_TRACER_CREATE = 'lightstep.tracer_create';

var FORMAT_B3 = exports.FORMAT_B3 = 'format.b3';

/***/ }),

/***/ "./src/imp/auth_imp.js":
/*!*****************************!*\
  !*** ./src/imp/auth_imp.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint-disable-next-line camelcase


var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proto = __webpack_require__(/*! ./generated_proto/collector_pb.js */ "./src/imp/generated_proto/collector_pb.js");

var AuthImp = function () {
    function AuthImp(accessToken) {
        _classCallCheck(this, AuthImp);

        this._accessToken = accessToken;
    }

    _createClass(AuthImp, [{
        key: 'getAccessToken',
        value: function getAccessToken() {
            if (typeof this._accessToken === 'undefined' || this._accessToken === null || this._accessToken.length === 0) {
                return 'empty';
            }

            return this._accessToken;
        }
    }, {
        key: 'toThrift',
        value: function toThrift() {
            return new _platform_abstraction_layer.crouton_thrift.Auth({
                access_token: this._accessToken
            });
        }
    }, {
        key: 'toProto',
        value: function toProto() {
            var authProto = new proto.Auth();
            authProto.setAccessToken(this._accessToken);
            return authProto;
        }
    }]);

    return AuthImp;
}();

exports.default = AuthImp;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/coerce.js":
/*!***************************!*\
  !*** ./src/imp/coerce.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toString = toString;
exports.toNumber = toNumber;
exports.toBoolean = toBoolean;
function toString(value) {
    return '' + value; // eslint-disable-line prefer-template
}

function toNumber(value) {
    return Number(value);
}

function toBoolean(value) {
    return !!value;
}

/***/ }),

/***/ "./src/imp/generated_proto/collector_pb.js":
/*!*************************************************!*\
  !*** ./src/imp/generated_proto/collector_pb.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(/*! google-protobuf */ "./node_modules/google-protobuf/google-protobuf.js");
var goog = jspb;
var global = Function('return this')();

var google_protobuf_timestamp_pb = __webpack_require__(/*! google-protobuf/google/protobuf/timestamp_pb.js */ "./node_modules/google-protobuf/google/protobuf/timestamp_pb.js");
var google_api_annotations_pb = __webpack_require__(/*! ./google/api/annotations_pb.js */ "./src/imp/generated_proto/google/api/annotations_pb.js");
goog.exportSymbol('proto.lightstep.collector.Auth', null, global);
goog.exportSymbol('proto.lightstep.collector.Command', null, global);
goog.exportSymbol('proto.lightstep.collector.InternalMetrics', null, global);
goog.exportSymbol('proto.lightstep.collector.KeyValue', null, global);
goog.exportSymbol('proto.lightstep.collector.Log', null, global);
goog.exportSymbol('proto.lightstep.collector.MetricsSample', null, global);
goog.exportSymbol('proto.lightstep.collector.Reference', null, global);
goog.exportSymbol('proto.lightstep.collector.Reference.Relationship', null, global);
goog.exportSymbol('proto.lightstep.collector.ReportRequest', null, global);
goog.exportSymbol('proto.lightstep.collector.ReportResponse', null, global);
goog.exportSymbol('proto.lightstep.collector.Reporter', null, global);
goog.exportSymbol('proto.lightstep.collector.Span', null, global);
goog.exportSymbol('proto.lightstep.collector.SpanContext', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.SpanContext = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.lightstep.collector.SpanContext, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.SpanContext.displayName = 'proto.lightstep.collector.SpanContext';
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.SpanContext.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.SpanContext.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.SpanContext} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.SpanContext.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      traceId: jspb.Message.getFieldWithDefault(msg, 1, "0"),
      spanId: jspb.Message.getFieldWithDefault(msg, 2, "0"),
      baggageMap: (f = msg.getBaggageMap()) ? f.toObject(includeInstance, undefined) : []
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.SpanContext}
 */
proto.lightstep.collector.SpanContext.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.SpanContext();
  return proto.lightstep.collector.SpanContext.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.SpanContext} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.SpanContext}
 */
proto.lightstep.collector.SpanContext.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */reader.readUint64String();
        msg.setTraceId(value);
        break;
      case 2:
        var value = /** @type {string} */reader.readUint64String();
        msg.setSpanId(value);
        break;
      case 3:
        var value = msg.getBaggageMap();
        reader.readMessage(value, function (message, reader) {
          jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "");
        });
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.SpanContext.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.SpanContext.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.SpanContext} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.SpanContext.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getTraceId();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(1, f);
  }
  f = message.getSpanId();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(2, f);
  }
  f = message.getBaggageMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(3, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
};

/**
 * optional uint64 trace_id = 1;
 * @return {string}
 */
proto.lightstep.collector.SpanContext.prototype.getTraceId = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 1, "0")
  );
};

/** @param {string} value */
proto.lightstep.collector.SpanContext.prototype.setTraceId = function (value) {
  jspb.Message.setProto3StringIntField(this, 1, value);
};

/**
 * optional uint64 span_id = 2;
 * @return {string}
 */
proto.lightstep.collector.SpanContext.prototype.getSpanId = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 2, "0")
  );
};

/** @param {string} value */
proto.lightstep.collector.SpanContext.prototype.setSpanId = function (value) {
  jspb.Message.setProto3StringIntField(this, 2, value);
};

/**
 * map<string, string> baggage = 3;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.lightstep.collector.SpanContext.prototype.getBaggageMap = function (opt_noLazyCreate) {
  return (/** @type {!jspb.Map<string,string>} */jspb.Message.getMapField(this, 3, opt_noLazyCreate, null)
  );
};

proto.lightstep.collector.SpanContext.prototype.clearBaggageMap = function () {
  this.getBaggageMap().clear();
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.KeyValue = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.lightstep.collector.KeyValue.oneofGroups_);
};
goog.inherits(proto.lightstep.collector.KeyValue, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.KeyValue.displayName = 'proto.lightstep.collector.KeyValue';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.lightstep.collector.KeyValue.oneofGroups_ = [[2, 3, 4, 5, 6]];

/**
 * @enum {number}
 */
proto.lightstep.collector.KeyValue.ValueCase = {
  VALUE_NOT_SET: 0,
  STRING_VALUE: 2,
  INT_VALUE: 3,
  DOUBLE_VALUE: 4,
  BOOL_VALUE: 5,
  JSON_VALUE: 6
};

/**
 * @return {proto.lightstep.collector.KeyValue.ValueCase}
 */
proto.lightstep.collector.KeyValue.prototype.getValueCase = function () {
  return (/** @type {proto.lightstep.collector.KeyValue.ValueCase} */jspb.Message.computeOneofCase(this, proto.lightstep.collector.KeyValue.oneofGroups_[0])
  );
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.KeyValue.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.KeyValue.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.KeyValue} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.KeyValue.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      key: jspb.Message.getFieldWithDefault(msg, 1, ""),
      stringValue: jspb.Message.getFieldWithDefault(msg, 2, ""),
      intValue: jspb.Message.getFieldWithDefault(msg, 3, "0"),
      doubleValue: +jspb.Message.getFieldWithDefault(msg, 4, 0.0),
      boolValue: jspb.Message.getFieldWithDefault(msg, 5, false),
      jsonValue: jspb.Message.getFieldWithDefault(msg, 6, "")
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.KeyValue}
 */
proto.lightstep.collector.KeyValue.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.KeyValue();
  return proto.lightstep.collector.KeyValue.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.KeyValue} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.KeyValue}
 */
proto.lightstep.collector.KeyValue.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */reader.readString();
        msg.setKey(value);
        break;
      case 2:
        var value = /** @type {string} */reader.readString();
        msg.setStringValue(value);
        break;
      case 3:
        var value = /** @type {string} */reader.readInt64String();
        msg.setIntValue(value);
        break;
      case 4:
        var value = /** @type {number} */reader.readDouble();
        msg.setDoubleValue(value);
        break;
      case 5:
        var value = /** @type {boolean} */reader.readBool();
        msg.setBoolValue(value);
        break;
      case 6:
        var value = /** @type {string} */reader.readString();
        msg.setJsonValue(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.KeyValue.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.KeyValue.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.KeyValue} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.KeyValue.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getKey();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = /** @type {string} */jspb.Message.getField(message, 2);
  if (f != null) {
    writer.writeString(2, f);
  }
  f = /** @type {string} */jspb.Message.getField(message, 3);
  if (f != null) {
    writer.writeInt64String(3, f);
  }
  f = /** @type {number} */jspb.Message.getField(message, 4);
  if (f != null) {
    writer.writeDouble(4, f);
  }
  f = /** @type {boolean} */jspb.Message.getField(message, 5);
  if (f != null) {
    writer.writeBool(5, f);
  }
  f = /** @type {string} */jspb.Message.getField(message, 6);
  if (f != null) {
    writer.writeString(6, f);
  }
};

/**
 * optional string key = 1;
 * @return {string}
 */
proto.lightstep.collector.KeyValue.prototype.getKey = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 1, "")
  );
};

/** @param {string} value */
proto.lightstep.collector.KeyValue.prototype.setKey = function (value) {
  jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string string_value = 2;
 * @return {string}
 */
proto.lightstep.collector.KeyValue.prototype.getStringValue = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 2, "")
  );
};

/** @param {string} value */
proto.lightstep.collector.KeyValue.prototype.setStringValue = function (value) {
  jspb.Message.setOneofField(this, 2, proto.lightstep.collector.KeyValue.oneofGroups_[0], value);
};

proto.lightstep.collector.KeyValue.prototype.clearStringValue = function () {
  jspb.Message.setOneofField(this, 2, proto.lightstep.collector.KeyValue.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.KeyValue.prototype.hasStringValue = function () {
  return jspb.Message.getField(this, 2) != null;
};

/**
 * optional int64 int_value = 3;
 * @return {string}
 */
proto.lightstep.collector.KeyValue.prototype.getIntValue = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 3, "0")
  );
};

/** @param {string} value */
proto.lightstep.collector.KeyValue.prototype.setIntValue = function (value) {
  jspb.Message.setOneofField(this, 3, proto.lightstep.collector.KeyValue.oneofGroups_[0], value);
};

proto.lightstep.collector.KeyValue.prototype.clearIntValue = function () {
  jspb.Message.setOneofField(this, 3, proto.lightstep.collector.KeyValue.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.KeyValue.prototype.hasIntValue = function () {
  return jspb.Message.getField(this, 3) != null;
};

/**
 * optional double double_value = 4;
 * @return {number}
 */
proto.lightstep.collector.KeyValue.prototype.getDoubleValue = function () {
  return (/** @type {number} */+jspb.Message.getFieldWithDefault(this, 4, 0.0)
  );
};

/** @param {number} value */
proto.lightstep.collector.KeyValue.prototype.setDoubleValue = function (value) {
  jspb.Message.setOneofField(this, 4, proto.lightstep.collector.KeyValue.oneofGroups_[0], value);
};

proto.lightstep.collector.KeyValue.prototype.clearDoubleValue = function () {
  jspb.Message.setOneofField(this, 4, proto.lightstep.collector.KeyValue.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.KeyValue.prototype.hasDoubleValue = function () {
  return jspb.Message.getField(this, 4) != null;
};

/**
 * optional bool bool_value = 5;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.lightstep.collector.KeyValue.prototype.getBoolValue = function () {
  return (/** @type {boolean} */jspb.Message.getFieldWithDefault(this, 5, false)
  );
};

/** @param {boolean} value */
proto.lightstep.collector.KeyValue.prototype.setBoolValue = function (value) {
  jspb.Message.setOneofField(this, 5, proto.lightstep.collector.KeyValue.oneofGroups_[0], value);
};

proto.lightstep.collector.KeyValue.prototype.clearBoolValue = function () {
  jspb.Message.setOneofField(this, 5, proto.lightstep.collector.KeyValue.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.KeyValue.prototype.hasBoolValue = function () {
  return jspb.Message.getField(this, 5) != null;
};

/**
 * optional string json_value = 6;
 * @return {string}
 */
proto.lightstep.collector.KeyValue.prototype.getJsonValue = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 6, "")
  );
};

/** @param {string} value */
proto.lightstep.collector.KeyValue.prototype.setJsonValue = function (value) {
  jspb.Message.setOneofField(this, 6, proto.lightstep.collector.KeyValue.oneofGroups_[0], value);
};

proto.lightstep.collector.KeyValue.prototype.clearJsonValue = function () {
  jspb.Message.setOneofField(this, 6, proto.lightstep.collector.KeyValue.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.KeyValue.prototype.hasJsonValue = function () {
  return jspb.Message.getField(this, 6) != null;
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.Log = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.lightstep.collector.Log.repeatedFields_, null);
};
goog.inherits(proto.lightstep.collector.Log, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.Log.displayName = 'proto.lightstep.collector.Log';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.lightstep.collector.Log.repeatedFields_ = [2];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.Log.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.Log.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.Log} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.Log.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      timestamp: (f = msg.getTimestamp()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
      fieldsList: jspb.Message.toObjectList(msg.getFieldsList(), proto.lightstep.collector.KeyValue.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.Log}
 */
proto.lightstep.collector.Log.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.Log();
  return proto.lightstep.collector.Log.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.Log} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.Log}
 */
proto.lightstep.collector.Log.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new google_protobuf_timestamp_pb.Timestamp();
        reader.readMessage(value, google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
        msg.setTimestamp(value);
        break;
      case 2:
        var value = new proto.lightstep.collector.KeyValue();
        reader.readMessage(value, proto.lightstep.collector.KeyValue.deserializeBinaryFromReader);
        msg.addFields(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.Log.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.Log.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.Log} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.Log.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getTimestamp();
  if (f != null) {
    writer.writeMessage(1, f, google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter);
  }
  f = message.getFieldsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(2, f, proto.lightstep.collector.KeyValue.serializeBinaryToWriter);
  }
};

/**
 * optional google.protobuf.Timestamp timestamp = 1;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.lightstep.collector.Log.prototype.getTimestamp = function () {
  return (/** @type{?proto.google.protobuf.Timestamp} */jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1)
  );
};

/** @param {?proto.google.protobuf.Timestamp|undefined} value */
proto.lightstep.collector.Log.prototype.setTimestamp = function (value) {
  jspb.Message.setWrapperField(this, 1, value);
};

proto.lightstep.collector.Log.prototype.clearTimestamp = function () {
  this.setTimestamp(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.Log.prototype.hasTimestamp = function () {
  return jspb.Message.getField(this, 1) != null;
};

/**
 * repeated KeyValue fields = 2;
 * @return {!Array<!proto.lightstep.collector.KeyValue>}
 */
proto.lightstep.collector.Log.prototype.getFieldsList = function () {
  return (/** @type{!Array<!proto.lightstep.collector.KeyValue>} */jspb.Message.getRepeatedWrapperField(this, proto.lightstep.collector.KeyValue, 2)
  );
};

/** @param {!Array<!proto.lightstep.collector.KeyValue>} value */
proto.lightstep.collector.Log.prototype.setFieldsList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};

/**
 * @param {!proto.lightstep.collector.KeyValue=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lightstep.collector.KeyValue}
 */
proto.lightstep.collector.Log.prototype.addFields = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.lightstep.collector.KeyValue, opt_index);
};

proto.lightstep.collector.Log.prototype.clearFieldsList = function () {
  this.setFieldsList([]);
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.Reference = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.lightstep.collector.Reference, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.Reference.displayName = 'proto.lightstep.collector.Reference';
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.Reference.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.Reference.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.Reference} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.Reference.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      relationship: jspb.Message.getFieldWithDefault(msg, 1, 0),
      spanContext: (f = msg.getSpanContext()) && proto.lightstep.collector.SpanContext.toObject(includeInstance, f)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.Reference}
 */
proto.lightstep.collector.Reference.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.Reference();
  return proto.lightstep.collector.Reference.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.Reference} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.Reference}
 */
proto.lightstep.collector.Reference.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {!proto.lightstep.collector.Reference.Relationship} */reader.readEnum();
        msg.setRelationship(value);
        break;
      case 2:
        var value = new proto.lightstep.collector.SpanContext();
        reader.readMessage(value, proto.lightstep.collector.SpanContext.deserializeBinaryFromReader);
        msg.setSpanContext(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.Reference.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.Reference.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.Reference} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.Reference.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getRelationship();
  if (f !== 0.0) {
    writer.writeEnum(1, f);
  }
  f = message.getSpanContext();
  if (f != null) {
    writer.writeMessage(2, f, proto.lightstep.collector.SpanContext.serializeBinaryToWriter);
  }
};

/**
 * @enum {number}
 */
proto.lightstep.collector.Reference.Relationship = {
  CHILD_OF: 0,
  FOLLOWS_FROM: 1
};

/**
 * optional Relationship relationship = 1;
 * @return {!proto.lightstep.collector.Reference.Relationship}
 */
proto.lightstep.collector.Reference.prototype.getRelationship = function () {
  return (/** @type {!proto.lightstep.collector.Reference.Relationship} */jspb.Message.getFieldWithDefault(this, 1, 0)
  );
};

/** @param {!proto.lightstep.collector.Reference.Relationship} value */
proto.lightstep.collector.Reference.prototype.setRelationship = function (value) {
  jspb.Message.setProto3EnumField(this, 1, value);
};

/**
 * optional SpanContext span_context = 2;
 * @return {?proto.lightstep.collector.SpanContext}
 */
proto.lightstep.collector.Reference.prototype.getSpanContext = function () {
  return (/** @type{?proto.lightstep.collector.SpanContext} */jspb.Message.getWrapperField(this, proto.lightstep.collector.SpanContext, 2)
  );
};

/** @param {?proto.lightstep.collector.SpanContext|undefined} value */
proto.lightstep.collector.Reference.prototype.setSpanContext = function (value) {
  jspb.Message.setWrapperField(this, 2, value);
};

proto.lightstep.collector.Reference.prototype.clearSpanContext = function () {
  this.setSpanContext(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.Reference.prototype.hasSpanContext = function () {
  return jspb.Message.getField(this, 2) != null;
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.Span = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.lightstep.collector.Span.repeatedFields_, null);
};
goog.inherits(proto.lightstep.collector.Span, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.Span.displayName = 'proto.lightstep.collector.Span';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.lightstep.collector.Span.repeatedFields_ = [3, 6, 7];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.Span.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.Span.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.Span} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.Span.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      spanContext: (f = msg.getSpanContext()) && proto.lightstep.collector.SpanContext.toObject(includeInstance, f),
      operationName: jspb.Message.getFieldWithDefault(msg, 2, ""),
      referencesList: jspb.Message.toObjectList(msg.getReferencesList(), proto.lightstep.collector.Reference.toObject, includeInstance),
      startTimestamp: (f = msg.getStartTimestamp()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
      durationMicros: jspb.Message.getFieldWithDefault(msg, 5, "0"),
      tagsList: jspb.Message.toObjectList(msg.getTagsList(), proto.lightstep.collector.KeyValue.toObject, includeInstance),
      logsList: jspb.Message.toObjectList(msg.getLogsList(), proto.lightstep.collector.Log.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.Span}
 */
proto.lightstep.collector.Span.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.Span();
  return proto.lightstep.collector.Span.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.Span} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.Span}
 */
proto.lightstep.collector.Span.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.lightstep.collector.SpanContext();
        reader.readMessage(value, proto.lightstep.collector.SpanContext.deserializeBinaryFromReader);
        msg.setSpanContext(value);
        break;
      case 2:
        var value = /** @type {string} */reader.readString();
        msg.setOperationName(value);
        break;
      case 3:
        var value = new proto.lightstep.collector.Reference();
        reader.readMessage(value, proto.lightstep.collector.Reference.deserializeBinaryFromReader);
        msg.addReferences(value);
        break;
      case 4:
        var value = new google_protobuf_timestamp_pb.Timestamp();
        reader.readMessage(value, google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
        msg.setStartTimestamp(value);
        break;
      case 5:
        var value = /** @type {string} */reader.readUint64String();
        msg.setDurationMicros(value);
        break;
      case 6:
        var value = new proto.lightstep.collector.KeyValue();
        reader.readMessage(value, proto.lightstep.collector.KeyValue.deserializeBinaryFromReader);
        msg.addTags(value);
        break;
      case 7:
        var value = new proto.lightstep.collector.Log();
        reader.readMessage(value, proto.lightstep.collector.Log.deserializeBinaryFromReader);
        msg.addLogs(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.Span.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.Span.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.Span} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.Span.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getSpanContext();
  if (f != null) {
    writer.writeMessage(1, f, proto.lightstep.collector.SpanContext.serializeBinaryToWriter);
  }
  f = message.getOperationName();
  if (f.length > 0) {
    writer.writeString(2, f);
  }
  f = message.getReferencesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(3, f, proto.lightstep.collector.Reference.serializeBinaryToWriter);
  }
  f = message.getStartTimestamp();
  if (f != null) {
    writer.writeMessage(4, f, google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter);
  }
  f = message.getDurationMicros();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(5, f);
  }
  f = message.getTagsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(6, f, proto.lightstep.collector.KeyValue.serializeBinaryToWriter);
  }
  f = message.getLogsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(7, f, proto.lightstep.collector.Log.serializeBinaryToWriter);
  }
};

/**
 * optional SpanContext span_context = 1;
 * @return {?proto.lightstep.collector.SpanContext}
 */
proto.lightstep.collector.Span.prototype.getSpanContext = function () {
  return (/** @type{?proto.lightstep.collector.SpanContext} */jspb.Message.getWrapperField(this, proto.lightstep.collector.SpanContext, 1)
  );
};

/** @param {?proto.lightstep.collector.SpanContext|undefined} value */
proto.lightstep.collector.Span.prototype.setSpanContext = function (value) {
  jspb.Message.setWrapperField(this, 1, value);
};

proto.lightstep.collector.Span.prototype.clearSpanContext = function () {
  this.setSpanContext(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.Span.prototype.hasSpanContext = function () {
  return jspb.Message.getField(this, 1) != null;
};

/**
 * optional string operation_name = 2;
 * @return {string}
 */
proto.lightstep.collector.Span.prototype.getOperationName = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 2, "")
  );
};

/** @param {string} value */
proto.lightstep.collector.Span.prototype.setOperationName = function (value) {
  jspb.Message.setProto3StringField(this, 2, value);
};

/**
 * repeated Reference references = 3;
 * @return {!Array<!proto.lightstep.collector.Reference>}
 */
proto.lightstep.collector.Span.prototype.getReferencesList = function () {
  return (/** @type{!Array<!proto.lightstep.collector.Reference>} */jspb.Message.getRepeatedWrapperField(this, proto.lightstep.collector.Reference, 3)
  );
};

/** @param {!Array<!proto.lightstep.collector.Reference>} value */
proto.lightstep.collector.Span.prototype.setReferencesList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};

/**
 * @param {!proto.lightstep.collector.Reference=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lightstep.collector.Reference}
 */
proto.lightstep.collector.Span.prototype.addReferences = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.lightstep.collector.Reference, opt_index);
};

proto.lightstep.collector.Span.prototype.clearReferencesList = function () {
  this.setReferencesList([]);
};

/**
 * optional google.protobuf.Timestamp start_timestamp = 4;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.lightstep.collector.Span.prototype.getStartTimestamp = function () {
  return (/** @type{?proto.google.protobuf.Timestamp} */jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 4)
  );
};

/** @param {?proto.google.protobuf.Timestamp|undefined} value */
proto.lightstep.collector.Span.prototype.setStartTimestamp = function (value) {
  jspb.Message.setWrapperField(this, 4, value);
};

proto.lightstep.collector.Span.prototype.clearStartTimestamp = function () {
  this.setStartTimestamp(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.Span.prototype.hasStartTimestamp = function () {
  return jspb.Message.getField(this, 4) != null;
};

/**
 * optional uint64 duration_micros = 5;
 * @return {string}
 */
proto.lightstep.collector.Span.prototype.getDurationMicros = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 5, "0")
  );
};

/** @param {string} value */
proto.lightstep.collector.Span.prototype.setDurationMicros = function (value) {
  jspb.Message.setProto3StringIntField(this, 5, value);
};

/**
 * repeated KeyValue tags = 6;
 * @return {!Array<!proto.lightstep.collector.KeyValue>}
 */
proto.lightstep.collector.Span.prototype.getTagsList = function () {
  return (/** @type{!Array<!proto.lightstep.collector.KeyValue>} */jspb.Message.getRepeatedWrapperField(this, proto.lightstep.collector.KeyValue, 6)
  );
};

/** @param {!Array<!proto.lightstep.collector.KeyValue>} value */
proto.lightstep.collector.Span.prototype.setTagsList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 6, value);
};

/**
 * @param {!proto.lightstep.collector.KeyValue=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lightstep.collector.KeyValue}
 */
proto.lightstep.collector.Span.prototype.addTags = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.lightstep.collector.KeyValue, opt_index);
};

proto.lightstep.collector.Span.prototype.clearTagsList = function () {
  this.setTagsList([]);
};

/**
 * repeated Log logs = 7;
 * @return {!Array<!proto.lightstep.collector.Log>}
 */
proto.lightstep.collector.Span.prototype.getLogsList = function () {
  return (/** @type{!Array<!proto.lightstep.collector.Log>} */jspb.Message.getRepeatedWrapperField(this, proto.lightstep.collector.Log, 7)
  );
};

/** @param {!Array<!proto.lightstep.collector.Log>} value */
proto.lightstep.collector.Span.prototype.setLogsList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 7, value);
};

/**
 * @param {!proto.lightstep.collector.Log=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lightstep.collector.Log}
 */
proto.lightstep.collector.Span.prototype.addLogs = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.lightstep.collector.Log, opt_index);
};

proto.lightstep.collector.Span.prototype.clearLogsList = function () {
  this.setLogsList([]);
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.Reporter = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.lightstep.collector.Reporter.repeatedFields_, null);
};
goog.inherits(proto.lightstep.collector.Reporter, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.Reporter.displayName = 'proto.lightstep.collector.Reporter';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.lightstep.collector.Reporter.repeatedFields_ = [4];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.Reporter.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.Reporter.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.Reporter} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.Reporter.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      reporterId: jspb.Message.getFieldWithDefault(msg, 1, "0"),
      tagsList: jspb.Message.toObjectList(msg.getTagsList(), proto.lightstep.collector.KeyValue.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.Reporter}
 */
proto.lightstep.collector.Reporter.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.Reporter();
  return proto.lightstep.collector.Reporter.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.Reporter} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.Reporter}
 */
proto.lightstep.collector.Reporter.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */reader.readUint64String();
        msg.setReporterId(value);
        break;
      case 4:
        var value = new proto.lightstep.collector.KeyValue();
        reader.readMessage(value, proto.lightstep.collector.KeyValue.deserializeBinaryFromReader);
        msg.addTags(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.Reporter.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.Reporter.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.Reporter} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.Reporter.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getReporterId();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(1, f);
  }
  f = message.getTagsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(4, f, proto.lightstep.collector.KeyValue.serializeBinaryToWriter);
  }
};

/**
 * optional uint64 reporter_id = 1;
 * @return {string}
 */
proto.lightstep.collector.Reporter.prototype.getReporterId = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 1, "0")
  );
};

/** @param {string} value */
proto.lightstep.collector.Reporter.prototype.setReporterId = function (value) {
  jspb.Message.setProto3StringIntField(this, 1, value);
};

/**
 * repeated KeyValue tags = 4;
 * @return {!Array<!proto.lightstep.collector.KeyValue>}
 */
proto.lightstep.collector.Reporter.prototype.getTagsList = function () {
  return (/** @type{!Array<!proto.lightstep.collector.KeyValue>} */jspb.Message.getRepeatedWrapperField(this, proto.lightstep.collector.KeyValue, 4)
  );
};

/** @param {!Array<!proto.lightstep.collector.KeyValue>} value */
proto.lightstep.collector.Reporter.prototype.setTagsList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};

/**
 * @param {!proto.lightstep.collector.KeyValue=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lightstep.collector.KeyValue}
 */
proto.lightstep.collector.Reporter.prototype.addTags = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.lightstep.collector.KeyValue, opt_index);
};

proto.lightstep.collector.Reporter.prototype.clearTagsList = function () {
  this.setTagsList([]);
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.MetricsSample = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.lightstep.collector.MetricsSample.oneofGroups_);
};
goog.inherits(proto.lightstep.collector.MetricsSample, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.MetricsSample.displayName = 'proto.lightstep.collector.MetricsSample';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.lightstep.collector.MetricsSample.oneofGroups_ = [[2, 3]];

/**
 * @enum {number}
 */
proto.lightstep.collector.MetricsSample.ValueCase = {
  VALUE_NOT_SET: 0,
  INT_VALUE: 2,
  DOUBLE_VALUE: 3
};

/**
 * @return {proto.lightstep.collector.MetricsSample.ValueCase}
 */
proto.lightstep.collector.MetricsSample.prototype.getValueCase = function () {
  return (/** @type {proto.lightstep.collector.MetricsSample.ValueCase} */jspb.Message.computeOneofCase(this, proto.lightstep.collector.MetricsSample.oneofGroups_[0])
  );
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.MetricsSample.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.MetricsSample.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.MetricsSample} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.MetricsSample.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      name: jspb.Message.getFieldWithDefault(msg, 1, ""),
      intValue: jspb.Message.getFieldWithDefault(msg, 2, "0"),
      doubleValue: +jspb.Message.getFieldWithDefault(msg, 3, 0.0)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.MetricsSample}
 */
proto.lightstep.collector.MetricsSample.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.MetricsSample();
  return proto.lightstep.collector.MetricsSample.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.MetricsSample} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.MetricsSample}
 */
proto.lightstep.collector.MetricsSample.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */reader.readString();
        msg.setName(value);
        break;
      case 2:
        var value = /** @type {string} */reader.readInt64String();
        msg.setIntValue(value);
        break;
      case 3:
        var value = /** @type {number} */reader.readDouble();
        msg.setDoubleValue(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.MetricsSample.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.MetricsSample.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.MetricsSample} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.MetricsSample.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = /** @type {string} */jspb.Message.getField(message, 2);
  if (f != null) {
    writer.writeInt64String(2, f);
  }
  f = /** @type {number} */jspb.Message.getField(message, 3);
  if (f != null) {
    writer.writeDouble(3, f);
  }
};

/**
 * optional string name = 1;
 * @return {string}
 */
proto.lightstep.collector.MetricsSample.prototype.getName = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 1, "")
  );
};

/** @param {string} value */
proto.lightstep.collector.MetricsSample.prototype.setName = function (value) {
  jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional int64 int_value = 2;
 * @return {string}
 */
proto.lightstep.collector.MetricsSample.prototype.getIntValue = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 2, "0")
  );
};

/** @param {string} value */
proto.lightstep.collector.MetricsSample.prototype.setIntValue = function (value) {
  jspb.Message.setOneofField(this, 2, proto.lightstep.collector.MetricsSample.oneofGroups_[0], value);
};

proto.lightstep.collector.MetricsSample.prototype.clearIntValue = function () {
  jspb.Message.setOneofField(this, 2, proto.lightstep.collector.MetricsSample.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.MetricsSample.prototype.hasIntValue = function () {
  return jspb.Message.getField(this, 2) != null;
};

/**
 * optional double double_value = 3;
 * @return {number}
 */
proto.lightstep.collector.MetricsSample.prototype.getDoubleValue = function () {
  return (/** @type {number} */+jspb.Message.getFieldWithDefault(this, 3, 0.0)
  );
};

/** @param {number} value */
proto.lightstep.collector.MetricsSample.prototype.setDoubleValue = function (value) {
  jspb.Message.setOneofField(this, 3, proto.lightstep.collector.MetricsSample.oneofGroups_[0], value);
};

proto.lightstep.collector.MetricsSample.prototype.clearDoubleValue = function () {
  jspb.Message.setOneofField(this, 3, proto.lightstep.collector.MetricsSample.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.MetricsSample.prototype.hasDoubleValue = function () {
  return jspb.Message.getField(this, 3) != null;
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.InternalMetrics = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.lightstep.collector.InternalMetrics.repeatedFields_, null);
};
goog.inherits(proto.lightstep.collector.InternalMetrics, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.InternalMetrics.displayName = 'proto.lightstep.collector.InternalMetrics';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.lightstep.collector.InternalMetrics.repeatedFields_ = [3, 4, 5];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.InternalMetrics.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.InternalMetrics.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.InternalMetrics} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.InternalMetrics.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      startTimestamp: (f = msg.getStartTimestamp()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
      durationMicros: jspb.Message.getFieldWithDefault(msg, 2, "0"),
      logsList: jspb.Message.toObjectList(msg.getLogsList(), proto.lightstep.collector.Log.toObject, includeInstance),
      countsList: jspb.Message.toObjectList(msg.getCountsList(), proto.lightstep.collector.MetricsSample.toObject, includeInstance),
      gaugesList: jspb.Message.toObjectList(msg.getGaugesList(), proto.lightstep.collector.MetricsSample.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.InternalMetrics}
 */
proto.lightstep.collector.InternalMetrics.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.InternalMetrics();
  return proto.lightstep.collector.InternalMetrics.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.InternalMetrics} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.InternalMetrics}
 */
proto.lightstep.collector.InternalMetrics.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new google_protobuf_timestamp_pb.Timestamp();
        reader.readMessage(value, google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
        msg.setStartTimestamp(value);
        break;
      case 2:
        var value = /** @type {string} */reader.readUint64String();
        msg.setDurationMicros(value);
        break;
      case 3:
        var value = new proto.lightstep.collector.Log();
        reader.readMessage(value, proto.lightstep.collector.Log.deserializeBinaryFromReader);
        msg.addLogs(value);
        break;
      case 4:
        var value = new proto.lightstep.collector.MetricsSample();
        reader.readMessage(value, proto.lightstep.collector.MetricsSample.deserializeBinaryFromReader);
        msg.addCounts(value);
        break;
      case 5:
        var value = new proto.lightstep.collector.MetricsSample();
        reader.readMessage(value, proto.lightstep.collector.MetricsSample.deserializeBinaryFromReader);
        msg.addGauges(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.InternalMetrics.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.InternalMetrics.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.InternalMetrics} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.InternalMetrics.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getStartTimestamp();
  if (f != null) {
    writer.writeMessage(1, f, google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter);
  }
  f = message.getDurationMicros();
  if (parseInt(f, 10) !== 0) {
    writer.writeUint64String(2, f);
  }
  f = message.getLogsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(3, f, proto.lightstep.collector.Log.serializeBinaryToWriter);
  }
  f = message.getCountsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(4, f, proto.lightstep.collector.MetricsSample.serializeBinaryToWriter);
  }
  f = message.getGaugesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(5, f, proto.lightstep.collector.MetricsSample.serializeBinaryToWriter);
  }
};

/**
 * optional google.protobuf.Timestamp start_timestamp = 1;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.lightstep.collector.InternalMetrics.prototype.getStartTimestamp = function () {
  return (/** @type{?proto.google.protobuf.Timestamp} */jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 1)
  );
};

/** @param {?proto.google.protobuf.Timestamp|undefined} value */
proto.lightstep.collector.InternalMetrics.prototype.setStartTimestamp = function (value) {
  jspb.Message.setWrapperField(this, 1, value);
};

proto.lightstep.collector.InternalMetrics.prototype.clearStartTimestamp = function () {
  this.setStartTimestamp(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.InternalMetrics.prototype.hasStartTimestamp = function () {
  return jspb.Message.getField(this, 1) != null;
};

/**
 * optional uint64 duration_micros = 2;
 * @return {string}
 */
proto.lightstep.collector.InternalMetrics.prototype.getDurationMicros = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 2, "0")
  );
};

/** @param {string} value */
proto.lightstep.collector.InternalMetrics.prototype.setDurationMicros = function (value) {
  jspb.Message.setProto3StringIntField(this, 2, value);
};

/**
 * repeated Log logs = 3;
 * @return {!Array<!proto.lightstep.collector.Log>}
 */
proto.lightstep.collector.InternalMetrics.prototype.getLogsList = function () {
  return (/** @type{!Array<!proto.lightstep.collector.Log>} */jspb.Message.getRepeatedWrapperField(this, proto.lightstep.collector.Log, 3)
  );
};

/** @param {!Array<!proto.lightstep.collector.Log>} value */
proto.lightstep.collector.InternalMetrics.prototype.setLogsList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};

/**
 * @param {!proto.lightstep.collector.Log=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lightstep.collector.Log}
 */
proto.lightstep.collector.InternalMetrics.prototype.addLogs = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.lightstep.collector.Log, opt_index);
};

proto.lightstep.collector.InternalMetrics.prototype.clearLogsList = function () {
  this.setLogsList([]);
};

/**
 * repeated MetricsSample counts = 4;
 * @return {!Array<!proto.lightstep.collector.MetricsSample>}
 */
proto.lightstep.collector.InternalMetrics.prototype.getCountsList = function () {
  return (/** @type{!Array<!proto.lightstep.collector.MetricsSample>} */jspb.Message.getRepeatedWrapperField(this, proto.lightstep.collector.MetricsSample, 4)
  );
};

/** @param {!Array<!proto.lightstep.collector.MetricsSample>} value */
proto.lightstep.collector.InternalMetrics.prototype.setCountsList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};

/**
 * @param {!proto.lightstep.collector.MetricsSample=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lightstep.collector.MetricsSample}
 */
proto.lightstep.collector.InternalMetrics.prototype.addCounts = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.lightstep.collector.MetricsSample, opt_index);
};

proto.lightstep.collector.InternalMetrics.prototype.clearCountsList = function () {
  this.setCountsList([]);
};

/**
 * repeated MetricsSample gauges = 5;
 * @return {!Array<!proto.lightstep.collector.MetricsSample>}
 */
proto.lightstep.collector.InternalMetrics.prototype.getGaugesList = function () {
  return (/** @type{!Array<!proto.lightstep.collector.MetricsSample>} */jspb.Message.getRepeatedWrapperField(this, proto.lightstep.collector.MetricsSample, 5)
  );
};

/** @param {!Array<!proto.lightstep.collector.MetricsSample>} value */
proto.lightstep.collector.InternalMetrics.prototype.setGaugesList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 5, value);
};

/**
 * @param {!proto.lightstep.collector.MetricsSample=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lightstep.collector.MetricsSample}
 */
proto.lightstep.collector.InternalMetrics.prototype.addGauges = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.lightstep.collector.MetricsSample, opt_index);
};

proto.lightstep.collector.InternalMetrics.prototype.clearGaugesList = function () {
  this.setGaugesList([]);
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.Auth = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.lightstep.collector.Auth, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.Auth.displayName = 'proto.lightstep.collector.Auth';
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.Auth.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.Auth.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.Auth} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.Auth.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      accessToken: jspb.Message.getFieldWithDefault(msg, 1, "")
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.Auth}
 */
proto.lightstep.collector.Auth.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.Auth();
  return proto.lightstep.collector.Auth.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.Auth} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.Auth}
 */
proto.lightstep.collector.Auth.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */reader.readString();
        msg.setAccessToken(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.Auth.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.Auth.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.Auth} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.Auth.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getAccessToken();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
};

/**
 * optional string access_token = 1;
 * @return {string}
 */
proto.lightstep.collector.Auth.prototype.getAccessToken = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 1, "")
  );
};

/** @param {string} value */
proto.lightstep.collector.Auth.prototype.setAccessToken = function (value) {
  jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.ReportRequest = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.lightstep.collector.ReportRequest.repeatedFields_, null);
};
goog.inherits(proto.lightstep.collector.ReportRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.ReportRequest.displayName = 'proto.lightstep.collector.ReportRequest';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.lightstep.collector.ReportRequest.repeatedFields_ = [3];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.ReportRequest.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.ReportRequest.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.ReportRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.ReportRequest.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      reporter: (f = msg.getReporter()) && proto.lightstep.collector.Reporter.toObject(includeInstance, f),
      auth: (f = msg.getAuth()) && proto.lightstep.collector.Auth.toObject(includeInstance, f),
      spansList: jspb.Message.toObjectList(msg.getSpansList(), proto.lightstep.collector.Span.toObject, includeInstance),
      timestampOffsetMicros: jspb.Message.getFieldWithDefault(msg, 5, "0"),
      internalMetrics: (f = msg.getInternalMetrics()) && proto.lightstep.collector.InternalMetrics.toObject(includeInstance, f)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.ReportRequest}
 */
proto.lightstep.collector.ReportRequest.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.ReportRequest();
  return proto.lightstep.collector.ReportRequest.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.ReportRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.ReportRequest}
 */
proto.lightstep.collector.ReportRequest.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.lightstep.collector.Reporter();
        reader.readMessage(value, proto.lightstep.collector.Reporter.deserializeBinaryFromReader);
        msg.setReporter(value);
        break;
      case 2:
        var value = new proto.lightstep.collector.Auth();
        reader.readMessage(value, proto.lightstep.collector.Auth.deserializeBinaryFromReader);
        msg.setAuth(value);
        break;
      case 3:
        var value = new proto.lightstep.collector.Span();
        reader.readMessage(value, proto.lightstep.collector.Span.deserializeBinaryFromReader);
        msg.addSpans(value);
        break;
      case 5:
        var value = /** @type {string} */reader.readInt64String();
        msg.setTimestampOffsetMicros(value);
        break;
      case 6:
        var value = new proto.lightstep.collector.InternalMetrics();
        reader.readMessage(value, proto.lightstep.collector.InternalMetrics.deserializeBinaryFromReader);
        msg.setInternalMetrics(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.ReportRequest.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.ReportRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.ReportRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.ReportRequest.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getReporter();
  if (f != null) {
    writer.writeMessage(1, f, proto.lightstep.collector.Reporter.serializeBinaryToWriter);
  }
  f = message.getAuth();
  if (f != null) {
    writer.writeMessage(2, f, proto.lightstep.collector.Auth.serializeBinaryToWriter);
  }
  f = message.getSpansList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(3, f, proto.lightstep.collector.Span.serializeBinaryToWriter);
  }
  f = message.getTimestampOffsetMicros();
  if (parseInt(f, 10) !== 0) {
    writer.writeInt64String(5, f);
  }
  f = message.getInternalMetrics();
  if (f != null) {
    writer.writeMessage(6, f, proto.lightstep.collector.InternalMetrics.serializeBinaryToWriter);
  }
};

/**
 * optional Reporter reporter = 1;
 * @return {?proto.lightstep.collector.Reporter}
 */
proto.lightstep.collector.ReportRequest.prototype.getReporter = function () {
  return (/** @type{?proto.lightstep.collector.Reporter} */jspb.Message.getWrapperField(this, proto.lightstep.collector.Reporter, 1)
  );
};

/** @param {?proto.lightstep.collector.Reporter|undefined} value */
proto.lightstep.collector.ReportRequest.prototype.setReporter = function (value) {
  jspb.Message.setWrapperField(this, 1, value);
};

proto.lightstep.collector.ReportRequest.prototype.clearReporter = function () {
  this.setReporter(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.ReportRequest.prototype.hasReporter = function () {
  return jspb.Message.getField(this, 1) != null;
};

/**
 * optional Auth auth = 2;
 * @return {?proto.lightstep.collector.Auth}
 */
proto.lightstep.collector.ReportRequest.prototype.getAuth = function () {
  return (/** @type{?proto.lightstep.collector.Auth} */jspb.Message.getWrapperField(this, proto.lightstep.collector.Auth, 2)
  );
};

/** @param {?proto.lightstep.collector.Auth|undefined} value */
proto.lightstep.collector.ReportRequest.prototype.setAuth = function (value) {
  jspb.Message.setWrapperField(this, 2, value);
};

proto.lightstep.collector.ReportRequest.prototype.clearAuth = function () {
  this.setAuth(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.ReportRequest.prototype.hasAuth = function () {
  return jspb.Message.getField(this, 2) != null;
};

/**
 * repeated Span spans = 3;
 * @return {!Array<!proto.lightstep.collector.Span>}
 */
proto.lightstep.collector.ReportRequest.prototype.getSpansList = function () {
  return (/** @type{!Array<!proto.lightstep.collector.Span>} */jspb.Message.getRepeatedWrapperField(this, proto.lightstep.collector.Span, 3)
  );
};

/** @param {!Array<!proto.lightstep.collector.Span>} value */
proto.lightstep.collector.ReportRequest.prototype.setSpansList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};

/**
 * @param {!proto.lightstep.collector.Span=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lightstep.collector.Span}
 */
proto.lightstep.collector.ReportRequest.prototype.addSpans = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.lightstep.collector.Span, opt_index);
};

proto.lightstep.collector.ReportRequest.prototype.clearSpansList = function () {
  this.setSpansList([]);
};

/**
 * optional int64 timestamp_offset_micros = 5;
 * @return {string}
 */
proto.lightstep.collector.ReportRequest.prototype.getTimestampOffsetMicros = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 5, "0")
  );
};

/** @param {string} value */
proto.lightstep.collector.ReportRequest.prototype.setTimestampOffsetMicros = function (value) {
  jspb.Message.setProto3StringIntField(this, 5, value);
};

/**
 * optional InternalMetrics internal_metrics = 6;
 * @return {?proto.lightstep.collector.InternalMetrics}
 */
proto.lightstep.collector.ReportRequest.prototype.getInternalMetrics = function () {
  return (/** @type{?proto.lightstep.collector.InternalMetrics} */jspb.Message.getWrapperField(this, proto.lightstep.collector.InternalMetrics, 6)
  );
};

/** @param {?proto.lightstep.collector.InternalMetrics|undefined} value */
proto.lightstep.collector.ReportRequest.prototype.setInternalMetrics = function (value) {
  jspb.Message.setWrapperField(this, 6, value);
};

proto.lightstep.collector.ReportRequest.prototype.clearInternalMetrics = function () {
  this.setInternalMetrics(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.ReportRequest.prototype.hasInternalMetrics = function () {
  return jspb.Message.getField(this, 6) != null;
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.Command = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.lightstep.collector.Command, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.Command.displayName = 'proto.lightstep.collector.Command';
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.Command.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.Command.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.Command} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.Command.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      disable: jspb.Message.getFieldWithDefault(msg, 1, false),
      devMode: jspb.Message.getFieldWithDefault(msg, 2, false)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.Command}
 */
proto.lightstep.collector.Command.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.Command();
  return proto.lightstep.collector.Command.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.Command} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.Command}
 */
proto.lightstep.collector.Command.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {boolean} */reader.readBool();
        msg.setDisable(value);
        break;
      case 2:
        var value = /** @type {boolean} */reader.readBool();
        msg.setDevMode(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.Command.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.Command.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.Command} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.Command.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getDisable();
  if (f) {
    writer.writeBool(1, f);
  }
  f = message.getDevMode();
  if (f) {
    writer.writeBool(2, f);
  }
};

/**
 * optional bool disable = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.lightstep.collector.Command.prototype.getDisable = function () {
  return (/** @type {boolean} */jspb.Message.getFieldWithDefault(this, 1, false)
  );
};

/** @param {boolean} value */
proto.lightstep.collector.Command.prototype.setDisable = function (value) {
  jspb.Message.setProto3BooleanField(this, 1, value);
};

/**
 * optional bool dev_mode = 2;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.lightstep.collector.Command.prototype.getDevMode = function () {
  return (/** @type {boolean} */jspb.Message.getFieldWithDefault(this, 2, false)
  );
};

/** @param {boolean} value */
proto.lightstep.collector.Command.prototype.setDevMode = function (value) {
  jspb.Message.setProto3BooleanField(this, 2, value);
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.lightstep.collector.ReportResponse = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.lightstep.collector.ReportResponse.repeatedFields_, null);
};
goog.inherits(proto.lightstep.collector.ReportResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.lightstep.collector.ReportResponse.displayName = 'proto.lightstep.collector.ReportResponse';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.lightstep.collector.ReportResponse.repeatedFields_ = [1, 4, 5, 6];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.lightstep.collector.ReportResponse.prototype.toObject = function (opt_includeInstance) {
    return proto.lightstep.collector.ReportResponse.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.lightstep.collector.ReportResponse} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.lightstep.collector.ReportResponse.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      commandsList: jspb.Message.toObjectList(msg.getCommandsList(), proto.lightstep.collector.Command.toObject, includeInstance),
      receiveTimestamp: (f = msg.getReceiveTimestamp()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
      transmitTimestamp: (f = msg.getTransmitTimestamp()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
      errorsList: jspb.Message.getRepeatedField(msg, 4),
      warningsList: jspb.Message.getRepeatedField(msg, 5),
      infosList: jspb.Message.getRepeatedField(msg, 6)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.lightstep.collector.ReportResponse}
 */
proto.lightstep.collector.ReportResponse.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.lightstep.collector.ReportResponse();
  return proto.lightstep.collector.ReportResponse.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.lightstep.collector.ReportResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.lightstep.collector.ReportResponse}
 */
proto.lightstep.collector.ReportResponse.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.lightstep.collector.Command();
        reader.readMessage(value, proto.lightstep.collector.Command.deserializeBinaryFromReader);
        msg.addCommands(value);
        break;
      case 2:
        var value = new google_protobuf_timestamp_pb.Timestamp();
        reader.readMessage(value, google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
        msg.setReceiveTimestamp(value);
        break;
      case 3:
        var value = new google_protobuf_timestamp_pb.Timestamp();
        reader.readMessage(value, google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
        msg.setTransmitTimestamp(value);
        break;
      case 4:
        var value = /** @type {string} */reader.readString();
        msg.addErrors(value);
        break;
      case 5:
        var value = /** @type {string} */reader.readString();
        msg.addWarnings(value);
        break;
      case 6:
        var value = /** @type {string} */reader.readString();
        msg.addInfos(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.lightstep.collector.ReportResponse.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.lightstep.collector.ReportResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.lightstep.collector.ReportResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.lightstep.collector.ReportResponse.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getCommandsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(1, f, proto.lightstep.collector.Command.serializeBinaryToWriter);
  }
  f = message.getReceiveTimestamp();
  if (f != null) {
    writer.writeMessage(2, f, google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter);
  }
  f = message.getTransmitTimestamp();
  if (f != null) {
    writer.writeMessage(3, f, google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter);
  }
  f = message.getErrorsList();
  if (f.length > 0) {
    writer.writeRepeatedString(4, f);
  }
  f = message.getWarningsList();
  if (f.length > 0) {
    writer.writeRepeatedString(5, f);
  }
  f = message.getInfosList();
  if (f.length > 0) {
    writer.writeRepeatedString(6, f);
  }
};

/**
 * repeated Command commands = 1;
 * @return {!Array<!proto.lightstep.collector.Command>}
 */
proto.lightstep.collector.ReportResponse.prototype.getCommandsList = function () {
  return (/** @type{!Array<!proto.lightstep.collector.Command>} */jspb.Message.getRepeatedWrapperField(this, proto.lightstep.collector.Command, 1)
  );
};

/** @param {!Array<!proto.lightstep.collector.Command>} value */
proto.lightstep.collector.ReportResponse.prototype.setCommandsList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};

/**
 * @param {!proto.lightstep.collector.Command=} opt_value
 * @param {number=} opt_index
 * @return {!proto.lightstep.collector.Command}
 */
proto.lightstep.collector.ReportResponse.prototype.addCommands = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.lightstep.collector.Command, opt_index);
};

proto.lightstep.collector.ReportResponse.prototype.clearCommandsList = function () {
  this.setCommandsList([]);
};

/**
 * optional google.protobuf.Timestamp receive_timestamp = 2;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.lightstep.collector.ReportResponse.prototype.getReceiveTimestamp = function () {
  return (/** @type{?proto.google.protobuf.Timestamp} */jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 2)
  );
};

/** @param {?proto.google.protobuf.Timestamp|undefined} value */
proto.lightstep.collector.ReportResponse.prototype.setReceiveTimestamp = function (value) {
  jspb.Message.setWrapperField(this, 2, value);
};

proto.lightstep.collector.ReportResponse.prototype.clearReceiveTimestamp = function () {
  this.setReceiveTimestamp(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.ReportResponse.prototype.hasReceiveTimestamp = function () {
  return jspb.Message.getField(this, 2) != null;
};

/**
 * optional google.protobuf.Timestamp transmit_timestamp = 3;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.lightstep.collector.ReportResponse.prototype.getTransmitTimestamp = function () {
  return (/** @type{?proto.google.protobuf.Timestamp} */jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3)
  );
};

/** @param {?proto.google.protobuf.Timestamp|undefined} value */
proto.lightstep.collector.ReportResponse.prototype.setTransmitTimestamp = function (value) {
  jspb.Message.setWrapperField(this, 3, value);
};

proto.lightstep.collector.ReportResponse.prototype.clearTransmitTimestamp = function () {
  this.setTransmitTimestamp(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.lightstep.collector.ReportResponse.prototype.hasTransmitTimestamp = function () {
  return jspb.Message.getField(this, 3) != null;
};

/**
 * repeated string errors = 4;
 * @return {!Array<string>}
 */
proto.lightstep.collector.ReportResponse.prototype.getErrorsList = function () {
  return (/** @type {!Array<string>} */jspb.Message.getRepeatedField(this, 4)
  );
};

/** @param {!Array<string>} value */
proto.lightstep.collector.ReportResponse.prototype.setErrorsList = function (value) {
  jspb.Message.setField(this, 4, value || []);
};

/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.lightstep.collector.ReportResponse.prototype.addErrors = function (value, opt_index) {
  jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};

proto.lightstep.collector.ReportResponse.prototype.clearErrorsList = function () {
  this.setErrorsList([]);
};

/**
 * repeated string warnings = 5;
 * @return {!Array<string>}
 */
proto.lightstep.collector.ReportResponse.prototype.getWarningsList = function () {
  return (/** @type {!Array<string>} */jspb.Message.getRepeatedField(this, 5)
  );
};

/** @param {!Array<string>} value */
proto.lightstep.collector.ReportResponse.prototype.setWarningsList = function (value) {
  jspb.Message.setField(this, 5, value || []);
};

/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.lightstep.collector.ReportResponse.prototype.addWarnings = function (value, opt_index) {
  jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};

proto.lightstep.collector.ReportResponse.prototype.clearWarningsList = function () {
  this.setWarningsList([]);
};

/**
 * repeated string infos = 6;
 * @return {!Array<string>}
 */
proto.lightstep.collector.ReportResponse.prototype.getInfosList = function () {
  return (/** @type {!Array<string>} */jspb.Message.getRepeatedField(this, 6)
  );
};

/** @param {!Array<string>} value */
proto.lightstep.collector.ReportResponse.prototype.setInfosList = function (value) {
  jspb.Message.setField(this, 6, value || []);
};

/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.lightstep.collector.ReportResponse.prototype.addInfos = function (value, opt_index) {
  jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};

proto.lightstep.collector.ReportResponse.prototype.clearInfosList = function () {
  this.setInfosList([]);
};

goog.object.extend(exports, proto.lightstep.collector);

/***/ }),

/***/ "./src/imp/generated_proto/google/api/annotations_pb.js":
/*!**************************************************************!*\
  !*** ./src/imp/generated_proto/google/api/annotations_pb.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(/*! google-protobuf */ "./node_modules/google-protobuf/google-protobuf.js");
var goog = jspb;
var global = Function('return this')();

var google_api_http_pb = __webpack_require__(/*! ../../google/api/http_pb.js */ "./src/imp/generated_proto/google/api/http_pb.js");
var google_protobuf_descriptor_pb = __webpack_require__(/*! google-protobuf/google/protobuf/descriptor_pb.js */ "./node_modules/google-protobuf/google/protobuf/descriptor_pb.js");
goog.exportSymbol('proto.google.api.http', null, global);

/**
 * A tuple of {field number, class constructor} for the extension
 * field named `http`.
 * @type {!jspb.ExtensionFieldInfo<!proto.google.api.HttpRule>}
 */
proto.google.api.http = new jspb.ExtensionFieldInfo(72295728, { http: 0 }, google_api_http_pb.HttpRule,
/** @type {?function((boolean|undefined),!jspb.Message=): !Object} */google_api_http_pb.HttpRule.toObject, 0);

google_protobuf_descriptor_pb.MethodOptions.extensionsBinary[72295728] = new jspb.ExtensionFieldBinaryInfo(proto.google.api.http, jspb.BinaryReader.prototype.readMessage, jspb.BinaryWriter.prototype.writeMessage, google_api_http_pb.HttpRule.serializeBinaryToWriter, google_api_http_pb.HttpRule.deserializeBinaryFromReader, false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.MethodOptions.extensions[72295728] = proto.google.api.http;

goog.object.extend(exports, proto.google.api);

/***/ }),

/***/ "./src/imp/generated_proto/google/api/http_pb.js":
/*!*******************************************************!*\
  !*** ./src/imp/generated_proto/google/api/http_pb.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(/*! google-protobuf */ "./node_modules/google-protobuf/google-protobuf.js");
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.google.api.CustomHttpPattern', null, global);
goog.exportSymbol('proto.google.api.Http', null, global);
goog.exportSymbol('proto.google.api.HttpRule', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.api.Http = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.api.Http.repeatedFields_, null);
};
goog.inherits(proto.google.api.Http, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.api.Http.displayName = 'proto.google.api.Http';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.api.Http.repeatedFields_ = [1];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.google.api.Http.prototype.toObject = function (opt_includeInstance) {
    return proto.google.api.Http.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.google.api.Http} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.google.api.Http.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      rulesList: jspb.Message.toObjectList(msg.getRulesList(), proto.google.api.HttpRule.toObject, includeInstance),
      fullyDecodeReservedExpansion: jspb.Message.getFieldWithDefault(msg, 2, false)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.api.Http}
 */
proto.google.api.Http.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.api.Http();
  return proto.google.api.Http.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.api.Http} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.api.Http}
 */
proto.google.api.Http.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.google.api.HttpRule();
        reader.readMessage(value, proto.google.api.HttpRule.deserializeBinaryFromReader);
        msg.addRules(value);
        break;
      case 2:
        var value = /** @type {boolean} */reader.readBool();
        msg.setFullyDecodeReservedExpansion(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.api.Http.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.google.api.Http.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.api.Http} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.Http.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getRulesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(1, f, proto.google.api.HttpRule.serializeBinaryToWriter);
  }
  f = message.getFullyDecodeReservedExpansion();
  if (f) {
    writer.writeBool(2, f);
  }
};

/**
 * repeated HttpRule rules = 1;
 * @return {!Array<!proto.google.api.HttpRule>}
 */
proto.google.api.Http.prototype.getRulesList = function () {
  return (/** @type{!Array<!proto.google.api.HttpRule>} */jspb.Message.getRepeatedWrapperField(this, proto.google.api.HttpRule, 1)
  );
};

/** @param {!Array<!proto.google.api.HttpRule>} value */
proto.google.api.Http.prototype.setRulesList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};

/**
 * @param {!proto.google.api.HttpRule=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.api.HttpRule}
 */
proto.google.api.Http.prototype.addRules = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.google.api.HttpRule, opt_index);
};

proto.google.api.Http.prototype.clearRulesList = function () {
  this.setRulesList([]);
};

/**
 * optional bool fully_decode_reserved_expansion = 2;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.google.api.Http.prototype.getFullyDecodeReservedExpansion = function () {
  return (/** @type {boolean} */jspb.Message.getFieldWithDefault(this, 2, false)
  );
};

/** @param {boolean} value */
proto.google.api.Http.prototype.setFullyDecodeReservedExpansion = function (value) {
  jspb.Message.setProto3BooleanField(this, 2, value);
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.api.HttpRule = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.google.api.HttpRule.repeatedFields_, proto.google.api.HttpRule.oneofGroups_);
};
goog.inherits(proto.google.api.HttpRule, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.api.HttpRule.displayName = 'proto.google.api.HttpRule';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.google.api.HttpRule.repeatedFields_ = [11];

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.google.api.HttpRule.oneofGroups_ = [[2, 3, 4, 5, 6, 8]];

/**
 * @enum {number}
 */
proto.google.api.HttpRule.PatternCase = {
  PATTERN_NOT_SET: 0,
  GET: 2,
  PUT: 3,
  POST: 4,
  DELETE: 5,
  PATCH: 6,
  CUSTOM: 8
};

/**
 * @return {proto.google.api.HttpRule.PatternCase}
 */
proto.google.api.HttpRule.prototype.getPatternCase = function () {
  return (/** @type {proto.google.api.HttpRule.PatternCase} */jspb.Message.computeOneofCase(this, proto.google.api.HttpRule.oneofGroups_[0])
  );
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.google.api.HttpRule.prototype.toObject = function (opt_includeInstance) {
    return proto.google.api.HttpRule.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.google.api.HttpRule} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.google.api.HttpRule.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      selector: jspb.Message.getFieldWithDefault(msg, 1, ""),
      get: jspb.Message.getFieldWithDefault(msg, 2, ""),
      put: jspb.Message.getFieldWithDefault(msg, 3, ""),
      post: jspb.Message.getFieldWithDefault(msg, 4, ""),
      pb_delete: jspb.Message.getFieldWithDefault(msg, 5, ""),
      patch: jspb.Message.getFieldWithDefault(msg, 6, ""),
      custom: (f = msg.getCustom()) && proto.google.api.CustomHttpPattern.toObject(includeInstance, f),
      body: jspb.Message.getFieldWithDefault(msg, 7, ""),
      responseBody: jspb.Message.getFieldWithDefault(msg, 12, ""),
      additionalBindingsList: jspb.Message.toObjectList(msg.getAdditionalBindingsList(), proto.google.api.HttpRule.toObject, includeInstance)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.api.HttpRule}
 */
proto.google.api.HttpRule.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.api.HttpRule();
  return proto.google.api.HttpRule.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.api.HttpRule} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.api.HttpRule}
 */
proto.google.api.HttpRule.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */reader.readString();
        msg.setSelector(value);
        break;
      case 2:
        var value = /** @type {string} */reader.readString();
        msg.setGet(value);
        break;
      case 3:
        var value = /** @type {string} */reader.readString();
        msg.setPut(value);
        break;
      case 4:
        var value = /** @type {string} */reader.readString();
        msg.setPost(value);
        break;
      case 5:
        var value = /** @type {string} */reader.readString();
        msg.setDelete(value);
        break;
      case 6:
        var value = /** @type {string} */reader.readString();
        msg.setPatch(value);
        break;
      case 8:
        var value = new proto.google.api.CustomHttpPattern();
        reader.readMessage(value, proto.google.api.CustomHttpPattern.deserializeBinaryFromReader);
        msg.setCustom(value);
        break;
      case 7:
        var value = /** @type {string} */reader.readString();
        msg.setBody(value);
        break;
      case 12:
        var value = /** @type {string} */reader.readString();
        msg.setResponseBody(value);
        break;
      case 11:
        var value = new proto.google.api.HttpRule();
        reader.readMessage(value, proto.google.api.HttpRule.deserializeBinaryFromReader);
        msg.addAdditionalBindings(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.api.HttpRule.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.google.api.HttpRule.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.api.HttpRule} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.HttpRule.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getSelector();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = /** @type {string} */jspb.Message.getField(message, 2);
  if (f != null) {
    writer.writeString(2, f);
  }
  f = /** @type {string} */jspb.Message.getField(message, 3);
  if (f != null) {
    writer.writeString(3, f);
  }
  f = /** @type {string} */jspb.Message.getField(message, 4);
  if (f != null) {
    writer.writeString(4, f);
  }
  f = /** @type {string} */jspb.Message.getField(message, 5);
  if (f != null) {
    writer.writeString(5, f);
  }
  f = /** @type {string} */jspb.Message.getField(message, 6);
  if (f != null) {
    writer.writeString(6, f);
  }
  f = message.getCustom();
  if (f != null) {
    writer.writeMessage(8, f, proto.google.api.CustomHttpPattern.serializeBinaryToWriter);
  }
  f = message.getBody();
  if (f.length > 0) {
    writer.writeString(7, f);
  }
  f = message.getResponseBody();
  if (f.length > 0) {
    writer.writeString(12, f);
  }
  f = message.getAdditionalBindingsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(11, f, proto.google.api.HttpRule.serializeBinaryToWriter);
  }
};

/**
 * optional string selector = 1;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getSelector = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 1, "")
  );
};

/** @param {string} value */
proto.google.api.HttpRule.prototype.setSelector = function (value) {
  jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string get = 2;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getGet = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 2, "")
  );
};

/** @param {string} value */
proto.google.api.HttpRule.prototype.setGet = function (value) {
  jspb.Message.setOneofField(this, 2, proto.google.api.HttpRule.oneofGroups_[0], value);
};

proto.google.api.HttpRule.prototype.clearGet = function () {
  jspb.Message.setOneofField(this, 2, proto.google.api.HttpRule.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.api.HttpRule.prototype.hasGet = function () {
  return jspb.Message.getField(this, 2) != null;
};

/**
 * optional string put = 3;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getPut = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 3, "")
  );
};

/** @param {string} value */
proto.google.api.HttpRule.prototype.setPut = function (value) {
  jspb.Message.setOneofField(this, 3, proto.google.api.HttpRule.oneofGroups_[0], value);
};

proto.google.api.HttpRule.prototype.clearPut = function () {
  jspb.Message.setOneofField(this, 3, proto.google.api.HttpRule.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.api.HttpRule.prototype.hasPut = function () {
  return jspb.Message.getField(this, 3) != null;
};

/**
 * optional string post = 4;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getPost = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 4, "")
  );
};

/** @param {string} value */
proto.google.api.HttpRule.prototype.setPost = function (value) {
  jspb.Message.setOneofField(this, 4, proto.google.api.HttpRule.oneofGroups_[0], value);
};

proto.google.api.HttpRule.prototype.clearPost = function () {
  jspb.Message.setOneofField(this, 4, proto.google.api.HttpRule.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.api.HttpRule.prototype.hasPost = function () {
  return jspb.Message.getField(this, 4) != null;
};

/**
 * optional string delete = 5;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getDelete = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 5, "")
  );
};

/** @param {string} value */
proto.google.api.HttpRule.prototype.setDelete = function (value) {
  jspb.Message.setOneofField(this, 5, proto.google.api.HttpRule.oneofGroups_[0], value);
};

proto.google.api.HttpRule.prototype.clearDelete = function () {
  jspb.Message.setOneofField(this, 5, proto.google.api.HttpRule.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.api.HttpRule.prototype.hasDelete = function () {
  return jspb.Message.getField(this, 5) != null;
};

/**
 * optional string patch = 6;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getPatch = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 6, "")
  );
};

/** @param {string} value */
proto.google.api.HttpRule.prototype.setPatch = function (value) {
  jspb.Message.setOneofField(this, 6, proto.google.api.HttpRule.oneofGroups_[0], value);
};

proto.google.api.HttpRule.prototype.clearPatch = function () {
  jspb.Message.setOneofField(this, 6, proto.google.api.HttpRule.oneofGroups_[0], undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.api.HttpRule.prototype.hasPatch = function () {
  return jspb.Message.getField(this, 6) != null;
};

/**
 * optional CustomHttpPattern custom = 8;
 * @return {?proto.google.api.CustomHttpPattern}
 */
proto.google.api.HttpRule.prototype.getCustom = function () {
  return (/** @type{?proto.google.api.CustomHttpPattern} */jspb.Message.getWrapperField(this, proto.google.api.CustomHttpPattern, 8)
  );
};

/** @param {?proto.google.api.CustomHttpPattern|undefined} value */
proto.google.api.HttpRule.prototype.setCustom = function (value) {
  jspb.Message.setOneofWrapperField(this, 8, proto.google.api.HttpRule.oneofGroups_[0], value);
};

proto.google.api.HttpRule.prototype.clearCustom = function () {
  this.setCustom(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.google.api.HttpRule.prototype.hasCustom = function () {
  return jspb.Message.getField(this, 8) != null;
};

/**
 * optional string body = 7;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getBody = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 7, "")
  );
};

/** @param {string} value */
proto.google.api.HttpRule.prototype.setBody = function (value) {
  jspb.Message.setProto3StringField(this, 7, value);
};

/**
 * optional string response_body = 12;
 * @return {string}
 */
proto.google.api.HttpRule.prototype.getResponseBody = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 12, "")
  );
};

/** @param {string} value */
proto.google.api.HttpRule.prototype.setResponseBody = function (value) {
  jspb.Message.setProto3StringField(this, 12, value);
};

/**
 * repeated HttpRule additional_bindings = 11;
 * @return {!Array<!proto.google.api.HttpRule>}
 */
proto.google.api.HttpRule.prototype.getAdditionalBindingsList = function () {
  return (/** @type{!Array<!proto.google.api.HttpRule>} */jspb.Message.getRepeatedWrapperField(this, proto.google.api.HttpRule, 11)
  );
};

/** @param {!Array<!proto.google.api.HttpRule>} value */
proto.google.api.HttpRule.prototype.setAdditionalBindingsList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 11, value);
};

/**
 * @param {!proto.google.api.HttpRule=} opt_value
 * @param {number=} opt_index
 * @return {!proto.google.api.HttpRule}
 */
proto.google.api.HttpRule.prototype.addAdditionalBindings = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 11, opt_value, proto.google.api.HttpRule, opt_index);
};

proto.google.api.HttpRule.prototype.clearAdditionalBindingsList = function () {
  this.setAdditionalBindingsList([]);
};

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.google.api.CustomHttpPattern = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.google.api.CustomHttpPattern, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.google.api.CustomHttpPattern.displayName = 'proto.google.api.CustomHttpPattern';
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.google.api.CustomHttpPattern.prototype.toObject = function (opt_includeInstance) {
    return proto.google.api.CustomHttpPattern.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.google.api.CustomHttpPattern} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.google.api.CustomHttpPattern.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      kind: jspb.Message.getFieldWithDefault(msg, 1, ""),
      path: jspb.Message.getFieldWithDefault(msg, 2, "")
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.google.api.CustomHttpPattern}
 */
proto.google.api.CustomHttpPattern.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.google.api.CustomHttpPattern();
  return proto.google.api.CustomHttpPattern.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.google.api.CustomHttpPattern} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.google.api.CustomHttpPattern}
 */
proto.google.api.CustomHttpPattern.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */reader.readString();
        msg.setKind(value);
        break;
      case 2:
        var value = /** @type {string} */reader.readString();
        msg.setPath(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.google.api.CustomHttpPattern.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.google.api.CustomHttpPattern.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.google.api.CustomHttpPattern} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.google.api.CustomHttpPattern.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getKind();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getPath();
  if (f.length > 0) {
    writer.writeString(2, f);
  }
};

/**
 * optional string kind = 1;
 * @return {string}
 */
proto.google.api.CustomHttpPattern.prototype.getKind = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 1, "")
  );
};

/** @param {string} value */
proto.google.api.CustomHttpPattern.prototype.setKind = function (value) {
  jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string path = 2;
 * @return {string}
 */
proto.google.api.CustomHttpPattern.prototype.getPath = function () {
  return (/** @type {string} */jspb.Message.getFieldWithDefault(this, 2, "")
  );
};

/** @param {string} value */
proto.google.api.CustomHttpPattern.prototype.setPath = function (value) {
  jspb.Message.setProto3StringField(this, 2, value);
};

goog.object.extend(exports, proto.google.api);

/***/ }),

/***/ "./src/imp/globals.js":
/*!****************************!*\
  !*** ./src/imp/globals.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackageGlobals = function () {
    function PackageGlobals() {
        _classCallCheck(this, PackageGlobals);

        this.options = {};
    }

    _createClass(PackageGlobals, [{
        key: 'setOptions',
        value: function setOptions(opts) {
            var _this = this;

            (0, _each3.default)(opts, function (val, key) {
                _this.options[key] = val;
            });
        }
    }]);

    return PackageGlobals;
}();

module.exports = new PackageGlobals();

/***/ }),

/***/ "./src/imp/log_builder.js":
/*!********************************!*\
  !*** ./src/imp/log_builder.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint-disable-next-line camelcase


var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = __webpack_require__(/*! ../constants */ "./src/constants.js");
var coerce = __webpack_require__(/*! ./coerce */ "./src/imp/coerce.js");

// Facade on the thrift log data structure to make constructing log records more
// convenient.

var LogBuilder = function () {
    function LogBuilder(runtime) {
        _classCallCheck(this, LogBuilder);

        this._runtime = runtime;
        this._record = new _platform_abstraction_layer.crouton_thrift.LogRecord({
            timestamp_micros: runtime._platform.nowMicros(),
            runtime_guid: null,
            span_guid: null,
            stable_name: null,
            message: null,
            level: null,
            thread_id: null,
            filename: null,
            line_number: null,
            stack_frames: null,
            payload_json: null,
            error_flag: null
        });
    }

    _createClass(LogBuilder, [{
        key: 'record',
        value: function record() {
            return this._record;
        }
    }, {
        key: 'end',
        value: function end() {
            this._runtime._addLogRecord(this._record);
        }
    }, {
        key: 'timestamp',
        value: function timestamp(micros) {
            this._record.timestamp_micros = coerce.toNumber(micros);
            return this;
        }
    }, {
        key: 'message',
        value: function message(msg) {
            this._record.message = coerce.toString(msg);
            return this;
        }
    }, {
        key: 'level',
        value: function level(num) {
            this._record.level = constants.LOG_LEVEL_TO_STRING[num] || null;
            if (num >= constants.LOG_ERROR) {
                this.error(true);
            }
            return this;
        }
    }, {
        key: 'span',
        value: function span(guid) {
            if (guid !== undefined) {
                this._record.span_guid = coerce.toString(guid);
            }
            return this;
        }
    }, {
        key: 'name',
        value: function name(stableName) {
            this._record.stable_name = coerce.toString(stableName);
            return this;
        }
    }, {
        key: 'error',
        value: function error(flag) {
            this._record.error_flag = coerce.toBoolean(flag);
            return this;
        }
    }, {
        key: 'payload',
        value: function payload(data) {
            if (data !== undefined) {
                this._record.payload_json = this._encodePayload(data);
            }
            return this;
        }
    }, {
        key: '_encodePayload',
        value: function _encodePayload(data) {
            var payloadJSON = null;
            try {
                payloadJSON = JSON.stringify(data);
            } catch (_ignored) {
                // TODO: this should log an internal warning that a payload could
                // not be encoded as JSON.
                return undefined;
            }
            return payloadJSON;
        }
    }]);

    return LogBuilder;
}();

module.exports = LogBuilder;

/***/ }),

/***/ "./src/imp/log_record_imp.js":
/*!***********************************!*\
  !*** ./src/imp/log_record_imp.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint-disable-line camelcase


var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

var _coerce = __webpack_require__(/*! ./coerce */ "./src/imp/coerce.js");

var coerce = _interopRequireWildcard(_coerce);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint-disable-line camelcase
var googleProtobufTimestampPB = __webpack_require__(/*! google-protobuf/google/protobuf/timestamp_pb.js */ "./node_modules/google-protobuf/google/protobuf/timestamp_pb.js");
var proto = __webpack_require__(/*! ./generated_proto/collector_pb.js */ "./src/imp/generated_proto/collector_pb.js");

var LogRecordImp = function () {
    function LogRecordImp(logFieldKeyHardLimit, logFieldValueHardLimit, timestampMicros, fields) {
        _classCallCheck(this, LogRecordImp);

        if (fields instanceof Error) {
            fields = {
                stack: fields.stack,
                message: fields.message
            };
        }

        this._logFieldKeyHardLimit = logFieldKeyHardLimit;
        this._logFieldValueHardLimit = logFieldValueHardLimit;
        this._timestampMicros = timestampMicros;
        this._fields = fields;
        this._keysOverLimit = 0;
        this._valuesOverLimit = 0;
    }

    _createClass(LogRecordImp, [{
        key: '_clearOverLimits',
        value: function _clearOverLimits() {
            this._keysOverLimit = 0;
            this._valuesOverLimit = 0;
        }
    }, {
        key: 'getNumKeysOverLimit',
        value: function getNumKeysOverLimit() {
            return this._keysOverLimit;
        }
    }, {
        key: 'getNumValuesOverLimit',
        value: function getNumValuesOverLimit() {
            return this._valuesOverLimit;
        }
    }, {
        key: 'toThrift',
        value: function toThrift() {
            var _this = this;

            this._clearOverLimits();
            var thriftFields = [];
            (0, _each3.default)(this._fields, function (value, key) {
                if (!key || !value) {
                    return;
                }
                var keyStr = _this.getFieldKey(key);
                var valStr = _this.getFieldValue(value);
                thriftFields.push(new _platform_abstraction_layer.crouton_thrift.KeyValue({
                    Key: keyStr,
                    Value: valStr
                }));
            });

            return new _platform_abstraction_layer.crouton_thrift.LogRecord({
                timestamp_micros: this._timestampMicros,
                fields: thriftFields
            });
        }
    }, {
        key: 'getFieldKey',
        value: function getFieldKey(key) {
            var keyStr = coerce.toString(key);
            if (keyStr.length > this._logFieldKeyHardLimit) {
                this._keysOverLimit += 1;
                keyStr = keyStr.substr(0, this._logFieldKeyHardLimit) + '...';
            }
            return keyStr;
        }
    }, {
        key: 'getFieldValue',
        value: function getFieldValue(value) {
            var valStr = null;
            if (value instanceof Error) {
                try {
                    // https://stackoverflow.com/a/26199752/9778850
                    valStr = JSON.stringify(value, Object.getOwnPropertyNames(value));
                } catch (e) {
                    valStr = 'Could not encode value. Exception: ' + e;
                }
            } else if (value instanceof Object) {
                try {
                    valStr = JSON.stringify(value, null, '  ');
                } catch (e) {
                    valStr = 'Could not encode value. Exception: ' + e;
                }
            } else {
                valStr = coerce.toString(value);
            }
            if (valStr.length > this._logFieldValueHardLimit) {
                this._valuesOverLimit += 1;
                valStr = valStr.substr(0, this._logFieldValueHardLimit) + '...';
            }
            return valStr;
        }
    }, {
        key: 'toProto',
        value: function toProto() {
            var _this2 = this;

            this._clearOverLimits();
            var log = new proto.Log();
            var ts = new googleProtobufTimestampPB.Timestamp();
            var secs = Math.floor(this._timestampMicros / 1000000);
            var nanos = this._timestampMicros % 1000000 * 1000;
            ts.setSeconds(secs);
            ts.setNanos(nanos);
            log.setTimestamp(ts);
            var keyValues = [];
            (0, _each3.default)(this._fields, function (value, key) {
                if (!key || !value) {
                    return;
                }
                var keyStr = _this2.getFieldKey(key);
                var valStr = _this2.getFieldValue(value);

                var keyValue = new proto.KeyValue();
                keyValue.setKey(keyStr);
                keyValue.setStringValue(valStr);
                keyValues.push(keyValue);
            });

            log.setFieldsList(keyValues);

            return log;
        }
    }]);

    return LogRecordImp;
}();

exports.default = LogRecordImp;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/platform/browser/crouton_thrift.js":
/*!****************************************************!*\
  !*** ./src/imp/platform/browser/crouton_thrift.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./generated/thrift_all.js */ "./src/imp/platform/browser/generated/thrift_all.js").crouton_thrift;

/***/ }),

/***/ "./src/imp/platform/browser/generated/thrift_all.js":
/*!**********************************************************!*\
  !*** ./src/imp/platform/browser/generated/thrift_all.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
// GENERATED FILE - DO NOT EDIT DIRECTLY
//
// See scripts/build_browser_thrift_lib.js
//
//
(function () {
  var Thrift = {};
  var crouton_thrift = {};
  //
  // Autogenerated by Thrift Compiler (0.9.2)
  //
  // DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
  //


  if (typeof crouton_thrift === 'undefined') {
    crouton_thrift = {};
  }
  crouton_thrift.KeyValue = function (args) {
    this.Key = null;
    this.Value = null;
    if (args) {
      if (args.Key !== undefined) {
        this.Key = args.Key;
      } else {
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Key is unset!');
      }
      if (args.Value !== undefined) {
        this.Value = args.Value;
      } else {
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Value is unset!');
      }
    }
  };
  crouton_thrift.KeyValue.prototype = {};
  crouton_thrift.KeyValue.prototype.read =  false && false;

  crouton_thrift.KeyValue.prototype.write =  false && false;

  crouton_thrift.NamedCounter = function (args) {
    this.Name = null;
    this.Value = null;
    if (args) {
      if (args.Name !== undefined) {
        this.Name = args.Name;
      } else {
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Name is unset!');
      }
      if (args.Value !== undefined) {
        this.Value = args.Value;
      } else {
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Value is unset!');
      }
    }
  };
  crouton_thrift.NamedCounter.prototype = {};
  crouton_thrift.NamedCounter.prototype.read =  false && false;

  crouton_thrift.NamedCounter.prototype.write =  false && false;

  crouton_thrift.Runtime = function (args) {
    this.guid = null;
    this.start_micros = null;
    this.group_name = null;
    this.attrs = null;
    if (args) {
      if (args.guid !== undefined) {
        this.guid = args.guid;
      }
      if (args.start_micros !== undefined) {
        this.start_micros = args.start_micros;
      }
      if (args.group_name !== undefined) {
        this.group_name = args.group_name;
      }
      if (args.attrs !== undefined) {
        this.attrs = args.attrs;
      }
    }
  };
  crouton_thrift.Runtime.prototype = {};
  crouton_thrift.Runtime.prototype.read =  false && false;

  crouton_thrift.Runtime.prototype.write =  false && false;

  crouton_thrift.LogRecord = function (args) {
    this.timestamp_micros = null;
    this.fields = null;
    this.runtime_guid = null;
    this.span_guid = null;
    this.stable_name = null;
    this.message = null;
    this.level = null;
    this.thread_id = null;
    this.filename = null;
    this.line_number = null;
    this.stack_frames = null;
    this.payload_json = null;
    this.error_flag = null;
    if (args) {
      if (args.timestamp_micros !== undefined) {
        this.timestamp_micros = args.timestamp_micros;
      }
      if (args.fields !== undefined) {
        this.fields = args.fields;
      }
      if (args.runtime_guid !== undefined) {
        this.runtime_guid = args.runtime_guid;
      }
      if (args.span_guid !== undefined) {
        this.span_guid = args.span_guid;
      }
      if (args.stable_name !== undefined) {
        this.stable_name = args.stable_name;
      }
      if (args.message !== undefined) {
        this.message = args.message;
      }
      if (args.level !== undefined) {
        this.level = args.level;
      }
      if (args.thread_id !== undefined) {
        this.thread_id = args.thread_id;
      }
      if (args.filename !== undefined) {
        this.filename = args.filename;
      }
      if (args.line_number !== undefined) {
        this.line_number = args.line_number;
      }
      if (args.stack_frames !== undefined) {
        this.stack_frames = args.stack_frames;
      }
      if (args.payload_json !== undefined) {
        this.payload_json = args.payload_json;
      }
      if (args.error_flag !== undefined) {
        this.error_flag = args.error_flag;
      }
    }
  };
  crouton_thrift.LogRecord.prototype = {};
  crouton_thrift.LogRecord.prototype.read =  false && false;

  crouton_thrift.LogRecord.prototype.write =  false && false;

  crouton_thrift.TraceJoinId = function (args) {
    this.TraceKey = null;
    this.Value = null;
    if (args) {
      if (args.TraceKey !== undefined) {
        this.TraceKey = args.TraceKey;
      } else {
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field TraceKey is unset!');
      }
      if (args.Value !== undefined) {
        this.Value = args.Value;
      } else {
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Value is unset!');
      }
    }
  };
  crouton_thrift.TraceJoinId.prototype = {};
  crouton_thrift.TraceJoinId.prototype.read =  false && false;

  crouton_thrift.TraceJoinId.prototype.write =  false && false;

  crouton_thrift.SpanRecord = function (args) {
    this.span_guid = null;
    this.trace_guid = null;
    this.runtime_guid = null;
    this.span_name = null;
    this.join_ids = null;
    this.oldest_micros = null;
    this.youngest_micros = null;
    this.attributes = null;
    this.error_flag = null;
    this.log_records = null;
    if (args) {
      if (args.span_guid !== undefined) {
        this.span_guid = args.span_guid;
      }
      if (args.trace_guid !== undefined) {
        this.trace_guid = args.trace_guid;
      }
      if (args.runtime_guid !== undefined) {
        this.runtime_guid = args.runtime_guid;
      }
      if (args.span_name !== undefined) {
        this.span_name = args.span_name;
      }
      if (args.join_ids !== undefined) {
        this.join_ids = args.join_ids;
      }
      if (args.oldest_micros !== undefined) {
        this.oldest_micros = args.oldest_micros;
      }
      if (args.youngest_micros !== undefined) {
        this.youngest_micros = args.youngest_micros;
      }
      if (args.attributes !== undefined) {
        this.attributes = args.attributes;
      }
      if (args.error_flag !== undefined) {
        this.error_flag = args.error_flag;
      }
      if (args.log_records !== undefined) {
        this.log_records = args.log_records;
      }
    }
  };
  crouton_thrift.SpanRecord.prototype = {};
  crouton_thrift.SpanRecord.prototype.read =  false && false;

  crouton_thrift.SpanRecord.prototype.write =  false && false;

  crouton_thrift.Auth = function (args) {
    this.access_token = null;
    if (args) {
      if (args.access_token !== undefined) {
        this.access_token = args.access_token;
      }
    }
  };
  crouton_thrift.Auth.prototype = {};
  crouton_thrift.Auth.prototype.read =  false && false;

  crouton_thrift.Auth.prototype.write =  false && false;

  crouton_thrift.Timing = function (args) {
    this.receive_micros = null;
    this.transmit_micros = null;
    if (args) {
      if (args.receive_micros !== undefined) {
        this.receive_micros = args.receive_micros;
      }
      if (args.transmit_micros !== undefined) {
        this.transmit_micros = args.transmit_micros;
      }
    }
  };
  crouton_thrift.Timing.prototype = {};
  crouton_thrift.Timing.prototype.read =  false && false;

  crouton_thrift.Timing.prototype.write =  false && false;

  crouton_thrift.SampleCount = function (args) {
    this.oldest_micros = null;
    this.youngest_micros = null;
    this.count = null;
    if (args) {
      if (args.oldest_micros !== undefined) {
        this.oldest_micros = args.oldest_micros;
      }
      if (args.youngest_micros !== undefined) {
        this.youngest_micros = args.youngest_micros;
      }
      if (args.count !== undefined) {
        this.count = args.count;
      }
    }
  };
  crouton_thrift.SampleCount.prototype = {};
  crouton_thrift.SampleCount.prototype.read =  false && false;

  crouton_thrift.SampleCount.prototype.write =  false && false;

  crouton_thrift.MetricsSample = function (args) {
    this.name = null;
    this.int64_value = null;
    this.double_value = null;
    if (args) {
      if (args.name !== undefined) {
        this.name = args.name;
      } else {
        throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field name is unset!');
      }
      if (args.int64_value !== undefined) {
        this.int64_value = args.int64_value;
      }
      if (args.double_value !== undefined) {
        this.double_value = args.double_value;
      }
    }
  };
  crouton_thrift.MetricsSample.prototype = {};
  crouton_thrift.MetricsSample.prototype.read =  false && false;

  crouton_thrift.MetricsSample.prototype.write =  false && false;

  crouton_thrift.Metrics = function (args) {
    this.counts = null;
    this.gauges = null;
    if (args) {
      if (args.counts !== undefined) {
        this.counts = args.counts;
      }
      if (args.gauges !== undefined) {
        this.gauges = args.gauges;
      }
    }
  };
  crouton_thrift.Metrics.prototype = {};
  crouton_thrift.Metrics.prototype.read =  false && false;

  crouton_thrift.Metrics.prototype.write =  false && false;

  crouton_thrift.ReportRequest = function (args) {
    this.runtime = null;
    this.span_records = null;
    this.log_records = null;
    this.timestamp_offset_micros = null;
    this.oldest_micros = null;
    this.youngest_micros = null;
    this.counters = null;
    this.internal_logs = null;
    this.internal_metrics = null;
    if (args) {
      if (args.runtime !== undefined) {
        this.runtime = args.runtime;
      }
      if (args.span_records !== undefined) {
        this.span_records = args.span_records;
      }
      if (args.log_records !== undefined) {
        this.log_records = args.log_records;
      }
      if (args.timestamp_offset_micros !== undefined) {
        this.timestamp_offset_micros = args.timestamp_offset_micros;
      }
      if (args.oldest_micros !== undefined) {
        this.oldest_micros = args.oldest_micros;
      }
      if (args.youngest_micros !== undefined) {
        this.youngest_micros = args.youngest_micros;
      }
      if (args.counters !== undefined) {
        this.counters = args.counters;
      }
      if (args.internal_logs !== undefined) {
        this.internal_logs = args.internal_logs;
      }
      if (args.internal_metrics !== undefined) {
        this.internal_metrics = args.internal_metrics;
      }
    }
  };
  crouton_thrift.ReportRequest.prototype = {};
  crouton_thrift.ReportRequest.prototype.read =  false && false;

  crouton_thrift.ReportRequest.prototype.write =  false && false;

  crouton_thrift.Command = function (args) {
    this.disable = null;
    if (args) {
      if (args.disable !== undefined) {
        this.disable = args.disable;
      }
    }
  };
  crouton_thrift.Command.prototype = {};
  crouton_thrift.Command.prototype.read =  false && false;

  crouton_thrift.Command.prototype.write =  false && false;

  crouton_thrift.ReportResponse = function (args) {
    this.commands = null;
    this.timing = null;
    if (args) {
      if (args.commands !== undefined) {
        this.commands = args.commands;
      }
      if (args.timing !== undefined) {
        this.timing = args.timing;
      }
    }
  };
  crouton_thrift.ReportResponse.prototype = {};
  crouton_thrift.ReportResponse.prototype.read =  false && false;

  crouton_thrift.ReportResponse.prototype.write =  false && false;

  module.exports.crouton_thrift = crouton_thrift;
  module.exports.Thrift = {};
})();

/***/ }),

/***/ "./src/imp/platform/browser/options_parser.js":
/*!****************************************************!*\
  !*** ./src/imp/platform/browser/options_parser.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(/*! ./util */ "./src/imp/platform/browser/util.js");

/* global WorkerGlobalScope */
// Find the HTML element that included the tracing library (if there is one).
// This relies on the fact that scripts are executed as soon as they are
// included -- thus 'this' script is the last one in the array at the time
// this is run.
var hostScriptElement = function () {
    // check to see if we're in a webworker
    // eslint-disable-next-line no-restricted-globals
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        return null;
    }
    if (!util.isBrowser()) {
        return null;
    }
    var scripts = document.getElementsByTagName('SCRIPT');
    if (!(scripts.length > 0)) {
        return null;
    }
    return scripts[scripts.length - 1];
}();

function urlQueryParameters(defaults) {
    var vars = {};
    var qi = window.location.href.indexOf('?');
    if (qi < 0) {
        return vars;
    }
    var slice = window.location.href.slice(qi + 1);
    if (slice.indexOf('#') >= 0) {
        slice = slice.slice(0, slice.indexOf('#'));
    }
    var hashes = slice.replace(/\+/, '%20').split('&');
    for (var i = 0; i < hashes.length; i++) {
        var hash = hashes[i].split('=');
        vars[decodeURIComponent(hash[0])] = decodeURIComponent(hash[1]);
    }
    return vars;
}

// Parses options out of the host <script> element. Allows for easy configuration
// via the HTML element. Example:
//
// <script src='lightstep.min.js'
//      data-access_token='{my_access_token}'
//      data-component_name='my_component'></script>
//
// Note: relies on the global hostScriptElement variable defined above.
//
function parseScriptElementOptions(opts, browserOpts) {
    if (!hostScriptElement) {
        return;
    }

    var dataset = hostScriptElement.dataset;


    var accessToken = dataset.access_token;
    if (typeof accessToken === 'string' && accessToken.length > 0) {
        opts.access_token = accessToken;
    }

    var componentName = dataset.component_name;
    if (typeof componentName === 'string' && componentName.length > 0) {
        opts.component_name = componentName;
    }

    var collectorHost = dataset.collector_host;
    if (typeof collectorHost === 'string' && collectorHost.length > 0) {
        opts.collector_host = collectorHost;
    }
    var collectorPort = dataset.collector_port;
    if (collectorPort) {
        opts.collector_port = parseInt(collectorPort, 10);
    }
    var collectorPath = dataset.collector_path;
    if (typeof collectorPath === 'string' && collectorPath.length > 0) {
        opts.collector_path = collectorPath;
    }
    var collectorEncryption = dataset.collector_encryption;
    if (collectorEncryption) {
        opts.collector_encryption = collectorEncryption;
    }

    var enable = dataset.enable;

    if (typeof enable === 'string') {
        if (enable === 'true') {
            opts.enable = true;
        } else if (enable === 'false') {
            opts.enable = false;
        }
    }
    var verbosity = dataset.verbosity;

    if (typeof verbosity === 'string') {
        opts.verbosity = parseInt(verbosity, 10);
    }

    var init = dataset.init_global_tracer;
    if (typeof init === 'string') {
        if (init === 'true') {
            browserOpts.init_global_tracer = true;
        } else if (init === 'false') {
            browserOpts.init_global_tracer = false;
        }
    }

    // NOTE: this is a little inelegant as this is hard-coding support for a
    // "plug-in" option.
    if (typeof dataset.xhr_instrumentation === 'string' && dataset.xhr_instrumentation === 'true') {
        opts.xhr_instrumentation = true;
    }

    if (typeof dataset.instrument_page_load === 'string' && dataset.instrument_page_load === 'true') {
        opts.instrument_page_load = true;
    }
}

function parseScriptElementOptionsNoop(opts, browserOpts) {}

// Parses options out of the current URL query string. The query parameters use
// the 'lightstep_' prefix to reduce the chance of collision with
// application-specific query parameters.
//
// This mechanism is particularly useful for debugging purposes as it does not
// require any code or configuration changes.
//
function parseURLQueryOptions(opts) {
    var params = urlQueryParameters();
    if (params.lightstep_verbosity) {
        try {
            opts.verbosity = parseInt(params.lightstep_verbosity, 10);
        } catch (_ignored) {/* Ignored */}
    }
    if (params.lightstep_log_to_console) {
        opts.log_to_console = true;
    }
}

function parseURLQueryOptionsNoop(opts) {
    return {};
}

module.exports = {
    parseScriptElementOptions: util.isBrowser() ? parseScriptElementOptions : parseScriptElementOptionsNoop,
    parseURLQueryOptions: util.isBrowser() ? parseURLQueryOptions : parseURLQueryOptionsNoop
};

/***/ }),

/***/ "./src/imp/platform/browser/platform_browser.js":
/*!******************************************************!*\
  !*** ./src/imp/platform/browser/platform_browser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var optionsParser = __webpack_require__(/*! ./options_parser.js */ "./src/imp/platform/browser/options_parser.js");
var util = __webpack_require__(/*! ./util */ "./src/imp/platform/browser/util.js");

var kRuntimeGUIDCookiePrefix = 'lightstep_guid';
var kSessionIDCookieKey = 'lightstep_session_id';
var kCookieTimeToLiveSeconds = 7 * 24 * 60 * 60;

var nowMicrosImp = function () {
    // Is a hi-res timer available?
    if (window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart) {
        var start = performance.timing.navigationStart;
        return function () {
            return Math.floor((start + performance.now()) * 1000.0);
        };
    }
    // The low-res timer is the best we can do
    return function () {
        return Date.now() * 1000.0;
    };
}();

var PlatformBrowser = function () {
    function PlatformBrowser() {
        _classCallCheck(this, PlatformBrowser);
    }

    _createClass(PlatformBrowser, [{
        key: 'name',
        value: function name() {
            return 'browser';
        }
    }, {
        key: 'nowMicros',
        value: function nowMicros() {
            return nowMicrosImp();
        }

        // Return the GUID to use for the runtime. The intention is to reuse the
        // GUID so that logically a single browser session looks like a single
        // runtime.

    }, {
        key: 'runtimeGUID',
        value: function runtimeGUID(groupName) {
            // Account for the groupName in the same that multiple apps or services
            // are running on the same domain (and should not share the same
            // runtime GUID).
            var cookieKey = encodeURIComponent(kRuntimeGUIDCookiePrefix + '/' + groupName);
            var uuid = util.cookie(cookieKey) || this._generateLongUUID();
            util.cookie(cookieKey, uuid, kCookieTimeToLiveSeconds, '/');

            // Also create a session ID as well to give the server more information
            // to coordinate with.
            var sessionID = util.cookie(kSessionIDCookieKey) || this._generateLongUUID();
            util.cookie(kSessionIDCookieKey, sessionID, kCookieTimeToLiveSeconds, '/');

            return uuid;
        }
    }, {
        key: 'generateUUID',
        value: function generateUUID() {
            return this._generateLongUUID();
        }
    }, {
        key: '_generateLongUUID',
        value: function _generateLongUUID() {
            /* eslint-disable no-bitwise */
            var p0 = ('00000000' + Math.abs(Math.random() * 0xFFFFFFFF | 0).toString(16)).substr(-8);
            var p1 = ('00000000' + Math.abs(Math.random() * 0xFFFFFFFF | 0).toString(16)).substr(-8);
            return '' + p0 + p1;
            /* eslint-enable no-bitwise */
        }
    }, {
        key: 'onBeforeExit',
        value: function onBeforeExit() {
            // This will result in the final report not being made in non-browser
            // environments like React Native. Flush should be called explicitly in
            // those environments
            if (util.isBrowser()) {
                var _window;

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                (_window = window).addEventListener.apply(_window, ['beforeunload'].concat(args));
            }
        }
    }, {
        key: 'plugins',
        value: function plugins(opts) {
            return [__webpack_require__(/*! ../../../plugins/instrument_xhr */ "./src/plugins/instrument_xhr.js"), __webpack_require__(/*! ../../../plugins/instrument_fetch */ "./src/plugins/instrument_fetch.js"), __webpack_require__(/*! ../../../plugins/instrument_document_load */ "./src/plugins/instrument_document_load.js")];
        }
    }, {
        key: 'options',
        value: function options(imp) {
            var tracerOpts = {};
            var browserOpts = {};
            optionsParser.parseScriptElementOptions(tracerOpts, browserOpts);
            optionsParser.parseURLQueryOptions(tracerOpts, browserOpts);
            return tracerOpts;
        }
    }, {
        key: 'tracerTags',
        value: function tracerTags() {
            return {
                'lightstep.tracer_platform': 'browser'
            };
        }

        // There's no way to truly "fatal" on the browser; the best approximation
        // is an Error exception.

    }, {
        key: 'fatal',
        value: function fatal(message) {
            throw new Error(message);
        }
    }, {
        key: 'localStoreGet',
        value: function localStoreGet(key) {
            try {
                if (!window.sessionStorage) {
                    return null;
                }
            } catch (_ignored) {
                // Accessing `sessionStorage` or `localStorage` in an `<iframe>` in Chrome throws when
                // the user setting "block third-party cookies and site data" is turned on.
                //
                // eslint-disable-next-line max-len
                // https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
                return null;
            }
            try {
                return JSON.parse(sessionStorage.getItem('lightstep/' + key));
            } catch (_ignored) {
                return null;
            }
        }
    }, {
        key: 'localStoreSet',
        value: function localStoreSet(key, value) {
            try {
                if (!window.sessionStorage) {
                    return;
                }
            } catch (_ignored) {
                // (See comment above)
                return;
            }
            try {
                sessionStorage.setItem('lightstep/' + key, JSON.stringify(value));
            } catch (_ignored) {/* Ignored */}
        }
    }], [{
        key: 'initLibrary',
        value: function initLibrary(lib) {
            var tracerOpts = {};
            var browserOpts = {};
            optionsParser.parseScriptElementOptions(tracerOpts, browserOpts);

            if (browserOpts.init_global_tracer) {
                PlatformBrowser.initGlobalTracer(lib, tracerOpts);
            }
        }
    }, {
        key: 'initGlobalTracer',
        value: function initGlobalTracer(lib, opts) {
            if (typeof window !== 'object') {
                return;
            }
            if (typeof window.opentracing !== 'object') {
                return;
            }
            opentracing.initGlobalTracer(new lib.Tracer(opts)); // eslint-disable-line no-undef
        }
    }]);

    return PlatformBrowser;
}();

module.exports = PlatformBrowser;

/***/ }),

/***/ "./src/imp/platform/browser/thrift.js":
/*!********************************************!*\
  !*** ./src/imp/platform/browser/thrift.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./generated/thrift_all.js */ "./src/imp/platform/browser/generated/thrift_all.js").Thrift;

/***/ }),

/***/ "./src/imp/platform/browser/transport_httpproto.js":
/*!*********************************************************!*\
  !*** ./src/imp/platform/browser/transport_httpproto.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proto = __webpack_require__(/*! ../../generated_proto/collector_pb.js */ "./src/imp/generated_proto/collector_pb.js");

var TransportBrowser = function () {
    function TransportBrowser() {
        _classCallCheck(this, TransportBrowser);

        this._host = '';
        this._port = 0;
        this._path = '';
        this._encryption = '';
    }

    _createClass(TransportBrowser, [{
        key: 'ensureConnection',
        value: function ensureConnection(opts) {
            this._host = opts.collector_host;
            this._port = opts.collector_port;
            this._path = opts.collector_path;
            this._encryption = opts.collector_encryption;
        }
    }, {
        key: 'report',
        value: function report(detached, auth, _report, done) {
            try {
                if (!detached) {
                    this._reportAJAX(auth, _report, done);
                }
            } catch (e) {
                return done(e, null);
            }
        }
    }, {
        key: '_reportAJAX',
        value: function _reportAJAX(auth, report, done) {
            var reportProto = report.toProto(auth);
            var protocol = this._encryption === 'none' ? 'http' : 'https';
            var url = protocol + '://' + this._host + ':' + this._port + this._path + '/api/v2/reports';
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer';
            xhr.open('POST', url);
            // Note: the browser automatically sets 'Connection' and 'Content-Length'
            // and *does not* allow they to be set manually
            xhr.setRequestHeader('Accept', 'application/octet-stream');
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    var err = null;
                    var resp = null;
                    if (this.status !== 200) {
                        err = new Error('status code = ' + this.status);
                    } else if (!this.response) {
                        err = new Error('unexpected empty response');
                    } else {
                        try {
                            resp = proto.ReportResponse.deserializeBinary(this.response).toObject();
                        } catch (exception) {
                            err = exception;
                        }
                    }
                    return done(err, resp);
                }
            };
            var serialized = reportProto.serializeBinary();
            xhr.send(serialized);
        }
    }]);

    return TransportBrowser;
}();

exports.default = TransportBrowser;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/platform/browser/transport_httpthrift.js":
/*!**********************************************************!*\
  !*** ./src/imp/platform/browser/transport_httpthrift.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransportBrowser = function () {
    function TransportBrowser() {
        _classCallCheck(this, TransportBrowser);

        this._host = '';
        this._port = 0;
        this._path = '';
        this._encryption = '';
    }

    _createClass(TransportBrowser, [{
        key: 'ensureConnection',
        value: function ensureConnection(opts) {
            this._host = opts.collector_host;
            this._port = opts.collector_port;
            this._path = opts.collector_path;
            this._encryption = opts.collector_encryption;
        }
    }, {
        key: 'report',
        value: function report(detached, auth, _report, done) {
            try {
                if (!detached) {
                    this._reportAJAX(auth, _report, done);
                } else {
                    this._reportAsyncScript(auth, _report, done);
                }
            } catch (e) {
                return done(e, null);
            }
        }
    }, {
        key: '_reportAJAX',
        value: function _reportAJAX(auth, report, done) {
            var payload = JSON.stringify(report.toThrift());
            var protocol = this._encryption === 'none' ? 'http' : 'https';
            var url = protocol + '://' + this._host + ':' + this._port + this._path + '/api/v0/reports';
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // Note: the browser automatically sets 'Connection' and 'Content-Length'
            // and *does not* allow they to be set manually
            xhr.setRequestHeader('LightStep-Access-Token', auth.getAccessToken());
            xhr.setRequestHeader('Content-Type', 'application/json');
            //req.setRequestHeader('Content-Encoding', 'gzip');
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    var err = null;
                    var resp = null;
                    if (this.status !== 200) {
                        err = new Error('status code = ' + this.status);
                    } else if (!this.responseText) {
                        err = new Error('unexpected empty response');
                    } else {
                        try {
                            resp = JSON.parse(this.responseText);
                        } catch (exception) {
                            err = exception;
                        }
                    }
                    return done(err, resp);
                }
            };
            xhr.send(payload);
        }

        // Do a "tail flush" using an async browser script load.  This does not get
        // interrupted as a normal Thirft RPC would when navigating away from
        // the page.

    }, {
        key: '_reportAsyncScript',
        value: function _reportAsyncScript(auth, report, done) {
            var authJSON = JSON.stringify(auth.toThrift());
            var reportJSON = JSON.stringify(report.toThrift());
            var protocol = this._encryption === 'none' ? 'http' : 'https';
            var url = protocol + '://' + this._host + ':' + this._port + this._path + '/_rpc/v1/reports/uri_encoded' + ('?auth=' + encodeURIComponent(authJSON)) + ('&report=' + encodeURIComponent(reportJSON));

            var elem = document.createElement('script');
            elem.async = true;
            elem.defer = true;
            elem.src = url;
            elem.type = 'text/javascript';

            var hostElem = document.getElementsByTagName('head')[0];
            if (hostElem) {
                hostElem.appendChild(elem);
            }
            return done(null, null);
        }
    }]);

    return TransportBrowser;
}();

exports.default = TransportBrowser;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/platform/browser/util.js":
/*!******************************************!*\
  !*** ./src/imp/platform/browser/util.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable */

function isBrowser() {
    return typeof document !== "undefined";
}

// This function is copied directly from https://github.com/litejs/browser-cookie-lite.
// It is licensed under the MIT License and authored by Lauri Rooden.
function cookie(name, value, ttl, path, domain, secure) {
    if (arguments.length > 1) {
        var newCookie = name + '=' + encodeURIComponent(value) + (ttl ? "; expires=" + new Date(+new Date() + ttl * 1000).toUTCString() : '') + (path ? "; path=" + path : '') + (domain ? "; domain=" + domain : '') + (secure ? "; secure" : '');
        document.cookie = newCookie;
        return newCookie;
    }
    return decodeURIComponent((("; " + document.cookie).split("; " + name + "=")[1] || "").split(";")[0]);
}

function cookieNoop() {
    return null;
}

/* eslint-enable */

module.exports = {
    cookie: isBrowser() ? cookie : cookieNoop,
    isBrowser: isBrowser
};

/***/ }),

/***/ "./src/imp/propagator.js":
/*!*******************************!*\
  !*** ./src/imp/propagator.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UnsupportedPropagator = function () {
    function UnsupportedPropagator(tracer, name) {
        _classCallCheck(this, UnsupportedPropagator);

        this._tracer = tracer;
        this._name = name;
    }

    _createClass(UnsupportedPropagator, [{
        key: "inject",
        value: function inject(spanContext, carrier) {
            this._tracer._error("Unsupported format: " + this._name);
            return null;
        }
    }, {
        key: "extract",
        value: function extract(carrier) {
            this._tracer._error("Unsupported format: " + this._name);
        }
    }]);

    return UnsupportedPropagator;
}();

exports.default = UnsupportedPropagator;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/propagator_b3.js":
/*!**********************************!*\
  !*** ./src/imp/propagator_b3.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propagator_ls = __webpack_require__(/*! ./propagator_ls */ "./src/imp/propagator_ls.js");

var _propagator_ls2 = _interopRequireDefault(_propagator_ls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CARRIER_B3_TRACER_STATE_PREFIX = 'x-b3-';

var B3Propagator = function (_LightStepPropagator) {
    _inherits(B3Propagator, _LightStepPropagator);

    function B3Propagator(tracer) {
        _classCallCheck(this, B3Propagator);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(B3Propagator).call(this, tracer));

        _this._carrierPrefix = CARRIER_B3_TRACER_STATE_PREFIX;
        return _this;
    }

    _createClass(B3Propagator, [{
        key: 'inject',
        value: function inject(spanContext, carrier) {
            var _this2 = this;

            if (!carrier) {
                this._tracer._error('Unexpected null carrier in call to inject');
                return;
            }
            if (typeof carrier !== 'object') {
                this._tracer._error('Unexpected \'' + typeof carrier + '\' FORMAT_TEXT_MAP carrier in call to inject');
                return;
            }

            var traceId = spanContext.traceGUID();
            if (traceId.length === 32 && traceId.substr(0, 16) === '0000000000000000') {
                traceId = traceId.substr(16); // take least significant 8 bytes (16 chars)
            }

            carrier[this._carrierPrefix + 'spanid'] = spanContext._guid;
            carrier[this._carrierPrefix + 'traceid'] = traceId;
            if (spanContext._sampled) {
                carrier[this._carrierPrefix + 'sampled'] = '1';
            } else {
                carrier[this._carrierPrefix + 'sampled'] = '0';
            }
            spanContext.forEachBaggageItem(function (key, value) {
                carrier['' + _this2._baggagePrefix + key] = value;
            });
            return carrier;
        }
    }]);

    return B3Propagator;
}(_propagator_ls2.default);

exports.default = B3Propagator;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/propagator_dd.js":
/*!**********************************!*\
  !*** ./src/imp/propagator_dd.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

var _span_context_imp = __webpack_require__(/*! ./span_context_imp */ "./src/imp/span_context_imp.js");

var _span_context_imp2 = _interopRequireDefault(_span_context_imp);

var _propagator_ls = __webpack_require__(/*! ./propagator_ls */ "./src/imp/propagator_ls.js");

var _propagator_ls2 = _interopRequireDefault(_propagator_ls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CARRIER_DD_TRACER_STATE_PREFIX = 'x-datadog-';

var DDPropagator = function () {
    function DDPropagator(tracer) {
        _classCallCheck(this, DDPropagator);

        this._tracer = tracer;
        this._baggagePrefix = _propagator_ls2.default;
        this._carrierPrefix = CARRIER_DD_TRACER_STATE_PREFIX;
    }

    _createClass(DDPropagator, [{
        key: 'inject',
        value: function inject(spanContext, carrier) {
            var _this = this;

            if (!carrier) {
                this._tracer._error('Unexpected null carrier in call to inject');
                return;
            }
            if (typeof carrier !== 'object') {
                this._tracer._error('Unexpected \'' + typeof carrier + '\' FORMAT_TEXT_MAP carrier in call to inject');
                return;
            }

            // eslint-disable-next-line max-len
            // Per https://github.com/lightstep/lightstep-tracer-javascript/blob/master/src/imp/platform/node/platform_node.js#L91
            // all generated GUIDs are base 16 strings.
            // DD headers expect integers, not base 16 values.
            carrier[this._carrierPrefix + 'parent-id'] = parseInt(spanContext._guid, 16).toString();
            carrier[this._carrierPrefix + 'trace-id'] = parseInt(spanContext.traceGUID(), 16).toString();
            if (spanContext._sampled) {
                carrier[this._carrierPrefix + 'sampling-priority'] = '1';
            } else {
                carrier[this._carrierPrefix + 'sampling-priority'] = '0';
            }

            spanContext.forEachBaggageItem(function (key, value) {
                carrier['' + _this._baggagePrefix + key] = value;
            });
            return carrier;
        }
    }, {
        key: 'extract',
        value: function extract(carrier) {
            var _this2 = this;

            // Iterate over the contents of the carrier and set the properties
            // accordingly.
            var foundFields = 0;
            var spanGUID = null;
            var traceGUID = null;
            var sampled = true;

            (0, _each3.default)(carrier, function (value, key) {
                key = key.toLowerCase();
                if (key.substr(0, _this2._carrierPrefix.length) !== _this2._carrierPrefix) {
                    return;
                }
                var suffix = key.substr(_this2._carrierPrefix.length);

                switch (suffix) {
                    case 'trace-id':
                        foundFields++;
                        traceGUID = parseInt(value, 10).toString(16);
                        break;
                    case 'parent-id':
                        foundFields++;
                        spanGUID = parseInt(value, 10).toString(16);
                        break;
                    case 'sampling-priority':
                        // TODO: support sampling priority somehow. This is a float64 that does not
                        // necessarily represent the sampling decision
                        if (value === 0) {
                            sampled = false;
                        }
                        break;
                    default:
                        _this2._tracer._error('Unrecognized carrier key \'' + key + '\' with recognized prefix. Ignoring.');
                        break;
                }
            });

            if (foundFields === 0) {
                // This is not an error per se, there was simply no SpanContext
                // in the carrier.
                return null;
            }
            if (foundFields < 2) {
                // A partial SpanContext suggests some sort of data corruption.
                this._tracer._error('Only found a partial SpanContext: ' + carrier);
                return null;
            }

            var spanContext = new _span_context_imp2.default(spanGUID, traceGUID, sampled);

            (0, _each3.default)(carrier, function (value, key) {
                key = key.toLowerCase();
                if (key.substr(0, _this2._baggagePrefix.length) !== _this2._baggagePrefix) {
                    return;
                }
                var suffix = key.substr(_this2._baggagePrefix.length);
                spanContext.setBaggageItem(suffix, value);
            });
            return spanContext;
        }
    }]);

    return DDPropagator;
}();

exports.default = DDPropagator;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/propagator_ls.js":
/*!**********************************!*\
  !*** ./src/imp/propagator_ls.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

var _span_context_imp = __webpack_require__(/*! ./span_context_imp */ "./src/imp/span_context_imp.js");

var _span_context_imp2 = _interopRequireDefault(_span_context_imp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CARRIER_TRACER_STATE_PREFIX = 'ot-tracer-';
var CARRIER_BAGGAGE_PREFIX = 'ot-baggage-';

var LightStepPropagator = function () {
    function LightStepPropagator(tracer) {
        _classCallCheck(this, LightStepPropagator);

        this._tracer = tracer;
        this._carrierPrefix = CARRIER_TRACER_STATE_PREFIX;
        this._baggagePrefix = CARRIER_BAGGAGE_PREFIX;
    }

    _createClass(LightStepPropagator, [{
        key: 'inject',
        value: function inject(spanContext, carrier) {
            var _this = this;

            if (!carrier) {
                this._tracer._error('Unexpected null carrier in call to inject');
                return;
            }
            if (typeof carrier !== 'object') {
                this._tracer._error('Unexpected \'' + typeof carrier + '\' FORMAT_TEXT_MAP carrier in call to inject');
                return;
            }

            carrier[this._carrierPrefix + 'spanid'] = spanContext._guid;
            carrier[this._carrierPrefix + 'traceid'] = spanContext._traceGUID;
            carrier[this._carrierPrefix + 'sampled'] = 'true';
            spanContext.forEachBaggageItem(function (key, value) {
                carrier['' + _this._baggagePrefix + key] = value;
            });
            return carrier;
        }
    }, {
        key: 'extract',
        value: function extract(carrier) {
            var _this2 = this;

            // Iterate over the contents of the carrier and set the properties
            // accordingly.
            var foundFields = 0;
            var spanGUID = null;
            var traceGUID = null;
            var sampled = true;

            (0, _each3.default)(carrier, function (value, key) {
                key = key.toLowerCase();
                if (key.substr(0, _this2._carrierPrefix.length) !== _this2._carrierPrefix) {
                    return;
                }
                var suffix = key.substr(_this2._carrierPrefix.length);

                switch (suffix) {
                    case 'traceid':
                        foundFields++;
                        traceGUID = value;
                        break;
                    case 'spanid':
                        foundFields++;
                        spanGUID = value;
                        break;
                    case 'sampled':
                        switch (value) {
                            case 0:
                            case '0':
                            case false:
                            case 'false':
                                sampled = false;
                                break;
                            default:
                                sampled = true;
                                break;
                        }
                        break;
                    default:
                        _this2._tracer._error('Unrecognized carrier key \'' + key + '\' with recognized prefix. Ignoring.');
                        break;
                }
            });

            if (foundFields === 0) {
                // This is not an error per se, there was simply no SpanContext
                // in the carrier.
                return null;
            }
            if (foundFields < 2) {
                // A partial SpanContext suggests some sort of data corruption.
                this._tracer._error('Only found a partial SpanContext: ' + carrier);
                return null;
            }

            var spanContext = new _span_context_imp2.default(spanGUID, traceGUID, sampled);

            (0, _each3.default)(carrier, function (value, key) {
                key = key.toLowerCase();
                if (key.substr(0, _this2._baggagePrefix.length) !== _this2._baggagePrefix) {
                    return;
                }
                var suffix = key.substr(_this2._baggagePrefix.length);
                spanContext.setBaggageItem(suffix, value);
            });
            return spanContext;
        }
    }]);

    return LightStepPropagator;
}();

exports.default = LightStepPropagator;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/report_imp.js":
/*!*******************************!*\
  !*** ./src/imp/report_imp.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint-disable-line camelcase
// eslint-disable-line camelcase


var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

var _coerce = __webpack_require__(/*! ./coerce */ "./src/imp/coerce.js");

var coerce = _interopRequireWildcard(_coerce);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proto = __webpack_require__(/*! ./generated_proto/collector_pb */ "./src/imp/generated_proto/collector_pb.js");

var ReportImp = function () {
    function ReportImp(runtime, oldestMicros, youngestMicros, spanRecords, internalLogs, counters, timestampOffsetMicros) {
        _classCallCheck(this, ReportImp);

        this._runtime = runtime;
        this._oldestMicros = oldestMicros;
        this._youngestMicros = youngestMicros;
        this._spanRecords = spanRecords;
        this._internalLogs = internalLogs;
        this._counters = counters;
        this._timestampOffsetMicros = timestampOffsetMicros;
    }

    _createClass(ReportImp, [{
        key: 'getSpanRecords',
        value: function getSpanRecords() {
            return this._spanRecords;
        }
    }, {
        key: 'getInternalLogs',
        value: function getInternalLogs() {
            return this._internalLogs;
        }
    }, {
        key: 'getCounters',
        value: function getCounters() {
            return this._counters;
        }
    }, {
        key: 'toThrift',
        value: function toThrift() {
            var _this = this;

            (0, _each3.default)(this._spanRecords, function (span) {
                span.runtime_guid = _this._runtimeGUID;
            });

            var thriftCounters = [];
            (0, _each3.default)(this._counters, function (value, key) {
                if (value === 0) {
                    return;
                }
                thriftCounters.push(new _platform_abstraction_layer.crouton_thrift.MetricsSample({
                    name: coerce.toString(key),
                    double_value: coerce.toNumber(value)
                }));
            });

            var thriftSpanRecords = [];
            (0, _each3.default)(this._spanRecords, function (spanRecord) {
                thriftSpanRecords.push(spanRecord._toThrift());
            });

            return new _platform_abstraction_layer.crouton_thrift.ReportRequest({
                runtime: this._runtime.toThrift(),
                oldest_micros: this._oldestMicros,
                youngest_micros: this._youngestMicros,
                span_records: thriftSpanRecords,
                internal_logs: this._internalLogs,
                internal_metrics: new _platform_abstraction_layer.crouton_thrift.Metrics({
                    counts: thriftCounters
                }),
                timestamp_offset_micros: this._timestampOffsetMicros
            });
        }
    }, {
        key: 'toProto',
        value: function toProto(auth) {
            var spansList = [];
            (0, _each3.default)(this._spanRecords, function (spanRecord) {
                spansList.push(spanRecord._toProto());
            });

            var countsList = [];
            (0, _each3.default)(this._counters, function (count) {
                var metricSample = new proto.MetricsSample();
                metricSample.setName(count.name);
                metricSample.setIntValue(count.int64_value);
                metricSample.setDoubleValue(count.double_value);
                countsList.push(metricSample);
            });

            var internalMetrics = new proto.InternalMetrics();
            internalMetrics.setCountsList(countsList);

            var reportProto = new proto.ReportRequest();
            reportProto.setAuth(auth.toProto());
            reportProto.setReporter(this._runtime.toProto());
            reportProto.setSpansList(spansList);
            reportProto.setTimestampOffsetMicros(this._timestampOffsetMicros.toString(10));
            reportProto.setInternalMetrics(internalMetrics);
            return reportProto;
        }
    }]);

    return ReportImp;
}();

exports.default = ReportImp;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/runtime_imp.js":
/*!********************************!*\
  !*** ./src/imp/runtime_imp.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint-disable-line camelcase
// eslint-disable-line camelcase


var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

var _coerce = __webpack_require__(/*! ./coerce */ "./src/imp/coerce.js");

var coerce = _interopRequireWildcard(_coerce);

var _util = __webpack_require__(/*! ./util/util */ "./src/imp/util/util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proto = __webpack_require__(/*! ./generated_proto/collector_pb */ "./src/imp/generated_proto/collector_pb.js");
var packageObject = __webpack_require__(/*! ../../package.json */ "./package.json");

var RuntimeImp = function () {
    function RuntimeImp(runtimeGUID, startMicros, componentName, attributes) {
        _classCallCheck(this, RuntimeImp);

        this._runtimeGUID = runtimeGUID;
        this._startMicros = startMicros;
        this._componentName = componentName;
        this._attributes = attributes;
    }

    _createClass(RuntimeImp, [{
        key: 'toThrift',
        value: function toThrift() {
            var thriftAttrs = [];
            (0, _each3.default)(this._attributes, function (val, key) {
                thriftAttrs.push(new _platform_abstraction_layer.crouton_thrift.KeyValue({
                    Key: coerce.toString(key),
                    Value: coerce.toString(val)
                }));
            });

            // NOTE: for legacy reasons, the Thrift field is called "group_name"
            // but is semantically equivalent to the "component_name"
            return new _platform_abstraction_layer.crouton_thrift.Runtime({
                guid: this._runtimeGUID,
                start_micros: this._startMicros,
                group_name: this._componentName,
                attrs: thriftAttrs
            });
        }
    }, {
        key: 'toProto',
        value: function toProto() {
            var tracerVersion = new proto.KeyValue();
            tracerVersion.setKey('lightstep.tracer_version');
            tracerVersion.setStringValue(packageObject.version);

            var tracerPlatform = new proto.KeyValue();
            tracerPlatform.setKey('lightstep.tracer_platform');
            tracerPlatform.setStringValue(this._attributes['lightstep.tracer_platform']);

            var tracerPlatformVersion = new proto.KeyValue();
            tracerPlatformVersion.setKey('lightstep.tracer_platform_version');
            tracerPlatformVersion.setStringValue(this._attributes['lightstep.tracer_platform_version']);

            var componentName = new proto.KeyValue();
            componentName.setKey('lightstep.component_name');
            componentName.setStringValue(this._componentName);

            var commandLine = new proto.KeyValue();
            commandLine.setKey('lightstep.command_line');
            commandLine.setStringValue(this._attributes['lightstep.command_line']);

            var hostname = new proto.KeyValue();
            hostname.setKey('lightstep.hostname');
            hostname.setStringValue(this._attributes['lightstep.hostname']);

            var reporterId = _util2.default.hexToDec(this._runtimeGUID);

            var tracerTags = [];
            (0, _each3.default)(this._attributes, function (val, key) {
                var ttag = new proto.KeyValue();
                ttag.setKey(key);
                ttag.setStringValue(val);
                tracerTags.push(ttag);
            });

            var reporterTags = [tracerVersion, tracerPlatform, componentName, commandLine, hostname, tracerPlatformVersion];
            var allTags = reporterTags.concat(tracerTags);

            var reporterProto = new proto.Reporter();
            reporterProto.setReporterId(reporterId);
            reporterProto.setTagsList(allTags);

            return reporterProto;
        }
    }]);

    return RuntimeImp;
}();

exports.default = RuntimeImp;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/span_context_imp.js":
/*!*************************************!*\
  !*** ./src/imp/span_context_imp.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpanContextImp = function () {
    _createClass(SpanContextImp, [{
        key: 'setBaggageItem',

        // ---------------------------------------------------------------------- //
        // OpenTracing Implementation
        // ---------------------------------------------------------------------- //

        value: function setBaggageItem(key, value) {
            this._baggage[key] = value;
        }
    }, {
        key: 'getBaggageItem',
        value: function getBaggageItem(key) {
            return this._baggage[key];
        }

        // ---------------------------------------------------------------------- //
        // LightStep Extensions
        // ---------------------------------------------------------------------- //

        // This is part of the formal OT API in Go; and will likely be supported
        // across platforms.
        //
        // https://github.com/opentracing/opentracing.github.io/issues/103

    }, {
        key: 'forEachBaggageItem',
        value: function forEachBaggageItem(f) {
            (0, _each3.default)(this._baggage, function (val, key) {
                f(key, val);
            });
        }

        // traceGUID returns a 128 bit trace ID.

    }, {
        key: 'traceGUID',
        value: function traceGUID() {
            return '' + this._upperTraceGUID + this._traceGUID;
        }

        // ---------------------------------------------------------------------- //
        // Private methods
        // ---------------------------------------------------------------------- //

    }]);

    function SpanContextImp(spanGUID, traceGUID, sampled) {
        _classCallCheck(this, SpanContextImp);

        this._baggage = {};
        this._guid = spanGUID;
        this._sampled = true;
        // Ignore undefined or null when determining truthiness.
        if (sampled === false) {
            this._sampled = sampled;
        }
        // upperTraceGUID is the most significant 8 bytes of a B3/TraceContext
        // 16 byte trace ID. Represented in base16.
        this._upperTraceGUID = '0000000000000000';
        this._traceGUID = traceGUID;
        if (this._traceGUID && this._traceGUID.length === 32) {
            this._upperTraceGUID = traceGUID.substr(0, 16);
            this._traceGUID = traceGUID.substr(16);
        }
    }

    return SpanContextImp;
}();

exports.default = SpanContextImp;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/span_imp.js":
/*!*****************************!*\
  !*** ./src/imp/span_imp.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _opentracing = __webpack_require__(/*! opentracing */ "./node_modules/opentracing/lib/index.js");

var opentracing = _interopRequireWildcard(_opentracing);

var _coerce = __webpack_require__(/*! ./coerce */ "./src/imp/coerce.js");

var coerce = _interopRequireWildcard(_coerce);

var _constants = __webpack_require__(/*! ../constants */ "./src/constants.js");

var constants = _interopRequireWildcard(_constants);

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

var _log_record_imp = __webpack_require__(/*! ./log_record_imp */ "./src/imp/log_record_imp.js");

var _log_record_imp2 = _interopRequireDefault(_log_record_imp);

var _util = __webpack_require__(/*! ./util/util */ "./src/imp/util/util.js");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line camelcase
// eslint-disable-line camelcase


var googleProtobufTimestampPB = __webpack_require__(/*! google-protobuf/google/protobuf/timestamp_pb */ "./node_modules/google-protobuf/google/protobuf/timestamp_pb.js");
var proto = __webpack_require__(/*! ./generated_proto/collector_pb */ "./src/imp/generated_proto/collector_pb.js");

var SpanImp = function (_opentracing$Span) {
    _inherits(SpanImp, _opentracing$Span);

    _createClass(SpanImp, [{
        key: '_tracer',

        // ---------------------------------------------------------------------- //
        // opentracing.Span SPI
        // ---------------------------------------------------------------------- //

        value: function _tracer() {
            return this._tracerImp;
        }
    }, {
        key: '_context',
        value: function _context() {
            return this._ctx;
        }
    }, {
        key: '_setOperationName',
        value: function _setOperationName(name) {
            this._operationName = '' + name;
        }
    }, {
        key: '_setBaggageItem',
        value: function _setBaggageItem(key, value) {
            this._ctx.setBaggageItem(key, value);
        }
    }, {
        key: '_getBaggageItem',
        value: function _getBaggageItem(key) {
            return this._ctx.getBaggageItem(key);
        }
    }, {
        key: '_addTags',
        value: function _addTags(keyValuePairs) {
            var self = this;
            (0, _each3.default)(keyValuePairs, function (value, key) {
                self._tags[key] = value;
            });
        }
    }, {
        key: '_log',
        value: function _log(keyValuePairs, timestamp) {
            var self = this;
            var argumentType = typeof keyValuePairs;
            if (argumentType !== 'object') {
                self._tracerImp._error('Span.log() expects an object as its first argument');
                return;
            }

            var tsMicros = timestamp ? timestamp * 1000 : self._tracerImp._platform.nowMicros();

            var record = new _log_record_imp2.default(self._tracerImp.getLogFieldKeyHardLimit(), self._tracerImp.getLogFieldValueHardLimit(), tsMicros, keyValuePairs);
            self._log_records = self._log_records || [];
            self._log_records.push(record);
            self._tracerImp.emit('log_added', record);
        }
    }, {
        key: '_finish',
        value: function _finish(finishTime) {
            return this.end(finishTime);
        }

        // ---------------------------------------------------------------------- //
        // Private methods
        // ---------------------------------------------------------------------- //

    }]);

    function SpanImp(tracer, name, spanContext) {
        _classCallCheck(this, SpanImp);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SpanImp).call(this));

        console.assert(typeof tracer === 'object', 'Invalid runtime'); // eslint-disable-line no-console

        _this._tracerImp = tracer;
        _this._ctx = spanContext;
        _this._ended = false;

        _this._operationName = name;
        _this._tags = {};
        _this._beginMicros = tracer._platform.nowMicros();
        _this._endMicros = 0;
        _this._errorFlag = false;
        _this._log_records = null;
        return _this;
    }

    // ---------------------------------------------------------------------- //
    // LightStep Extensions
    // ---------------------------------------------------------------------- //

    _createClass(SpanImp, [{
        key: 'getOperationName',
        value: function getOperationName() {
            return this._operationName;
        }

        // Getter only. The GUID is immutable once set internally.

    }, {
        key: 'guid',
        value: function guid() {
            return this._ctx._guid;
        }
    }, {
        key: 'traceGUID',
        value: function traceGUID() {
            return this._ctx._traceGUID;
        }
    }, {
        key: 'parentGUID',
        value: function parentGUID() {
            return this._tags.parent_span_guid;
        }
    }, {
        key: 'setParentGUID',
        value: function setParentGUID(guid) {
            this._tags.parent_span_guid = coerce.toString(guid);
            return this;
        }
    }, {
        key: 'beginMicros',
        value: function beginMicros() {
            return this._beginMicros;
        }
    }, {
        key: 'setBeginMicros',
        value: function setBeginMicros(micros) {
            this._beginMicros = micros;
            return this;
        }
    }, {
        key: 'endMicros',
        value: function endMicros() {
            return this._endMicros;
        }
    }, {
        key: 'setEndMicros',
        value: function setEndMicros(micros) {
            this._endMicros = micros;
            return this;
        }

        /**
         * Returns a URL to the trace containing this span.
         *
         * Unlike most methods, it *is* safe to call this method after `finish()`.
         *
         * @return {string} the absolute URL for the span
         */

    }, {
        key: 'generateTraceURL',
        value: function generateTraceURL() {
            var micros = void 0;
            if (this._beginMicros > 0 && this._endMicros > 0) {
                micros = Math.floor((this._beginMicros + this._endMicros) / 2);
            } else {
                micros = this._tracerImp._platform.nowMicros();
            }

            var urlPrefix = constants.LIGHTSTEP_APP_URL_PREFIX;
            var accessToken = encodeURIComponent(this._tracerImp.options().access_token);
            var guid = encodeURIComponent(this.guid());
            return urlPrefix + '/' + accessToken + '/trace?span_guid=' + guid + '&at_micros=' + micros;
        }
    }, {
        key: 'getTags',
        value: function getTags() {
            return this._tags;
        }

        /**
         * Finishes the span.
         *
         * @param  {Number} finishTime
         *         Optional Unix timestamp in milliseconds setting an explicit
         *         finish time for the span.
         */

    }, {
        key: 'end',
        value: function end(finishTime) {
            // Ensure a single span is not recorded multiple times
            if (this._ended) {
                return;
            }
            this._ended = true;

            if (finishTime !== undefined) {
                this.setEndMicros(Math.floor(finishTime * 1000));
            }

            // Do not set endMicros if it has already been set. This accounts for
            // the case of a span that has had it's times set manually (i.e. allows
            // for retroactively created spans that might not be possible to create
            // in real-time).
            if (this._endMicros === 0) {
                this.setEndMicros(this._tracerImp._platform.nowMicros());
            }

            if (_util2.default.shouldSendMetaSpan(this._tracer().options(), this.getTags())) {
                var _tags;

                this._tracerImp.startSpan(constants.LS_META_SP_FINISH, {
                    tags: (_tags = {}, _defineProperty(_tags, constants.LS_META_EVENT_KEY, true), _defineProperty(_tags, constants.LS_META_TRACE_KEY, this.traceGUID()), _defineProperty(_tags, constants.LS_META_SPAN_KEY, this.guid()), _tags)
                }).finish();
            }

            this._tracerImp._addSpanRecord(this);
        }
    }, {
        key: '_toThrift',
        value: function _toThrift() {
            var _this2 = this;

            var attributes = [];
            (0, _each3.default)(this._tags, function (value, key) {
                attributes.push(new _platform_abstraction_layer.crouton_thrift.KeyValue({
                    Key: coerce.toString(key),
                    Value: coerce.toString(value)
                }));
            });

            var logs = [];
            (0, _each3.default)(this._log_records, function (logRecord) {
                var logThrift = logRecord.toThrift();
                _this2._tracerImp._counters['logs.keys.over_limit'] += logRecord.getNumKeysOverLimit();
                _this2._tracerImp._counters['logs.values.over_limit'] += logRecord.getNumValuesOverLimit();
                logs.push(logThrift);
            });

            return new _platform_abstraction_layer.crouton_thrift.SpanRecord({
                span_guid: this.guid(),
                trace_guid: this.traceGUID(),
                runtime_guid: this._tracerImp.guid(),
                span_name: this._operationName,
                oldest_micros: this._beginMicros,
                youngest_micros: this._endMicros,
                attributes: attributes,
                error_flag: this._errorFlag,
                log_records: logs
            });
        }
    }, {
        key: '_toProto',
        value: function _toProto() {
            var _this3 = this;

            var spanContextProto = new proto.SpanContext();

            spanContextProto.setTraceId(_util2.default.hexToDec(this.traceGUID()));
            spanContextProto.setSpanId(_util2.default.hexToDec(this.guid()));

            var spanProto = new proto.Span();
            spanProto.setSpanContext(spanContextProto);
            spanProto.setOperationName(this._operationName);

            var startTimestamp = new googleProtobufTimestampPB.Timestamp();
            var startSeconds = Math.floor(this._beginMicros / 1000000);
            var startNanos = this._beginMicros % 1000000 * 1000;
            startTimestamp.setSeconds(startSeconds);
            startTimestamp.setNanos(startNanos);
            spanProto.setStartTimestamp(startTimestamp);
            spanProto.setDurationMicros((this._endMicros - this._beginMicros).toString());

            var logs = [];
            (0, _each3.default)(this._log_records, function (logRecord) {
                var logProto = logRecord.toProto();
                _this3._tracerImp._counters['logs.keys.over_limit'] += logRecord.getNumKeysOverLimit();
                _this3._tracerImp._counters['logs.values.over_limit'] += logRecord.getNumValuesOverLimit();
                logs.push(logProto);
            });
            spanProto.setLogsList(logs);

            var parentSpanGUID = void 0;
            var tags = [];
            (0, _each3.default)(this._tags, function (value, key) {
                var strValue = coerce.toString(value);
                var strKey = coerce.toString(key);
                var tag = new proto.KeyValue();
                if (strKey === 'parent_span_guid') {
                    parentSpanGUID = strValue;
                }
                tag.setKey(strKey);
                tag.setStringValue(strValue);
                tags.push(tag);
            });
            spanProto.setTagsList(tags);

            if (parentSpanGUID !== undefined) {
                var ref = new proto.Reference();
                ref.setRelationship(proto.Reference.Relationship.CHILD_OF);
                var parentSpanContext = new proto.SpanContext();
                parentSpanContext.setSpanId(_util2.default.hexToDec(parentSpanGUID));
                ref.setSpanContext(parentSpanContext);
                spanProto.setReferencesList([ref]);
            }

            return spanProto;
        }
    }]);

    return SpanImp;
}(opentracing.Span);

exports.default = SpanImp;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/tracer_imp.js":
/*!*******************************!*\
  !*** ./src/imp/tracer_imp.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _opentracing = __webpack_require__(/*! opentracing */ "./node_modules/opentracing/lib/index.js");

var opentracing = _interopRequireWildcard(_opentracing);

var _span_context_imp = __webpack_require__(/*! ./span_context_imp */ "./src/imp/span_context_imp.js");

var _span_context_imp2 = _interopRequireDefault(_span_context_imp);

var _span_imp = __webpack_require__(/*! ./span_imp */ "./src/imp/span_imp.js");

var _span_imp2 = _interopRequireDefault(_span_imp);

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

var _auth_imp = __webpack_require__(/*! ./auth_imp */ "./src/imp/auth_imp.js");

var _auth_imp2 = _interopRequireDefault(_auth_imp);

var _runtime_imp = __webpack_require__(/*! ./runtime_imp */ "./src/imp/runtime_imp.js");

var _runtime_imp2 = _interopRequireDefault(_runtime_imp);

var _report_imp = __webpack_require__(/*! ./report_imp */ "./src/imp/report_imp.js");

var _report_imp2 = _interopRequireDefault(_report_imp);

var _propagator = __webpack_require__(/*! ./propagator */ "./src/imp/propagator.js");

var _propagator2 = _interopRequireDefault(_propagator);

var _propagator_ls = __webpack_require__(/*! ./propagator_ls */ "./src/imp/propagator_ls.js");

var _propagator_ls2 = _interopRequireDefault(_propagator_ls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //============================================================================//
// Imports
//============================================================================//

var ClockState = __webpack_require__(/*! ./util/clock_state */ "./src/imp/util/clock_state.js");
var LogBuilder = __webpack_require__(/*! ./log_builder */ "./src/imp/log_builder.js");
var coerce = __webpack_require__(/*! ./coerce */ "./src/imp/coerce.js");
var constants = __webpack_require__(/*! ../constants */ "./src/constants.js");
var globals = __webpack_require__(/*! ./globals */ "./src/imp/globals.js");
var packageObject = __webpack_require__(/*! ../../package.json */ "./package.json");
var util = __webpack_require__(/*! ./util/util */ "./src/imp/util/util.js");

var DEFAULT_COLLECTOR_HOSTNAME = 'collector.lightstep.com';
var DEFAULT_COLLECTOR_PORT_TLS = 443;
var DEFAULT_COLLECTOR_PORT_PLAIN = 80;
var DEFAULT_COLLECTOR_PATH = '';

// Internal errors should be rare. Set a low limit to ensure a cascading failure
// does not compound an existing problem by trying to send a great deal of
// internal error data.
var MAX_INTERNAL_LOGS = 20;

var _singleton = null;

var Tracer = function (_opentracing$Tracer) {
    _inherits(Tracer, _opentracing$Tracer);

    function Tracer(opts) {
        _classCallCheck(this, Tracer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tracer).call(this));

        _this._delegateEventEmitterMethods();

        opts = opts || {};

        if (!_singleton) {
            globals.setOptions(opts);
            _singleton = _this;
        }

        // Platform abstraction layer
        _this._platform = new _platform_abstraction_layer.Platform(_this);
        _this._runtimeGUID = opts.guid || _this.override_runtime_guid || null; // Set once the group name is set
        _this._plugins = {};
        _this._options = {};
        _this._optionDescs = [];
        _this._makeOptionsTable();

        _this._opentracing = opentracing;
        if (opts.opentracing_module) {
            _this._opentracing = opts.opentracing_module;
        }

        var now = _this._platform.nowMicros();

        // The thrift authentication and runtime struct are created as soon as
        // the necessary initialization options are available.
        _this._startMicros = now;
        _this._auth = null;
        _this._runtime = null;

        var logger = {
            warn: function (msg, payload) {
                _this._warn(msg, payload);
            },
            error: function (err, payload) {
                _this._error(err, payload);
            }
        };

        if (opts) {
            _this._transport = opts.override_transport;
        }

        _this._propagators = {};
        _this._propagators[_this._opentracing.FORMAT_HTTP_HEADERS] = new _propagator_ls2.default(_this);
        _this._propagators[_this._opentracing.FORMAT_TEXT_MAP] = new _propagator_ls2.default(_this);
        _this._propagators[_this._opentracing.FORMAT_BINARY] = new _propagator2.default(_this, _this._opentracing.FORMAT_BINARY);

        if (opts && opts.propagators) {
            _this._propagators = _extends({}, _this._propagators, opts.propagators);
        }

        _this._reportingLoopActive = false;
        _this._first_report_has_run = false;
        _this._reportYoungestMicros = now;
        _this._reportTimer = null;
        _this._reportErrorStreak = 0; // Number of consecutive errors
        _this._lastVisibleErrorMillis = 0;
        _this._skippedVisibleErrors = 0;

        // Set addActiveRootSpan() for detail
        _this._activeRootSpanSet = {};
        _this._activeRootSpan = null;

        // Span reporting buffer and per-report data
        // These data are reset on every successful report.
        _this._spanRecords = [];

        // The counter names need to match those accepted by the collector.
        // These are internal counters only.
        _this._counters = {
            'internal.errors': 0,
            'internal.warnings': 0,
            'spans.dropped': 0,
            'logs.dropped': 0,
            'logs.keys.over_limit': 0,
            'logs.values.over_limit': 0,
            'reports.errors.send': 0
        };

        // For internal (not client) logs reported to the collector
        _this._internalLogs = [];

        // Current runtime state / status
        _this._flushIsActive = false;

        // Built-in plugins
        _this.addPlugin(__webpack_require__(/*! ../plugins/log_to_console */ "./src/plugins/log_to_console.js"));

        // Initialize the platform options after the built-in plugins in
        // case any of those options affect the built-ins.
        _this.addPlatformPlugins(opts);
        _this.setPlatformOptions(opts);

        // Set constructor arguments
        if (opts) {
            _this.options(opts);
        }

        if (typeof _this._transport === 'undefined' || _this._transport === null) {
            switch (_this._options.transport) {
                case 'proto':
                    _this._transport = new _platform_abstraction_layer.ProtoTransport(logger);
                    _this._info('Using protobuf over HTTP transport per user-defined option.');
                    break;
                case 'thrift':
                    _this._transport = new _platform_abstraction_layer.ThriftTransport(logger);
                    _this._info('Using thrift transport per user-defined option.');
                    break;
                default:
                    _this._transport = new _platform_abstraction_layer.ProtoTransport(logger);
                    _this._info('Using protobuf over HTTP transport as no user-defined option was supplied.');
            }
        }

        // For clock skew adjustment.
        // Must be set after options have been set.
        _this._useClockState = !_this._options.disable_clock_skew_correction;
        _this._clockState = new ClockState({
            nowMicros: function () {
                return _this._platform.nowMicros();
            },
            localStoreGet: function () {
                var key = 'clock_state/' + _this._options.collector_host;
                return _this._platform.localStoreGet(key);
            },
            localStoreSet: function (value) {
                var key = 'clock_state/' + _this._options.collector_host;
                return _this._platform.localStoreSet(key, value);
            }
        });

        // This relies on the options being set: call this last.
        _this._setupReportOnExit();

        _this._info('Tracer created with guid ' + _this._runtimeGUID);

        if (_this._options.access_token.length === 0) {
            _this._warn('Access token not set -\n            this requires a satellite with access token checking disabled,\n            such as a developer satellite.');
        }

        _this.startPlugins();
        return _this;
    }

    // Morally speaking, Tracer also inherits from EventEmmiter, but we must
    // fake it via composition.
    //
    // If not obvious on inspection: a hack.


    _createClass(Tracer, [{
        key: '_delegateEventEmitterMethods',
        value: function _delegateEventEmitterMethods() {
            var self = this;
            this._ee = new _eventemitter2.default();
            // The list of methods at https://nodejs.org/api/events.html
            (0, _each3.default)(['addListener', 'emit', 'eventNames', 'getMaxListeners', 'listenerCount', 'listeners', 'on', 'once', 'prependListener', 'prependOnceListener', 'removeAllListeners', 'removeListener', 'setMaxListeners'], function (methodName) {
                self[methodName] = function () {
                    if (self._ee[methodName]) {
                        // eslint-disable-next-line prefer-spread
                        self._ee[methodName].apply(self._ee, arguments);
                    }
                };
            });
        }
    }, {
        key: '_makeOptionsTable',
        value: function _makeOptionsTable() {
            /* eslint-disable key-spacing, no-multi-spaces */

            // NOTE: make 'verbosity' the first option so it is processed first on
            // options changes and takes effect as soon as possible.
            this.addOption('verbosity', {
                type: 'int', min: 0, max: 9, defaultValue: 1
            });

            // Core options
            this.addOption('access_token', { type: 'string', defaultValue: '' });
            this.addOption('component_name', { type: 'string', defaultValue: '' });
            this.addOption('collector_host', { type: 'string', defaultValue: DEFAULT_COLLECTOR_HOSTNAME });
            this.addOption('collector_port', { type: 'int', defaultValue: DEFAULT_COLLECTOR_PORT_TLS });
            this.addOption('collector_path', { type: 'string', defaultValue: DEFAULT_COLLECTOR_PATH });
            this.addOption('collector_encryption', { type: 'string', defaultValue: 'tls' });
            this.addOption('tags', { type: 'any', defaultValue: {} });
            this.addOption('max_reporting_interval_millis', { type: 'int', defaultValue: 2500 });
            this.addOption('disable_clock_skew_correction', { type: 'bool', defaultValue: false });
            this.addOption('transport', { type: 'string', defaultValue: 'proto' });

            // Non-standard, may be deprecated
            this.addOption('disabled', { type: 'bool', defaultValue: false });
            this.addOption('max_span_records', { type: 'int', defaultValue: 4096 });
            this.addOption('default_span_tags', { type: 'any', defaultValue: {} });
            this.addOption('report_timeout_millis', { type: 'int', defaultValue: 30000 });
            this.addOption('gzip_json_requests', { type: 'bool', defaultValue: true });
            this.addOption('disable_reporting_loop', { type: 'bool', defaultValue: false });
            this.addOption('disable_report_on_exit', { type: 'bool', defaultValue: false });
            this.addOption('delay_initial_report_millis', { type: 'int', defaultValue: 1000 });
            this.addOption('error_throttle_millis', { type: 'int', defaultValue: 60000 });
            this.addOption('logger', { type: 'function', defaultValue: this._printToConsole.bind(this) });
            this.addOption('clear_span_buffer_consecutive_errors', { type: 'int', defaultValue: null });

            // Debugging options
            //
            // These are not part of the supported public API.
            //
            // If false, SSL certificate verification is skipped. Useful for testing.
            this.addOption('certificate_verification', { type: 'bool', defaultValue: true });
            // I.e. report only on explicit calls to flush()

            // Unit testing options
            this.addOption('override_transport', { type: 'any', defaultValue: null });
            this.addOption('silent', { type: 'bool', defaultValue: false });

            // Hard upper limits to protect against worst-case scenarios for log field sizes.
            this.addOption('log_field_key_hard_limit', { type: 'int', defaultValue: 256 });
            this.addOption('log_field_value_hard_limit', { type: 'int', defaultValue: 1024 });

            // Meta Event reporting options
            this.addOption('disable_meta_event_reporting', { type: 'bool', defaultValue: false });

            /* eslint-disable key-spacing, no-multi-spaces */
        }

        // ---------------------------------------------------------------------- //
        // opentracing.Tracer SPI
        // ---------------------------------------------------------------------- //

    }, {
        key: '_startSpan',
        value: function _startSpan(name, fields) {
            var _this2 = this;

            // First, assemble the SpanContextImp for our SpanImp.
            var parentCtxImp = null;
            fields = fields || {};
            if (fields.references) {
                for (var i = 0; i < fields.references.length; i++) {
                    var ref = fields.references[i];
                    var type = ref.type();
                    if (type === this._opentracing.REFERENCE_CHILD_OF || type === this._opentracing.REFERENCE_FOLLOWS_FROM) {
                        var context = ref.referencedContext();
                        if (!context) {
                            this._error('Span reference has an invalid context', context);
                            // eslint-disable-next-line no-continue
                            continue;
                        }
                        parentCtxImp = context;
                        break;
                    }
                }
            }

            var traceGUID = parentCtxImp ? parentCtxImp.traceGUID() : this.generateTraceGUIDForRootSpan();
            var sampled = parentCtxImp ? parentCtxImp._sampled : true;
            var spanCtx = new _span_context_imp2.default(this._platform.generateUUID(), traceGUID, sampled);
            var spanImp = new _span_imp2.default(this, name, spanCtx);
            spanImp.addTags(this._options.default_span_tags);

            (0, _each3.default)(fields, function (value, key) {
                switch (key) {
                    case 'references':
                        // Ignore: handled before constructing the span
                        break;
                    case 'startTime':
                        // startTime is in milliseconds
                        spanImp.setBeginMicros(Math.floor(value * 1000));
                        break;
                    case 'tags':
                        spanImp.addTags(value);
                        break;
                    default:
                        _this2._warn('Ignoring unknown field \'' + key + '\'');
                        break;
                }
            });

            if (parentCtxImp !== null) {
                spanImp.setParentGUID(parentCtxImp._guid);

                // Copy baggage items from parent to child
                parentCtxImp.forEachBaggageItem(function (k, v) {
                    return spanCtx.setBaggageItem(k, v);
                });
            }

            this.emit('start_span', spanImp);

            if (util.shouldSendMetaSpan(this.options(), spanImp.getTags())) {
                var _tags;

                this.startSpan(constants.LS_META_SP_START, {
                    tags: (_tags = {}, _defineProperty(_tags, constants.LS_META_EVENT_KEY, true), _defineProperty(_tags, constants.LS_META_TRACE_KEY, spanImp.traceGUID()), _defineProperty(_tags, constants.LS_META_SPAN_KEY, spanImp.guid()), _tags)
                }).finish();
            }
            return spanImp;
        }
    }, {
        key: '_inject',
        value: function _inject(spanContext, format, carrier) {
            if (this.options().meta_event_reporting === true) {
                var _tags2;

                this.startSpan(constants.LS_META_INJECT, {
                    tags: (_tags2 = {}, _defineProperty(_tags2, constants.LS_META_EVENT_KEY, true), _defineProperty(_tags2, constants.LS_META_TRACE_KEY, spanContext._traceGUID), _defineProperty(_tags2, constants.LS_META_SPAN_KEY, spanContext._guid), _defineProperty(_tags2, constants.LS_META_PROPAGATION_KEY, format), _tags2)
                }).finish();
            }
            switch (format) {
                case this._opentracing.FORMAT_HTTP_HEADERS:
                    this._propagators[this._opentracing.FORMAT_HTTP_HEADERS].inject(spanContext, carrier);
                    break;
                case this._opentracing.FORMAT_TEXT_MAP:
                    this._propagators[this._opentracing.FORMAT_TEXT_MAP].inject(spanContext, carrier);
                    break;
                case this._opentracing.FORMAT_BINARY:
                    this._propagators[this._opentracing.FORMAT_BINARY].inject(spanContext, carrier);
                    break;
                default:
                    this._error('Unknown format: ' + format);
                    break;
            }
        }
    }, {
        key: '_extract',
        value: function _extract(format, carrier) {
            var sc = null;
            switch (format) {
                case this._opentracing.FORMAT_HTTP_HEADERS:
                    sc = this._propagators[this._opentracing.FORMAT_HTTP_HEADERS].extract(carrier);
                    break;
                case this._opentracing.FORMAT_TEXT_MAP:
                    sc = this._propagators[this._opentracing.FORMAT_TEXT_MAP].extract(carrier);
                    break;
                case this._opentracing.FORMAT_BINARY:
                    sc = this._propagators[this._opentracing.FORMAT_BINARY].extract(carrier);
                    break;
                default:
                    this._error('Unsupported format: ' + format);
                    return null;
            }
            if (this.options().meta_event_reporting === true && sc) {
                var _tags3;

                this.startSpan(constants.LS_META_EXTRACT, {
                    tags: (_tags3 = {}, _defineProperty(_tags3, constants.LS_META_EVENT_KEY, true), _defineProperty(_tags3, constants.LS_META_TRACE_KEY, sc._traceGUID), _defineProperty(_tags3, constants.LS_META_SPAN_KEY, sc._guid), _defineProperty(_tags3, constants.LS_META_PROPAGATION_KEY, format), _tags3)
                }).finish();
            }
            return sc;
        }

        // ---------------------------------------------------------------------- //
        // LightStep extensions
        // ---------------------------------------------------------------------- //

        /**
         * Manually sends a report of all buffered data.
         *
         * @param  {Function} done - callback function invoked when the report
         *         either succeeds or fails.
         */

    }, {
        key: 'flush',
        value: function flush(done) {
            if (!done) {
                done = function () {};
            }
            if (this._options.disabled) {
                this._warn('Manual flush() called in disabled state.');
                return done(null);
            }
            this._flushReport(true, false, done);
        }

        //-----------------------------------------------------------------------//
        // Options
        //-----------------------------------------------------------------------//

    }, {
        key: 'guid',
        value: function guid() {
            return this._runtimeGUID;
        }
    }, {
        key: 'verbosity',
        value: function verbosity() {
            // The 'undefined' handling below is for logs that may occur before the
            // options are initialized.
            var v = this._options.verbosity;
            return v === undefined ? 1 : v;
        }

        // Call to generate a new Trace GUID

    }, {
        key: 'generateTraceGUIDForRootSpan',
        value: function generateTraceGUIDForRootSpan() {
            var guid = this._platform.generateUUID();
            if (this._activeRootSpan) {
                guid = this._activeRootSpan.traceGUID();
            }
            return guid;
        }
    }, {
        key: 'setPlatformOptions',
        value: function setPlatformOptions(userOptions) {
            var opts = this._platform.options(this) || {};
            (0, _each3.default)(userOptions, function (val, key) {
                opts[key] = val;
            });
            this.options(opts);
        }

        // Register a new option.  Used by plug-ins.

    }, {
        key: 'addOption',
        value: function addOption(name, desc) {
            desc.name = name;
            this._optionDescs.push(desc);
            this._options[desc.name] = desc.defaultValue;
        }
    }, {
        key: 'options',
        value: function options(opts) {
            var _this3 = this;

            if (arguments.length === 0) {
                console.assert(typeof this._options === 'object', // eslint-disable-line
                'Internal error: _options field incorrect');
                return this._options;
            }
            if (typeof opts !== 'object') {
                throw new Error('options() must be called with an object: type was ' + typeof opts);
            }

            // "collector_port" 0 acts as an alias for "use the default".
            if (opts.collector_port === 0) {
                delete opts.collector_port;
            }

            // "collector_encryption" acts an alias for the common cases of 'collector_port'
            if (opts.collector_encryption !== undefined && opts.collector_port === undefined) {
                opts.collector_port = opts.collector_encryption !== 'none' ? DEFAULT_COLLECTOR_PORT_TLS : DEFAULT_COLLECTOR_PORT_PLAIN;
            }
            // set meta event reporting to false by default, it will be enabled by the satellite
            this.meta_event_reporting = false;

            // Track what options have been modified
            var modified = {};
            var unchanged = {};
            (0, _each3.default)(this._optionDescs, function (desc) {
                _this3._setOptionInternal(modified, unchanged, opts, desc);
            });

            // Check for any invalid options: is there a key in the specified operation
            // that didn't result either in a change or a reset to the existing value?
            Object.keys(opts).forEach(function (key) {
                if (modified[key] === undefined && unchanged[key] === undefined) {
                    _this3._warn('Invalid option ' + key + ' with value ' + opts[key]);
                }
            });

            //
            // Update the state information based on the changes
            //
            this._initReportingDataIfNeeded(modified);

            if (!this._reportingLoopActive) {
                this._startReportingLoop();
            }

            if (this.verbosity() >= 3) {
                var optionsString = '';
                var count = 0;
                (0, _each3.default)(modified, function (val, key) {
                    optionsString += '\t' + JSON.stringify(key) + ': ' + JSON.stringify(val.newValue) + '\n';
                    count++;
                });
                if (count > 0) {
                    this._debug('Options modified:\n' + optionsString);
                }
            }
            this.emit('options', modified, this._options, this);
        }
    }, {
        key: '_setOptionInternal',
        value: function _setOptionInternal(modified, unchanged, opts, desc) {
            var name = desc.name;

            var value = opts[name];
            var valueType = typeof value;
            if (value === undefined) {
                return;
            }

            // Parse the option (and check constraints)
            switch (desc.type) {
                case 'any':
                    break;

                case 'bool':
                    if (value !== true && value !== false) {
                        this._error('Invalid boolean option \'' + name + '\' \'' + value + '\'');
                        return;
                    }
                    break;

                case 'function':
                    if (typeof value !== 'function') {
                        this._error('Invalid function option \'' + name + '\' \'' + value + '\'');
                        return;
                    }
                    break;

                case 'int':
                    if (valueType !== 'number' || Math.floor(value) !== value) {
                        this._error('Invalid int option \'' + name + '\' \'' + value + '\'');
                        return;
                    }
                    if (desc.min !== undefined && desc.max !== undefined) {
                        if (!(value >= desc.min && value <= desc.max)) {
                            this._error('Option \'' + name + '\' out of range \'' + value + '\' is not between ' + desc.min + ' and ' + desc.max); // eslint-disable-line max-len
                            return;
                        }
                    }
                    break;

                case 'string':
                    switch (valueType) {
                        case 'string':
                            break;
                        case 'number':
                            value = coerce.toString(value);
                            break;
                        default:
                            this._error('Invalid string option ' + name + ' ' + value);
                            return;
                    }
                    break;

                case 'array':
                    // Per http://stackoverflow.com/questions/4775722/check-if-object-is-array
                    if (Object.prototype.toString.call(value) !== '[object Array]') {
                        this._error('Invalid type for array option ' + name + ': found \'' + valueType + '\'');
                        return;
                    }
                    break;

                default:
                    this._error('Unknown option type \'' + desc.type + '\'');
                    return;
            }

            // Set the new value, recording any modifications
            var oldValue = this._options[name];
            if (oldValue === undefined) {
                throw new Error('Attempt to set unknown option ' + name);
            }

            // Ignore no-op changes for types that can be checked quickly
            if (valueType !== 'object' && oldValue === value) {
                unchanged[name] = true;
                return;
            }

            modified[name] = {
                oldValue: oldValue,
                newValue: value
            };
            this._options[name] = value;
        }

        // The authorization and runtime information is initialized as soon
        // as it is available.  This allows logs and spans to be buffered before
        // the library is initialized, which can be helpul in a complex setup with
        // many subsystems.
        //

    }, {
        key: '_initReportingDataIfNeeded',
        value: function _initReportingDataIfNeeded(modified) {
            var _this4 = this;

            // Ignore redundant initialization; complaint on inconsistencies
            if (this._auth !== null) {
                if (!this._runtime) {
                    return this._error('Inconsistent state: auth initialized without runtime.');
                }
                if (modified.access_token) {
                    throw new Error('Cannot change access_token after it has been set.');
                }
                if (modified.component_name) {
                    throw new Error('Cannot change component_name after it has been set.');
                }
                if (modified.collector_host) {
                    throw new Error('Cannot change collector_host after the connection is established');
                }
                if (modified.collector_port) {
                    throw new Error('Cannot change collector_port after the connection is established');
                }
                if (modified.collector_path) {
                    throw new Error('Cannot change collector_path after the connection is established');
                }
                if (modified.collector_encryption) {
                    throw new Error('Cannot change collector_encryption after the connection is established');
                }
                return;
            }

            this._runtimeGUID = this._platform.runtimeGUID(this._options.component_name);

            this._auth = new _auth_imp2.default(this._options.access_token);

            //
            // Assemble the tracer tags from the user-specified and automatic,
            // internal tags.
            //
            var tags = {};
            (0, _each3.default)(this._options.tags, function (value, key) {
                if (typeof value !== 'string') {
                    _this4._error('Tracer tag value is not a string: key=' + key);
                    return;
                }
                tags[key] = value;
            });
            tags['lightstep.tracer_version'] = packageObject.version;
            var platformTags = this._platform.tracerTags();
            (0, _each3.default)(platformTags, function (val, key) {
                tags[key] = val;
            });

            this._runtime = new _runtime_imp2.default(this._runtimeGUID, this._startMicros, this._options.component_name, tags);

            this._info('Initializing reporting data', {
                component_name: this._options.component_name,
                access_token: this._auth.getAccessToken()
            });
            this.emit('reporting_initialized');
        }
    }, {
        key: 'getLogFieldKeyHardLimit',
        value: function getLogFieldKeyHardLimit() {
            return this._options.log_field_key_hard_limit;
        }
    }, {
        key: 'getLogFieldValueHardLimit',
        value: function getLogFieldValueHardLimit() {
            return this._options.log_field_value_hard_limit;
        }

        //-----------------------------------------------------------------------//
        // Plugins
        //-----------------------------------------------------------------------//

    }, {
        key: 'addPlatformPlugins',
        value: function addPlatformPlugins(opts) {
            var _this5 = this;

            var pluginSet = this._platform.plugins(opts);
            (0, _each3.default)(pluginSet, function (val) {
                _this5.addPlugin(val);
            });
        }
    }, {
        key: 'addPlugin',
        value: function addPlugin(plugin) {
            // Don't add plug-ins twice
            var name = plugin.name();
            if (this._plugins[name]) {
                return;
            }

            this._plugins[name] = plugin;
            plugin.addOptions(this);
        }
    }, {
        key: 'startPlugins',
        value: function startPlugins() {
            var _this6 = this;

            (0, _each3.default)(this._plugins, function (val, key) {
                _this6._plugins[key].start(_this6);
            });
        }

        //-----------------------------------------------------------------------//
        // Spans
        //-----------------------------------------------------------------------//

        // This is a LightStep-specific feature that should be used sparingly. It
        // sets a "global" root span such that spans that would *otherwise* be root
        // span instead inherit the trace GUID of the active root span. This is
        // best clarified by example:
        //
        // On document load in the browser, an "active root span" is created for
        // the page load process. Any spans started without an explicit parent
        // will the document load trace GUID instead of starting a trace GUID.
        // This implicit root remains active only until the page is done loading.
        //
        // Any span adding itself as a root span *must* remove itself along with
        // calling finish(). This will *not* be done automatically.
        //
        // NOTE: currently, only the trace GUID is transferred; it may or may not
        // make sure to make this a proper parent.
        //
        // NOTE: the root span tracking is handled as a set rather than a single
        // global to avoid conflicts between libraries.

    }, {
        key: 'addActiveRootSpan',
        value: function addActiveRootSpan(span) {
            this._activeRootSpanSet[span._guid] = span;
            this._setActiveRootSpanToYoungest();
        }
    }, {
        key: 'removeActiveRootSpan',
        value: function removeActiveRootSpan(span) {
            delete this._activeRootSpanSet[span._guid];
            this._setActiveRootSpanToYoungest();
        }
    }, {
        key: '_setActiveRootSpanToYoungest',
        value: function _setActiveRootSpanToYoungest() {
            var _this7 = this;

            // Set the _activeRootSpan to the youngest of the roots in case of
            // multiple.
            this._activeRootSpan = null;
            (0, _each3.default)(this._activeRootSpanSet, function (span) {
                if (!_this7._activeRootSpan || span._beginMicros > _this7._activeRootSpan._beginMicros) {
                    _this7._activeRootSpan = span;
                }
            });
        }

        //-----------------------------------------------------------------------//
        // Encoding / decoding
        //-----------------------------------------------------------------------//

    }, {
        key: '_objectToUint8Array',
        value: function _objectToUint8Array(obj) {
            var jsonString = void 0;
            try {
                // encodeURIComponent() is a *very* inefficient, but simple and
                // well-supported way to avoid having to think about Unicode in
                // in the conversion to a UInt8Array.
                //
                // Writing multiple bytes for String.charCodeAt and
                // String.codePointAt would be an alternate approach; again,
                // simplicitly is being preferred over efficiency for the moment.
                jsonString = encodeURIComponent(JSON.stringify(obj));
            } catch (e) {
                this._error('Could not binary encode carrier data.');
                return null;
            }

            var buffer = new ArrayBuffer(jsonString.length);
            var view = new Uint8Array(buffer);
            for (var i = 0; i < jsonString.length; i++) {
                var code = jsonString.charCodeAt(i);
                if (!(code >= 0 && code <= 255)) {
                    this._error('Unexpected character code');
                    return null;
                }
                view[i] = code;
            }
            return view;
        }
    }, {
        key: '_uint8ArrayToObject',
        value: function _uint8ArrayToObject(arr) {
            if (!arr) {
                this._error('Array is null');
                return null;
            }

            var jsonString = '';
            for (var i = 0; i < arr.length; i++) {
                jsonString += String.fromCharCode(arr[i]);
            }
            try {
                return JSON.parse(decodeURIComponent(jsonString));
            } catch (e) {
                this._error('Could not decode binary data.');
                return null;
            }
        }

        //-----------------------------------------------------------------------//
        // Logging
        //-----------------------------------------------------------------------//

    }, {
        key: 'log',
        value: function log() {
            var b = new LogBuilder(this);
            return b;
        }

        //-----------------------------------------------------------------------//
        // Buffers
        //-----------------------------------------------------------------------//

    }, {
        key: '_clearBuffers',
        value: function _clearBuffers() {
            this._spanRecords = [];
            this._internalLogs = [];

            // Create a new object to avoid overwriting the values in any references
            // to the old object
            var counters = {};
            (0, _each3.default)(this._counters, function (unused, key) {
                counters[key] = 0;
            });
            this._counters = counters;
        }
    }, {
        key: '_buffersAreEmpty',
        value: function _buffersAreEmpty() {
            if (this._spanRecords.length > 0) {
                return false;
            }
            if (this._internalLogs.length > 0) {
                return false;
            }

            var countersAllZero = true;
            (0, _each3.default)(this._counters, function (val) {
                if (val > 0) {
                    countersAllZero = false;
                }
            });
            return countersAllZero;
        }
    }, {
        key: '_addSpanRecord',
        value: function _addSpanRecord(record) {
            this._internalAddSpanRecord(record);
            this.emit('span_added', record);
        }
    }, {
        key: '_internalAddSpanRecord',
        value: function _internalAddSpanRecord(record) {
            if (!record) {
                this._error('Attempt to add null record to buffer');
                return;
            }

            if (this._spanRecords.length >= this._options.max_span_records) {
                var index = Math.floor(this._spanRecords.length * Math.random());
                this._spanRecords[index] = record;
                this._counters['spans.dropped']++;
            } else {
                this._spanRecords.push(record);
            }
        }
    }, {
        key: '_restoreRecords',
        value: function _restoreRecords(spans, internalLogs, counters) {
            var _this8 = this;

            (0, _each3.default)(spans, function (span) {
                _this8._internalAddSpanRecord(span);
            });

            var currentInternalLogs = this._internalLogs;
            this._internalLogs = [];
            var toAdd = internalLogs.concat(currentInternalLogs);
            (0, _each3.default)(toAdd, function (log) {
                _this8._pushInternalLog(log);
            });

            (0, _each3.default)(counters, function (value, key) {
                if (key in _this8._counters) {
                    _this8._counters[key] += value;
                } else {
                    _this8._error('Bad counter name: ' + key);
                }
            });
        }

        /**
         * clearSpanRecordsIfMaxErrors checks to see if the tracer was configured to
         * empty the span buffer after a fixed amount of errors. If it is configured,
         * and there has been an error streak equal to the configured value,
         * it will empty spanRecords and record that the spans were dropped.
         *
         * @private
         */

    }, {
        key: '_clearSpanRecordsIfMaxErrors',
        value: function _clearSpanRecordsIfMaxErrors() {
            var maxErrorsToEmpty = this.options().clear_span_buffer_consecutive_errors;
            if (maxErrorsToEmpty === null || this._reportErrorStreak < maxErrorsToEmpty) {
                return;
            }

            // spanRecords is configured to be emptied
            // the number of dropped spans and reporting errors should still be maintained since
            // the loop may still in the process of a report.
            var numSpansToDrop = this._spanRecords.length;
            this._counters['spans.dropped'] += numSpansToDrop;
            this._spanRecords = [];

            this._warn('Span buffer flushed, max consecutive errors reached', {
                max_consecutive_errors: maxErrorsToEmpty,
                spans_dropped: numSpansToDrop
            });
        }

        //-----------------------------------------------------------------------//
        // Reporting loop
        //-----------------------------------------------------------------------//

    }, {
        key: '_setupReportOnExit',
        value: function _setupReportOnExit() {
            var _this9 = this;

            if (this._options.disable_report_on_exit) {
                this._debug('report-on-exit is disabled.');
                return;
            }

            // Do a final explicit flush. Note that the final flush may enqueue
            // asynchronous callbacks that cause the 'beforeExit' event to be
            // re-emitted when those callbacks finish.
            var finalFlushOnce = 0;
            var finalFlush = function () {
                if (finalFlushOnce++ > 0) {
                    return;
                }
                _this9._info('Final flush before exit.');
                _this9._flushReport(false, true, function (err) {
                    if (err) {
                        _this9._warn('Final report before exit failed', {
                            error: err,
                            unflushed_spans: _this9._spanRecords.length,
                            buffer_youngest_micros: _this9._reportYoungestMicros
                        });
                    }
                });
            };
            this._platform.onBeforeExit(finalFlush);
        }
    }, {
        key: '_startReportingLoop',
        value: function _startReportingLoop() {
            var _this10 = this;

            if (this._options.disabled) {
                this._info('Not starting reporting loop: instrumentation is disabled.');
                return;
            }
            if (this._options.disable_reporting_loop) {
                this._info('Not starting reporting loop: reporting loop is disabled.');
                return;
            }
            if (this._auth === null) {
                // Don't start the loop until the thrift data necessary to do the
                // report is set up.
                return;
            }
            if (this._reportingLoopActive) {
                this._info('Reporting loop already started!');
                return;
            }

            this._info('Starting reporting loop:', this._runtime);
            this._reportingLoopActive = true;

            // Stop the reporting loop so the Node.js process does not become a
            // zombie waiting for the timers.
            var stopReportingOnce = 0;
            var stopReporting = function () {
                if (stopReportingOnce++ > 0) {
                    return;
                }
                _this10._stopReportingLoop();
            };
            this._platform.onBeforeExit(stopReporting);

            // Begin the asynchronous reporting loop
            var loop = function () {
                _this10._enqueueNextReport(function (err) {
                    if (_this10._reportingLoopActive) {
                        loop();
                    }
                });
            };

            var delay = Math.floor(Math.random() * this._options.delay_initial_report_millis);
            util.detachedTimeout(function () {
                loop();
            }, delay);
        }
    }, {
        key: '_stopReportingLoop',
        value: function _stopReportingLoop() {
            this._debug('Stopping reporting loop');

            this._reportingLoopActive = false;
            clearTimeout(this._reportTimer);
            this._reportTimer = null;
        }
    }, {
        key: '_enqueueNextReport',
        value: function _enqueueNextReport(done) {
            var _this11 = this;

            // If there's already a report request enqueued, ignore this new
            // request.
            if (this._reportTimer) {
                return;
            }

            // If the clock state is still being primed, potentially use the
            // shorted report interval.
            //
            // However, do not use the shorter interval in the case of an error.
            // That does not provide sufficient backoff.
            var reportInterval = this._options.max_reporting_interval_millis;
            if (this._reportErrorStreak === 0 && this._useClockState && !this._clockState.isReady()) {
                reportInterval = Math.min(constants.CLOCK_STATE_REFRESH_INTERVAL_MS, reportInterval);
            }

            // After 3 consecutive errors, expand the retry delay up to 8x the
            // normal interval, jitter the delay by +/- 25%, and be sure to back off
            // *at least* the standard reporting interval in the case of an error.
            var backOff = 1 + Math.min(7, Math.max(0, this._reportErrorStreak));
            var basis = backOff * reportInterval;
            var jitter = 1.0 + (Math.random() * 0.5 - 0.25);
            var delay = Math.floor(Math.max(0, jitter * basis));

            this._debug('Delaying next flush for ' + delay + 'ms');
            this._reportTimer = util.detachedTimeout(function () {
                _this11._reportTimer = null;
                _this11._flushReport(false, false, done);
            }, delay);
        }

        /**
         * Internal worker for a flush of buffered data into a report.
         *
         * @param  {bool} manual - this is a manually invoked flush request. Don't
         *         override this call with a clock state syncing flush, for example.
         * @param  {bool} detached - this is an "at exit" flush that should not block
         *         the calling process in any manner. This is specifically called
         *         "detached" due to the browser use case where the report is done,
         *         not just asynchronously, but as a script request that continues
         *         to run even if the page is navigated away from mid-request.
         * @param  {function} done - standard callback function called on success
         *         or error.
         */

    }, {
        key: '_flushReport',
        value: function _flushReport(manual, detached, done) {
            var _this12 = this;

            done = done || function (err) {};

            var clockReady = this._clockState.isReady();
            var clockOffsetMicros = this._clockState.offsetMicros();

            // Diagnostic information on the clock correction
            this._debug('time correction state', {
                offset_micros: clockOffsetMicros,
                active_samples: this._clockState.activeSampleCount(),
                ready: clockReady
            });

            var spanRecords = this._spanRecords;
            var counters = this._counters;
            var internalLogs = this._internalLogs;

            // If the clock is not ready, do an "empty" flush to build more clock
            // samples before the real data is reported.
            // A detached flush (i.e. one intended to fire at exit or other "last
            // ditch effort" event) should always use the real data.
            if (this._useClockState && !manual && !clockReady && !detached) {
                this._debug('Flushing empty report to prime clock state');
                spanRecords = [];
                counters = {};
                internalLogs = [];
            } else {
                // Early out if we can.
                if (this._buffersAreEmpty()) {
                    this._debug('Skipping empty report');
                    return done(null);
                }

                // Clear the object buffers as the data is now in the local
                // variables
                this._clearBuffers();
                this._debug('Flushing report (' + spanRecords.length + ' spans)');
            }

            this._transport.ensureConnection(this._options);

            // Ensure the runtime GUID is set as it is possible buffer logs and
            // spans before the GUID is necessarily set.
            console.assert(this._runtimeGUID !== null, 'No runtime GUID for Tracer'); // eslint-disable-line no-console

            var timestampOffset = this._useClockState ? clockOffsetMicros : 0;
            var now = this._platform.nowMicros();
            var report = new _report_imp2.default(this._runtime, this._reportYoungestMicros, now, spanRecords, internalLogs, counters, timestampOffset);

            this.emit('prereport', report);
            var originMicros = this._platform.nowMicros();

            if (this._options.meta_event_reporting && !this._first_report_has_run) {
                var _tags4;

                this._first_report_has_run = true;
                this.startSpan(constants.LS_META_TRACER_CREATE, {
                    tags: (_tags4 = {}, _defineProperty(_tags4, constants.LS_META_EVENT_KEY, true), _defineProperty(_tags4, constants.LS_META_TRACER_GUID_KEY, this._runtimeGUID), _tags4)
                }).finish();
            }

            this._transport.report(detached, this._auth, report, function (err, res) {
                var destinationMicros = _this12._platform.nowMicros();
                var reportWindowSeconds = (now - report.oldest_micros) / 1e6;

                if (err) {
                    // How many errors in a row? Influences the report backoff.
                    _this12._reportErrorStreak++;

                    // On a failed report, re-enqueue the data that was going to be
                    // sent.
                    var errString = void 0;
                    if (err.message) {
                        errString = '' + err.message;
                    } else {
                        errString = '' + err;
                    }
                    _this12._warn('Error in report: ' + errString, {
                        last_report_seconds_ago: reportWindowSeconds
                    });

                    _this12._restoreRecords(report.getSpanRecords(), report.getInternalLogs(), report.getCounters());

                    // Increment the counter *after* the counters are restored
                    _this12._counters['reports.errors.send']++;

                    _this12._clearSpanRecordsIfMaxErrors();

                    _this12.emit('report_error', err, {
                        error: err,
                        streak: _this12._reportErrorStreak,
                        detached: detached
                    });
                } else {
                    if (_this12.verbosity() >= 4) {
                        _this12._debug('Report flushed for last ' + reportWindowSeconds + ' seconds', {
                            spans_reported: report.getSpanRecords().length
                        });
                    }

                    // Update internal data after the successful report
                    _this12._reportErrorStreak = 0;
                    _this12._reportYoungestMicros = now;

                    // Update the clock state if there's info from the report
                    if (res) {
                        if (res.timing && res.timing.receive_micros && res.timing.transmit_micros) {
                            // Handle thrift transport timing response.
                            _this12._clockState.addSample(originMicros, res.timing.receive_micros, res.timing.transmit_micros, destinationMicros);
                        } else if (res.receiveTimestamp && res.transmitTimestamp) {
                            // Handle protobuf transport timing response.
                            _this12._clockState.addSample(originMicros, res.receiveTimestamp.seconds * 1e6 + res.receiveTimestamp.nanos / 1e3, res.transmitTimestamp.seconds * 1e6 + res.transmitTimestamp.nanos / 1e3, destinationMicros);
                        } else {
                            // The response does not have timing information. Disable
                            // the clock state assuming there'll never be timing data
                            // to use.
                            _this12._useClockState = false;
                        }

                        if (res.errors && res.errors.length > 0) {
                            // Handle thrift errors.
                            _this12._warn('Errors in report', res.errors);
                        } else if (res.errorsList && res.errorsList.length > 0) {
                            // Handle protobuf errors.
                            _this12._warn('Errors in report', res.errorsList);
                        }

                        if (res.commandsList && res.commandsList.length > 0) {
                            // Handle both thrift and protobuf commands response.
                            if (res.commandsList[0].devMode && _this12.options().disable_meta_event_reporting !== true) {
                                _this12.options().meta_event_reporting = true;
                            }
                        }
                    } else {
                        _this12._useClockState = false;
                    }

                    _this12.emit('report', report, res);
                }
                return done(err);
            });
        }

        //-----------------------------------------------------------------------//
        // Stats and metrics
        //-----------------------------------------------------------------------//

        /**
         * Internal API that returns some internal metrics.
         */

    }, {
        key: 'stats',
        value: function stats() {
            return {
                counters: this._counters
            };
        }

        //-----------------------------------------------------------------------//
        // Internal logging & errors
        //-----------------------------------------------------------------------//
        // The rules for how internal logs are processed:
        //
        // * Internal logs that are included in the Collector report:
        //      - Always send errors logs along with the reports
        //      - Never include any other logs
        // * Internal logs that are echoed to the host application:
        //      - See the README.md :)
        //

    }, {
        key: '_debug',
        value: function _debug(msg, payload) {
            if (this.verbosity() < 4) {
                return;
            }
            this._options.logger('debug', msg, payload);
        }
    }, {
        key: '_info',
        value: function _info(msg, payload) {
            if (this.verbosity() < 3) {
                return;
            }
            this._options.logger('info', msg, payload);
        }
    }, {
        key: '_warn',
        value: function _warn(msg, payload) {
            this._counters['internal.warnings']++;

            if (this.verbosity() < 3) {
                return;
            }
            this._options.logger('warn', msg, payload);
        }
    }, {
        key: '_error',
        value: function _error(msg, payload) {
            this._counters['internal.errors']++;

            // Internal errors are always reported to the collector
            var record = this.log().level(constants.LOG_ERROR).message(msg).payload(payload).record();
            this._pushInternalLog(record);

            // Internal errors are reported to the host console conditionally based
            // on the verbosity level.
            var verbosity = this.verbosity();
            if (verbosity === 0) {
                return;
            }

            // Error messages are throttled in verbosity === 1 mode
            var now = Date.now();
            if (verbosity === 1) {
                var nextVisible = this._lastVisibleErrorMillis + this._options.error_throttle_millis;
                if (now < nextVisible) {
                    this._skippedVisibleErrors++;
                    return;
                }
                if (this._skippedVisibleErrors > 0) {
                    /* eslint-disable max-len */
                    var s = this._skippedVisibleErrors + ' errors masked since last logged error. Increase \'verbosity\' option to see all errors.';
                    /* eslint-enable max-len */
                    this._options.logger('error', s, payload);
                }
            }

            this._options.logger('error', msg, payload);
            this._lastVisibleErrorMillis = now;
            this._skippedVisibleErrors = 0;
        }
    }, {
        key: '_printToConsole',
        value: function _printToConsole(level, msg, payload) {
            var method = 'log';
            var message = '[LightStep:INFO] ' + msg;
            if (level === 'debug') {
                method = 'log';
                message = '[LightStep:DEBUG] ' + msg;
            } else if (level === 'info') {
                method = 'log';
                message = '[LightStep:INFO] ' + msg;
            } else if (level === 'warn') {
                method = 'warn';
                message = '[LightStep:WARN] ' + msg;
            } else if (level === 'error') {
                method = 'error';
                message = '[LightStep:ERROR] ' + msg;
            }

            // Internal option to silence intentional errors generated by the unit
            // tests.
            if (this._options.silent) {
                return;
            }

            if (payload !== undefined) {
                console[method](message, payload); // eslint-disable-line no-console
            } else {
                console[method](message); // eslint-disable-line no-console
            }
        }
    }, {
        key: '_pushInternalLog',
        value: function _pushInternalLog(record) {
            if (!record) {
                return;
            }
            if (this._internalLogs.length >= MAX_INTERNAL_LOGS) {
                record.message = 'MAX_INTERNAL_LOGS limit hit. Last error: ' + record.message;
                this._internalLogs[this._internalLogs.length - 1] = record;
            } else {
                this._internalLogs.push(record);
            }
        }
    }]);

    return Tracer;
}(opentracing.Tracer);

exports.default = Tracer;
module.exports = exports.default;

/***/ }),

/***/ "./src/imp/util/clock_state.js":
/*!*************************************!*\
  !*** ./src/imp/util/clock_state.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each2 = __webpack_require__(/*! ../../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// How many updates before a sample is considered old. This happens to
// be one less than the number of samples in our buffer but that's
// somewhat arbitrary.
var kMaxOffsetAge = 7;

var kStoredSamplesTTLMicros = 60 * 60 * 1000 * 1000; // 1 hour

var ClockState = function () {
    function ClockState(opts) {
        _classCallCheck(this, ClockState);

        this._nowMicros = opts.nowMicros;
        this._localStoreGet = opts.localStoreGet;
        this._localStoreSet = opts.localStoreSet;

        // The last eight samples, computed from timing information in
        // RPCs.
        this._samples = [];
        this._currentOffsetMicros = 0;

        // How many updates since we've updated currentOffsetMicros.
        this._currentOffsetAge = kMaxOffsetAge + 1;

        // Try to load samples from the local store.
        // Only use the data if it's recent.
        var storedData = this._localStoreGet();
        if (storedData && storedData.timestamp_micros && storedData.timestamp_micros > this._nowMicros() - kStoredSamplesTTLMicros) {
            // Make sure there are no more than (kMaxOffsetAge+1) elements
            this._samples = storedData.samples.slice(-(kMaxOffsetAge + 1));
        }
        // Update the current offset based on these data.
        this.update();
    }

    // Add a new timing sample and update the offset.


    _createClass(ClockState, [{
        key: 'addSample',
        value: function addSample(originMicros, receiveMicros, transmitMicros, destinationMicros) {
            var latestDelayMicros = Number.MAX_VALUE;
            var latestOffsetMicros = 0;
            // Ensure that all of the data are valid before using them. If
            // not, we'll push a {0, MAX} record into the queue.
            if (originMicros > 0 && receiveMicros > 0 && transmitMicros > 0 && destinationMicros > 0) {
                latestDelayMicros = destinationMicros - originMicros - (transmitMicros - receiveMicros);
                latestOffsetMicros = (receiveMicros - originMicros + (transmitMicros - destinationMicros)) / 2;
            }

            // Discard the oldest sample and push the new one.
            if (this._samples.length === kMaxOffsetAge + 1) {
                this._samples.shift();
            }
            this._samples.push({
                delayMicros: latestDelayMicros,
                offsetMicros: latestOffsetMicros
            });
            this._currentOffsetAge++;

            // Update the local store with this new sample.
            this._localStoreSet({
                timestamp_micros: this._nowMicros(),
                samples: this._samples
            });
            this.update();
        }

        // Update the time offset based on the current samples.

    }, {
        key: 'update',
        value: function update() {
            // This is simplified version of the clock filtering in Simple
            // NTP. It ignores precision and dispersion (frequency error). In
            // brief, it keeps the 8 (kMaxOffsetAge+1) most recent
            // delay-offset pairs, and considers the offset with the smallest
            // delay to be the best one. However, it only uses this new offset
            // if the change (relative to the last offset) is small compared
            // to the estimated error.
            //
            // See:
            // https://tools.ietf.org/html/rfc5905#appendix-A.5.2
            // http://books.google.com/books?id=pdTcJBfnbq8C
            //   esp. section 3.5
            // http://www.eecis.udel.edu/~mills/ntp/html/filter.html
            // http://www.eecis.udel.edu/~mills/database/brief/algor/algor.pdf
            // http://www.eecis.udel.edu/~mills/ntp/html/stats.html

            // TODO: Consider huff-n'-puff if the delays are highly asymmetric.
            // http://www.eecis.udel.edu/~mills/ntp/html/huffpuff.html

            // Find the sample with the smallest delay; the corresponding
            // offset is the "best" one.
            var minDelayMicros = Number.MAX_VALUE;
            var bestOffsetMicros = 0;
            (0, _each3.default)(this._samples, function (sample) {
                if (sample.delayMicros < minDelayMicros) {
                    minDelayMicros = sample.delayMicros;
                    bestOffsetMicros = sample.offsetMicros;
                }
            });

            // No update.
            if (bestOffsetMicros === this._currentOffsetMicros) {
                return;
            }

            // Now compute the jitter, i.e. the error relative to the new
            // offset were we to use it.
            var jitter = 0;
            (0, _each3.default)(this._samples, function (sample) {
                // eslint-disable-next-line no-restricted-properties
                jitter += Math.pow(bestOffsetMicros - sample.offsetMicros, 2);
            });
            jitter = Math.sqrt(jitter / this._samples.length);

            // Ignore spikes: only use the new offset if the change is not too
            // large... unless the current offset is too old. The "too old"
            // condition is also triggered when update() is called from the
            // constructor.
            var kSGATE = 3; // See RFC 5905
            if (this._currentOffsetAge > kMaxOffsetAge || Math.abs(this._currentOffsetMicros - bestOffsetMicros) < kSGATE * jitter) {
                this._currentOffsetMicros = bestOffsetMicros;
                this._currentOffsetAge = 0;
            }
        }

        // Returns the difference in microseconds between the server's clock
        // and our clock. This should be added to any local timestamps before
        // sending them to the server. Note that a negative offset means that
        // the local clock is ahead of the server's.

    }, {
        key: 'offsetMicros',
        value: function offsetMicros() {
            return Math.floor(this._currentOffsetMicros);
        }

        // Returns true if we've performed enough measurements to be confident
        // in the current offset.

    }, {
        key: 'isReady',
        value: function isReady() {
            return this._samples.length > 3;
        }
    }, {
        key: 'activeSampleCount',
        value: function activeSampleCount() {
            return this._samples.length;
        }
    }]);

    return ClockState;
}();

module.exports = ClockState;

/***/ }),

/***/ "./src/imp/util/util.js":
/*!******************************!*\
  !*** ./src/imp/util/util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var converter = __webpack_require__(/*! hex2dec */ "./node_modules/hex2dec/index.js");

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, [{
        key: 'detachedTimeout',

        // Similar to a regular setTimeout() call, but dereferences the timer so the
        // program execution will not be held up by this timer.
        value: function detachedTimeout(callback, delay) {
            var timer = setTimeout(callback, delay);
            if (timer.unref) {
                timer.unref();
            }
            return timer;
        }
    }, {
        key: 'shouldSendMetaSpan',
        value: function shouldSendMetaSpan(opts, tags) {
            var shouldSendSpan = opts.meta_event_reporting === true && tags['lightstep.meta_event'] !== true;
            return shouldSendSpan;
        }

        // Use native BigInt if available. Native BigInt has a significant
        // performance improvement over hex2dec

    }, {
        key: 'hexToDec',
        value: function hexToDec(hexString) {
            if (typeof global.BigInt !== 'function') {
                return converter.hexToDec(hexString);
            }

            // eslint-ignore-line
            return global.BigInt('0x' + hexString).toString(10);
        }
    }]);

    return Util;
}();

exports.default = new Util();
module.exports = exports.default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/lib.js":
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tracer_imp = __webpack_require__(/*! ./imp/tracer_imp */ "./src/imp/tracer_imp.js");

var _tracer_imp2 = _interopRequireDefault(_tracer_imp);

var _propagator_ls = __webpack_require__(/*! ./imp/propagator_ls */ "./src/imp/propagator_ls.js");

var _propagator_ls2 = _interopRequireDefault(_propagator_ls);

var _propagator_b = __webpack_require__(/*! ./imp/propagator_b3 */ "./src/imp/propagator_b3.js");

var _propagator_b2 = _interopRequireDefault(_propagator_b);

var _propagator_dd = __webpack_require__(/*! ./imp/propagator_dd */ "./src/imp/propagator_dd.js");

var _propagator_dd2 = _interopRequireDefault(_propagator_dd);

var _span_context_imp = __webpack_require__(/*! ./imp/span_context_imp */ "./src/imp/span_context_imp.js");

var _span_context_imp2 = _interopRequireDefault(_span_context_imp);

var _platform_abstraction_layer = __webpack_require__(/*! ./platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var library = {
    Tracer: _tracer_imp2.default,
    LightStepPropagator: _propagator_ls2.default,
    B3Propagator: _propagator_b2.default,
    DDPropagator: _propagator_dd2.default,
    SpanContext: _span_context_imp2.default
};

_platform_abstraction_layer.Platform.initLibrary(library);
module.exports = library;

/***/ }),

/***/ "./src/platform_abstraction_layer.js":
/*!*******************************************!*\
  !*** ./src/platform_abstraction_layer.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global PLATFORM_BROWSER */

// Hide the differences in how the Thrift compiler generates code for the
// different platforms as well as expose a Platform class to abstract a few
// general differences in the platforms.
if (true) {
    module.exports = {
        Platform: __webpack_require__(/*! ./imp/platform/browser/platform_browser.js */ "./src/imp/platform/browser/platform_browser.js"),
        ThriftTransport: __webpack_require__(/*! ./imp/platform/browser/transport_httpthrift.js */ "./src/imp/platform/browser/transport_httpthrift.js"),
        ProtoTransport: __webpack_require__(/*! ./imp/platform/browser/transport_httpproto.js */ "./src/imp/platform/browser/transport_httpproto.js"),
        thrift: __webpack_require__(/*! ./imp/platform/browser/thrift.js */ "./src/imp/platform/browser/thrift.js"),
        crouton_thrift: __webpack_require__(/*! ./imp/platform/browser/crouton_thrift.js */ "./src/imp/platform/browser/crouton_thrift.js"),
        proto: __webpack_require__(/*! ./imp/generated_proto/collector_pb.js */ "./src/imp/generated_proto/collector_pb.js")
    };
} else {}

/***/ }),

/***/ "./src/plugins/instrument_document_load.js":
/*!*************************************************!*\
  !*** ./src/plugins/instrument_document_load.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InstrumentPageLoad = function () {
    function InstrumentPageLoad() {
        _classCallCheck(this, InstrumentPageLoad);

        this._inited = false;
        this._span = null;
    }

    _createClass(InstrumentPageLoad, [{
        key: 'name',
        value: function name() {
            return 'instrument_page_load';
        }
    }, {
        key: 'addOptions',
        value: function addOptions(tracerImp) {
            tracerImp.addOption('instrument_page_load', { type: 'bool', defaultValue: false });
        }
    }, {
        key: 'start',
        value: function start(tracerImp) {
            if (this._inited) {
                return;
            }
            this._inited = true;

            if (typeof window !== 'object' || typeof document !== 'object') {
                return;
            }

            var currentOptions = tracerImp.options();
            if (currentOptions.instrument_page_load) {
                this._ensureSpanStarted(tracerImp);
                document.addEventListener('readystatechange', this._handleReadyStateChange.bind(this));
            }
        }
    }, {
        key: 'stop',
        value: function stop() {}
    }, {
        key: '_ensureSpanStarted',
        value: function _ensureSpanStarted(tracerImp) {
            if (!this._span) {
                this._span = tracerImp.startSpan('document/load');
                tracerImp.addActiveRootSpan(this._span);
            }
        }
    }, {
        key: '_handleReadyStateChange',
        value: function _handleReadyStateChange() {
            if (!this._span) {
                return;
            }

            var span = this._span;
            var state = document.readyState;
            var payload = void 0;
            if (state === 'complete') {
                payload = {};
                if (window.performance && performance.timing) {
                    this._addTimingSpans(span, performance.timing);
                    payload['window.performance.timing'] = performance.timing;
                }
            }

            span.logEvent('document.readystatechange ' + state, payload);

            if (state === 'complete') {
                if (span.tracer()) {
                    span.tracer().removeActiveRootSpan(span.tracer());
                }
                span.finish();
            }
        }
    }, {
        key: '_copyNavigatorProperties',
        value: function _copyNavigatorProperties(nav) {
            var dst = {};
            for (var key in nav) {
                // eslint-disable-line guard-for-in, no-restricted-syntax
                try {
                    var value = nav[key];
                    switch (key) {
                        case 'plugins':
                            {
                                var p = [];
                                for (var i = 0; i < value.length; i++) {
                                    var item = value.item(i);
                                    p.push({
                                        name: item.name,
                                        description: item.description
                                    });
                                }
                                dst[key] = p;
                            }break;

                        case 'mimeTypes':
                            {
                                var _p = [];
                                for (var _i = 0; _i < value.length; _i++) {
                                    var _item = value.item(_i);
                                    _p.push({
                                        type: _item.type,
                                        description: _item.description,
                                        suffixes: _item.suffixes
                                    });
                                }
                                dst[key] = _p;
                            }break;

                        default:
                            dst[key] = value;
                            break;
                    }
                } catch (e) {
                    // Skip, just in case
                }
            }
            return dst;
        }

        // Retroactively create the appropriate spans and logs

    }, {
        key: '_addTimingSpans',
        value: function _addTimingSpans(parentImp, timing) {
            var _this = this;

            // NOTE: this currently relies on LightStep-specific APIs
            if (!parentImp) {
                return;
            }

            parentImp.setTag('user_agent', navigator.userAgent);

            (0, _each3.default)(timing, function (value, key) {
                // e.g. secureConnectionStart is not always set
                if (typeof value !== 'number' || value === 0) {
                    return;
                }

                var payload = void 0;

                if (key === 'navigationStart' && typeof navigator === 'object') {
                    payload = {
                        navigator: _this._copyNavigatorProperties(navigator)
                    };
                }
                parentImp.log({
                    message: 'document ' + key,
                    payload: payload
                }, value);
            });

            parentImp.setBeginMicros(timing.navigationStart * 1000.0);

            parentImp.tracer().startSpan('document/time_to_first_byte', { childOf: parentImp }).setBeginMicros(timing.requestStart * 1000.0).setEndMicros(timing.responseStart * 1000.0).finish();
            parentImp.tracer().startSpan('document/response_transfer', { childOf: parentImp }).setBeginMicros(timing.responseStart * 1000.0).setEndMicros(timing.responseEnd * 1000.0).finish();
            parentImp.tracer().startSpan('document/dom_load', { childOf: parentImp }).setBeginMicros(timing.domLoading * 1000.0).setEndMicros(timing.domInteractive * 1000.0).finish();
        }
    }]);

    return InstrumentPageLoad;
}();

module.exports = new InstrumentPageLoad();

/***/ }),

/***/ "./src/plugins/instrument_fetch.js":
/*!*****************************************!*\
  !*** ./src/plugins/instrument_fetch.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _opentracing = __webpack_require__(/*! opentracing */ "./node_modules/opentracing/lib/index.js");

var opentracing = _interopRequireWildcard(_opentracing);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Capture the proxied values on script load (i.e. ASAP) in case there are
// multiple layers of instrumentation.
var proxiedFetch = void 0;
if (typeof window === 'object' && typeof window.fetch !== 'undefined') {
    proxiedFetch = window.fetch;
}

function getCookies() {
    if (typeof document === 'undefined' || !document.cookie) {
        return null;
    }
    var cookies = document.cookie.split(';');
    var data = {};
    var count = 0;
    for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=', 2);
        if (parts.length === 2) {
            var key = parts[0].replace(/^\s+/, '').replace(/\s+$/, '');
            data[key] = decodeURIComponent(parts[1]);
            try {
                data[key] = JSON.parse(data[key]);
            } catch (_ignored) {/* Ignored */}
            count++;
        }
    }
    if (count > 0) {
        return data;
    }
    return null;
}

// Normalize the getAllResponseHeaders output
function getResponseHeaders(response) {
    var result = {};
    var entries = response.headers.entries();
    for (var i = 0; i < entries.length; i++) {
        var pair = entries[i];

        var _pair = _slicedToArray(pair, 2);

        var key = _pair[0];
        var val = _pair[1];

        result[key] = val;
    }
    return result;
}

// Automatically create spans for all requests made via window.fetch.
//
// NOTE: this code currently works only with a single Tracer.
//

var InstrumentFetch = function () {
    function InstrumentFetch() {
        _classCallCheck(this, InstrumentFetch);

        this._enabled = this._isValidContext();
        this._proxyInited = false;
        this._internalExclusions = [];
        this._tracer = null;
        this._handleOptions = this._handleOptions.bind(this);
    }

    _createClass(InstrumentFetch, [{
        key: 'name',
        value: function name() {
            return 'instrument_fetch';
        }
    }, {
        key: 'addOptions',
        value: function addOptions(tracerImp) {
            tracerImp.addOption('fetch_instrumentation', { type: 'bool', defaultValue: false });
            tracerImp.addOption('fetch_url_inclusion_patterns', { type: 'array', defaultValue: [/.*/] });
            tracerImp.addOption('fetch_url_exclusion_patterns', { type: 'array', defaultValue: [] });
            tracerImp.addOption('fetch_url_header_inclusion_patterns', { type: 'array', defaultValue: [/.*/] });
            tracerImp.addOption('fetch_url_header_exclusion_patterns', { type: 'array', defaultValue: [] });
            tracerImp.addOption('include_cookies', { type: 'bool', defaultValue: true });
        }
    }, {
        key: 'start',
        value: function start(tracerImp) {
            if (!this._enabled) {
                return;
            }
            this._tracer = tracerImp;

            var currentOptions = tracerImp.options();
            this._addServiceHostToExclusions(currentOptions);
            this._handleOptions({}, currentOptions);
            tracerImp.on('options', this._handleOptions);
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (!this._enabled) {
                return;
            }
            window.fetch = proxiedFetch;
        }

        /**
         * Respond to options changes on the Tracer.
         *
         * Note that `modified` is the options that have changed in this call,
         * along with their previous and new values. `current` is the full set of
         * current options *including* the newly modified values.
         */

    }, {
        key: '_handleOptions',
        value: function _handleOptions(modified, current) {
            // Automatically add the service host itself to the list of exclusions
            // to avoid reporting on the reports themselves
            var serviceHost = modified.collector_host;
            if (serviceHost) {
                this._addServiceHostToExclusions(current);
            }

            // Set up the proxied fetch calls unless disabled
            if (!this._proxyInited && current.fetch_instrumentation) {
                this._proxyInited = true;
                window.fetch = this._instrumentFetch();
            }
        }

        /**
         * Ensure that the reports to the collector don't get instrumented as well,
         * as that recursive instrumentation is more confusing than valuable!
         */

    }, {
        key: '_addServiceHostToExclusions',
        value: function _addServiceHostToExclusions(opts) {
            if (opts.collector_host.length === 0) {
                return;
            }

            // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
            function escapeRegExp(str) {
                return ('' + str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }

            // Check against the hostname without the port as well as the canonicalized
            // URL may drop the standard port.
            var host = escapeRegExp(opts.collector_host);
            var port = escapeRegExp(opts.collector_port);
            var set = [new RegExp('^https?://' + host + ':' + port)];
            if (port === '80') {
                set.push(new RegExp('^http://' + host));
            } else if (port === '443') {
                set.push(new RegExp('^https://' + host));
            }
            this._internalExclusions = set;
        }

        /**
         * Check preconditions for the auto-instrumentation of fetch to work properly.
         * There are a lot of potential JavaScript platforms.
         */

    }, {
        key: '_isValidContext',
        value: function _isValidContext() {
            if (typeof window === 'undefined') {
                return false;
            }
            if (!window.fetch) {
                return false;
            }
            return true;
        }
    }, {
        key: '_instrumentFetch',
        value: function _instrumentFetch() {
            var self = this;
            var tracer = this._tracer;

            return function (input, init) {
                var request = new Request(input, init);
                var opts = tracer.options();

                if (!self._shouldTrace(tracer, request.url)) {
                    // eslint-disable-next-line prefer-spread
                    return proxiedFetch(request);
                }

                var span = tracer.startSpan('fetch');
                tracer.addActiveRootSpan(span);

                var parsed = new URL(request.url);
                var tags = {
                    method: request.method,
                    url: request.url,

                    // NOTE: Purposefully excluding username:password from tags.
                    // TODO: consider sanitizing URL to mask / remove that information from the trace in general
                    hash: parsed.hash,
                    href: parsed.href,
                    protocol: parsed.protocol,
                    origin: parsed.origin,
                    host: parsed.host,
                    hostname: parsed.hostname,
                    port: parsed.port,
                    pathname: parsed.pathname,
                    search: parsed.search
                };
                if (opts.include_cookies) {
                    tags.cookies = getCookies();
                }

                // Add Open-Tracing headers
                if (self._shouldAddHeadersToRequest(tracer, request.url)) {
                    var headersCarrier = {};
                    tracer.inject(span.context(), opentracing.FORMAT_HTTP_HEADERS, headersCarrier);
                    Object.keys(headersCarrier).forEach(function (key) {
                        if (!request.headers.get(key)) request.headers.set(key, headersCarrier[key]);
                    });
                }
                span.log({
                    event: 'sending',
                    method: request.method,
                    url: request.url,
                    openPayload: tags
                });
                span.addTags(tags);

                return proxiedFetch(request).then(function (response) {
                    if (!response.ok) {
                        span.addTags({ error: true });
                    }
                    span.log({
                        method: request.method,
                        headers: getResponseHeaders(response),
                        status: response.status,
                        statusText: response.statusText,
                        responseType: response.type,
                        url: response.url
                    });
                    tracer.removeActiveRootSpan(span);
                    span.finish();
                    return response;
                }).catch(function (e) {
                    span.addTags({ error: true });
                    tracer.removeActiveRootSpan(span);
                    span.log({
                        event: 'error',
                        error: e
                    });
                    span.finish();
                    throw e;
                });
            };
        }
    }, {
        key: '_shouldTrace',
        value: function _shouldTrace(tracer, url) {
            // This shouldn't be possible, but let's be paranoid
            if (!tracer || !url) {
                return false;
            }

            var opts = tracer.options();
            if (opts.disabled) {
                return false;
            }

            if (this._internalExclusions.some(function (ex) {
                return ex.test(url);
            })) {
                return false;
            }

            if (opts.fetch_url_exclusion_patterns.some(function (ex) {
                return ex.test(url);
            })) {
                return false;
            }
            if (opts.fetch_url_inclusion_patterns.some(function (inc) {
                return inc.test(url);
            })) {
                return true;
            }
            return false;
        }
    }, {
        key: '_shouldAddHeadersToRequest',
        value: function _shouldAddHeadersToRequest(tracer, url) {
            // This shouldn't be possible, but let's be paranoid
            if (!tracer || !url) {
                return false;
            }

            var opts = tracer.options();
            if (opts.disabled) {
                return false;
            }

            if (opts.fetch_url_header_exclusion_patterns.some(function (ex) {
                return ex.test(url);
            })) {
                return false;
            }
            if (opts.fetch_url_header_inclusion_patterns.some(function (inc) {
                return inc.test(url);
            })) {
                return true;
            }
            return false;
        }
    }]);

    return InstrumentFetch;
}();

module.exports = new InstrumentFetch();

/***/ }),

/***/ "./src/plugins/instrument_xhr.js":
/*!***************************************!*\
  !*** ./src/plugins/instrument_xhr.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _opentracing = __webpack_require__(/*! opentracing */ "./node_modules/opentracing/lib/index.js");

var opentracing = _interopRequireWildcard(_opentracing);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Capture the proxied values on script load (i.e. ASAP) in case there are
// multiple layers of instrumentation.
var proxied = {};
if (typeof window === 'object' && typeof window.XMLHttpRequest !== 'undefined') {
    proxied = {
        XMLHttpRequest: XMLHttpRequest,
        open: XMLHttpRequest.prototype.open,
        send: XMLHttpRequest.prototype.send,
        setRequestHeader: XMLHttpRequest.prototype.setRequestHeader
    };
}

function getCookies() {
    if (typeof document === 'undefined' || !document.cookie) {
        return null;
    }
    var cookies = document.cookie.split(';');
    var data = {};
    var count = 0;
    for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=', 2);
        if (parts.length === 2) {
            var key = parts[0].replace(/^\s+/, '').replace(/\s+$/, '');
            data[key] = decodeURIComponent(parts[1]);
            try {
                data[key] = JSON.parse(data[key]);
            } catch (_ignored) {/* Ignored */}
            count++;
        }
    }
    if (count > 0) {
        return data;
    }
    return null;
}

// Normalize the getAllResponseHeaders output
function getResponseHeaders(xhr) {
    var raw = xhr.getAllResponseHeaders();
    var parts = raw.replace(/\s+$/, '').split(/\n/);
    for (var i = 0; i < parts.length; i++) {
        parts[i] = parts[i].replace(/\r/g, '').replace(/^\s+/, '').replace(/\s+$/, '');
    }
    return parts;
}

// Automatically create spans for all XMLHttpRequest objects.
//
// NOTE: this code currently works only with a single Tracer.
//

var InstrumentXHR = function () {
    function InstrumentXHR() {
        _classCallCheck(this, InstrumentXHR);

        this._enabled = this._isValidContext();
        this._proxyInited = false;
        this._internalExclusions = [];
        this._tracer = null;
        this._handleOptions = this._handleOptions.bind(this);
    }

    _createClass(InstrumentXHR, [{
        key: 'name',
        value: function name() {
            return 'instrument_xhr';
        }
    }, {
        key: 'addOptions',
        value: function addOptions(tracerImp) {
            tracerImp.addOption('xhr_instrumentation', { type: 'bool', defaultValue: false });
            tracerImp.addOption('xhr_url_inclusion_patterns', { type: 'array', defaultValue: [/.*/] });
            tracerImp.addOption('xhr_url_exclusion_patterns', { type: 'array', defaultValue: [] });
            tracerImp.addOption('xhr_url_header_inclusion_patterns', { type: 'array', defaultValue: [/.*/] });
            tracerImp.addOption('xhr_url_header_exclusion_patterns', { type: 'array', defaultValue: [] });
            tracerImp.addOption('include_cookies', { type: 'bool', defaultValue: true });
        }
    }, {
        key: 'start',
        value: function start(tracerImp) {
            if (!this._enabled) {
                return;
            }
            this._tracer = tracerImp;

            var currentOptions = tracerImp.options();
            this._addServiceHostToExclusions(currentOptions);
            this._handleOptions({}, currentOptions);
            tracerImp.on('options', this._handleOptions);
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (!this._enabled) {
                return;
            }
            var proto = proxied.XMLHttpRequest.prototype;
            proto.open = proxied.open;
            proto.send = proxied.send;
        }

        /**
         * Respond to options changes on the Tracer.
         *
         * Note that `modified` is the options that have changed in this call,
         * along with their previous and new values. `current` is the full set of
         * current options *including* the newly modified values.
         */

    }, {
        key: '_handleOptions',
        value: function _handleOptions(modified, current) {
            // Automatically add the service host itself to the list of exclusions
            // to avoid reporting on the reports themselves
            var serviceHost = modified.collector_host;
            if (serviceHost) {
                this._addServiceHostToExclusions(current);
            }

            // Set up the proxied XHR calls unless disabled
            if (!this._proxyInited && current.xhr_instrumentation) {
                this._proxyInited = true;
                var proto = proxied.XMLHttpRequest.prototype;
                proto.setRequestHeader = this._instrumentSetRequestHeader();
                proto.open = this._instrumentOpen();
                proto.send = this._instrumentSend();
            }
        }

        /**
         * Ensure that the reports to the collector don't get instrumented as well,
         * as that recursive instrumentation is more confusing than valuable!
         */

    }, {
        key: '_addServiceHostToExclusions',
        value: function _addServiceHostToExclusions(opts) {
            if (opts.collector_host.length === 0) {
                return;
            }

            // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
            function escapeRegExp(str) {
                return ('' + str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }

            // Check against the hostname without the port as well as the canonicalized
            // URL may drop the standard port.
            var host = escapeRegExp(opts.collector_host);
            var port = escapeRegExp(opts.collector_port);
            var set = [new RegExp('^https?://' + host + ':' + port)];
            if (port === '80') {
                set.push(new RegExp('^http://' + host));
            } else if (port === '443') {
                set.push(new RegExp('^https://' + host));
            }
            this._internalExclusions = set;
        }

        /**
         * Check preconditions for the auto-instrumentation of XHRs to work properly.
         * There are a lot of potential JavaScript platforms.
         */

    }, {
        key: '_isValidContext',
        value: function _isValidContext() {
            if (typeof window === 'undefined') {
                return false;
            }
            if (!window.XMLHttpRequest) {
                return false;
            }
            if (!window.XMLHttpRequest.prototype) {
                return false;
            }
            return true;
        }
    }, {
        key: '_instrumentSetRequestHeader',
        value: function _instrumentSetRequestHeader() {
            return function (header, value) {
                this.__requestHeaders = this.__requestHeaders || {};
                this.__requestHeaders[header] = value;
                return proxied.setRequestHeader.apply(this, arguments);
            };
        }
    }, {
        key: '_instrumentOpen',
        value: function _instrumentOpen() {
            var self = this;
            var tracer = this._tracer;

            return function (method, url, asyncArg, user, password) {
                if (!self._shouldTrace(tracer, this, url)) {
                    return proxied.open.apply(this, arguments);
                }
                var opts = tracer.options();

                var span = tracer.startSpan('XMLHttpRequest');
                tracer.addActiveRootSpan(span);
                this.__tracer_span = span;
                this.__tracer_url = url;

                var tags = {
                    method: method,
                    url: url,
                    async: asyncArg,
                    user: user
                };
                if (url) {
                    // eslint-disable-next-line prefer-destructuring
                    tags.url_pathname = url.split('?')[0];
                }

                var openPayload = _extends({}, tags);
                if (opts.include_cookies) {
                    openPayload.cookies = getCookies();
                }

                // Note: async defaults to true
                var async = asyncArg === undefined ? true : asyncArg;
                if (async) {
                    this.addEventListener('readystatechange', function () {
                        if (this.readyState === 0) {
                            span.log({
                                readyState: 0,
                                event: 'unsent'
                            });
                        } else if (this.readyState === 1) {
                            span.log({
                                readyState: 1,
                                event: 'sending'
                            });
                        } else if (this.readyState === 2) {
                            span.log({
                                readyState: 2,
                                event: 'headers received',
                                method: method,
                                url: url,
                                openPayload: openPayload,
                                headers: getResponseHeaders(this)
                            });
                            span.addTags(tags);
                        } else if (this.readyState === 3) {
                            span.log({
                                readyState: 3,
                                event: 'loading'
                            });
                        } else if (this.readyState === 4) {
                            var responseType = this.responseType;

                            span.log({
                                readyState: 4,
                                url: url,
                                method: method,
                                headers: getResponseHeaders(this),
                                status: this.status,
                                statusText: this.statusText,
                                responseType: responseType
                            });
                            tracer.removeActiveRootSpan(span);
                            span.finish();
                        } else {
                            span.log({
                                readyState: this.readyState
                            });
                        }
                    });
                }

                var result = proxied.open.apply(this, arguments);
                if (!async) {
                    tracer.removeActiveRootSpan(span);
                    span.finish();
                }
                return result;
            };
        }
    }, {
        key: '_instrumentSend',
        value: function _instrumentSend() {
            var self = this;
            var tracer = this._tracer;
            return function () {
                var _this = this;

                if (!self._shouldTrace(tracer, this, this.__tracer_url)) {
                    return proxied.send.apply(this, arguments);
                }

                var span = this.__tracer_span;
                if (!span) {
                    return proxied.send.apply(this, arguments);
                }

                var data = Array.prototype.slice.call(arguments);
                var len = void 0;
                if (data.length === 1) {
                    if (data[0] && data[0].length) {
                        len = data[0].length;
                    }
                    try {
                        data = JSON.parse(data[0]);
                    } catch (e) {
                        // Ignore the error
                    }
                }
                var lenStr = len === undefined ? '' : ', data length=' + len;
                span.log({
                    event: 'send',
                    data_length: lenStr
                });

                // Add Open-Tracing headers
                if (self._shouldAddHeadersToRequest(tracer, this.__tracer_url)) {
                    var headersCarrier = {};
                    tracer.inject(span.context(), opentracing.FORMAT_HTTP_HEADERS, headersCarrier);
                    var keys = Object.keys(headersCarrier);
                    keys.forEach(function (key) {
                        proxied.setRequestHeader.call(_this, key, headersCarrier[key]);
                    });
                }

                return proxied.send.apply(this, arguments);
            };
        }
    }, {
        key: '_shouldTrace',
        value: function _shouldTrace(tracer, xhr, url) {
            // This shouldn't be possible, but let's be paranoid
            if (!tracer || !url) {
                return false;
            }

            var opts = tracer.options();
            if (opts.disabled) {
                return false;
            }

            if (this._internalExclusions.some(function (ex) {
                return ex.test(url);
            })) {
                return false;
            }

            if (opts.xhr_url_exclusion_patterns.some(function (ex) {
                return ex.test(url);
            })) {
                return false;
            }
            if (opts.xhr_url_inclusion_patterns.some(function (inc) {
                return inc.test(url);
            })) {
                return true;
            }
            return false;
        }
    }, {
        key: '_shouldAddHeadersToRequest',
        value: function _shouldAddHeadersToRequest(tracer, url) {
            // This shouldn't be possible, but let's be paranoid
            if (!tracer || !url) {
                return false;
            }

            var opts = tracer.options();
            if (opts.disabled) {
                return false;
            }

            if (opts.xhr_url_header_exclusion_patterns.some(function (ex) {
                return ex.test(url);
            })) {
                return false;
            }
            if (opts.xhr_url_header_inclusion_patterns.some(function (inc) {
                return inc.test(url);
            })) {
                return true;
            }
            return false;
        }
    }]);

    return InstrumentXHR;
}();

module.exports = new InstrumentXHR();

/***/ }),

/***/ "./src/plugins/log_to_console.js":
/*!***************************************!*\
  !*** ./src/plugins/log_to_console.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constants = __webpack_require__(/*! ../constants */ "./src/constants.js");

var LogToConsole = function () {
    function LogToConsole() {
        _classCallCheck(this, LogToConsole);

        this._enabled = false;
        this._tracer = null;
        this._optionsCb = this._handleOptions.bind(this);
        this._logAddedCb = this._handleLogAdded.bind(this);
    }

    _createClass(LogToConsole, [{
        key: 'name',
        value: function name() {
            return 'log_to_console';
        }
    }, {
        key: 'addOptions',
        value: function addOptions(tracerImp) {
            tracerImp.addOption('log_to_console', {
                type: 'bool',
                defaultValue: false
            });
            tracerImp.on('options', this._optionsCb);
        }
    }, {
        key: 'start',
        value: function start(tracer, tracerImp) {
            this._tracer = tracer;
        }
    }, {
        key: 'stop',
        value: function stop() {
            this._tracer.removeListener('options', this._optionsCb);
        }
    }, {
        key: '_handleOptions',
        value: function _handleOptions(modified, current, tracerImp) {
            var enabled = current.log_to_console;
            if (this._enabled === enabled) {
                return;
            }
            this._enabled = enabled;
            if (this._enabled) {
                tracerImp.on('log_added', this._logAddedCb);
            } else {
                tracerImp.removeListener('log_added', this._logAddedCb);
            }
        }
    }, {
        key: '_handleLogAdded',
        value: function _handleLogAdded(record) {
            var level = constants.LOG_STRING_TO_LEVEL[record.level];
            var message = record.message;

            // Ignore records without a message (e.g. a stable_name log record)

            if (!message) {
                return;
            }

            var payload = record.payload_json;
            if (payload) {
                try {
                    payload = JSON.parse(payload);
                } catch (_ignored) {/* ignored */}
            }

            switch (level) {
                case constants.LOG_ERROR:
                case constants.LOG_FATAL:
                    if (payload !== undefined) {
                        console.error(message, payload); // eslint-disable-line no-console
                    } else {
                        console.error(message); // eslint-disable-line no-console
                    }
                    break;
                case constants.LOG_WARN:
                    if (payload !== undefined) {
                        console.warn(message, payload); // eslint-disable-line no-console
                    } else {
                        console.warn(message); // eslint-disable-line no-console
                    }
                    break;
                case constants.LOG_INFO:
                default:
                    if (payload !== undefined) {
                        console.log(message, payload); // eslint-disable-line no-console
                    } else {
                        console.log(message); // eslint-disable-line no-console
                    }
                    break;
            }
        }
    }]);

    return LogToConsole;
}();

module.exports = new LogToConsole();

/***/ })

/******/ });
});
//# sourceMappingURL=lightstep-tracer.js.map