(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.ReactRequest = {}),global.React));
}(this, (function (exports,React) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning$1 = function() {};

{
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};

  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning$1(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var printWarning = function() {};

{
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      printWarning('Invalid argument supplied to oneOf, expected an instance of array.');
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning('Invalid argument supplied to oneOfType, expected an instance of array.');
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
}
});

// This is a cache of in-flight requests. Each request key maps to an
// array of Promises. When the request resolves, each promise in the
// array is pushed to.
var requests = {};

function getRequestKey() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$url = _ref.url,
      url = _ref$url === undefined ? '' : _ref$url,
      _ref$method = _ref.method,
      method = _ref$method === undefined ? '' : _ref$method,
      _ref$responseType = _ref.responseType,
      responseType = _ref$responseType === undefined ? '' : _ref$responseType,
      _ref$body = _ref.body,
      body = _ref$body === undefined ? '' : _ref$body;

  return [url, method.toUpperCase(), responseType, body].join('||');
}

// Returns `true` if a request with `requestKey` is in flight,
// and `false` otherwise.
function isRequestInFlight(requestKey) {
  return Boolean(requests[requestKey]);
}

function clearRequestCache() {
  requests = {};
}

// This loops through all of the handlers for the request and either
// resolves or rejects them.
function resolveRequest(_ref2) {
  var requestKey = _ref2.requestKey,
      res = _ref2.res,
      err = _ref2.err;

  var handlers = requests[requestKey] || [];

  handlers.forEach(function (handler) {
    if (res) {
      handler.resolve(res);
    } else {
      handler.reject(err);
    }
  });

  // This list of handlers has been, well, handled. So we
  // clear the handlers for the next request.
  requests[requestKey] = null;
}

function fetchDedupe(input) {
  var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var dedupeOptions = arguments[2];

  var opts = void 0,
      initToUse = void 0;
  if (dedupeOptions) {
    opts = dedupeOptions;
    initToUse = init;
  } else if (init.responseType) {
    opts = init;
    initToUse = {};
  } else {
    opts = {};
    initToUse = init;
  }

  var _opts = opts,
      requestKey = _opts.requestKey,
      _opts$responseType = _opts.responseType,
      responseType = _opts$responseType === undefined ? '' : _opts$responseType,
      _opts$dedupe = _opts.dedupe,
      dedupe = _opts$dedupe === undefined ? true : _opts$dedupe;

  // Build the default request key if one is not passed

  var requestKeyToUse = requestKey || getRequestKey({
    // If `input` is a request, then we use that URL
    url: input.url || input,
    // We prefer values from `init` over request objects. With `fetch()`, init
    // takes priority over a passed-in request
    method: initToUse.method || input.method || '',
    body: initToUse.body || input.body || ''
  });

  var proxyReq = void 0;
  if (dedupe) {
    if (!requests[requestKeyToUse]) {
      requests[requestKeyToUse] = [];
    }

    var handlers = requests[requestKeyToUse];
    var requestInFlight = Boolean(handlers.length);
    var requestHandler = {};
    proxyReq = new Promise(function (resolve, reject) {
      requestHandler.resolve = resolve;
      requestHandler.reject = reject;
    });

    handlers.push(requestHandler);

    if (requestInFlight) {
      return proxyReq;
    }
  }

  var request = fetch(input, initToUse).then(function (res) {
    var responseTypeToUse = void 0;
    if (responseType instanceof Function) {
      responseTypeToUse = responseType(res);
    } else if (responseType) {
      responseTypeToUse = responseType;
    } else if (res.status === 204) {
      responseTypeToUse = 'text';
    } else {
      responseTypeToUse = 'json';
    }
    // The response body is a ReadableStream. ReadableStreams can only be read a single
    // time, so we must handle that in a central location, here, before resolving
    // the fetch.
    return res[responseTypeToUse]().then(function (data) {
      res.data = data;

      if (dedupe) {
        resolveRequest({ requestKey: requestKeyToUse, res: res });
      } else {
        return res;
      }
    }, function () {
      res.data = null;

      if (dedupe) {
        resolveRequest({ requestKey: requestKeyToUse, res: res });
      } else {
        return res;
      }
    });
  }, function (err) {
    if (dedupe) {
      resolveRequest({ requestKey: requestKeyToUse, err: err });
    } else {
      return Promise.reject(err);
    }
  });

  if (dedupe) {
    return proxyReq;
  } else {
    return request;
  }
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// This object is our cache
// The keys of the object are requestKeys
// The value of each key is a Response instance
var responseCache = {};

// The docs state that this is not safe to use in an
// application. That's just because I am not writing tests,
// nor designing the API, around folks clearing the cache.
// This was only added to help out with testing your app.
// Use your judgment if you decide to use this in your
// app directly.
function clearResponseCache() {
  responseCache = {};
}

var Fetch = function (_React$Component) {
  inherits(Fetch, _React$Component);
  createClass(Fetch, [{
    key: 'render',
    value: function render() {
      // Anything pulled from `this.props` here is not eligible to be
      // specified when calling `doFetch`.
      var _props = this.props,
          children = _props.children,
          requestName = _props.requestName;
      var _state = this.state,
          fetching = _state.fetching,
          response = _state.response,
          data = _state.data,
          error = _state.error,
          requestKey = _state.requestKey,
          url = _state.url;


      if (!children) {
        return null;
      } else {
        return children({
          requestName: requestName,
          url: url,
          fetching: fetching,
          failed: Boolean(error || response && !response.ok),
          response: response,
          data: data,
          requestKey: requestKey,
          error: error,
          doFetch: this.fetchRenderProp
        }) || null;
      }
    }
  }]);

  function Fetch(props, context) {
    classCallCheck(this, Fetch);

    var _this = possibleConstructorReturn(this, (Fetch.__proto__ || Object.getPrototypeOf(Fetch)).call(this, props, context));

    _this.isReadRequest = function (method) {
      var uppercaseMethod = method.toUpperCase();

      return uppercaseMethod === 'GET' || uppercaseMethod === 'HEAD' || uppercaseMethod === 'OPTIONS';
    };

    _this.isLazy = function () {
      var _this$props = _this.props,
          lazy = _this$props.lazy,
          method = _this$props.method;


      return typeof lazy === 'undefined' ? !_this.isReadRequest(method) : lazy;
    };

    _this.shouldCacheResponse = function () {
      var _this$props2 = _this.props,
          cacheResponse = _this$props2.cacheResponse,
          method = _this$props2.method;


      return typeof cacheResponse === 'undefined' ? _this.isReadRequest(method) : cacheResponse;
    };

    _this.getFetchPolicy = function () {
      var _this$props3 = _this.props,
          fetchPolicy = _this$props3.fetchPolicy,
          method = _this$props3.method;


      if (typeof fetchPolicy === 'undefined') {
        return _this.isReadRequest(method) ? 'cache-first' : 'network-only';
      } else {
        return fetchPolicy;
      }
    };

    _this.cancelExistingRequest = function (reason) {
      if (_this.state.fetching && _this._currentRequestKey !== null) {
        var abortError = new Error(reason);
        // This is an effort to mimic the error that is created when a
        // fetch is actually aborted using the AbortController API.
        abortError.name = 'AbortError';
        _this.onResponseReceived(_extends({}, _this.responseReceivedInfo, {
          error: abortError,
          hittingNetwork: true
        }));
      }
    };

    _this.fetchRenderProp = function (options) {
      return new Promise(function (resolve) {
        // We wrap this in a setTimeout so as to avoid calls to `setState`
        // in render, which React does not allow.
        //
        // tl;dr, the following code should never cause a React warning or error:
        //
        // `<Fetch children={({ doFetch }) => doFetch()} />
        setTimeout(function () {
          _this.fetchData(options, true, resolve);
        });
      });
    };

    _this.getRequestKey = function (options) {
      // A request key in the options gets top priority
      if (options && options.requestKey) {
        return options.requestKey;
      }

      // Otherwise, if we have no request key, but we do have options, then we
      // recompute the request key based on these options.
      // Note that if the URL, body, or method have not changed, then the request
      // key should match the previous request key if it was computed.
      // If you passed in a custom request key as a prop, then you will also
      // need to pass in a custom key when you call `doFetch()`!
      else if (options) {
          var _Object$assign = Object.assign({}, _this.props, options),
              url = _Object$assign.url,
              method = _Object$assign.method,
              body = _Object$assign.body;

          return getRequestKey({
            url: url,
            body: body,
            method: method.toUpperCase()
          });
        }

        // Next in line is the the request key from props.
        else if (_this.props.requestKey) {
            return _this.props.requestKey;
          }

          // Lastly, we compute the request key from the props.
          else {
              var _this$props4 = _this.props,
                  _url = _this$props4.url,
                  _method = _this$props4.method,
                  _body = _this$props4.body;


              return getRequestKey({
                url: _url,
                body: _body,
                method: _method.toUpperCase()
              });
            }
    };

    _this.fetchData = function (options, ignoreCache, resolve) {
      // These are the things that we do not allow a user to configure in
      // `options` when calling `doFetch()`. Perhaps we should, however.
      var _this$props5 = _this.props,
          requestName = _this$props5.requestName,
          dedupe = _this$props5.dedupe,
          beforeFetch = _this$props5.beforeFetch;


      _this.cancelExistingRequest('New fetch initiated');

      var requestKey = _this.getRequestKey(options);
      var requestOptions = Object.assign({}, _this.props, options);

      _this._currentRequestKey = requestKey;

      var url = requestOptions.url,
          body = requestOptions.body,
          credentials = requestOptions.credentials,
          headers = requestOptions.headers,
          method = requestOptions.method,
          responseType = requestOptions.responseType,
          mode = requestOptions.mode,
          cache = requestOptions.cache,
          redirect = requestOptions.redirect,
          referrer = requestOptions.referrer,
          referrerPolicy = requestOptions.referrerPolicy,
          integrity = requestOptions.integrity,
          keepalive = requestOptions.keepalive,
          signal = requestOptions.signal;


      var uppercaseMethod = method.toUpperCase();
      var shouldCacheResponse = _this.shouldCacheResponse();

      var init = {
        body: body,
        credentials: credentials,
        headers: headers,
        method: uppercaseMethod,
        mode: mode,
        cache: cache,
        redirect: redirect,
        referrer: referrer,
        referrerPolicy: referrerPolicy,
        integrity: integrity,
        keepalive: keepalive,
        signal: signal
      };

      var responseReceivedInfo = {
        url: url,
        init: init,
        requestKey: requestKey,
        responseType: responseType
      };

      // This is necessary because `options` may have overridden the props.
      // If the request config changes, we need to be able to accurately
      // cancel the in-flight request.
      _this.responseReceivedInfo = responseReceivedInfo;

      var fetchPolicy = _this.getFetchPolicy();

      var cachedResponse = void 0;
      if (fetchPolicy !== 'network-only' && !ignoreCache) {
        cachedResponse = responseCache[requestKey];

        if (cachedResponse) {
          _this.onResponseReceived(_extends({}, responseReceivedInfo, {
            response: cachedResponse,
            hittingNetwork: false,
            stillFetching: fetchPolicy === 'cache-and-network'
          }));

          if (fetchPolicy === 'cache-first' || fetchPolicy === 'cache-only') {
            return Promise.resolve(cachedResponse);
          }
        } else if (fetchPolicy === 'cache-only') {
          var cacheError = new Error('Response for "' + requestName + '" not found in cache.');
          _this.onResponseReceived(_extends({}, responseReceivedInfo, {
            error: cacheError,
            hittingNetwork: false
          }));
          return Promise.resolve(cacheError);
        }
      }

      _this.setState({
        requestKey: requestKey,
        url: url,
        error: null,
        failed: false,
        fetching: true
      });
      var hittingNetwork = !isRequestInFlight(requestKey) || !dedupe;

      if (hittingNetwork) {
        beforeFetch({
          url: url,
          init: init,
          requestKey: requestKey
        });
      }
      return fetchDedupe(url, init, { requestKey: requestKey, responseType: responseType, dedupe: dedupe }).then(function (res) {
        if (shouldCacheResponse) {
          responseCache[requestKey] = res;
        }

        if (_this._currentRequestKey === requestKey) {
          _this.onResponseReceived(_extends({}, responseReceivedInfo, {
            response: res,
            hittingNetwork: hittingNetwork,
            resolve: resolve
          }));
        }

        return res;
      }, function (error) {
        if (_this._currentRequestKey === requestKey) {
          _this.onResponseReceived(_extends({}, responseReceivedInfo, {
            error: error,
            cachedResponse: cachedResponse,
            hittingNetwork: hittingNetwork,
            resolve: resolve
          }));
        }

        return error;
      });
    };

    _this.onResponseReceived = function (info) {
      var _info$error = info.error,
          error = _info$error === undefined ? null : _info$error,
          _info$response = info.response,
          response = _info$response === undefined ? null : _info$response,
          hittingNetwork = info.hittingNetwork,
          url = info.url,
          init = info.init,
          requestKey = info.requestKey,
          cachedResponse = info.cachedResponse,
          _info$stillFetching = info.stillFetching,
          stillFetching = _info$stillFetching === undefined ? false : _info$stillFetching,
          resolve = info.resolve;


      _this.responseReceivedInfo = null;

      if (!stillFetching) {
        _this._currentRequestKey = null;
      }

      var data = void 0;
      // If our response succeeded, then we use that data.
      if (response && response.data) {
        data = response.data;
      } else if (cachedResponse && cachedResponse.data) {
        // This happens when the request failed, but we have cache-and-network
        // specified. Although we pass along the failed response, we continue to
        // pass in the cached data.
        data = cachedResponse.data;
      }

      data = data ? _this.props.transformData(data) : null;

      // If we already have some data in state on error, then we continue to
      // pass that data down. This prevents the data from being wiped when a
      // request fails, which is generally not what people want.
      // For more, see: GitHub Issue #154
      if (error && _this.state.data) {
        data = _this.state.data;
      }

      var afterFetchInfo = {
        url: url,
        init: init,
        requestKey: requestKey,
        error: error,
        failed: Boolean(error || response && !response.ok),
        response: response,
        data: data,
        didUnmount: Boolean(_this.willUnmount)
      };

      if (typeof resolve === 'function') {
        resolve(afterFetchInfo);
      }

      if (hittingNetwork) {
        _this.props.afterFetch(afterFetchInfo);
      }

      if (_this.willUnmount) {
        return;
      }

      _this.setState({
        url: url,
        data: data,
        error: error,
        response: response,
        fetching: stillFetching,
        requestKey: requestKey
      }, function () {
        return _this.props.onResponse(error, response);
      });
    };

    _this.state = {
      requestKey: props.requestKey || getRequestKey(_extends({}, props, {
        method: props.method.toUpperCase()
      })),
      requestName: props.requestName,
      fetching: false,
      response: null,
      data: null,
      error: null,
      url: props.url
    };
    return _this;
  }

  // We default to being lazy for "write" requests,
  // such as POST, PATCH, DELETE, and so on.


  createClass(Fetch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.isLazy()) {
        this.fetchData();
      }
    }

    // Because we use `componentDidUpdate` to determine if we should fetch
    // again, there will be at least one render when you receive your new
    // fetch options, such as a new URL, but the fetch has not begun yet.

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var currentRequestKey = this.props.requestKey || getRequestKey(_extends({}, this.props, {
        method: this.props.method.toUpperCase()
      }));
      var prevRequestKey = prevProps.requestKey || getRequestKey(_extends({}, prevProps, {
        method: prevProps.method.toUpperCase()
      }));

      if (currentRequestKey !== prevRequestKey && !this.isLazy()) {
        this.fetchData({
          requestKey: currentRequestKey
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.willUnmount = true;
      this.cancelExistingRequest('Component unmounted');
    }

    // When a request is already in flight, and a new one is
    // configured, then we need to "cancel" the previous one.


    // When a subsequent request is made, it is important that the correct
    // request key is used. This method computes the right key based on the
    // options and props.

  }]);
  return Fetch;
}(React.Component);

var globalObj = typeof self !== 'undefined' ? self : this;
var AbortSignalCtr = globalObj !== undefined ? globalObj.AbortSignal : function () {};

Fetch.propTypes = {
  children: propTypes.func,
  requestName: propTypes.string,
  fetchPolicy: propTypes.oneOf(['cache-first', 'cache-and-network', 'network-only', 'cache-only']),
  onResponse: propTypes.func,
  beforeFetch: propTypes.func,
  afterFetch: propTypes.func,
  responseType: propTypes.oneOfType([propTypes.func, propTypes.oneOf(['json', 'text', 'blob', 'arrayBuffer', 'formData'])]),
  transformData: propTypes.func,
  lazy: propTypes.bool,
  dedupe: propTypes.bool,
  requestKey: propTypes.string,

  url: propTypes.string.isRequired,
  body: propTypes.any,
  credentials: propTypes.oneOf(['omit', 'same-origin', 'include']),
  headers: propTypes.object,
  method: propTypes.oneOf(['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']),
  mode: propTypes.oneOf(['same-origin', 'cors', 'no-cors', 'navigate', 'websocket']),
  cache: propTypes.oneOf(['default', 'no-store', 'reload', 'no-cache', 'force-cache', 'only-if-cached']),
  redirect: propTypes.oneOf(['manual', 'follow', 'error']),
  referrer: propTypes.string,
  referrerPolicy: propTypes.oneOf(['no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'unsafe-url', '']),
  integrity: propTypes.string,
  keepalive: propTypes.bool,
  signal: propTypes.instanceOf(AbortSignalCtr)
};

Fetch.defaultProps = {
  requestName: 'anonymousRequest',
  onResponse: function onResponse() {},
  beforeFetch: function beforeFetch() {},
  afterFetch: function afterFetch() {},
  transformData: function transformData(data) {
    return data;
  },
  dedupe: true,

  method: 'get',
  referrerPolicy: '',
  integrity: '',
  referrer: 'about:client'
};

exports.Fetch = Fetch;
exports.fetchDedupe = fetchDedupe;
exports.getRequestKey = getRequestKey;
exports.isRequestInFlight = isRequestInFlight;
exports.clearRequestCache = clearRequestCache;
exports.clearResponseCache = clearResponseCache;

Object.defineProperty(exports, '__esModule', { value: true });

})));
