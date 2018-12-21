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

/***/ "./node_modules/@protobufjs/aspromise/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@protobufjs/aspromise/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),

/***/ "./node_modules/@protobufjs/base64/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@protobufjs/base64/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),

/***/ "./node_modules/@protobufjs/eventemitter/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@protobufjs/eventemitter/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),

/***/ "./node_modules/@protobufjs/float/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@protobufjs/float/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),

/***/ "./node_modules/@protobufjs/inquire/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@protobufjs/inquire/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),

/***/ "./node_modules/@protobufjs/pool/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/pool/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),

/***/ "./node_modules/@protobufjs/utf8/index.js":
/*!************************************************!*\
  !*** ./node_modules/@protobufjs/utf8/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
        // NOTE: the call is normalized to a call to _addTags()
        this._addTags((_a = {}, _a[key] = value, _a));
        return this;
        var _a;
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

/***/ "./node_modules/protobufjs/minimal.js":
/*!********************************************!*\
  !*** ./node_modules/protobufjs/minimal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// minimal library entry point.


module.exports = __webpack_require__(/*! ./src/index-minimal */ "./node_modules/protobufjs/src/index-minimal.js");


/***/ }),

/***/ "./node_modules/protobufjs/src/index-minimal.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/index-minimal.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js");
protobuf.BufferWriter = __webpack_require__(/*! ./writer_buffer */ "./node_modules/protobufjs/src/writer_buffer.js");
protobuf.Reader       = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js");
protobuf.BufferReader = __webpack_require__(/*! ./reader_buffer */ "./node_modules/protobufjs/src/reader_buffer.js");

// Utility
protobuf.util         = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");
protobuf.rpc          = __webpack_require__(/*! ./rpc */ "./node_modules/protobufjs/src/rpc.js");
protobuf.roots        = __webpack_require__(/*! ./roots */ "./node_modules/protobufjs/src/roots.js");
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.Reader._configure(protobuf.BufferReader);
    protobuf.util._configure();
}

// Set up buffer utility according to the environment
protobuf.Writer._configure(protobuf.BufferWriter);
configure();


/***/ }),

/***/ "./node_modules/protobufjs/src/reader.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/reader.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Reader;

var util      = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = util.Buffer
    ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
            return util.Buffer.isBuffer(buffer)
                ? new BufferReader(buffer)
                /* istanbul ignore next */
                : create_array(buffer);
        })(buffer);
    }
    /* istanbul ignore next */
    : create_array;

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),

/***/ "./node_modules/protobufjs/src/reader_buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/reader_buffer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __webpack_require__(/*! ./reader */ "./node_modules/protobufjs/src/reader.js");
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

/* istanbul ignore else */
if (util.Buffer)
    BufferReader.prototype._slice = util.Buffer.prototype.slice;

/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */


/***/ }),

/***/ "./node_modules/protobufjs/src/roots.js":
/*!**********************************************!*\
  !*** ./node_modules/protobufjs/src/roots.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),

/***/ "./node_modules/protobufjs/src/rpc.js":
/*!********************************************!*\
  !*** ./node_modules/protobufjs/src/rpc.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __webpack_require__(/*! ./rpc/service */ "./node_modules/protobufjs/src/rpc/service.js");


/***/ }),

/***/ "./node_modules/protobufjs/src/rpc/service.js":
/*!****************************************************!*\
  !*** ./node_modules/protobufjs/src/rpc/service.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

var util = __webpack_require__(/*! ../util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/util/longbits.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/util/longbits.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = LongBits;

var util = __webpack_require__(/*! ../util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/util/minimal.js":
/*!*****************************************************!*\
  !*** ./node_modules/protobufjs/src/util/minimal.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(/*! @protobufjs/aspromise */ "./node_modules/@protobufjs/aspromise/index.js");

// converts to / from base64 encoded strings
util.base64 = __webpack_require__(/*! @protobufjs/base64 */ "./node_modules/@protobufjs/base64/index.js");

// base class of rpc.Service
util.EventEmitter = __webpack_require__(/*! @protobufjs/eventemitter */ "./node_modules/@protobufjs/eventemitter/index.js");

// float handling accross browsers
util.float = __webpack_require__(/*! @protobufjs/float */ "./node_modules/@protobufjs/float/index.js");

// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(/*! @protobufjs/inquire */ "./node_modules/@protobufjs/inquire/index.js");

// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(/*! @protobufjs/utf8 */ "./node_modules/@protobufjs/utf8/index.js");

// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(/*! @protobufjs/pool */ "./node_modules/@protobufjs/pool/index.js");

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(/*! ./longbits */ "./node_modules/protobufjs/src/util/longbits.js");

// global object reference
util.global = typeof window !== "undefined" && window
           || typeof global !== "undefined" && global
           || typeof self   !== "undefined" && self
           || this; // eslint-disable-line no-invalid-this

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 * @const
 */
util.isNode = Boolean(util.global.process && util.global.process.versions && util.global.process.versions.node);

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
         || /* istanbul ignore next */ util.global.Long
         || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: (new Error()).stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/protobufjs/src/writer.js":
/*!***********************************************!*\
  !*** ./node_modules/protobufjs/src/writer.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Writer;

var util      = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = util.Buffer
    ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
            return new BufferWriter();
        })();
    }
    /* istanbul ignore next */
    : function create_array() {
        return new Writer();
    };

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
};


/***/ }),

/***/ "./node_modules/protobufjs/src/writer_buffer.js":
/*!******************************************************!*\
  !*** ./node_modules/protobufjs/src/writer_buffer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __webpack_require__(/*! ./writer */ "./node_modules/protobufjs/src/writer.js");
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __webpack_require__(/*! ./util/minimal */ "./node_modules/protobufjs/src/util/minimal.js");

var Buffer = util.Buffer;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Buffer} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
};

var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set"
    ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
                           // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
    };

/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else
        buf.utf8Write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */


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
	g = g || Function("return this")() || (1, eval)("this");
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
/*! exports provided: name, version, main, engines, scripts, license, repository, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = {"name":"lightstep-tracer","version":"0.21.0","main":"index.js","engines":{"node":">=0.12.0"},"scripts":{"test":"rm -f test/results/*.json && node node_modules/mocha/bin/mocha -c test/unittest_node.js"},"license":"MIT","repository":{"type":"git","url":"http://github.com/lightstep/lightstep-tracer-javascript.git"},"dependencies":{"async":"1.5.0","eventemitter3":"1.1.1","hex2dec":"1.0.1","source-map-support":"0.3.3","thrift":"0.11.0"},"devDependencies":{"babel-cli":"6.14.0","babel-core":"^6.26.3","babel-loader":"7","babel-plugin-add-module-exports":"^1.0.0","babel-plugin-check-es2015-constants":"6.7.2","babel-plugin-transform-es2015-arrow-functions":"6.5.2","babel-plugin-transform-es2015-block-scoped-functions":"6.6.5","babel-plugin-transform-es2015-block-scoping":"^6.26.0","babel-plugin-transform-es2015-classes":"6.6.5","babel-plugin-transform-es2015-computed-properties":"6.6.5","babel-plugin-transform-es2015-destructuring":"6.6.5","babel-plugin-transform-es2015-duplicate-keys":"6.6.4","babel-plugin-transform-es2015-literals":"6.5.0","babel-plugin-transform-es2015-modules-commonjs":"6.7.4","babel-plugin-transform-es2015-object-super":"6.6.5","babel-plugin-transform-es2015-parameters":"6.7.0","babel-plugin-transform-es2015-spread":"6.6.5","babel-plugin-transform-es2015-sticky-regex":"6.5.0","babel-plugin-transform-es2015-template-literals":"6.6.5","babel-plugin-transform-es2015-unicode-regex":"6.5.0","babel-polyfill":"6.3.14","babel-preset-es2015":"6.3.13","chai":"3.4.1","clone":"1.0.2","colors":"1.1.2","eslint":"2.4.0","eslint-config-airbnb":"6.2.0","eslint-plugin-react":"4.2.3","express":"^4.16.3","istanbul":"^0.4.5","mocha":"^5.2.0","opentracing":"0.14.3","protobufjs":"6.8.8","shelljs":"0.5.3","sprintf-js":"1.0.3","underscore":"1.8.3","watch-trigger":"0.0.5","webpack":"^4.25.1","webpack-cli":"^3.1.2"}};

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
function _each(obj, cb) {
    if (!obj) {
        return;
    }
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // eslint-disable-line camelcase


var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

var _generated_proto = __webpack_require__(/*! ./generated_proto */ "./src/imp/generated_proto.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proto = _generated_proto.lightstep.collector;

var AuthImp = function () {
    function AuthImp(accessToken) {
        _classCallCheck(this, AuthImp);

        this._accessToken = accessToken;
    }

    _createClass(AuthImp, [{
        key: 'getAccessToken',
        value: function getAccessToken() {
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
            authProto.accessToken = this._accessToken;
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

/***/ "./src/imp/generated_proto.js":
/*!************************************!*\
  !*** ./src/imp/generated_proto.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.google=exports.lightstep=undefined;var _minimal=__webpack_require__(/*! protobufjs/minimal */ "./node_modules/protobufjs/minimal.js");var $protobuf=_interopRequireWildcard(_minimal);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}// Common aliases
var $Reader=$protobuf.Reader,$Writer=$protobuf.Writer,$util=$protobuf.util;// Exported root namespace
/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/var $root=$protobuf.roots['default']||($protobuf.roots['default']={});var lightstep=exports.lightstep=$root.lightstep=function(){/**
     * Namespace lightstep.
     * @exports lightstep
     * @namespace
     */var lightstep={};lightstep.collector=function(){/**
         * Namespace collector.
         * @memberof lightstep
         * @namespace
         */var collector={};collector.SpanContext=function(){/**
             * Properties of a SpanContext.
             * @memberof lightstep.collector
             * @interface ISpanContext
             * @property {number|Long|null} [traceId] SpanContext traceId
             * @property {number|Long|null} [spanId] SpanContext spanId
             * @property {Object.<string,string>|null} [baggage] SpanContext baggage
             *//**
             * Constructs a new SpanContext.
             * @memberof lightstep.collector
             * @classdesc Represents a SpanContext.
             * @implements ISpanContext
             * @constructor
             * @param {lightstep.collector.ISpanContext=} [properties] Properties to set
             */function SpanContext(properties){this.baggage={};if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * SpanContext traceId.
             * @member {number|Long} traceId
             * @memberof lightstep.collector.SpanContext
             * @instance
             */SpanContext.prototype.traceId=$util.Long?$util.Long.fromBits(0,0,true):0;/**
             * SpanContext spanId.
             * @member {number|Long} spanId
             * @memberof lightstep.collector.SpanContext
             * @instance
             */SpanContext.prototype.spanId=$util.Long?$util.Long.fromBits(0,0,true):0;/**
             * SpanContext baggage.
             * @member {Object.<string,string>} baggage
             * @memberof lightstep.collector.SpanContext
             * @instance
             */SpanContext.prototype.baggage=$util.emptyObject;/**
             * Creates a new SpanContext instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.SpanContext
             * @static
             * @param {lightstep.collector.ISpanContext=} [properties] Properties to set
             * @returns {lightstep.collector.SpanContext} SpanContext instance
             */SpanContext.create=function create(properties){return new SpanContext(properties);};/**
             * Encodes the specified SpanContext message. Does not implicitly {@link lightstep.collector.SpanContext.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.SpanContext
             * @static
             * @param {lightstep.collector.ISpanContext} message SpanContext message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */SpanContext.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.traceId!=null&&message.hasOwnProperty('traceId'))writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.traceId);if(message.spanId!=null&&message.hasOwnProperty('spanId'))writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.spanId);if(message.baggage!=null&&message.hasOwnProperty('baggage'))for(var keys=Object.keys(message.baggage),i=0;i<keys.length;++i){writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.baggage[keys[i]]).ldelim();}return writer;};/**
             * Encodes the specified SpanContext message, length delimited. Does not implicitly {@link lightstep.collector.SpanContext.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.SpanContext
             * @static
             * @param {lightstep.collector.ISpanContext} message SpanContext message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */SpanContext.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a SpanContext message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.SpanContext
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.SpanContext} SpanContext
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */SpanContext.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.SpanContext(),key=void 0;while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.traceId=reader.uint64();break;case 2:message.spanId=reader.uint64();break;case 3:reader.skip().pos++;if(message.baggage===$util.emptyObject)message.baggage={};key=reader.string();reader.pos++;message.baggage[key]=reader.string();break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a SpanContext message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.SpanContext
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.SpanContext} SpanContext
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */SpanContext.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a SpanContext message.
             * @function verify
             * @memberof lightstep.collector.SpanContext
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */SpanContext.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.traceId!=null&&message.hasOwnProperty('traceId'))if(!$util.isInteger(message.traceId)&&!(message.traceId&&$util.isInteger(message.traceId.low)&&$util.isInteger(message.traceId.high)))return'traceId: integer|Long expected';if(message.spanId!=null&&message.hasOwnProperty('spanId'))if(!$util.isInteger(message.spanId)&&!(message.spanId&&$util.isInteger(message.spanId.low)&&$util.isInteger(message.spanId.high)))return'spanId: integer|Long expected';if(message.baggage!=null&&message.hasOwnProperty('baggage')){if(!$util.isObject(message.baggage))return'baggage: object expected';var key=Object.keys(message.baggage);for(var i=0;i<key.length;++i){if(!$util.isString(message.baggage[key[i]]))return'baggage: string{k:string} expected';}}return null;};/**
             * Creates a SpanContext message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.SpanContext
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.SpanContext} SpanContext
             */SpanContext.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.SpanContext)return object;var message=new $root.lightstep.collector.SpanContext();if(object.traceId!=null)if($util.Long)(message.traceId=$util.Long.fromValue(object.traceId)).unsigned=true;else if(typeof object.traceId==='string')message.traceId=parseInt(object.traceId,10);else if(typeof object.traceId==='number')message.traceId=object.traceId;else if(typeof object.traceId==='object')message.traceId=new $util.LongBits(object.traceId.low>>>0,object.traceId.high>>>0).toNumber(true);if(object.spanId!=null)if($util.Long)(message.spanId=$util.Long.fromValue(object.spanId)).unsigned=true;else if(typeof object.spanId==='string')message.spanId=parseInt(object.spanId,10);else if(typeof object.spanId==='number')message.spanId=object.spanId;else if(typeof object.spanId==='object')message.spanId=new $util.LongBits(object.spanId.low>>>0,object.spanId.high>>>0).toNumber(true);if(object.baggage){if(typeof object.baggage!=='object')throw TypeError('.lightstep.collector.SpanContext.baggage: object expected');message.baggage={};for(var keys=Object.keys(object.baggage),i=0;i<keys.length;++i){message.baggage[keys[i]]=String(object.baggage[keys[i]]);}}return message;};/**
             * Creates a plain object from a SpanContext message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.SpanContext
             * @static
             * @param {lightstep.collector.SpanContext} message SpanContext
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */SpanContext.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.objects||options.defaults)object.baggage={};if(options.defaults){if($util.Long){var long=new $util.Long(0,0,true);object.traceId=options.longs===String?long.toString():options.longs===Number?long.toNumber():long;}else object.traceId=options.longs===String?'0':0;if($util.Long){var _long=new $util.Long(0,0,true);object.spanId=options.longs===String?_long.toString():options.longs===Number?_long.toNumber():_long;}else object.spanId=options.longs===String?'0':0;}if(message.traceId!=null&&message.hasOwnProperty('traceId'))if(typeof message.traceId==='number')object.traceId=options.longs===String?String(message.traceId):message.traceId;else object.traceId=options.longs===String?$util.Long.prototype.toString.call(message.traceId):options.longs===Number?new $util.LongBits(message.traceId.low>>>0,message.traceId.high>>>0).toNumber(true):message.traceId;if(message.spanId!=null&&message.hasOwnProperty('spanId'))if(typeof message.spanId==='number')object.spanId=options.longs===String?String(message.spanId):message.spanId;else object.spanId=options.longs===String?$util.Long.prototype.toString.call(message.spanId):options.longs===Number?new $util.LongBits(message.spanId.low>>>0,message.spanId.high>>>0).toNumber(true):message.spanId;var keys2=void 0;if(message.baggage&&(keys2=Object.keys(message.baggage)).length){object.baggage={};for(var j=0;j<keys2.length;++j){object.baggage[keys2[j]]=message.baggage[keys2[j]];}}return object;};/**
             * Converts this SpanContext to JSON.
             * @function toJSON
             * @memberof lightstep.collector.SpanContext
             * @instance
             * @returns {Object.<string,*>} JSON object
             */SpanContext.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return SpanContext;}();collector.KeyValue=function(){/**
             * Properties of a KeyValue.
             * @memberof lightstep.collector
             * @interface IKeyValue
             * @property {string|null} [key] KeyValue key
             * @property {string|null} [stringValue] KeyValue stringValue
             * @property {number|Long|null} [intValue] KeyValue intValue
             * @property {number|null} [doubleValue] KeyValue doubleValue
             * @property {boolean|null} [boolValue] KeyValue boolValue
             * @property {string|null} [jsonValue] KeyValue jsonValue
             *//**
             * Constructs a new KeyValue.
             * @memberof lightstep.collector
             * @classdesc Represents a KeyValue.
             * @implements IKeyValue
             * @constructor
             * @param {lightstep.collector.IKeyValue=} [properties] Properties to set
             */function KeyValue(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * KeyValue key.
             * @member {string} key
             * @memberof lightstep.collector.KeyValue
             * @instance
             */KeyValue.prototype.key='';/**
             * KeyValue stringValue.
             * @member {string} stringValue
             * @memberof lightstep.collector.KeyValue
             * @instance
             */KeyValue.prototype.stringValue='';/**
             * KeyValue intValue.
             * @member {number|Long} intValue
             * @memberof lightstep.collector.KeyValue
             * @instance
             */KeyValue.prototype.intValue=$util.Long?$util.Long.fromBits(0,0,false):0;/**
             * KeyValue doubleValue.
             * @member {number} doubleValue
             * @memberof lightstep.collector.KeyValue
             * @instance
             */KeyValue.prototype.doubleValue=0;/**
             * KeyValue boolValue.
             * @member {boolean} boolValue
             * @memberof lightstep.collector.KeyValue
             * @instance
             */KeyValue.prototype.boolValue=false;/**
             * KeyValue jsonValue.
             * @member {string} jsonValue
             * @memberof lightstep.collector.KeyValue
             * @instance
             */KeyValue.prototype.jsonValue='';// OneOf field names bound to virtual getters and setters
var $oneOfFields=void 0;/**
             * KeyValue value.
             * @member {"stringValue"|"intValue"|"doubleValue"|"boolValue"|"jsonValue"|undefined} value
             * @memberof lightstep.collector.KeyValue
             * @instance
             */Object.defineProperty(KeyValue.prototype,'value',{get:$util.oneOfGetter($oneOfFields=['stringValue','intValue','doubleValue','boolValue','jsonValue']),set:$util.oneOfSetter($oneOfFields)});/**
             * Creates a new KeyValue instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.KeyValue
             * @static
             * @param {lightstep.collector.IKeyValue=} [properties] Properties to set
             * @returns {lightstep.collector.KeyValue} KeyValue instance
             */KeyValue.create=function create(properties){return new KeyValue(properties);};/**
             * Encodes the specified KeyValue message. Does not implicitly {@link lightstep.collector.KeyValue.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.KeyValue
             * @static
             * @param {lightstep.collector.IKeyValue} message KeyValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */KeyValue.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.key!=null&&message.hasOwnProperty('key'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);if(message.stringValue!=null&&message.hasOwnProperty('stringValue'))writer.uint32(/* id 2, wireType 2 =*/18).string(message.stringValue);if(message.intValue!=null&&message.hasOwnProperty('intValue'))writer.uint32(/* id 3, wireType 0 =*/24).int64(message.intValue);if(message.doubleValue!=null&&message.hasOwnProperty('doubleValue'))writer.uint32(/* id 4, wireType 1 =*/33).double(message.doubleValue);if(message.boolValue!=null&&message.hasOwnProperty('boolValue'))writer.uint32(/* id 5, wireType 0 =*/40).bool(message.boolValue);if(message.jsonValue!=null&&message.hasOwnProperty('jsonValue'))writer.uint32(/* id 6, wireType 2 =*/50).string(message.jsonValue);return writer;};/**
             * Encodes the specified KeyValue message, length delimited. Does not implicitly {@link lightstep.collector.KeyValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.KeyValue
             * @static
             * @param {lightstep.collector.IKeyValue} message KeyValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */KeyValue.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a KeyValue message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.KeyValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.KeyValue} KeyValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */KeyValue.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.KeyValue();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.key=reader.string();break;case 2:message.stringValue=reader.string();break;case 3:message.intValue=reader.int64();break;case 4:message.doubleValue=reader.double();break;case 5:message.boolValue=reader.bool();break;case 6:message.jsonValue=reader.string();break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a KeyValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.KeyValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.KeyValue} KeyValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */KeyValue.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a KeyValue message.
             * @function verify
             * @memberof lightstep.collector.KeyValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */KeyValue.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';var properties={};if(message.key!=null&&message.hasOwnProperty('key'))if(!$util.isString(message.key))return'key: string expected';if(message.stringValue!=null&&message.hasOwnProperty('stringValue')){properties.value=1;if(!$util.isString(message.stringValue))return'stringValue: string expected';}if(message.intValue!=null&&message.hasOwnProperty('intValue')){if(properties.value===1)return'value: multiple values';properties.value=1;if(!$util.isInteger(message.intValue)&&!(message.intValue&&$util.isInteger(message.intValue.low)&&$util.isInteger(message.intValue.high)))return'intValue: integer|Long expected';}if(message.doubleValue!=null&&message.hasOwnProperty('doubleValue')){if(properties.value===1)return'value: multiple values';properties.value=1;if(typeof message.doubleValue!=='number')return'doubleValue: number expected';}if(message.boolValue!=null&&message.hasOwnProperty('boolValue')){if(properties.value===1)return'value: multiple values';properties.value=1;if(typeof message.boolValue!=='boolean')return'boolValue: boolean expected';}if(message.jsonValue!=null&&message.hasOwnProperty('jsonValue')){if(properties.value===1)return'value: multiple values';properties.value=1;if(!$util.isString(message.jsonValue))return'jsonValue: string expected';}return null;};/**
             * Creates a KeyValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.KeyValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.KeyValue} KeyValue
             */KeyValue.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.KeyValue)return object;var message=new $root.lightstep.collector.KeyValue();if(object.key!=null)message.key=String(object.key);if(object.stringValue!=null)message.stringValue=String(object.stringValue);if(object.intValue!=null)if($util.Long)(message.intValue=$util.Long.fromValue(object.intValue)).unsigned=false;else if(typeof object.intValue==='string')message.intValue=parseInt(object.intValue,10);else if(typeof object.intValue==='number')message.intValue=object.intValue;else if(typeof object.intValue==='object')message.intValue=new $util.LongBits(object.intValue.low>>>0,object.intValue.high>>>0).toNumber();if(object.doubleValue!=null)message.doubleValue=Number(object.doubleValue);if(object.boolValue!=null)message.boolValue=Boolean(object.boolValue);if(object.jsonValue!=null)message.jsonValue=String(object.jsonValue);return message;};/**
             * Creates a plain object from a KeyValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.KeyValue
             * @static
             * @param {lightstep.collector.KeyValue} message KeyValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */KeyValue.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults)object.key='';if(message.key!=null&&message.hasOwnProperty('key'))object.key=message.key;if(message.stringValue!=null&&message.hasOwnProperty('stringValue')){object.stringValue=message.stringValue;if(options.oneofs)object.value='stringValue';}if(message.intValue!=null&&message.hasOwnProperty('intValue')){if(typeof message.intValue==='number')object.intValue=options.longs===String?String(message.intValue):message.intValue;else object.intValue=options.longs===String?$util.Long.prototype.toString.call(message.intValue):options.longs===Number?new $util.LongBits(message.intValue.low>>>0,message.intValue.high>>>0).toNumber():message.intValue;if(options.oneofs)object.value='intValue';}if(message.doubleValue!=null&&message.hasOwnProperty('doubleValue')){object.doubleValue=options.json&&!isFinite(message.doubleValue)?String(message.doubleValue):message.doubleValue;if(options.oneofs)object.value='doubleValue';}if(message.boolValue!=null&&message.hasOwnProperty('boolValue')){object.boolValue=message.boolValue;if(options.oneofs)object.value='boolValue';}if(message.jsonValue!=null&&message.hasOwnProperty('jsonValue')){object.jsonValue=message.jsonValue;if(options.oneofs)object.value='jsonValue';}return object;};/**
             * Converts this KeyValue to JSON.
             * @function toJSON
             * @memberof lightstep.collector.KeyValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */KeyValue.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return KeyValue;}();collector.Log=function(){/**
             * Properties of a Log.
             * @memberof lightstep.collector
             * @interface ILog
             * @property {google.protobuf.ITimestamp|null} [timestamp] Log timestamp
             * @property {Array.<lightstep.collector.IKeyValue>|null} [fields] Log fields
             *//**
             * Constructs a new Log.
             * @memberof lightstep.collector
             * @classdesc Represents a Log.
             * @implements ILog
             * @constructor
             * @param {lightstep.collector.ILog=} [properties] Properties to set
             */function Log(properties){this.fields=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * Log timestamp.
             * @member {google.protobuf.ITimestamp|null|undefined} timestamp
             * @memberof lightstep.collector.Log
             * @instance
             */Log.prototype.timestamp=null;/**
             * Log fields.
             * @member {Array.<lightstep.collector.IKeyValue>} fields
             * @memberof lightstep.collector.Log
             * @instance
             */Log.prototype.fields=$util.emptyArray;/**
             * Creates a new Log instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.Log
             * @static
             * @param {lightstep.collector.ILog=} [properties] Properties to set
             * @returns {lightstep.collector.Log} Log instance
             */Log.create=function create(properties){return new Log(properties);};/**
             * Encodes the specified Log message. Does not implicitly {@link lightstep.collector.Log.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.Log
             * @static
             * @param {lightstep.collector.ILog} message Log message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Log.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.timestamp!=null&&message.hasOwnProperty('timestamp'))$root.google.protobuf.Timestamp.encode(message.timestamp,writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();if(message.fields!=null&&message.fields.length)for(var i=0;i<message.fields.length;++i){$root.lightstep.collector.KeyValue.encode(message.fields[i],writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();}return writer;};/**
             * Encodes the specified Log message, length delimited. Does not implicitly {@link lightstep.collector.Log.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.Log
             * @static
             * @param {lightstep.collector.ILog} message Log message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Log.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a Log message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.Log
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.Log} Log
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Log.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.Log();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.timestamp=$root.google.protobuf.Timestamp.decode(reader,reader.uint32());break;case 2:if(!(message.fields&&message.fields.length))message.fields=[];message.fields.push($root.lightstep.collector.KeyValue.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a Log message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.Log
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.Log} Log
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Log.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a Log message.
             * @function verify
             * @memberof lightstep.collector.Log
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */Log.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.timestamp!=null&&message.hasOwnProperty('timestamp')){var error=$root.google.protobuf.Timestamp.verify(message.timestamp);if(error)return'timestamp.'+error;}if(message.fields!=null&&message.hasOwnProperty('fields')){if(!Array.isArray(message.fields))return'fields: array expected';for(var i=0;i<message.fields.length;++i){var _error=$root.lightstep.collector.KeyValue.verify(message.fields[i]);if(_error)return'fields.'+_error;}}return null;};/**
             * Creates a Log message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.Log
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.Log} Log
             */Log.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.Log)return object;var message=new $root.lightstep.collector.Log();if(object.timestamp!=null){if(typeof object.timestamp!=='object')throw TypeError('.lightstep.collector.Log.timestamp: object expected');message.timestamp=$root.google.protobuf.Timestamp.fromObject(object.timestamp);}if(object.fields){if(!Array.isArray(object.fields))throw TypeError('.lightstep.collector.Log.fields: array expected');message.fields=[];for(var i=0;i<object.fields.length;++i){if(typeof object.fields[i]!=='object')throw TypeError('.lightstep.collector.Log.fields: object expected');message.fields[i]=$root.lightstep.collector.KeyValue.fromObject(object.fields[i]);}}return message;};/**
             * Creates a plain object from a Log message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.Log
             * @static
             * @param {lightstep.collector.Log} message Log
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */Log.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.fields=[];if(options.defaults)object.timestamp=null;if(message.timestamp!=null&&message.hasOwnProperty('timestamp'))object.timestamp=$root.google.protobuf.Timestamp.toObject(message.timestamp,options);if(message.fields&&message.fields.length){object.fields=[];for(var j=0;j<message.fields.length;++j){object.fields[j]=$root.lightstep.collector.KeyValue.toObject(message.fields[j],options);}}return object;};/**
             * Converts this Log to JSON.
             * @function toJSON
             * @memberof lightstep.collector.Log
             * @instance
             * @returns {Object.<string,*>} JSON object
             */Log.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return Log;}();collector.Reference=function(){/**
             * Properties of a Reference.
             * @memberof lightstep.collector
             * @interface IReference
             * @property {lightstep.collector.Reference.Relationship|null} [relationship] Reference relationship
             * @property {lightstep.collector.ISpanContext|null} [spanContext] Reference spanContext
             *//**
             * Constructs a new Reference.
             * @memberof lightstep.collector
             * @classdesc Represents a Reference.
             * @implements IReference
             * @constructor
             * @param {lightstep.collector.IReference=} [properties] Properties to set
             */function Reference(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * Reference relationship.
             * @member {lightstep.collector.Reference.Relationship} relationship
             * @memberof lightstep.collector.Reference
             * @instance
             */Reference.prototype.relationship=0;/**
             * Reference spanContext.
             * @member {lightstep.collector.ISpanContext|null|undefined} spanContext
             * @memberof lightstep.collector.Reference
             * @instance
             */Reference.prototype.spanContext=null;/**
             * Creates a new Reference instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.Reference
             * @static
             * @param {lightstep.collector.IReference=} [properties] Properties to set
             * @returns {lightstep.collector.Reference} Reference instance
             */Reference.create=function create(properties){return new Reference(properties);};/**
             * Encodes the specified Reference message. Does not implicitly {@link lightstep.collector.Reference.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.Reference
             * @static
             * @param {lightstep.collector.IReference} message Reference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Reference.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.relationship!=null&&message.hasOwnProperty('relationship'))writer.uint32(/* id 1, wireType 0 =*/8).int32(message.relationship);if(message.spanContext!=null&&message.hasOwnProperty('spanContext'))$root.lightstep.collector.SpanContext.encode(message.spanContext,writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();return writer;};/**
             * Encodes the specified Reference message, length delimited. Does not implicitly {@link lightstep.collector.Reference.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.Reference
             * @static
             * @param {lightstep.collector.IReference} message Reference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Reference.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a Reference message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.Reference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.Reference} Reference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Reference.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.Reference();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.relationship=reader.int32();break;case 2:message.spanContext=$root.lightstep.collector.SpanContext.decode(reader,reader.uint32());break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a Reference message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.Reference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.Reference} Reference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Reference.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a Reference message.
             * @function verify
             * @memberof lightstep.collector.Reference
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */Reference.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.relationship!=null&&message.hasOwnProperty('relationship'))switch(message.relationship){default:return'relationship: enum value expected';case 0:case 1:break;}if(message.spanContext!=null&&message.hasOwnProperty('spanContext')){var error=$root.lightstep.collector.SpanContext.verify(message.spanContext);if(error)return'spanContext.'+error;}return null;};/**
             * Creates a Reference message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.Reference
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.Reference} Reference
             */Reference.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.Reference)return object;var message=new $root.lightstep.collector.Reference();switch(object.relationship){case'CHILD_OF':case 0:message.relationship=0;break;case'FOLLOWS_FROM':case 1:message.relationship=1;break;}if(object.spanContext!=null){if(typeof object.spanContext!=='object')throw TypeError('.lightstep.collector.Reference.spanContext: object expected');message.spanContext=$root.lightstep.collector.SpanContext.fromObject(object.spanContext);}return message;};/**
             * Creates a plain object from a Reference message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.Reference
             * @static
             * @param {lightstep.collector.Reference} message Reference
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */Reference.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults){object.relationship=options.enums===String?'CHILD_OF':0;object.spanContext=null;}if(message.relationship!=null&&message.hasOwnProperty('relationship'))object.relationship=options.enums===String?$root.lightstep.collector.Reference.Relationship[message.relationship]:message.relationship;if(message.spanContext!=null&&message.hasOwnProperty('spanContext'))object.spanContext=$root.lightstep.collector.SpanContext.toObject(message.spanContext,options);return object;};/**
             * Converts this Reference to JSON.
             * @function toJSON
             * @memberof lightstep.collector.Reference
             * @instance
             * @returns {Object.<string,*>} JSON object
             */Reference.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};/**
             * Relationship enum.
             * @name lightstep.collector.Reference.Relationship
             * @enum {string}
             * @property {number} CHILD_OF=0 CHILD_OF value
             * @property {number} FOLLOWS_FROM=1 FOLLOWS_FROM value
             */Reference.Relationship=function(){var valuesById={},values=Object.create(valuesById);values[valuesById[0]='CHILD_OF']=0;values[valuesById[1]='FOLLOWS_FROM']=1;return values;}();return Reference;}();collector.Span=function(){/**
             * Properties of a Span.
             * @memberof lightstep.collector
             * @interface ISpan
             * @property {lightstep.collector.ISpanContext|null} [spanContext] Span spanContext
             * @property {string|null} [operationName] Span operationName
             * @property {Array.<lightstep.collector.IReference>|null} [references] Span references
             * @property {google.protobuf.ITimestamp|null} [startTimestamp] Span startTimestamp
             * @property {number|Long|null} [durationMicros] Span durationMicros
             * @property {Array.<lightstep.collector.IKeyValue>|null} [tags] Span tags
             * @property {Array.<lightstep.collector.ILog>|null} [logs] Span logs
             *//**
             * Constructs a new Span.
             * @memberof lightstep.collector
             * @classdesc Represents a Span.
             * @implements ISpan
             * @constructor
             * @param {lightstep.collector.ISpan=} [properties] Properties to set
             */function Span(properties){this.references=[];this.tags=[];this.logs=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * Span spanContext.
             * @member {lightstep.collector.ISpanContext|null|undefined} spanContext
             * @memberof lightstep.collector.Span
             * @instance
             */Span.prototype.spanContext=null;/**
             * Span operationName.
             * @member {string} operationName
             * @memberof lightstep.collector.Span
             * @instance
             */Span.prototype.operationName='';/**
             * Span references.
             * @member {Array.<lightstep.collector.IReference>} references
             * @memberof lightstep.collector.Span
             * @instance
             */Span.prototype.references=$util.emptyArray;/**
             * Span startTimestamp.
             * @member {google.protobuf.ITimestamp|null|undefined} startTimestamp
             * @memberof lightstep.collector.Span
             * @instance
             */Span.prototype.startTimestamp=null;/**
             * Span durationMicros.
             * @member {number|Long} durationMicros
             * @memberof lightstep.collector.Span
             * @instance
             */Span.prototype.durationMicros=$util.Long?$util.Long.fromBits(0,0,true):0;/**
             * Span tags.
             * @member {Array.<lightstep.collector.IKeyValue>} tags
             * @memberof lightstep.collector.Span
             * @instance
             */Span.prototype.tags=$util.emptyArray;/**
             * Span logs.
             * @member {Array.<lightstep.collector.ILog>} logs
             * @memberof lightstep.collector.Span
             * @instance
             */Span.prototype.logs=$util.emptyArray;/**
             * Creates a new Span instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.Span
             * @static
             * @param {lightstep.collector.ISpan=} [properties] Properties to set
             * @returns {lightstep.collector.Span} Span instance
             */Span.create=function create(properties){return new Span(properties);};/**
             * Encodes the specified Span message. Does not implicitly {@link lightstep.collector.Span.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.Span
             * @static
             * @param {lightstep.collector.ISpan} message Span message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Span.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.spanContext!=null&&message.hasOwnProperty('spanContext'))$root.lightstep.collector.SpanContext.encode(message.spanContext,writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();if(message.operationName!=null&&message.hasOwnProperty('operationName'))writer.uint32(/* id 2, wireType 2 =*/18).string(message.operationName);if(message.references!=null&&message.references.length)for(var i=0;i<message.references.length;++i){$root.lightstep.collector.Reference.encode(message.references[i],writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();}if(message.startTimestamp!=null&&message.hasOwnProperty('startTimestamp'))$root.google.protobuf.Timestamp.encode(message.startTimestamp,writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();if(message.durationMicros!=null&&message.hasOwnProperty('durationMicros'))writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.durationMicros);if(message.tags!=null&&message.tags.length)for(var _i=0;_i<message.tags.length;++_i){$root.lightstep.collector.KeyValue.encode(message.tags[_i],writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();}if(message.logs!=null&&message.logs.length)for(var _i2=0;_i2<message.logs.length;++_i2){$root.lightstep.collector.Log.encode(message.logs[_i2],writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();}return writer;};/**
             * Encodes the specified Span message, length delimited. Does not implicitly {@link lightstep.collector.Span.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.Span
             * @static
             * @param {lightstep.collector.ISpan} message Span message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Span.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a Span message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.Span
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.Span} Span
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Span.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.Span();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.spanContext=$root.lightstep.collector.SpanContext.decode(reader,reader.uint32());break;case 2:message.operationName=reader.string();break;case 3:if(!(message.references&&message.references.length))message.references=[];message.references.push($root.lightstep.collector.Reference.decode(reader,reader.uint32()));break;case 4:message.startTimestamp=$root.google.protobuf.Timestamp.decode(reader,reader.uint32());break;case 5:message.durationMicros=reader.uint64();break;case 6:if(!(message.tags&&message.tags.length))message.tags=[];message.tags.push($root.lightstep.collector.KeyValue.decode(reader,reader.uint32()));break;case 7:if(!(message.logs&&message.logs.length))message.logs=[];message.logs.push($root.lightstep.collector.Log.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a Span message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.Span
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.Span} Span
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Span.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a Span message.
             * @function verify
             * @memberof lightstep.collector.Span
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */Span.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.spanContext!=null&&message.hasOwnProperty('spanContext')){var error=$root.lightstep.collector.SpanContext.verify(message.spanContext);if(error)return'spanContext.'+error;}if(message.operationName!=null&&message.hasOwnProperty('operationName'))if(!$util.isString(message.operationName))return'operationName: string expected';if(message.references!=null&&message.hasOwnProperty('references')){if(!Array.isArray(message.references))return'references: array expected';for(var i=0;i<message.references.length;++i){var _error2=$root.lightstep.collector.Reference.verify(message.references[i]);if(_error2)return'references.'+_error2;}}if(message.startTimestamp!=null&&message.hasOwnProperty('startTimestamp')){var _error3=$root.google.protobuf.Timestamp.verify(message.startTimestamp);if(_error3)return'startTimestamp.'+_error3;}if(message.durationMicros!=null&&message.hasOwnProperty('durationMicros'))if(!$util.isInteger(message.durationMicros)&&!(message.durationMicros&&$util.isInteger(message.durationMicros.low)&&$util.isInteger(message.durationMicros.high)))return'durationMicros: integer|Long expected';if(message.tags!=null&&message.hasOwnProperty('tags')){if(!Array.isArray(message.tags))return'tags: array expected';for(var _i3=0;_i3<message.tags.length;++_i3){var _error4=$root.lightstep.collector.KeyValue.verify(message.tags[_i3]);if(_error4)return'tags.'+_error4;}}if(message.logs!=null&&message.hasOwnProperty('logs')){if(!Array.isArray(message.logs))return'logs: array expected';for(var _i4=0;_i4<message.logs.length;++_i4){var _error5=$root.lightstep.collector.Log.verify(message.logs[_i4]);if(_error5)return'logs.'+_error5;}}return null;};/**
             * Creates a Span message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.Span
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.Span} Span
             */Span.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.Span)return object;var message=new $root.lightstep.collector.Span();if(object.spanContext!=null){if(typeof object.spanContext!=='object')throw TypeError('.lightstep.collector.Span.spanContext: object expected');message.spanContext=$root.lightstep.collector.SpanContext.fromObject(object.spanContext);}if(object.operationName!=null)message.operationName=String(object.operationName);if(object.references){if(!Array.isArray(object.references))throw TypeError('.lightstep.collector.Span.references: array expected');message.references=[];for(var i=0;i<object.references.length;++i){if(typeof object.references[i]!=='object')throw TypeError('.lightstep.collector.Span.references: object expected');message.references[i]=$root.lightstep.collector.Reference.fromObject(object.references[i]);}}if(object.startTimestamp!=null){if(typeof object.startTimestamp!=='object')throw TypeError('.lightstep.collector.Span.startTimestamp: object expected');message.startTimestamp=$root.google.protobuf.Timestamp.fromObject(object.startTimestamp);}if(object.durationMicros!=null)if($util.Long)(message.durationMicros=$util.Long.fromValue(object.durationMicros)).unsigned=true;else if(typeof object.durationMicros==='string')message.durationMicros=parseInt(object.durationMicros,10);else if(typeof object.durationMicros==='number')message.durationMicros=object.durationMicros;else if(typeof object.durationMicros==='object')message.durationMicros=new $util.LongBits(object.durationMicros.low>>>0,object.durationMicros.high>>>0).toNumber(true);if(object.tags){if(!Array.isArray(object.tags))throw TypeError('.lightstep.collector.Span.tags: array expected');message.tags=[];for(var _i5=0;_i5<object.tags.length;++_i5){if(typeof object.tags[_i5]!=='object')throw TypeError('.lightstep.collector.Span.tags: object expected');message.tags[_i5]=$root.lightstep.collector.KeyValue.fromObject(object.tags[_i5]);}}if(object.logs){if(!Array.isArray(object.logs))throw TypeError('.lightstep.collector.Span.logs: array expected');message.logs=[];for(var _i6=0;_i6<object.logs.length;++_i6){if(typeof object.logs[_i6]!=='object')throw TypeError('.lightstep.collector.Span.logs: object expected');message.logs[_i6]=$root.lightstep.collector.Log.fromObject(object.logs[_i6]);}}return message;};/**
             * Creates a plain object from a Span message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.Span
             * @static
             * @param {lightstep.collector.Span} message Span
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */Span.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults){object.references=[];object.tags=[];object.logs=[];}if(options.defaults){object.spanContext=null;object.operationName='';object.startTimestamp=null;if($util.Long){var long=new $util.Long(0,0,true);object.durationMicros=options.longs===String?long.toString():options.longs===Number?long.toNumber():long;}else object.durationMicros=options.longs===String?'0':0;}if(message.spanContext!=null&&message.hasOwnProperty('spanContext'))object.spanContext=$root.lightstep.collector.SpanContext.toObject(message.spanContext,options);if(message.operationName!=null&&message.hasOwnProperty('operationName'))object.operationName=message.operationName;if(message.references&&message.references.length){object.references=[];for(var j=0;j<message.references.length;++j){object.references[j]=$root.lightstep.collector.Reference.toObject(message.references[j],options);}}if(message.startTimestamp!=null&&message.hasOwnProperty('startTimestamp'))object.startTimestamp=$root.google.protobuf.Timestamp.toObject(message.startTimestamp,options);if(message.durationMicros!=null&&message.hasOwnProperty('durationMicros'))if(typeof message.durationMicros==='number')object.durationMicros=options.longs===String?String(message.durationMicros):message.durationMicros;else object.durationMicros=options.longs===String?$util.Long.prototype.toString.call(message.durationMicros):options.longs===Number?new $util.LongBits(message.durationMicros.low>>>0,message.durationMicros.high>>>0).toNumber(true):message.durationMicros;if(message.tags&&message.tags.length){object.tags=[];for(var _j=0;_j<message.tags.length;++_j){object.tags[_j]=$root.lightstep.collector.KeyValue.toObject(message.tags[_j],options);}}if(message.logs&&message.logs.length){object.logs=[];for(var _j2=0;_j2<message.logs.length;++_j2){object.logs[_j2]=$root.lightstep.collector.Log.toObject(message.logs[_j2],options);}}return object;};/**
             * Converts this Span to JSON.
             * @function toJSON
             * @memberof lightstep.collector.Span
             * @instance
             * @returns {Object.<string,*>} JSON object
             */Span.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return Span;}();collector.Reporter=function(){/**
             * Properties of a Reporter.
             * @memberof lightstep.collector
             * @interface IReporter
             * @property {number|Long|null} [reporterId] Reporter reporterId
             * @property {Array.<lightstep.collector.IKeyValue>|null} [tags] Reporter tags
             *//**
             * Constructs a new Reporter.
             * @memberof lightstep.collector
             * @classdesc Represents a Reporter.
             * @implements IReporter
             * @constructor
             * @param {lightstep.collector.IReporter=} [properties] Properties to set
             */function Reporter(properties){this.tags=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * Reporter reporterId.
             * @member {number|Long} reporterId
             * @memberof lightstep.collector.Reporter
             * @instance
             */Reporter.prototype.reporterId=$util.Long?$util.Long.fromBits(0,0,true):0;/**
             * Reporter tags.
             * @member {Array.<lightstep.collector.IKeyValue>} tags
             * @memberof lightstep.collector.Reporter
             * @instance
             */Reporter.prototype.tags=$util.emptyArray;/**
             * Creates a new Reporter instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.Reporter
             * @static
             * @param {lightstep.collector.IReporter=} [properties] Properties to set
             * @returns {lightstep.collector.Reporter} Reporter instance
             */Reporter.create=function create(properties){return new Reporter(properties);};/**
             * Encodes the specified Reporter message. Does not implicitly {@link lightstep.collector.Reporter.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.Reporter
             * @static
             * @param {lightstep.collector.IReporter} message Reporter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Reporter.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.reporterId!=null&&message.hasOwnProperty('reporterId'))writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.reporterId);if(message.tags!=null&&message.tags.length)for(var i=0;i<message.tags.length;++i){$root.lightstep.collector.KeyValue.encode(message.tags[i],writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();}return writer;};/**
             * Encodes the specified Reporter message, length delimited. Does not implicitly {@link lightstep.collector.Reporter.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.Reporter
             * @static
             * @param {lightstep.collector.IReporter} message Reporter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Reporter.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a Reporter message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.Reporter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.Reporter} Reporter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Reporter.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.Reporter();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.reporterId=reader.uint64();break;case 4:if(!(message.tags&&message.tags.length))message.tags=[];message.tags.push($root.lightstep.collector.KeyValue.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a Reporter message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.Reporter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.Reporter} Reporter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Reporter.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a Reporter message.
             * @function verify
             * @memberof lightstep.collector.Reporter
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */Reporter.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.reporterId!=null&&message.hasOwnProperty('reporterId'))if(!$util.isInteger(message.reporterId)&&!(message.reporterId&&$util.isInteger(message.reporterId.low)&&$util.isInteger(message.reporterId.high)))return'reporterId: integer|Long expected';if(message.tags!=null&&message.hasOwnProperty('tags')){if(!Array.isArray(message.tags))return'tags: array expected';for(var i=0;i<message.tags.length;++i){var error=$root.lightstep.collector.KeyValue.verify(message.tags[i]);if(error)return'tags.'+error;}}return null;};/**
             * Creates a Reporter message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.Reporter
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.Reporter} Reporter
             */Reporter.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.Reporter)return object;var message=new $root.lightstep.collector.Reporter();if(object.reporterId!=null)if($util.Long)(message.reporterId=$util.Long.fromValue(object.reporterId)).unsigned=true;else if(typeof object.reporterId==='string')message.reporterId=parseInt(object.reporterId,10);else if(typeof object.reporterId==='number')message.reporterId=object.reporterId;else if(typeof object.reporterId==='object')message.reporterId=new $util.LongBits(object.reporterId.low>>>0,object.reporterId.high>>>0).toNumber(true);if(object.tags){if(!Array.isArray(object.tags))throw TypeError('.lightstep.collector.Reporter.tags: array expected');message.tags=[];for(var i=0;i<object.tags.length;++i){if(typeof object.tags[i]!=='object')throw TypeError('.lightstep.collector.Reporter.tags: object expected');message.tags[i]=$root.lightstep.collector.KeyValue.fromObject(object.tags[i]);}}return message;};/**
             * Creates a plain object from a Reporter message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.Reporter
             * @static
             * @param {lightstep.collector.Reporter} message Reporter
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */Reporter.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.tags=[];if(options.defaults)if($util.Long){var long=new $util.Long(0,0,true);object.reporterId=options.longs===String?long.toString():options.longs===Number?long.toNumber():long;}else object.reporterId=options.longs===String?'0':0;if(message.reporterId!=null&&message.hasOwnProperty('reporterId'))if(typeof message.reporterId==='number')object.reporterId=options.longs===String?String(message.reporterId):message.reporterId;else object.reporterId=options.longs===String?$util.Long.prototype.toString.call(message.reporterId):options.longs===Number?new $util.LongBits(message.reporterId.low>>>0,message.reporterId.high>>>0).toNumber(true):message.reporterId;if(message.tags&&message.tags.length){object.tags=[];for(var j=0;j<message.tags.length;++j){object.tags[j]=$root.lightstep.collector.KeyValue.toObject(message.tags[j],options);}}return object;};/**
             * Converts this Reporter to JSON.
             * @function toJSON
             * @memberof lightstep.collector.Reporter
             * @instance
             * @returns {Object.<string,*>} JSON object
             */Reporter.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return Reporter;}();collector.MetricsSample=function(){/**
             * Properties of a MetricsSample.
             * @memberof lightstep.collector
             * @interface IMetricsSample
             * @property {string|null} [name] MetricsSample name
             * @property {number|Long|null} [intValue] MetricsSample intValue
             * @property {number|null} [doubleValue] MetricsSample doubleValue
             *//**
             * Constructs a new MetricsSample.
             * @memberof lightstep.collector
             * @classdesc Represents a MetricsSample.
             * @implements IMetricsSample
             * @constructor
             * @param {lightstep.collector.IMetricsSample=} [properties] Properties to set
             */function MetricsSample(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * MetricsSample name.
             * @member {string} name
             * @memberof lightstep.collector.MetricsSample
             * @instance
             */MetricsSample.prototype.name='';/**
             * MetricsSample intValue.
             * @member {number|Long} intValue
             * @memberof lightstep.collector.MetricsSample
             * @instance
             */MetricsSample.prototype.intValue=$util.Long?$util.Long.fromBits(0,0,false):0;/**
             * MetricsSample doubleValue.
             * @member {number} doubleValue
             * @memberof lightstep.collector.MetricsSample
             * @instance
             */MetricsSample.prototype.doubleValue=0;// OneOf field names bound to virtual getters and setters
var $oneOfFields=void 0;/**
             * MetricsSample value.
             * @member {"intValue"|"doubleValue"|undefined} value
             * @memberof lightstep.collector.MetricsSample
             * @instance
             */Object.defineProperty(MetricsSample.prototype,'value',{get:$util.oneOfGetter($oneOfFields=['intValue','doubleValue']),set:$util.oneOfSetter($oneOfFields)});/**
             * Creates a new MetricsSample instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.MetricsSample
             * @static
             * @param {lightstep.collector.IMetricsSample=} [properties] Properties to set
             * @returns {lightstep.collector.MetricsSample} MetricsSample instance
             */MetricsSample.create=function create(properties){return new MetricsSample(properties);};/**
             * Encodes the specified MetricsSample message. Does not implicitly {@link lightstep.collector.MetricsSample.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.MetricsSample
             * @static
             * @param {lightstep.collector.IMetricsSample} message MetricsSample message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */MetricsSample.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.name!=null&&message.hasOwnProperty('name'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);if(message.intValue!=null&&message.hasOwnProperty('intValue'))writer.uint32(/* id 2, wireType 0 =*/16).int64(message.intValue);if(message.doubleValue!=null&&message.hasOwnProperty('doubleValue'))writer.uint32(/* id 3, wireType 1 =*/25).double(message.doubleValue);return writer;};/**
             * Encodes the specified MetricsSample message, length delimited. Does not implicitly {@link lightstep.collector.MetricsSample.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.MetricsSample
             * @static
             * @param {lightstep.collector.IMetricsSample} message MetricsSample message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */MetricsSample.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a MetricsSample message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.MetricsSample
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.MetricsSample} MetricsSample
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */MetricsSample.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.MetricsSample();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.name=reader.string();break;case 2:message.intValue=reader.int64();break;case 3:message.doubleValue=reader.double();break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a MetricsSample message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.MetricsSample
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.MetricsSample} MetricsSample
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */MetricsSample.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a MetricsSample message.
             * @function verify
             * @memberof lightstep.collector.MetricsSample
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */MetricsSample.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';var properties={};if(message.name!=null&&message.hasOwnProperty('name'))if(!$util.isString(message.name))return'name: string expected';if(message.intValue!=null&&message.hasOwnProperty('intValue')){properties.value=1;if(!$util.isInteger(message.intValue)&&!(message.intValue&&$util.isInteger(message.intValue.low)&&$util.isInteger(message.intValue.high)))return'intValue: integer|Long expected';}if(message.doubleValue!=null&&message.hasOwnProperty('doubleValue')){if(properties.value===1)return'value: multiple values';properties.value=1;if(typeof message.doubleValue!=='number')return'doubleValue: number expected';}return null;};/**
             * Creates a MetricsSample message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.MetricsSample
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.MetricsSample} MetricsSample
             */MetricsSample.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.MetricsSample)return object;var message=new $root.lightstep.collector.MetricsSample();if(object.name!=null)message.name=String(object.name);if(object.intValue!=null)if($util.Long)(message.intValue=$util.Long.fromValue(object.intValue)).unsigned=false;else if(typeof object.intValue==='string')message.intValue=parseInt(object.intValue,10);else if(typeof object.intValue==='number')message.intValue=object.intValue;else if(typeof object.intValue==='object')message.intValue=new $util.LongBits(object.intValue.low>>>0,object.intValue.high>>>0).toNumber();if(object.doubleValue!=null)message.doubleValue=Number(object.doubleValue);return message;};/**
             * Creates a plain object from a MetricsSample message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.MetricsSample
             * @static
             * @param {lightstep.collector.MetricsSample} message MetricsSample
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */MetricsSample.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults)object.name='';if(message.name!=null&&message.hasOwnProperty('name'))object.name=message.name;if(message.intValue!=null&&message.hasOwnProperty('intValue')){if(typeof message.intValue==='number')object.intValue=options.longs===String?String(message.intValue):message.intValue;else object.intValue=options.longs===String?$util.Long.prototype.toString.call(message.intValue):options.longs===Number?new $util.LongBits(message.intValue.low>>>0,message.intValue.high>>>0).toNumber():message.intValue;if(options.oneofs)object.value='intValue';}if(message.doubleValue!=null&&message.hasOwnProperty('doubleValue')){object.doubleValue=options.json&&!isFinite(message.doubleValue)?String(message.doubleValue):message.doubleValue;if(options.oneofs)object.value='doubleValue';}return object;};/**
             * Converts this MetricsSample to JSON.
             * @function toJSON
             * @memberof lightstep.collector.MetricsSample
             * @instance
             * @returns {Object.<string,*>} JSON object
             */MetricsSample.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return MetricsSample;}();collector.InternalMetrics=function(){/**
             * Properties of an InternalMetrics.
             * @memberof lightstep.collector
             * @interface IInternalMetrics
             * @property {google.protobuf.ITimestamp|null} [startTimestamp] InternalMetrics startTimestamp
             * @property {number|Long|null} [durationMicros] InternalMetrics durationMicros
             * @property {Array.<lightstep.collector.ILog>|null} [logs] InternalMetrics logs
             * @property {Array.<lightstep.collector.IMetricsSample>|null} [counts] InternalMetrics counts
             * @property {Array.<lightstep.collector.IMetricsSample>|null} [gauges] InternalMetrics gauges
             *//**
             * Constructs a new InternalMetrics.
             * @memberof lightstep.collector
             * @classdesc Represents an InternalMetrics.
             * @implements IInternalMetrics
             * @constructor
             * @param {lightstep.collector.IInternalMetrics=} [properties] Properties to set
             */function InternalMetrics(properties){this.logs=[];this.counts=[];this.gauges=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * InternalMetrics startTimestamp.
             * @member {google.protobuf.ITimestamp|null|undefined} startTimestamp
             * @memberof lightstep.collector.InternalMetrics
             * @instance
             */InternalMetrics.prototype.startTimestamp=null;/**
             * InternalMetrics durationMicros.
             * @member {number|Long} durationMicros
             * @memberof lightstep.collector.InternalMetrics
             * @instance
             */InternalMetrics.prototype.durationMicros=$util.Long?$util.Long.fromBits(0,0,true):0;/**
             * InternalMetrics logs.
             * @member {Array.<lightstep.collector.ILog>} logs
             * @memberof lightstep.collector.InternalMetrics
             * @instance
             */InternalMetrics.prototype.logs=$util.emptyArray;/**
             * InternalMetrics counts.
             * @member {Array.<lightstep.collector.IMetricsSample>} counts
             * @memberof lightstep.collector.InternalMetrics
             * @instance
             */InternalMetrics.prototype.counts=$util.emptyArray;/**
             * InternalMetrics gauges.
             * @member {Array.<lightstep.collector.IMetricsSample>} gauges
             * @memberof lightstep.collector.InternalMetrics
             * @instance
             */InternalMetrics.prototype.gauges=$util.emptyArray;/**
             * Creates a new InternalMetrics instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.InternalMetrics
             * @static
             * @param {lightstep.collector.IInternalMetrics=} [properties] Properties to set
             * @returns {lightstep.collector.InternalMetrics} InternalMetrics instance
             */InternalMetrics.create=function create(properties){return new InternalMetrics(properties);};/**
             * Encodes the specified InternalMetrics message. Does not implicitly {@link lightstep.collector.InternalMetrics.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.InternalMetrics
             * @static
             * @param {lightstep.collector.IInternalMetrics} message InternalMetrics message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */InternalMetrics.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.startTimestamp!=null&&message.hasOwnProperty('startTimestamp'))$root.google.protobuf.Timestamp.encode(message.startTimestamp,writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();if(message.durationMicros!=null&&message.hasOwnProperty('durationMicros'))writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.durationMicros);if(message.logs!=null&&message.logs.length)for(var i=0;i<message.logs.length;++i){$root.lightstep.collector.Log.encode(message.logs[i],writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();}if(message.counts!=null&&message.counts.length)for(var _i7=0;_i7<message.counts.length;++_i7){$root.lightstep.collector.MetricsSample.encode(message.counts[_i7],writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();}if(message.gauges!=null&&message.gauges.length)for(var _i8=0;_i8<message.gauges.length;++_i8){$root.lightstep.collector.MetricsSample.encode(message.gauges[_i8],writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();}return writer;};/**
             * Encodes the specified InternalMetrics message, length delimited. Does not implicitly {@link lightstep.collector.InternalMetrics.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.InternalMetrics
             * @static
             * @param {lightstep.collector.IInternalMetrics} message InternalMetrics message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */InternalMetrics.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes an InternalMetrics message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.InternalMetrics
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.InternalMetrics} InternalMetrics
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */InternalMetrics.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.InternalMetrics();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.startTimestamp=$root.google.protobuf.Timestamp.decode(reader,reader.uint32());break;case 2:message.durationMicros=reader.uint64();break;case 3:if(!(message.logs&&message.logs.length))message.logs=[];message.logs.push($root.lightstep.collector.Log.decode(reader,reader.uint32()));break;case 4:if(!(message.counts&&message.counts.length))message.counts=[];message.counts.push($root.lightstep.collector.MetricsSample.decode(reader,reader.uint32()));break;case 5:if(!(message.gauges&&message.gauges.length))message.gauges=[];message.gauges.push($root.lightstep.collector.MetricsSample.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes an InternalMetrics message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.InternalMetrics
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.InternalMetrics} InternalMetrics
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */InternalMetrics.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies an InternalMetrics message.
             * @function verify
             * @memberof lightstep.collector.InternalMetrics
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */InternalMetrics.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.startTimestamp!=null&&message.hasOwnProperty('startTimestamp')){var error=$root.google.protobuf.Timestamp.verify(message.startTimestamp);if(error)return'startTimestamp.'+error;}if(message.durationMicros!=null&&message.hasOwnProperty('durationMicros'))if(!$util.isInteger(message.durationMicros)&&!(message.durationMicros&&$util.isInteger(message.durationMicros.low)&&$util.isInteger(message.durationMicros.high)))return'durationMicros: integer|Long expected';if(message.logs!=null&&message.hasOwnProperty('logs')){if(!Array.isArray(message.logs))return'logs: array expected';for(var i=0;i<message.logs.length;++i){var _error6=$root.lightstep.collector.Log.verify(message.logs[i]);if(_error6)return'logs.'+_error6;}}if(message.counts!=null&&message.hasOwnProperty('counts')){if(!Array.isArray(message.counts))return'counts: array expected';for(var _i9=0;_i9<message.counts.length;++_i9){var _error7=$root.lightstep.collector.MetricsSample.verify(message.counts[_i9]);if(_error7)return'counts.'+_error7;}}if(message.gauges!=null&&message.hasOwnProperty('gauges')){if(!Array.isArray(message.gauges))return'gauges: array expected';for(var _i10=0;_i10<message.gauges.length;++_i10){var _error8=$root.lightstep.collector.MetricsSample.verify(message.gauges[_i10]);if(_error8)return'gauges.'+_error8;}}return null;};/**
             * Creates an InternalMetrics message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.InternalMetrics
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.InternalMetrics} InternalMetrics
             */InternalMetrics.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.InternalMetrics)return object;var message=new $root.lightstep.collector.InternalMetrics();if(object.startTimestamp!=null){if(typeof object.startTimestamp!=='object')throw TypeError('.lightstep.collector.InternalMetrics.startTimestamp: object expected');message.startTimestamp=$root.google.protobuf.Timestamp.fromObject(object.startTimestamp);}if(object.durationMicros!=null)if($util.Long)(message.durationMicros=$util.Long.fromValue(object.durationMicros)).unsigned=true;else if(typeof object.durationMicros==='string')message.durationMicros=parseInt(object.durationMicros,10);else if(typeof object.durationMicros==='number')message.durationMicros=object.durationMicros;else if(typeof object.durationMicros==='object')message.durationMicros=new $util.LongBits(object.durationMicros.low>>>0,object.durationMicros.high>>>0).toNumber(true);if(object.logs){if(!Array.isArray(object.logs))throw TypeError('.lightstep.collector.InternalMetrics.logs: array expected');message.logs=[];for(var i=0;i<object.logs.length;++i){if(typeof object.logs[i]!=='object')throw TypeError('.lightstep.collector.InternalMetrics.logs: object expected');message.logs[i]=$root.lightstep.collector.Log.fromObject(object.logs[i]);}}if(object.counts){if(!Array.isArray(object.counts))throw TypeError('.lightstep.collector.InternalMetrics.counts: array expected');message.counts=[];for(var _i11=0;_i11<object.counts.length;++_i11){if(typeof object.counts[_i11]!=='object')throw TypeError('.lightstep.collector.InternalMetrics.counts: object expected');message.counts[_i11]=$root.lightstep.collector.MetricsSample.fromObject(object.counts[_i11]);}}if(object.gauges){if(!Array.isArray(object.gauges))throw TypeError('.lightstep.collector.InternalMetrics.gauges: array expected');message.gauges=[];for(var _i12=0;_i12<object.gauges.length;++_i12){if(typeof object.gauges[_i12]!=='object')throw TypeError('.lightstep.collector.InternalMetrics.gauges: object expected');message.gauges[_i12]=$root.lightstep.collector.MetricsSample.fromObject(object.gauges[_i12]);}}return message;};/**
             * Creates a plain object from an InternalMetrics message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.InternalMetrics
             * @static
             * @param {lightstep.collector.InternalMetrics} message InternalMetrics
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */InternalMetrics.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults){object.logs=[];object.counts=[];object.gauges=[];}if(options.defaults){object.startTimestamp=null;if($util.Long){var long=new $util.Long(0,0,true);object.durationMicros=options.longs===String?long.toString():options.longs===Number?long.toNumber():long;}else object.durationMicros=options.longs===String?'0':0;}if(message.startTimestamp!=null&&message.hasOwnProperty('startTimestamp'))object.startTimestamp=$root.google.protobuf.Timestamp.toObject(message.startTimestamp,options);if(message.durationMicros!=null&&message.hasOwnProperty('durationMicros'))if(typeof message.durationMicros==='number')object.durationMicros=options.longs===String?String(message.durationMicros):message.durationMicros;else object.durationMicros=options.longs===String?$util.Long.prototype.toString.call(message.durationMicros):options.longs===Number?new $util.LongBits(message.durationMicros.low>>>0,message.durationMicros.high>>>0).toNumber(true):message.durationMicros;if(message.logs&&message.logs.length){object.logs=[];for(var j=0;j<message.logs.length;++j){object.logs[j]=$root.lightstep.collector.Log.toObject(message.logs[j],options);}}if(message.counts&&message.counts.length){object.counts=[];for(var _j3=0;_j3<message.counts.length;++_j3){object.counts[_j3]=$root.lightstep.collector.MetricsSample.toObject(message.counts[_j3],options);}}if(message.gauges&&message.gauges.length){object.gauges=[];for(var _j4=0;_j4<message.gauges.length;++_j4){object.gauges[_j4]=$root.lightstep.collector.MetricsSample.toObject(message.gauges[_j4],options);}}return object;};/**
             * Converts this InternalMetrics to JSON.
             * @function toJSON
             * @memberof lightstep.collector.InternalMetrics
             * @instance
             * @returns {Object.<string,*>} JSON object
             */InternalMetrics.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return InternalMetrics;}();collector.Auth=function(){/**
             * Properties of an Auth.
             * @memberof lightstep.collector
             * @interface IAuth
             * @property {string|null} [accessToken] Auth accessToken
             *//**
             * Constructs a new Auth.
             * @memberof lightstep.collector
             * @classdesc Represents an Auth.
             * @implements IAuth
             * @constructor
             * @param {lightstep.collector.IAuth=} [properties] Properties to set
             */function Auth(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * Auth accessToken.
             * @member {string} accessToken
             * @memberof lightstep.collector.Auth
             * @instance
             */Auth.prototype.accessToken='';/**
             * Creates a new Auth instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.Auth
             * @static
             * @param {lightstep.collector.IAuth=} [properties] Properties to set
             * @returns {lightstep.collector.Auth} Auth instance
             */Auth.create=function create(properties){return new Auth(properties);};/**
             * Encodes the specified Auth message. Does not implicitly {@link lightstep.collector.Auth.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.Auth
             * @static
             * @param {lightstep.collector.IAuth} message Auth message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Auth.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.accessToken!=null&&message.hasOwnProperty('accessToken'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.accessToken);return writer;};/**
             * Encodes the specified Auth message, length delimited. Does not implicitly {@link lightstep.collector.Auth.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.Auth
             * @static
             * @param {lightstep.collector.IAuth} message Auth message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Auth.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes an Auth message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.Auth
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.Auth} Auth
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Auth.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.Auth();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.accessToken=reader.string();break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes an Auth message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.Auth
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.Auth} Auth
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Auth.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies an Auth message.
             * @function verify
             * @memberof lightstep.collector.Auth
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */Auth.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.accessToken!=null&&message.hasOwnProperty('accessToken'))if(!$util.isString(message.accessToken))return'accessToken: string expected';return null;};/**
             * Creates an Auth message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.Auth
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.Auth} Auth
             */Auth.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.Auth)return object;var message=new $root.lightstep.collector.Auth();if(object.accessToken!=null)message.accessToken=String(object.accessToken);return message;};/**
             * Creates a plain object from an Auth message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.Auth
             * @static
             * @param {lightstep.collector.Auth} message Auth
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */Auth.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults)object.accessToken='';if(message.accessToken!=null&&message.hasOwnProperty('accessToken'))object.accessToken=message.accessToken;return object;};/**
             * Converts this Auth to JSON.
             * @function toJSON
             * @memberof lightstep.collector.Auth
             * @instance
             * @returns {Object.<string,*>} JSON object
             */Auth.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return Auth;}();collector.ReportRequest=function(){/**
             * Properties of a ReportRequest.
             * @memberof lightstep.collector
             * @interface IReportRequest
             * @property {lightstep.collector.IReporter|null} [reporter] ReportRequest reporter
             * @property {lightstep.collector.IAuth|null} [auth] ReportRequest auth
             * @property {Array.<lightstep.collector.ISpan>|null} [spans] ReportRequest spans
             * @property {number|Long|null} [timestampOffsetMicros] ReportRequest timestampOffsetMicros
             * @property {lightstep.collector.IInternalMetrics|null} [internalMetrics] ReportRequest internalMetrics
             *//**
             * Constructs a new ReportRequest.
             * @memberof lightstep.collector
             * @classdesc Represents a ReportRequest.
             * @implements IReportRequest
             * @constructor
             * @param {lightstep.collector.IReportRequest=} [properties] Properties to set
             */function ReportRequest(properties){this.spans=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * ReportRequest reporter.
             * @member {lightstep.collector.IReporter|null|undefined} reporter
             * @memberof lightstep.collector.ReportRequest
             * @instance
             */ReportRequest.prototype.reporter=null;/**
             * ReportRequest auth.
             * @member {lightstep.collector.IAuth|null|undefined} auth
             * @memberof lightstep.collector.ReportRequest
             * @instance
             */ReportRequest.prototype.auth=null;/**
             * ReportRequest spans.
             * @member {Array.<lightstep.collector.ISpan>} spans
             * @memberof lightstep.collector.ReportRequest
             * @instance
             */ReportRequest.prototype.spans=$util.emptyArray;/**
             * ReportRequest timestampOffsetMicros.
             * @member {number|Long} timestampOffsetMicros
             * @memberof lightstep.collector.ReportRequest
             * @instance
             */ReportRequest.prototype.timestampOffsetMicros=$util.Long?$util.Long.fromBits(0,0,false):0;/**
             * ReportRequest internalMetrics.
             * @member {lightstep.collector.IInternalMetrics|null|undefined} internalMetrics
             * @memberof lightstep.collector.ReportRequest
             * @instance
             */ReportRequest.prototype.internalMetrics=null;/**
             * Creates a new ReportRequest instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.ReportRequest
             * @static
             * @param {lightstep.collector.IReportRequest=} [properties] Properties to set
             * @returns {lightstep.collector.ReportRequest} ReportRequest instance
             */ReportRequest.create=function create(properties){return new ReportRequest(properties);};/**
             * Encodes the specified ReportRequest message. Does not implicitly {@link lightstep.collector.ReportRequest.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.ReportRequest
             * @static
             * @param {lightstep.collector.IReportRequest} message ReportRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */ReportRequest.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.reporter!=null&&message.hasOwnProperty('reporter'))$root.lightstep.collector.Reporter.encode(message.reporter,writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();if(message.auth!=null&&message.hasOwnProperty('auth'))$root.lightstep.collector.Auth.encode(message.auth,writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();if(message.spans!=null&&message.spans.length)for(var i=0;i<message.spans.length;++i){$root.lightstep.collector.Span.encode(message.spans[i],writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();}if(message.timestampOffsetMicros!=null&&message.hasOwnProperty('timestampOffsetMicros'))writer.uint32(/* id 5, wireType 0 =*/40).int64(message.timestampOffsetMicros);if(message.internalMetrics!=null&&message.hasOwnProperty('internalMetrics'))$root.lightstep.collector.InternalMetrics.encode(message.internalMetrics,writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();return writer;};/**
             * Encodes the specified ReportRequest message, length delimited. Does not implicitly {@link lightstep.collector.ReportRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.ReportRequest
             * @static
             * @param {lightstep.collector.IReportRequest} message ReportRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */ReportRequest.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a ReportRequest message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.ReportRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.ReportRequest} ReportRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */ReportRequest.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.ReportRequest();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.reporter=$root.lightstep.collector.Reporter.decode(reader,reader.uint32());break;case 2:message.auth=$root.lightstep.collector.Auth.decode(reader,reader.uint32());break;case 3:if(!(message.spans&&message.spans.length))message.spans=[];message.spans.push($root.lightstep.collector.Span.decode(reader,reader.uint32()));break;case 5:message.timestampOffsetMicros=reader.int64();break;case 6:message.internalMetrics=$root.lightstep.collector.InternalMetrics.decode(reader,reader.uint32());break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a ReportRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.ReportRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.ReportRequest} ReportRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */ReportRequest.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a ReportRequest message.
             * @function verify
             * @memberof lightstep.collector.ReportRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */ReportRequest.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.reporter!=null&&message.hasOwnProperty('reporter')){var error=$root.lightstep.collector.Reporter.verify(message.reporter);if(error)return'reporter.'+error;}if(message.auth!=null&&message.hasOwnProperty('auth')){var _error9=$root.lightstep.collector.Auth.verify(message.auth);if(_error9)return'auth.'+_error9;}if(message.spans!=null&&message.hasOwnProperty('spans')){if(!Array.isArray(message.spans))return'spans: array expected';for(var i=0;i<message.spans.length;++i){var _error10=$root.lightstep.collector.Span.verify(message.spans[i]);if(_error10)return'spans.'+_error10;}}if(message.timestampOffsetMicros!=null&&message.hasOwnProperty('timestampOffsetMicros'))if(!$util.isInteger(message.timestampOffsetMicros)&&!(message.timestampOffsetMicros&&$util.isInteger(message.timestampOffsetMicros.low)&&$util.isInteger(message.timestampOffsetMicros.high)))return'timestampOffsetMicros: integer|Long expected';if(message.internalMetrics!=null&&message.hasOwnProperty('internalMetrics')){var _error11=$root.lightstep.collector.InternalMetrics.verify(message.internalMetrics);if(_error11)return'internalMetrics.'+_error11;}return null;};/**
             * Creates a ReportRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.ReportRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.ReportRequest} ReportRequest
             */ReportRequest.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.ReportRequest)return object;var message=new $root.lightstep.collector.ReportRequest();if(object.reporter!=null){if(typeof object.reporter!=='object')throw TypeError('.lightstep.collector.ReportRequest.reporter: object expected');message.reporter=$root.lightstep.collector.Reporter.fromObject(object.reporter);}if(object.auth!=null){if(typeof object.auth!=='object')throw TypeError('.lightstep.collector.ReportRequest.auth: object expected');message.auth=$root.lightstep.collector.Auth.fromObject(object.auth);}if(object.spans){if(!Array.isArray(object.spans))throw TypeError('.lightstep.collector.ReportRequest.spans: array expected');message.spans=[];for(var i=0;i<object.spans.length;++i){if(typeof object.spans[i]!=='object')throw TypeError('.lightstep.collector.ReportRequest.spans: object expected');message.spans[i]=$root.lightstep.collector.Span.fromObject(object.spans[i]);}}if(object.timestampOffsetMicros!=null)if($util.Long)(message.timestampOffsetMicros=$util.Long.fromValue(object.timestampOffsetMicros)).unsigned=false;else if(typeof object.timestampOffsetMicros==='string')message.timestampOffsetMicros=parseInt(object.timestampOffsetMicros,10);else if(typeof object.timestampOffsetMicros==='number')message.timestampOffsetMicros=object.timestampOffsetMicros;else if(typeof object.timestampOffsetMicros==='object')message.timestampOffsetMicros=new $util.LongBits(object.timestampOffsetMicros.low>>>0,object.timestampOffsetMicros.high>>>0).toNumber();if(object.internalMetrics!=null){if(typeof object.internalMetrics!=='object')throw TypeError('.lightstep.collector.ReportRequest.internalMetrics: object expected');message.internalMetrics=$root.lightstep.collector.InternalMetrics.fromObject(object.internalMetrics);}return message;};/**
             * Creates a plain object from a ReportRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.ReportRequest
             * @static
             * @param {lightstep.collector.ReportRequest} message ReportRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */ReportRequest.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.spans=[];if(options.defaults){object.reporter=null;object.auth=null;if($util.Long){var long=new $util.Long(0,0,false);object.timestampOffsetMicros=options.longs===String?long.toString():options.longs===Number?long.toNumber():long;}else object.timestampOffsetMicros=options.longs===String?'0':0;object.internalMetrics=null;}if(message.reporter!=null&&message.hasOwnProperty('reporter'))object.reporter=$root.lightstep.collector.Reporter.toObject(message.reporter,options);if(message.auth!=null&&message.hasOwnProperty('auth'))object.auth=$root.lightstep.collector.Auth.toObject(message.auth,options);if(message.spans&&message.spans.length){object.spans=[];for(var j=0;j<message.spans.length;++j){object.spans[j]=$root.lightstep.collector.Span.toObject(message.spans[j],options);}}if(message.timestampOffsetMicros!=null&&message.hasOwnProperty('timestampOffsetMicros'))if(typeof message.timestampOffsetMicros==='number')object.timestampOffsetMicros=options.longs===String?String(message.timestampOffsetMicros):message.timestampOffsetMicros;else object.timestampOffsetMicros=options.longs===String?$util.Long.prototype.toString.call(message.timestampOffsetMicros):options.longs===Number?new $util.LongBits(message.timestampOffsetMicros.low>>>0,message.timestampOffsetMicros.high>>>0).toNumber():message.timestampOffsetMicros;if(message.internalMetrics!=null&&message.hasOwnProperty('internalMetrics'))object.internalMetrics=$root.lightstep.collector.InternalMetrics.toObject(message.internalMetrics,options);return object;};/**
             * Converts this ReportRequest to JSON.
             * @function toJSON
             * @memberof lightstep.collector.ReportRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */ReportRequest.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return ReportRequest;}();collector.Command=function(){/**
             * Properties of a Command.
             * @memberof lightstep.collector
             * @interface ICommand
             * @property {boolean|null} [disable] Command disable
             *//**
             * Constructs a new Command.
             * @memberof lightstep.collector
             * @classdesc Represents a Command.
             * @implements ICommand
             * @constructor
             * @param {lightstep.collector.ICommand=} [properties] Properties to set
             */function Command(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * Command disable.
             * @member {boolean} disable
             * @memberof lightstep.collector.Command
             * @instance
             */Command.prototype.disable=false;/**
             * Creates a new Command instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.Command
             * @static
             * @param {lightstep.collector.ICommand=} [properties] Properties to set
             * @returns {lightstep.collector.Command} Command instance
             */Command.create=function create(properties){return new Command(properties);};/**
             * Encodes the specified Command message. Does not implicitly {@link lightstep.collector.Command.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.Command
             * @static
             * @param {lightstep.collector.ICommand} message Command message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Command.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.disable!=null&&message.hasOwnProperty('disable'))writer.uint32(/* id 1, wireType 0 =*/8).bool(message.disable);return writer;};/**
             * Encodes the specified Command message, length delimited. Does not implicitly {@link lightstep.collector.Command.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.Command
             * @static
             * @param {lightstep.collector.ICommand} message Command message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Command.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a Command message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.Command
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.Command} Command
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Command.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.Command();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.disable=reader.bool();break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a Command message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.Command
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.Command} Command
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Command.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a Command message.
             * @function verify
             * @memberof lightstep.collector.Command
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */Command.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.disable!=null&&message.hasOwnProperty('disable'))if(typeof message.disable!=='boolean')return'disable: boolean expected';return null;};/**
             * Creates a Command message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.Command
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.Command} Command
             */Command.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.Command)return object;var message=new $root.lightstep.collector.Command();if(object.disable!=null)message.disable=Boolean(object.disable);return message;};/**
             * Creates a plain object from a Command message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.Command
             * @static
             * @param {lightstep.collector.Command} message Command
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */Command.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults)object.disable=false;if(message.disable!=null&&message.hasOwnProperty('disable'))object.disable=message.disable;return object;};/**
             * Converts this Command to JSON.
             * @function toJSON
             * @memberof lightstep.collector.Command
             * @instance
             * @returns {Object.<string,*>} JSON object
             */Command.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return Command;}();collector.ReportResponse=function(){/**
             * Properties of a ReportResponse.
             * @memberof lightstep.collector
             * @interface IReportResponse
             * @property {Array.<lightstep.collector.ICommand>|null} [commands] ReportResponse commands
             * @property {google.protobuf.ITimestamp|null} [receiveTimestamp] ReportResponse receiveTimestamp
             * @property {google.protobuf.ITimestamp|null} [transmitTimestamp] ReportResponse transmitTimestamp
             * @property {Array.<string>|null} [errors] ReportResponse errors
             * @property {Array.<string>|null} [warnings] ReportResponse warnings
             * @property {Array.<string>|null} [infos] ReportResponse infos
             *//**
             * Constructs a new ReportResponse.
             * @memberof lightstep.collector
             * @classdesc Represents a ReportResponse.
             * @implements IReportResponse
             * @constructor
             * @param {lightstep.collector.IReportResponse=} [properties] Properties to set
             */function ReportResponse(properties){this.commands=[];this.errors=[];this.warnings=[];this.infos=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * ReportResponse commands.
             * @member {Array.<lightstep.collector.ICommand>} commands
             * @memberof lightstep.collector.ReportResponse
             * @instance
             */ReportResponse.prototype.commands=$util.emptyArray;/**
             * ReportResponse receiveTimestamp.
             * @member {google.protobuf.ITimestamp|null|undefined} receiveTimestamp
             * @memberof lightstep.collector.ReportResponse
             * @instance
             */ReportResponse.prototype.receiveTimestamp=null;/**
             * ReportResponse transmitTimestamp.
             * @member {google.protobuf.ITimestamp|null|undefined} transmitTimestamp
             * @memberof lightstep.collector.ReportResponse
             * @instance
             */ReportResponse.prototype.transmitTimestamp=null;/**
             * ReportResponse errors.
             * @member {Array.<string>} errors
             * @memberof lightstep.collector.ReportResponse
             * @instance
             */ReportResponse.prototype.errors=$util.emptyArray;/**
             * ReportResponse warnings.
             * @member {Array.<string>} warnings
             * @memberof lightstep.collector.ReportResponse
             * @instance
             */ReportResponse.prototype.warnings=$util.emptyArray;/**
             * ReportResponse infos.
             * @member {Array.<string>} infos
             * @memberof lightstep.collector.ReportResponse
             * @instance
             */ReportResponse.prototype.infos=$util.emptyArray;/**
             * Creates a new ReportResponse instance using the specified properties.
             * @function create
             * @memberof lightstep.collector.ReportResponse
             * @static
             * @param {lightstep.collector.IReportResponse=} [properties] Properties to set
             * @returns {lightstep.collector.ReportResponse} ReportResponse instance
             */ReportResponse.create=function create(properties){return new ReportResponse(properties);};/**
             * Encodes the specified ReportResponse message. Does not implicitly {@link lightstep.collector.ReportResponse.verify|verify} messages.
             * @function encode
             * @memberof lightstep.collector.ReportResponse
             * @static
             * @param {lightstep.collector.IReportResponse} message ReportResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */ReportResponse.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.commands!=null&&message.commands.length)for(var i=0;i<message.commands.length;++i){$root.lightstep.collector.Command.encode(message.commands[i],writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();}if(message.receiveTimestamp!=null&&message.hasOwnProperty('receiveTimestamp'))$root.google.protobuf.Timestamp.encode(message.receiveTimestamp,writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();if(message.transmitTimestamp!=null&&message.hasOwnProperty('transmitTimestamp'))$root.google.protobuf.Timestamp.encode(message.transmitTimestamp,writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();if(message.errors!=null&&message.errors.length)for(var _i13=0;_i13<message.errors.length;++_i13){writer.uint32(/* id 4, wireType 2 =*/34).string(message.errors[_i13]);}if(message.warnings!=null&&message.warnings.length)for(var _i14=0;_i14<message.warnings.length;++_i14){writer.uint32(/* id 5, wireType 2 =*/42).string(message.warnings[_i14]);}if(message.infos!=null&&message.infos.length)for(var _i15=0;_i15<message.infos.length;++_i15){writer.uint32(/* id 6, wireType 2 =*/50).string(message.infos[_i15]);}return writer;};/**
             * Encodes the specified ReportResponse message, length delimited. Does not implicitly {@link lightstep.collector.ReportResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof lightstep.collector.ReportResponse
             * @static
             * @param {lightstep.collector.IReportResponse} message ReportResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */ReportResponse.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a ReportResponse message from the specified reader or buffer.
             * @function decode
             * @memberof lightstep.collector.ReportResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {lightstep.collector.ReportResponse} ReportResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */ReportResponse.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.lightstep.collector.ReportResponse();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:if(!(message.commands&&message.commands.length))message.commands=[];message.commands.push($root.lightstep.collector.Command.decode(reader,reader.uint32()));break;case 2:message.receiveTimestamp=$root.google.protobuf.Timestamp.decode(reader,reader.uint32());break;case 3:message.transmitTimestamp=$root.google.protobuf.Timestamp.decode(reader,reader.uint32());break;case 4:if(!(message.errors&&message.errors.length))message.errors=[];message.errors.push(reader.string());break;case 5:if(!(message.warnings&&message.warnings.length))message.warnings=[];message.warnings.push(reader.string());break;case 6:if(!(message.infos&&message.infos.length))message.infos=[];message.infos.push(reader.string());break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a ReportResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof lightstep.collector.ReportResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {lightstep.collector.ReportResponse} ReportResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */ReportResponse.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a ReportResponse message.
             * @function verify
             * @memberof lightstep.collector.ReportResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */ReportResponse.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.commands!=null&&message.hasOwnProperty('commands')){if(!Array.isArray(message.commands))return'commands: array expected';for(var i=0;i<message.commands.length;++i){var error=$root.lightstep.collector.Command.verify(message.commands[i]);if(error)return'commands.'+error;}}if(message.receiveTimestamp!=null&&message.hasOwnProperty('receiveTimestamp')){var _error12=$root.google.protobuf.Timestamp.verify(message.receiveTimestamp);if(_error12)return'receiveTimestamp.'+_error12;}if(message.transmitTimestamp!=null&&message.hasOwnProperty('transmitTimestamp')){var _error13=$root.google.protobuf.Timestamp.verify(message.transmitTimestamp);if(_error13)return'transmitTimestamp.'+_error13;}if(message.errors!=null&&message.hasOwnProperty('errors')){if(!Array.isArray(message.errors))return'errors: array expected';for(var _i16=0;_i16<message.errors.length;++_i16){if(!$util.isString(message.errors[_i16]))return'errors: string[] expected';}}if(message.warnings!=null&&message.hasOwnProperty('warnings')){if(!Array.isArray(message.warnings))return'warnings: array expected';for(var _i17=0;_i17<message.warnings.length;++_i17){if(!$util.isString(message.warnings[_i17]))return'warnings: string[] expected';}}if(message.infos!=null&&message.hasOwnProperty('infos')){if(!Array.isArray(message.infos))return'infos: array expected';for(var _i18=0;_i18<message.infos.length;++_i18){if(!$util.isString(message.infos[_i18]))return'infos: string[] expected';}}return null;};/**
             * Creates a ReportResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof lightstep.collector.ReportResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {lightstep.collector.ReportResponse} ReportResponse
             */ReportResponse.fromObject=function fromObject(object){if(object instanceof $root.lightstep.collector.ReportResponse)return object;var message=new $root.lightstep.collector.ReportResponse();if(object.commands){if(!Array.isArray(object.commands))throw TypeError('.lightstep.collector.ReportResponse.commands: array expected');message.commands=[];for(var i=0;i<object.commands.length;++i){if(typeof object.commands[i]!=='object')throw TypeError('.lightstep.collector.ReportResponse.commands: object expected');message.commands[i]=$root.lightstep.collector.Command.fromObject(object.commands[i]);}}if(object.receiveTimestamp!=null){if(typeof object.receiveTimestamp!=='object')throw TypeError('.lightstep.collector.ReportResponse.receiveTimestamp: object expected');message.receiveTimestamp=$root.google.protobuf.Timestamp.fromObject(object.receiveTimestamp);}if(object.transmitTimestamp!=null){if(typeof object.transmitTimestamp!=='object')throw TypeError('.lightstep.collector.ReportResponse.transmitTimestamp: object expected');message.transmitTimestamp=$root.google.protobuf.Timestamp.fromObject(object.transmitTimestamp);}if(object.errors){if(!Array.isArray(object.errors))throw TypeError('.lightstep.collector.ReportResponse.errors: array expected');message.errors=[];for(var _i19=0;_i19<object.errors.length;++_i19){message.errors[_i19]=String(object.errors[_i19]);}}if(object.warnings){if(!Array.isArray(object.warnings))throw TypeError('.lightstep.collector.ReportResponse.warnings: array expected');message.warnings=[];for(var _i20=0;_i20<object.warnings.length;++_i20){message.warnings[_i20]=String(object.warnings[_i20]);}}if(object.infos){if(!Array.isArray(object.infos))throw TypeError('.lightstep.collector.ReportResponse.infos: array expected');message.infos=[];for(var _i21=0;_i21<object.infos.length;++_i21){message.infos[_i21]=String(object.infos[_i21]);}}return message;};/**
             * Creates a plain object from a ReportResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof lightstep.collector.ReportResponse
             * @static
             * @param {lightstep.collector.ReportResponse} message ReportResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */ReportResponse.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults){object.commands=[];object.errors=[];object.warnings=[];object.infos=[];}if(options.defaults){object.receiveTimestamp=null;object.transmitTimestamp=null;}if(message.commands&&message.commands.length){object.commands=[];for(var j=0;j<message.commands.length;++j){object.commands[j]=$root.lightstep.collector.Command.toObject(message.commands[j],options);}}if(message.receiveTimestamp!=null&&message.hasOwnProperty('receiveTimestamp'))object.receiveTimestamp=$root.google.protobuf.Timestamp.toObject(message.receiveTimestamp,options);if(message.transmitTimestamp!=null&&message.hasOwnProperty('transmitTimestamp'))object.transmitTimestamp=$root.google.protobuf.Timestamp.toObject(message.transmitTimestamp,options);if(message.errors&&message.errors.length){object.errors=[];for(var _j5=0;_j5<message.errors.length;++_j5){object.errors[_j5]=message.errors[_j5];}}if(message.warnings&&message.warnings.length){object.warnings=[];for(var _j6=0;_j6<message.warnings.length;++_j6){object.warnings[_j6]=message.warnings[_j6];}}if(message.infos&&message.infos.length){object.infos=[];for(var _j7=0;_j7<message.infos.length;++_j7){object.infos[_j7]=message.infos[_j7];}}return object;};/**
             * Converts this ReportResponse to JSON.
             * @function toJSON
             * @memberof lightstep.collector.ReportResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */ReportResponse.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return ReportResponse;}();collector.CollectorService=function(){/**
             * Constructs a new CollectorService service.
             * @memberof lightstep.collector
             * @classdesc Represents a CollectorService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */function CollectorService(rpcImpl,requestDelimited,responseDelimited){$protobuf.rpc.Service.call(this,rpcImpl,requestDelimited,responseDelimited);}(CollectorService.prototype=Object.create($protobuf.rpc.Service.prototype)).constructor=CollectorService;/**
             * Creates new CollectorService service using the specified rpc implementation.
             * @function create
             * @memberof lightstep.collector.CollectorService
             * @static
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             * @returns {CollectorService} RPC service. Useful where requests and/or responses are streamed.
             */CollectorService.create=function create(rpcImpl,requestDelimited,responseDelimited){return new this(rpcImpl,requestDelimited,responseDelimited);};/**
             * Callback as used by {@link lightstep.collector.CollectorService#report}.
             * @memberof lightstep.collector.CollectorService
             * @typedef ReportCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {lightstep.collector.ReportResponse} [response] ReportResponse
             *//**
             * Calls Report.
             * @function report
             * @memberof lightstep.collector.CollectorService
             * @instance
             * @param {lightstep.collector.IReportRequest} request ReportRequest message or plain object
             * @param {lightstep.collector.CollectorService.ReportCallback} callback Node-style callback called with the error, if any, and ReportResponse
             * @returns {undefined}
             * @variation 1
             */Object.defineProperty(CollectorService.prototype.report=function report(request,callback){return this.rpcCall(report,$root.lightstep.collector.ReportRequest,$root.lightstep.collector.ReportResponse,request,callback);},'name',{value:'Report'});/**
             * Calls Report.
             * @function report
             * @memberof lightstep.collector.CollectorService
             * @instance
             * @param {lightstep.collector.IReportRequest} request ReportRequest message or plain object
             * @returns {Promise<lightstep.collector.ReportResponse>} Promise
             * @variation 2
             */return CollectorService;}();return collector;}();return lightstep;}();var google=exports.google=$root.google=function(){/**
     * Namespace google.
     * @exports google
     * @namespace
     */var google={};google.protobuf=function(){/**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */var protobuf={};protobuf.Timestamp=function(){/**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             *//**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */function Timestamp(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */Timestamp.prototype.seconds=$util.Long?$util.Long.fromBits(0,0,false):0;/**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */Timestamp.prototype.nanos=0;/**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */Timestamp.create=function create(properties){return new Timestamp(properties);};/**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Timestamp.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.seconds!=null&&message.hasOwnProperty('seconds'))writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);if(message.nanos!=null&&message.hasOwnProperty('nanos'))writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);return writer;};/**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Timestamp.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Timestamp.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.Timestamp();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.seconds=reader.int64();break;case 2:message.nanos=reader.int32();break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Timestamp.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */Timestamp.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.seconds!=null&&message.hasOwnProperty('seconds'))if(!$util.isInteger(message.seconds)&&!(message.seconds&&$util.isInteger(message.seconds.low)&&$util.isInteger(message.seconds.high)))return'seconds: integer|Long expected';if(message.nanos!=null&&message.hasOwnProperty('nanos'))if(!$util.isInteger(message.nanos))return'nanos: integer expected';return null;};/**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */Timestamp.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.Timestamp)return object;var message=new $root.google.protobuf.Timestamp();if(object.seconds!=null)if($util.Long)(message.seconds=$util.Long.fromValue(object.seconds)).unsigned=false;else if(typeof object.seconds==='string')message.seconds=parseInt(object.seconds,10);else if(typeof object.seconds==='number')message.seconds=object.seconds;else if(typeof object.seconds==='object')message.seconds=new $util.LongBits(object.seconds.low>>>0,object.seconds.high>>>0).toNumber();if(object.nanos!=null)message.nanos=object.nanos|0;return message;};/**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */Timestamp.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults){if($util.Long){var long=new $util.Long(0,0,false);object.seconds=options.longs===String?long.toString():options.longs===Number?long.toNumber():long;}else object.seconds=options.longs===String?'0':0;object.nanos=0;}if(message.seconds!=null&&message.hasOwnProperty('seconds'))if(typeof message.seconds==='number')object.seconds=options.longs===String?String(message.seconds):message.seconds;else object.seconds=options.longs===String?$util.Long.prototype.toString.call(message.seconds):options.longs===Number?new $util.LongBits(message.seconds.low>>>0,message.seconds.high>>>0).toNumber():message.seconds;if(message.nanos!=null&&message.hasOwnProperty('nanos'))object.nanos=message.nanos;return object;};/**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */Timestamp.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return Timestamp;}();protobuf.FileDescriptorSet=function(){/**
             * Properties of a FileDescriptorSet.
             * @memberof google.protobuf
             * @interface IFileDescriptorSet
             * @property {Array.<google.protobuf.IFileDescriptorProto>|null} [file] FileDescriptorSet file
             *//**
             * Constructs a new FileDescriptorSet.
             * @memberof google.protobuf
             * @classdesc Represents a FileDescriptorSet.
             * @implements IFileDescriptorSet
             * @constructor
             * @param {google.protobuf.IFileDescriptorSet=} [properties] Properties to set
             */function FileDescriptorSet(properties){this.file=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * FileDescriptorSet file.
             * @member {Array.<google.protobuf.IFileDescriptorProto>} file
             * @memberof google.protobuf.FileDescriptorSet
             * @instance
             */FileDescriptorSet.prototype.file=$util.emptyArray;/**
             * Creates a new FileDescriptorSet instance using the specified properties.
             * @function create
             * @memberof google.protobuf.FileDescriptorSet
             * @static
             * @param {google.protobuf.IFileDescriptorSet=} [properties] Properties to set
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet instance
             */FileDescriptorSet.create=function create(properties){return new FileDescriptorSet(properties);};/**
             * Encodes the specified FileDescriptorSet message. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.FileDescriptorSet
             * @static
             * @param {google.protobuf.IFileDescriptorSet} message FileDescriptorSet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */FileDescriptorSet.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.file!=null&&message.file.length)for(var i=0;i<message.file.length;++i){$root.google.protobuf.FileDescriptorProto.encode(message.file[i],writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();}return writer;};/**
             * Encodes the specified FileDescriptorSet message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.FileDescriptorSet
             * @static
             * @param {google.protobuf.IFileDescriptorSet} message FileDescriptorSet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */FileDescriptorSet.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a FileDescriptorSet message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.FileDescriptorSet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */FileDescriptorSet.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.FileDescriptorSet();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:if(!(message.file&&message.file.length))message.file=[];message.file.push($root.google.protobuf.FileDescriptorProto.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a FileDescriptorSet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.FileDescriptorSet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */FileDescriptorSet.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a FileDescriptorSet message.
             * @function verify
             * @memberof google.protobuf.FileDescriptorSet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */FileDescriptorSet.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.file!=null&&message.hasOwnProperty('file')){if(!Array.isArray(message.file))return'file: array expected';for(var i=0;i<message.file.length;++i){var error=$root.google.protobuf.FileDescriptorProto.verify(message.file[i]);if(error)return'file.'+error;}}return null;};/**
             * Creates a FileDescriptorSet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FileDescriptorSet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FileDescriptorSet} FileDescriptorSet
             */FileDescriptorSet.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.FileDescriptorSet)return object;var message=new $root.google.protobuf.FileDescriptorSet();if(object.file){if(!Array.isArray(object.file))throw TypeError('.google.protobuf.FileDescriptorSet.file: array expected');message.file=[];for(var i=0;i<object.file.length;++i){if(typeof object.file[i]!=='object')throw TypeError('.google.protobuf.FileDescriptorSet.file: object expected');message.file[i]=$root.google.protobuf.FileDescriptorProto.fromObject(object.file[i]);}}return message;};/**
             * Creates a plain object from a FileDescriptorSet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FileDescriptorSet
             * @static
             * @param {google.protobuf.FileDescriptorSet} message FileDescriptorSet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */FileDescriptorSet.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.file=[];if(message.file&&message.file.length){object.file=[];for(var j=0;j<message.file.length;++j){object.file[j]=$root.google.protobuf.FileDescriptorProto.toObject(message.file[j],options);}}return object;};/**
             * Converts this FileDescriptorSet to JSON.
             * @function toJSON
             * @memberof google.protobuf.FileDescriptorSet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */FileDescriptorSet.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return FileDescriptorSet;}();protobuf.FileDescriptorProto=function(){/**
             * Properties of a FileDescriptorProto.
             * @memberof google.protobuf
             * @interface IFileDescriptorProto
             * @property {string|null} [name] FileDescriptorProto name
             * @property {string|null} ["package"] FileDescriptorProto package
             * @property {Array.<string>|null} [dependency] FileDescriptorProto dependency
             * @property {Array.<number>|null} [publicDependency] FileDescriptorProto publicDependency
             * @property {Array.<number>|null} [weakDependency] FileDescriptorProto weakDependency
             * @property {Array.<google.protobuf.IDescriptorProto>|null} [messageType] FileDescriptorProto messageType
             * @property {Array.<google.protobuf.IEnumDescriptorProto>|null} [enumType] FileDescriptorProto enumType
             * @property {Array.<google.protobuf.IServiceDescriptorProto>|null} [service] FileDescriptorProto service
             * @property {Array.<google.protobuf.IFieldDescriptorProto>|null} [extension] FileDescriptorProto extension
             * @property {google.protobuf.IFileOptions|null} [options] FileDescriptorProto options
             * @property {google.protobuf.ISourceCodeInfo|null} [sourceCodeInfo] FileDescriptorProto sourceCodeInfo
             * @property {string|null} [syntax] FileDescriptorProto syntax
             *//**
             * Constructs a new FileDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a FileDescriptorProto.
             * @implements IFileDescriptorProto
             * @constructor
             * @param {google.protobuf.IFileDescriptorProto=} [properties] Properties to set
             */function FileDescriptorProto(properties){this.dependency=[];this.publicDependency=[];this.weakDependency=[];this.messageType=[];this.enumType=[];this.service=[];this.extension=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * FileDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.name='';/**
             * FileDescriptorProto package.
             * @member {string} package
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype['package']='';/**
             * FileDescriptorProto dependency.
             * @member {Array.<string>} dependency
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.dependency=$util.emptyArray;/**
             * FileDescriptorProto publicDependency.
             * @member {Array.<number>} publicDependency
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.publicDependency=$util.emptyArray;/**
             * FileDescriptorProto weakDependency.
             * @member {Array.<number>} weakDependency
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.weakDependency=$util.emptyArray;/**
             * FileDescriptorProto messageType.
             * @member {Array.<google.protobuf.IDescriptorProto>} messageType
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.messageType=$util.emptyArray;/**
             * FileDescriptorProto enumType.
             * @member {Array.<google.protobuf.IEnumDescriptorProto>} enumType
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.enumType=$util.emptyArray;/**
             * FileDescriptorProto service.
             * @member {Array.<google.protobuf.IServiceDescriptorProto>} service
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.service=$util.emptyArray;/**
             * FileDescriptorProto extension.
             * @member {Array.<google.protobuf.IFieldDescriptorProto>} extension
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.extension=$util.emptyArray;/**
             * FileDescriptorProto options.
             * @member {google.protobuf.IFileOptions|null|undefined} options
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.options=null;/**
             * FileDescriptorProto sourceCodeInfo.
             * @member {google.protobuf.ISourceCodeInfo|null|undefined} sourceCodeInfo
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.sourceCodeInfo=null;/**
             * FileDescriptorProto syntax.
             * @member {string} syntax
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             */FileDescriptorProto.prototype.syntax='';/**
             * Creates a new FileDescriptorProto instance using the specified properties.
             * @function create
             * @memberof google.protobuf.FileDescriptorProto
             * @static
             * @param {google.protobuf.IFileDescriptorProto=} [properties] Properties to set
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto instance
             */FileDescriptorProto.create=function create(properties){return new FileDescriptorProto(properties);};/**
             * Encodes the specified FileDescriptorProto message. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.FileDescriptorProto
             * @static
             * @param {google.protobuf.IFileDescriptorProto} message FileDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */FileDescriptorProto.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.name!=null&&message.hasOwnProperty('name'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);if(message['package']!=null&&message.hasOwnProperty('package'))writer.uint32(/* id 2, wireType 2 =*/18).string(message['package']);if(message.dependency!=null&&message.dependency.length)for(var i=0;i<message.dependency.length;++i){writer.uint32(/* id 3, wireType 2 =*/26).string(message.dependency[i]);}if(message.messageType!=null&&message.messageType.length)for(var _i22=0;_i22<message.messageType.length;++_i22){$root.google.protobuf.DescriptorProto.encode(message.messageType[_i22],writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();}if(message.enumType!=null&&message.enumType.length)for(var _i23=0;_i23<message.enumType.length;++_i23){$root.google.protobuf.EnumDescriptorProto.encode(message.enumType[_i23],writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();}if(message.service!=null&&message.service.length)for(var _i24=0;_i24<message.service.length;++_i24){$root.google.protobuf.ServiceDescriptorProto.encode(message.service[_i24],writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();}if(message.extension!=null&&message.extension.length)for(var _i25=0;_i25<message.extension.length;++_i25){$root.google.protobuf.FieldDescriptorProto.encode(message.extension[_i25],writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();}if(message.options!=null&&message.hasOwnProperty('options'))$root.google.protobuf.FileOptions.encode(message.options,writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();if(message.sourceCodeInfo!=null&&message.hasOwnProperty('sourceCodeInfo'))$root.google.protobuf.SourceCodeInfo.encode(message.sourceCodeInfo,writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();if(message.publicDependency!=null&&message.publicDependency.length)for(var _i26=0;_i26<message.publicDependency.length;++_i26){writer.uint32(/* id 10, wireType 0 =*/80).int32(message.publicDependency[_i26]);}if(message.weakDependency!=null&&message.weakDependency.length)for(var _i27=0;_i27<message.weakDependency.length;++_i27){writer.uint32(/* id 11, wireType 0 =*/88).int32(message.weakDependency[_i27]);}if(message.syntax!=null&&message.hasOwnProperty('syntax'))writer.uint32(/* id 12, wireType 2 =*/98).string(message.syntax);return writer;};/**
             * Encodes the specified FileDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.FileDescriptorProto
             * @static
             * @param {google.protobuf.IFileDescriptorProto} message FileDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */FileDescriptorProto.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a FileDescriptorProto message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.FileDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */FileDescriptorProto.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.FileDescriptorProto();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.name=reader.string();break;case 2:message['package']=reader.string();break;case 3:if(!(message.dependency&&message.dependency.length))message.dependency=[];message.dependency.push(reader.string());break;case 10:if(!(message.publicDependency&&message.publicDependency.length))message.publicDependency=[];if((tag&7)===2){var end2=reader.uint32()+reader.pos;while(reader.pos<end2){message.publicDependency.push(reader.int32());}}else message.publicDependency.push(reader.int32());break;case 11:if(!(message.weakDependency&&message.weakDependency.length))message.weakDependency=[];if((tag&7)===2){var _end=reader.uint32()+reader.pos;while(reader.pos<_end){message.weakDependency.push(reader.int32());}}else message.weakDependency.push(reader.int32());break;case 4:if(!(message.messageType&&message.messageType.length))message.messageType=[];message.messageType.push($root.google.protobuf.DescriptorProto.decode(reader,reader.uint32()));break;case 5:if(!(message.enumType&&message.enumType.length))message.enumType=[];message.enumType.push($root.google.protobuf.EnumDescriptorProto.decode(reader,reader.uint32()));break;case 6:if(!(message.service&&message.service.length))message.service=[];message.service.push($root.google.protobuf.ServiceDescriptorProto.decode(reader,reader.uint32()));break;case 7:if(!(message.extension&&message.extension.length))message.extension=[];message.extension.push($root.google.protobuf.FieldDescriptorProto.decode(reader,reader.uint32()));break;case 8:message.options=$root.google.protobuf.FileOptions.decode(reader,reader.uint32());break;case 9:message.sourceCodeInfo=$root.google.protobuf.SourceCodeInfo.decode(reader,reader.uint32());break;case 12:message.syntax=reader.string();break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a FileDescriptorProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.FileDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */FileDescriptorProto.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a FileDescriptorProto message.
             * @function verify
             * @memberof google.protobuf.FileDescriptorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */FileDescriptorProto.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.name!=null&&message.hasOwnProperty('name'))if(!$util.isString(message.name))return'name: string expected';if(message['package']!=null&&message.hasOwnProperty('package'))if(!$util.isString(message['package']))return'package: string expected';if(message.dependency!=null&&message.hasOwnProperty('dependency')){if(!Array.isArray(message.dependency))return'dependency: array expected';for(var i=0;i<message.dependency.length;++i){if(!$util.isString(message.dependency[i]))return'dependency: string[] expected';}}if(message.publicDependency!=null&&message.hasOwnProperty('publicDependency')){if(!Array.isArray(message.publicDependency))return'publicDependency: array expected';for(var _i28=0;_i28<message.publicDependency.length;++_i28){if(!$util.isInteger(message.publicDependency[_i28]))return'publicDependency: integer[] expected';}}if(message.weakDependency!=null&&message.hasOwnProperty('weakDependency')){if(!Array.isArray(message.weakDependency))return'weakDependency: array expected';for(var _i29=0;_i29<message.weakDependency.length;++_i29){if(!$util.isInteger(message.weakDependency[_i29]))return'weakDependency: integer[] expected';}}if(message.messageType!=null&&message.hasOwnProperty('messageType')){if(!Array.isArray(message.messageType))return'messageType: array expected';for(var _i30=0;_i30<message.messageType.length;++_i30){var error=$root.google.protobuf.DescriptorProto.verify(message.messageType[_i30]);if(error)return'messageType.'+error;}}if(message.enumType!=null&&message.hasOwnProperty('enumType')){if(!Array.isArray(message.enumType))return'enumType: array expected';for(var _i31=0;_i31<message.enumType.length;++_i31){var _error14=$root.google.protobuf.EnumDescriptorProto.verify(message.enumType[_i31]);if(_error14)return'enumType.'+_error14;}}if(message.service!=null&&message.hasOwnProperty('service')){if(!Array.isArray(message.service))return'service: array expected';for(var _i32=0;_i32<message.service.length;++_i32){var _error15=$root.google.protobuf.ServiceDescriptorProto.verify(message.service[_i32]);if(_error15)return'service.'+_error15;}}if(message.extension!=null&&message.hasOwnProperty('extension')){if(!Array.isArray(message.extension))return'extension: array expected';for(var _i33=0;_i33<message.extension.length;++_i33){var _error16=$root.google.protobuf.FieldDescriptorProto.verify(message.extension[_i33]);if(_error16)return'extension.'+_error16;}}if(message.options!=null&&message.hasOwnProperty('options')){var _error17=$root.google.protobuf.FileOptions.verify(message.options);if(_error17)return'options.'+_error17;}if(message.sourceCodeInfo!=null&&message.hasOwnProperty('sourceCodeInfo')){var _error18=$root.google.protobuf.SourceCodeInfo.verify(message.sourceCodeInfo);if(_error18)return'sourceCodeInfo.'+_error18;}if(message.syntax!=null&&message.hasOwnProperty('syntax'))if(!$util.isString(message.syntax))return'syntax: string expected';return null;};/**
             * Creates a FileDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FileDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FileDescriptorProto} FileDescriptorProto
             */FileDescriptorProto.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.FileDescriptorProto)return object;var message=new $root.google.protobuf.FileDescriptorProto();if(object.name!=null)message.name=String(object.name);if(object['package']!=null)message['package']=String(object['package']);if(object.dependency){if(!Array.isArray(object.dependency))throw TypeError('.google.protobuf.FileDescriptorProto.dependency: array expected');message.dependency=[];for(var i=0;i<object.dependency.length;++i){message.dependency[i]=String(object.dependency[i]);}}if(object.publicDependency){if(!Array.isArray(object.publicDependency))throw TypeError('.google.protobuf.FileDescriptorProto.publicDependency: array expected');message.publicDependency=[];for(var _i34=0;_i34<object.publicDependency.length;++_i34){message.publicDependency[_i34]=object.publicDependency[_i34]|0;}}if(object.weakDependency){if(!Array.isArray(object.weakDependency))throw TypeError('.google.protobuf.FileDescriptorProto.weakDependency: array expected');message.weakDependency=[];for(var _i35=0;_i35<object.weakDependency.length;++_i35){message.weakDependency[_i35]=object.weakDependency[_i35]|0;}}if(object.messageType){if(!Array.isArray(object.messageType))throw TypeError('.google.protobuf.FileDescriptorProto.messageType: array expected');message.messageType=[];for(var _i36=0;_i36<object.messageType.length;++_i36){if(typeof object.messageType[_i36]!=='object')throw TypeError('.google.protobuf.FileDescriptorProto.messageType: object expected');message.messageType[_i36]=$root.google.protobuf.DescriptorProto.fromObject(object.messageType[_i36]);}}if(object.enumType){if(!Array.isArray(object.enumType))throw TypeError('.google.protobuf.FileDescriptorProto.enumType: array expected');message.enumType=[];for(var _i37=0;_i37<object.enumType.length;++_i37){if(typeof object.enumType[_i37]!=='object')throw TypeError('.google.protobuf.FileDescriptorProto.enumType: object expected');message.enumType[_i37]=$root.google.protobuf.EnumDescriptorProto.fromObject(object.enumType[_i37]);}}if(object.service){if(!Array.isArray(object.service))throw TypeError('.google.protobuf.FileDescriptorProto.service: array expected');message.service=[];for(var _i38=0;_i38<object.service.length;++_i38){if(typeof object.service[_i38]!=='object')throw TypeError('.google.protobuf.FileDescriptorProto.service: object expected');message.service[_i38]=$root.google.protobuf.ServiceDescriptorProto.fromObject(object.service[_i38]);}}if(object.extension){if(!Array.isArray(object.extension))throw TypeError('.google.protobuf.FileDescriptorProto.extension: array expected');message.extension=[];for(var _i39=0;_i39<object.extension.length;++_i39){if(typeof object.extension[_i39]!=='object')throw TypeError('.google.protobuf.FileDescriptorProto.extension: object expected');message.extension[_i39]=$root.google.protobuf.FieldDescriptorProto.fromObject(object.extension[_i39]);}}if(object.options!=null){if(typeof object.options!=='object')throw TypeError('.google.protobuf.FileDescriptorProto.options: object expected');message.options=$root.google.protobuf.FileOptions.fromObject(object.options);}if(object.sourceCodeInfo!=null){if(typeof object.sourceCodeInfo!=='object')throw TypeError('.google.protobuf.FileDescriptorProto.sourceCodeInfo: object expected');message.sourceCodeInfo=$root.google.protobuf.SourceCodeInfo.fromObject(object.sourceCodeInfo);}if(object.syntax!=null)message.syntax=String(object.syntax);return message;};/**
             * Creates a plain object from a FileDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FileDescriptorProto
             * @static
             * @param {google.protobuf.FileDescriptorProto} message FileDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */FileDescriptorProto.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults){object.dependency=[];object.messageType=[];object.enumType=[];object.service=[];object.extension=[];object.publicDependency=[];object.weakDependency=[];}if(options.defaults){object.name='';object['package']='';object.options=null;object.sourceCodeInfo=null;object.syntax='';}if(message.name!=null&&message.hasOwnProperty('name'))object.name=message.name;if(message['package']!=null&&message.hasOwnProperty('package'))object['package']=message['package'];if(message.dependency&&message.dependency.length){object.dependency=[];for(var j=0;j<message.dependency.length;++j){object.dependency[j]=message.dependency[j];}}if(message.messageType&&message.messageType.length){object.messageType=[];for(var _j8=0;_j8<message.messageType.length;++_j8){object.messageType[_j8]=$root.google.protobuf.DescriptorProto.toObject(message.messageType[_j8],options);}}if(message.enumType&&message.enumType.length){object.enumType=[];for(var _j9=0;_j9<message.enumType.length;++_j9){object.enumType[_j9]=$root.google.protobuf.EnumDescriptorProto.toObject(message.enumType[_j9],options);}}if(message.service&&message.service.length){object.service=[];for(var _j10=0;_j10<message.service.length;++_j10){object.service[_j10]=$root.google.protobuf.ServiceDescriptorProto.toObject(message.service[_j10],options);}}if(message.extension&&message.extension.length){object.extension=[];for(var _j11=0;_j11<message.extension.length;++_j11){object.extension[_j11]=$root.google.protobuf.FieldDescriptorProto.toObject(message.extension[_j11],options);}}if(message.options!=null&&message.hasOwnProperty('options'))object.options=$root.google.protobuf.FileOptions.toObject(message.options,options);if(message.sourceCodeInfo!=null&&message.hasOwnProperty('sourceCodeInfo'))object.sourceCodeInfo=$root.google.protobuf.SourceCodeInfo.toObject(message.sourceCodeInfo,options);if(message.publicDependency&&message.publicDependency.length){object.publicDependency=[];for(var _j12=0;_j12<message.publicDependency.length;++_j12){object.publicDependency[_j12]=message.publicDependency[_j12];}}if(message.weakDependency&&message.weakDependency.length){object.weakDependency=[];for(var _j13=0;_j13<message.weakDependency.length;++_j13){object.weakDependency[_j13]=message.weakDependency[_j13];}}if(message.syntax!=null&&message.hasOwnProperty('syntax'))object.syntax=message.syntax;return object;};/**
             * Converts this FileDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.FileDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */FileDescriptorProto.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return FileDescriptorProto;}();protobuf.DescriptorProto=function(){/**
             * Properties of a DescriptorProto.
             * @memberof google.protobuf
             * @interface IDescriptorProto
             * @property {string|null} [name] DescriptorProto name
             * @property {Array.<google.protobuf.IFieldDescriptorProto>|null} [field] DescriptorProto field
             * @property {Array.<google.protobuf.IFieldDescriptorProto>|null} [extension] DescriptorProto extension
             * @property {Array.<google.protobuf.IDescriptorProto>|null} [nestedType] DescriptorProto nestedType
             * @property {Array.<google.protobuf.IEnumDescriptorProto>|null} [enumType] DescriptorProto enumType
             * @property {Array.<google.protobuf.DescriptorProto.IExtensionRange>|null} [extensionRange] DescriptorProto extensionRange
             * @property {Array.<google.protobuf.IOneofDescriptorProto>|null} [oneofDecl] DescriptorProto oneofDecl
             * @property {google.protobuf.IMessageOptions|null} [options] DescriptorProto options
             * @property {Array.<google.protobuf.DescriptorProto.IReservedRange>|null} [reservedRange] DescriptorProto reservedRange
             * @property {Array.<string>|null} [reservedName] DescriptorProto reservedName
             *//**
             * Constructs a new DescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a DescriptorProto.
             * @implements IDescriptorProto
             * @constructor
             * @param {google.protobuf.IDescriptorProto=} [properties] Properties to set
             */function DescriptorProto(properties){this.field=[];this.extension=[];this.nestedType=[];this.enumType=[];this.extensionRange=[];this.oneofDecl=[];this.reservedRange=[];this.reservedName=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * DescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */DescriptorProto.prototype.name='';/**
             * DescriptorProto field.
             * @member {Array.<google.protobuf.IFieldDescriptorProto>} field
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */DescriptorProto.prototype.field=$util.emptyArray;/**
             * DescriptorProto extension.
             * @member {Array.<google.protobuf.IFieldDescriptorProto>} extension
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */DescriptorProto.prototype.extension=$util.emptyArray;/**
             * DescriptorProto nestedType.
             * @member {Array.<google.protobuf.IDescriptorProto>} nestedType
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */DescriptorProto.prototype.nestedType=$util.emptyArray;/**
             * DescriptorProto enumType.
             * @member {Array.<google.protobuf.IEnumDescriptorProto>} enumType
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */DescriptorProto.prototype.enumType=$util.emptyArray;/**
             * DescriptorProto extensionRange.
             * @member {Array.<google.protobuf.DescriptorProto.IExtensionRange>} extensionRange
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */DescriptorProto.prototype.extensionRange=$util.emptyArray;/**
             * DescriptorProto oneofDecl.
             * @member {Array.<google.protobuf.IOneofDescriptorProto>} oneofDecl
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */DescriptorProto.prototype.oneofDecl=$util.emptyArray;/**
             * DescriptorProto options.
             * @member {google.protobuf.IMessageOptions|null|undefined} options
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */DescriptorProto.prototype.options=null;/**
             * DescriptorProto reservedRange.
             * @member {Array.<google.protobuf.DescriptorProto.IReservedRange>} reservedRange
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */DescriptorProto.prototype.reservedRange=$util.emptyArray;/**
             * DescriptorProto reservedName.
             * @member {Array.<string>} reservedName
             * @memberof google.protobuf.DescriptorProto
             * @instance
             */DescriptorProto.prototype.reservedName=$util.emptyArray;/**
             * Creates a new DescriptorProto instance using the specified properties.
             * @function create
             * @memberof google.protobuf.DescriptorProto
             * @static
             * @param {google.protobuf.IDescriptorProto=} [properties] Properties to set
             * @returns {google.protobuf.DescriptorProto} DescriptorProto instance
             */DescriptorProto.create=function create(properties){return new DescriptorProto(properties);};/**
             * Encodes the specified DescriptorProto message. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.DescriptorProto
             * @static
             * @param {google.protobuf.IDescriptorProto} message DescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */DescriptorProto.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.name!=null&&message.hasOwnProperty('name'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);if(message.field!=null&&message.field.length)for(var i=0;i<message.field.length;++i){$root.google.protobuf.FieldDescriptorProto.encode(message.field[i],writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();}if(message.nestedType!=null&&message.nestedType.length)for(var _i40=0;_i40<message.nestedType.length;++_i40){$root.google.protobuf.DescriptorProto.encode(message.nestedType[_i40],writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();}if(message.enumType!=null&&message.enumType.length)for(var _i41=0;_i41<message.enumType.length;++_i41){$root.google.protobuf.EnumDescriptorProto.encode(message.enumType[_i41],writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();}if(message.extensionRange!=null&&message.extensionRange.length)for(var _i42=0;_i42<message.extensionRange.length;++_i42){$root.google.protobuf.DescriptorProto.ExtensionRange.encode(message.extensionRange[_i42],writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();}if(message.extension!=null&&message.extension.length)for(var _i43=0;_i43<message.extension.length;++_i43){$root.google.protobuf.FieldDescriptorProto.encode(message.extension[_i43],writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();}if(message.options!=null&&message.hasOwnProperty('options'))$root.google.protobuf.MessageOptions.encode(message.options,writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();if(message.oneofDecl!=null&&message.oneofDecl.length)for(var _i44=0;_i44<message.oneofDecl.length;++_i44){$root.google.protobuf.OneofDescriptorProto.encode(message.oneofDecl[_i44],writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();}if(message.reservedRange!=null&&message.reservedRange.length)for(var _i45=0;_i45<message.reservedRange.length;++_i45){$root.google.protobuf.DescriptorProto.ReservedRange.encode(message.reservedRange[_i45],writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();}if(message.reservedName!=null&&message.reservedName.length)for(var _i46=0;_i46<message.reservedName.length;++_i46){writer.uint32(/* id 10, wireType 2 =*/82).string(message.reservedName[_i46]);}return writer;};/**
             * Encodes the specified DescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.DescriptorProto
             * @static
             * @param {google.protobuf.IDescriptorProto} message DescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */DescriptorProto.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a DescriptorProto message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.DescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */DescriptorProto.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.DescriptorProto();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.name=reader.string();break;case 2:if(!(message.field&&message.field.length))message.field=[];message.field.push($root.google.protobuf.FieldDescriptorProto.decode(reader,reader.uint32()));break;case 6:if(!(message.extension&&message.extension.length))message.extension=[];message.extension.push($root.google.protobuf.FieldDescriptorProto.decode(reader,reader.uint32()));break;case 3:if(!(message.nestedType&&message.nestedType.length))message.nestedType=[];message.nestedType.push($root.google.protobuf.DescriptorProto.decode(reader,reader.uint32()));break;case 4:if(!(message.enumType&&message.enumType.length))message.enumType=[];message.enumType.push($root.google.protobuf.EnumDescriptorProto.decode(reader,reader.uint32()));break;case 5:if(!(message.extensionRange&&message.extensionRange.length))message.extensionRange=[];message.extensionRange.push($root.google.protobuf.DescriptorProto.ExtensionRange.decode(reader,reader.uint32()));break;case 8:if(!(message.oneofDecl&&message.oneofDecl.length))message.oneofDecl=[];message.oneofDecl.push($root.google.protobuf.OneofDescriptorProto.decode(reader,reader.uint32()));break;case 7:message.options=$root.google.protobuf.MessageOptions.decode(reader,reader.uint32());break;case 9:if(!(message.reservedRange&&message.reservedRange.length))message.reservedRange=[];message.reservedRange.push($root.google.protobuf.DescriptorProto.ReservedRange.decode(reader,reader.uint32()));break;case 10:if(!(message.reservedName&&message.reservedName.length))message.reservedName=[];message.reservedName.push(reader.string());break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a DescriptorProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.DescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */DescriptorProto.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a DescriptorProto message.
             * @function verify
             * @memberof google.protobuf.DescriptorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */DescriptorProto.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.name!=null&&message.hasOwnProperty('name'))if(!$util.isString(message.name))return'name: string expected';if(message.field!=null&&message.hasOwnProperty('field')){if(!Array.isArray(message.field))return'field: array expected';for(var i=0;i<message.field.length;++i){var error=$root.google.protobuf.FieldDescriptorProto.verify(message.field[i]);if(error)return'field.'+error;}}if(message.extension!=null&&message.hasOwnProperty('extension')){if(!Array.isArray(message.extension))return'extension: array expected';for(var _i47=0;_i47<message.extension.length;++_i47){var _error19=$root.google.protobuf.FieldDescriptorProto.verify(message.extension[_i47]);if(_error19)return'extension.'+_error19;}}if(message.nestedType!=null&&message.hasOwnProperty('nestedType')){if(!Array.isArray(message.nestedType))return'nestedType: array expected';for(var _i48=0;_i48<message.nestedType.length;++_i48){var _error20=$root.google.protobuf.DescriptorProto.verify(message.nestedType[_i48]);if(_error20)return'nestedType.'+_error20;}}if(message.enumType!=null&&message.hasOwnProperty('enumType')){if(!Array.isArray(message.enumType))return'enumType: array expected';for(var _i49=0;_i49<message.enumType.length;++_i49){var _error21=$root.google.protobuf.EnumDescriptorProto.verify(message.enumType[_i49]);if(_error21)return'enumType.'+_error21;}}if(message.extensionRange!=null&&message.hasOwnProperty('extensionRange')){if(!Array.isArray(message.extensionRange))return'extensionRange: array expected';for(var _i50=0;_i50<message.extensionRange.length;++_i50){var _error22=$root.google.protobuf.DescriptorProto.ExtensionRange.verify(message.extensionRange[_i50]);if(_error22)return'extensionRange.'+_error22;}}if(message.oneofDecl!=null&&message.hasOwnProperty('oneofDecl')){if(!Array.isArray(message.oneofDecl))return'oneofDecl: array expected';for(var _i51=0;_i51<message.oneofDecl.length;++_i51){var _error23=$root.google.protobuf.OneofDescriptorProto.verify(message.oneofDecl[_i51]);if(_error23)return'oneofDecl.'+_error23;}}if(message.options!=null&&message.hasOwnProperty('options')){var _error24=$root.google.protobuf.MessageOptions.verify(message.options);if(_error24)return'options.'+_error24;}if(message.reservedRange!=null&&message.hasOwnProperty('reservedRange')){if(!Array.isArray(message.reservedRange))return'reservedRange: array expected';for(var _i52=0;_i52<message.reservedRange.length;++_i52){var _error25=$root.google.protobuf.DescriptorProto.ReservedRange.verify(message.reservedRange[_i52]);if(_error25)return'reservedRange.'+_error25;}}if(message.reservedName!=null&&message.hasOwnProperty('reservedName')){if(!Array.isArray(message.reservedName))return'reservedName: array expected';for(var _i53=0;_i53<message.reservedName.length;++_i53){if(!$util.isString(message.reservedName[_i53]))return'reservedName: string[] expected';}}return null;};/**
             * Creates a DescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.DescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.DescriptorProto} DescriptorProto
             */DescriptorProto.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.DescriptorProto)return object;var message=new $root.google.protobuf.DescriptorProto();if(object.name!=null)message.name=String(object.name);if(object.field){if(!Array.isArray(object.field))throw TypeError('.google.protobuf.DescriptorProto.field: array expected');message.field=[];for(var i=0;i<object.field.length;++i){if(typeof object.field[i]!=='object')throw TypeError('.google.protobuf.DescriptorProto.field: object expected');message.field[i]=$root.google.protobuf.FieldDescriptorProto.fromObject(object.field[i]);}}if(object.extension){if(!Array.isArray(object.extension))throw TypeError('.google.protobuf.DescriptorProto.extension: array expected');message.extension=[];for(var _i54=0;_i54<object.extension.length;++_i54){if(typeof object.extension[_i54]!=='object')throw TypeError('.google.protobuf.DescriptorProto.extension: object expected');message.extension[_i54]=$root.google.protobuf.FieldDescriptorProto.fromObject(object.extension[_i54]);}}if(object.nestedType){if(!Array.isArray(object.nestedType))throw TypeError('.google.protobuf.DescriptorProto.nestedType: array expected');message.nestedType=[];for(var _i55=0;_i55<object.nestedType.length;++_i55){if(typeof object.nestedType[_i55]!=='object')throw TypeError('.google.protobuf.DescriptorProto.nestedType: object expected');message.nestedType[_i55]=$root.google.protobuf.DescriptorProto.fromObject(object.nestedType[_i55]);}}if(object.enumType){if(!Array.isArray(object.enumType))throw TypeError('.google.protobuf.DescriptorProto.enumType: array expected');message.enumType=[];for(var _i56=0;_i56<object.enumType.length;++_i56){if(typeof object.enumType[_i56]!=='object')throw TypeError('.google.protobuf.DescriptorProto.enumType: object expected');message.enumType[_i56]=$root.google.protobuf.EnumDescriptorProto.fromObject(object.enumType[_i56]);}}if(object.extensionRange){if(!Array.isArray(object.extensionRange))throw TypeError('.google.protobuf.DescriptorProto.extensionRange: array expected');message.extensionRange=[];for(var _i57=0;_i57<object.extensionRange.length;++_i57){if(typeof object.extensionRange[_i57]!=='object')throw TypeError('.google.protobuf.DescriptorProto.extensionRange: object expected');message.extensionRange[_i57]=$root.google.protobuf.DescriptorProto.ExtensionRange.fromObject(object.extensionRange[_i57]);}}if(object.oneofDecl){if(!Array.isArray(object.oneofDecl))throw TypeError('.google.protobuf.DescriptorProto.oneofDecl: array expected');message.oneofDecl=[];for(var _i58=0;_i58<object.oneofDecl.length;++_i58){if(typeof object.oneofDecl[_i58]!=='object')throw TypeError('.google.protobuf.DescriptorProto.oneofDecl: object expected');message.oneofDecl[_i58]=$root.google.protobuf.OneofDescriptorProto.fromObject(object.oneofDecl[_i58]);}}if(object.options!=null){if(typeof object.options!=='object')throw TypeError('.google.protobuf.DescriptorProto.options: object expected');message.options=$root.google.protobuf.MessageOptions.fromObject(object.options);}if(object.reservedRange){if(!Array.isArray(object.reservedRange))throw TypeError('.google.protobuf.DescriptorProto.reservedRange: array expected');message.reservedRange=[];for(var _i59=0;_i59<object.reservedRange.length;++_i59){if(typeof object.reservedRange[_i59]!=='object')throw TypeError('.google.protobuf.DescriptorProto.reservedRange: object expected');message.reservedRange[_i59]=$root.google.protobuf.DescriptorProto.ReservedRange.fromObject(object.reservedRange[_i59]);}}if(object.reservedName){if(!Array.isArray(object.reservedName))throw TypeError('.google.protobuf.DescriptorProto.reservedName: array expected');message.reservedName=[];for(var _i60=0;_i60<object.reservedName.length;++_i60){message.reservedName[_i60]=String(object.reservedName[_i60]);}}return message;};/**
             * Creates a plain object from a DescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.DescriptorProto
             * @static
             * @param {google.protobuf.DescriptorProto} message DescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */DescriptorProto.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults){object.field=[];object.nestedType=[];object.enumType=[];object.extensionRange=[];object.extension=[];object.oneofDecl=[];object.reservedRange=[];object.reservedName=[];}if(options.defaults){object.name='';object.options=null;}if(message.name!=null&&message.hasOwnProperty('name'))object.name=message.name;if(message.field&&message.field.length){object.field=[];for(var j=0;j<message.field.length;++j){object.field[j]=$root.google.protobuf.FieldDescriptorProto.toObject(message.field[j],options);}}if(message.nestedType&&message.nestedType.length){object.nestedType=[];for(var _j14=0;_j14<message.nestedType.length;++_j14){object.nestedType[_j14]=$root.google.protobuf.DescriptorProto.toObject(message.nestedType[_j14],options);}}if(message.enumType&&message.enumType.length){object.enumType=[];for(var _j15=0;_j15<message.enumType.length;++_j15){object.enumType[_j15]=$root.google.protobuf.EnumDescriptorProto.toObject(message.enumType[_j15],options);}}if(message.extensionRange&&message.extensionRange.length){object.extensionRange=[];for(var _j16=0;_j16<message.extensionRange.length;++_j16){object.extensionRange[_j16]=$root.google.protobuf.DescriptorProto.ExtensionRange.toObject(message.extensionRange[_j16],options);}}if(message.extension&&message.extension.length){object.extension=[];for(var _j17=0;_j17<message.extension.length;++_j17){object.extension[_j17]=$root.google.protobuf.FieldDescriptorProto.toObject(message.extension[_j17],options);}}if(message.options!=null&&message.hasOwnProperty('options'))object.options=$root.google.protobuf.MessageOptions.toObject(message.options,options);if(message.oneofDecl&&message.oneofDecl.length){object.oneofDecl=[];for(var _j18=0;_j18<message.oneofDecl.length;++_j18){object.oneofDecl[_j18]=$root.google.protobuf.OneofDescriptorProto.toObject(message.oneofDecl[_j18],options);}}if(message.reservedRange&&message.reservedRange.length){object.reservedRange=[];for(var _j19=0;_j19<message.reservedRange.length;++_j19){object.reservedRange[_j19]=$root.google.protobuf.DescriptorProto.ReservedRange.toObject(message.reservedRange[_j19],options);}}if(message.reservedName&&message.reservedName.length){object.reservedName=[];for(var _j20=0;_j20<message.reservedName.length;++_j20){object.reservedName[_j20]=message.reservedName[_j20];}}return object;};/**
             * Converts this DescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.DescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */DescriptorProto.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};DescriptorProto.ExtensionRange=function(){/**
                 * Properties of an ExtensionRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @interface IExtensionRange
                 * @property {number|null} [start] ExtensionRange start
                 * @property {number|null} [end] ExtensionRange end
                 *//**
                 * Constructs a new ExtensionRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @classdesc Represents an ExtensionRange.
                 * @implements IExtensionRange
                 * @constructor
                 * @param {google.protobuf.DescriptorProto.IExtensionRange=} [properties] Properties to set
                 */function ExtensionRange(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
                 * ExtensionRange start.
                 * @member {number} start
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @instance
                 */ExtensionRange.prototype.start=0;/**
                 * ExtensionRange end.
                 * @member {number} end
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @instance
                 */ExtensionRange.prototype.end=0;/**
                 * Creates a new ExtensionRange instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @static
                 * @param {google.protobuf.DescriptorProto.IExtensionRange=} [properties] Properties to set
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange instance
                 */ExtensionRange.create=function create(properties){return new ExtensionRange(properties);};/**
                 * Encodes the specified ExtensionRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @static
                 * @param {google.protobuf.DescriptorProto.IExtensionRange} message ExtensionRange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */ExtensionRange.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.start!=null&&message.hasOwnProperty('start'))writer.uint32(/* id 1, wireType 0 =*/8).int32(message.start);if(message.end!=null&&message.hasOwnProperty('end'))writer.uint32(/* id 2, wireType 0 =*/16).int32(message.end);return writer;};/**
                 * Encodes the specified ExtensionRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @static
                 * @param {google.protobuf.DescriptorProto.IExtensionRange} message ExtensionRange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */ExtensionRange.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
                 * Decodes an ExtensionRange message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */ExtensionRange.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.DescriptorProto.ExtensionRange();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.start=reader.int32();break;case 2:message.end=reader.int32();break;default:reader.skipType(tag&7);break;}}return message;};/**
                 * Decodes an ExtensionRange message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */ExtensionRange.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
                 * Verifies an ExtensionRange message.
                 * @function verify
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */ExtensionRange.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.start!=null&&message.hasOwnProperty('start'))if(!$util.isInteger(message.start))return'start: integer expected';if(message.end!=null&&message.hasOwnProperty('end'))if(!$util.isInteger(message.end))return'end: integer expected';return null;};/**
                 * Creates an ExtensionRange message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.DescriptorProto.ExtensionRange} ExtensionRange
                 */ExtensionRange.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.DescriptorProto.ExtensionRange)return object;var message=new $root.google.protobuf.DescriptorProto.ExtensionRange();if(object.start!=null)message.start=object.start|0;if(object.end!=null)message.end=object.end|0;return message;};/**
                 * Creates a plain object from an ExtensionRange message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @static
                 * @param {google.protobuf.DescriptorProto.ExtensionRange} message ExtensionRange
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */ExtensionRange.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults){object.start=0;object.end=0;}if(message.start!=null&&message.hasOwnProperty('start'))object.start=message.start;if(message.end!=null&&message.hasOwnProperty('end'))object.end=message.end;return object;};/**
                 * Converts this ExtensionRange to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.DescriptorProto.ExtensionRange
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */ExtensionRange.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return ExtensionRange;}();DescriptorProto.ReservedRange=function(){/**
                 * Properties of a ReservedRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @interface IReservedRange
                 * @property {number|null} [start] ReservedRange start
                 * @property {number|null} [end] ReservedRange end
                 *//**
                 * Constructs a new ReservedRange.
                 * @memberof google.protobuf.DescriptorProto
                 * @classdesc Represents a ReservedRange.
                 * @implements IReservedRange
                 * @constructor
                 * @param {google.protobuf.DescriptorProto.IReservedRange=} [properties] Properties to set
                 */function ReservedRange(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
                 * ReservedRange start.
                 * @member {number} start
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @instance
                 */ReservedRange.prototype.start=0;/**
                 * ReservedRange end.
                 * @member {number} end
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @instance
                 */ReservedRange.prototype.end=0;/**
                 * Creates a new ReservedRange instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @static
                 * @param {google.protobuf.DescriptorProto.IReservedRange=} [properties] Properties to set
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange instance
                 */ReservedRange.create=function create(properties){return new ReservedRange(properties);};/**
                 * Encodes the specified ReservedRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @static
                 * @param {google.protobuf.DescriptorProto.IReservedRange} message ReservedRange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */ReservedRange.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.start!=null&&message.hasOwnProperty('start'))writer.uint32(/* id 1, wireType 0 =*/8).int32(message.start);if(message.end!=null&&message.hasOwnProperty('end'))writer.uint32(/* id 2, wireType 0 =*/16).int32(message.end);return writer;};/**
                 * Encodes the specified ReservedRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @static
                 * @param {google.protobuf.DescriptorProto.IReservedRange} message ReservedRange message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */ReservedRange.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
                 * Decodes a ReservedRange message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */ReservedRange.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.DescriptorProto.ReservedRange();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.start=reader.int32();break;case 2:message.end=reader.int32();break;default:reader.skipType(tag&7);break;}}return message;};/**
                 * Decodes a ReservedRange message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */ReservedRange.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
                 * Verifies a ReservedRange message.
                 * @function verify
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */ReservedRange.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.start!=null&&message.hasOwnProperty('start'))if(!$util.isInteger(message.start))return'start: integer expected';if(message.end!=null&&message.hasOwnProperty('end'))if(!$util.isInteger(message.end))return'end: integer expected';return null;};/**
                 * Creates a ReservedRange message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.DescriptorProto.ReservedRange} ReservedRange
                 */ReservedRange.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.DescriptorProto.ReservedRange)return object;var message=new $root.google.protobuf.DescriptorProto.ReservedRange();if(object.start!=null)message.start=object.start|0;if(object.end!=null)message.end=object.end|0;return message;};/**
                 * Creates a plain object from a ReservedRange message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @static
                 * @param {google.protobuf.DescriptorProto.ReservedRange} message ReservedRange
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */ReservedRange.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults){object.start=0;object.end=0;}if(message.start!=null&&message.hasOwnProperty('start'))object.start=message.start;if(message.end!=null&&message.hasOwnProperty('end'))object.end=message.end;return object;};/**
                 * Converts this ReservedRange to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.DescriptorProto.ReservedRange
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */ReservedRange.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return ReservedRange;}();return DescriptorProto;}();protobuf.FieldDescriptorProto=function(){/**
             * Properties of a FieldDescriptorProto.
             * @memberof google.protobuf
             * @interface IFieldDescriptorProto
             * @property {string|null} [name] FieldDescriptorProto name
             * @property {number|null} [number] FieldDescriptorProto number
             * @property {google.protobuf.FieldDescriptorProto.Label|null} [label] FieldDescriptorProto label
             * @property {google.protobuf.FieldDescriptorProto.Type|null} [type] FieldDescriptorProto type
             * @property {string|null} [typeName] FieldDescriptorProto typeName
             * @property {string|null} [extendee] FieldDescriptorProto extendee
             * @property {string|null} [defaultValue] FieldDescriptorProto defaultValue
             * @property {number|null} [oneofIndex] FieldDescriptorProto oneofIndex
             * @property {string|null} [jsonName] FieldDescriptorProto jsonName
             * @property {google.protobuf.IFieldOptions|null} [options] FieldDescriptorProto options
             *//**
             * Constructs a new FieldDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a FieldDescriptorProto.
             * @implements IFieldDescriptorProto
             * @constructor
             * @param {google.protobuf.IFieldDescriptorProto=} [properties] Properties to set
             */function FieldDescriptorProto(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * FieldDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */FieldDescriptorProto.prototype.name='';/**
             * FieldDescriptorProto number.
             * @member {number} number
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */FieldDescriptorProto.prototype.number=0;/**
             * FieldDescriptorProto label.
             * @member {google.protobuf.FieldDescriptorProto.Label} label
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */FieldDescriptorProto.prototype.label=1;/**
             * FieldDescriptorProto type.
             * @member {google.protobuf.FieldDescriptorProto.Type} type
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */FieldDescriptorProto.prototype.type=1;/**
             * FieldDescriptorProto typeName.
             * @member {string} typeName
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */FieldDescriptorProto.prototype.typeName='';/**
             * FieldDescriptorProto extendee.
             * @member {string} extendee
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */FieldDescriptorProto.prototype.extendee='';/**
             * FieldDescriptorProto defaultValue.
             * @member {string} defaultValue
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */FieldDescriptorProto.prototype.defaultValue='';/**
             * FieldDescriptorProto oneofIndex.
             * @member {number} oneofIndex
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */FieldDescriptorProto.prototype.oneofIndex=0;/**
             * FieldDescriptorProto jsonName.
             * @member {string} jsonName
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */FieldDescriptorProto.prototype.jsonName='';/**
             * FieldDescriptorProto options.
             * @member {google.protobuf.IFieldOptions|null|undefined} options
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             */FieldDescriptorProto.prototype.options=null;/**
             * Creates a new FieldDescriptorProto instance using the specified properties.
             * @function create
             * @memberof google.protobuf.FieldDescriptorProto
             * @static
             * @param {google.protobuf.IFieldDescriptorProto=} [properties] Properties to set
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto instance
             */FieldDescriptorProto.create=function create(properties){return new FieldDescriptorProto(properties);};/**
             * Encodes the specified FieldDescriptorProto message. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.FieldDescriptorProto
             * @static
             * @param {google.protobuf.IFieldDescriptorProto} message FieldDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */FieldDescriptorProto.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.name!=null&&message.hasOwnProperty('name'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);if(message.extendee!=null&&message.hasOwnProperty('extendee'))writer.uint32(/* id 2, wireType 2 =*/18).string(message.extendee);if(message.number!=null&&message.hasOwnProperty('number'))writer.uint32(/* id 3, wireType 0 =*/24).int32(message.number);if(message.label!=null&&message.hasOwnProperty('label'))writer.uint32(/* id 4, wireType 0 =*/32).int32(message.label);if(message.type!=null&&message.hasOwnProperty('type'))writer.uint32(/* id 5, wireType 0 =*/40).int32(message.type);if(message.typeName!=null&&message.hasOwnProperty('typeName'))writer.uint32(/* id 6, wireType 2 =*/50).string(message.typeName);if(message.defaultValue!=null&&message.hasOwnProperty('defaultValue'))writer.uint32(/* id 7, wireType 2 =*/58).string(message.defaultValue);if(message.options!=null&&message.hasOwnProperty('options'))$root.google.protobuf.FieldOptions.encode(message.options,writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();if(message.oneofIndex!=null&&message.hasOwnProperty('oneofIndex'))writer.uint32(/* id 9, wireType 0 =*/72).int32(message.oneofIndex);if(message.jsonName!=null&&message.hasOwnProperty('jsonName'))writer.uint32(/* id 10, wireType 2 =*/82).string(message.jsonName);return writer;};/**
             * Encodes the specified FieldDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.FieldDescriptorProto
             * @static
             * @param {google.protobuf.IFieldDescriptorProto} message FieldDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */FieldDescriptorProto.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.FieldDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */FieldDescriptorProto.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.FieldDescriptorProto();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.name=reader.string();break;case 3:message.number=reader.int32();break;case 4:message.label=reader.int32();break;case 5:message.type=reader.int32();break;case 6:message.typeName=reader.string();break;case 2:message.extendee=reader.string();break;case 7:message.defaultValue=reader.string();break;case 9:message.oneofIndex=reader.int32();break;case 10:message.jsonName=reader.string();break;case 8:message.options=$root.google.protobuf.FieldOptions.decode(reader,reader.uint32());break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.FieldDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */FieldDescriptorProto.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a FieldDescriptorProto message.
             * @function verify
             * @memberof google.protobuf.FieldDescriptorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */FieldDescriptorProto.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.name!=null&&message.hasOwnProperty('name'))if(!$util.isString(message.name))return'name: string expected';if(message.number!=null&&message.hasOwnProperty('number'))if(!$util.isInteger(message.number))return'number: integer expected';if(message.label!=null&&message.hasOwnProperty('label'))switch(message.label){default:return'label: enum value expected';case 1:case 2:case 3:break;}if(message.type!=null&&message.hasOwnProperty('type'))switch(message.type){default:return'type: enum value expected';case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:case 16:case 17:case 18:break;}if(message.typeName!=null&&message.hasOwnProperty('typeName'))if(!$util.isString(message.typeName))return'typeName: string expected';if(message.extendee!=null&&message.hasOwnProperty('extendee'))if(!$util.isString(message.extendee))return'extendee: string expected';if(message.defaultValue!=null&&message.hasOwnProperty('defaultValue'))if(!$util.isString(message.defaultValue))return'defaultValue: string expected';if(message.oneofIndex!=null&&message.hasOwnProperty('oneofIndex'))if(!$util.isInteger(message.oneofIndex))return'oneofIndex: integer expected';if(message.jsonName!=null&&message.hasOwnProperty('jsonName'))if(!$util.isString(message.jsonName))return'jsonName: string expected';if(message.options!=null&&message.hasOwnProperty('options')){var error=$root.google.protobuf.FieldOptions.verify(message.options);if(error)return'options.'+error;}return null;};/**
             * Creates a FieldDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FieldDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FieldDescriptorProto} FieldDescriptorProto
             */FieldDescriptorProto.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.FieldDescriptorProto)return object;var message=new $root.google.protobuf.FieldDescriptorProto();if(object.name!=null)message.name=String(object.name);if(object.number!=null)message.number=object.number|0;switch(object.label){case'LABEL_OPTIONAL':case 1:message.label=1;break;case'LABEL_REQUIRED':case 2:message.label=2;break;case'LABEL_REPEATED':case 3:message.label=3;break;}switch(object.type){case'TYPE_DOUBLE':case 1:message.type=1;break;case'TYPE_FLOAT':case 2:message.type=2;break;case'TYPE_INT64':case 3:message.type=3;break;case'TYPE_UINT64':case 4:message.type=4;break;case'TYPE_INT32':case 5:message.type=5;break;case'TYPE_FIXED64':case 6:message.type=6;break;case'TYPE_FIXED32':case 7:message.type=7;break;case'TYPE_BOOL':case 8:message.type=8;break;case'TYPE_STRING':case 9:message.type=9;break;case'TYPE_GROUP':case 10:message.type=10;break;case'TYPE_MESSAGE':case 11:message.type=11;break;case'TYPE_BYTES':case 12:message.type=12;break;case'TYPE_UINT32':case 13:message.type=13;break;case'TYPE_ENUM':case 14:message.type=14;break;case'TYPE_SFIXED32':case 15:message.type=15;break;case'TYPE_SFIXED64':case 16:message.type=16;break;case'TYPE_SINT32':case 17:message.type=17;break;case'TYPE_SINT64':case 18:message.type=18;break;}if(object.typeName!=null)message.typeName=String(object.typeName);if(object.extendee!=null)message.extendee=String(object.extendee);if(object.defaultValue!=null)message.defaultValue=String(object.defaultValue);if(object.oneofIndex!=null)message.oneofIndex=object.oneofIndex|0;if(object.jsonName!=null)message.jsonName=String(object.jsonName);if(object.options!=null){if(typeof object.options!=='object')throw TypeError('.google.protobuf.FieldDescriptorProto.options: object expected');message.options=$root.google.protobuf.FieldOptions.fromObject(object.options);}return message;};/**
             * Creates a plain object from a FieldDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FieldDescriptorProto
             * @static
             * @param {google.protobuf.FieldDescriptorProto} message FieldDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */FieldDescriptorProto.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults){object.name='';object.extendee='';object.number=0;object.label=options.enums===String?'LABEL_OPTIONAL':1;object.type=options.enums===String?'TYPE_DOUBLE':1;object.typeName='';object.defaultValue='';object.options=null;object.oneofIndex=0;object.jsonName='';}if(message.name!=null&&message.hasOwnProperty('name'))object.name=message.name;if(message.extendee!=null&&message.hasOwnProperty('extendee'))object.extendee=message.extendee;if(message.number!=null&&message.hasOwnProperty('number'))object.number=message.number;if(message.label!=null&&message.hasOwnProperty('label'))object.label=options.enums===String?$root.google.protobuf.FieldDescriptorProto.Label[message.label]:message.label;if(message.type!=null&&message.hasOwnProperty('type'))object.type=options.enums===String?$root.google.protobuf.FieldDescriptorProto.Type[message.type]:message.type;if(message.typeName!=null&&message.hasOwnProperty('typeName'))object.typeName=message.typeName;if(message.defaultValue!=null&&message.hasOwnProperty('defaultValue'))object.defaultValue=message.defaultValue;if(message.options!=null&&message.hasOwnProperty('options'))object.options=$root.google.protobuf.FieldOptions.toObject(message.options,options);if(message.oneofIndex!=null&&message.hasOwnProperty('oneofIndex'))object.oneofIndex=message.oneofIndex;if(message.jsonName!=null&&message.hasOwnProperty('jsonName'))object.jsonName=message.jsonName;return object;};/**
             * Converts this FieldDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.FieldDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */FieldDescriptorProto.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};/**
             * Type enum.
             * @name google.protobuf.FieldDescriptorProto.Type
             * @enum {string}
             * @property {number} TYPE_DOUBLE=1 TYPE_DOUBLE value
             * @property {number} TYPE_FLOAT=2 TYPE_FLOAT value
             * @property {number} TYPE_INT64=3 TYPE_INT64 value
             * @property {number} TYPE_UINT64=4 TYPE_UINT64 value
             * @property {number} TYPE_INT32=5 TYPE_INT32 value
             * @property {number} TYPE_FIXED64=6 TYPE_FIXED64 value
             * @property {number} TYPE_FIXED32=7 TYPE_FIXED32 value
             * @property {number} TYPE_BOOL=8 TYPE_BOOL value
             * @property {number} TYPE_STRING=9 TYPE_STRING value
             * @property {number} TYPE_GROUP=10 TYPE_GROUP value
             * @property {number} TYPE_MESSAGE=11 TYPE_MESSAGE value
             * @property {number} TYPE_BYTES=12 TYPE_BYTES value
             * @property {number} TYPE_UINT32=13 TYPE_UINT32 value
             * @property {number} TYPE_ENUM=14 TYPE_ENUM value
             * @property {number} TYPE_SFIXED32=15 TYPE_SFIXED32 value
             * @property {number} TYPE_SFIXED64=16 TYPE_SFIXED64 value
             * @property {number} TYPE_SINT32=17 TYPE_SINT32 value
             * @property {number} TYPE_SINT64=18 TYPE_SINT64 value
             */FieldDescriptorProto.Type=function(){var valuesById={},values=Object.create(valuesById);values[valuesById[1]='TYPE_DOUBLE']=1;values[valuesById[2]='TYPE_FLOAT']=2;values[valuesById[3]='TYPE_INT64']=3;values[valuesById[4]='TYPE_UINT64']=4;values[valuesById[5]='TYPE_INT32']=5;values[valuesById[6]='TYPE_FIXED64']=6;values[valuesById[7]='TYPE_FIXED32']=7;values[valuesById[8]='TYPE_BOOL']=8;values[valuesById[9]='TYPE_STRING']=9;values[valuesById[10]='TYPE_GROUP']=10;values[valuesById[11]='TYPE_MESSAGE']=11;values[valuesById[12]='TYPE_BYTES']=12;values[valuesById[13]='TYPE_UINT32']=13;values[valuesById[14]='TYPE_ENUM']=14;values[valuesById[15]='TYPE_SFIXED32']=15;values[valuesById[16]='TYPE_SFIXED64']=16;values[valuesById[17]='TYPE_SINT32']=17;values[valuesById[18]='TYPE_SINT64']=18;return values;}();/**
             * Label enum.
             * @name google.protobuf.FieldDescriptorProto.Label
             * @enum {string}
             * @property {number} LABEL_OPTIONAL=1 LABEL_OPTIONAL value
             * @property {number} LABEL_REQUIRED=2 LABEL_REQUIRED value
             * @property {number} LABEL_REPEATED=3 LABEL_REPEATED value
             */FieldDescriptorProto.Label=function(){var valuesById={},values=Object.create(valuesById);values[valuesById[1]='LABEL_OPTIONAL']=1;values[valuesById[2]='LABEL_REQUIRED']=2;values[valuesById[3]='LABEL_REPEATED']=3;return values;}();return FieldDescriptorProto;}();protobuf.OneofDescriptorProto=function(){/**
             * Properties of an OneofDescriptorProto.
             * @memberof google.protobuf
             * @interface IOneofDescriptorProto
             * @property {string|null} [name] OneofDescriptorProto name
             * @property {google.protobuf.IOneofOptions|null} [options] OneofDescriptorProto options
             *//**
             * Constructs a new OneofDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents an OneofDescriptorProto.
             * @implements IOneofDescriptorProto
             * @constructor
             * @param {google.protobuf.IOneofDescriptorProto=} [properties] Properties to set
             */function OneofDescriptorProto(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * OneofDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.OneofDescriptorProto
             * @instance
             */OneofDescriptorProto.prototype.name='';/**
             * OneofDescriptorProto options.
             * @member {google.protobuf.IOneofOptions|null|undefined} options
             * @memberof google.protobuf.OneofDescriptorProto
             * @instance
             */OneofDescriptorProto.prototype.options=null;/**
             * Creates a new OneofDescriptorProto instance using the specified properties.
             * @function create
             * @memberof google.protobuf.OneofDescriptorProto
             * @static
             * @param {google.protobuf.IOneofDescriptorProto=} [properties] Properties to set
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto instance
             */OneofDescriptorProto.create=function create(properties){return new OneofDescriptorProto(properties);};/**
             * Encodes the specified OneofDescriptorProto message. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.OneofDescriptorProto
             * @static
             * @param {google.protobuf.IOneofDescriptorProto} message OneofDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */OneofDescriptorProto.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.name!=null&&message.hasOwnProperty('name'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);if(message.options!=null&&message.hasOwnProperty('options'))$root.google.protobuf.OneofOptions.encode(message.options,writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();return writer;};/**
             * Encodes the specified OneofDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.OneofDescriptorProto
             * @static
             * @param {google.protobuf.IOneofDescriptorProto} message OneofDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */OneofDescriptorProto.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.OneofDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */OneofDescriptorProto.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.OneofDescriptorProto();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.name=reader.string();break;case 2:message.options=$root.google.protobuf.OneofOptions.decode(reader,reader.uint32());break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.OneofDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */OneofDescriptorProto.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies an OneofDescriptorProto message.
             * @function verify
             * @memberof google.protobuf.OneofDescriptorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */OneofDescriptorProto.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.name!=null&&message.hasOwnProperty('name'))if(!$util.isString(message.name))return'name: string expected';if(message.options!=null&&message.hasOwnProperty('options')){var error=$root.google.protobuf.OneofOptions.verify(message.options);if(error)return'options.'+error;}return null;};/**
             * Creates an OneofDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.OneofDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.OneofDescriptorProto} OneofDescriptorProto
             */OneofDescriptorProto.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.OneofDescriptorProto)return object;var message=new $root.google.protobuf.OneofDescriptorProto();if(object.name!=null)message.name=String(object.name);if(object.options!=null){if(typeof object.options!=='object')throw TypeError('.google.protobuf.OneofDescriptorProto.options: object expected');message.options=$root.google.protobuf.OneofOptions.fromObject(object.options);}return message;};/**
             * Creates a plain object from an OneofDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.OneofDescriptorProto
             * @static
             * @param {google.protobuf.OneofDescriptorProto} message OneofDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */OneofDescriptorProto.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults){object.name='';object.options=null;}if(message.name!=null&&message.hasOwnProperty('name'))object.name=message.name;if(message.options!=null&&message.hasOwnProperty('options'))object.options=$root.google.protobuf.OneofOptions.toObject(message.options,options);return object;};/**
             * Converts this OneofDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.OneofDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */OneofDescriptorProto.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return OneofDescriptorProto;}();protobuf.EnumDescriptorProto=function(){/**
             * Properties of an EnumDescriptorProto.
             * @memberof google.protobuf
             * @interface IEnumDescriptorProto
             * @property {string|null} [name] EnumDescriptorProto name
             * @property {Array.<google.protobuf.IEnumValueDescriptorProto>|null} [value] EnumDescriptorProto value
             * @property {google.protobuf.IEnumOptions|null} [options] EnumDescriptorProto options
             *//**
             * Constructs a new EnumDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents an EnumDescriptorProto.
             * @implements IEnumDescriptorProto
             * @constructor
             * @param {google.protobuf.IEnumDescriptorProto=} [properties] Properties to set
             */function EnumDescriptorProto(properties){this.value=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * EnumDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             */EnumDescriptorProto.prototype.name='';/**
             * EnumDescriptorProto value.
             * @member {Array.<google.protobuf.IEnumValueDescriptorProto>} value
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             */EnumDescriptorProto.prototype.value=$util.emptyArray;/**
             * EnumDescriptorProto options.
             * @member {google.protobuf.IEnumOptions|null|undefined} options
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             */EnumDescriptorProto.prototype.options=null;/**
             * Creates a new EnumDescriptorProto instance using the specified properties.
             * @function create
             * @memberof google.protobuf.EnumDescriptorProto
             * @static
             * @param {google.protobuf.IEnumDescriptorProto=} [properties] Properties to set
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto instance
             */EnumDescriptorProto.create=function create(properties){return new EnumDescriptorProto(properties);};/**
             * Encodes the specified EnumDescriptorProto message. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.EnumDescriptorProto
             * @static
             * @param {google.protobuf.IEnumDescriptorProto} message EnumDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */EnumDescriptorProto.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.name!=null&&message.hasOwnProperty('name'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);if(message.value!=null&&message.value.length)for(var i=0;i<message.value.length;++i){$root.google.protobuf.EnumValueDescriptorProto.encode(message.value[i],writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();}if(message.options!=null&&message.hasOwnProperty('options'))$root.google.protobuf.EnumOptions.encode(message.options,writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();return writer;};/**
             * Encodes the specified EnumDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.EnumDescriptorProto
             * @static
             * @param {google.protobuf.IEnumDescriptorProto} message EnumDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */EnumDescriptorProto.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.EnumDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */EnumDescriptorProto.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.EnumDescriptorProto();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.name=reader.string();break;case 2:if(!(message.value&&message.value.length))message.value=[];message.value.push($root.google.protobuf.EnumValueDescriptorProto.decode(reader,reader.uint32()));break;case 3:message.options=$root.google.protobuf.EnumOptions.decode(reader,reader.uint32());break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.EnumDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */EnumDescriptorProto.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies an EnumDescriptorProto message.
             * @function verify
             * @memberof google.protobuf.EnumDescriptorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */EnumDescriptorProto.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.name!=null&&message.hasOwnProperty('name'))if(!$util.isString(message.name))return'name: string expected';if(message.value!=null&&message.hasOwnProperty('value')){if(!Array.isArray(message.value))return'value: array expected';for(var i=0;i<message.value.length;++i){var error=$root.google.protobuf.EnumValueDescriptorProto.verify(message.value[i]);if(error)return'value.'+error;}}if(message.options!=null&&message.hasOwnProperty('options')){var _error26=$root.google.protobuf.EnumOptions.verify(message.options);if(_error26)return'options.'+_error26;}return null;};/**
             * Creates an EnumDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.EnumDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.EnumDescriptorProto} EnumDescriptorProto
             */EnumDescriptorProto.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.EnumDescriptorProto)return object;var message=new $root.google.protobuf.EnumDescriptorProto();if(object.name!=null)message.name=String(object.name);if(object.value){if(!Array.isArray(object.value))throw TypeError('.google.protobuf.EnumDescriptorProto.value: array expected');message.value=[];for(var i=0;i<object.value.length;++i){if(typeof object.value[i]!=='object')throw TypeError('.google.protobuf.EnumDescriptorProto.value: object expected');message.value[i]=$root.google.protobuf.EnumValueDescriptorProto.fromObject(object.value[i]);}}if(object.options!=null){if(typeof object.options!=='object')throw TypeError('.google.protobuf.EnumDescriptorProto.options: object expected');message.options=$root.google.protobuf.EnumOptions.fromObject(object.options);}return message;};/**
             * Creates a plain object from an EnumDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.EnumDescriptorProto
             * @static
             * @param {google.protobuf.EnumDescriptorProto} message EnumDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */EnumDescriptorProto.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.value=[];if(options.defaults){object.name='';object.options=null;}if(message.name!=null&&message.hasOwnProperty('name'))object.name=message.name;if(message.value&&message.value.length){object.value=[];for(var j=0;j<message.value.length;++j){object.value[j]=$root.google.protobuf.EnumValueDescriptorProto.toObject(message.value[j],options);}}if(message.options!=null&&message.hasOwnProperty('options'))object.options=$root.google.protobuf.EnumOptions.toObject(message.options,options);return object;};/**
             * Converts this EnumDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.EnumDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */EnumDescriptorProto.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return EnumDescriptorProto;}();protobuf.EnumValueDescriptorProto=function(){/**
             * Properties of an EnumValueDescriptorProto.
             * @memberof google.protobuf
             * @interface IEnumValueDescriptorProto
             * @property {string|null} [name] EnumValueDescriptorProto name
             * @property {number|null} [number] EnumValueDescriptorProto number
             * @property {google.protobuf.IEnumValueOptions|null} [options] EnumValueDescriptorProto options
             *//**
             * Constructs a new EnumValueDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents an EnumValueDescriptorProto.
             * @implements IEnumValueDescriptorProto
             * @constructor
             * @param {google.protobuf.IEnumValueDescriptorProto=} [properties] Properties to set
             */function EnumValueDescriptorProto(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * EnumValueDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             */EnumValueDescriptorProto.prototype.name='';/**
             * EnumValueDescriptorProto number.
             * @member {number} number
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             */EnumValueDescriptorProto.prototype.number=0;/**
             * EnumValueDescriptorProto options.
             * @member {google.protobuf.IEnumValueOptions|null|undefined} options
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             */EnumValueDescriptorProto.prototype.options=null;/**
             * Creates a new EnumValueDescriptorProto instance using the specified properties.
             * @function create
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @static
             * @param {google.protobuf.IEnumValueDescriptorProto=} [properties] Properties to set
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto instance
             */EnumValueDescriptorProto.create=function create(properties){return new EnumValueDescriptorProto(properties);};/**
             * Encodes the specified EnumValueDescriptorProto message. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @static
             * @param {google.protobuf.IEnumValueDescriptorProto} message EnumValueDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */EnumValueDescriptorProto.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.name!=null&&message.hasOwnProperty('name'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);if(message.number!=null&&message.hasOwnProperty('number'))writer.uint32(/* id 2, wireType 0 =*/16).int32(message.number);if(message.options!=null&&message.hasOwnProperty('options'))$root.google.protobuf.EnumValueOptions.encode(message.options,writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();return writer;};/**
             * Encodes the specified EnumValueDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @static
             * @param {google.protobuf.IEnumValueDescriptorProto} message EnumValueDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */EnumValueDescriptorProto.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */EnumValueDescriptorProto.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.EnumValueDescriptorProto();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.name=reader.string();break;case 2:message.number=reader.int32();break;case 3:message.options=$root.google.protobuf.EnumValueOptions.decode(reader,reader.uint32());break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */EnumValueDescriptorProto.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies an EnumValueDescriptorProto message.
             * @function verify
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */EnumValueDescriptorProto.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.name!=null&&message.hasOwnProperty('name'))if(!$util.isString(message.name))return'name: string expected';if(message.number!=null&&message.hasOwnProperty('number'))if(!$util.isInteger(message.number))return'number: integer expected';if(message.options!=null&&message.hasOwnProperty('options')){var error=$root.google.protobuf.EnumValueOptions.verify(message.options);if(error)return'options.'+error;}return null;};/**
             * Creates an EnumValueDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.EnumValueDescriptorProto} EnumValueDescriptorProto
             */EnumValueDescriptorProto.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.EnumValueDescriptorProto)return object;var message=new $root.google.protobuf.EnumValueDescriptorProto();if(object.name!=null)message.name=String(object.name);if(object.number!=null)message.number=object.number|0;if(object.options!=null){if(typeof object.options!=='object')throw TypeError('.google.protobuf.EnumValueDescriptorProto.options: object expected');message.options=$root.google.protobuf.EnumValueOptions.fromObject(object.options);}return message;};/**
             * Creates a plain object from an EnumValueDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @static
             * @param {google.protobuf.EnumValueDescriptorProto} message EnumValueDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */EnumValueDescriptorProto.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults){object.name='';object.number=0;object.options=null;}if(message.name!=null&&message.hasOwnProperty('name'))object.name=message.name;if(message.number!=null&&message.hasOwnProperty('number'))object.number=message.number;if(message.options!=null&&message.hasOwnProperty('options'))object.options=$root.google.protobuf.EnumValueOptions.toObject(message.options,options);return object;};/**
             * Converts this EnumValueDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.EnumValueDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */EnumValueDescriptorProto.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return EnumValueDescriptorProto;}();protobuf.ServiceDescriptorProto=function(){/**
             * Properties of a ServiceDescriptorProto.
             * @memberof google.protobuf
             * @interface IServiceDescriptorProto
             * @property {string|null} [name] ServiceDescriptorProto name
             * @property {Array.<google.protobuf.IMethodDescriptorProto>|null} [method] ServiceDescriptorProto method
             * @property {google.protobuf.IServiceOptions|null} [options] ServiceDescriptorProto options
             *//**
             * Constructs a new ServiceDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a ServiceDescriptorProto.
             * @implements IServiceDescriptorProto
             * @constructor
             * @param {google.protobuf.IServiceDescriptorProto=} [properties] Properties to set
             */function ServiceDescriptorProto(properties){this.method=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * ServiceDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             */ServiceDescriptorProto.prototype.name='';/**
             * ServiceDescriptorProto method.
             * @member {Array.<google.protobuf.IMethodDescriptorProto>} method
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             */ServiceDescriptorProto.prototype.method=$util.emptyArray;/**
             * ServiceDescriptorProto options.
             * @member {google.protobuf.IServiceOptions|null|undefined} options
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             */ServiceDescriptorProto.prototype.options=null;/**
             * Creates a new ServiceDescriptorProto instance using the specified properties.
             * @function create
             * @memberof google.protobuf.ServiceDescriptorProto
             * @static
             * @param {google.protobuf.IServiceDescriptorProto=} [properties] Properties to set
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto instance
             */ServiceDescriptorProto.create=function create(properties){return new ServiceDescriptorProto(properties);};/**
             * Encodes the specified ServiceDescriptorProto message. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.ServiceDescriptorProto
             * @static
             * @param {google.protobuf.IServiceDescriptorProto} message ServiceDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */ServiceDescriptorProto.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.name!=null&&message.hasOwnProperty('name'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);if(message.method!=null&&message.method.length)for(var i=0;i<message.method.length;++i){$root.google.protobuf.MethodDescriptorProto.encode(message.method[i],writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();}if(message.options!=null&&message.hasOwnProperty('options'))$root.google.protobuf.ServiceOptions.encode(message.options,writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();return writer;};/**
             * Encodes the specified ServiceDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.ServiceDescriptorProto
             * @static
             * @param {google.protobuf.IServiceDescriptorProto} message ServiceDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */ServiceDescriptorProto.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.ServiceDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */ServiceDescriptorProto.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.ServiceDescriptorProto();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.name=reader.string();break;case 2:if(!(message.method&&message.method.length))message.method=[];message.method.push($root.google.protobuf.MethodDescriptorProto.decode(reader,reader.uint32()));break;case 3:message.options=$root.google.protobuf.ServiceOptions.decode(reader,reader.uint32());break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.ServiceDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */ServiceDescriptorProto.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a ServiceDescriptorProto message.
             * @function verify
             * @memberof google.protobuf.ServiceDescriptorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */ServiceDescriptorProto.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.name!=null&&message.hasOwnProperty('name'))if(!$util.isString(message.name))return'name: string expected';if(message.method!=null&&message.hasOwnProperty('method')){if(!Array.isArray(message.method))return'method: array expected';for(var i=0;i<message.method.length;++i){var error=$root.google.protobuf.MethodDescriptorProto.verify(message.method[i]);if(error)return'method.'+error;}}if(message.options!=null&&message.hasOwnProperty('options')){var _error27=$root.google.protobuf.ServiceOptions.verify(message.options);if(_error27)return'options.'+_error27;}return null;};/**
             * Creates a ServiceDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.ServiceDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.ServiceDescriptorProto} ServiceDescriptorProto
             */ServiceDescriptorProto.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.ServiceDescriptorProto)return object;var message=new $root.google.protobuf.ServiceDescriptorProto();if(object.name!=null)message.name=String(object.name);if(object.method){if(!Array.isArray(object.method))throw TypeError('.google.protobuf.ServiceDescriptorProto.method: array expected');message.method=[];for(var i=0;i<object.method.length;++i){if(typeof object.method[i]!=='object')throw TypeError('.google.protobuf.ServiceDescriptorProto.method: object expected');message.method[i]=$root.google.protobuf.MethodDescriptorProto.fromObject(object.method[i]);}}if(object.options!=null){if(typeof object.options!=='object')throw TypeError('.google.protobuf.ServiceDescriptorProto.options: object expected');message.options=$root.google.protobuf.ServiceOptions.fromObject(object.options);}return message;};/**
             * Creates a plain object from a ServiceDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.ServiceDescriptorProto
             * @static
             * @param {google.protobuf.ServiceDescriptorProto} message ServiceDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */ServiceDescriptorProto.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.method=[];if(options.defaults){object.name='';object.options=null;}if(message.name!=null&&message.hasOwnProperty('name'))object.name=message.name;if(message.method&&message.method.length){object.method=[];for(var j=0;j<message.method.length;++j){object.method[j]=$root.google.protobuf.MethodDescriptorProto.toObject(message.method[j],options);}}if(message.options!=null&&message.hasOwnProperty('options'))object.options=$root.google.protobuf.ServiceOptions.toObject(message.options,options);return object;};/**
             * Converts this ServiceDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.ServiceDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */ServiceDescriptorProto.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return ServiceDescriptorProto;}();protobuf.MethodDescriptorProto=function(){/**
             * Properties of a MethodDescriptorProto.
             * @memberof google.protobuf
             * @interface IMethodDescriptorProto
             * @property {string|null} [name] MethodDescriptorProto name
             * @property {string|null} [inputType] MethodDescriptorProto inputType
             * @property {string|null} [outputType] MethodDescriptorProto outputType
             * @property {google.protobuf.IMethodOptions|null} [options] MethodDescriptorProto options
             * @property {boolean|null} [clientStreaming] MethodDescriptorProto clientStreaming
             * @property {boolean|null} [serverStreaming] MethodDescriptorProto serverStreaming
             *//**
             * Constructs a new MethodDescriptorProto.
             * @memberof google.protobuf
             * @classdesc Represents a MethodDescriptorProto.
             * @implements IMethodDescriptorProto
             * @constructor
             * @param {google.protobuf.IMethodDescriptorProto=} [properties] Properties to set
             */function MethodDescriptorProto(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * MethodDescriptorProto name.
             * @member {string} name
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */MethodDescriptorProto.prototype.name='';/**
             * MethodDescriptorProto inputType.
             * @member {string} inputType
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */MethodDescriptorProto.prototype.inputType='';/**
             * MethodDescriptorProto outputType.
             * @member {string} outputType
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */MethodDescriptorProto.prototype.outputType='';/**
             * MethodDescriptorProto options.
             * @member {google.protobuf.IMethodOptions|null|undefined} options
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */MethodDescriptorProto.prototype.options=null;/**
             * MethodDescriptorProto clientStreaming.
             * @member {boolean} clientStreaming
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */MethodDescriptorProto.prototype.clientStreaming=false;/**
             * MethodDescriptorProto serverStreaming.
             * @member {boolean} serverStreaming
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             */MethodDescriptorProto.prototype.serverStreaming=false;/**
             * Creates a new MethodDescriptorProto instance using the specified properties.
             * @function create
             * @memberof google.protobuf.MethodDescriptorProto
             * @static
             * @param {google.protobuf.IMethodDescriptorProto=} [properties] Properties to set
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto instance
             */MethodDescriptorProto.create=function create(properties){return new MethodDescriptorProto(properties);};/**
             * Encodes the specified MethodDescriptorProto message. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.MethodDescriptorProto
             * @static
             * @param {google.protobuf.IMethodDescriptorProto} message MethodDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */MethodDescriptorProto.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.name!=null&&message.hasOwnProperty('name'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);if(message.inputType!=null&&message.hasOwnProperty('inputType'))writer.uint32(/* id 2, wireType 2 =*/18).string(message.inputType);if(message.outputType!=null&&message.hasOwnProperty('outputType'))writer.uint32(/* id 3, wireType 2 =*/26).string(message.outputType);if(message.options!=null&&message.hasOwnProperty('options'))$root.google.protobuf.MethodOptions.encode(message.options,writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();if(message.clientStreaming!=null&&message.hasOwnProperty('clientStreaming'))writer.uint32(/* id 5, wireType 0 =*/40).bool(message.clientStreaming);if(message.serverStreaming!=null&&message.hasOwnProperty('serverStreaming'))writer.uint32(/* id 6, wireType 0 =*/48).bool(message.serverStreaming);return writer;};/**
             * Encodes the specified MethodDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.MethodDescriptorProto
             * @static
             * @param {google.protobuf.IMethodDescriptorProto} message MethodDescriptorProto message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */MethodDescriptorProto.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.MethodDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */MethodDescriptorProto.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.MethodDescriptorProto();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.name=reader.string();break;case 2:message.inputType=reader.string();break;case 3:message.outputType=reader.string();break;case 4:message.options=$root.google.protobuf.MethodOptions.decode(reader,reader.uint32());break;case 5:message.clientStreaming=reader.bool();break;case 6:message.serverStreaming=reader.bool();break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.MethodDescriptorProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */MethodDescriptorProto.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a MethodDescriptorProto message.
             * @function verify
             * @memberof google.protobuf.MethodDescriptorProto
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */MethodDescriptorProto.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.name!=null&&message.hasOwnProperty('name'))if(!$util.isString(message.name))return'name: string expected';if(message.inputType!=null&&message.hasOwnProperty('inputType'))if(!$util.isString(message.inputType))return'inputType: string expected';if(message.outputType!=null&&message.hasOwnProperty('outputType'))if(!$util.isString(message.outputType))return'outputType: string expected';if(message.options!=null&&message.hasOwnProperty('options')){var error=$root.google.protobuf.MethodOptions.verify(message.options);if(error)return'options.'+error;}if(message.clientStreaming!=null&&message.hasOwnProperty('clientStreaming'))if(typeof message.clientStreaming!=='boolean')return'clientStreaming: boolean expected';if(message.serverStreaming!=null&&message.hasOwnProperty('serverStreaming'))if(typeof message.serverStreaming!=='boolean')return'serverStreaming: boolean expected';return null;};/**
             * Creates a MethodDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.MethodDescriptorProto
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.MethodDescriptorProto} MethodDescriptorProto
             */MethodDescriptorProto.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.MethodDescriptorProto)return object;var message=new $root.google.protobuf.MethodDescriptorProto();if(object.name!=null)message.name=String(object.name);if(object.inputType!=null)message.inputType=String(object.inputType);if(object.outputType!=null)message.outputType=String(object.outputType);if(object.options!=null){if(typeof object.options!=='object')throw TypeError('.google.protobuf.MethodDescriptorProto.options: object expected');message.options=$root.google.protobuf.MethodOptions.fromObject(object.options);}if(object.clientStreaming!=null)message.clientStreaming=Boolean(object.clientStreaming);if(object.serverStreaming!=null)message.serverStreaming=Boolean(object.serverStreaming);return message;};/**
             * Creates a plain object from a MethodDescriptorProto message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.MethodDescriptorProto
             * @static
             * @param {google.protobuf.MethodDescriptorProto} message MethodDescriptorProto
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */MethodDescriptorProto.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults){object.name='';object.inputType='';object.outputType='';object.options=null;object.clientStreaming=false;object.serverStreaming=false;}if(message.name!=null&&message.hasOwnProperty('name'))object.name=message.name;if(message.inputType!=null&&message.hasOwnProperty('inputType'))object.inputType=message.inputType;if(message.outputType!=null&&message.hasOwnProperty('outputType'))object.outputType=message.outputType;if(message.options!=null&&message.hasOwnProperty('options'))object.options=$root.google.protobuf.MethodOptions.toObject(message.options,options);if(message.clientStreaming!=null&&message.hasOwnProperty('clientStreaming'))object.clientStreaming=message.clientStreaming;if(message.serverStreaming!=null&&message.hasOwnProperty('serverStreaming'))object.serverStreaming=message.serverStreaming;return object;};/**
             * Converts this MethodDescriptorProto to JSON.
             * @function toJSON
             * @memberof google.protobuf.MethodDescriptorProto
             * @instance
             * @returns {Object.<string,*>} JSON object
             */MethodDescriptorProto.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return MethodDescriptorProto;}();protobuf.FileOptions=function(){/**
             * Properties of a FileOptions.
             * @memberof google.protobuf
             * @interface IFileOptions
             * @property {string|null} [javaPackage] FileOptions javaPackage
             * @property {string|null} [javaOuterClassname] FileOptions javaOuterClassname
             * @property {boolean|null} [javaMultipleFiles] FileOptions javaMultipleFiles
             * @property {boolean|null} [javaGenerateEqualsAndHash] FileOptions javaGenerateEqualsAndHash
             * @property {boolean|null} [javaStringCheckUtf8] FileOptions javaStringCheckUtf8
             * @property {google.protobuf.FileOptions.OptimizeMode|null} [optimizeFor] FileOptions optimizeFor
             * @property {string|null} [goPackage] FileOptions goPackage
             * @property {boolean|null} [ccGenericServices] FileOptions ccGenericServices
             * @property {boolean|null} [javaGenericServices] FileOptions javaGenericServices
             * @property {boolean|null} [pyGenericServices] FileOptions pyGenericServices
             * @property {boolean|null} [deprecated] FileOptions deprecated
             * @property {boolean|null} [ccEnableArenas] FileOptions ccEnableArenas
             * @property {string|null} [objcClassPrefix] FileOptions objcClassPrefix
             * @property {string|null} [csharpNamespace] FileOptions csharpNamespace
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] FileOptions uninterpretedOption
             *//**
             * Constructs a new FileOptions.
             * @memberof google.protobuf
             * @classdesc Represents a FileOptions.
             * @implements IFileOptions
             * @constructor
             * @param {google.protobuf.IFileOptions=} [properties] Properties to set
             */function FileOptions(properties){this.uninterpretedOption=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * FileOptions javaPackage.
             * @member {string} javaPackage
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.javaPackage='';/**
             * FileOptions javaOuterClassname.
             * @member {string} javaOuterClassname
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.javaOuterClassname='';/**
             * FileOptions javaMultipleFiles.
             * @member {boolean} javaMultipleFiles
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.javaMultipleFiles=false;/**
             * FileOptions javaGenerateEqualsAndHash.
             * @member {boolean} javaGenerateEqualsAndHash
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.javaGenerateEqualsAndHash=false;/**
             * FileOptions javaStringCheckUtf8.
             * @member {boolean} javaStringCheckUtf8
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.javaStringCheckUtf8=false;/**
             * FileOptions optimizeFor.
             * @member {google.protobuf.FileOptions.OptimizeMode} optimizeFor
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.optimizeFor=1;/**
             * FileOptions goPackage.
             * @member {string} goPackage
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.goPackage='';/**
             * FileOptions ccGenericServices.
             * @member {boolean} ccGenericServices
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.ccGenericServices=false;/**
             * FileOptions javaGenericServices.
             * @member {boolean} javaGenericServices
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.javaGenericServices=false;/**
             * FileOptions pyGenericServices.
             * @member {boolean} pyGenericServices
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.pyGenericServices=false;/**
             * FileOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.deprecated=false;/**
             * FileOptions ccEnableArenas.
             * @member {boolean} ccEnableArenas
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.ccEnableArenas=false;/**
             * FileOptions objcClassPrefix.
             * @member {string} objcClassPrefix
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.objcClassPrefix='';/**
             * FileOptions csharpNamespace.
             * @member {string} csharpNamespace
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.csharpNamespace='';/**
             * FileOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.FileOptions
             * @instance
             */FileOptions.prototype.uninterpretedOption=$util.emptyArray;/**
             * Creates a new FileOptions instance using the specified properties.
             * @function create
             * @memberof google.protobuf.FileOptions
             * @static
             * @param {google.protobuf.IFileOptions=} [properties] Properties to set
             * @returns {google.protobuf.FileOptions} FileOptions instance
             */FileOptions.create=function create(properties){return new FileOptions(properties);};/**
             * Encodes the specified FileOptions message. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.FileOptions
             * @static
             * @param {google.protobuf.IFileOptions} message FileOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */FileOptions.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.javaPackage!=null&&message.hasOwnProperty('javaPackage'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.javaPackage);if(message.javaOuterClassname!=null&&message.hasOwnProperty('javaOuterClassname'))writer.uint32(/* id 8, wireType 2 =*/66).string(message.javaOuterClassname);if(message.optimizeFor!=null&&message.hasOwnProperty('optimizeFor'))writer.uint32(/* id 9, wireType 0 =*/72).int32(message.optimizeFor);if(message.javaMultipleFiles!=null&&message.hasOwnProperty('javaMultipleFiles'))writer.uint32(/* id 10, wireType 0 =*/80).bool(message.javaMultipleFiles);if(message.goPackage!=null&&message.hasOwnProperty('goPackage'))writer.uint32(/* id 11, wireType 2 =*/90).string(message.goPackage);if(message.ccGenericServices!=null&&message.hasOwnProperty('ccGenericServices'))writer.uint32(/* id 16, wireType 0 =*/128).bool(message.ccGenericServices);if(message.javaGenericServices!=null&&message.hasOwnProperty('javaGenericServices'))writer.uint32(/* id 17, wireType 0 =*/136).bool(message.javaGenericServices);if(message.pyGenericServices!=null&&message.hasOwnProperty('pyGenericServices'))writer.uint32(/* id 18, wireType 0 =*/144).bool(message.pyGenericServices);if(message.javaGenerateEqualsAndHash!=null&&message.hasOwnProperty('javaGenerateEqualsAndHash'))writer.uint32(/* id 20, wireType 0 =*/160).bool(message.javaGenerateEqualsAndHash);if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))writer.uint32(/* id 23, wireType 0 =*/184).bool(message.deprecated);if(message.javaStringCheckUtf8!=null&&message.hasOwnProperty('javaStringCheckUtf8'))writer.uint32(/* id 27, wireType 0 =*/216).bool(message.javaStringCheckUtf8);if(message.ccEnableArenas!=null&&message.hasOwnProperty('ccEnableArenas'))writer.uint32(/* id 31, wireType 0 =*/248).bool(message.ccEnableArenas);if(message.objcClassPrefix!=null&&message.hasOwnProperty('objcClassPrefix'))writer.uint32(/* id 36, wireType 2 =*/290).string(message.objcClassPrefix);if(message.csharpNamespace!=null&&message.hasOwnProperty('csharpNamespace'))writer.uint32(/* id 37, wireType 2 =*/298).string(message.csharpNamespace);if(message.uninterpretedOption!=null&&message.uninterpretedOption.length)for(var i=0;i<message.uninterpretedOption.length;++i){$root.google.protobuf.UninterpretedOption.encode(message.uninterpretedOption[i],writer.uint32(/* id 999, wireType 2 =*/7994).fork()).ldelim();}return writer;};/**
             * Encodes the specified FileOptions message, length delimited. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.FileOptions
             * @static
             * @param {google.protobuf.IFileOptions} message FileOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */FileOptions.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a FileOptions message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.FileOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FileOptions} FileOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */FileOptions.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.FileOptions();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.javaPackage=reader.string();break;case 8:message.javaOuterClassname=reader.string();break;case 10:message.javaMultipleFiles=reader.bool();break;case 20:message.javaGenerateEqualsAndHash=reader.bool();break;case 27:message.javaStringCheckUtf8=reader.bool();break;case 9:message.optimizeFor=reader.int32();break;case 11:message.goPackage=reader.string();break;case 16:message.ccGenericServices=reader.bool();break;case 17:message.javaGenericServices=reader.bool();break;case 18:message.pyGenericServices=reader.bool();break;case 23:message.deprecated=reader.bool();break;case 31:message.ccEnableArenas=reader.bool();break;case 36:message.objcClassPrefix=reader.string();break;case 37:message.csharpNamespace=reader.string();break;case 999:if(!(message.uninterpretedOption&&message.uninterpretedOption.length))message.uninterpretedOption=[];message.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a FileOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.FileOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.FileOptions} FileOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */FileOptions.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a FileOptions message.
             * @function verify
             * @memberof google.protobuf.FileOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */FileOptions.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.javaPackage!=null&&message.hasOwnProperty('javaPackage'))if(!$util.isString(message.javaPackage))return'javaPackage: string expected';if(message.javaOuterClassname!=null&&message.hasOwnProperty('javaOuterClassname'))if(!$util.isString(message.javaOuterClassname))return'javaOuterClassname: string expected';if(message.javaMultipleFiles!=null&&message.hasOwnProperty('javaMultipleFiles'))if(typeof message.javaMultipleFiles!=='boolean')return'javaMultipleFiles: boolean expected';if(message.javaGenerateEqualsAndHash!=null&&message.hasOwnProperty('javaGenerateEqualsAndHash'))if(typeof message.javaGenerateEqualsAndHash!=='boolean')return'javaGenerateEqualsAndHash: boolean expected';if(message.javaStringCheckUtf8!=null&&message.hasOwnProperty('javaStringCheckUtf8'))if(typeof message.javaStringCheckUtf8!=='boolean')return'javaStringCheckUtf8: boolean expected';if(message.optimizeFor!=null&&message.hasOwnProperty('optimizeFor'))switch(message.optimizeFor){default:return'optimizeFor: enum value expected';case 1:case 2:case 3:break;}if(message.goPackage!=null&&message.hasOwnProperty('goPackage'))if(!$util.isString(message.goPackage))return'goPackage: string expected';if(message.ccGenericServices!=null&&message.hasOwnProperty('ccGenericServices'))if(typeof message.ccGenericServices!=='boolean')return'ccGenericServices: boolean expected';if(message.javaGenericServices!=null&&message.hasOwnProperty('javaGenericServices'))if(typeof message.javaGenericServices!=='boolean')return'javaGenericServices: boolean expected';if(message.pyGenericServices!=null&&message.hasOwnProperty('pyGenericServices'))if(typeof message.pyGenericServices!=='boolean')return'pyGenericServices: boolean expected';if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))if(typeof message.deprecated!=='boolean')return'deprecated: boolean expected';if(message.ccEnableArenas!=null&&message.hasOwnProperty('ccEnableArenas'))if(typeof message.ccEnableArenas!=='boolean')return'ccEnableArenas: boolean expected';if(message.objcClassPrefix!=null&&message.hasOwnProperty('objcClassPrefix'))if(!$util.isString(message.objcClassPrefix))return'objcClassPrefix: string expected';if(message.csharpNamespace!=null&&message.hasOwnProperty('csharpNamespace'))if(!$util.isString(message.csharpNamespace))return'csharpNamespace: string expected';if(message.uninterpretedOption!=null&&message.hasOwnProperty('uninterpretedOption')){if(!Array.isArray(message.uninterpretedOption))return'uninterpretedOption: array expected';for(var i=0;i<message.uninterpretedOption.length;++i){var error=$root.google.protobuf.UninterpretedOption.verify(message.uninterpretedOption[i]);if(error)return'uninterpretedOption.'+error;}}return null;};/**
             * Creates a FileOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FileOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FileOptions} FileOptions
             */FileOptions.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.FileOptions)return object;var message=new $root.google.protobuf.FileOptions();if(object.javaPackage!=null)message.javaPackage=String(object.javaPackage);if(object.javaOuterClassname!=null)message.javaOuterClassname=String(object.javaOuterClassname);if(object.javaMultipleFiles!=null)message.javaMultipleFiles=Boolean(object.javaMultipleFiles);if(object.javaGenerateEqualsAndHash!=null)message.javaGenerateEqualsAndHash=Boolean(object.javaGenerateEqualsAndHash);if(object.javaStringCheckUtf8!=null)message.javaStringCheckUtf8=Boolean(object.javaStringCheckUtf8);switch(object.optimizeFor){case'SPEED':case 1:message.optimizeFor=1;break;case'CODE_SIZE':case 2:message.optimizeFor=2;break;case'LITE_RUNTIME':case 3:message.optimizeFor=3;break;}if(object.goPackage!=null)message.goPackage=String(object.goPackage);if(object.ccGenericServices!=null)message.ccGenericServices=Boolean(object.ccGenericServices);if(object.javaGenericServices!=null)message.javaGenericServices=Boolean(object.javaGenericServices);if(object.pyGenericServices!=null)message.pyGenericServices=Boolean(object.pyGenericServices);if(object.deprecated!=null)message.deprecated=Boolean(object.deprecated);if(object.ccEnableArenas!=null)message.ccEnableArenas=Boolean(object.ccEnableArenas);if(object.objcClassPrefix!=null)message.objcClassPrefix=String(object.objcClassPrefix);if(object.csharpNamespace!=null)message.csharpNamespace=String(object.csharpNamespace);if(object.uninterpretedOption){if(!Array.isArray(object.uninterpretedOption))throw TypeError('.google.protobuf.FileOptions.uninterpretedOption: array expected');message.uninterpretedOption=[];for(var i=0;i<object.uninterpretedOption.length;++i){if(typeof object.uninterpretedOption[i]!=='object')throw TypeError('.google.protobuf.FileOptions.uninterpretedOption: object expected');message.uninterpretedOption[i]=$root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);}}return message;};/**
             * Creates a plain object from a FileOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FileOptions
             * @static
             * @param {google.protobuf.FileOptions} message FileOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */FileOptions.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.uninterpretedOption=[];if(options.defaults){object.javaPackage='';object.javaOuterClassname='';object.optimizeFor=options.enums===String?'SPEED':1;object.javaMultipleFiles=false;object.goPackage='';object.ccGenericServices=false;object.javaGenericServices=false;object.pyGenericServices=false;object.javaGenerateEqualsAndHash=false;object.deprecated=false;object.javaStringCheckUtf8=false;object.ccEnableArenas=false;object.objcClassPrefix='';object.csharpNamespace='';}if(message.javaPackage!=null&&message.hasOwnProperty('javaPackage'))object.javaPackage=message.javaPackage;if(message.javaOuterClassname!=null&&message.hasOwnProperty('javaOuterClassname'))object.javaOuterClassname=message.javaOuterClassname;if(message.optimizeFor!=null&&message.hasOwnProperty('optimizeFor'))object.optimizeFor=options.enums===String?$root.google.protobuf.FileOptions.OptimizeMode[message.optimizeFor]:message.optimizeFor;if(message.javaMultipleFiles!=null&&message.hasOwnProperty('javaMultipleFiles'))object.javaMultipleFiles=message.javaMultipleFiles;if(message.goPackage!=null&&message.hasOwnProperty('goPackage'))object.goPackage=message.goPackage;if(message.ccGenericServices!=null&&message.hasOwnProperty('ccGenericServices'))object.ccGenericServices=message.ccGenericServices;if(message.javaGenericServices!=null&&message.hasOwnProperty('javaGenericServices'))object.javaGenericServices=message.javaGenericServices;if(message.pyGenericServices!=null&&message.hasOwnProperty('pyGenericServices'))object.pyGenericServices=message.pyGenericServices;if(message.javaGenerateEqualsAndHash!=null&&message.hasOwnProperty('javaGenerateEqualsAndHash'))object.javaGenerateEqualsAndHash=message.javaGenerateEqualsAndHash;if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))object.deprecated=message.deprecated;if(message.javaStringCheckUtf8!=null&&message.hasOwnProperty('javaStringCheckUtf8'))object.javaStringCheckUtf8=message.javaStringCheckUtf8;if(message.ccEnableArenas!=null&&message.hasOwnProperty('ccEnableArenas'))object.ccEnableArenas=message.ccEnableArenas;if(message.objcClassPrefix!=null&&message.hasOwnProperty('objcClassPrefix'))object.objcClassPrefix=message.objcClassPrefix;if(message.csharpNamespace!=null&&message.hasOwnProperty('csharpNamespace'))object.csharpNamespace=message.csharpNamespace;if(message.uninterpretedOption&&message.uninterpretedOption.length){object.uninterpretedOption=[];for(var j=0;j<message.uninterpretedOption.length;++j){object.uninterpretedOption[j]=$root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j],options);}}return object;};/**
             * Converts this FileOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.FileOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */FileOptions.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};/**
             * OptimizeMode enum.
             * @name google.protobuf.FileOptions.OptimizeMode
             * @enum {string}
             * @property {number} SPEED=1 SPEED value
             * @property {number} CODE_SIZE=2 CODE_SIZE value
             * @property {number} LITE_RUNTIME=3 LITE_RUNTIME value
             */FileOptions.OptimizeMode=function(){var valuesById={},values=Object.create(valuesById);values[valuesById[1]='SPEED']=1;values[valuesById[2]='CODE_SIZE']=2;values[valuesById[3]='LITE_RUNTIME']=3;return values;}();return FileOptions;}();protobuf.MessageOptions=function(){/**
             * Properties of a MessageOptions.
             * @memberof google.protobuf
             * @interface IMessageOptions
             * @property {boolean|null} [messageSetWireFormat] MessageOptions messageSetWireFormat
             * @property {boolean|null} [noStandardDescriptorAccessor] MessageOptions noStandardDescriptorAccessor
             * @property {boolean|null} [deprecated] MessageOptions deprecated
             * @property {boolean|null} [mapEntry] MessageOptions mapEntry
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] MessageOptions uninterpretedOption
             *//**
             * Constructs a new MessageOptions.
             * @memberof google.protobuf
             * @classdesc Represents a MessageOptions.
             * @implements IMessageOptions
             * @constructor
             * @param {google.protobuf.IMessageOptions=} [properties] Properties to set
             */function MessageOptions(properties){this.uninterpretedOption=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * MessageOptions messageSetWireFormat.
             * @member {boolean} messageSetWireFormat
             * @memberof google.protobuf.MessageOptions
             * @instance
             */MessageOptions.prototype.messageSetWireFormat=false;/**
             * MessageOptions noStandardDescriptorAccessor.
             * @member {boolean} noStandardDescriptorAccessor
             * @memberof google.protobuf.MessageOptions
             * @instance
             */MessageOptions.prototype.noStandardDescriptorAccessor=false;/**
             * MessageOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.MessageOptions
             * @instance
             */MessageOptions.prototype.deprecated=false;/**
             * MessageOptions mapEntry.
             * @member {boolean} mapEntry
             * @memberof google.protobuf.MessageOptions
             * @instance
             */MessageOptions.prototype.mapEntry=false;/**
             * MessageOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.MessageOptions
             * @instance
             */MessageOptions.prototype.uninterpretedOption=$util.emptyArray;/**
             * Creates a new MessageOptions instance using the specified properties.
             * @function create
             * @memberof google.protobuf.MessageOptions
             * @static
             * @param {google.protobuf.IMessageOptions=} [properties] Properties to set
             * @returns {google.protobuf.MessageOptions} MessageOptions instance
             */MessageOptions.create=function create(properties){return new MessageOptions(properties);};/**
             * Encodes the specified MessageOptions message. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.MessageOptions
             * @static
             * @param {google.protobuf.IMessageOptions} message MessageOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */MessageOptions.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.messageSetWireFormat!=null&&message.hasOwnProperty('messageSetWireFormat'))writer.uint32(/* id 1, wireType 0 =*/8).bool(message.messageSetWireFormat);if(message.noStandardDescriptorAccessor!=null&&message.hasOwnProperty('noStandardDescriptorAccessor'))writer.uint32(/* id 2, wireType 0 =*/16).bool(message.noStandardDescriptorAccessor);if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))writer.uint32(/* id 3, wireType 0 =*/24).bool(message.deprecated);if(message.mapEntry!=null&&message.hasOwnProperty('mapEntry'))writer.uint32(/* id 7, wireType 0 =*/56).bool(message.mapEntry);if(message.uninterpretedOption!=null&&message.uninterpretedOption.length)for(var i=0;i<message.uninterpretedOption.length;++i){$root.google.protobuf.UninterpretedOption.encode(message.uninterpretedOption[i],writer.uint32(/* id 999, wireType 2 =*/7994).fork()).ldelim();}return writer;};/**
             * Encodes the specified MessageOptions message, length delimited. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.MessageOptions
             * @static
             * @param {google.protobuf.IMessageOptions} message MessageOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */MessageOptions.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a MessageOptions message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.MessageOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MessageOptions} MessageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */MessageOptions.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.MessageOptions();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.messageSetWireFormat=reader.bool();break;case 2:message.noStandardDescriptorAccessor=reader.bool();break;case 3:message.deprecated=reader.bool();break;case 7:message.mapEntry=reader.bool();break;case 999:if(!(message.uninterpretedOption&&message.uninterpretedOption.length))message.uninterpretedOption=[];message.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a MessageOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.MessageOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.MessageOptions} MessageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */MessageOptions.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a MessageOptions message.
             * @function verify
             * @memberof google.protobuf.MessageOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */MessageOptions.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.messageSetWireFormat!=null&&message.hasOwnProperty('messageSetWireFormat'))if(typeof message.messageSetWireFormat!=='boolean')return'messageSetWireFormat: boolean expected';if(message.noStandardDescriptorAccessor!=null&&message.hasOwnProperty('noStandardDescriptorAccessor'))if(typeof message.noStandardDescriptorAccessor!=='boolean')return'noStandardDescriptorAccessor: boolean expected';if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))if(typeof message.deprecated!=='boolean')return'deprecated: boolean expected';if(message.mapEntry!=null&&message.hasOwnProperty('mapEntry'))if(typeof message.mapEntry!=='boolean')return'mapEntry: boolean expected';if(message.uninterpretedOption!=null&&message.hasOwnProperty('uninterpretedOption')){if(!Array.isArray(message.uninterpretedOption))return'uninterpretedOption: array expected';for(var i=0;i<message.uninterpretedOption.length;++i){var error=$root.google.protobuf.UninterpretedOption.verify(message.uninterpretedOption[i]);if(error)return'uninterpretedOption.'+error;}}return null;};/**
             * Creates a MessageOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.MessageOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.MessageOptions} MessageOptions
             */MessageOptions.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.MessageOptions)return object;var message=new $root.google.protobuf.MessageOptions();if(object.messageSetWireFormat!=null)message.messageSetWireFormat=Boolean(object.messageSetWireFormat);if(object.noStandardDescriptorAccessor!=null)message.noStandardDescriptorAccessor=Boolean(object.noStandardDescriptorAccessor);if(object.deprecated!=null)message.deprecated=Boolean(object.deprecated);if(object.mapEntry!=null)message.mapEntry=Boolean(object.mapEntry);if(object.uninterpretedOption){if(!Array.isArray(object.uninterpretedOption))throw TypeError('.google.protobuf.MessageOptions.uninterpretedOption: array expected');message.uninterpretedOption=[];for(var i=0;i<object.uninterpretedOption.length;++i){if(typeof object.uninterpretedOption[i]!=='object')throw TypeError('.google.protobuf.MessageOptions.uninterpretedOption: object expected');message.uninterpretedOption[i]=$root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);}}return message;};/**
             * Creates a plain object from a MessageOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.MessageOptions
             * @static
             * @param {google.protobuf.MessageOptions} message MessageOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */MessageOptions.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.uninterpretedOption=[];if(options.defaults){object.messageSetWireFormat=false;object.noStandardDescriptorAccessor=false;object.deprecated=false;object.mapEntry=false;}if(message.messageSetWireFormat!=null&&message.hasOwnProperty('messageSetWireFormat'))object.messageSetWireFormat=message.messageSetWireFormat;if(message.noStandardDescriptorAccessor!=null&&message.hasOwnProperty('noStandardDescriptorAccessor'))object.noStandardDescriptorAccessor=message.noStandardDescriptorAccessor;if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))object.deprecated=message.deprecated;if(message.mapEntry!=null&&message.hasOwnProperty('mapEntry'))object.mapEntry=message.mapEntry;if(message.uninterpretedOption&&message.uninterpretedOption.length){object.uninterpretedOption=[];for(var j=0;j<message.uninterpretedOption.length;++j){object.uninterpretedOption[j]=$root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j],options);}}return object;};/**
             * Converts this MessageOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.MessageOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */MessageOptions.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return MessageOptions;}();protobuf.FieldOptions=function(){/**
             * Properties of a FieldOptions.
             * @memberof google.protobuf
             * @interface IFieldOptions
             * @property {google.protobuf.FieldOptions.CType|null} [ctype] FieldOptions ctype
             * @property {boolean|null} [packed] FieldOptions packed
             * @property {google.protobuf.FieldOptions.JSType|null} [jstype] FieldOptions jstype
             * @property {boolean|null} [lazy] FieldOptions lazy
             * @property {boolean|null} [deprecated] FieldOptions deprecated
             * @property {boolean|null} [weak] FieldOptions weak
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] FieldOptions uninterpretedOption
             *//**
             * Constructs a new FieldOptions.
             * @memberof google.protobuf
             * @classdesc Represents a FieldOptions.
             * @implements IFieldOptions
             * @constructor
             * @param {google.protobuf.IFieldOptions=} [properties] Properties to set
             */function FieldOptions(properties){this.uninterpretedOption=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * FieldOptions ctype.
             * @member {google.protobuf.FieldOptions.CType} ctype
             * @memberof google.protobuf.FieldOptions
             * @instance
             */FieldOptions.prototype.ctype=0;/**
             * FieldOptions packed.
             * @member {boolean} packed
             * @memberof google.protobuf.FieldOptions
             * @instance
             */FieldOptions.prototype.packed=false;/**
             * FieldOptions jstype.
             * @member {google.protobuf.FieldOptions.JSType} jstype
             * @memberof google.protobuf.FieldOptions
             * @instance
             */FieldOptions.prototype.jstype=0;/**
             * FieldOptions lazy.
             * @member {boolean} lazy
             * @memberof google.protobuf.FieldOptions
             * @instance
             */FieldOptions.prototype.lazy=false;/**
             * FieldOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.FieldOptions
             * @instance
             */FieldOptions.prototype.deprecated=false;/**
             * FieldOptions weak.
             * @member {boolean} weak
             * @memberof google.protobuf.FieldOptions
             * @instance
             */FieldOptions.prototype.weak=false;/**
             * FieldOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.FieldOptions
             * @instance
             */FieldOptions.prototype.uninterpretedOption=$util.emptyArray;/**
             * Creates a new FieldOptions instance using the specified properties.
             * @function create
             * @memberof google.protobuf.FieldOptions
             * @static
             * @param {google.protobuf.IFieldOptions=} [properties] Properties to set
             * @returns {google.protobuf.FieldOptions} FieldOptions instance
             */FieldOptions.create=function create(properties){return new FieldOptions(properties);};/**
             * Encodes the specified FieldOptions message. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.FieldOptions
             * @static
             * @param {google.protobuf.IFieldOptions} message FieldOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */FieldOptions.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.ctype!=null&&message.hasOwnProperty('ctype'))writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ctype);if(message.packed!=null&&message.hasOwnProperty('packed'))writer.uint32(/* id 2, wireType 0 =*/16).bool(message.packed);if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))writer.uint32(/* id 3, wireType 0 =*/24).bool(message.deprecated);if(message.lazy!=null&&message.hasOwnProperty('lazy'))writer.uint32(/* id 5, wireType 0 =*/40).bool(message.lazy);if(message.jstype!=null&&message.hasOwnProperty('jstype'))writer.uint32(/* id 6, wireType 0 =*/48).int32(message.jstype);if(message.weak!=null&&message.hasOwnProperty('weak'))writer.uint32(/* id 10, wireType 0 =*/80).bool(message.weak);if(message.uninterpretedOption!=null&&message.uninterpretedOption.length)for(var i=0;i<message.uninterpretedOption.length;++i){$root.google.protobuf.UninterpretedOption.encode(message.uninterpretedOption[i],writer.uint32(/* id 999, wireType 2 =*/7994).fork()).ldelim();}return writer;};/**
             * Encodes the specified FieldOptions message, length delimited. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.FieldOptions
             * @static
             * @param {google.protobuf.IFieldOptions} message FieldOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */FieldOptions.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a FieldOptions message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.FieldOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FieldOptions} FieldOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */FieldOptions.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.FieldOptions();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.ctype=reader.int32();break;case 2:message.packed=reader.bool();break;case 6:message.jstype=reader.int32();break;case 5:message.lazy=reader.bool();break;case 3:message.deprecated=reader.bool();break;case 10:message.weak=reader.bool();break;case 999:if(!(message.uninterpretedOption&&message.uninterpretedOption.length))message.uninterpretedOption=[];message.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a FieldOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.FieldOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.FieldOptions} FieldOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */FieldOptions.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a FieldOptions message.
             * @function verify
             * @memberof google.protobuf.FieldOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */FieldOptions.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.ctype!=null&&message.hasOwnProperty('ctype'))switch(message.ctype){default:return'ctype: enum value expected';case 0:case 1:case 2:break;}if(message.packed!=null&&message.hasOwnProperty('packed'))if(typeof message.packed!=='boolean')return'packed: boolean expected';if(message.jstype!=null&&message.hasOwnProperty('jstype'))switch(message.jstype){default:return'jstype: enum value expected';case 0:case 1:case 2:break;}if(message.lazy!=null&&message.hasOwnProperty('lazy'))if(typeof message.lazy!=='boolean')return'lazy: boolean expected';if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))if(typeof message.deprecated!=='boolean')return'deprecated: boolean expected';if(message.weak!=null&&message.hasOwnProperty('weak'))if(typeof message.weak!=='boolean')return'weak: boolean expected';if(message.uninterpretedOption!=null&&message.hasOwnProperty('uninterpretedOption')){if(!Array.isArray(message.uninterpretedOption))return'uninterpretedOption: array expected';for(var i=0;i<message.uninterpretedOption.length;++i){var error=$root.google.protobuf.UninterpretedOption.verify(message.uninterpretedOption[i]);if(error)return'uninterpretedOption.'+error;}}return null;};/**
             * Creates a FieldOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FieldOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FieldOptions} FieldOptions
             */FieldOptions.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.FieldOptions)return object;var message=new $root.google.protobuf.FieldOptions();switch(object.ctype){case'STRING':case 0:message.ctype=0;break;case'CORD':case 1:message.ctype=1;break;case'STRING_PIECE':case 2:message.ctype=2;break;}if(object.packed!=null)message.packed=Boolean(object.packed);switch(object.jstype){case'JS_NORMAL':case 0:message.jstype=0;break;case'JS_STRING':case 1:message.jstype=1;break;case'JS_NUMBER':case 2:message.jstype=2;break;}if(object.lazy!=null)message.lazy=Boolean(object.lazy);if(object.deprecated!=null)message.deprecated=Boolean(object.deprecated);if(object.weak!=null)message.weak=Boolean(object.weak);if(object.uninterpretedOption){if(!Array.isArray(object.uninterpretedOption))throw TypeError('.google.protobuf.FieldOptions.uninterpretedOption: array expected');message.uninterpretedOption=[];for(var i=0;i<object.uninterpretedOption.length;++i){if(typeof object.uninterpretedOption[i]!=='object')throw TypeError('.google.protobuf.FieldOptions.uninterpretedOption: object expected');message.uninterpretedOption[i]=$root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);}}return message;};/**
             * Creates a plain object from a FieldOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FieldOptions
             * @static
             * @param {google.protobuf.FieldOptions} message FieldOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */FieldOptions.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.uninterpretedOption=[];if(options.defaults){object.ctype=options.enums===String?'STRING':0;object.packed=false;object.deprecated=false;object.lazy=false;object.jstype=options.enums===String?'JS_NORMAL':0;object.weak=false;}if(message.ctype!=null&&message.hasOwnProperty('ctype'))object.ctype=options.enums===String?$root.google.protobuf.FieldOptions.CType[message.ctype]:message.ctype;if(message.packed!=null&&message.hasOwnProperty('packed'))object.packed=message.packed;if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))object.deprecated=message.deprecated;if(message.lazy!=null&&message.hasOwnProperty('lazy'))object.lazy=message.lazy;if(message.jstype!=null&&message.hasOwnProperty('jstype'))object.jstype=options.enums===String?$root.google.protobuf.FieldOptions.JSType[message.jstype]:message.jstype;if(message.weak!=null&&message.hasOwnProperty('weak'))object.weak=message.weak;if(message.uninterpretedOption&&message.uninterpretedOption.length){object.uninterpretedOption=[];for(var j=0;j<message.uninterpretedOption.length;++j){object.uninterpretedOption[j]=$root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j],options);}}return object;};/**
             * Converts this FieldOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.FieldOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */FieldOptions.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};/**
             * CType enum.
             * @name google.protobuf.FieldOptions.CType
             * @enum {string}
             * @property {number} STRING=0 STRING value
             * @property {number} CORD=1 CORD value
             * @property {number} STRING_PIECE=2 STRING_PIECE value
             */FieldOptions.CType=function(){var valuesById={},values=Object.create(valuesById);values[valuesById[0]='STRING']=0;values[valuesById[1]='CORD']=1;values[valuesById[2]='STRING_PIECE']=2;return values;}();/**
             * JSType enum.
             * @name google.protobuf.FieldOptions.JSType
             * @enum {string}
             * @property {number} JS_NORMAL=0 JS_NORMAL value
             * @property {number} JS_STRING=1 JS_STRING value
             * @property {number} JS_NUMBER=2 JS_NUMBER value
             */FieldOptions.JSType=function(){var valuesById={},values=Object.create(valuesById);values[valuesById[0]='JS_NORMAL']=0;values[valuesById[1]='JS_STRING']=1;values[valuesById[2]='JS_NUMBER']=2;return values;}();return FieldOptions;}();protobuf.OneofOptions=function(){/**
             * Properties of an OneofOptions.
             * @memberof google.protobuf
             * @interface IOneofOptions
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] OneofOptions uninterpretedOption
             *//**
             * Constructs a new OneofOptions.
             * @memberof google.protobuf
             * @classdesc Represents an OneofOptions.
             * @implements IOneofOptions
             * @constructor
             * @param {google.protobuf.IOneofOptions=} [properties] Properties to set
             */function OneofOptions(properties){this.uninterpretedOption=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * OneofOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.OneofOptions
             * @instance
             */OneofOptions.prototype.uninterpretedOption=$util.emptyArray;/**
             * Creates a new OneofOptions instance using the specified properties.
             * @function create
             * @memberof google.protobuf.OneofOptions
             * @static
             * @param {google.protobuf.IOneofOptions=} [properties] Properties to set
             * @returns {google.protobuf.OneofOptions} OneofOptions instance
             */OneofOptions.create=function create(properties){return new OneofOptions(properties);};/**
             * Encodes the specified OneofOptions message. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.OneofOptions
             * @static
             * @param {google.protobuf.IOneofOptions} message OneofOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */OneofOptions.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.uninterpretedOption!=null&&message.uninterpretedOption.length)for(var i=0;i<message.uninterpretedOption.length;++i){$root.google.protobuf.UninterpretedOption.encode(message.uninterpretedOption[i],writer.uint32(/* id 999, wireType 2 =*/7994).fork()).ldelim();}return writer;};/**
             * Encodes the specified OneofOptions message, length delimited. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.OneofOptions
             * @static
             * @param {google.protobuf.IOneofOptions} message OneofOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */OneofOptions.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes an OneofOptions message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.OneofOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.OneofOptions} OneofOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */OneofOptions.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.OneofOptions();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 999:if(!(message.uninterpretedOption&&message.uninterpretedOption.length))message.uninterpretedOption=[];message.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes an OneofOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.OneofOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.OneofOptions} OneofOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */OneofOptions.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies an OneofOptions message.
             * @function verify
             * @memberof google.protobuf.OneofOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */OneofOptions.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.uninterpretedOption!=null&&message.hasOwnProperty('uninterpretedOption')){if(!Array.isArray(message.uninterpretedOption))return'uninterpretedOption: array expected';for(var i=0;i<message.uninterpretedOption.length;++i){var error=$root.google.protobuf.UninterpretedOption.verify(message.uninterpretedOption[i]);if(error)return'uninterpretedOption.'+error;}}return null;};/**
             * Creates an OneofOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.OneofOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.OneofOptions} OneofOptions
             */OneofOptions.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.OneofOptions)return object;var message=new $root.google.protobuf.OneofOptions();if(object.uninterpretedOption){if(!Array.isArray(object.uninterpretedOption))throw TypeError('.google.protobuf.OneofOptions.uninterpretedOption: array expected');message.uninterpretedOption=[];for(var i=0;i<object.uninterpretedOption.length;++i){if(typeof object.uninterpretedOption[i]!=='object')throw TypeError('.google.protobuf.OneofOptions.uninterpretedOption: object expected');message.uninterpretedOption[i]=$root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);}}return message;};/**
             * Creates a plain object from an OneofOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.OneofOptions
             * @static
             * @param {google.protobuf.OneofOptions} message OneofOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */OneofOptions.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.uninterpretedOption=[];if(message.uninterpretedOption&&message.uninterpretedOption.length){object.uninterpretedOption=[];for(var j=0;j<message.uninterpretedOption.length;++j){object.uninterpretedOption[j]=$root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j],options);}}return object;};/**
             * Converts this OneofOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.OneofOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */OneofOptions.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return OneofOptions;}();protobuf.EnumOptions=function(){/**
             * Properties of an EnumOptions.
             * @memberof google.protobuf
             * @interface IEnumOptions
             * @property {boolean|null} [allowAlias] EnumOptions allowAlias
             * @property {boolean|null} [deprecated] EnumOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] EnumOptions uninterpretedOption
             *//**
             * Constructs a new EnumOptions.
             * @memberof google.protobuf
             * @classdesc Represents an EnumOptions.
             * @implements IEnumOptions
             * @constructor
             * @param {google.protobuf.IEnumOptions=} [properties] Properties to set
             */function EnumOptions(properties){this.uninterpretedOption=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * EnumOptions allowAlias.
             * @member {boolean} allowAlias
             * @memberof google.protobuf.EnumOptions
             * @instance
             */EnumOptions.prototype.allowAlias=false;/**
             * EnumOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.EnumOptions
             * @instance
             */EnumOptions.prototype.deprecated=false;/**
             * EnumOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.EnumOptions
             * @instance
             */EnumOptions.prototype.uninterpretedOption=$util.emptyArray;/**
             * Creates a new EnumOptions instance using the specified properties.
             * @function create
             * @memberof google.protobuf.EnumOptions
             * @static
             * @param {google.protobuf.IEnumOptions=} [properties] Properties to set
             * @returns {google.protobuf.EnumOptions} EnumOptions instance
             */EnumOptions.create=function create(properties){return new EnumOptions(properties);};/**
             * Encodes the specified EnumOptions message. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.EnumOptions
             * @static
             * @param {google.protobuf.IEnumOptions} message EnumOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */EnumOptions.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.allowAlias!=null&&message.hasOwnProperty('allowAlias'))writer.uint32(/* id 2, wireType 0 =*/16).bool(message.allowAlias);if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))writer.uint32(/* id 3, wireType 0 =*/24).bool(message.deprecated);if(message.uninterpretedOption!=null&&message.uninterpretedOption.length)for(var i=0;i<message.uninterpretedOption.length;++i){$root.google.protobuf.UninterpretedOption.encode(message.uninterpretedOption[i],writer.uint32(/* id 999, wireType 2 =*/7994).fork()).ldelim();}return writer;};/**
             * Encodes the specified EnumOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.EnumOptions
             * @static
             * @param {google.protobuf.IEnumOptions} message EnumOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */EnumOptions.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes an EnumOptions message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.EnumOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumOptions} EnumOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */EnumOptions.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.EnumOptions();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 2:message.allowAlias=reader.bool();break;case 3:message.deprecated=reader.bool();break;case 999:if(!(message.uninterpretedOption&&message.uninterpretedOption.length))message.uninterpretedOption=[];message.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes an EnumOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.EnumOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.EnumOptions} EnumOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */EnumOptions.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies an EnumOptions message.
             * @function verify
             * @memberof google.protobuf.EnumOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */EnumOptions.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.allowAlias!=null&&message.hasOwnProperty('allowAlias'))if(typeof message.allowAlias!=='boolean')return'allowAlias: boolean expected';if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))if(typeof message.deprecated!=='boolean')return'deprecated: boolean expected';if(message.uninterpretedOption!=null&&message.hasOwnProperty('uninterpretedOption')){if(!Array.isArray(message.uninterpretedOption))return'uninterpretedOption: array expected';for(var i=0;i<message.uninterpretedOption.length;++i){var error=$root.google.protobuf.UninterpretedOption.verify(message.uninterpretedOption[i]);if(error)return'uninterpretedOption.'+error;}}return null;};/**
             * Creates an EnumOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.EnumOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.EnumOptions} EnumOptions
             */EnumOptions.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.EnumOptions)return object;var message=new $root.google.protobuf.EnumOptions();if(object.allowAlias!=null)message.allowAlias=Boolean(object.allowAlias);if(object.deprecated!=null)message.deprecated=Boolean(object.deprecated);if(object.uninterpretedOption){if(!Array.isArray(object.uninterpretedOption))throw TypeError('.google.protobuf.EnumOptions.uninterpretedOption: array expected');message.uninterpretedOption=[];for(var i=0;i<object.uninterpretedOption.length;++i){if(typeof object.uninterpretedOption[i]!=='object')throw TypeError('.google.protobuf.EnumOptions.uninterpretedOption: object expected');message.uninterpretedOption[i]=$root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);}}return message;};/**
             * Creates a plain object from an EnumOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.EnumOptions
             * @static
             * @param {google.protobuf.EnumOptions} message EnumOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */EnumOptions.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.uninterpretedOption=[];if(options.defaults){object.allowAlias=false;object.deprecated=false;}if(message.allowAlias!=null&&message.hasOwnProperty('allowAlias'))object.allowAlias=message.allowAlias;if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))object.deprecated=message.deprecated;if(message.uninterpretedOption&&message.uninterpretedOption.length){object.uninterpretedOption=[];for(var j=0;j<message.uninterpretedOption.length;++j){object.uninterpretedOption[j]=$root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j],options);}}return object;};/**
             * Converts this EnumOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.EnumOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */EnumOptions.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return EnumOptions;}();protobuf.EnumValueOptions=function(){/**
             * Properties of an EnumValueOptions.
             * @memberof google.protobuf
             * @interface IEnumValueOptions
             * @property {boolean|null} [deprecated] EnumValueOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] EnumValueOptions uninterpretedOption
             *//**
             * Constructs a new EnumValueOptions.
             * @memberof google.protobuf
             * @classdesc Represents an EnumValueOptions.
             * @implements IEnumValueOptions
             * @constructor
             * @param {google.protobuf.IEnumValueOptions=} [properties] Properties to set
             */function EnumValueOptions(properties){this.uninterpretedOption=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * EnumValueOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.EnumValueOptions
             * @instance
             */EnumValueOptions.prototype.deprecated=false;/**
             * EnumValueOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.EnumValueOptions
             * @instance
             */EnumValueOptions.prototype.uninterpretedOption=$util.emptyArray;/**
             * Creates a new EnumValueOptions instance using the specified properties.
             * @function create
             * @memberof google.protobuf.EnumValueOptions
             * @static
             * @param {google.protobuf.IEnumValueOptions=} [properties] Properties to set
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions instance
             */EnumValueOptions.create=function create(properties){return new EnumValueOptions(properties);};/**
             * Encodes the specified EnumValueOptions message. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.EnumValueOptions
             * @static
             * @param {google.protobuf.IEnumValueOptions} message EnumValueOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */EnumValueOptions.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))writer.uint32(/* id 1, wireType 0 =*/8).bool(message.deprecated);if(message.uninterpretedOption!=null&&message.uninterpretedOption.length)for(var i=0;i<message.uninterpretedOption.length;++i){$root.google.protobuf.UninterpretedOption.encode(message.uninterpretedOption[i],writer.uint32(/* id 999, wireType 2 =*/7994).fork()).ldelim();}return writer;};/**
             * Encodes the specified EnumValueOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.EnumValueOptions
             * @static
             * @param {google.protobuf.IEnumValueOptions} message EnumValueOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */EnumValueOptions.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes an EnumValueOptions message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.EnumValueOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */EnumValueOptions.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.EnumValueOptions();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.deprecated=reader.bool();break;case 999:if(!(message.uninterpretedOption&&message.uninterpretedOption.length))message.uninterpretedOption=[];message.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes an EnumValueOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.EnumValueOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */EnumValueOptions.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies an EnumValueOptions message.
             * @function verify
             * @memberof google.protobuf.EnumValueOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */EnumValueOptions.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))if(typeof message.deprecated!=='boolean')return'deprecated: boolean expected';if(message.uninterpretedOption!=null&&message.hasOwnProperty('uninterpretedOption')){if(!Array.isArray(message.uninterpretedOption))return'uninterpretedOption: array expected';for(var i=0;i<message.uninterpretedOption.length;++i){var error=$root.google.protobuf.UninterpretedOption.verify(message.uninterpretedOption[i]);if(error)return'uninterpretedOption.'+error;}}return null;};/**
             * Creates an EnumValueOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.EnumValueOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.EnumValueOptions} EnumValueOptions
             */EnumValueOptions.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.EnumValueOptions)return object;var message=new $root.google.protobuf.EnumValueOptions();if(object.deprecated!=null)message.deprecated=Boolean(object.deprecated);if(object.uninterpretedOption){if(!Array.isArray(object.uninterpretedOption))throw TypeError('.google.protobuf.EnumValueOptions.uninterpretedOption: array expected');message.uninterpretedOption=[];for(var i=0;i<object.uninterpretedOption.length;++i){if(typeof object.uninterpretedOption[i]!=='object')throw TypeError('.google.protobuf.EnumValueOptions.uninterpretedOption: object expected');message.uninterpretedOption[i]=$root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);}}return message;};/**
             * Creates a plain object from an EnumValueOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.EnumValueOptions
             * @static
             * @param {google.protobuf.EnumValueOptions} message EnumValueOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */EnumValueOptions.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.uninterpretedOption=[];if(options.defaults)object.deprecated=false;if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))object.deprecated=message.deprecated;if(message.uninterpretedOption&&message.uninterpretedOption.length){object.uninterpretedOption=[];for(var j=0;j<message.uninterpretedOption.length;++j){object.uninterpretedOption[j]=$root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j],options);}}return object;};/**
             * Converts this EnumValueOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.EnumValueOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */EnumValueOptions.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return EnumValueOptions;}();protobuf.ServiceOptions=function(){/**
             * Properties of a ServiceOptions.
             * @memberof google.protobuf
             * @interface IServiceOptions
             * @property {boolean|null} [deprecated] ServiceOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] ServiceOptions uninterpretedOption
             *//**
             * Constructs a new ServiceOptions.
             * @memberof google.protobuf
             * @classdesc Represents a ServiceOptions.
             * @implements IServiceOptions
             * @constructor
             * @param {google.protobuf.IServiceOptions=} [properties] Properties to set
             */function ServiceOptions(properties){this.uninterpretedOption=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * ServiceOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.ServiceOptions
             * @instance
             */ServiceOptions.prototype.deprecated=false;/**
             * ServiceOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.ServiceOptions
             * @instance
             */ServiceOptions.prototype.uninterpretedOption=$util.emptyArray;/**
             * Creates a new ServiceOptions instance using the specified properties.
             * @function create
             * @memberof google.protobuf.ServiceOptions
             * @static
             * @param {google.protobuf.IServiceOptions=} [properties] Properties to set
             * @returns {google.protobuf.ServiceOptions} ServiceOptions instance
             */ServiceOptions.create=function create(properties){return new ServiceOptions(properties);};/**
             * Encodes the specified ServiceOptions message. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.ServiceOptions
             * @static
             * @param {google.protobuf.IServiceOptions} message ServiceOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */ServiceOptions.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))writer.uint32(/* id 33, wireType 0 =*/264).bool(message.deprecated);if(message.uninterpretedOption!=null&&message.uninterpretedOption.length)for(var i=0;i<message.uninterpretedOption.length;++i){$root.google.protobuf.UninterpretedOption.encode(message.uninterpretedOption[i],writer.uint32(/* id 999, wireType 2 =*/7994).fork()).ldelim();}return writer;};/**
             * Encodes the specified ServiceOptions message, length delimited. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.ServiceOptions
             * @static
             * @param {google.protobuf.IServiceOptions} message ServiceOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */ServiceOptions.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a ServiceOptions message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.ServiceOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */ServiceOptions.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.ServiceOptions();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 33:message.deprecated=reader.bool();break;case 999:if(!(message.uninterpretedOption&&message.uninterpretedOption.length))message.uninterpretedOption=[];message.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a ServiceOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.ServiceOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */ServiceOptions.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a ServiceOptions message.
             * @function verify
             * @memberof google.protobuf.ServiceOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */ServiceOptions.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))if(typeof message.deprecated!=='boolean')return'deprecated: boolean expected';if(message.uninterpretedOption!=null&&message.hasOwnProperty('uninterpretedOption')){if(!Array.isArray(message.uninterpretedOption))return'uninterpretedOption: array expected';for(var i=0;i<message.uninterpretedOption.length;++i){var error=$root.google.protobuf.UninterpretedOption.verify(message.uninterpretedOption[i]);if(error)return'uninterpretedOption.'+error;}}return null;};/**
             * Creates a ServiceOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.ServiceOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.ServiceOptions} ServiceOptions
             */ServiceOptions.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.ServiceOptions)return object;var message=new $root.google.protobuf.ServiceOptions();if(object.deprecated!=null)message.deprecated=Boolean(object.deprecated);if(object.uninterpretedOption){if(!Array.isArray(object.uninterpretedOption))throw TypeError('.google.protobuf.ServiceOptions.uninterpretedOption: array expected');message.uninterpretedOption=[];for(var i=0;i<object.uninterpretedOption.length;++i){if(typeof object.uninterpretedOption[i]!=='object')throw TypeError('.google.protobuf.ServiceOptions.uninterpretedOption: object expected');message.uninterpretedOption[i]=$root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);}}return message;};/**
             * Creates a plain object from a ServiceOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.ServiceOptions
             * @static
             * @param {google.protobuf.ServiceOptions} message ServiceOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */ServiceOptions.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.uninterpretedOption=[];if(options.defaults)object.deprecated=false;if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))object.deprecated=message.deprecated;if(message.uninterpretedOption&&message.uninterpretedOption.length){object.uninterpretedOption=[];for(var j=0;j<message.uninterpretedOption.length;++j){object.uninterpretedOption[j]=$root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j],options);}}return object;};/**
             * Converts this ServiceOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.ServiceOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */ServiceOptions.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return ServiceOptions;}();protobuf.MethodOptions=function(){/**
             * Properties of a MethodOptions.
             * @memberof google.protobuf
             * @interface IMethodOptions
             * @property {boolean|null} [deprecated] MethodOptions deprecated
             * @property {Array.<google.protobuf.IUninterpretedOption>|null} [uninterpretedOption] MethodOptions uninterpretedOption
             * @property {google.api.IHttpRule|null} [".google.api.http"] MethodOptions .google.api.http
             *//**
             * Constructs a new MethodOptions.
             * @memberof google.protobuf
             * @classdesc Represents a MethodOptions.
             * @implements IMethodOptions
             * @constructor
             * @param {google.protobuf.IMethodOptions=} [properties] Properties to set
             */function MethodOptions(properties){this.uninterpretedOption=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * MethodOptions deprecated.
             * @member {boolean} deprecated
             * @memberof google.protobuf.MethodOptions
             * @instance
             */MethodOptions.prototype.deprecated=false;/**
             * MethodOptions uninterpretedOption.
             * @member {Array.<google.protobuf.IUninterpretedOption>} uninterpretedOption
             * @memberof google.protobuf.MethodOptions
             * @instance
             */MethodOptions.prototype.uninterpretedOption=$util.emptyArray;/**
             * MethodOptions .google.api.http.
             * @member {google.api.IHttpRule|null|undefined} .google.api.http
             * @memberof google.protobuf.MethodOptions
             * @instance
             */MethodOptions.prototype['.google.api.http']=null;/**
             * Creates a new MethodOptions instance using the specified properties.
             * @function create
             * @memberof google.protobuf.MethodOptions
             * @static
             * @param {google.protobuf.IMethodOptions=} [properties] Properties to set
             * @returns {google.protobuf.MethodOptions} MethodOptions instance
             */MethodOptions.create=function create(properties){return new MethodOptions(properties);};/**
             * Encodes the specified MethodOptions message. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.MethodOptions
             * @static
             * @param {google.protobuf.IMethodOptions} message MethodOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */MethodOptions.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))writer.uint32(/* id 33, wireType 0 =*/264).bool(message.deprecated);if(message.uninterpretedOption!=null&&message.uninterpretedOption.length)for(var i=0;i<message.uninterpretedOption.length;++i){$root.google.protobuf.UninterpretedOption.encode(message.uninterpretedOption[i],writer.uint32(/* id 999, wireType 2 =*/7994).fork()).ldelim();}if(message['.google.api.http']!=null&&message.hasOwnProperty('.google.api.http'))$root.google.api.HttpRule.encode(message['.google.api.http'],writer.uint32(/* id 72295728, wireType 2 =*/578365826).fork()).ldelim();return writer;};/**
             * Encodes the specified MethodOptions message, length delimited. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.MethodOptions
             * @static
             * @param {google.protobuf.IMethodOptions} message MethodOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */MethodOptions.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a MethodOptions message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.MethodOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.MethodOptions} MethodOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */MethodOptions.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.MethodOptions();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 33:message.deprecated=reader.bool();break;case 999:if(!(message.uninterpretedOption&&message.uninterpretedOption.length))message.uninterpretedOption=[];message.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(reader,reader.uint32()));break;case 72295728:message['.google.api.http']=$root.google.api.HttpRule.decode(reader,reader.uint32());break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a MethodOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.MethodOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.MethodOptions} MethodOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */MethodOptions.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a MethodOptions message.
             * @function verify
             * @memberof google.protobuf.MethodOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */MethodOptions.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))if(typeof message.deprecated!=='boolean')return'deprecated: boolean expected';if(message.uninterpretedOption!=null&&message.hasOwnProperty('uninterpretedOption')){if(!Array.isArray(message.uninterpretedOption))return'uninterpretedOption: array expected';for(var i=0;i<message.uninterpretedOption.length;++i){var error=$root.google.protobuf.UninterpretedOption.verify(message.uninterpretedOption[i]);if(error)return'uninterpretedOption.'+error;}}if(message['.google.api.http']!=null&&message.hasOwnProperty('.google.api.http')){var _error28=$root.google.api.HttpRule.verify(message['.google.api.http']);if(_error28)return'.google.api.http.'+_error28;}return null;};/**
             * Creates a MethodOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.MethodOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.MethodOptions} MethodOptions
             */MethodOptions.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.MethodOptions)return object;var message=new $root.google.protobuf.MethodOptions();if(object.deprecated!=null)message.deprecated=Boolean(object.deprecated);if(object.uninterpretedOption){if(!Array.isArray(object.uninterpretedOption))throw TypeError('.google.protobuf.MethodOptions.uninterpretedOption: array expected');message.uninterpretedOption=[];for(var i=0;i<object.uninterpretedOption.length;++i){if(typeof object.uninterpretedOption[i]!=='object')throw TypeError('.google.protobuf.MethodOptions.uninterpretedOption: object expected');message.uninterpretedOption[i]=$root.google.protobuf.UninterpretedOption.fromObject(object.uninterpretedOption[i]);}}if(object['.google.api.http']!=null){if(typeof object['.google.api.http']!=='object')throw TypeError('.google.protobuf.MethodOptions..google.api.http: object expected');message['.google.api.http']=$root.google.api.HttpRule.fromObject(object['.google.api.http']);}return message;};/**
             * Creates a plain object from a MethodOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.MethodOptions
             * @static
             * @param {google.protobuf.MethodOptions} message MethodOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */MethodOptions.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.uninterpretedOption=[];if(options.defaults){object.deprecated=false;object['.google.api.http']=null;}if(message.deprecated!=null&&message.hasOwnProperty('deprecated'))object.deprecated=message.deprecated;if(message.uninterpretedOption&&message.uninterpretedOption.length){object.uninterpretedOption=[];for(var j=0;j<message.uninterpretedOption.length;++j){object.uninterpretedOption[j]=$root.google.protobuf.UninterpretedOption.toObject(message.uninterpretedOption[j],options);}}if(message['.google.api.http']!=null&&message.hasOwnProperty('.google.api.http'))object['.google.api.http']=$root.google.api.HttpRule.toObject(message['.google.api.http'],options);return object;};/**
             * Converts this MethodOptions to JSON.
             * @function toJSON
             * @memberof google.protobuf.MethodOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */MethodOptions.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return MethodOptions;}();protobuf.UninterpretedOption=function(){/**
             * Properties of an UninterpretedOption.
             * @memberof google.protobuf
             * @interface IUninterpretedOption
             * @property {Array.<google.protobuf.UninterpretedOption.INamePart>|null} [name] UninterpretedOption name
             * @property {string|null} [identifierValue] UninterpretedOption identifierValue
             * @property {number|Long|null} [positiveIntValue] UninterpretedOption positiveIntValue
             * @property {number|Long|null} [negativeIntValue] UninterpretedOption negativeIntValue
             * @property {number|null} [doubleValue] UninterpretedOption doubleValue
             * @property {Uint8Array|null} [stringValue] UninterpretedOption stringValue
             * @property {string|null} [aggregateValue] UninterpretedOption aggregateValue
             *//**
             * Constructs a new UninterpretedOption.
             * @memberof google.protobuf
             * @classdesc Represents an UninterpretedOption.
             * @implements IUninterpretedOption
             * @constructor
             * @param {google.protobuf.IUninterpretedOption=} [properties] Properties to set
             */function UninterpretedOption(properties){this.name=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * UninterpretedOption name.
             * @member {Array.<google.protobuf.UninterpretedOption.INamePart>} name
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */UninterpretedOption.prototype.name=$util.emptyArray;/**
             * UninterpretedOption identifierValue.
             * @member {string} identifierValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */UninterpretedOption.prototype.identifierValue='';/**
             * UninterpretedOption positiveIntValue.
             * @member {number|Long} positiveIntValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */UninterpretedOption.prototype.positiveIntValue=$util.Long?$util.Long.fromBits(0,0,true):0;/**
             * UninterpretedOption negativeIntValue.
             * @member {number|Long} negativeIntValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */UninterpretedOption.prototype.negativeIntValue=$util.Long?$util.Long.fromBits(0,0,false):0;/**
             * UninterpretedOption doubleValue.
             * @member {number} doubleValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */UninterpretedOption.prototype.doubleValue=0;/**
             * UninterpretedOption stringValue.
             * @member {Uint8Array} stringValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */UninterpretedOption.prototype.stringValue=$util.newBuffer([]);/**
             * UninterpretedOption aggregateValue.
             * @member {string} aggregateValue
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             */UninterpretedOption.prototype.aggregateValue='';/**
             * Creates a new UninterpretedOption instance using the specified properties.
             * @function create
             * @memberof google.protobuf.UninterpretedOption
             * @static
             * @param {google.protobuf.IUninterpretedOption=} [properties] Properties to set
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption instance
             */UninterpretedOption.create=function create(properties){return new UninterpretedOption(properties);};/**
             * Encodes the specified UninterpretedOption message. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.UninterpretedOption
             * @static
             * @param {google.protobuf.IUninterpretedOption} message UninterpretedOption message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */UninterpretedOption.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.name!=null&&message.name.length)for(var i=0;i<message.name.length;++i){$root.google.protobuf.UninterpretedOption.NamePart.encode(message.name[i],writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();}if(message.identifierValue!=null&&message.hasOwnProperty('identifierValue'))writer.uint32(/* id 3, wireType 2 =*/26).string(message.identifierValue);if(message.positiveIntValue!=null&&message.hasOwnProperty('positiveIntValue'))writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.positiveIntValue);if(message.negativeIntValue!=null&&message.hasOwnProperty('negativeIntValue'))writer.uint32(/* id 5, wireType 0 =*/40).int64(message.negativeIntValue);if(message.doubleValue!=null&&message.hasOwnProperty('doubleValue'))writer.uint32(/* id 6, wireType 1 =*/49).double(message.doubleValue);if(message.stringValue!=null&&message.hasOwnProperty('stringValue'))writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.stringValue);if(message.aggregateValue!=null&&message.hasOwnProperty('aggregateValue'))writer.uint32(/* id 8, wireType 2 =*/66).string(message.aggregateValue);return writer;};/**
             * Encodes the specified UninterpretedOption message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.UninterpretedOption
             * @static
             * @param {google.protobuf.IUninterpretedOption} message UninterpretedOption message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */UninterpretedOption.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes an UninterpretedOption message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.UninterpretedOption
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */UninterpretedOption.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.UninterpretedOption();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 2:if(!(message.name&&message.name.length))message.name=[];message.name.push($root.google.protobuf.UninterpretedOption.NamePart.decode(reader,reader.uint32()));break;case 3:message.identifierValue=reader.string();break;case 4:message.positiveIntValue=reader.uint64();break;case 5:message.negativeIntValue=reader.int64();break;case 6:message.doubleValue=reader.double();break;case 7:message.stringValue=reader.bytes();break;case 8:message.aggregateValue=reader.string();break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes an UninterpretedOption message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.UninterpretedOption
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */UninterpretedOption.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies an UninterpretedOption message.
             * @function verify
             * @memberof google.protobuf.UninterpretedOption
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */UninterpretedOption.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.name!=null&&message.hasOwnProperty('name')){if(!Array.isArray(message.name))return'name: array expected';for(var i=0;i<message.name.length;++i){var error=$root.google.protobuf.UninterpretedOption.NamePart.verify(message.name[i]);if(error)return'name.'+error;}}if(message.identifierValue!=null&&message.hasOwnProperty('identifierValue'))if(!$util.isString(message.identifierValue))return'identifierValue: string expected';if(message.positiveIntValue!=null&&message.hasOwnProperty('positiveIntValue'))if(!$util.isInteger(message.positiveIntValue)&&!(message.positiveIntValue&&$util.isInteger(message.positiveIntValue.low)&&$util.isInteger(message.positiveIntValue.high)))return'positiveIntValue: integer|Long expected';if(message.negativeIntValue!=null&&message.hasOwnProperty('negativeIntValue'))if(!$util.isInteger(message.negativeIntValue)&&!(message.negativeIntValue&&$util.isInteger(message.negativeIntValue.low)&&$util.isInteger(message.negativeIntValue.high)))return'negativeIntValue: integer|Long expected';if(message.doubleValue!=null&&message.hasOwnProperty('doubleValue'))if(typeof message.doubleValue!=='number')return'doubleValue: number expected';if(message.stringValue!=null&&message.hasOwnProperty('stringValue'))if(!(message.stringValue&&typeof message.stringValue.length==='number'||$util.isString(message.stringValue)))return'stringValue: buffer expected';if(message.aggregateValue!=null&&message.hasOwnProperty('aggregateValue'))if(!$util.isString(message.aggregateValue))return'aggregateValue: string expected';return null;};/**
             * Creates an UninterpretedOption message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.UninterpretedOption
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.UninterpretedOption} UninterpretedOption
             */UninterpretedOption.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.UninterpretedOption)return object;var message=new $root.google.protobuf.UninterpretedOption();if(object.name){if(!Array.isArray(object.name))throw TypeError('.google.protobuf.UninterpretedOption.name: array expected');message.name=[];for(var i=0;i<object.name.length;++i){if(typeof object.name[i]!=='object')throw TypeError('.google.protobuf.UninterpretedOption.name: object expected');message.name[i]=$root.google.protobuf.UninterpretedOption.NamePart.fromObject(object.name[i]);}}if(object.identifierValue!=null)message.identifierValue=String(object.identifierValue);if(object.positiveIntValue!=null)if($util.Long)(message.positiveIntValue=$util.Long.fromValue(object.positiveIntValue)).unsigned=true;else if(typeof object.positiveIntValue==='string')message.positiveIntValue=parseInt(object.positiveIntValue,10);else if(typeof object.positiveIntValue==='number')message.positiveIntValue=object.positiveIntValue;else if(typeof object.positiveIntValue==='object')message.positiveIntValue=new $util.LongBits(object.positiveIntValue.low>>>0,object.positiveIntValue.high>>>0).toNumber(true);if(object.negativeIntValue!=null)if($util.Long)(message.negativeIntValue=$util.Long.fromValue(object.negativeIntValue)).unsigned=false;else if(typeof object.negativeIntValue==='string')message.negativeIntValue=parseInt(object.negativeIntValue,10);else if(typeof object.negativeIntValue==='number')message.negativeIntValue=object.negativeIntValue;else if(typeof object.negativeIntValue==='object')message.negativeIntValue=new $util.LongBits(object.negativeIntValue.low>>>0,object.negativeIntValue.high>>>0).toNumber();if(object.doubleValue!=null)message.doubleValue=Number(object.doubleValue);if(object.stringValue!=null)if(typeof object.stringValue==='string')$util.base64.decode(object.stringValue,message.stringValue=$util.newBuffer($util.base64.length(object.stringValue)),0);else if(object.stringValue.length)message.stringValue=object.stringValue;if(object.aggregateValue!=null)message.aggregateValue=String(object.aggregateValue);return message;};/**
             * Creates a plain object from an UninterpretedOption message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.UninterpretedOption
             * @static
             * @param {google.protobuf.UninterpretedOption} message UninterpretedOption
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */UninterpretedOption.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.name=[];if(options.defaults){object.identifierValue='';if($util.Long){var long=new $util.Long(0,0,true);object.positiveIntValue=options.longs===String?long.toString():options.longs===Number?long.toNumber():long;}else object.positiveIntValue=options.longs===String?'0':0;if($util.Long){var _long2=new $util.Long(0,0,false);object.negativeIntValue=options.longs===String?_long2.toString():options.longs===Number?_long2.toNumber():_long2;}else object.negativeIntValue=options.longs===String?'0':0;object.doubleValue=0;if(options.bytes===String)object.stringValue='';else{object.stringValue=[];if(options.bytes!==Array)object.stringValue=$util.newBuffer(object.stringValue);}object.aggregateValue='';}if(message.name&&message.name.length){object.name=[];for(var j=0;j<message.name.length;++j){object.name[j]=$root.google.protobuf.UninterpretedOption.NamePart.toObject(message.name[j],options);}}if(message.identifierValue!=null&&message.hasOwnProperty('identifierValue'))object.identifierValue=message.identifierValue;if(message.positiveIntValue!=null&&message.hasOwnProperty('positiveIntValue'))if(typeof message.positiveIntValue==='number')object.positiveIntValue=options.longs===String?String(message.positiveIntValue):message.positiveIntValue;else object.positiveIntValue=options.longs===String?$util.Long.prototype.toString.call(message.positiveIntValue):options.longs===Number?new $util.LongBits(message.positiveIntValue.low>>>0,message.positiveIntValue.high>>>0).toNumber(true):message.positiveIntValue;if(message.negativeIntValue!=null&&message.hasOwnProperty('negativeIntValue'))if(typeof message.negativeIntValue==='number')object.negativeIntValue=options.longs===String?String(message.negativeIntValue):message.negativeIntValue;else object.negativeIntValue=options.longs===String?$util.Long.prototype.toString.call(message.negativeIntValue):options.longs===Number?new $util.LongBits(message.negativeIntValue.low>>>0,message.negativeIntValue.high>>>0).toNumber():message.negativeIntValue;if(message.doubleValue!=null&&message.hasOwnProperty('doubleValue'))object.doubleValue=options.json&&!isFinite(message.doubleValue)?String(message.doubleValue):message.doubleValue;if(message.stringValue!=null&&message.hasOwnProperty('stringValue'))object.stringValue=options.bytes===String?$util.base64.encode(message.stringValue,0,message.stringValue.length):options.bytes===Array?Array.prototype.slice.call(message.stringValue):message.stringValue;if(message.aggregateValue!=null&&message.hasOwnProperty('aggregateValue'))object.aggregateValue=message.aggregateValue;return object;};/**
             * Converts this UninterpretedOption to JSON.
             * @function toJSON
             * @memberof google.protobuf.UninterpretedOption
             * @instance
             * @returns {Object.<string,*>} JSON object
             */UninterpretedOption.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};UninterpretedOption.NamePart=function(){/**
                 * Properties of a NamePart.
                 * @memberof google.protobuf.UninterpretedOption
                 * @interface INamePart
                 * @property {string} namePart NamePart namePart
                 * @property {boolean} isExtension NamePart isExtension
                 *//**
                 * Constructs a new NamePart.
                 * @memberof google.protobuf.UninterpretedOption
                 * @classdesc Represents a NamePart.
                 * @implements INamePart
                 * @constructor
                 * @param {google.protobuf.UninterpretedOption.INamePart=} [properties] Properties to set
                 */function NamePart(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
                 * NamePart namePart.
                 * @member {string} namePart
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @instance
                 */NamePart.prototype.namePart='';/**
                 * NamePart isExtension.
                 * @member {boolean} isExtension
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @instance
                 */NamePart.prototype.isExtension=false;/**
                 * Creates a new NamePart instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @static
                 * @param {google.protobuf.UninterpretedOption.INamePart=} [properties] Properties to set
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart instance
                 */NamePart.create=function create(properties){return new NamePart(properties);};/**
                 * Encodes the specified NamePart message. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @static
                 * @param {google.protobuf.UninterpretedOption.INamePart} message NamePart message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */NamePart.encode=function encode(message,writer){if(!writer)writer=$Writer.create();writer.uint32(/* id 1, wireType 2 =*/10).string(message.namePart);writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isExtension);return writer;};/**
                 * Encodes the specified NamePart message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @static
                 * @param {google.protobuf.UninterpretedOption.INamePart} message NamePart message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */NamePart.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
                 * Decodes a NamePart message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */NamePart.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.UninterpretedOption.NamePart();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.namePart=reader.string();break;case 2:message.isExtension=reader.bool();break;default:reader.skipType(tag&7);break;}}if(!message.hasOwnProperty('namePart'))throw $util.ProtocolError("missing required 'namePart'",{instance:message});if(!message.hasOwnProperty('isExtension'))throw $util.ProtocolError("missing required 'isExtension'",{instance:message});return message;};/**
                 * Decodes a NamePart message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */NamePart.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
                 * Verifies a NamePart message.
                 * @function verify
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */NamePart.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(!$util.isString(message.namePart))return'namePart: string expected';if(typeof message.isExtension!=='boolean')return'isExtension: boolean expected';return null;};/**
                 * Creates a NamePart message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.UninterpretedOption.NamePart} NamePart
                 */NamePart.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.UninterpretedOption.NamePart)return object;var message=new $root.google.protobuf.UninterpretedOption.NamePart();if(object.namePart!=null)message.namePart=String(object.namePart);if(object.isExtension!=null)message.isExtension=Boolean(object.isExtension);return message;};/**
                 * Creates a plain object from a NamePart message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @static
                 * @param {google.protobuf.UninterpretedOption.NamePart} message NamePart
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */NamePart.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults){object.namePart='';object.isExtension=false;}if(message.namePart!=null&&message.hasOwnProperty('namePart'))object.namePart=message.namePart;if(message.isExtension!=null&&message.hasOwnProperty('isExtension'))object.isExtension=message.isExtension;return object;};/**
                 * Converts this NamePart to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.UninterpretedOption.NamePart
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */NamePart.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return NamePart;}();return UninterpretedOption;}();protobuf.SourceCodeInfo=function(){/**
             * Properties of a SourceCodeInfo.
             * @memberof google.protobuf
             * @interface ISourceCodeInfo
             * @property {Array.<google.protobuf.SourceCodeInfo.ILocation>|null} [location] SourceCodeInfo location
             *//**
             * Constructs a new SourceCodeInfo.
             * @memberof google.protobuf
             * @classdesc Represents a SourceCodeInfo.
             * @implements ISourceCodeInfo
             * @constructor
             * @param {google.protobuf.ISourceCodeInfo=} [properties] Properties to set
             */function SourceCodeInfo(properties){this.location=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * SourceCodeInfo location.
             * @member {Array.<google.protobuf.SourceCodeInfo.ILocation>} location
             * @memberof google.protobuf.SourceCodeInfo
             * @instance
             */SourceCodeInfo.prototype.location=$util.emptyArray;/**
             * Creates a new SourceCodeInfo instance using the specified properties.
             * @function create
             * @memberof google.protobuf.SourceCodeInfo
             * @static
             * @param {google.protobuf.ISourceCodeInfo=} [properties] Properties to set
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo instance
             */SourceCodeInfo.create=function create(properties){return new SourceCodeInfo(properties);};/**
             * Encodes the specified SourceCodeInfo message. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.SourceCodeInfo
             * @static
             * @param {google.protobuf.ISourceCodeInfo} message SourceCodeInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */SourceCodeInfo.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.location!=null&&message.location.length)for(var i=0;i<message.location.length;++i){$root.google.protobuf.SourceCodeInfo.Location.encode(message.location[i],writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();}return writer;};/**
             * Encodes the specified SourceCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.SourceCodeInfo
             * @static
             * @param {google.protobuf.ISourceCodeInfo} message SourceCodeInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */SourceCodeInfo.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a SourceCodeInfo message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.SourceCodeInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */SourceCodeInfo.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.SourceCodeInfo();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:if(!(message.location&&message.location.length))message.location=[];message.location.push($root.google.protobuf.SourceCodeInfo.Location.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a SourceCodeInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.SourceCodeInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */SourceCodeInfo.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a SourceCodeInfo message.
             * @function verify
             * @memberof google.protobuf.SourceCodeInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */SourceCodeInfo.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.location!=null&&message.hasOwnProperty('location')){if(!Array.isArray(message.location))return'location: array expected';for(var i=0;i<message.location.length;++i){var error=$root.google.protobuf.SourceCodeInfo.Location.verify(message.location[i]);if(error)return'location.'+error;}}return null;};/**
             * Creates a SourceCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.SourceCodeInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.SourceCodeInfo} SourceCodeInfo
             */SourceCodeInfo.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.SourceCodeInfo)return object;var message=new $root.google.protobuf.SourceCodeInfo();if(object.location){if(!Array.isArray(object.location))throw TypeError('.google.protobuf.SourceCodeInfo.location: array expected');message.location=[];for(var i=0;i<object.location.length;++i){if(typeof object.location[i]!=='object')throw TypeError('.google.protobuf.SourceCodeInfo.location: object expected');message.location[i]=$root.google.protobuf.SourceCodeInfo.Location.fromObject(object.location[i]);}}return message;};/**
             * Creates a plain object from a SourceCodeInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.SourceCodeInfo
             * @static
             * @param {google.protobuf.SourceCodeInfo} message SourceCodeInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */SourceCodeInfo.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.location=[];if(message.location&&message.location.length){object.location=[];for(var j=0;j<message.location.length;++j){object.location[j]=$root.google.protobuf.SourceCodeInfo.Location.toObject(message.location[j],options);}}return object;};/**
             * Converts this SourceCodeInfo to JSON.
             * @function toJSON
             * @memberof google.protobuf.SourceCodeInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */SourceCodeInfo.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};SourceCodeInfo.Location=function(){/**
                 * Properties of a Location.
                 * @memberof google.protobuf.SourceCodeInfo
                 * @interface ILocation
                 * @property {Array.<number>|null} [path] Location path
                 * @property {Array.<number>|null} [span] Location span
                 * @property {string|null} [leadingComments] Location leadingComments
                 * @property {string|null} [trailingComments] Location trailingComments
                 * @property {Array.<string>|null} [leadingDetachedComments] Location leadingDetachedComments
                 *//**
                 * Constructs a new Location.
                 * @memberof google.protobuf.SourceCodeInfo
                 * @classdesc Represents a Location.
                 * @implements ILocation
                 * @constructor
                 * @param {google.protobuf.SourceCodeInfo.ILocation=} [properties] Properties to set
                 */function Location(properties){this.path=[];this.span=[];this.leadingDetachedComments=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
                 * Location path.
                 * @member {Array.<number>} path
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */Location.prototype.path=$util.emptyArray;/**
                 * Location span.
                 * @member {Array.<number>} span
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */Location.prototype.span=$util.emptyArray;/**
                 * Location leadingComments.
                 * @member {string} leadingComments
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */Location.prototype.leadingComments='';/**
                 * Location trailingComments.
                 * @member {string} trailingComments
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */Location.prototype.trailingComments='';/**
                 * Location leadingDetachedComments.
                 * @member {Array.<string>} leadingDetachedComments
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 */Location.prototype.leadingDetachedComments=$util.emptyArray;/**
                 * Creates a new Location instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @static
                 * @param {google.protobuf.SourceCodeInfo.ILocation=} [properties] Properties to set
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location instance
                 */Location.create=function create(properties){return new Location(properties);};/**
                 * Encodes the specified Location message. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @static
                 * @param {google.protobuf.SourceCodeInfo.ILocation} message Location message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */Location.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.path!=null&&message.path.length){writer.uint32(/* id 1, wireType 2 =*/10).fork();for(var i=0;i<message.path.length;++i){writer.int32(message.path[i]);}writer.ldelim();}if(message.span!=null&&message.span.length){writer.uint32(/* id 2, wireType 2 =*/18).fork();for(var _i61=0;_i61<message.span.length;++_i61){writer.int32(message.span[_i61]);}writer.ldelim();}if(message.leadingComments!=null&&message.hasOwnProperty('leadingComments'))writer.uint32(/* id 3, wireType 2 =*/26).string(message.leadingComments);if(message.trailingComments!=null&&message.hasOwnProperty('trailingComments'))writer.uint32(/* id 4, wireType 2 =*/34).string(message.trailingComments);if(message.leadingDetachedComments!=null&&message.leadingDetachedComments.length)for(var _i62=0;_i62<message.leadingDetachedComments.length;++_i62){writer.uint32(/* id 6, wireType 2 =*/50).string(message.leadingDetachedComments[_i62]);}return writer;};/**
                 * Encodes the specified Location message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @static
                 * @param {google.protobuf.SourceCodeInfo.ILocation} message Location message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */Location.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
                 * Decodes a Location message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */Location.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.SourceCodeInfo.Location();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:if(!(message.path&&message.path.length))message.path=[];if((tag&7)===2){var end2=reader.uint32()+reader.pos;while(reader.pos<end2){message.path.push(reader.int32());}}else message.path.push(reader.int32());break;case 2:if(!(message.span&&message.span.length))message.span=[];if((tag&7)===2){var _end2=reader.uint32()+reader.pos;while(reader.pos<_end2){message.span.push(reader.int32());}}else message.span.push(reader.int32());break;case 3:message.leadingComments=reader.string();break;case 4:message.trailingComments=reader.string();break;case 6:if(!(message.leadingDetachedComments&&message.leadingDetachedComments.length))message.leadingDetachedComments=[];message.leadingDetachedComments.push(reader.string());break;default:reader.skipType(tag&7);break;}}return message;};/**
                 * Decodes a Location message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */Location.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
                 * Verifies a Location message.
                 * @function verify
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */Location.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.path!=null&&message.hasOwnProperty('path')){if(!Array.isArray(message.path))return'path: array expected';for(var i=0;i<message.path.length;++i){if(!$util.isInteger(message.path[i]))return'path: integer[] expected';}}if(message.span!=null&&message.hasOwnProperty('span')){if(!Array.isArray(message.span))return'span: array expected';for(var _i63=0;_i63<message.span.length;++_i63){if(!$util.isInteger(message.span[_i63]))return'span: integer[] expected';}}if(message.leadingComments!=null&&message.hasOwnProperty('leadingComments'))if(!$util.isString(message.leadingComments))return'leadingComments: string expected';if(message.trailingComments!=null&&message.hasOwnProperty('trailingComments'))if(!$util.isString(message.trailingComments))return'trailingComments: string expected';if(message.leadingDetachedComments!=null&&message.hasOwnProperty('leadingDetachedComments')){if(!Array.isArray(message.leadingDetachedComments))return'leadingDetachedComments: array expected';for(var _i64=0;_i64<message.leadingDetachedComments.length;++_i64){if(!$util.isString(message.leadingDetachedComments[_i64]))return'leadingDetachedComments: string[] expected';}}return null;};/**
                 * Creates a Location message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.SourceCodeInfo.Location} Location
                 */Location.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.SourceCodeInfo.Location)return object;var message=new $root.google.protobuf.SourceCodeInfo.Location();if(object.path){if(!Array.isArray(object.path))throw TypeError('.google.protobuf.SourceCodeInfo.Location.path: array expected');message.path=[];for(var i=0;i<object.path.length;++i){message.path[i]=object.path[i]|0;}}if(object.span){if(!Array.isArray(object.span))throw TypeError('.google.protobuf.SourceCodeInfo.Location.span: array expected');message.span=[];for(var _i65=0;_i65<object.span.length;++_i65){message.span[_i65]=object.span[_i65]|0;}}if(object.leadingComments!=null)message.leadingComments=String(object.leadingComments);if(object.trailingComments!=null)message.trailingComments=String(object.trailingComments);if(object.leadingDetachedComments){if(!Array.isArray(object.leadingDetachedComments))throw TypeError('.google.protobuf.SourceCodeInfo.Location.leadingDetachedComments: array expected');message.leadingDetachedComments=[];for(var _i66=0;_i66<object.leadingDetachedComments.length;++_i66){message.leadingDetachedComments[_i66]=String(object.leadingDetachedComments[_i66]);}}return message;};/**
                 * Creates a plain object from a Location message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @static
                 * @param {google.protobuf.SourceCodeInfo.Location} message Location
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */Location.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults){object.path=[];object.span=[];object.leadingDetachedComments=[];}if(options.defaults){object.leadingComments='';object.trailingComments='';}if(message.path&&message.path.length){object.path=[];for(var j=0;j<message.path.length;++j){object.path[j]=message.path[j];}}if(message.span&&message.span.length){object.span=[];for(var _j21=0;_j21<message.span.length;++_j21){object.span[_j21]=message.span[_j21];}}if(message.leadingComments!=null&&message.hasOwnProperty('leadingComments'))object.leadingComments=message.leadingComments;if(message.trailingComments!=null&&message.hasOwnProperty('trailingComments'))object.trailingComments=message.trailingComments;if(message.leadingDetachedComments&&message.leadingDetachedComments.length){object.leadingDetachedComments=[];for(var _j22=0;_j22<message.leadingDetachedComments.length;++_j22){object.leadingDetachedComments[_j22]=message.leadingDetachedComments[_j22];}}return object;};/**
                 * Converts this Location to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.SourceCodeInfo.Location
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */Location.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return Location;}();return SourceCodeInfo;}();protobuf.GeneratedCodeInfo=function(){/**
             * Properties of a GeneratedCodeInfo.
             * @memberof google.protobuf
             * @interface IGeneratedCodeInfo
             * @property {Array.<google.protobuf.GeneratedCodeInfo.IAnnotation>|null} [annotation] GeneratedCodeInfo annotation
             *//**
             * Constructs a new GeneratedCodeInfo.
             * @memberof google.protobuf
             * @classdesc Represents a GeneratedCodeInfo.
             * @implements IGeneratedCodeInfo
             * @constructor
             * @param {google.protobuf.IGeneratedCodeInfo=} [properties] Properties to set
             */function GeneratedCodeInfo(properties){this.annotation=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * GeneratedCodeInfo annotation.
             * @member {Array.<google.protobuf.GeneratedCodeInfo.IAnnotation>} annotation
             * @memberof google.protobuf.GeneratedCodeInfo
             * @instance
             */GeneratedCodeInfo.prototype.annotation=$util.emptyArray;/**
             * Creates a new GeneratedCodeInfo instance using the specified properties.
             * @function create
             * @memberof google.protobuf.GeneratedCodeInfo
             * @static
             * @param {google.protobuf.IGeneratedCodeInfo=} [properties] Properties to set
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo instance
             */GeneratedCodeInfo.create=function create(properties){return new GeneratedCodeInfo(properties);};/**
             * Encodes the specified GeneratedCodeInfo message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.GeneratedCodeInfo
             * @static
             * @param {google.protobuf.IGeneratedCodeInfo} message GeneratedCodeInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */GeneratedCodeInfo.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.annotation!=null&&message.annotation.length)for(var i=0;i<message.annotation.length;++i){$root.google.protobuf.GeneratedCodeInfo.Annotation.encode(message.annotation[i],writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();}return writer;};/**
             * Encodes the specified GeneratedCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.GeneratedCodeInfo
             * @static
             * @param {google.protobuf.IGeneratedCodeInfo} message GeneratedCodeInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */GeneratedCodeInfo.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.GeneratedCodeInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */GeneratedCodeInfo.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.GeneratedCodeInfo();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:if(!(message.annotation&&message.annotation.length))message.annotation=[];message.annotation.push($root.google.protobuf.GeneratedCodeInfo.Annotation.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.GeneratedCodeInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */GeneratedCodeInfo.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a GeneratedCodeInfo message.
             * @function verify
             * @memberof google.protobuf.GeneratedCodeInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */GeneratedCodeInfo.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.annotation!=null&&message.hasOwnProperty('annotation')){if(!Array.isArray(message.annotation))return'annotation: array expected';for(var i=0;i<message.annotation.length;++i){var error=$root.google.protobuf.GeneratedCodeInfo.Annotation.verify(message.annotation[i]);if(error)return'annotation.'+error;}}return null;};/**
             * Creates a GeneratedCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.GeneratedCodeInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.GeneratedCodeInfo} GeneratedCodeInfo
             */GeneratedCodeInfo.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.GeneratedCodeInfo)return object;var message=new $root.google.protobuf.GeneratedCodeInfo();if(object.annotation){if(!Array.isArray(object.annotation))throw TypeError('.google.protobuf.GeneratedCodeInfo.annotation: array expected');message.annotation=[];for(var i=0;i<object.annotation.length;++i){if(typeof object.annotation[i]!=='object')throw TypeError('.google.protobuf.GeneratedCodeInfo.annotation: object expected');message.annotation[i]=$root.google.protobuf.GeneratedCodeInfo.Annotation.fromObject(object.annotation[i]);}}return message;};/**
             * Creates a plain object from a GeneratedCodeInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.GeneratedCodeInfo
             * @static
             * @param {google.protobuf.GeneratedCodeInfo} message GeneratedCodeInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */GeneratedCodeInfo.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.annotation=[];if(message.annotation&&message.annotation.length){object.annotation=[];for(var j=0;j<message.annotation.length;++j){object.annotation[j]=$root.google.protobuf.GeneratedCodeInfo.Annotation.toObject(message.annotation[j],options);}}return object;};/**
             * Converts this GeneratedCodeInfo to JSON.
             * @function toJSON
             * @memberof google.protobuf.GeneratedCodeInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */GeneratedCodeInfo.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};GeneratedCodeInfo.Annotation=function(){/**
                 * Properties of an Annotation.
                 * @memberof google.protobuf.GeneratedCodeInfo
                 * @interface IAnnotation
                 * @property {Array.<number>|null} [path] Annotation path
                 * @property {string|null} [sourceFile] Annotation sourceFile
                 * @property {number|null} [begin] Annotation begin
                 * @property {number|null} [end] Annotation end
                 *//**
                 * Constructs a new Annotation.
                 * @memberof google.protobuf.GeneratedCodeInfo
                 * @classdesc Represents an Annotation.
                 * @implements IAnnotation
                 * @constructor
                 * @param {google.protobuf.GeneratedCodeInfo.IAnnotation=} [properties] Properties to set
                 */function Annotation(properties){this.path=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
                 * Annotation path.
                 * @member {Array.<number>} path
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */Annotation.prototype.path=$util.emptyArray;/**
                 * Annotation sourceFile.
                 * @member {string} sourceFile
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */Annotation.prototype.sourceFile='';/**
                 * Annotation begin.
                 * @member {number} begin
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */Annotation.prototype.begin=0;/**
                 * Annotation end.
                 * @member {number} end
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 */Annotation.prototype.end=0;/**
                 * Creates a new Annotation instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @static
                 * @param {google.protobuf.GeneratedCodeInfo.IAnnotation=} [properties] Properties to set
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation instance
                 */Annotation.create=function create(properties){return new Annotation(properties);};/**
                 * Encodes the specified Annotation message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @static
                 * @param {google.protobuf.GeneratedCodeInfo.IAnnotation} message Annotation message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */Annotation.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.path!=null&&message.path.length){writer.uint32(/* id 1, wireType 2 =*/10).fork();for(var i=0;i<message.path.length;++i){writer.int32(message.path[i]);}writer.ldelim();}if(message.sourceFile!=null&&message.hasOwnProperty('sourceFile'))writer.uint32(/* id 2, wireType 2 =*/18).string(message.sourceFile);if(message.begin!=null&&message.hasOwnProperty('begin'))writer.uint32(/* id 3, wireType 0 =*/24).int32(message.begin);if(message.end!=null&&message.hasOwnProperty('end'))writer.uint32(/* id 4, wireType 0 =*/32).int32(message.end);return writer;};/**
                 * Encodes the specified Annotation message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @static
                 * @param {google.protobuf.GeneratedCodeInfo.IAnnotation} message Annotation message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */Annotation.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
                 * Decodes an Annotation message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */Annotation.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.protobuf.GeneratedCodeInfo.Annotation();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:if(!(message.path&&message.path.length))message.path=[];if((tag&7)===2){var end2=reader.uint32()+reader.pos;while(reader.pos<end2){message.path.push(reader.int32());}}else message.path.push(reader.int32());break;case 2:message.sourceFile=reader.string();break;case 3:message.begin=reader.int32();break;case 4:message.end=reader.int32();break;default:reader.skipType(tag&7);break;}}return message;};/**
                 * Decodes an Annotation message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */Annotation.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
                 * Verifies an Annotation message.
                 * @function verify
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */Annotation.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.path!=null&&message.hasOwnProperty('path')){if(!Array.isArray(message.path))return'path: array expected';for(var i=0;i<message.path.length;++i){if(!$util.isInteger(message.path[i]))return'path: integer[] expected';}}if(message.sourceFile!=null&&message.hasOwnProperty('sourceFile'))if(!$util.isString(message.sourceFile))return'sourceFile: string expected';if(message.begin!=null&&message.hasOwnProperty('begin'))if(!$util.isInteger(message.begin))return'begin: integer expected';if(message.end!=null&&message.hasOwnProperty('end'))if(!$util.isInteger(message.end))return'end: integer expected';return null;};/**
                 * Creates an Annotation message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.GeneratedCodeInfo.Annotation} Annotation
                 */Annotation.fromObject=function fromObject(object){if(object instanceof $root.google.protobuf.GeneratedCodeInfo.Annotation)return object;var message=new $root.google.protobuf.GeneratedCodeInfo.Annotation();if(object.path){if(!Array.isArray(object.path))throw TypeError('.google.protobuf.GeneratedCodeInfo.Annotation.path: array expected');message.path=[];for(var i=0;i<object.path.length;++i){message.path[i]=object.path[i]|0;}}if(object.sourceFile!=null)message.sourceFile=String(object.sourceFile);if(object.begin!=null)message.begin=object.begin|0;if(object.end!=null)message.end=object.end|0;return message;};/**
                 * Creates a plain object from an Annotation message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @static
                 * @param {google.protobuf.GeneratedCodeInfo.Annotation} message Annotation
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */Annotation.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.path=[];if(options.defaults){object.sourceFile='';object.begin=0;object.end=0;}if(message.path&&message.path.length){object.path=[];for(var j=0;j<message.path.length;++j){object.path[j]=message.path[j];}}if(message.sourceFile!=null&&message.hasOwnProperty('sourceFile'))object.sourceFile=message.sourceFile;if(message.begin!=null&&message.hasOwnProperty('begin'))object.begin=message.begin;if(message.end!=null&&message.hasOwnProperty('end'))object.end=message.end;return object;};/**
                 * Converts this Annotation to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.GeneratedCodeInfo.Annotation
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */Annotation.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return Annotation;}();return GeneratedCodeInfo;}();return protobuf;}();google.api=function(){/**
         * Namespace api.
         * @memberof google
         * @namespace
         */var api={};api.Http=function(){/**
             * Properties of a Http.
             * @memberof google.api
             * @interface IHttp
             * @property {Array.<google.api.IHttpRule>|null} [rules] Http rules
             *//**
             * Constructs a new Http.
             * @memberof google.api
             * @classdesc Represents a Http.
             * @implements IHttp
             * @constructor
             * @param {google.api.IHttp=} [properties] Properties to set
             */function Http(properties){this.rules=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * Http rules.
             * @member {Array.<google.api.IHttpRule>} rules
             * @memberof google.api.Http
             * @instance
             */Http.prototype.rules=$util.emptyArray;/**
             * Creates a new Http instance using the specified properties.
             * @function create
             * @memberof google.api.Http
             * @static
             * @param {google.api.IHttp=} [properties] Properties to set
             * @returns {google.api.Http} Http instance
             */Http.create=function create(properties){return new Http(properties);};/**
             * Encodes the specified Http message. Does not implicitly {@link google.api.Http.verify|verify} messages.
             * @function encode
             * @memberof google.api.Http
             * @static
             * @param {google.api.IHttp} message Http message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Http.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.rules!=null&&message.rules.length)for(var i=0;i<message.rules.length;++i){$root.google.api.HttpRule.encode(message.rules[i],writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();}return writer;};/**
             * Encodes the specified Http message, length delimited. Does not implicitly {@link google.api.Http.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.api.Http
             * @static
             * @param {google.api.IHttp} message Http message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */Http.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a Http message from the specified reader or buffer.
             * @function decode
             * @memberof google.api.Http
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.api.Http} Http
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Http.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.api.Http();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:if(!(message.rules&&message.rules.length))message.rules=[];message.rules.push($root.google.api.HttpRule.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a Http message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.api.Http
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.api.Http} Http
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */Http.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a Http message.
             * @function verify
             * @memberof google.api.Http
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */Http.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.rules!=null&&message.hasOwnProperty('rules')){if(!Array.isArray(message.rules))return'rules: array expected';for(var i=0;i<message.rules.length;++i){var error=$root.google.api.HttpRule.verify(message.rules[i]);if(error)return'rules.'+error;}}return null;};/**
             * Creates a Http message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.api.Http
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.api.Http} Http
             */Http.fromObject=function fromObject(object){if(object instanceof $root.google.api.Http)return object;var message=new $root.google.api.Http();if(object.rules){if(!Array.isArray(object.rules))throw TypeError('.google.api.Http.rules: array expected');message.rules=[];for(var i=0;i<object.rules.length;++i){if(typeof object.rules[i]!=='object')throw TypeError('.google.api.Http.rules: object expected');message.rules[i]=$root.google.api.HttpRule.fromObject(object.rules[i]);}}return message;};/**
             * Creates a plain object from a Http message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.api.Http
             * @static
             * @param {google.api.Http} message Http
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */Http.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.rules=[];if(message.rules&&message.rules.length){object.rules=[];for(var j=0;j<message.rules.length;++j){object.rules[j]=$root.google.api.HttpRule.toObject(message.rules[j],options);}}return object;};/**
             * Converts this Http to JSON.
             * @function toJSON
             * @memberof google.api.Http
             * @instance
             * @returns {Object.<string,*>} JSON object
             */Http.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return Http;}();api.HttpRule=function(){/**
             * Properties of a HttpRule.
             * @memberof google.api
             * @interface IHttpRule
             * @property {string|null} [get] HttpRule get
             * @property {string|null} [put] HttpRule put
             * @property {string|null} [post] HttpRule post
             * @property {string|null} ["delete"] HttpRule delete
             * @property {string|null} [patch] HttpRule patch
             * @property {google.api.ICustomHttpPattern|null} [custom] HttpRule custom
             * @property {string|null} [selector] HttpRule selector
             * @property {string|null} [body] HttpRule body
             * @property {Array.<google.api.IHttpRule>|null} [additionalBindings] HttpRule additionalBindings
             *//**
             * Constructs a new HttpRule.
             * @memberof google.api
             * @classdesc Represents a HttpRule.
             * @implements IHttpRule
             * @constructor
             * @param {google.api.IHttpRule=} [properties] Properties to set
             */function HttpRule(properties){this.additionalBindings=[];if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * HttpRule get.
             * @member {string} get
             * @memberof google.api.HttpRule
             * @instance
             */HttpRule.prototype.get='';/**
             * HttpRule put.
             * @member {string} put
             * @memberof google.api.HttpRule
             * @instance
             */HttpRule.prototype.put='';/**
             * HttpRule post.
             * @member {string} post
             * @memberof google.api.HttpRule
             * @instance
             */HttpRule.prototype.post='';/**
             * HttpRule delete.
             * @member {string} delete
             * @memberof google.api.HttpRule
             * @instance
             */HttpRule.prototype['delete']='';/**
             * HttpRule patch.
             * @member {string} patch
             * @memberof google.api.HttpRule
             * @instance
             */HttpRule.prototype.patch='';/**
             * HttpRule custom.
             * @member {google.api.ICustomHttpPattern|null|undefined} custom
             * @memberof google.api.HttpRule
             * @instance
             */HttpRule.prototype.custom=null;/**
             * HttpRule selector.
             * @member {string} selector
             * @memberof google.api.HttpRule
             * @instance
             */HttpRule.prototype.selector='';/**
             * HttpRule body.
             * @member {string} body
             * @memberof google.api.HttpRule
             * @instance
             */HttpRule.prototype.body='';/**
             * HttpRule additionalBindings.
             * @member {Array.<google.api.IHttpRule>} additionalBindings
             * @memberof google.api.HttpRule
             * @instance
             */HttpRule.prototype.additionalBindings=$util.emptyArray;// OneOf field names bound to virtual getters and setters
var $oneOfFields=void 0;/**
             * HttpRule pattern.
             * @member {"get"|"put"|"post"|"delete"|"patch"|"custom"|undefined} pattern
             * @memberof google.api.HttpRule
             * @instance
             */Object.defineProperty(HttpRule.prototype,'pattern',{get:$util.oneOfGetter($oneOfFields=['get','put','post','delete','patch','custom']),set:$util.oneOfSetter($oneOfFields)});/**
             * Creates a new HttpRule instance using the specified properties.
             * @function create
             * @memberof google.api.HttpRule
             * @static
             * @param {google.api.IHttpRule=} [properties] Properties to set
             * @returns {google.api.HttpRule} HttpRule instance
             */HttpRule.create=function create(properties){return new HttpRule(properties);};/**
             * Encodes the specified HttpRule message. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
             * @function encode
             * @memberof google.api.HttpRule
             * @static
             * @param {google.api.IHttpRule} message HttpRule message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */HttpRule.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.selector!=null&&message.hasOwnProperty('selector'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.selector);if(message.get!=null&&message.hasOwnProperty('get'))writer.uint32(/* id 2, wireType 2 =*/18).string(message.get);if(message.put!=null&&message.hasOwnProperty('put'))writer.uint32(/* id 3, wireType 2 =*/26).string(message.put);if(message.post!=null&&message.hasOwnProperty('post'))writer.uint32(/* id 4, wireType 2 =*/34).string(message.post);if(message['delete']!=null&&message.hasOwnProperty('delete'))writer.uint32(/* id 5, wireType 2 =*/42).string(message['delete']);if(message.patch!=null&&message.hasOwnProperty('patch'))writer.uint32(/* id 6, wireType 2 =*/50).string(message.patch);if(message.body!=null&&message.hasOwnProperty('body'))writer.uint32(/* id 7, wireType 2 =*/58).string(message.body);if(message.custom!=null&&message.hasOwnProperty('custom'))$root.google.api.CustomHttpPattern.encode(message.custom,writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();if(message.additionalBindings!=null&&message.additionalBindings.length)for(var i=0;i<message.additionalBindings.length;++i){$root.google.api.HttpRule.encode(message.additionalBindings[i],writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();}return writer;};/**
             * Encodes the specified HttpRule message, length delimited. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.api.HttpRule
             * @static
             * @param {google.api.IHttpRule} message HttpRule message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */HttpRule.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a HttpRule message from the specified reader or buffer.
             * @function decode
             * @memberof google.api.HttpRule
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.api.HttpRule} HttpRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */HttpRule.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.api.HttpRule();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 2:message.get=reader.string();break;case 3:message.put=reader.string();break;case 4:message.post=reader.string();break;case 5:message['delete']=reader.string();break;case 6:message.patch=reader.string();break;case 8:message.custom=$root.google.api.CustomHttpPattern.decode(reader,reader.uint32());break;case 1:message.selector=reader.string();break;case 7:message.body=reader.string();break;case 11:if(!(message.additionalBindings&&message.additionalBindings.length))message.additionalBindings=[];message.additionalBindings.push($root.google.api.HttpRule.decode(reader,reader.uint32()));break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a HttpRule message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.api.HttpRule
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.api.HttpRule} HttpRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */HttpRule.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a HttpRule message.
             * @function verify
             * @memberof google.api.HttpRule
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */HttpRule.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';var properties={};if(message.get!=null&&message.hasOwnProperty('get')){properties.pattern=1;if(!$util.isString(message.get))return'get: string expected';}if(message.put!=null&&message.hasOwnProperty('put')){if(properties.pattern===1)return'pattern: multiple values';properties.pattern=1;if(!$util.isString(message.put))return'put: string expected';}if(message.post!=null&&message.hasOwnProperty('post')){if(properties.pattern===1)return'pattern: multiple values';properties.pattern=1;if(!$util.isString(message.post))return'post: string expected';}if(message['delete']!=null&&message.hasOwnProperty('delete')){if(properties.pattern===1)return'pattern: multiple values';properties.pattern=1;if(!$util.isString(message['delete']))return'delete: string expected';}if(message.patch!=null&&message.hasOwnProperty('patch')){if(properties.pattern===1)return'pattern: multiple values';properties.pattern=1;if(!$util.isString(message.patch))return'patch: string expected';}if(message.custom!=null&&message.hasOwnProperty('custom')){if(properties.pattern===1)return'pattern: multiple values';properties.pattern=1;{var error=$root.google.api.CustomHttpPattern.verify(message.custom);if(error)return'custom.'+error;}}if(message.selector!=null&&message.hasOwnProperty('selector'))if(!$util.isString(message.selector))return'selector: string expected';if(message.body!=null&&message.hasOwnProperty('body'))if(!$util.isString(message.body))return'body: string expected';if(message.additionalBindings!=null&&message.hasOwnProperty('additionalBindings')){if(!Array.isArray(message.additionalBindings))return'additionalBindings: array expected';for(var i=0;i<message.additionalBindings.length;++i){var _error29=$root.google.api.HttpRule.verify(message.additionalBindings[i]);if(_error29)return'additionalBindings.'+_error29;}}return null;};/**
             * Creates a HttpRule message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.api.HttpRule
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.api.HttpRule} HttpRule
             */HttpRule.fromObject=function fromObject(object){if(object instanceof $root.google.api.HttpRule)return object;var message=new $root.google.api.HttpRule();if(object.get!=null)message.get=String(object.get);if(object.put!=null)message.put=String(object.put);if(object.post!=null)message.post=String(object.post);if(object['delete']!=null)message['delete']=String(object['delete']);if(object.patch!=null)message.patch=String(object.patch);if(object.custom!=null){if(typeof object.custom!=='object')throw TypeError('.google.api.HttpRule.custom: object expected');message.custom=$root.google.api.CustomHttpPattern.fromObject(object.custom);}if(object.selector!=null)message.selector=String(object.selector);if(object.body!=null)message.body=String(object.body);if(object.additionalBindings){if(!Array.isArray(object.additionalBindings))throw TypeError('.google.api.HttpRule.additionalBindings: array expected');message.additionalBindings=[];for(var i=0;i<object.additionalBindings.length;++i){if(typeof object.additionalBindings[i]!=='object')throw TypeError('.google.api.HttpRule.additionalBindings: object expected');message.additionalBindings[i]=$root.google.api.HttpRule.fromObject(object.additionalBindings[i]);}}return message;};/**
             * Creates a plain object from a HttpRule message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.api.HttpRule
             * @static
             * @param {google.api.HttpRule} message HttpRule
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */HttpRule.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.arrays||options.defaults)object.additionalBindings=[];if(options.defaults){object.selector='';object.body='';}if(message.selector!=null&&message.hasOwnProperty('selector'))object.selector=message.selector;if(message.get!=null&&message.hasOwnProperty('get')){object.get=message.get;if(options.oneofs)object.pattern='get';}if(message.put!=null&&message.hasOwnProperty('put')){object.put=message.put;if(options.oneofs)object.pattern='put';}if(message.post!=null&&message.hasOwnProperty('post')){object.post=message.post;if(options.oneofs)object.pattern='post';}if(message['delete']!=null&&message.hasOwnProperty('delete')){object['delete']=message['delete'];if(options.oneofs)object.pattern='delete';}if(message.patch!=null&&message.hasOwnProperty('patch')){object.patch=message.patch;if(options.oneofs)object.pattern='patch';}if(message.body!=null&&message.hasOwnProperty('body'))object.body=message.body;if(message.custom!=null&&message.hasOwnProperty('custom')){object.custom=$root.google.api.CustomHttpPattern.toObject(message.custom,options);if(options.oneofs)object.pattern='custom';}if(message.additionalBindings&&message.additionalBindings.length){object.additionalBindings=[];for(var j=0;j<message.additionalBindings.length;++j){object.additionalBindings[j]=$root.google.api.HttpRule.toObject(message.additionalBindings[j],options);}}return object;};/**
             * Converts this HttpRule to JSON.
             * @function toJSON
             * @memberof google.api.HttpRule
             * @instance
             * @returns {Object.<string,*>} JSON object
             */HttpRule.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return HttpRule;}();api.CustomHttpPattern=function(){/**
             * Properties of a CustomHttpPattern.
             * @memberof google.api
             * @interface ICustomHttpPattern
             * @property {string|null} [kind] CustomHttpPattern kind
             * @property {string|null} [path] CustomHttpPattern path
             *//**
             * Constructs a new CustomHttpPattern.
             * @memberof google.api
             * @classdesc Represents a CustomHttpPattern.
             * @implements ICustomHttpPattern
             * @constructor
             * @param {google.api.ICustomHttpPattern=} [properties] Properties to set
             */function CustomHttpPattern(properties){if(properties)for(var keys=Object.keys(properties),i=0;i<keys.length;++i){if(properties[keys[i]]!=null)this[keys[i]]=properties[keys[i]];}}/**
             * CustomHttpPattern kind.
             * @member {string} kind
             * @memberof google.api.CustomHttpPattern
             * @instance
             */CustomHttpPattern.prototype.kind='';/**
             * CustomHttpPattern path.
             * @member {string} path
             * @memberof google.api.CustomHttpPattern
             * @instance
             */CustomHttpPattern.prototype.path='';/**
             * Creates a new CustomHttpPattern instance using the specified properties.
             * @function create
             * @memberof google.api.CustomHttpPattern
             * @static
             * @param {google.api.ICustomHttpPattern=} [properties] Properties to set
             * @returns {google.api.CustomHttpPattern} CustomHttpPattern instance
             */CustomHttpPattern.create=function create(properties){return new CustomHttpPattern(properties);};/**
             * Encodes the specified CustomHttpPattern message. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
             * @function encode
             * @memberof google.api.CustomHttpPattern
             * @static
             * @param {google.api.ICustomHttpPattern} message CustomHttpPattern message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */CustomHttpPattern.encode=function encode(message,writer){if(!writer)writer=$Writer.create();if(message.kind!=null&&message.hasOwnProperty('kind'))writer.uint32(/* id 1, wireType 2 =*/10).string(message.kind);if(message.path!=null&&message.hasOwnProperty('path'))writer.uint32(/* id 2, wireType 2 =*/18).string(message.path);return writer;};/**
             * Encodes the specified CustomHttpPattern message, length delimited. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.api.CustomHttpPattern
             * @static
             * @param {google.api.ICustomHttpPattern} message CustomHttpPattern message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */CustomHttpPattern.encodeDelimited=function encodeDelimited(message,writer){return this.encode(message,writer).ldelim();};/**
             * Decodes a CustomHttpPattern message from the specified reader or buffer.
             * @function decode
             * @memberof google.api.CustomHttpPattern
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.api.CustomHttpPattern} CustomHttpPattern
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */CustomHttpPattern.decode=function decode(reader,length){if(!(reader instanceof $Reader))reader=$Reader.create(reader);var end=length===undefined?reader.len:reader.pos+length,message=new $root.google.api.CustomHttpPattern();while(reader.pos<end){var tag=reader.uint32();switch(tag>>>3){case 1:message.kind=reader.string();break;case 2:message.path=reader.string();break;default:reader.skipType(tag&7);break;}}return message;};/**
             * Decodes a CustomHttpPattern message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.api.CustomHttpPattern
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.api.CustomHttpPattern} CustomHttpPattern
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */CustomHttpPattern.decodeDelimited=function decodeDelimited(reader){if(!(reader instanceof $Reader))reader=new $Reader(reader);return this.decode(reader,reader.uint32());};/**
             * Verifies a CustomHttpPattern message.
             * @function verify
             * @memberof google.api.CustomHttpPattern
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */CustomHttpPattern.verify=function verify(message){if(typeof message!=='object'||message===null)return'object expected';if(message.kind!=null&&message.hasOwnProperty('kind'))if(!$util.isString(message.kind))return'kind: string expected';if(message.path!=null&&message.hasOwnProperty('path'))if(!$util.isString(message.path))return'path: string expected';return null;};/**
             * Creates a CustomHttpPattern message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.api.CustomHttpPattern
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.api.CustomHttpPattern} CustomHttpPattern
             */CustomHttpPattern.fromObject=function fromObject(object){if(object instanceof $root.google.api.CustomHttpPattern)return object;var message=new $root.google.api.CustomHttpPattern();if(object.kind!=null)message.kind=String(object.kind);if(object.path!=null)message.path=String(object.path);return message;};/**
             * Creates a plain object from a CustomHttpPattern message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.api.CustomHttpPattern
             * @static
             * @param {google.api.CustomHttpPattern} message CustomHttpPattern
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */CustomHttpPattern.toObject=function toObject(message,options){if(!options)options={};var object={};if(options.defaults){object.kind='';object.path='';}if(message.kind!=null&&message.hasOwnProperty('kind'))object.kind=message.kind;if(message.path!=null&&message.hasOwnProperty('path'))object.path=message.path;return object;};/**
             * Converts this CustomHttpPattern to JSON.
             * @function toJSON
             * @memberof google.api.CustomHttpPattern
             * @instance
             * @returns {Object.<string,*>} JSON object
             */CustomHttpPattern.prototype.toJSON=function toJSON(){return this.constructor.toObject(this,$protobuf.util.toJSONOptions);};return CustomHttpPattern;}();return api;}();return google;}();exports.default=$root;

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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint-disable-line camelcase
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
// eslint-disable-line camelcase


var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

var _coerce = __webpack_require__(/*! ./coerce */ "./src/imp/coerce.js");

var coerce = _interopRequireWildcard(_coerce);

var _generated_proto = __webpack_require__(/*! ./generated_proto */ "./src/imp/generated_proto.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proto = _generated_proto.lightstep.collector;
var googleProtobufTimestampPB = _generated_proto.google.proto;

var LogRecordImp = function () {
    function LogRecordImp(logFieldKeyHardLimit, logFieldValueHardLimit, timestampMicros, fields) {
        _classCallCheck(this, LogRecordImp);

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
            if (value instanceof Object) {
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
            var millis = Math.floor(this._timestampMicros / 1000);
            var secs = Math.floor(millis / 1000);
            var nanos = millis % 1000 * 1000000;
            ts.seconds = secs;
            ts.nanos = nanos;
            log.Timestamp = ts;
            var keyValues = [];
            (0, _each3.default)(this._fields, function (value, key) {
                if (!key || !value) {
                    return;
                }
                var keyStr = _this2.getFieldKey(key);
                var valStr = _this2.getFieldValue(value);

                var keyValue = new proto.KeyValue();
                keyValue.key = keyStr;
                keyValue.stringValue = valStr;
                keyValues.push(keyValue);
            });

            log.fields = keyValues;

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


/* global WorkerGlobalScope */
// Find the HTML element that included the tracing library (if there is one).
// This relies on the fact that scripts are executed as soon as they are
// included -- thus 'this' script is the last one in the array at the time
// this is run.
var hostScriptElement = function () {
    // check to see if we're in a webworker
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
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
module.exports.parseScriptElementOptions = function (opts, browserOpts) {
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
};

// Parses options out of the current URL query string. The query parameters use
// the 'lightstep_' prefix to reduce the chance of collision with
// application-specific query parameters.
//
// This mechanism is particularly useful for debugging purposes as it does not
// require any code or configuration changes.
//
module.exports.parseURLQueryOptions = function (opts) {
    if (!window) {
        return;
    }

    var params = urlQueryParameters();
    if (params.lightstep_verbosity) {
        try {
            opts.verbosity = parseInt(params.lightstep_verbosity, 10);
        } catch (_ignored) {/* Ignored */}
    }
    if (params.lightstep_log_to_console) {
        opts.log_to_console = true;
    }
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
            var cookieKey = kRuntimeGUIDCookiePrefix + '/' + groupName;
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
            var p0 = ('00000000' + Math.abs(Math.random() * 0xFFFFFFFF | 0).toString(16)).substr(-8);
            var p1 = ('00000000' + Math.abs(Math.random() * 0xFFFFFFFF | 0).toString(16)).substr(-8);
            return '' + p0 + p1;
        }
    }, {
        key: 'onBeforeExit',
        value: function onBeforeExit() {
            if (window) {
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
            return [__webpack_require__(/*! ../../../plugins/instrument_xhr */ "./src/plugins/instrument_xhr.js"), __webpack_require__(/*! ../../../plugins/instrument_document_load */ "./src/plugins/instrument_document_load.js")];
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
            if (!window.sessionStorage) {
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
            if (!window.sessionStorage) {
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

var _generated_proto = __webpack_require__(/*! ../../generated_proto */ "./src/imp/generated_proto.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proto = _generated_proto.lightstep.collector;

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
                    var jsonResp = null;
                    if (this.status !== 200) {
                        err = new Error('status code = ' + this.status);
                    } else if (!this.response) {
                        err = new Error('unexpected empty response');
                    } else {
                        try {
                            resp = proto.ReportResponse.decode(new Uint8Array(this.response));

                            jsonResp = {
                                timing: {
                                    receive_micros: resp.receiveTimestamp,
                                    transmit_micros: resp.transmitTimestamp
                                },
                                errors: resp.errors
                            };
                        } catch (exception) {
                            err = exception;
                        }
                    }
                    return done(err, jsonResp);
                }
            };
            var serialized = proto.ReportRequest.encode(reportProto).finish();
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

/* eslint-enable */

module.exports = {
    cookie: cookie
};

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

var _coerce = __webpack_require__(/*! ./coerce.js */ "./src/imp/coerce.js");

var coerce = _interopRequireWildcard(_coerce);

var _generated_proto = __webpack_require__(/*! ./generated_proto */ "./src/imp/generated_proto.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proto = _generated_proto.lightstep.collector;

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
                metricSample.name = count.name;
                metricSample.intValue = count.int64_value;
                metricSample.doubleValue = count.double_value;
                countsList.push(metricSample);
            });

            var internalMetrics = new proto.InternalMetrics();
            internalMetrics.counts = countsList;

            var reportProto = new proto.ReportRequest();
            reportProto.auth = auth.toProto();
            reportProto.reporter = this._runtime.toProto();
            reportProto.spans = spansList;
            reportProto.timestampOffsetMicros = this._timestampOffsetMicros;
            reportProto.internalMetrics = internalMetrics;
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

var _coerce = __webpack_require__(/*! ./coerce.js */ "./src/imp/coerce.js");

var coerce = _interopRequireWildcard(_coerce);

var _generated_proto = __webpack_require__(/*! ./generated_proto */ "./src/imp/generated_proto.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var proto = _generated_proto.lightstep.collector;
var converter = __webpack_require__(/*! hex2dec */ "./node_modules/hex2dec/index.js");
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
            tracerVersion.key = 'lightstep.tracer_version';
            tracerVersion.stringValue = packageObject.version;

            var tracerPlatform = new proto.KeyValue();
            tracerPlatform.key = 'lightstep.tracer_platform';
            tracerPlatform.stringValue = 'browser';

            var componentName = new proto.KeyValue();
            componentName.key = 'lightstep.component_name';
            componentName.stringValue = this._componentName;

            var reporterId = parseInt(converter.hexToDec(this._runtimeGUID), 10);

            var reporterProto = new proto.Reporter();
            reporterProto.reporterId = reporterId;
            reporterProto.tags = [tracerVersion, tracerPlatform, componentName];
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

        // ---------------------------------------------------------------------- //
        // Private methods
        // ---------------------------------------------------------------------- //

    }]);

    function SpanContextImp(spanGUID, traceGUID) {
        _classCallCheck(this, SpanContextImp);

        this._baggage = {};
        this._guid = spanGUID;
        this._traceGUID = traceGUID;
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

var _coerce = __webpack_require__(/*! ./coerce.js */ "./src/imp/coerce.js");

var coerce = _interopRequireWildcard(_coerce);

var _constants = __webpack_require__(/*! ../constants */ "./src/constants.js");

var constants = _interopRequireWildcard(_constants);

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

var _opentracing = __webpack_require__(/*! opentracing */ "./node_modules/opentracing/lib/index.js");

var opentracing = _interopRequireWildcard(_opentracing);

var _platform_abstraction_layer = __webpack_require__(/*! ../platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

var _log_record_imp = __webpack_require__(/*! ./log_record_imp */ "./src/imp/log_record_imp.js");

var _log_record_imp2 = _interopRequireDefault(_log_record_imp);

var _generated_proto = __webpack_require__(/*! ./generated_proto */ "./src/imp/generated_proto.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line camelcase
// eslint-disable-line camelcase


var converter = __webpack_require__(/*! hex2dec */ "./node_modules/hex2dec/index.js");
var proto = _generated_proto.lightstep.collector;
var googleProtobufTimestampPB = _generated_proto.google.proto;

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
         *         	Optional Unix timestamp in milliseconds setting an explicit
         *         	finish time for the span.
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
                this._endMicros = finishTime * 1000;
            }

            // Do not set endMicros if it has already been set. This accounts for
            // the case of a span that has had it's times set manually (i.e. allows
            // for retroactively created spans that might not be possible to create
            // in real-time).
            if (this._endMicros === 0) {
                this._endMicros = this._tracerImp._platform.nowMicros();
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

            spanContextProto.traceId = converter.hexToDec(this.traceGUID());
            spanContextProto.spanId = converter.hexToDec(this.guid());

            var spanProto = new proto.Span();
            spanProto.spanContext = spanContextProto;
            spanProto.operationName = this._operationName;

            var startTimestamp = new googleProtobufTimestampPB.Timestamp();
            var startMillis = Math.floor(this._beginMicros / 1000);
            var startSeconds = Math.floor(startMillis / 1000);
            var startNanos = startMillis % 1000 * 1000000;
            startTimestamp.seconds = startSeconds;
            startTimestamp.nanos = startNanos;
            spanProto.startTimestamp = startTimestamp;
            spanProto.durationMicros = this._endMicros - this._beginMicros;

            var logs = [];
            (0, _each3.default)(this._log_records, function (logRecord) {
                var logProto = logRecord.toProto();
                _this3._tracerImp._counters['logs.keys.over_limit'] += logRecord.getNumKeysOverLimit();
                _this3._tracerImp._counters['logs.values.over_limit'] += logRecord.getNumValuesOverLimit();
                logs.push(logProto);
            });
            spanProto.logs = logs;

            var parentSpanGUID = undefined;
            var tags = [];
            (0, _each3.default)(this._tags, function (value, key) {
                var strValue = coerce.toString(value);
                var strKey = coerce.toString(key);
                var tag = new proto.KeyValue();
                if (strKey === 'parent_span_guid') {
                    parentSpanGUID = strValue;
                }
                tag.key = strKey;
                tag.stringValue = strValue;
                tags.push(tag);
            });
            spanProto.tags = tags;

            if (parentSpanGUID !== undefined) {
                var ref = new proto.Reference();
                ref.relationship = proto.Reference.Relationship.CHILD_OF;
                var parentSpanContext = new proto.SpanContext();
                parentSpanContext.spanId = converter.hexToDec(parentSpanGUID);
                ref.spanContext = parentSpanContext;
                spanProto.references = [ref];
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var CARRIER_TRACER_STATE_PREFIX = 'ot-tracer-';
var CARRIER_BAGGAGE_PREFIX = 'ot-baggage-';

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

        if (!_this._transport) {
            if (opts.transport && opts.transport === 'proto') {
                _this._transport = new _platform_abstraction_layer.ProtoTransport(logger);
            } else {
                _this._transport = new _platform_abstraction_layer.ThriftTransport(logger);
            }
        }

        _this._reportingLoopActive = false;
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
            this.addOption('verbosity', { type: 'int', min: 0, max: 9, defaultValue: 1 });

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
                            continue;
                        }
                        parentCtxImp = context;
                        break;
                    }
                }
            }

            var traceGUID = parentCtxImp ? parentCtxImp._traceGUID : this.generateTraceGUIDForRootSpan();
            var spanImp = new _span_imp2.default(this, name, new _span_context_imp2.default(this._platform.generateUUID(), traceGUID));
            spanImp.addTags(this._options.default_span_tags);

            (0, _each3.default)(fields, function (value, key) {
                switch (key) {
                    case 'references':
                        // Ignore: handled before constructing the span
                        break;
                    case 'startTime':
                        // startTime is in milliseconds
                        spanImp.setBeginMicros(value * 1000);
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
            }

            this.emit('start_span', spanImp);
            return spanImp;
        }
    }, {
        key: '_inject',
        value: function _inject(spanContext, format, carrier) {
            switch (format) {
                case this._opentracing.FORMAT_HTTP_HEADERS:
                case this._opentracing.FORMAT_TEXT_MAP:
                    this._injectToTextMap(spanContext, carrier);
                    break;

                case this._opentracing.FORMAT_BINARY:
                    this._error('Unsupported format: ' + format);
                    break;

                default:
                    this._error('Unknown format: ' + format);
                    break;
            }
        }
    }, {
        key: '_injectToTextMap',
        value: function _injectToTextMap(spanContext, carrier) {
            if (!carrier) {
                this._error('Unexpected null FORMAT_TEXT_MAP carrier in call to inject');
                return;
            }
            if (typeof carrier !== 'object') {
                this._error('Unexpected \'' + typeof carrier + '\' FORMAT_TEXT_MAP carrier in call to inject');
                return;
            }

            carrier[CARRIER_TRACER_STATE_PREFIX + 'spanid'] = spanContext._guid;
            carrier[CARRIER_TRACER_STATE_PREFIX + 'traceid'] = spanContext._traceGUID;
            spanContext.forEachBaggageItem(function (key, value) {
                carrier['' + CARRIER_BAGGAGE_PREFIX + key] = value;
            });
            carrier[CARRIER_TRACER_STATE_PREFIX + 'sampled'] = 'true';
            return carrier;
        }
    }, {
        key: '_extract',
        value: function _extract(format, carrier) {
            switch (format) {
                case this._opentracing.FORMAT_HTTP_HEADERS:
                case this._opentracing.FORMAT_TEXT_MAP:
                    return this._extractTextMap(format, carrier);

                case this._opentracing.FORMAT_BINARY:
                    this._error('Unsupported format: ' + format);
                    return null;

                default:
                    this._error('Unsupported format: ' + format);
                    return null;
            }
        }
    }, {
        key: '_extractTextMap',
        value: function _extractTextMap(format, carrier) {
            var _this3 = this;

            // Begin with the empty SpanContextImp
            var spanContext = new _span_context_imp2.default(null, null);

            // Iterate over the contents of the carrier and set the properties
            // accordingly.
            var foundFields = 0;
            (0, _each3.default)(carrier, function (value, key) {
                key = key.toLowerCase();
                if (key.substr(0, CARRIER_TRACER_STATE_PREFIX.length) !== CARRIER_TRACER_STATE_PREFIX) {
                    return;
                }
                var suffix = key.substr(CARRIER_TRACER_STATE_PREFIX.length);

                switch (suffix) {
                    case 'traceid':
                        foundFields++;
                        spanContext._traceGUID = value;
                        break;
                    case 'spanid':
                        foundFields++;
                        spanContext._guid = value;
                        break;
                    case 'sampled':
                        // Ignored. The carrier may be coming from a different client
                        // library that sends this (even though it's not used).
                        break;
                    default:
                        _this3._error('Unrecognized carrier key \'' + key + '\' with recognized prefix. Ignoring.');
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
                this._error('Only found a partial SpanContext: ' + format + ', ' + carrier);
                return null;
            }

            (0, _each3.default)(carrier, function (value, key) {
                key = key.toLowerCase();
                if (key.substr(0, CARRIER_BAGGAGE_PREFIX.length) !== CARRIER_BAGGAGE_PREFIX) {
                    return;
                }
                var suffix = key.substr(CARRIER_BAGGAGE_PREFIX.length);
                spanContext.setBaggageItem(suffix, value);
            });
            return spanContext;
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
            var _this4 = this;

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

            // Track what options have been modified
            var modified = {};
            var unchanged = {};
            (0, _each3.default)(this._optionDescs, function (desc) {
                _this4._setOptionInternal(modified, unchanged, opts, desc);
            });

            // Check for any invalid options: is there a key in the specified operation
            // that didn't result either in a change or a reset to the existing value?
            for (var key in opts) {
                if (modified[key] === undefined && unchanged[key] === undefined) {
                    this._warn('Invalid option ' + key + ' with value ' + opts[key]);
                }
            }

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
            var _this5 = this;

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

            // See if the Thrift data can be initialized
            if (this._options.access_token.length > 0 && this._options.component_name.length > 0) {
                this._runtimeGUID = this._platform.runtimeGUID(this._options.component_name);

                this._auth = new _auth_imp2.default(this._options.access_token);

                //
                // Assemble the tracer tags from the user-specified and automatic,
                // internal tags.
                //
                var tags = {};
                (0, _each3.default)(this._options.tags, function (value, key) {
                    if (typeof value !== 'string') {
                        _this5._error('Tracer tag value is not a string: key=' + key);
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

                this._info('Initializing thrift reporting data', {
                    component_name: this._options.component_name,
                    access_token: this._auth.getAccessToken()
                });
                this.emit('reporting_initialized');
            }
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
            var _this6 = this;

            var pluginSet = this._platform.plugins(opts);
            (0, _each3.default)(pluginSet, function (val) {
                _this6.addPlugin(val);
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
            var _this7 = this;

            (0, _each3.default)(this._plugins, function (val, key) {
                _this7._plugins[key].start(_this7);
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
            var _this8 = this;

            // Set the _activeRootSpan to the youngest of the roots in case of
            // multiple.
            this._activeRootSpan = null;
            (0, _each3.default)(this._activeRootSpanSet, function (span) {
                if (!_this8._activeRootSpan || span._beginMicros > _this8._activeRootSpan._beginMicros) {
                    _this8._activeRootSpan = span;
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
            var _this9 = this;

            (0, _each3.default)(spans, function (span) {
                _this9._internalAddSpanRecord(span);
            });

            var currentInternalLogs = this._internalLogs;
            this._internalLogs = [];
            var toAdd = internalLogs.concat(currentInternalLogs);
            (0, _each3.default)(toAdd, function (log) {
                _this9._pushInternalLog(log);
            });

            (0, _each3.default)(counters, function (value, key) {
                if (key in _this9._counters) {
                    _this9._counters[key] += value;
                } else {
                    _this9._error('Bad counter name: ' + key);
                }
            });
        }

        //-----------------------------------------------------------------------//
        // Reporting loop
        //-----------------------------------------------------------------------//

    }, {
        key: '_setupReportOnExit',
        value: function _setupReportOnExit() {
            var _this10 = this;

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
                _this10._info('Final flush before exit.');
                _this10._flushReport(false, true, function (err) {
                    if (err) {
                        _this10._warn('Final report before exit failed', {
                            error: err,
                            unflushed_spans: _this10._spanRecords.length,
                            buffer_youngest_micros: _this10._reportYoungestMicros
                        });
                    }
                });
            };
            this._platform.onBeforeExit(finalFlush);
        }
    }, {
        key: '_startReportingLoop',
        value: function _startReportingLoop() {
            var _this11 = this;

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
                _this11._stopReportingLoop();
            };
            this._platform.onBeforeExit(stopReporting);

            // Begin the asynchronous reporting loop
            var loop = function () {
                _this11._enqueueNextReport(function (err) {
                    if (_this11._reportingLoopActive) {
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
            var _this12 = this;

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
                _this12._reportTimer = null;
                _this12._flushReport(false, false, done);
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
            var _this13 = this;

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

            this._transport.report(detached, this._auth, report, function (err, res) {
                var destinationMicros = _this13._platform.nowMicros();
                var reportWindowSeconds = (now - report.oldest_micros) / 1e6;

                if (err) {
                    // How many errors in a row? Influences the report backoff.
                    _this13._reportErrorStreak++;

                    // On a failed report, re-enqueue the data that was going to be
                    // sent.
                    var errString = void 0;
                    if (err.message) {
                        errString = '' + err.message;
                    } else {
                        errString = '' + err;
                    }
                    _this13._warn('Error in report: ' + errString, {
                        last_report_seconds_ago: reportWindowSeconds
                    });

                    _this13._restoreRecords(report.getSpanRecords(), report.getInternalLogs(), report.getCounters());

                    // Increment the counter *after* the counters are restored
                    _this13._counters['reports.errors.send']++;

                    _this13.emit('report_error', err, {
                        error: err,
                        streak: _this13._reportErrorStreak,
                        detached: detached
                    });
                } else {
                    if (_this13.verbosity() >= 4) {
                        _this13._debug('Report flushed for last ' + reportWindowSeconds + ' seconds', {
                            spans_reported: report.getSpanRecords().length
                        });
                    }

                    // Update internal data after the successful report
                    _this13._reportErrorStreak = 0;
                    _this13._reportYoungestMicros = now;

                    // Update the clock state if there's info from the report
                    if (res) {
                        if (res.timing && res.timing.receive_micros && res.timing.transmit_micros) {
                            _this13._clockState.addSample(originMicros, res.timing.receive_micros, res.timing.transmit_micros, destinationMicros);
                        } else {
                            // The response does not have timing information. Disable
                            // the clock state assuming there'll never be timing data
                            // to use.
                            _this13._useClockState = false;
                        }

                        if (res.errors && res.errors.length > 0) {
                            _this13._warn('Errors in report', res.errors);
                        }
                    } else {
                        _this13._useClockState = false;
                    }

                    _this13.emit('report', report, res);
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
            this._printToConsole('log', '[LightStep:DEBUG] ' + msg, payload);
        }
    }, {
        key: '_info',
        value: function _info(msg, payload) {
            if (this.verbosity() < 3) {
                return;
            }
            this._printToConsole('log', '[LightStep:INFO] ' + msg, payload);
        }
    }, {
        key: '_warn',
        value: function _warn(msg, payload) {
            this._counters['internal.warnings']++;

            if (this.verbosity() < 3) {
                return;
            }
            this._printToConsole('warn', '[LightStep:WARN] ' + msg, payload);
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
                    this._printToConsole('error', '[LightStep:ERROR] ' + s, payload);
                }
            }

            this._printToConsole('error', '[LightStep:ERROR] ' + msg, payload);
            this._lastVisibleErrorMillis = now;
            this._skippedVisibleErrors = 0;
        }
    }, {
        key: '_printToConsole',
        value: function _printToConsole(type, msg, payload) {
            // Internal option to silence intentional errors generated by the unit
            // tests.
            if (this._options.silent) {
                return;
            }

            if (payload !== undefined) {
                console[type](msg, payload); // eslint-disable-line no-console
            } else {
                console[type](msg); // eslint-disable-line no-console
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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, [{
        key: "detachedTimeout",


        // Similar to a regular setTimeout() call, but dereferences the timer so the
        // program execution will not be held up by this timer.
        value: function detachedTimeout(callback, delay) {
            var timer = setTimeout(callback, delay);
            if (timer.unref) {
                timer.unref();
            }
            return timer;
        }
    }]);

    return Util;
}();

exports.default = new Util();
module.exports = exports.default;

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

var _platform_abstraction_layer = __webpack_require__(/*! ./platform_abstraction_layer */ "./src/platform_abstraction_layer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var library = {
    Tracer: _tracer_imp2.default
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
        proto: __webpack_require__(/*! ./imp/generated_proto */ "./src/imp/generated_proto.js").lightstep
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
            var payload = undefined;
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
                // eslint-disable-line guard-for-in
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

                var payload = undefined;

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

            if (window.chrome && window.chrome.loadTimes) {
                var chromeTimes = window.chrome.loadTimes();
                if (chromeTimes) {
                    parentImp.log({
                        message: 'window.chrome.loadTimes()',
                        payload: chromeTimes
                    }, timing.domComplete);
                }
            }

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

/***/ "./src/plugins/instrument_xhr.js":
/*!***************************************!*\
  !*** ./src/plugins/instrument_xhr.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each2 = __webpack_require__(/*! ../_each */ "./src/_each.js");

var _each3 = _interopRequireDefault(_each2);

var _opentracing = __webpack_require__(/*! opentracing */ "./node_modules/opentracing/lib/index.js");

var opentracing = _interopRequireWildcard(_opentracing);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

        if (!this._enabled) {
            return;
        }
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
                return ('' + str).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
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
                    tags.url_pathname = url.split('?')[0];
                }

                var openPayload = {};
                (0, _each3.default)(tags, function (val, key) {
                    openPayload[key] = val;
                });
                openPayload.cookies = getCookies();

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
                var len = undefined;
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
                var headersCarrier = {};
                tracer.inject(span.context(), opentracing.FORMAT_HTTP_HEADERS, headersCarrier);
                var keys = Object.keys(headersCarrier);
                keys.forEach(function (key) {
                    proxied.setRequestHeader.call(_this, key, headersCarrier[key]);
                });

                return proxied.send.apply(this, arguments);
            };
        }
    }, {
        key: '_shouldTrace',
        value: function _shouldTrace(tracer, xhr, url) {
            // This shouldn't be possible, but let's be paranoid
            if (!tracer) {
                return false;
            }

            var opts = tracer.options();
            if (opts.disabled) {
                return false;
            }
            if (!url) {
                return false;
            }
            for (var key in this._internalExclusions) {
                if (!this._internalExclusions.hasOwnProperty(key)) {
                    continue;
                }
                var ex = this._internalExclusions[key];
                if (ex.test(url)) {
                    return false;
                }
            }
            var include = false;
            for (var _key in opts.xhr_url_inclusion_patterns) {
                if (!opts.xhr_url_inclusion_patterns.hasOwnProperty(_key)) {
                    continue;
                }
                var inc = opts.xhr_url_inclusion_patterns[_key];
                if (inc.test(url)) {
                    include = true;
                    break;
                }
            }
            if (!include) {
                return false;
            }
            for (var _key2 in opts.xhr_url_exclusion_patterns) {
                if (!opts.xhr_url_exclusion_patterns.hasOwnProperty(_key2)) {
                    continue;
                }
                var _ex = opts.xhr_url_exclusion_patterns[_key2];
                if (_ex.test(url)) {
                    return false;
                }
            }
            return true;
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