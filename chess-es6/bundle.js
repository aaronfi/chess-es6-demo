window.Chess = require("./src/chess.js");

// TODO consider user of objectAssign npm module / polyfill
//
// polyfill, from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
// non-ES6 browsers won't have Object.assign defined
if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}


// Array.from polyfill
/*! https://mths.be/array-from v0.2.0 by @mathias */
if (!Array.from) {
  (function() {
    'use strict';
    var defineProperty = (function() {
      // IE 8 only supports `Object.defineProperty` on DOM elements.
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result || function put(object, key, descriptor) {
            object[key] = descriptor.value;
          };
    }());
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      // In a perfect world, the `typeof` check would be sufficient. However,
      // in Chrome 1–12, `typeof /x/ == 'object'`, and in IE 6–8
      // `typeof alert == 'object'` and similar for other host objects.
      return typeof fn == 'function' || toStr.call(fn) == '[object Function]';
    };
    var toInteger = function(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number == 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    var from = function(arrayLike) {
      var C = this;
      if (arrayLike == null) {
        throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
      }
      var items = Object(arrayLike);
      var mapping = arguments.length > 1;

      var mapFn, T;
      if (arguments.length > 1) {
        mapFn = arguments[1];
        if (!isCallable(mapFn)) {
          throw new TypeError('When provided, the second argument to `Array.from` must be a function');
        }
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      var len = toLength(items.length);
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
      var k = 0;
      var kValue, mappedValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          mappedValue = typeof T == 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          mappedValue = kValue;
        }
        defineProperty(A, k, {
          'value': mappedValue,
          'configurable': true,
          'enumerable': true,
          'writable': true
        });
        ++k;
      }
      A.length = len;
      return A;
    };
    defineProperty(Array, 'from', {
      'value': from,
      'configurable': true,
      'writable': true
    });
  }());
}