/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 117);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
     true ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.moment = factory();
})(this, function () {
    'use strict';

    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        var k;
        for (k in obj) {
            // even if its not own property I'd still call it non-empty
            return false;
        }
        return true;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    var some$1 = some;

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

            if (m._strict) {
                isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var keys$1 = keys;

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years'
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({ unit: u, priority: priorities[u] });
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1 = /\d/; //       0 - 9
    var match2 = /\d\d/; //      00 - 99
    var match3 = /\d{3}/; //     000 - 999
    var match4 = /\d{4}/; //    0000 - 9999
    var match6 = /[+-]?\d{6}/; // -999999 - 999999
    var match1to2 = /\d\d?/; //       0 - 99
    var match3to4 = /\d\d\d\d?/; //     999 - 9999
    var match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3 = /\d{1,3}/; //       0 - 999
    var match1to4 = /\d{1,4}/; //       0 - 9999
    var match1to6 = /[+-]?\d{1,6}/; // -999999 - 999999

    var matchUnsigned = /\d+/; //       0 - inf
    var matchSigned = /[+-]?\d+/; //    -inf - inf

    var matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

    var regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return isStrict && strictRegex ? strictRegex : regex;
        };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    var indexOf$1 = indexOf;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months) ? this._months : this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf$1.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf$1.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date = new Date(y, m, d, h, M, s, ms);

        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,

        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6 // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays(m, format) {
        if (!m) {
            return isArray(this._weekdays) ? this._weekdays : this._weekdays['standalone'];
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort(m) {
        return m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin(m) {
        return m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf$1.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf$1.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf$1.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // months
    // week
    // weekdays
    // meridiem
    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && typeof module !== 'undefined' && module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                __webpack_require__(119)("./" + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    if (!localeFamilies[config.parentLocale]) {
                        localeFamilies[config.parentLocale] = [];
                    }
                    localeFamilies[config.parentLocale].push({
                        name: name,
                        config: config
                    });
                    return null;
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                parentConfig = baseConfig;
            // MERGE
            if (locales[name] != null) {
                parentConfig = locales[name]._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys$1(locales);
    }

    function checkOverflow(m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]];

    // iso time formats and regexes
    var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var string, match, dayFormat, dateFormat, timeFormat, tzFormat;
        var timezones = {
            ' GMT': ' +0000',
            ' EDT': ' -0400',
            ' EST': ' -0500',
            ' CDT': ' -0500',
            ' CST': ' -0600',
            ' MDT': ' -0600',
            ' MST': ' -0700',
            ' PDT': ' -0700',
            ' PST': ' -0800'
        };
        var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
        var timezone, timezoneIndex;

        string = config._i.replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
        match = basicRfcRegex.exec(string);

        if (match) {
            dayFormat = match[1] ? 'ddd' + (match[1].length === 5 ? ', ' : ' ') : '';
            dateFormat = 'D MMM ' + (match[2].length > 10 ? 'YYYY ' : 'YY ');
            timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            if (match[1]) {
                // day of week given
                var momentDate = new Date(match[2]);
                var momentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][momentDate.getDay()];

                if (match[1].substr(0, 3) !== momentDay) {
                    getParsingFlags(config).weekdayMismatch = true;
                    config._isValid = false;
                    return;
                }
            }

            switch (match[5].length) {
                case 2:
                    // military
                    if (timezoneIndex === 0) {
                        timezone = ' +0000';
                    } else {
                        timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                        timezone = (timezoneIndex < 0 ? ' -' : ' +') + ('' + timezoneIndex).replace(/^-?/, '0').match(/..$/)[0] + '00';
                    }
                    break;
                case 4:
                    // Zone
                    timezone = timezones[match[5]];
                    break;
                default:
                    // UT or +/-9999
                    timezone = timezones[' GMT'];
            }
            match[5] = timezone;
            config._i = match.splice(1).join('');
            tzFormat = ' ZZ';
            config._f = dayFormat + dateFormat + timeFormat + tzFormat;
            configFromStringAndFormat(config);
            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged and will be removed in an upcoming major release. Please refer to ' + 'http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    });

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || format === undefined && input === '') {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    });

    var prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    });

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds + seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk = matches[matches.length - 1] || [];
        var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,

        // matching against regexp is expensive, do it on demand
        match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign)
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = { milliseconds: 0, months: 0 };

        res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val;val = period;period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1(time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) && (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),

        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString() {
        if (!this.isValid()) {
            return null;
        }
        var m = this.clone().utc();
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            return this.toDate().toISOString();
        }
        return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
            return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    });

    function localeData() {
        return this._locale;
    }

    function startOf(units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
            /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
            /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
            /* falls through */
            case 'hour':
                this.minutes(0);
            /* falls through */
            case 'minute':
                this.seconds(0);
            /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf(units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, units === 'isoWeek' ? 'week' : units).subtract(1, 'ms');
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIOROITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;

    // Year
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;

    // Week Year
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    proto.quarter = proto.quarters = getSetQuarter;

    // Month
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;

    // Week
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;

    // Hour
    proto.hour = proto.hours = getSetHour;

    // Minute
    proto.minute = proto.minutes = getSetMinute;

    // Second
    proto.second = proto.seconds = getSetSecond;

    // Millisecond
    proto.millisecond = proto.milliseconds = getSetMillisecond;

    // Offset
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;

    // Timezone
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;

    // Deprecations
    proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;

    // Month
    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;

    // Week
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    // Hours
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds;
        var days = this._days;
        var months = this._months;
        var data = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds = makeAs('s');
    var asMinutes = makeAs('m');
    var asHours = makeAs('h');
    var asDays = makeAs('d');
    var asWeeks = makeAs('w');
    var asMonths = makeAs('M');
    var asYears = makeAs('y');

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds = makeGetter('seconds');
    var minutes = makeGetter('minutes');
    var hours = makeGetter('hours');
    var days = makeGetter('days');
    var months = makeGetter('months');
    var years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44, // a few seconds to seconds
        s: 45, // seconds to minute
        m: 45, // minutes to hour
        h: 22, // hours to day
        d: 26, // days to month
        M: 11 // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds = round(duration.as('s'));
        var minutes = round(duration.as('m'));
        var hours = round(duration.as('h'));
        var days = round(duration.as('d'));
        var months = round(duration.as('M'));
        var years = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days = abs$1(this._days);
        var months = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') + 'P' + (Y ? Y + 'Y' : '') + (M ? M + 'M' : '') + (D ? D + 'D' : '') + (h || m || s ? 'T' : '') + (h ? h + 'H' : '') + (m ? m + 'M' : '') + (s ? s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    // Deprecations
    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.18.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    return hooks;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(118)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(createjs) {/*!
* @license EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs = this.createjs || {}, createjs.extend = function (a, b) {
  "use strict";
  function c() {
    this.constructor = a;
  }return c.prototype = b.prototype, a.prototype = new c();
}, this.createjs = this.createjs || {}, createjs.promote = function (a, b) {
  "use strict";
  var c = a.prototype,
      d = Object.getPrototypeOf && Object.getPrototypeOf(c) || c.__proto__;if (d) {
    c[(b += "_") + "constructor"] = d.constructor;for (var e in d) c.hasOwnProperty(e) && "function" == typeof d[e] && (c[b + e] = d[e]);
  }return a;
}, this.createjs = this.createjs || {}, createjs.indexOf = function (a, b) {
  "use strict";
  for (var c = 0, d = a.length; d > c; c++) if (b === a[c]) return c;return -1;
}, this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c) {
    this.type = a, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!b, this.cancelable = !!c, this.timeStamp = new Date().getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1;
  }var b = a.prototype;b.preventDefault = function () {
    this.defaultPrevented = this.cancelable && !0;
  }, b.stopPropagation = function () {
    this.propagationStopped = !0;
  }, b.stopImmediatePropagation = function () {
    this.immediatePropagationStopped = this.propagationStopped = !0;
  }, b.remove = function () {
    this.removed = !0;
  }, b.clone = function () {
    return new a(this.type, this.bubbles, this.cancelable);
  }, b.set = function (a) {
    for (var b in a) this[b] = a[b];return this;
  }, b.toString = function () {
    return "[Event (type=" + this.type + ")]";
  }, createjs.Event = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a() {
    this._listeners = null, this._captureListeners = null;
  }var b = a.prototype;a.initialize = function (a) {
    a.addEventListener = b.addEventListener, a.on = b.on, a.removeEventListener = a.off = b.removeEventListener, a.removeAllEventListeners = b.removeAllEventListeners, a.hasEventListener = b.hasEventListener, a.dispatchEvent = b.dispatchEvent, a._dispatchEvent = b._dispatchEvent, a.willTrigger = b.willTrigger;
  }, b.addEventListener = function (a, b, c) {
    var d;d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};var e = d[a];return e && this.removeEventListener(a, b, c), e = d[a], e ? e.push(b) : d[a] = [b], b;
  }, b.on = function (a, b, c, d, e, f) {
    return b.handleEvent && (c = c || b, b = b.handleEvent), c = c || this, this.addEventListener(a, function (a) {
      b.call(c, a, e), d && a.remove();
    }, f);
  }, b.removeEventListener = function (a, b, c) {
    var d = c ? this._captureListeners : this._listeners;if (d) {
      var e = d[a];if (e) for (var f = 0, g = e.length; g > f; f++) if (e[f] == b) {
        1 == g ? delete d[a] : e.splice(f, 1);break;
      }
    }
  }, b.off = b.removeEventListener, b.removeAllEventListeners = function (a) {
    a ? (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null;
  }, b.dispatchEvent = function (a, b, c) {
    if ("string" == typeof a) {
      var d = this._listeners;if (!(b || d && d[a])) return !0;a = new createjs.Event(a, b, c);
    } else a.target && a.clone && (a = a.clone());try {
      a.target = this;
    } catch (e) {}if (a.bubbles && this.parent) {
      for (var f = this, g = [f]; f.parent;) g.push(f = f.parent);var h,
          i = g.length;for (h = i - 1; h >= 0 && !a.propagationStopped; h--) g[h]._dispatchEvent(a, 1 + (0 == h));for (h = 1; i > h && !a.propagationStopped; h++) g[h]._dispatchEvent(a, 3);
    } else this._dispatchEvent(a, 2);return !a.defaultPrevented;
  }, b.hasEventListener = function (a) {
    var b = this._listeners,
        c = this._captureListeners;return !!(b && b[a] || c && c[a]);
  }, b.willTrigger = function (a) {
    for (var b = this; b;) {
      if (b.hasEventListener(a)) return !0;b = b.parent;
    }return !1;
  }, b.toString = function () {
    return "[EventDispatcher]";
  }, b._dispatchEvent = function (a, b) {
    var c,
        d = 1 == b ? this._captureListeners : this._listeners;if (a && d) {
      var e = d[a.type];if (!e || !(c = e.length)) return;try {
        a.currentTarget = this;
      } catch (f) {}try {
        a.eventPhase = b;
      } catch (f) {}a.removed = !1, e = e.slice();for (var g = 0; c > g && !a.immediatePropagationStopped; g++) {
        var h = e[g];h.handleEvent ? h.handleEvent(a) : h(a), a.removed && (this.off(a.type, h, 1 == b), a.removed = !1);
      }
    }
  }, createjs.EventDispatcher = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a() {
    throw "Ticker cannot be instantiated.";
  }a.RAF_SYNCHED = "synched", a.RAF = "raf", a.TIMEOUT = "timeout", a.useRAF = !1, a.timingMode = null, a.maxDelta = 0, a.paused = !1, a.removeEventListener = null, a.removeAllEventListeners = null, a.dispatchEvent = null, a.hasEventListener = null, a._listeners = null, createjs.EventDispatcher.initialize(a), a._addEventListener = a.addEventListener, a.addEventListener = function () {
    return !a._inited && a.init(), a._addEventListener.apply(a, arguments);
  }, a._inited = !1, a._startTime = 0, a._pausedTime = 0, a._ticks = 0, a._pausedTicks = 0, a._interval = 50, a._lastTime = 0, a._times = null, a._tickTimes = null, a._timerId = null, a._raf = !0, a.setInterval = function (b) {
    a._interval = b, a._inited && a._setupTick();
  }, a.getInterval = function () {
    return a._interval;
  }, a.setFPS = function (b) {
    a.setInterval(1e3 / b);
  }, a.getFPS = function () {
    return 1e3 / a._interval;
  };try {
    Object.defineProperties(a, { interval: { get: a.getInterval, set: a.setInterval }, framerate: { get: a.getFPS, set: a.setFPS } });
  } catch (b) {
    console.log(b);
  }a.init = function () {
    a._inited || (a._inited = !0, a._times = [], a._tickTimes = [], a._startTime = a._getTime(), a._times.push(a._lastTime = 0), a.interval = a._interval);
  }, a.reset = function () {
    if (a._raf) {
      var b = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;b && b(a._timerId);
    } else clearTimeout(a._timerId);a.removeAllEventListeners("tick"), a._timerId = a._times = a._tickTimes = null, a._startTime = a._lastTime = a._ticks = 0, a._inited = !1;
  }, a.getMeasuredTickTime = function (b) {
    var c = 0,
        d = a._tickTimes;if (!d || d.length < 1) return -1;b = Math.min(d.length, b || 0 | a.getFPS());for (var e = 0; b > e; e++) c += d[e];return c / b;
  }, a.getMeasuredFPS = function (b) {
    var c = a._times;return !c || c.length < 2 ? -1 : (b = Math.min(c.length - 1, b || 0 | a.getFPS()), 1e3 / ((c[0] - c[b]) / b));
  }, a.setPaused = function (b) {
    a.paused = b;
  }, a.getPaused = function () {
    return a.paused;
  }, a.getTime = function (b) {
    return a._startTime ? a._getTime() - (b ? a._pausedTime : 0) : -1;
  }, a.getEventTime = function (b) {
    return a._startTime ? (a._lastTime || a._startTime) - (b ? a._pausedTime : 0) : -1;
  }, a.getTicks = function (b) {
    return a._ticks - (b ? a._pausedTicks : 0);
  }, a._handleSynch = function () {
    a._timerId = null, a._setupTick(), a._getTime() - a._lastTime >= .97 * (a._interval - 1) && a._tick();
  }, a._handleRAF = function () {
    a._timerId = null, a._setupTick(), a._tick();
  }, a._handleTimeout = function () {
    a._timerId = null, a._setupTick(), a._tick();
  }, a._setupTick = function () {
    if (null == a._timerId) {
      var b = a.timingMode || a.useRAF && a.RAF_SYNCHED;if (b == a.RAF_SYNCHED || b == a.RAF) {
        var c = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;if (c) return a._timerId = c(b == a.RAF ? a._handleRAF : a._handleSynch), void (a._raf = !0);
      }a._raf = !1, a._timerId = setTimeout(a._handleTimeout, a._interval);
    }
  }, a._tick = function () {
    var b = a.paused,
        c = a._getTime(),
        d = c - a._lastTime;if (a._lastTime = c, a._ticks++, b && (a._pausedTicks++, a._pausedTime += d), a.hasEventListener("tick")) {
      var e = new createjs.Event("tick"),
          f = a.maxDelta;e.delta = f && d > f ? f : d, e.paused = b, e.time = c, e.runTime = c - a._pausedTime, a.dispatchEvent(e);
    }for (a._tickTimes.unshift(a._getTime() - c); a._tickTimes.length > 100;) a._tickTimes.pop();for (a._times.unshift(c); a._times.length > 100;) a._times.pop();
  };var c = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);a._getTime = function () {
    return (c && c.call(performance) || new Date().getTime()) - a._startTime;
  }, createjs.Ticker = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a() {
    throw "UID cannot be instantiated";
  }a._nextID = 0, a.get = function () {
    return a._nextID++;
  }, createjs.UID = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c, d, e, f, g, h, i, j, k) {
    this.Event_constructor(a, b, c), this.stageX = d, this.stageY = e, this.rawX = null == i ? d : i, this.rawY = null == j ? e : j, this.nativeEvent = f, this.pointerID = g, this.primary = !!h, this.relatedTarget = k;
  }var b = createjs.extend(a, createjs.Event);b._get_localX = function () {
    return this.currentTarget.globalToLocal(this.rawX, this.rawY).x;
  }, b._get_localY = function () {
    return this.currentTarget.globalToLocal(this.rawX, this.rawY).y;
  }, b._get_isTouch = function () {
    return -1 !== this.pointerID;
  };try {
    Object.defineProperties(b, { localX: { get: b._get_localX }, localY: { get: b._get_localY }, isTouch: { get: b._get_isTouch } });
  } catch (c) {}b.clone = function () {
    return new a(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY);
  }, b.toString = function () {
    return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]";
  }, createjs.MouseEvent = createjs.promote(a, "Event");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c, d, e, f) {
    this.setValues(a, b, c, d, e, f);
  }var b = a.prototype;a.DEG_TO_RAD = Math.PI / 180, a.identity = null, b.setValues = function (a, b, c, d, e, f) {
    return this.a = null == a ? 1 : a, this.b = b || 0, this.c = c || 0, this.d = null == d ? 1 : d, this.tx = e || 0, this.ty = f || 0, this;
  }, b.append = function (a, b, c, d, e, f) {
    var g = this.a,
        h = this.b,
        i = this.c,
        j = this.d;return (1 != a || 0 != b || 0 != c || 1 != d) && (this.a = g * a + i * b, this.b = h * a + j * b, this.c = g * c + i * d, this.d = h * c + j * d), this.tx = g * e + i * f + this.tx, this.ty = h * e + j * f + this.ty, this;
  }, b.prepend = function (a, b, c, d, e, f) {
    var g = this.a,
        h = this.c,
        i = this.tx;return this.a = a * g + c * this.b, this.b = b * g + d * this.b, this.c = a * h + c * this.d, this.d = b * h + d * this.d, this.tx = a * i + c * this.ty + e, this.ty = b * i + d * this.ty + f, this;
  }, b.appendMatrix = function (a) {
    return this.append(a.a, a.b, a.c, a.d, a.tx, a.ty);
  }, b.prependMatrix = function (a) {
    return this.prepend(a.a, a.b, a.c, a.d, a.tx, a.ty);
  }, b.appendTransform = function (b, c, d, e, f, g, h, i, j) {
    if (f % 360) var k = f * a.DEG_TO_RAD,
        l = Math.cos(k),
        m = Math.sin(k);else l = 1, m = 0;return g || h ? (g *= a.DEG_TO_RAD, h *= a.DEG_TO_RAD, this.append(Math.cos(h), Math.sin(h), -Math.sin(g), Math.cos(g), b, c), this.append(l * d, m * d, -m * e, l * e, 0, 0)) : this.append(l * d, m * d, -m * e, l * e, b, c), (i || j) && (this.tx -= i * this.a + j * this.c, this.ty -= i * this.b + j * this.d), this;
  }, b.prependTransform = function (b, c, d, e, f, g, h, i, j) {
    if (f % 360) var k = f * a.DEG_TO_RAD,
        l = Math.cos(k),
        m = Math.sin(k);else l = 1, m = 0;return (i || j) && (this.tx -= i, this.ty -= j), g || h ? (g *= a.DEG_TO_RAD, h *= a.DEG_TO_RAD, this.prepend(l * d, m * d, -m * e, l * e, 0, 0), this.prepend(Math.cos(h), Math.sin(h), -Math.sin(g), Math.cos(g), b, c)) : this.prepend(l * d, m * d, -m * e, l * e, b, c), this;
  }, b.rotate = function (b) {
    b *= a.DEG_TO_RAD;var c = Math.cos(b),
        d = Math.sin(b),
        e = this.a,
        f = this.b;return this.a = e * c + this.c * d, this.b = f * c + this.d * d, this.c = -e * d + this.c * c, this.d = -f * d + this.d * c, this;
  }, b.skew = function (b, c) {
    return b *= a.DEG_TO_RAD, c *= a.DEG_TO_RAD, this.append(Math.cos(c), Math.sin(c), -Math.sin(b), Math.cos(b), 0, 0), this;
  }, b.scale = function (a, b) {
    return this.a *= a, this.b *= a, this.c *= b, this.d *= b, this;
  }, b.translate = function (a, b) {
    return this.tx += this.a * a + this.c * b, this.ty += this.b * a + this.d * b, this;
  }, b.identity = function () {
    return this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0, this;
  }, b.invert = function () {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.tx,
        f = a * d - b * c;return this.a = d / f, this.b = -b / f, this.c = -c / f, this.d = a / f, this.tx = (c * this.ty - d * e) / f, this.ty = -(a * this.ty - b * e) / f, this;
  }, b.isIdentity = function () {
    return 0 === this.tx && 0 === this.ty && 1 === this.a && 0 === this.b && 0 === this.c && 1 === this.d;
  }, b.equals = function (a) {
    return this.tx === a.tx && this.ty === a.ty && this.a === a.a && this.b === a.b && this.c === a.c && this.d === a.d;
  }, b.transformPoint = function (a, b, c) {
    return c = c || {}, c.x = a * this.a + b * this.c + this.tx, c.y = a * this.b + b * this.d + this.ty, c;
  }, b.decompose = function (b) {
    null == b && (b = {}), b.x = this.tx, b.y = this.ty, b.scaleX = Math.sqrt(this.a * this.a + this.b * this.b), b.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);var c = Math.atan2(-this.c, this.d),
        d = Math.atan2(this.b, this.a),
        e = Math.abs(1 - c / d);return 1e-5 > e ? (b.rotation = d / a.DEG_TO_RAD, this.a < 0 && this.d >= 0 && (b.rotation += b.rotation <= 0 ? 180 : -180), b.skewX = b.skewY = 0) : (b.skewX = c / a.DEG_TO_RAD, b.skewY = d / a.DEG_TO_RAD), b;
  }, b.copy = function (a) {
    return this.setValues(a.a, a.b, a.c, a.d, a.tx, a.ty);
  }, b.clone = function () {
    return new a(this.a, this.b, this.c, this.d, this.tx, this.ty);
  }, b.toString = function () {
    return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]";
  }, a.identity = new a(), createjs.Matrix2D = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c, d, e) {
    this.setValues(a, b, c, d, e);
  }var b = a.prototype;b.setValues = function (a, b, c, d, e) {
    return this.visible = null == a ? !0 : !!a, this.alpha = null == b ? 1 : b, this.shadow = c, this.compositeOperation = d, this.matrix = e || this.matrix && this.matrix.identity() || new createjs.Matrix2D(), this;
  }, b.append = function (a, b, c, d, e) {
    return this.alpha *= b, this.shadow = c || this.shadow, this.compositeOperation = d || this.compositeOperation, this.visible = this.visible && a, e && this.matrix.appendMatrix(e), this;
  }, b.prepend = function (a, b, c, d, e) {
    return this.alpha *= b, this.shadow = this.shadow || c, this.compositeOperation = this.compositeOperation || d, this.visible = this.visible && a, e && this.matrix.prependMatrix(e), this;
  }, b.identity = function () {
    return this.visible = !0, this.alpha = 1, this.shadow = this.compositeOperation = null, this.matrix.identity(), this;
  }, b.clone = function () {
    return new a(this.alpha, this.shadow, this.compositeOperation, this.visible, this.matrix.clone());
  }, createjs.DisplayProps = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b) {
    this.setValues(a, b);
  }var b = a.prototype;b.setValues = function (a, b) {
    return this.x = a || 0, this.y = b || 0, this;
  }, b.copy = function (a) {
    return this.x = a.x, this.y = a.y, this;
  }, b.clone = function () {
    return new a(this.x, this.y);
  }, b.toString = function () {
    return "[Point (x=" + this.x + " y=" + this.y + ")]";
  }, createjs.Point = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c, d) {
    this.setValues(a, b, c, d);
  }var b = a.prototype;b.setValues = function (a, b, c, d) {
    return this.x = a || 0, this.y = b || 0, this.width = c || 0, this.height = d || 0, this;
  }, b.extend = function (a, b, c, d) {
    return c = c || 0, d = d || 0, a + c > this.x + this.width && (this.width = a + c - this.x), b + d > this.y + this.height && (this.height = b + d - this.y), a < this.x && (this.width += this.x - a, this.x = a), b < this.y && (this.height += this.y - b, this.y = b), this;
  }, b.pad = function (a, b, c, d) {
    return this.x -= b, this.y -= a, this.width += b + d, this.height += a + c, this;
  }, b.copy = function (a) {
    return this.setValues(a.x, a.y, a.width, a.height);
  }, b.contains = function (a, b, c, d) {
    return c = c || 0, d = d || 0, a >= this.x && a + c <= this.x + this.width && b >= this.y && b + d <= this.y + this.height;
  }, b.union = function (a) {
    return this.clone().extend(a.x, a.y, a.width, a.height);
  }, b.intersection = function (b) {
    var c = b.x,
        d = b.y,
        e = c + b.width,
        f = d + b.height;return this.x > c && (c = this.x), this.y > d && (d = this.y), this.x + this.width < e && (e = this.x + this.width), this.y + this.height < f && (f = this.y + this.height), c >= e || d >= f ? null : new a(c, d, e - c, f - d);
  }, b.intersects = function (a) {
    return a.x <= this.x + this.width && this.x <= a.x + a.width && a.y <= this.y + this.height && this.y <= a.y + a.height;
  }, b.isEmpty = function () {
    return this.width <= 0 || this.height <= 0;
  }, b.clone = function () {
    return new a(this.x, this.y, this.width, this.height);
  }, b.toString = function () {
    return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]";
  }, createjs.Rectangle = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c, d, e, f, g) {
    a.addEventListener && (this.target = a, this.overLabel = null == c ? "over" : c, this.outLabel = null == b ? "out" : b, this.downLabel = null == d ? "down" : d, this.play = e, this._isPressed = !1, this._isOver = !1, this._enabled = !1, a.mouseChildren = !1, this.enabled = !0, this.handleEvent({}), f && (g && (f.actionsEnabled = !1, f.gotoAndStop && f.gotoAndStop(g)), a.hitArea = f));
  }var b = a.prototype;b.setEnabled = function (a) {
    if (a != this._enabled) {
      var b = this.target;this._enabled = a, a ? (b.cursor = "pointer", b.addEventListener("rollover", this), b.addEventListener("rollout", this), b.addEventListener("mousedown", this), b.addEventListener("pressup", this), b._reset && (b.__reset = b._reset, b._reset = this._reset)) : (b.cursor = null, b.removeEventListener("rollover", this), b.removeEventListener("rollout", this), b.removeEventListener("mousedown", this), b.removeEventListener("pressup", this), b.__reset && (b._reset = b.__reset, delete b.__reset));
    }
  }, b.getEnabled = function () {
    return this._enabled;
  };try {
    Object.defineProperties(b, { enabled: { get: b.getEnabled, set: b.setEnabled } });
  } catch (c) {}b.toString = function () {
    return "[ButtonHelper]";
  }, b.handleEvent = function (a) {
    var b,
        c = this.target,
        d = a.type;"mousedown" == d ? (this._isPressed = !0, b = this.downLabel) : "pressup" == d ? (this._isPressed = !1, b = this._isOver ? this.overLabel : this.outLabel) : "rollover" == d ? (this._isOver = !0, b = this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1, b = this._isPressed ? this.overLabel : this.outLabel), this.play ? c.gotoAndPlay && c.gotoAndPlay(b) : c.gotoAndStop && c.gotoAndStop(b);
  }, b._reset = function () {
    var a = this.paused;this.__reset(), this.paused = a;
  }, createjs.ButtonHelper = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c, d) {
    this.color = a || "black", this.offsetX = b || 0, this.offsetY = c || 0, this.blur = d || 0;
  }var b = a.prototype;a.identity = new a("transparent", 0, 0, 0), b.toString = function () {
    return "[Shadow]";
  }, b.clone = function () {
    return new a(this.color, this.offsetX, this.offsetY, this.blur);
  }, createjs.Shadow = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a) {
    this.EventDispatcher_constructor(), this.complete = !0, this.framerate = 0, this._animations = null, this._frames = null, this._images = null, this._data = null, this._loadCount = 0, this._frameHeight = 0, this._frameWidth = 0, this._numFrames = 0, this._regX = 0, this._regY = 0, this._spacing = 0, this._margin = 0, this._parseData(a);
  }var b = createjs.extend(a, createjs.EventDispatcher);b.getAnimations = function () {
    return this._animations.slice();
  };try {
    Object.defineProperties(b, { animations: { get: b.getAnimations } });
  } catch (c) {}b.getNumFrames = function (a) {
    if (null == a) return this._frames ? this._frames.length : this._numFrames || 0;var b = this._data[a];return null == b ? 0 : b.frames.length;
  }, b.getAnimation = function (a) {
    return this._data[a];
  }, b.getFrame = function (a) {
    var b;return this._frames && (b = this._frames[a]) ? b : null;
  }, b.getFrameBounds = function (a, b) {
    var c = this.getFrame(a);return c ? (b || new createjs.Rectangle()).setValues(-c.regX, -c.regY, c.rect.width, c.rect.height) : null;
  }, b.toString = function () {
    return "[SpriteSheet]";
  }, b.clone = function () {
    throw "SpriteSheet cannot be cloned.";
  }, b._parseData = function (a) {
    var b, c, d, e;if (null != a) {
      if (this.framerate = a.framerate || 0, a.images && (c = a.images.length) > 0) for (e = this._images = [], b = 0; c > b; b++) {
        var f = a.images[b];if ("string" == typeof f) {
          var g = f;f = document.createElement("img"), f.src = g;
        }e.push(f), f.getContext || f.naturalWidth || (this._loadCount++, this.complete = !1, function (a, b) {
          f.onload = function () {
            a._handleImageLoad(b);
          };
        }(this, g), function (a, b) {
          f.onerror = function () {
            a._handleImageError(b);
          };
        }(this, g));
      }if (null == a.frames) ;else if (Array.isArray(a.frames)) for (this._frames = [], e = a.frames, b = 0, c = e.length; c > b; b++) {
        var h = e[b];this._frames.push({ image: this._images[h[4] ? h[4] : 0], rect: new createjs.Rectangle(h[0], h[1], h[2], h[3]), regX: h[5] || 0, regY: h[6] || 0 });
      } else d = a.frames, this._frameWidth = d.width, this._frameHeight = d.height, this._regX = d.regX || 0, this._regY = d.regY || 0, this._spacing = d.spacing || 0, this._margin = d.margin || 0, this._numFrames = d.count, 0 == this._loadCount && this._calculateFrames();if (this._animations = [], null != (d = a.animations)) {
        this._data = {};var i;for (i in d) {
          var j = { name: i },
              k = d[i];if ("number" == typeof k) e = j.frames = [k];else if (Array.isArray(k)) {
            if (1 == k.length) j.frames = [k[0]];else for (j.speed = k[3], j.next = k[2], e = j.frames = [], b = k[0]; b <= k[1]; b++) e.push(b);
          } else {
            j.speed = k.speed, j.next = k.next;var l = k.frames;e = j.frames = "number" == typeof l ? [l] : l.slice(0);
          }(j.next === !0 || void 0 === j.next) && (j.next = i), (j.next === !1 || e.length < 2 && j.next == i) && (j.next = null), j.speed || (j.speed = 1), this._animations.push(i), this._data[i] = j;
        }
      }
    }
  }, b._handleImageLoad = function () {
    0 == --this._loadCount && (this._calculateFrames(), this.complete = !0, this.dispatchEvent("complete"));
  }, b._handleImageError = function (a) {
    var b = new createjs.Event("error");b.src = a, this.dispatchEvent(b), 0 == --this._loadCount && this.dispatchEvent("complete");
  }, b._calculateFrames = function () {
    if (!this._frames && 0 != this._frameWidth) {
      this._frames = [];var a = this._numFrames || 1e5,
          b = 0,
          c = this._frameWidth,
          d = this._frameHeight,
          e = this._spacing,
          f = this._margin;a: for (var g = 0, h = this._images; g < h.length; g++) for (var i = h[g], j = i.width, k = i.height, l = f; k - f - d >= l;) {
        for (var m = f; j - f - c >= m;) {
          if (b >= a) break a;b++, this._frames.push({ image: i, rect: new createjs.Rectangle(m, l, c, d), regX: this._regX, regY: this._regY }), m += c + e;
        }l += d + e;
      }this._numFrames = b;
    }
  }, createjs.SpriteSheet = createjs.promote(a, "EventDispatcher");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a() {
    this.command = null, this._stroke = null, this._strokeStyle = null, this._oldStrokeStyle = null, this._strokeDash = null, this._oldStrokeDash = null, this._strokeIgnoreScale = !1, this._fill = null, this._instructions = [], this._commitIndex = 0, this._activeInstructions = [], this._dirty = !1, this._storeIndex = 0, this.clear();
  }var b = a.prototype,
      c = a;a.getRGB = function (a, b, c, d) {
    return null != a && null == c && (d = b, c = 255 & a, b = a >> 8 & 255, a = a >> 16 & 255), null == d ? "rgb(" + a + "," + b + "," + c + ")" : "rgba(" + a + "," + b + "," + c + "," + d + ")";
  }, a.getHSL = function (a, b, c, d) {
    return null == d ? "hsl(" + a % 360 + "," + b + "%," + c + "%)" : "hsla(" + a % 360 + "," + b + "%," + c + "%," + d + ")";
  }, a.BASE_64 = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9, K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25, a: 26, b: 27, c: 28, d: 29, e: 30, f: 31, g: 32, h: 33, i: 34, j: 35, k: 36, l: 37, m: 38, n: 39, o: 40, p: 41, q: 42, r: 43, s: 44, t: 45, u: 46, v: 47, w: 48, x: 49, y: 50, z: 51, 0: 52, 1: 53, 2: 54, 3: 55, 4: 56, 5: 57, 6: 58, 7: 59, 8: 60, 9: 61, "+": 62, "/": 63 }, a.STROKE_CAPS_MAP = ["butt", "round", "square"], a.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];var d = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");d.getContext && (a._ctx = d.getContext("2d"), d.width = d.height = 1), b.getInstructions = function () {
    return this._updateInstructions(), this._instructions;
  };try {
    Object.defineProperties(b, { instructions: { get: b.getInstructions } });
  } catch (e) {}b.isEmpty = function () {
    return !(this._instructions.length || this._activeInstructions.length);
  }, b.draw = function (a, b) {
    this._updateInstructions();for (var c = this._instructions, d = this._storeIndex, e = c.length; e > d; d++) c[d].exec(a, b);
  }, b.drawAsPath = function (a) {
    this._updateInstructions();for (var b, c = this._instructions, d = this._storeIndex, e = c.length; e > d; d++) (b = c[d]).path !== !1 && b.exec(a);
  }, b.moveTo = function (a, b) {
    return this.append(new c.MoveTo(a, b), !0);
  }, b.lineTo = function (a, b) {
    return this.append(new c.LineTo(a, b));
  }, b.arcTo = function (a, b, d, e, f) {
    return this.append(new c.ArcTo(a, b, d, e, f));
  }, b.arc = function (a, b, d, e, f, g) {
    return this.append(new c.Arc(a, b, d, e, f, g));
  }, b.quadraticCurveTo = function (a, b, d, e) {
    return this.append(new c.QuadraticCurveTo(a, b, d, e));
  }, b.bezierCurveTo = function (a, b, d, e, f, g) {
    return this.append(new c.BezierCurveTo(a, b, d, e, f, g));
  }, b.rect = function (a, b, d, e) {
    return this.append(new c.Rect(a, b, d, e));
  }, b.closePath = function () {
    return this._activeInstructions.length ? this.append(new c.ClosePath()) : this;
  }, b.clear = function () {
    return this._instructions.length = this._activeInstructions.length = this._commitIndex = 0, this._strokeStyle = this._oldStrokeStyle = this._stroke = this._fill = this._strokeDash = this._oldStrokeDash = null, this._dirty = this._strokeIgnoreScale = !1, this;
  }, b.beginFill = function (a) {
    return this._setFill(a ? new c.Fill(a) : null);
  }, b.beginLinearGradientFill = function (a, b, d, e, f, g) {
    return this._setFill(new c.Fill().linearGradient(a, b, d, e, f, g));
  }, b.beginRadialGradientFill = function (a, b, d, e, f, g, h, i) {
    return this._setFill(new c.Fill().radialGradient(a, b, d, e, f, g, h, i));
  }, b.beginBitmapFill = function (a, b, d) {
    return this._setFill(new c.Fill(null, d).bitmap(a, b));
  }, b.endFill = function () {
    return this.beginFill();
  }, b.setStrokeStyle = function (a, b, d, e, f) {
    return this._updateInstructions(!0), this._strokeStyle = this.command = new c.StrokeStyle(a, b, d, e, f), this._stroke && (this._stroke.ignoreScale = f), this._strokeIgnoreScale = f, this;
  }, b.setStrokeDash = function (a, b) {
    return this._updateInstructions(!0), this._strokeDash = this.command = new c.StrokeDash(a, b), this;
  }, b.beginStroke = function (a) {
    return this._setStroke(a ? new c.Stroke(a) : null);
  }, b.beginLinearGradientStroke = function (a, b, d, e, f, g) {
    return this._setStroke(new c.Stroke().linearGradient(a, b, d, e, f, g));
  }, b.beginRadialGradientStroke = function (a, b, d, e, f, g, h, i) {
    return this._setStroke(new c.Stroke().radialGradient(a, b, d, e, f, g, h, i));
  }, b.beginBitmapStroke = function (a, b) {
    return this._setStroke(new c.Stroke().bitmap(a, b));
  }, b.endStroke = function () {
    return this.beginStroke();
  }, b.curveTo = b.quadraticCurveTo, b.drawRect = b.rect, b.drawRoundRect = function (a, b, c, d, e) {
    return this.drawRoundRectComplex(a, b, c, d, e, e, e, e);
  }, b.drawRoundRectComplex = function (a, b, d, e, f, g, h, i) {
    return this.append(new c.RoundRect(a, b, d, e, f, g, h, i));
  }, b.drawCircle = function (a, b, d) {
    return this.append(new c.Circle(a, b, d));
  }, b.drawEllipse = function (a, b, d, e) {
    return this.append(new c.Ellipse(a, b, d, e));
  }, b.drawPolyStar = function (a, b, d, e, f, g) {
    return this.append(new c.PolyStar(a, b, d, e, f, g));
  }, b.append = function (a, b) {
    return this._activeInstructions.push(a), this.command = a, b || (this._dirty = !0), this;
  }, b.decodePath = function (b) {
    for (var c = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], d = [2, 2, 4, 6, 0], e = 0, f = b.length, g = [], h = 0, i = 0, j = a.BASE_64; f > e;) {
      var k = b.charAt(e),
          l = j[k],
          m = l >> 3,
          n = c[m];if (!n || 3 & l) throw "bad path data (@" + e + "): " + k;var o = d[m];m || (h = i = 0), g.length = 0, e++;for (var p = (l >> 2 & 1) + 2, q = 0; o > q; q++) {
        var r = j[b.charAt(e)],
            s = r >> 5 ? -1 : 1;r = (31 & r) << 6 | j[b.charAt(e + 1)], 3 == p && (r = r << 6 | j[b.charAt(e + 2)]), r = s * r / 10, q % 2 ? h = r += h : i = r += i, g[q] = r, e += p;
      }n.apply(this, g);
    }return this;
  }, b.store = function () {
    return this._updateInstructions(!0), this._storeIndex = this._instructions.length, this;
  }, b.unstore = function () {
    return this._storeIndex = 0, this;
  }, b.clone = function () {
    var b = new a();return b.command = this.command, b._stroke = this._stroke, b._strokeStyle = this._strokeStyle, b._strokeDash = this._strokeDash, b._strokeIgnoreScale = this._strokeIgnoreScale, b._fill = this._fill, b._instructions = this._instructions.slice(), b._commitIndex = this._commitIndex, b._activeInstructions = this._activeInstructions.slice(), b._dirty = this._dirty, b._storeIndex = this._storeIndex, b;
  }, b.toString = function () {
    return "[Graphics]";
  }, b.mt = b.moveTo, b.lt = b.lineTo, b.at = b.arcTo, b.bt = b.bezierCurveTo, b.qt = b.quadraticCurveTo, b.a = b.arc, b.r = b.rect, b.cp = b.closePath, b.c = b.clear, b.f = b.beginFill, b.lf = b.beginLinearGradientFill, b.rf = b.beginRadialGradientFill, b.bf = b.beginBitmapFill, b.ef = b.endFill, b.ss = b.setStrokeStyle, b.sd = b.setStrokeDash, b.s = b.beginStroke, b.ls = b.beginLinearGradientStroke, b.rs = b.beginRadialGradientStroke, b.bs = b.beginBitmapStroke, b.es = b.endStroke, b.dr = b.drawRect, b.rr = b.drawRoundRect, b.rc = b.drawRoundRectComplex, b.dc = b.drawCircle, b.de = b.drawEllipse, b.dp = b.drawPolyStar, b.p = b.decodePath, b._updateInstructions = function (b) {
    var c = this._instructions,
        d = this._activeInstructions,
        e = this._commitIndex;if (this._dirty && d.length) {
      c.length = e, c.push(a.beginCmd);var f = d.length,
          g = c.length;c.length = g + f;for (var h = 0; f > h; h++) c[h + g] = d[h];this._fill && c.push(this._fill), this._stroke && (this._strokeDash !== this._oldStrokeDash && (this._oldStrokeDash = this._strokeDash, c.push(this._strokeDash)), this._strokeStyle !== this._oldStrokeStyle && (this._oldStrokeStyle = this._strokeStyle, c.push(this._strokeStyle)), c.push(this._stroke)), this._dirty = !1;
    }b && (d.length = 0, this._commitIndex = c.length);
  }, b._setFill = function (a) {
    return this._updateInstructions(!0), this.command = this._fill = a, this;
  }, b._setStroke = function (a) {
    return this._updateInstructions(!0), (this.command = this._stroke = a) && (a.ignoreScale = this._strokeIgnoreScale), this;
  }, (c.LineTo = function (a, b) {
    this.x = a, this.y = b;
  }).prototype.exec = function (a) {
    a.lineTo(this.x, this.y);
  }, (c.MoveTo = function (a, b) {
    this.x = a, this.y = b;
  }).prototype.exec = function (a) {
    a.moveTo(this.x, this.y);
  }, (c.ArcTo = function (a, b, c, d, e) {
    this.x1 = a, this.y1 = b, this.x2 = c, this.y2 = d, this.radius = e;
  }).prototype.exec = function (a) {
    a.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
  }, (c.Arc = function (a, b, c, d, e, f) {
    this.x = a, this.y = b, this.radius = c, this.startAngle = d, this.endAngle = e, this.anticlockwise = !!f;
  }).prototype.exec = function (a) {
    a.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
  }, (c.QuadraticCurveTo = function (a, b, c, d) {
    this.cpx = a, this.cpy = b, this.x = c, this.y = d;
  }).prototype.exec = function (a) {
    a.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y);
  }, (c.BezierCurveTo = function (a, b, c, d, e, f) {
    this.cp1x = a, this.cp1y = b, this.cp2x = c, this.cp2y = d, this.x = e, this.y = f;
  }).prototype.exec = function (a) {
    a.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y);
  }, (c.Rect = function (a, b, c, d) {
    this.x = a, this.y = b, this.w = c, this.h = d;
  }).prototype.exec = function (a) {
    a.rect(this.x, this.y, this.w, this.h);
  }, (c.ClosePath = function () {}).prototype.exec = function (a) {
    a.closePath();
  }, (c.BeginPath = function () {}).prototype.exec = function (a) {
    a.beginPath();
  }, b = (c.Fill = function (a, b) {
    this.style = a, this.matrix = b;
  }).prototype, b.exec = function (a) {
    if (this.style) {
      a.fillStyle = this.style;var b = this.matrix;b && (a.save(), a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty)), a.fill(), b && a.restore();
    }
  }, b.linearGradient = function (b, c, d, e, f, g) {
    for (var h = this.style = a._ctx.createLinearGradient(d, e, f, g), i = 0, j = b.length; j > i; i++) h.addColorStop(c[i], b[i]);return h.props = { colors: b, ratios: c, x0: d, y0: e, x1: f, y1: g, type: "linear" }, this;
  }, b.radialGradient = function (b, c, d, e, f, g, h, i) {
    for (var j = this.style = a._ctx.createRadialGradient(d, e, f, g, h, i), k = 0, l = b.length; l > k; k++) j.addColorStop(c[k], b[k]);return j.props = { colors: b, ratios: c, x0: d, y0: e, r0: f, x1: g, y1: h, r1: i, type: "radial" }, this;
  }, b.bitmap = function (b, c) {
    if (b.naturalWidth || b.getContext || b.readyState >= 2) {
      var d = this.style = a._ctx.createPattern(b, c || "");d.props = { image: b, repetition: c, type: "bitmap" };
    }return this;
  }, b.path = !1, b = (c.Stroke = function (a, b) {
    this.style = a, this.ignoreScale = b;
  }).prototype, b.exec = function (a) {
    this.style && (a.strokeStyle = this.style, this.ignoreScale && (a.save(), a.setTransform(1, 0, 0, 1, 0, 0)), a.stroke(), this.ignoreScale && a.restore());
  }, b.linearGradient = c.Fill.prototype.linearGradient, b.radialGradient = c.Fill.prototype.radialGradient, b.bitmap = c.Fill.prototype.bitmap, b.path = !1, b = (c.StrokeStyle = function (a, b, c, d, e) {
    this.width = a, this.caps = b, this.joints = c, this.miterLimit = d, this.ignoreScale = e;
  }).prototype, b.exec = function (b) {
    b.lineWidth = null == this.width ? "1" : this.width, b.lineCap = null == this.caps ? "butt" : isNaN(this.caps) ? this.caps : a.STROKE_CAPS_MAP[this.caps], b.lineJoin = null == this.joints ? "miter" : isNaN(this.joints) ? this.joints : a.STROKE_JOINTS_MAP[this.joints], b.miterLimit = null == this.miterLimit ? "10" : this.miterLimit, b.ignoreScale = null == this.ignoreScale ? !1 : this.ignoreScale;
  }, b.path = !1, (c.StrokeDash = function (a, b) {
    this.segments = a, this.offset = b || 0;
  }).prototype.exec = function (a) {
    a.setLineDash && (a.setLineDash(this.segments || c.StrokeDash.EMPTY_SEGMENTS), a.lineDashOffset = this.offset || 0);
  }, c.StrokeDash.EMPTY_SEGMENTS = [], (c.RoundRect = function (a, b, c, d, e, f, g, h) {
    this.x = a, this.y = b, this.w = c, this.h = d, this.radiusTL = e, this.radiusTR = f, this.radiusBR = g, this.radiusBL = h;
  }).prototype.exec = function (a) {
    var b = (j > i ? i : j) / 2,
        c = 0,
        d = 0,
        e = 0,
        f = 0,
        g = this.x,
        h = this.y,
        i = this.w,
        j = this.h,
        k = this.radiusTL,
        l = this.radiusTR,
        m = this.radiusBR,
        n = this.radiusBL;0 > k && (k *= c = -1), k > b && (k = b), 0 > l && (l *= d = -1), l > b && (l = b), 0 > m && (m *= e = -1), m > b && (m = b), 0 > n && (n *= f = -1), n > b && (n = b), a.moveTo(g + i - l, h), a.arcTo(g + i + l * d, h - l * d, g + i, h + l, l), a.lineTo(g + i, h + j - m), a.arcTo(g + i + m * e, h + j + m * e, g + i - m, h + j, m), a.lineTo(g + n, h + j), a.arcTo(g - n * f, h + j + n * f, g, h + j - n, n), a.lineTo(g, h + k), a.arcTo(g - k * c, h - k * c, g + k, h, k), a.closePath();
  }, (c.Circle = function (a, b, c) {
    this.x = a, this.y = b, this.radius = c;
  }).prototype.exec = function (a) {
    a.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  }, (c.Ellipse = function (a, b, c, d) {
    this.x = a, this.y = b, this.w = c, this.h = d;
  }).prototype.exec = function (a) {
    var b = this.x,
        c = this.y,
        d = this.w,
        e = this.h,
        f = .5522848,
        g = d / 2 * f,
        h = e / 2 * f,
        i = b + d,
        j = c + e,
        k = b + d / 2,
        l = c + e / 2;a.moveTo(b, l), a.bezierCurveTo(b, l - h, k - g, c, k, c), a.bezierCurveTo(k + g, c, i, l - h, i, l), a.bezierCurveTo(i, l + h, k + g, j, k, j), a.bezierCurveTo(k - g, j, b, l + h, b, l);
  }, (c.PolyStar = function (a, b, c, d, e, f) {
    this.x = a, this.y = b, this.radius = c, this.sides = d, this.pointSize = e, this.angle = f;
  }).prototype.exec = function (a) {
    var b = this.x,
        c = this.y,
        d = this.radius,
        e = (this.angle || 0) / 180 * Math.PI,
        f = this.sides,
        g = 1 - (this.pointSize || 0),
        h = Math.PI / f;a.moveTo(b + Math.cos(e) * d, c + Math.sin(e) * d);for (var i = 0; f > i; i++) e += h, 1 != g && a.lineTo(b + Math.cos(e) * d * g, c + Math.sin(e) * d * g), e += h, a.lineTo(b + Math.cos(e) * d, c + Math.sin(e) * d);a.closePath();
  }, a.beginCmd = new c.BeginPath(), createjs.Graphics = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a() {
    this.EventDispatcher_constructor(), this.alpha = 1, this.cacheCanvas = null, this.cacheID = 0, this.id = createjs.UID.get(), this.mouseEnabled = !0, this.tickEnabled = !0, this.name = null, this.parent = null, this.regX = 0, this.regY = 0, this.rotation = 0, this.scaleX = 1, this.scaleY = 1, this.skewX = 0, this.skewY = 0, this.shadow = null, this.visible = !0, this.x = 0, this.y = 0, this.transformMatrix = null, this.compositeOperation = null, this.snapToPixel = !0, this.filters = null, this.mask = null, this.hitArea = null, this.cursor = null, this._cacheOffsetX = 0, this._cacheOffsetY = 0, this._filterOffsetX = 0, this._filterOffsetY = 0, this._cacheScale = 1, this._cacheDataURLID = 0, this._cacheDataURL = null, this._props = new createjs.DisplayProps(), this._rectangle = new createjs.Rectangle(), this._bounds = null;
  }var b = createjs.extend(a, createjs.EventDispatcher);a._MOUSE_EVENTS = ["click", "dblclick", "mousedown", "mouseout", "mouseover", "pressmove", "pressup", "rollout", "rollover"], a.suppressCrossDomainErrors = !1, a._snapToPixelEnabled = !1;var c = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");c.getContext && (a._hitTestCanvas = c, a._hitTestContext = c.getContext("2d"), c.width = c.height = 1), a._nextCacheID = 1, b.getStage = function () {
    for (var a = this, b = createjs.Stage; a.parent;) a = a.parent;return a instanceof b ? a : null;
  };try {
    Object.defineProperties(b, { stage: { get: b.getStage } });
  } catch (d) {}b.isVisible = function () {
    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY);
  }, b.draw = function (a, b) {
    var c = this.cacheCanvas;if (b || !c) return !1;var d = this._cacheScale;return a.drawImage(c, this._cacheOffsetX + this._filterOffsetX, this._cacheOffsetY + this._filterOffsetY, c.width / d, c.height / d), !0;
  }, b.updateContext = function (b) {
    var c = this,
        d = c.mask,
        e = c._props.matrix;d && d.graphics && !d.graphics.isEmpty() && (d.getMatrix(e), b.transform(e.a, e.b, e.c, e.d, e.tx, e.ty), d.graphics.drawAsPath(b), b.clip(), e.invert(), b.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)), this.getMatrix(e);var f = e.tx,
        g = e.ty;a._snapToPixelEnabled && c.snapToPixel && (f = f + (0 > f ? -.5 : .5) | 0, g = g + (0 > g ? -.5 : .5) | 0), b.transform(e.a, e.b, e.c, e.d, f, g), b.globalAlpha *= c.alpha, c.compositeOperation && (b.globalCompositeOperation = c.compositeOperation), c.shadow && this._applyShadow(b, c.shadow);
  }, b.cache = function (a, b, c, d, e) {
    e = e || 1, this.cacheCanvas || (this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")), this._cacheWidth = c, this._cacheHeight = d, this._cacheOffsetX = a, this._cacheOffsetY = b, this._cacheScale = e, this.updateCache();
  }, b.updateCache = function (b) {
    var c = this.cacheCanvas;if (!c) throw "cache() must be called before updateCache()";var d = this._cacheScale,
        e = this._cacheOffsetX * d,
        f = this._cacheOffsetY * d,
        g = this._cacheWidth,
        h = this._cacheHeight,
        i = c.getContext("2d"),
        j = this._getFilterBounds();e += this._filterOffsetX = j.x, f += this._filterOffsetY = j.y, g = Math.ceil(g * d) + j.width, h = Math.ceil(h * d) + j.height, g != c.width || h != c.height ? (c.width = g, c.height = h) : b || i.clearRect(0, 0, g + 1, h + 1), i.save(), i.globalCompositeOperation = b, i.setTransform(d, 0, 0, d, -e, -f), this.draw(i, !0), this._applyFilters(), i.restore(), this.cacheID = a._nextCacheID++;
  }, b.uncache = function () {
    this._cacheDataURL = this.cacheCanvas = null, this.cacheID = this._cacheOffsetX = this._cacheOffsetY = this._filterOffsetX = this._filterOffsetY = 0, this._cacheScale = 1;
  }, b.getCacheDataURL = function () {
    return this.cacheCanvas ? (this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL()), this._cacheDataURL) : null;
  }, b.localToGlobal = function (a, b, c) {
    return this.getConcatenatedMatrix(this._props.matrix).transformPoint(a, b, c || new createjs.Point());
  }, b.globalToLocal = function (a, b, c) {
    return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(a, b, c || new createjs.Point());
  }, b.localToLocal = function (a, b, c, d) {
    return d = this.localToGlobal(a, b, d), c.globalToLocal(d.x, d.y, d);
  }, b.setTransform = function (a, b, c, d, e, f, g, h, i) {
    return this.x = a || 0, this.y = b || 0, this.scaleX = null == c ? 1 : c, this.scaleY = null == d ? 1 : d, this.rotation = e || 0, this.skewX = f || 0, this.skewY = g || 0, this.regX = h || 0, this.regY = i || 0, this;
  }, b.getMatrix = function (a) {
    var b = this,
        c = a && a.identity() || new createjs.Matrix2D();return b.transformMatrix ? c.copy(b.transformMatrix) : c.appendTransform(b.x, b.y, b.scaleX, b.scaleY, b.rotation, b.skewX, b.skewY, b.regX, b.regY);
  }, b.getConcatenatedMatrix = function (a) {
    for (var b = this, c = this.getMatrix(a); b = b.parent;) c.prependMatrix(b.getMatrix(b._props.matrix));return c;
  }, b.getConcatenatedDisplayProps = function (a) {
    a = a ? a.identity() : new createjs.DisplayProps();var b = this,
        c = b.getMatrix(a.matrix);do a.prepend(b.visible, b.alpha, b.shadow, b.compositeOperation), b != this && c.prependMatrix(b.getMatrix(b._props.matrix)); while (b = b.parent);return a;
  }, b.hitTest = function (b, c) {
    var d = a._hitTestContext;d.setTransform(1, 0, 0, 1, -b, -c), this.draw(d);var e = this._testHit(d);return d.setTransform(1, 0, 0, 1, 0, 0), d.clearRect(0, 0, 2, 2), e;
  }, b.set = function (a) {
    for (var b in a) this[b] = a[b];return this;
  }, b.getBounds = function () {
    if (this._bounds) return this._rectangle.copy(this._bounds);var a = this.cacheCanvas;if (a) {
      var b = this._cacheScale;return this._rectangle.setValues(this._cacheOffsetX, this._cacheOffsetY, a.width / b, a.height / b);
    }return null;
  }, b.getTransformedBounds = function () {
    return this._getBounds();
  }, b.setBounds = function (a, b, c, d) {
    null == a && (this._bounds = a), this._bounds = (this._bounds || new createjs.Rectangle()).setValues(a, b, c, d);
  }, b.clone = function () {
    return this._cloneProps(new a());
  }, b.toString = function () {
    return "[DisplayObject (name=" + this.name + ")]";
  }, b._cloneProps = function (a) {
    return a.alpha = this.alpha, a.mouseEnabled = this.mouseEnabled, a.tickEnabled = this.tickEnabled, a.name = this.name, a.regX = this.regX, a.regY = this.regY, a.rotation = this.rotation, a.scaleX = this.scaleX, a.scaleY = this.scaleY, a.shadow = this.shadow, a.skewX = this.skewX, a.skewY = this.skewY, a.visible = this.visible, a.x = this.x, a.y = this.y, a.compositeOperation = this.compositeOperation, a.snapToPixel = this.snapToPixel, a.filters = null == this.filters ? null : this.filters.slice(0), a.mask = this.mask, a.hitArea = this.hitArea, a.cursor = this.cursor, a._bounds = this._bounds, a;
  }, b._applyShadow = function (a, b) {
    b = b || Shadow.identity, a.shadowColor = b.color, a.shadowOffsetX = b.offsetX, a.shadowOffsetY = b.offsetY, a.shadowBlur = b.blur;
  }, b._tick = function (a) {
    var b = this._listeners;b && b.tick && (a.target = null, a.propagationStopped = a.immediatePropagationStopped = !1, this.dispatchEvent(a));
  }, b._testHit = function (b) {
    try {
      var c = b.getImageData(0, 0, 1, 1).data[3] > 1;
    } catch (d) {
      if (!a.suppressCrossDomainErrors) throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
    }return c;
  }, b._applyFilters = function () {
    if (this.filters && 0 != this.filters.length && this.cacheCanvas) for (var a = this.filters.length, b = this.cacheCanvas.getContext("2d"), c = this.cacheCanvas.width, d = this.cacheCanvas.height, e = 0; a > e; e++) this.filters[e].applyFilter(b, 0, 0, c, d);
  }, b._getFilterBounds = function () {
    var a,
        b = this.filters,
        c = this._rectangle.setValues(0, 0, 0, 0);if (!b || !(a = b.length)) return c;for (var d = 0; a > d; d++) {
      var e = this.filters[d];e.getBounds && e.getBounds(c);
    }return c;
  }, b._getBounds = function (a, b) {
    return this._transformBounds(this.getBounds(), a, b);
  }, b._transformBounds = function (a, b, c) {
    if (!a) return a;var d = a.x,
        e = a.y,
        f = a.width,
        g = a.height,
        h = this._props.matrix;h = c ? h.identity() : this.getMatrix(h), (d || e) && h.appendTransform(0, 0, 1, 1, 0, 0, 0, -d, -e), b && h.prependMatrix(b);var i = f * h.a,
        j = f * h.b,
        k = g * h.c,
        l = g * h.d,
        m = h.tx,
        n = h.ty,
        o = m,
        p = m,
        q = n,
        r = n;return (d = i + m) < o ? o = d : d > p && (p = d), (d = i + k + m) < o ? o = d : d > p && (p = d), (d = k + m) < o ? o = d : d > p && (p = d), (e = j + n) < q ? q = e : e > r && (r = e), (e = j + l + n) < q ? q = e : e > r && (r = e), (e = l + n) < q ? q = e : e > r && (r = e), a.setValues(o, q, p - o, r - q);
  }, b._hasMouseEventListener = function () {
    for (var b = a._MOUSE_EVENTS, c = 0, d = b.length; d > c; c++) if (this.hasEventListener(b[c])) return !0;return !!this.cursor;
  }, createjs.DisplayObject = createjs.promote(a, "EventDispatcher");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a() {
    this.DisplayObject_constructor(), this.children = [], this.mouseChildren = !0, this.tickChildren = !0;
  }var b = createjs.extend(a, createjs.DisplayObject);b.getNumChildren = function () {
    return this.children.length;
  };try {
    Object.defineProperties(b, { numChildren: { get: b.getNumChildren } });
  } catch (c) {}b.initialize = a, b.isVisible = function () {
    var a = this.cacheCanvas || this.children.length;return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && a);
  }, b.draw = function (a, b) {
    if (this.DisplayObject_draw(a, b)) return !0;for (var c = this.children.slice(), d = 0, e = c.length; e > d; d++) {
      var f = c[d];f.isVisible() && (a.save(), f.updateContext(a), f.draw(a), a.restore());
    }return !0;
  }, b.addChild = function (a) {
    if (null == a) return a;var b = arguments.length;if (b > 1) {
      for (var c = 0; b > c; c++) this.addChild(arguments[c]);return arguments[b - 1];
    }return a.parent && a.parent.removeChild(a), a.parent = this, this.children.push(a), a.dispatchEvent("added"), a;
  }, b.addChildAt = function (a, b) {
    var c = arguments.length,
        d = arguments[c - 1];if (0 > d || d > this.children.length) return arguments[c - 2];if (c > 2) {
      for (var e = 0; c - 1 > e; e++) this.addChildAt(arguments[e], d + e);return arguments[c - 2];
    }return a.parent && a.parent.removeChild(a), a.parent = this, this.children.splice(b, 0, a), a.dispatchEvent("added"), a;
  }, b.removeChild = function (a) {
    var b = arguments.length;if (b > 1) {
      for (var c = !0, d = 0; b > d; d++) c = c && this.removeChild(arguments[d]);return c;
    }return this.removeChildAt(createjs.indexOf(this.children, a));
  }, b.removeChildAt = function (a) {
    var b = arguments.length;if (b > 1) {
      for (var c = [], d = 0; b > d; d++) c[d] = arguments[d];c.sort(function (a, b) {
        return b - a;
      });for (var e = !0, d = 0; b > d; d++) e = e && this.removeChildAt(c[d]);return e;
    }if (0 > a || a > this.children.length - 1) return !1;var f = this.children[a];return f && (f.parent = null), this.children.splice(a, 1), f.dispatchEvent("removed"), !0;
  }, b.removeAllChildren = function () {
    for (var a = this.children; a.length;) this.removeChildAt(0);
  }, b.getChildAt = function (a) {
    return this.children[a];
  }, b.getChildByName = function (a) {
    for (var b = this.children, c = 0, d = b.length; d > c; c++) if (b[c].name == a) return b[c];return null;
  }, b.sortChildren = function (a) {
    this.children.sort(a);
  }, b.getChildIndex = function (a) {
    return createjs.indexOf(this.children, a);
  }, b.swapChildrenAt = function (a, b) {
    var c = this.children,
        d = c[a],
        e = c[b];d && e && (c[a] = e, c[b] = d);
  }, b.swapChildren = function (a, b) {
    for (var c, d, e = this.children, f = 0, g = e.length; g > f && (e[f] == a && (c = f), e[f] == b && (d = f), null == c || null == d); f++);f != g && (e[c] = b, e[d] = a);
  }, b.setChildIndex = function (a, b) {
    var c = this.children,
        d = c.length;if (!(a.parent != this || 0 > b || b >= d)) {
      for (var e = 0; d > e && c[e] != a; e++);e != d && e != b && (c.splice(e, 1), c.splice(b, 0, a));
    }
  }, b.contains = function (a) {
    for (; a;) {
      if (a == this) return !0;a = a.parent;
    }return !1;
  }, b.hitTest = function (a, b) {
    return null != this.getObjectUnderPoint(a, b);
  }, b.getObjectsUnderPoint = function (a, b, c) {
    var d = [],
        e = this.localToGlobal(a, b);return this._getObjectsUnderPoint(e.x, e.y, d, c > 0, 1 == c), d;
  }, b.getObjectUnderPoint = function (a, b, c) {
    var d = this.localToGlobal(a, b);return this._getObjectsUnderPoint(d.x, d.y, null, c > 0, 1 == c);
  }, b.getBounds = function () {
    return this._getBounds(null, !0);
  }, b.getTransformedBounds = function () {
    return this._getBounds();
  }, b.clone = function (b) {
    var c = this._cloneProps(new a());return b && this._cloneChildren(c), c;
  }, b.toString = function () {
    return "[Container (name=" + this.name + ")]";
  }, b._tick = function (a) {
    if (this.tickChildren) for (var b = this.children.length - 1; b >= 0; b--) {
      var c = this.children[b];c.tickEnabled && c._tick && c._tick(a);
    }this.DisplayObject__tick(a);
  }, b._cloneChildren = function (a) {
    a.children.length && a.removeAllChildren();for (var b = a.children, c = 0, d = this.children.length; d > c; c++) {
      var e = this.children[c].clone(!0);e.parent = a, b.push(e);
    }
  }, b._getObjectsUnderPoint = function (b, c, d, e, f, g) {
    if (g = g || 0, !g && !this._testMask(this, b, c)) return null;var h,
        i = createjs.DisplayObject._hitTestContext;f = f || e && this._hasMouseEventListener();for (var j = this.children, k = j.length, l = k - 1; l >= 0; l--) {
      var m = j[l],
          n = m.hitArea;if (m.visible && (n || m.isVisible()) && (!e || m.mouseEnabled) && (n || this._testMask(m, b, c))) if (!n && m instanceof a) {
        var o = m._getObjectsUnderPoint(b, c, d, e, f, g + 1);if (!d && o) return e && !this.mouseChildren ? this : o;
      } else {
        if (e && !f && !m._hasMouseEventListener()) continue;var p = m.getConcatenatedDisplayProps(m._props);if (h = p.matrix, n && (h.appendMatrix(n.getMatrix(n._props.matrix)), p.alpha = n.alpha), i.globalAlpha = p.alpha, i.setTransform(h.a, h.b, h.c, h.d, h.tx - b, h.ty - c), (n || m).draw(i), !this._testHit(i)) continue;if (i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, 2, 2), !d) return e && !this.mouseChildren ? this : m;d.push(m);
      }
    }return null;
  }, b._testMask = function (a, b, c) {
    var d = a.mask;if (!d || !d.graphics || d.graphics.isEmpty()) return !0;var e = this._props.matrix,
        f = a.parent;e = f ? f.getConcatenatedMatrix(e) : e.identity(), e = d.getMatrix(d._props.matrix).prependMatrix(e);var g = createjs.DisplayObject._hitTestContext;return g.setTransform(e.a, e.b, e.c, e.d, e.tx - b, e.ty - c), d.graphics.drawAsPath(g), g.fillStyle = "#000", g.fill(), this._testHit(g) ? (g.setTransform(1, 0, 0, 1, 0, 0), g.clearRect(0, 0, 2, 2), !0) : !1;
  }, b._getBounds = function (a, b) {
    var c = this.DisplayObject_getBounds();if (c) return this._transformBounds(c, a, b);var d = this._props.matrix;d = b ? d.identity() : this.getMatrix(d), a && d.prependMatrix(a);for (var e = this.children.length, f = null, g = 0; e > g; g++) {
      var h = this.children[g];h.visible && (c = h._getBounds(d)) && (f ? f.extend(c.x, c.y, c.width, c.height) : f = c.clone());
    }return f;
  }, createjs.Container = createjs.promote(a, "DisplayObject");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a) {
    this.Container_constructor(), this.autoClear = !0, this.canvas = "string" == typeof a ? document.getElementById(a) : a, this.mouseX = 0, this.mouseY = 0, this.drawRect = null, this.snapToPixelEnabled = !1, this.mouseInBounds = !1, this.tickOnUpdate = !0, this.mouseMoveOutside = !1, this.preventSelection = !0, this._pointerData = {}, this._pointerCount = 0, this._primaryPointerID = null, this._mouseOverIntervalID = null, this._nextStage = null, this._prevStage = null, this.enableDOMEvents(!0);
  }var b = createjs.extend(a, createjs.Container);b._get_nextStage = function () {
    return this._nextStage;
  }, b._set_nextStage = function (a) {
    this._nextStage && (this._nextStage._prevStage = null), a && (a._prevStage = this), this._nextStage = a;
  };try {
    Object.defineProperties(b, { nextStage: { get: b._get_nextStage, set: b._set_nextStage } });
  } catch (c) {}b.update = function (a) {
    if (this.canvas && (this.tickOnUpdate && this.tick(a), this.dispatchEvent("drawstart", !1, !0) !== !1)) {
      createjs.DisplayObject._snapToPixelEnabled = this.snapToPixelEnabled;var b = this.drawRect,
          c = this.canvas.getContext("2d");c.setTransform(1, 0, 0, 1, 0, 0), this.autoClear && (b ? c.clearRect(b.x, b.y, b.width, b.height) : c.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)), c.save(), this.drawRect && (c.beginPath(), c.rect(b.x, b.y, b.width, b.height), c.clip()), this.updateContext(c), this.draw(c, !1), c.restore(), this.dispatchEvent("drawend");
    }
  }, b.tick = function (a) {
    if (this.tickEnabled && this.dispatchEvent("tickstart", !1, !0) !== !1) {
      var b = new createjs.Event("tick");if (a) for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);this._tick(b), this.dispatchEvent("tickend");
    }
  }, b.handleEvent = function (a) {
    "tick" == a.type && this.update(a);
  }, b.clear = function () {
    if (this.canvas) {
      var a = this.canvas.getContext("2d");a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1);
    }
  }, b.toDataURL = function (a, b) {
    var c,
        d = this.canvas.getContext("2d"),
        e = this.canvas.width,
        f = this.canvas.height;if (a) {
      c = d.getImageData(0, 0, e, f);var g = d.globalCompositeOperation;d.globalCompositeOperation = "destination-over", d.fillStyle = a, d.fillRect(0, 0, e, f);
    }var h = this.canvas.toDataURL(b || "image/png");return a && (d.putImageData(c, 0, 0), d.globalCompositeOperation = g), h;
  }, b.enableMouseOver = function (a) {
    if (this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID), this._mouseOverIntervalID = null, 0 == a && this._testMouseOver(!0)), null == a) a = 20;else if (0 >= a) return;var b = this;this._mouseOverIntervalID = setInterval(function () {
      b._testMouseOver();
    }, 1e3 / Math.min(50, a));
  }, b.enableDOMEvents = function (a) {
    null == a && (a = !0);var b,
        c,
        d = this._eventListeners;if (!a && d) {
      for (b in d) c = d[b], c.t.removeEventListener(b, c.f, !1);this._eventListeners = null;
    } else if (a && !d && this.canvas) {
      var e = window.addEventListener ? window : document,
          f = this;d = this._eventListeners = {}, d.mouseup = { t: e, f: function (a) {
          f._handleMouseUp(a);
        } }, d.mousemove = { t: e, f: function (a) {
          f._handleMouseMove(a);
        } }, d.dblclick = { t: this.canvas, f: function (a) {
          f._handleDoubleClick(a);
        } }, d.mousedown = { t: this.canvas, f: function (a) {
          f._handleMouseDown(a);
        } };for (b in d) c = d[b], c.t.addEventListener(b, c.f, !1);
    }
  }, b.clone = function () {
    throw "Stage cannot be cloned.";
  }, b.toString = function () {
    return "[Stage (name=" + this.name + ")]";
  }, b._getElementRect = function (a) {
    var b;try {
      b = a.getBoundingClientRect();
    } catch (c) {
      b = { top: a.offsetTop, left: a.offsetLeft, width: a.offsetWidth, height: a.offsetHeight };
    }var d = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0),
        e = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0),
        f = window.getComputedStyle ? getComputedStyle(a, null) : a.currentStyle,
        g = parseInt(f.paddingLeft) + parseInt(f.borderLeftWidth),
        h = parseInt(f.paddingTop) + parseInt(f.borderTopWidth),
        i = parseInt(f.paddingRight) + parseInt(f.borderRightWidth),
        j = parseInt(f.paddingBottom) + parseInt(f.borderBottomWidth);return { left: b.left + d + g, right: b.right + d - i, top: b.top + e + h, bottom: b.bottom + e - j };
  }, b._getPointerData = function (a) {
    var b = this._pointerData[a];return b || (b = this._pointerData[a] = { x: 0, y: 0 }), b;
  }, b._handleMouseMove = function (a) {
    a || (a = window.event), this._handlePointerMove(-1, a, a.pageX, a.pageY);
  }, b._handlePointerMove = function (a, b, c, d, e) {
    if ((!this._prevStage || void 0 !== e) && this.canvas) {
      var f = this._nextStage,
          g = this._getPointerData(a),
          h = g.inBounds;this._updatePointerPosition(a, b, c, d), (h || g.inBounds || this.mouseMoveOutside) && (-1 === a && g.inBounds == !h && this._dispatchMouseEvent(this, h ? "mouseleave" : "mouseenter", !1, a, g, b), this._dispatchMouseEvent(this, "stagemousemove", !1, a, g, b), this._dispatchMouseEvent(g.target, "pressmove", !0, a, g, b)), f && f._handlePointerMove(a, b, c, d, null);
    }
  }, b._updatePointerPosition = function (a, b, c, d) {
    var e = this._getElementRect(this.canvas);c -= e.left, d -= e.top;var f = this.canvas.width,
        g = this.canvas.height;c /= (e.right - e.left) / f, d /= (e.bottom - e.top) / g;var h = this._getPointerData(a);(h.inBounds = c >= 0 && d >= 0 && f - 1 >= c && g - 1 >= d) ? (h.x = c, h.y = d) : this.mouseMoveOutside && (h.x = 0 > c ? 0 : c > f - 1 ? f - 1 : c, h.y = 0 > d ? 0 : d > g - 1 ? g - 1 : d), h.posEvtObj = b, h.rawX = c, h.rawY = d, (a === this._primaryPointerID || -1 === a) && (this.mouseX = h.x, this.mouseY = h.y, this.mouseInBounds = h.inBounds);
  }, b._handleMouseUp = function (a) {
    this._handlePointerUp(-1, a, !1);
  }, b._handlePointerUp = function (a, b, c, d) {
    var e = this._nextStage,
        f = this._getPointerData(a);if (!this._prevStage || void 0 !== d) {
      var g = null,
          h = f.target;d || !h && !e || (g = this._getObjectsUnderPoint(f.x, f.y, null, !0)), f.down && (this._dispatchMouseEvent(this, "stagemouseup", !1, a, f, b, g), f.down = !1), g == h && this._dispatchMouseEvent(h, "click", !0, a, f, b), this._dispatchMouseEvent(h, "pressup", !0, a, f, b), c ? (a == this._primaryPointerID && (this._primaryPointerID = null), delete this._pointerData[a]) : f.target = null, e && e._handlePointerUp(a, b, c, d || g && this);
    }
  }, b._handleMouseDown = function (a) {
    this._handlePointerDown(-1, a, a.pageX, a.pageY);
  }, b._handlePointerDown = function (a, b, c, d, e) {
    this.preventSelection && b.preventDefault(), (null == this._primaryPointerID || -1 === a) && (this._primaryPointerID = a), null != d && this._updatePointerPosition(a, b, c, d);var f = null,
        g = this._nextStage,
        h = this._getPointerData(a);e || (f = h.target = this._getObjectsUnderPoint(h.x, h.y, null, !0)), h.inBounds && (this._dispatchMouseEvent(this, "stagemousedown", !1, a, h, b, f), h.down = !0), this._dispatchMouseEvent(f, "mousedown", !0, a, h, b), g && g._handlePointerDown(a, b, c, d, e || f && this);
  }, b._testMouseOver = function (a, b, c) {
    if (!this._prevStage || void 0 !== b) {
      var d = this._nextStage;if (!this._mouseOverIntervalID) return void (d && d._testMouseOver(a, b, c));var e = this._getPointerData(-1);if (e && (a || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) {
        var f,
            g,
            h,
            i = e.posEvtObj,
            j = c || i && i.target == this.canvas,
            k = null,
            l = -1,
            m = "";!b && (a || this.mouseInBounds && j) && (k = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY);var n = this._mouseOverTarget || [],
            o = n[n.length - 1],
            p = this._mouseOverTarget = [];for (f = k; f;) p.unshift(f), m || (m = f.cursor), f = f.parent;for (this.canvas.style.cursor = m, !b && c && (c.canvas.style.cursor = m), g = 0, h = p.length; h > g && p[g] == n[g]; g++) l = g;for (o != k && this._dispatchMouseEvent(o, "mouseout", !0, -1, e, i, k), g = n.length - 1; g > l; g--) this._dispatchMouseEvent(n[g], "rollout", !1, -1, e, i, k);for (g = p.length - 1; g > l; g--) this._dispatchMouseEvent(p[g], "rollover", !1, -1, e, i, o);o != k && this._dispatchMouseEvent(k, "mouseover", !0, -1, e, i, o), d && d._testMouseOver(a, b || k && this, c || j && this);
      }
    }
  }, b._handleDoubleClick = function (a, b) {
    var c = null,
        d = this._nextStage,
        e = this._getPointerData(-1);b || (c = this._getObjectsUnderPoint(e.x, e.y, null, !0), this._dispatchMouseEvent(c, "dblclick", !0, -1, e, a)), d && d._handleDoubleClick(a, b || c && this);
  }, b._dispatchMouseEvent = function (a, b, c, d, e, f, g) {
    if (a && (c || a.hasEventListener(b))) {
      var h = new createjs.MouseEvent(b, c, !1, e.x, e.y, f, d, d === this._primaryPointerID || -1 === d, e.rawX, e.rawY, g);a.dispatchEvent(h);
    }
  }, createjs.Stage = createjs.promote(a, "Container");
}(), this.createjs = this.createjs || {}, function () {
  function a(a) {
    this.DisplayObject_constructor(), "string" == typeof a ? (this.image = document.createElement("img"), this.image.src = a) : this.image = a, this.sourceRect = null;
  }var b = createjs.extend(a, createjs.DisplayObject);b.initialize = a, b.isVisible = function () {
    var a = this.image,
        b = this.cacheCanvas || a && (a.naturalWidth || a.getContext || a.readyState >= 2);return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && b);
  }, b.draw = function (a, b) {
    if (this.DisplayObject_draw(a, b) || !this.image) return !0;var c = this.image,
        d = this.sourceRect;if (d) {
      var e = d.x,
          f = d.y,
          g = e + d.width,
          h = f + d.height,
          i = 0,
          j = 0,
          k = c.width,
          l = c.height;0 > e && (i -= e, e = 0), g > k && (g = k), 0 > f && (j -= f, f = 0), h > l && (h = l), a.drawImage(c, e, f, g - e, h - f, i, j, g - e, h - f);
    } else a.drawImage(c, 0, 0);return !0;
  }, b.getBounds = function () {
    var a = this.DisplayObject_getBounds();if (a) return a;var b = this.image,
        c = this.sourceRect || b,
        d = b && (b.naturalWidth || b.getContext || b.readyState >= 2);return d ? this._rectangle.setValues(0, 0, c.width, c.height) : null;
  }, b.clone = function () {
    var b = new a(this.image);return this.sourceRect && (b.sourceRect = this.sourceRect.clone()), this._cloneProps(b), b;
  }, b.toString = function () {
    return "[Bitmap (name=" + this.name + ")]";
  }, createjs.Bitmap = createjs.promote(a, "DisplayObject");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b) {
    this.DisplayObject_constructor(), this.currentFrame = 0, this.currentAnimation = null, this.paused = !0, this.spriteSheet = a, this.currentAnimationFrame = 0, this.framerate = 0, this._animation = null, this._currentFrame = null, this._skipAdvance = !1, null != b && this.gotoAndPlay(b);
  }var b = createjs.extend(a, createjs.DisplayObject);b.initialize = a, b.isVisible = function () {
    var a = this.cacheCanvas || this.spriteSheet.complete;return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && a);
  }, b.draw = function (a, b) {
    if (this.DisplayObject_draw(a, b)) return !0;this._normalizeFrame();var c = this.spriteSheet.getFrame(0 | this._currentFrame);if (!c) return !1;var d = c.rect;return d.width && d.height && a.drawImage(c.image, d.x, d.y, d.width, d.height, -c.regX, -c.regY, d.width, d.height), !0;
  }, b.play = function () {
    this.paused = !1;
  }, b.stop = function () {
    this.paused = !0;
  }, b.gotoAndPlay = function (a) {
    this.paused = !1, this._skipAdvance = !0, this._goto(a);
  }, b.gotoAndStop = function (a) {
    this.paused = !0, this._goto(a);
  }, b.advance = function (a) {
    var b = this.framerate || this.spriteSheet.framerate,
        c = b && null != a ? a / (1e3 / b) : 1;this._normalizeFrame(c);
  }, b.getBounds = function () {
    return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle);
  }, b.clone = function () {
    return this._cloneProps(new a(this.spriteSheet));
  }, b.toString = function () {
    return "[Sprite (name=" + this.name + ")]";
  }, b._cloneProps = function (a) {
    return this.DisplayObject__cloneProps(a), a.currentFrame = this.currentFrame, a.currentAnimation = this.currentAnimation, a.paused = this.paused, a.currentAnimationFrame = this.currentAnimationFrame, a.framerate = this.framerate, a._animation = this._animation, a._currentFrame = this._currentFrame, a._skipAdvance = this._skipAdvance, a;
  }, b._tick = function (a) {
    this.paused || (this._skipAdvance || this.advance(a && a.delta), this._skipAdvance = !1), this.DisplayObject__tick(a);
  }, b._normalizeFrame = function (a) {
    a = a || 0;var b,
        c = this._animation,
        d = this.paused,
        e = this._currentFrame;if (c) {
      var f = c.speed || 1,
          g = this.currentAnimationFrame;if (b = c.frames.length, g + a * f >= b) {
        var h = c.next;if (this._dispatchAnimationEnd(c, e, d, h, b - 1)) return;if (h) return this._goto(h, a - (b - g) / f);this.paused = !0, g = c.frames.length - 1;
      } else g += a * f;this.currentAnimationFrame = g, this._currentFrame = c.frames[0 | g];
    } else if (e = this._currentFrame += a, b = this.spriteSheet.getNumFrames(), e >= b && b > 0 && !this._dispatchAnimationEnd(c, e, d, b - 1) && (this._currentFrame -= b) >= b) return this._normalizeFrame();e = 0 | this._currentFrame, this.currentFrame != e && (this.currentFrame = e, this.dispatchEvent("change"));
  }, b._dispatchAnimationEnd = function (a, b, c, d, e) {
    var f = a ? a.name : null;if (this.hasEventListener("animationend")) {
      var g = new createjs.Event("animationend");g.name = f, g.next = d, this.dispatchEvent(g);
    }var h = this._animation != a || this._currentFrame != b;return h || c || !this.paused || (this.currentAnimationFrame = e, h = !0), h;
  }, b._goto = function (a, b) {
    if (this.currentAnimationFrame = 0, isNaN(a)) {
      var c = this.spriteSheet.getAnimation(a);c && (this._animation = c, this.currentAnimation = a, this._normalizeFrame(b));
    } else this.currentAnimation = this._animation = null, this._currentFrame = a, this._normalizeFrame();
  }, createjs.Sprite = createjs.promote(a, "DisplayObject");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a) {
    this.DisplayObject_constructor(), this.graphics = a ? a : new createjs.Graphics();
  }var b = createjs.extend(a, createjs.DisplayObject);b.isVisible = function () {
    var a = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && a);
  }, b.draw = function (a, b) {
    return this.DisplayObject_draw(a, b) ? !0 : (this.graphics.draw(a, this), !0);
  }, b.clone = function (b) {
    var c = b && this.graphics ? this.graphics.clone() : this.graphics;return this._cloneProps(new a(c));
  }, b.toString = function () {
    return "[Shape (name=" + this.name + ")]";
  }, createjs.Shape = createjs.promote(a, "DisplayObject");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c) {
    this.DisplayObject_constructor(), this.text = a, this.font = b, this.color = c, this.textAlign = "left", this.textBaseline = "top", this.maxWidth = null, this.outline = 0, this.lineHeight = 0, this.lineWidth = null;
  }var b = createjs.extend(a, createjs.DisplayObject),
      c = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");c.getContext && (a._workingContext = c.getContext("2d"), c.width = c.height = 1), a.H_OFFSETS = { start: 0, left: 0, center: -.5, end: -1, right: -1 }, a.V_OFFSETS = { top: 0, hanging: -.01, middle: -.4, alphabetic: -.8, ideographic: -.85, bottom: -1 }, b.isVisible = function () {
    var a = this.cacheCanvas || null != this.text && "" !== this.text;return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && a);
  }, b.draw = function (a, b) {
    if (this.DisplayObject_draw(a, b)) return !0;var c = this.color || "#000";return this.outline ? (a.strokeStyle = c, a.lineWidth = 1 * this.outline) : a.fillStyle = c, this._drawText(this._prepContext(a)), !0;
  }, b.getMeasuredWidth = function () {
    return this._getMeasuredWidth(this.text);
  }, b.getMeasuredLineHeight = function () {
    return 1.2 * this._getMeasuredWidth("M");
  }, b.getMeasuredHeight = function () {
    return this._drawText(null, {}).height;
  }, b.getBounds = function () {
    var b = this.DisplayObject_getBounds();if (b) return b;if (null == this.text || "" === this.text) return null;var c = this._drawText(null, {}),
        d = this.maxWidth && this.maxWidth < c.width ? this.maxWidth : c.width,
        e = d * a.H_OFFSETS[this.textAlign || "left"],
        f = this.lineHeight || this.getMeasuredLineHeight(),
        g = f * a.V_OFFSETS[this.textBaseline || "top"];return this._rectangle.setValues(e, g, d, c.height);
  }, b.getMetrics = function () {
    var b = { lines: [] };return b.lineHeight = this.lineHeight || this.getMeasuredLineHeight(), b.vOffset = b.lineHeight * a.V_OFFSETS[this.textBaseline || "top"], this._drawText(null, b, b.lines);
  }, b.clone = function () {
    return this._cloneProps(new a(this.text, this.font, this.color));
  }, b.toString = function () {
    return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]";
  }, b._cloneProps = function (a) {
    return this.DisplayObject__cloneProps(a), a.textAlign = this.textAlign, a.textBaseline = this.textBaseline, a.maxWidth = this.maxWidth, a.outline = this.outline, a.lineHeight = this.lineHeight, a.lineWidth = this.lineWidth, a;
  }, b._prepContext = function (a) {
    return a.font = this.font || "10px sans-serif", a.textAlign = this.textAlign || "left", a.textBaseline = this.textBaseline || "top", a;
  }, b._drawText = function (b, c, d) {
    var e = !!b;e || (b = a._workingContext, b.save(), this._prepContext(b));for (var f = this.lineHeight || this.getMeasuredLineHeight(), g = 0, h = 0, i = String(this.text).split(/(?:\r\n|\r|\n)/), j = 0, k = i.length; k > j; j++) {
      var l = i[j],
          m = null;if (null != this.lineWidth && (m = b.measureText(l).width) > this.lineWidth) {
        var n = l.split(/(\s)/);l = n[0], m = b.measureText(l).width;for (var o = 1, p = n.length; p > o; o += 2) {
          var q = b.measureText(n[o] + n[o + 1]).width;m + q > this.lineWidth ? (e && this._drawTextLine(b, l, h * f), d && d.push(l), m > g && (g = m), l = n[o + 1], m = b.measureText(l).width, h++) : (l += n[o] + n[o + 1], m += q);
        }
      }e && this._drawTextLine(b, l, h * f), d && d.push(l), c && null == m && (m = b.measureText(l).width), m > g && (g = m), h++;
    }return c && (c.width = g, c.height = h * f), e || b.restore(), c;
  }, b._drawTextLine = function (a, b, c) {
    this.outline ? a.strokeText(b, 0, c, this.maxWidth || 65535) : a.fillText(b, 0, c, this.maxWidth || 65535);
  }, b._getMeasuredWidth = function (b) {
    var c = a._workingContext;c.save();var d = this._prepContext(c).measureText(b).width;return c.restore(), d;
  }, createjs.Text = createjs.promote(a, "DisplayObject");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b) {
    this.Container_constructor(), this.text = a || "", this.spriteSheet = b, this.lineHeight = 0, this.letterSpacing = 0, this.spaceWidth = 0, this._oldProps = { text: 0, spriteSheet: 0, lineHeight: 0, letterSpacing: 0, spaceWidth: 0 };
  }var b = createjs.extend(a, createjs.Container);a.maxPoolSize = 100, a._spritePool = [], b.draw = function (a, b) {
    this.DisplayObject_draw(a, b) || (this._updateText(), this.Container_draw(a, b));
  }, b.getBounds = function () {
    return this._updateText(), this.Container_getBounds();
  }, b.isVisible = function () {
    var a = this.cacheCanvas || this.spriteSheet && this.spriteSheet.complete && this.text;return !!(this.visible && this.alpha > 0 && 0 !== this.scaleX && 0 !== this.scaleY && a);
  }, b.clone = function () {
    return this._cloneProps(new a(this.text, this.spriteSheet));
  }, b.addChild = b.addChildAt = b.removeChild = b.removeChildAt = b.removeAllChildren = function () {}, b._cloneProps = function (a) {
    return this.Container__cloneProps(a), a.lineHeight = this.lineHeight, a.letterSpacing = this.letterSpacing, a.spaceWidth = this.spaceWidth, a;
  }, b._getFrameIndex = function (a, b) {
    var c,
        d = b.getAnimation(a);return d || (a != (c = a.toUpperCase()) || a != (c = a.toLowerCase()) || (c = null), c && (d = b.getAnimation(c))), d && d.frames[0];
  }, b._getFrame = function (a, b) {
    var c = this._getFrameIndex(a, b);return null == c ? c : b.getFrame(c);
  }, b._getLineHeight = function (a) {
    var b = this._getFrame("1", a) || this._getFrame("T", a) || this._getFrame("L", a) || a.getFrame(0);return b ? b.rect.height : 1;
  }, b._getSpaceWidth = function (a) {
    var b = this._getFrame("1", a) || this._getFrame("l", a) || this._getFrame("e", a) || this._getFrame("a", a) || a.getFrame(0);return b ? b.rect.width : 1;
  }, b._updateText = function () {
    var b,
        c = 0,
        d = 0,
        e = this._oldProps,
        f = !1,
        g = this.spaceWidth,
        h = this.lineHeight,
        i = this.spriteSheet,
        j = a._spritePool,
        k = this.children,
        l = 0,
        m = k.length;for (var n in e) e[n] != this[n] && (e[n] = this[n], f = !0);if (f) {
      var o = !!this._getFrame(" ", i);o || g || (g = this._getSpaceWidth(i)), h || (h = this._getLineHeight(i));for (var p = 0, q = this.text.length; q > p; p++) {
        var r = this.text.charAt(p);if (" " != r || o) {
          if ("\n" != r && "\r" != r) {
            var s = this._getFrameIndex(r, i);null != s && (m > l ? b = k[l] : (k.push(b = j.length ? j.pop() : new createjs.Sprite()), b.parent = this, m++), b.spriteSheet = i, b.gotoAndStop(s), b.x = c, b.y = d, l++, c += b.getBounds().width + this.letterSpacing);
          } else "\r" == r && "\n" == this.text.charAt(p + 1) && p++, c = 0, d += h;
        } else c += g;
      }for (; m > l;) j.push(b = k.pop()), b.parent = null, m--;j.length > a.maxPoolSize && (j.length = a.maxPoolSize);
    }
  }, createjs.BitmapText = createjs.promote(a, "Container");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(b, c, d, e) {
    this.Container_constructor(), !a.inited && a.init(), this.mode = b || a.INDEPENDENT, this.startPosition = c || 0, this.loop = d, this.currentFrame = 0, this.timeline = new createjs.Timeline(null, e, { paused: !0, position: c, useTicks: !0 }), this.paused = !1, this.actionsEnabled = !0, this.autoReset = !0, this.frameBounds = this.frameBounds || null, this.framerate = null, this._synchOffset = 0, this._prevPos = -1, this._prevPosition = 0, this._t = 0, this._managed = {};
  }function b() {
    throw "MovieClipPlugin cannot be instantiated.";
  }var c = createjs.extend(a, createjs.Container);a.INDEPENDENT = "independent", a.SINGLE_FRAME = "single", a.SYNCHED = "synched", a.inited = !1, a.init = function () {
    a.inited || (b.install(), a.inited = !0);
  }, c.getLabels = function () {
    return this.timeline.getLabels();
  }, c.getCurrentLabel = function () {
    return this._updateTimeline(), this.timeline.getCurrentLabel();
  }, c.getDuration = function () {
    return this.timeline.duration;
  };try {
    Object.defineProperties(c, { labels: { get: c.getLabels }, currentLabel: { get: c.getCurrentLabel }, totalFrames: { get: c.getDuration }, duration: { get: c.getDuration } });
  } catch (d) {}c.initialize = a, c.isVisible = function () {
    return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY);
  }, c.draw = function (a, b) {
    return this.DisplayObject_draw(a, b) ? !0 : (this._updateTimeline(), this.Container_draw(a, b), !0);
  }, c.play = function () {
    this.paused = !1;
  }, c.stop = function () {
    this.paused = !0;
  }, c.gotoAndPlay = function (a) {
    this.paused = !1, this._goto(a);
  }, c.gotoAndStop = function (a) {
    this.paused = !0, this._goto(a);
  }, c.advance = function (b) {
    var c = a.INDEPENDENT;if (this.mode == c) {
      for (var d = this, e = d.framerate; (d = d.parent) && null == e;) d.mode == c && (e = d._framerate);this._framerate = e;var f = null != e && -1 != e && null != b ? b / (1e3 / e) + this._t : 1,
          g = 0 | f;for (this._t = f - g; !this.paused && g--;) this._prevPosition = this._prevPos < 0 ? 0 : this._prevPosition + 1, this._updateTimeline();
    }
  }, c.clone = function () {
    throw "MovieClip cannot be cloned.";
  }, c.toString = function () {
    return "[MovieClip (name=" + this.name + ")]";
  }, c._tick = function (a) {
    this.advance(a && a.delta), this.Container__tick(a);
  }, c._goto = function (a) {
    var b = this.timeline.resolve(a);null != b && (-1 == this._prevPos && (this._prevPos = 0 / 0), this._prevPosition = b, this._t = 0, this._updateTimeline());
  }, c._reset = function () {
    this._prevPos = -1, this._t = this.currentFrame = 0, this.paused = !1;
  }, c._updateTimeline = function () {
    var b = this.timeline,
        c = this.mode != a.INDEPENDENT;b.loop = null == this.loop ? !0 : this.loop;var d = c ? this.startPosition + (this.mode == a.SINGLE_FRAME ? 0 : this._synchOffset) : this._prevPos < 0 ? 0 : this._prevPosition,
        e = c || !this.actionsEnabled ? createjs.Tween.NONE : null;if (this.currentFrame = b._calcPosition(d), b.setPosition(d, e), this._prevPosition = b._prevPosition, this._prevPos != b._prevPos) {
      this.currentFrame = this._prevPos = b._prevPos;for (var f in this._managed) this._managed[f] = 1;for (var g = b._tweens, h = 0, i = g.length; i > h; h++) {
        var j = g[h],
            k = j._target;if (k != this && !j.passive) {
          var l = j._stepPosition;k instanceof createjs.DisplayObject ? this._addManagedChild(k, l) : this._setState(k.state, l);
        }
      }var m = this.children;for (h = m.length - 1; h >= 0; h--) {
        var n = m[h].id;1 == this._managed[n] && (this.removeChildAt(h), delete this._managed[n]);
      }
    }
  }, c._setState = function (a, b) {
    if (a) for (var c = a.length - 1; c >= 0; c--) {
      var d = a[c],
          e = d.t,
          f = d.p;for (var g in f) e[g] = f[g];this._addManagedChild(e, b);
    }
  }, c._addManagedChild = function (b, c) {
    b._off || (this.addChildAt(b, 0), b instanceof a && (b._synchOffset = c, b.mode == a.INDEPENDENT && b.autoReset && !this._managed[b.id] && b._reset()), this._managed[b.id] = 2);
  }, c._getBounds = function (a, b) {
    var c = this.DisplayObject_getBounds();return c || (this._updateTimeline(), this.frameBounds && (c = this._rectangle.copy(this.frameBounds[this.currentFrame]))), c ? this._transformBounds(c, a, b) : this.Container__getBounds(a, b);
  }, createjs.MovieClip = createjs.promote(a, "Container"), b.priority = 100, b.install = function () {
    createjs.Tween.installPlugin(b, ["startPosition"]);
  }, b.init = function (a, b, c) {
    return c;
  }, b.step = function () {}, b.tween = function (b, c, d, e, f, g) {
    return b.target instanceof a ? 1 == g ? f[c] : e[c] : d;
  };
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a() {
    throw "SpriteSheetUtils cannot be instantiated";
  }var b = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");b.getContext && (a._workingCanvas = b, a._workingContext = b.getContext("2d"), b.width = b.height = 1), a.addFlippedFrames = function (b, c, d, e) {
    if (c || d || e) {
      var f = 0;c && a._flip(b, ++f, !0, !1), d && a._flip(b, ++f, !1, !0), e && a._flip(b, ++f, !0, !0);
    }
  }, a.extractFrame = function (b, c) {
    isNaN(c) && (c = b.getAnimation(c).frames[0]);var d = b.getFrame(c);if (!d) return null;var e = d.rect,
        f = a._workingCanvas;f.width = e.width, f.height = e.height, a._workingContext.drawImage(d.image, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height);var g = document.createElement("img");return g.src = f.toDataURL("image/png"), g;
  }, a.mergeAlpha = function (a, b, c) {
    c || (c = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")), c.width = Math.max(b.width, a.width), c.height = Math.max(b.height, a.height);var d = c.getContext("2d");return d.save(), d.drawImage(a, 0, 0), d.globalCompositeOperation = "destination-in", d.drawImage(b, 0, 0), d.restore(), c;
  }, a._flip = function (b, c, d, e) {
    for (var f = b._images, g = a._workingCanvas, h = a._workingContext, i = f.length / c, j = 0; i > j; j++) {
      var k = f[j];k.__tmp = j, h.setTransform(1, 0, 0, 1, 0, 0), h.clearRect(0, 0, g.width + 1, g.height + 1), g.width = k.width, g.height = k.height, h.setTransform(d ? -1 : 1, 0, 0, e ? -1 : 1, d ? k.width : 0, e ? k.height : 0), h.drawImage(k, 0, 0);var l = document.createElement("img");l.src = g.toDataURL("image/png"), l.width = k.width, l.height = k.height, f.push(l);
    }var m = b._frames,
        n = m.length / c;for (j = 0; n > j; j++) {
      k = m[j];var o = k.rect.clone();l = f[k.image.__tmp + i * c];var p = { image: l, rect: o, regX: k.regX, regY: k.regY };d && (o.x = l.width - o.x - o.width, p.regX = o.width - k.regX), e && (o.y = l.height - o.y - o.height, p.regY = o.height - k.regY), m.push(p);
    }var q = "_" + (d ? "h" : "") + (e ? "v" : ""),
        r = b._animations,
        s = b._data,
        t = r.length / c;for (j = 0; t > j; j++) {
      var u = r[j];k = s[u];var v = { name: u + q, speed: k.speed, next: k.next, frames: [] };k.next && (v.next += q), m = k.frames;for (var w = 0, x = m.length; x > w; w++) v.frames.push(m[w] + n * c);s[v.name] = v, r.push(v.name);
    }
  }, createjs.SpriteSheetUtils = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a) {
    this.EventDispatcher_constructor(), this.maxWidth = 2048, this.maxHeight = 2048, this.spriteSheet = null, this.scale = 1, this.padding = 1, this.timeSlice = .3, this.progress = -1, this.framerate = a || 0, this._frames = [], this._animations = {}, this._data = null, this._nextFrameIndex = 0, this._index = 0, this._timerID = null, this._scale = 1;
  }var b = createjs.extend(a, createjs.EventDispatcher);a.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions", a.ERR_RUNNING = "a build is already running", b.addFrame = function (b, c, d, e, f) {
    if (this._data) throw a.ERR_RUNNING;var g = c || b.bounds || b.nominalBounds;return !g && b.getBounds && (g = b.getBounds()), g ? (d = d || 1, this._frames.push({ source: b, sourceRect: g, scale: d, funct: e, data: f, index: this._frames.length, height: g.height * d }) - 1) : null;
  }, b.addAnimation = function (b, c, d, e) {
    if (this._data) throw a.ERR_RUNNING;this._animations[b] = { frames: c, next: d, speed: e };
  }, b.addMovieClip = function (b, c, d, e, f, g) {
    if (this._data) throw a.ERR_RUNNING;var h = b.frameBounds,
        i = c || b.bounds || b.nominalBounds;if (!i && b.getBounds && (i = b.getBounds()), i || h) {
      var j,
          k,
          l = this._frames.length,
          m = b.timeline.duration;for (j = 0; m > j; j++) {
        var n = h && h[j] ? h[j] : i;this.addFrame(b, n, d, this._setupMovieClipFrame, { i: j, f: e, d: f });
      }var o = b.timeline._labels,
          p = [];for (var q in o) p.push({ index: o[q], label: q });if (p.length) for (p.sort(function (a, b) {
        return a.index - b.index;
      }), j = 0, k = p.length; k > j; j++) {
        for (var r = p[j].label, s = l + p[j].index, t = l + (j == k - 1 ? m : p[j + 1].index), u = [], v = s; t > v; v++) u.push(v);(!g || (r = g(r, b, s, t))) && this.addAnimation(r, u, !0);
      }
    }
  }, b.build = function () {
    if (this._data) throw a.ERR_RUNNING;for (this._startBuild(); this._drawNext(););return this._endBuild(), this.spriteSheet;
  }, b.buildAsync = function (b) {
    if (this._data) throw a.ERR_RUNNING;this.timeSlice = b, this._startBuild();var c = this;this._timerID = setTimeout(function () {
      c._run();
    }, 50 - 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)));
  }, b.stopAsync = function () {
    clearTimeout(this._timerID), this._data = null;
  }, b.clone = function () {
    throw "SpriteSheetBuilder cannot be cloned.";
  }, b.toString = function () {
    return "[SpriteSheetBuilder]";
  }, b._startBuild = function () {
    var b = this.padding || 0;this.progress = 0, this.spriteSheet = null, this._index = 0, this._scale = this.scale;var c = [];this._data = { images: [], frames: c, framerate: this.framerate, animations: this._animations };var d = this._frames.slice();if (d.sort(function (a, b) {
      return a.height <= b.height ? -1 : 1;
    }), d[d.length - 1].height + 2 * b > this.maxHeight) throw a.ERR_DIMENSIONS;for (var e = 0, f = 0, g = 0; d.length;) {
      var h = this._fillRow(d, e, g, c, b);if (h.w > f && (f = h.w), e += h.h, !h.h || !d.length) {
        var i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");i.width = this._getSize(f, this.maxWidth), i.height = this._getSize(e, this.maxHeight), this._data.images[g] = i, h.h || (f = e = 0, g++);
      }
    }
  }, b._setupMovieClipFrame = function (a, b) {
    var c = a.actionsEnabled;a.actionsEnabled = !1, a.gotoAndStop(b.i), a.actionsEnabled = c, b.f && b.f(a, b.d, b.i);
  }, b._getSize = function (a, b) {
    for (var c = 4; Math.pow(2, ++c) < a;);return Math.min(b, Math.pow(2, c));
  }, b._fillRow = function (b, c, d, e, f) {
    var g = this.maxWidth,
        h = this.maxHeight;c += f;for (var i = h - c, j = f, k = 0, l = b.length - 1; l >= 0; l--) {
      var m = b[l],
          n = this._scale * m.scale,
          o = m.sourceRect,
          p = m.source,
          q = Math.floor(n * o.x - f),
          r = Math.floor(n * o.y - f),
          s = Math.ceil(n * o.height + 2 * f),
          t = Math.ceil(n * o.width + 2 * f);if (t > g) throw a.ERR_DIMENSIONS;s > i || j + t > g || (m.img = d, m.rect = new createjs.Rectangle(j, c, t, s), k = k || s, b.splice(l, 1), e[m.index] = [j, c, t, s, d, Math.round(-q + n * p.regX - f), Math.round(-r + n * p.regY - f)], j += t);
    }return { w: j, h: k };
  }, b._endBuild = function () {
    this.spriteSheet = new createjs.SpriteSheet(this._data), this._data = null, this.progress = 1, this.dispatchEvent("complete");
  }, b._run = function () {
    for (var a = 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)), b = new Date().getTime() + a, c = !1; b > new Date().getTime();) if (!this._drawNext()) {
      c = !0;break;
    }if (c) this._endBuild();else {
      var d = this;this._timerID = setTimeout(function () {
        d._run();
      }, 50 - a);
    }var e = this.progress = this._index / this._frames.length;if (this.hasEventListener("progress")) {
      var f = new createjs.Event("progress");f.progress = e, this.dispatchEvent(f);
    }
  }, b._drawNext = function () {
    var a = this._frames[this._index],
        b = a.scale * this._scale,
        c = a.rect,
        d = a.sourceRect,
        e = this._data.images[a.img],
        f = e.getContext("2d");return a.funct && a.funct(a.source, a.data), f.save(), f.beginPath(), f.rect(c.x, c.y, c.width, c.height), f.clip(), f.translate(Math.ceil(c.x - d.x * b), Math.ceil(c.y - d.y * b)), f.scale(b, b), a.source.draw(f), f.restore(), ++this._index < this._frames.length;
  }, createjs.SpriteSheetBuilder = createjs.promote(a, "EventDispatcher");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a) {
    this.DisplayObject_constructor(), "string" == typeof a && (a = document.getElementById(a)), this.mouseEnabled = !1;var b = a.style;b.position = "absolute", b.transformOrigin = b.WebkitTransformOrigin = b.msTransformOrigin = b.MozTransformOrigin = b.OTransformOrigin = "0% 0%", this.htmlElement = a, this._oldProps = null;
  }var b = createjs.extend(a, createjs.DisplayObject);b.isVisible = function () {
    return null != this.htmlElement;
  }, b.draw = function () {
    return !0;
  }, b.cache = function () {}, b.uncache = function () {}, b.updateCache = function () {}, b.hitTest = function () {}, b.localToGlobal = function () {}, b.globalToLocal = function () {}, b.localToLocal = function () {}, b.clone = function () {
    throw "DOMElement cannot be cloned.";
  }, b.toString = function () {
    return "[DOMElement (name=" + this.name + ")]";
  }, b._tick = function (a) {
    var b = this.getStage();b && b.on("drawend", this._handleDrawEnd, this, !0), this.DisplayObject__tick(a);
  }, b._handleDrawEnd = function () {
    var a = this.htmlElement;if (a) {
      var b = a.style,
          c = this.getConcatenatedDisplayProps(this._props),
          d = c.matrix,
          e = c.visible ? "visible" : "hidden";if (e != b.visibility && (b.visibility = e), c.visible) {
        var f = this._oldProps,
            g = f && f.matrix,
            h = 1e4;if (!g || !g.equals(d)) {
          var i = "matrix(" + (d.a * h | 0) / h + "," + (d.b * h | 0) / h + "," + (d.c * h | 0) / h + "," + (d.d * h | 0) / h + "," + (d.tx + .5 | 0);b.transform = b.WebkitTransform = b.OTransform = b.msTransform = i + "," + (d.ty + .5 | 0) + ")", b.MozTransform = i + "px," + (d.ty + .5 | 0) + "px)", f || (f = this._oldProps = new createjs.DisplayProps(!0, 0 / 0)), f.matrix.copy(d);
        }f.alpha != c.alpha && (b.opacity = "" + (c.alpha * h | 0) / h, f.alpha = c.alpha);
      }
    }
  }, createjs.DOMElement = createjs.promote(a, "DisplayObject");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a() {}var b = a.prototype;b.getBounds = function (a) {
    return a;
  }, b.applyFilter = function (a, b, c, d, e, f, g, h) {
    f = f || a, null == g && (g = b), null == h && (h = c);try {
      var i = a.getImageData(b, c, d, e);
    } catch (j) {
      return !1;
    }return this._applyFilter(i) ? (f.putImageData(i, g, h), !0) : !1;
  }, b.toString = function () {
    return "[Filter]";
  }, b.clone = function () {
    return new a();
  }, b._applyFilter = function () {
    return !0;
  }, createjs.Filter = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c) {
    (isNaN(a) || 0 > a) && (a = 0), (isNaN(b) || 0 > b) && (b = 0), (isNaN(c) || 1 > c) && (c = 1), this.blurX = 0 | a, this.blurY = 0 | b, this.quality = 0 | c;
  }var b = createjs.extend(a, createjs.Filter);a.MUL_TABLE = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1], a.SHG_TABLE = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9], b.getBounds = function (a) {
    var b = 0 | this.blurX,
        c = 0 | this.blurY;if (0 >= b && 0 >= c) return a;var d = Math.pow(this.quality, .2);return (a || new createjs.Rectangle()).pad(b * d + 1, c * d + 1, b * d + 1, c * d + 1);
  }, b.clone = function () {
    return new a(this.blurX, this.blurY, this.quality);
  }, b.toString = function () {
    return "[BlurFilter]";
  }, b._applyFilter = function (b) {
    var c = this.blurX >> 1;if (isNaN(c) || 0 > c) return !1;var d = this.blurY >> 1;if (isNaN(d) || 0 > d) return !1;if (0 == c && 0 == d) return !1;var e = this.quality;(isNaN(e) || 1 > e) && (e = 1), e |= 0, e > 3 && (e = 3), 1 > e && (e = 1);var f = b.data,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = c + c + 1 | 0,
        w = d + d + 1 | 0,
        x = 0 | b.width,
        y = 0 | b.height,
        z = x - 1 | 0,
        A = y - 1 | 0,
        B = c + 1 | 0,
        C = d + 1 | 0,
        D = { r: 0, b: 0, g: 0, a: 0 },
        E = D;for (i = 1; v > i; i++) E = E.n = { r: 0, b: 0, g: 0, a: 0 };E.n = D;var F = { r: 0, b: 0, g: 0, a: 0 },
        G = F;for (i = 1; w > i; i++) G = G.n = { r: 0, b: 0, g: 0, a: 0 };G.n = F;for (var H = null, I = 0 | a.MUL_TABLE[c], J = 0 | a.SHG_TABLE[c], K = 0 | a.MUL_TABLE[d], L = 0 | a.SHG_TABLE[d]; e-- > 0;) {
      m = l = 0;var M = I,
          N = J;for (h = y; --h > -1;) {
        for (n = B * (r = f[0 | l]), o = B * (s = f[l + 1 | 0]), p = B * (t = f[l + 2 | 0]), q = B * (u = f[l + 3 | 0]), E = D, i = B; --i > -1;) E.r = r, E.g = s, E.b = t, E.a = u, E = E.n;for (i = 1; B > i; i++) j = l + ((i > z ? z : i) << 2) | 0, n += E.r = f[j], o += E.g = f[j + 1], p += E.b = f[j + 2], q += E.a = f[j + 3], E = E.n;for (H = D, g = 0; x > g; g++) f[l++] = n * M >>> N, f[l++] = o * M >>> N, f[l++] = p * M >>> N, f[l++] = q * M >>> N, j = m + ((j = g + c + 1) < z ? j : z) << 2, n -= H.r - (H.r = f[j]), o -= H.g - (H.g = f[j + 1]), p -= H.b - (H.b = f[j + 2]), q -= H.a - (H.a = f[j + 3]), H = H.n;m += x;
      }for (M = K, N = L, g = 0; x > g; g++) {
        for (l = g << 2 | 0, n = C * (r = f[l]) | 0, o = C * (s = f[l + 1 | 0]) | 0, p = C * (t = f[l + 2 | 0]) | 0, q = C * (u = f[l + 3 | 0]) | 0, G = F, i = 0; C > i; i++) G.r = r, G.g = s, G.b = t, G.a = u, G = G.n;for (k = x, i = 1; d >= i; i++) l = k + g << 2, n += G.r = f[l], o += G.g = f[l + 1], p += G.b = f[l + 2], q += G.a = f[l + 3], G = G.n, A > i && (k += x);if (l = g, H = F, e > 0) for (h = 0; y > h; h++) j = l << 2, f[j + 3] = u = q * M >>> N, u > 0 ? (f[j] = n * M >>> N, f[j + 1] = o * M >>> N, f[j + 2] = p * M >>> N) : f[j] = f[j + 1] = f[j + 2] = 0, j = g + ((j = h + C) < A ? j : A) * x << 2, n -= H.r - (H.r = f[j]), o -= H.g - (H.g = f[j + 1]), p -= H.b - (H.b = f[j + 2]), q -= H.a - (H.a = f[j + 3]), H = H.n, l += x;else for (h = 0; y > h; h++) j = l << 2, f[j + 3] = u = q * M >>> N, u > 0 ? (u = 255 / u, f[j] = (n * M >>> N) * u, f[j + 1] = (o * M >>> N) * u, f[j + 2] = (p * M >>> N) * u) : f[j] = f[j + 1] = f[j + 2] = 0, j = g + ((j = h + C) < A ? j : A) * x << 2, n -= H.r - (H.r = f[j]), o -= H.g - (H.g = f[j + 1]), p -= H.b - (H.b = f[j + 2]), q -= H.a - (H.a = f[j + 3]), H = H.n, l += x;
      }
    }return !0;
  }, createjs.BlurFilter = createjs.promote(a, "Filter");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a) {
    this.alphaMap = a, this._alphaMap = null, this._mapData = null;
  }var b = createjs.extend(a, createjs.Filter);b.clone = function () {
    var b = new a(this.alphaMap);return b._alphaMap = this._alphaMap, b._mapData = this._mapData, b;
  }, b.toString = function () {
    return "[AlphaMapFilter]";
  }, b._applyFilter = function (a) {
    if (!this.alphaMap) return !0;if (!this._prepAlphaMap()) return !1;for (var b = a.data, c = this._mapData, d = 0, e = b.length; e > d; d += 4) b[d + 3] = c[d] || 0;return !0;
  }, b._prepAlphaMap = function () {
    if (!this.alphaMap) return !1;if (this.alphaMap == this._alphaMap && this._mapData) return !0;this._mapData = null;var a,
        b = this._alphaMap = this.alphaMap,
        c = b;b instanceof HTMLCanvasElement ? a = c.getContext("2d") : (c = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"), c.width = b.width, c.height = b.height, a = c.getContext("2d"), a.drawImage(b, 0, 0));try {
      var d = a.getImageData(0, 0, b.width, b.height);
    } catch (e) {
      return !1;
    }return this._mapData = d.data, !0;
  }, createjs.AlphaMapFilter = createjs.promote(a, "Filter");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a) {
    this.mask = a;
  }var b = createjs.extend(a, createjs.Filter);b.applyFilter = function (a, b, c, d, e, f, g, h) {
    return this.mask ? (f = f || a, null == g && (g = b), null == h && (h = c), f.save(), a != f ? !1 : (f.globalCompositeOperation = "destination-in", f.drawImage(this.mask, g, h), f.restore(), !0)) : !0;
  }, b.clone = function () {
    return new a(this.mask);
  }, b.toString = function () {
    return "[AlphaMaskFilter]";
  }, createjs.AlphaMaskFilter = createjs.promote(a, "Filter");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c, d, e, f, g, h) {
    this.redMultiplier = null != a ? a : 1, this.greenMultiplier = null != b ? b : 1, this.blueMultiplier = null != c ? c : 1, this.alphaMultiplier = null != d ? d : 1, this.redOffset = e || 0, this.greenOffset = f || 0, this.blueOffset = g || 0, this.alphaOffset = h || 0;
  }var b = createjs.extend(a, createjs.Filter);b.toString = function () {
    return "[ColorFilter]";
  }, b.clone = function () {
    return new a(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset);
  }, b._applyFilter = function (a) {
    for (var b = a.data, c = b.length, d = 0; c > d; d += 4) b[d] = b[d] * this.redMultiplier + this.redOffset, b[d + 1] = b[d + 1] * this.greenMultiplier + this.greenOffset, b[d + 2] = b[d + 2] * this.blueMultiplier + this.blueOffset, b[d + 3] = b[d + 3] * this.alphaMultiplier + this.alphaOffset;return !0;
  }, createjs.ColorFilter = createjs.promote(a, "Filter");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a, b, c, d) {
    this.setColor(a, b, c, d);
  }var b = a.prototype;a.DELTA_INDEX = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10], a.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], a.LENGTH = a.IDENTITY_MATRIX.length, b.setColor = function (a, b, c, d) {
    return this.reset().adjustColor(a, b, c, d);
  }, b.reset = function () {
    return this.copy(a.IDENTITY_MATRIX);
  }, b.adjustColor = function (a, b, c, d) {
    return this.adjustHue(d), this.adjustContrast(b), this.adjustBrightness(a), this.adjustSaturation(c);
  }, b.adjustBrightness = function (a) {
    return 0 == a || isNaN(a) ? this : (a = this._cleanValue(a, 255), this._multiplyMatrix([1, 0, 0, 0, a, 0, 1, 0, 0, a, 0, 0, 1, 0, a, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this);
  }, b.adjustContrast = function (b) {
    if (0 == b || isNaN(b)) return this;b = this._cleanValue(b, 100);var c;return 0 > b ? c = 127 + b / 100 * 127 : (c = b % 1, c = 0 == c ? a.DELTA_INDEX[b] : a.DELTA_INDEX[b << 0] * (1 - c) + a.DELTA_INDEX[(b << 0) + 1] * c, c = 127 * c + 127), this._multiplyMatrix([c / 127, 0, 0, 0, .5 * (127 - c), 0, c / 127, 0, 0, .5 * (127 - c), 0, 0, c / 127, 0, .5 * (127 - c), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this;
  }, b.adjustSaturation = function (a) {
    if (0 == a || isNaN(a)) return this;a = this._cleanValue(a, 100);var b = 1 + (a > 0 ? 3 * a / 100 : a / 100),
        c = .3086,
        d = .6094,
        e = .082;return this._multiplyMatrix([c * (1 - b) + b, d * (1 - b), e * (1 - b), 0, 0, c * (1 - b), d * (1 - b) + b, e * (1 - b), 0, 0, c * (1 - b), d * (1 - b), e * (1 - b) + b, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this;
  }, b.adjustHue = function (a) {
    if (0 == a || isNaN(a)) return this;a = this._cleanValue(a, 180) / 180 * Math.PI;var b = Math.cos(a),
        c = Math.sin(a),
        d = .213,
        e = .715,
        f = .072;return this._multiplyMatrix([d + b * (1 - d) + c * -d, e + b * -e + c * -e, f + b * -f + c * (1 - f), 0, 0, d + b * -d + .143 * c, e + b * (1 - e) + .14 * c, f + b * -f + c * -.283, 0, 0, d + b * -d + c * -(1 - d), e + b * -e + c * e, f + b * (1 - f) + c * f, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this;
  }, b.concat = function (b) {
    return b = this._fixMatrix(b), b.length != a.LENGTH ? this : (this._multiplyMatrix(b), this);
  }, b.clone = function () {
    return new a().copy(this);
  }, b.toArray = function () {
    for (var b = [], c = 0, d = a.LENGTH; d > c; c++) b[c] = this[c];return b;
  }, b.copy = function (b) {
    for (var c = a.LENGTH, d = 0; c > d; d++) this[d] = b[d];return this;
  }, b.toString = function () {
    return "[ColorMatrix]";
  }, b._multiplyMatrix = function (a) {
    var b,
        c,
        d,
        e = [];for (b = 0; 5 > b; b++) {
      for (c = 0; 5 > c; c++) e[c] = this[c + 5 * b];for (c = 0; 5 > c; c++) {
        var f = 0;for (d = 0; 5 > d; d++) f += a[c + 5 * d] * e[d];this[c + 5 * b] = f;
      }
    }
  }, b._cleanValue = function (a, b) {
    return Math.min(b, Math.max(-b, a));
  }, b._fixMatrix = function (b) {
    return b instanceof a && (b = b.toArray()), b.length < a.LENGTH ? b = b.slice(0, b.length).concat(a.IDENTITY_MATRIX.slice(b.length, a.LENGTH)) : b.length > a.LENGTH && (b = b.slice(0, a.LENGTH)), b;
  }, createjs.ColorMatrix = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a(a) {
    this.matrix = a;
  }var b = createjs.extend(a, createjs.Filter);b.toString = function () {
    return "[ColorMatrixFilter]";
  }, b.clone = function () {
    return new a(this.matrix);
  }, b._applyFilter = function (a) {
    for (var b, c, d, e, f = a.data, g = f.length, h = this.matrix, i = h[0], j = h[1], k = h[2], l = h[3], m = h[4], n = h[5], o = h[6], p = h[7], q = h[8], r = h[9], s = h[10], t = h[11], u = h[12], v = h[13], w = h[14], x = h[15], y = h[16], z = h[17], A = h[18], B = h[19], C = 0; g > C; C += 4) b = f[C], c = f[C + 1], d = f[C + 2], e = f[C + 3], f[C] = b * i + c * j + d * k + e * l + m, f[C + 1] = b * n + c * o + d * p + e * q + r, f[C + 2] = b * s + c * t + d * u + e * v + w, f[C + 3] = b * x + c * y + d * z + e * A + B;return !0;
  }, createjs.ColorMatrixFilter = createjs.promote(a, "Filter");
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  function a() {
    throw "Touch cannot be instantiated";
  }a.isSupported = function () {
    return !!("ontouchstart" in window || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0);
  }, a.enable = function (b, c, d) {
    return b && b.canvas && a.isSupported() ? b.__touch ? !0 : (b.__touch = { pointers: {}, multitouch: !c, preventDefault: !d, count: 0 }, "ontouchstart" in window ? a._IOS_enable(b) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && a._IE_enable(b), !0) : !1;
  }, a.disable = function (b) {
    b && ("ontouchstart" in window ? a._IOS_disable(b) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && a._IE_disable(b), delete b.__touch);
  }, a._IOS_enable = function (b) {
    var c = b.canvas,
        d = b.__touch.f = function (c) {
      a._IOS_handleEvent(b, c);
    };c.addEventListener("touchstart", d, !1), c.addEventListener("touchmove", d, !1), c.addEventListener("touchend", d, !1), c.addEventListener("touchcancel", d, !1);
  }, a._IOS_disable = function (a) {
    var b = a.canvas;if (b) {
      var c = a.__touch.f;b.removeEventListener("touchstart", c, !1), b.removeEventListener("touchmove", c, !1), b.removeEventListener("touchend", c, !1), b.removeEventListener("touchcancel", c, !1);
    }
  }, a._IOS_handleEvent = function (a, b) {
    if (a) {
      a.__touch.preventDefault && b.preventDefault && b.preventDefault();for (var c = b.changedTouches, d = b.type, e = 0, f = c.length; f > e; e++) {
        var g = c[e],
            h = g.identifier;g.target == a.canvas && ("touchstart" == d ? this._handleStart(a, h, b, g.pageX, g.pageY) : "touchmove" == d ? this._handleMove(a, h, b, g.pageX, g.pageY) : ("touchend" == d || "touchcancel" == d) && this._handleEnd(a, h, b));
      }
    }
  }, a._IE_enable = function (b) {
    var c = b.canvas,
        d = b.__touch.f = function (c) {
      a._IE_handleEvent(b, c);
    };void 0 === window.navigator.pointerEnabled ? (c.addEventListener("MSPointerDown", d, !1), window.addEventListener("MSPointerMove", d, !1), window.addEventListener("MSPointerUp", d, !1), window.addEventListener("MSPointerCancel", d, !1), b.__touch.preventDefault && (c.style.msTouchAction = "none")) : (c.addEventListener("pointerdown", d, !1), window.addEventListener("pointermove", d, !1), window.addEventListener("pointerup", d, !1), window.addEventListener("pointercancel", d, !1), b.__touch.preventDefault && (c.style.touchAction = "none")), b.__touch.activeIDs = {};
  }, a._IE_disable = function (a) {
    var b = a.__touch.f;void 0 === window.navigator.pointerEnabled ? (window.removeEventListener("MSPointerMove", b, !1), window.removeEventListener("MSPointerUp", b, !1), window.removeEventListener("MSPointerCancel", b, !1), a.canvas && a.canvas.removeEventListener("MSPointerDown", b, !1)) : (window.removeEventListener("pointermove", b, !1), window.removeEventListener("pointerup", b, !1), window.removeEventListener("pointercancel", b, !1), a.canvas && a.canvas.removeEventListener("pointerdown", b, !1));
  }, a._IE_handleEvent = function (a, b) {
    if (a) {
      a.__touch.preventDefault && b.preventDefault && b.preventDefault();var c = b.type,
          d = b.pointerId,
          e = a.__touch.activeIDs;if ("MSPointerDown" == c || "pointerdown" == c) {
        if (b.srcElement != a.canvas) return;e[d] = !0, this._handleStart(a, d, b, b.pageX, b.pageY);
      } else e[d] && ("MSPointerMove" == c || "pointermove" == c ? this._handleMove(a, d, b, b.pageX, b.pageY) : ("MSPointerUp" == c || "MSPointerCancel" == c || "pointerup" == c || "pointercancel" == c) && (delete e[d], this._handleEnd(a, d, b)));
    }
  }, a._handleStart = function (a, b, c, d, e) {
    var f = a.__touch;if (f.multitouch || !f.count) {
      var g = f.pointers;g[b] || (g[b] = !0, f.count++, a._handlePointerDown(b, c, d, e));
    }
  }, a._handleMove = function (a, b, c, d, e) {
    a.__touch.pointers[b] && a._handlePointerMove(b, c, d, e);
  }, a._handleEnd = function (a, b, c) {
    var d = a.__touch,
        e = d.pointers;e[b] && (d.count--, a._handlePointerUp(b, c, !0), delete e[b]);
  }, createjs.Touch = a;
}(), this.createjs = this.createjs || {}, function () {
  "use strict";
  var a = createjs.EaselJS = createjs.EaselJS || {};a.version = "0.8.2", a.buildDate = "Thu, 26 Nov 2015 20:44:34 GMT";
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Afrikaans [af]
//! author : Werner Mollentze : https://github.com/wernerm

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var af = moment.defineLocale('af', {
        months: 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
        monthsShort: 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
        weekdays: 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
        weekdaysShort: 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
        weekdaysMin: 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
        meridiemParse: /vm|nm/i,
        isPM: function (input) {
            return (/^nm$/i.test(input)
            );
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'vm' : 'VM';
            } else {
                return isLower ? 'nm' : 'NM';
            }
        },
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Vandag om] LT',
            nextDay: '[Môre om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[Gister om] LT',
            lastWeek: '[Laas] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'oor %s',
            past: '%s gelede',
            s: '\'n paar sekondes',
            m: '\'n minuut',
            mm: '%d minute',
            h: '\'n uur',
            hh: '%d ure',
            d: '\'n dag',
            dd: '%d dae',
            M: '\'n maand',
            MM: '%d maande',
            y: '\'n jaar',
            yy: '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function (number) {
            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
        },
        week: {
            dow: 1, // Maandag is die eerste dag van die week.
            doy: 4 // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
        }
    });

    return af;
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Algeria) [ar-dz]
//! author : Noureddine LOUAHEDJ : https://github.com/noureddineme

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var arDz = moment.defineLocale('ar-dz', {
        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'أح_إث_ثلا_أر_خم_جم_سب'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 4 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return arDz;
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Kuwait) [ar-kw]
//! author : Nusret Parlak: https://github.com/nusretparlak

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var arKw = moment.defineLocale('ar-kw', {
        months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        monthsShort: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        weekdays: 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return arKw;
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Lybia) [ar-ly]
//! author : Ali Hmer: https://github.com/kikoanis

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0'
    };
    var pluralForm = function (n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    };
    var plurals = {
        s: ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
        m: ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
        h: ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
        d: ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
        M: ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
        y: ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
    };
    var pluralize = function (u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = pluralForm(number),
                str = plurals[u][pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    };
    var months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

    var arLy = moment.defineLocale('ar-ly', {
        months: months,
        monthsShort: months,
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'D/\u200FM/\u200FYYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM: function (input) {
            return 'م' === input;
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar: {
            sameDay: '[اليوم عند الساعة] LT',
            nextDay: '[غدًا عند الساعة] LT',
            nextWeek: 'dddd [عند الساعة] LT',
            lastDay: '[أمس عند الساعة] LT',
            lastWeek: 'dddd [عند الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'بعد %s',
            past: 'منذ %s',
            s: pluralize('s'),
            m: pluralize('m'),
            mm: pluralize('m'),
            h: pluralize('h'),
            hh: pluralize('h'),
            d: pluralize('d'),
            dd: pluralize('d'),
            M: pluralize('M'),
            MM: pluralize('M'),
            y: pluralize('y'),
            yy: pluralize('y')
        },
        preparse: function (string) {
            return string.replace(/\u200f/g, '').replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return arLy;
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Morocco) [ar-ma]
//! author : ElFadili Yassine : https://github.com/ElFadiliY
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var arMa = moment.defineLocale('ar-ma', {
        months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        monthsShort: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        weekdays: 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return arMa;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Saudi Arabia) [ar-sa]
//! author : Suhail Alkowaileet : https://github.com/xsoh

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    };
    var numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    };

    var arSa = moment.defineLocale('ar-sa', {
        months: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM: function (input) {
            return 'م' === input;
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        preparse: function (string) {
            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return arSa;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale  :  Arabic (Tunisia) [ar-tn]
//! author : Nader Toukabri : https://github.com/naderio

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var arTn = moment.defineLocale('ar-tn', {
        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return arTn;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic [ar]
//! author : Abdel Said: https://github.com/abdelsaid
//! author : Ahmed Elkhatib
//! author : forabi https://github.com/forabi

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    };
    var numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    };
    var pluralForm = function (n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    };
    var plurals = {
        s: ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
        m: ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
        h: ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
        d: ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
        M: ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
        y: ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
    };
    var pluralize = function (u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = pluralForm(number),
                str = plurals[u][pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    };
    var months = ['كانون الثاني يناير', 'شباط فبراير', 'آذار مارس', 'نيسان أبريل', 'أيار مايو', 'حزيران يونيو', 'تموز يوليو', 'آب أغسطس', 'أيلول سبتمبر', 'تشرين الأول أكتوبر', 'تشرين الثاني نوفمبر', 'كانون الأول ديسمبر'];

    var ar = moment.defineLocale('ar', {
        months: months,
        monthsShort: months,
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'D/\u200FM/\u200FYYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM: function (input) {
            return 'م' === input;
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar: {
            sameDay: '[اليوم عند الساعة] LT',
            nextDay: '[غدًا عند الساعة] LT',
            nextWeek: 'dddd [عند الساعة] LT',
            lastDay: '[أمس عند الساعة] LT',
            lastWeek: 'dddd [عند الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'بعد %s',
            past: 'منذ %s',
            s: pluralize('s'),
            m: pluralize('m'),
            mm: pluralize('m'),
            h: pluralize('h'),
            hh: pluralize('h'),
            d: pluralize('d'),
            dd: pluralize('d'),
            M: pluralize('M'),
            MM: pluralize('M'),
            y: pluralize('y'),
            yy: pluralize('y')
        },
        preparse: function (string) {
            return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ar;
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Azerbaijani [az]
//! author : topchiyev : https://github.com/topchiyev

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var suffixes = {
        1: '-inci',
        5: '-inci',
        8: '-inci',
        70: '-inci',
        80: '-inci',
        2: '-nci',
        7: '-nci',
        20: '-nci',
        50: '-nci',
        3: '-üncü',
        4: '-üncü',
        100: '-üncü',
        6: '-ncı',
        9: '-uncu',
        10: '-uncu',
        30: '-uncu',
        60: '-ıncı',
        90: '-ıncı'
    };

    var az = moment.defineLocale('az', {
        months: 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
        monthsShort: 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
        weekdays: 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
        weekdaysShort: 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
        weekdaysMin: 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[bugün saat] LT',
            nextDay: '[sabah saat] LT',
            nextWeek: '[gələn həftə] dddd [saat] LT',
            lastDay: '[dünən] LT',
            lastWeek: '[keçən həftə] dddd [saat] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s sonra',
            past: '%s əvvəl',
            s: 'birneçə saniyyə',
            m: 'bir dəqiqə',
            mm: '%d dəqiqə',
            h: 'bir saat',
            hh: '%d saat',
            d: 'bir gün',
            dd: '%d gün',
            M: 'bir ay',
            MM: '%d ay',
            y: 'bir il',
            yy: '%d il'
        },
        meridiemParse: /gecə|səhər|gündüz|axşam/,
        isPM: function (input) {
            return (/^(gündüz|axşam)$/.test(input)
            );
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'gecə';
            } else if (hour < 12) {
                return 'səhər';
            } else if (hour < 17) {
                return 'gündüz';
            } else {
                return 'axşam';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
        ordinal: function (number) {
            if (number === 0) {
                // special case for zero
                return number + '-ıncı';
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;
            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return az;
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Belarusian [be]
//! author : Dmitry Demidov : https://github.com/demidov91
//! author: Praleska: http://praleska.pro/
//! Author : Menelion Elensúle : https://github.com/Oire

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
            'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
            'dd': 'дзень_дні_дзён',
            'MM': 'месяц_месяцы_месяцаў',
            'yy': 'год_гады_гадоў'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвіліна' : 'хвіліну';
        } else if (key === 'h') {
            return withoutSuffix ? 'гадзіна' : 'гадзіну';
        } else {
            return number + ' ' + plural(format[key], +number);
        }
    }

    var be = moment.defineLocale('be', {
        months: {
            format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
            standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
        },
        monthsShort: 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
        weekdays: {
            format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
            standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
            isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
        },
        weekdaysShort: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
        weekdaysMin: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY г.',
            LLL: 'D MMMM YYYY г., HH:mm',
            LLLL: 'dddd, D MMMM YYYY г., HH:mm'
        },
        calendar: {
            sameDay: '[Сёння ў] LT',
            nextDay: '[Заўтра ў] LT',
            lastDay: '[Учора ў] LT',
            nextWeek: function () {
                return '[У] dddd [ў] LT';
            },
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return '[У мінулую] dddd [ў] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[У мінулы] dddd [ў] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'праз %s',
            past: '%s таму',
            s: 'некалькі секунд',
            m: relativeTimeWithPlural,
            mm: relativeTimeWithPlural,
            h: relativeTimeWithPlural,
            hh: relativeTimeWithPlural,
            d: 'дзень',
            dd: relativeTimeWithPlural,
            M: 'месяц',
            MM: relativeTimeWithPlural,
            y: 'год',
            yy: relativeTimeWithPlural
        },
        meridiemParse: /ночы|раніцы|дня|вечара/,
        isPM: function (input) {
            return (/^(дня|вечара)$/.test(input)
            );
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночы';
            } else if (hour < 12) {
                return 'раніцы';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечара';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                case 'w':
                case 'W':
                    return (number % 10 === 2 || number % 10 === 3) && number % 100 !== 12 && number % 100 !== 13 ? number + '-і' : number + '-ы';
                case 'D':
                    return number + '-га';
                default:
                    return number;
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return be;
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Bulgarian [bg]
//! author : Krasen Borisov : https://github.com/kraz

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var bg = moment.defineLocale('bg', {
        months: 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
        monthsShort: 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
        weekdays: 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
        weekdaysShort: 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
        weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'D.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY H:mm',
            LLLL: 'dddd, D MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[Днес в] LT',
            nextDay: '[Утре в] LT',
            nextWeek: 'dddd [в] LT',
            lastDay: '[Вчера в] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return '[В изминалата] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[В изминалия] dddd [в] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'след %s',
            past: 'преди %s',
            s: 'няколко секунди',
            m: 'минута',
            mm: '%d минути',
            h: 'час',
            hh: '%d часа',
            d: 'ден',
            dd: '%d дни',
            M: 'месец',
            MM: '%d месеца',
            y: 'година',
            yy: '%d години'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal: function (number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-ев';
            } else if (last2Digits === 0) {
                return number + '-ен';
            } else if (last2Digits > 10 && last2Digits < 20) {
                return number + '-ти';
            } else if (lastDigit === 1) {
                return number + '-ви';
            } else if (lastDigit === 2) {
                return number + '-ри';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-ми';
            } else {
                return number + '-ти';
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return bg;
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Bengali [bn]
//! author : Kaushik Gandhi : https://github.com/kaushikgandhi

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
        '0': '০'
    };
    var numberMap = {
        '১': '1',
        '২': '2',
        '৩': '3',
        '৪': '4',
        '৫': '5',
        '৬': '6',
        '৭': '7',
        '৮': '8',
        '৯': '9',
        '০': '0'
    };

    var bn = moment.defineLocale('bn', {
        months: 'জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
        monthsShort: 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
        weekdays: 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
        weekdaysShort: 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
        weekdaysMin: 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
        longDateFormat: {
            LT: 'A h:mm সময়',
            LTS: 'A h:mm:ss সময়',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm সময়',
            LLLL: 'dddd, D MMMM YYYY, A h:mm সময়'
        },
        calendar: {
            sameDay: '[আজ] LT',
            nextDay: '[আগামীকাল] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[গতকাল] LT',
            lastWeek: '[গত] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s পরে',
            past: '%s আগে',
            s: 'কয়েক সেকেন্ড',
            m: 'এক মিনিট',
            mm: '%d মিনিট',
            h: 'এক ঘন্টা',
            hh: '%d ঘন্টা',
            d: 'এক দিন',
            dd: '%d দিন',
            M: 'এক মাস',
            MM: '%d মাস',
            y: 'এক বছর',
            yy: '%d বছর'
        },
        preparse: function (string) {
            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'রাত' && hour >= 4 || meridiem === 'দুপুর' && hour < 5 || meridiem === 'বিকাল') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'রাত';
            } else if (hour < 10) {
                return 'সকাল';
            } else if (hour < 17) {
                return 'দুপুর';
            } else if (hour < 20) {
                return 'বিকাল';
            } else {
                return 'রাত';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return bn;
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tibetan [bo]
//! author : Thupten N. Chakrishar : https://github.com/vajradog

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '༡',
        '2': '༢',
        '3': '༣',
        '4': '༤',
        '5': '༥',
        '6': '༦',
        '7': '༧',
        '8': '༨',
        '9': '༩',
        '0': '༠'
    };
    var numberMap = {
        '༡': '1',
        '༢': '2',
        '༣': '3',
        '༤': '4',
        '༥': '5',
        '༦': '6',
        '༧': '7',
        '༨': '8',
        '༩': '9',
        '༠': '0'
    };

    var bo = moment.defineLocale('bo', {
        months: 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
        monthsShort: 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
        weekdays: 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
        weekdaysShort: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
        weekdaysMin: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
        longDateFormat: {
            LT: 'A h:mm',
            LTS: 'A h:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm',
            LLLL: 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar: {
            sameDay: '[དི་རིང] LT',
            nextDay: '[སང་ཉིན] LT',
            nextWeek: '[བདུན་ཕྲག་རྗེས་མ], LT',
            lastDay: '[ཁ་སང] LT',
            lastWeek: '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s ལ་',
            past: '%s སྔན་ལ',
            s: 'ལམ་སང',
            m: 'སྐར་མ་གཅིག',
            mm: '%d སྐར་མ',
            h: 'ཆུ་ཚོད་གཅིག',
            hh: '%d ཆུ་ཚོད',
            d: 'ཉིན་གཅིག',
            dd: '%d ཉིན་',
            M: 'ཟླ་བ་གཅིག',
            MM: '%d ཟླ་བ',
            y: 'ལོ་གཅིག',
            yy: '%d ལོ'
        },
        preparse: function (string) {
            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'མཚན་མོ' && hour >= 4 || meridiem === 'ཉིན་གུང' && hour < 5 || meridiem === 'དགོང་དག') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'མཚན་མོ';
            } else if (hour < 10) {
                return 'ཞོགས་ཀས';
            } else if (hour < 17) {
                return 'ཉིན་གུང';
            } else if (hour < 20) {
                return 'དགོང་དག';
            } else {
                return 'མཚན་མོ';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return bo;
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Breton [br]
//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function relativeTimeWithMutation(number, withoutSuffix, key) {
        var format = {
            'mm': 'munutenn',
            'MM': 'miz',
            'dd': 'devezh'
        };
        return number + ' ' + mutation(format[key], number);
    }
    function specialMutationForYears(number) {
        switch (lastNumber(number)) {
            case 1:
            case 3:
            case 4:
            case 5:
            case 9:
                return number + ' bloaz';
            default:
                return number + ' vloaz';
        }
    }
    function lastNumber(number) {
        if (number > 9) {
            return lastNumber(number % 10);
        }
        return number;
    }
    function mutation(text, number) {
        if (number === 2) {
            return softMutation(text);
        }
        return text;
    }
    function softMutation(text) {
        var mutationTable = {
            'm': 'v',
            'b': 'v',
            'd': 'z'
        };
        if (mutationTable[text.charAt(0)] === undefined) {
            return text;
        }
        return mutationTable[text.charAt(0)] + text.substring(1);
    }

    var br = moment.defineLocale('br', {
        months: 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
        monthsShort: 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
        weekdays: 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
        weekdaysShort: 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
        weekdaysMin: 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'h[e]mm A',
            LTS: 'h[e]mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D [a viz] MMMM YYYY',
            LLL: 'D [a viz] MMMM YYYY h[e]mm A',
            LLLL: 'dddd, D [a viz] MMMM YYYY h[e]mm A'
        },
        calendar: {
            sameDay: '[Hiziv da] LT',
            nextDay: '[Warc\'hoazh da] LT',
            nextWeek: 'dddd [da] LT',
            lastDay: '[Dec\'h da] LT',
            lastWeek: 'dddd [paset da] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'a-benn %s',
            past: '%s \'zo',
            s: 'un nebeud segondennoù',
            m: 'ur vunutenn',
            mm: relativeTimeWithMutation,
            h: 'un eur',
            hh: '%d eur',
            d: 'un devezh',
            dd: relativeTimeWithMutation,
            M: 'ur miz',
            MM: relativeTimeWithMutation,
            y: 'ur bloaz',
            yy: specialMutationForYears
        },
        dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
        ordinal: function (number) {
            var output = number === 1 ? 'añ' : 'vet';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return br;
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Bosnian [bs]
//! author : Nedim Cholich : https://github.com/frontyard
//! based on (hr) translation by Bojan Marković

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'm':
                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
            case 'mm':
                if (number === 1) {
                    result += 'minuta';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'minute';
                } else {
                    result += 'minuta';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'jedan sat' : 'jednog sata';
            case 'hh':
                if (number === 1) {
                    result += 'sat';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sata';
                } else {
                    result += 'sati';
                }
                return result;
            case 'dd':
                if (number === 1) {
                    result += 'dan';
                } else {
                    result += 'dana';
                }
                return result;
            case 'MM':
                if (number === 1) {
                    result += 'mjesec';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'mjeseca';
                } else {
                    result += 'mjeseci';
                }
                return result;
            case 'yy':
                if (number === 1) {
                    result += 'godina';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'godine';
                } else {
                    result += 'godina';
                }
                return result;
        }
    }

    var bs = moment.defineLocale('bs', {
        months: 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sutra u] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay: '[jučer u] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return '[prošlu] dddd [u] LT';
                    case 6:
                        return '[prošle] [subote] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prošli] dddd [u] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'prije %s',
            s: 'par sekundi',
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: 'dan',
            dd: translate,
            M: 'mjesec',
            MM: translate,
            y: 'godinu',
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return bs;
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Catalan [ca]
//! author : Juan G. Hurtado : https://github.com/juanghurtado

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var ca = moment.defineLocale('ca', {
        months: {
            standalone: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
            format: 'de gener_de febrer_de març_d\'abril_de maig_de juny_de juliol_d\'agost_de setembre_d\'octubre_de novembre_de desembre'.split('_'),
            isFormat: /D[oD]?(\s)+MMMM/
        },
        monthsShort: 'gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.'.split('_'),
        monthsParseExact: true,
        weekdays: 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
        weekdaysShort: 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
        weekdaysMin: 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD/MM/YYYY',
            LL: '[el] D MMMM [de] YYYY',
            ll: 'D MMM YYYY',
            LLL: '[el] D MMMM [de] YYYY [a les] H:mm',
            lll: 'D MMM YYYY, H:mm',
            LLLL: '[el] dddd D MMMM [de] YYYY [a les] H:mm',
            llll: 'ddd D MMM YYYY, H:mm'
        },
        calendar: {
            sameDay: function () {
                return '[avui a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
            },
            nextDay: function () {
                return '[demà a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
            },
            nextWeek: function () {
                return 'dddd [a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
            },
            lastDay: function () {
                return '[ahir a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
            },
            lastWeek: function () {
                return '[el] dddd [passat a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'd\'aquí %s',
            past: 'fa %s',
            s: 'uns segons',
            m: 'un minut',
            mm: '%d minuts',
            h: 'una hora',
            hh: '%d hores',
            d: 'un dia',
            dd: '%d dies',
            M: 'un mes',
            MM: '%d mesos',
            y: 'un any',
            yy: '%d anys'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
        ordinal: function (number, period) {
            var output = number === 1 ? 'r' : number === 2 ? 'n' : number === 3 ? 'r' : number === 4 ? 't' : 'è';
            if (period === 'w' || period === 'W') {
                output = 'a';
            }
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ca;
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Czech [cs]
//! author : petrbela : https://github.com/petrbela

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_');
    var monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
    function plural(n) {
        return n > 1 && n < 5 && ~~(n / 10) !== 1;
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                // a few seconds / in a few seconds / a few seconds ago
                return withoutSuffix || isFuture ? 'pár sekund' : 'pár sekundami';
            case 'm':
                // a minute / in a minute / a minute ago
                return withoutSuffix ? 'minuta' : isFuture ? 'minutu' : 'minutou';
            case 'mm':
                // 9 minutes / in 9 minutes / 9 minutes ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'minuty' : 'minut');
                } else {
                    return result + 'minutami';
                }
                break;
            case 'h':
                // an hour / in an hour / an hour ago
                return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';
            case 'hh':
                // 9 hours / in 9 hours / 9 hours ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'hodiny' : 'hodin');
                } else {
                    return result + 'hodinami';
                }
                break;
            case 'd':
                // a day / in a day / a day ago
                return withoutSuffix || isFuture ? 'den' : 'dnem';
            case 'dd':
                // 9 days / in 9 days / 9 days ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'dny' : 'dní');
                } else {
                    return result + 'dny';
                }
                break;
            case 'M':
                // a month / in a month / a month ago
                return withoutSuffix || isFuture ? 'měsíc' : 'měsícem';
            case 'MM':
                // 9 months / in 9 months / 9 months ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'měsíce' : 'měsíců');
                } else {
                    return result + 'měsíci';
                }
                break;
            case 'y':
                // a year / in a year / a year ago
                return withoutSuffix || isFuture ? 'rok' : 'rokem';
            case 'yy':
                // 9 years / in 9 years / 9 years ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'roky' : 'let');
                } else {
                    return result + 'lety';
                }
                break;
        }
    }

    var cs = moment.defineLocale('cs', {
        months: months,
        monthsShort: monthsShort,
        monthsParse: function (months, monthsShort) {
            var i,
                _monthsParse = [];
            for (i = 0; i < 12; i++) {
                // use custom parser to solve problem with July (červenec)
                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
            }
            return _monthsParse;
        }(months, monthsShort),
        shortMonthsParse: function (monthsShort) {
            var i,
                _shortMonthsParse = [];
            for (i = 0; i < 12; i++) {
                _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
            }
            return _shortMonthsParse;
        }(monthsShort),
        longMonthsParse: function (months) {
            var i,
                _longMonthsParse = [];
            for (i = 0; i < 12; i++) {
                _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
            }
            return _longMonthsParse;
        }(months),
        weekdays: 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
        weekdaysShort: 'ne_po_út_st_čt_pá_so'.split('_'),
        weekdaysMin: 'ne_po_út_st_čt_pá_so'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd D. MMMM YYYY H:mm',
            l: 'D. M. YYYY'
        },
        calendar: {
            sameDay: '[dnes v] LT',
            nextDay: '[zítra v] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[v neděli v] LT';
                    case 1:
                    case 2:
                        return '[v] dddd [v] LT';
                    case 3:
                        return '[ve středu v] LT';
                    case 4:
                        return '[ve čtvrtek v] LT';
                    case 5:
                        return '[v pátek v] LT';
                    case 6:
                        return '[v sobotu v] LT';
                }
            },
            lastDay: '[včera v] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[minulou neděli v] LT';
                    case 1:
                    case 2:
                        return '[minulé] dddd [v] LT';
                    case 3:
                        return '[minulou středu v] LT';
                    case 4:
                    case 5:
                        return '[minulý] dddd [v] LT';
                    case 6:
                        return '[minulou sobotu v] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'před %s',
            s: translate,
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: translate,
            dd: translate,
            M: translate,
            MM: translate,
            y: translate,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return cs;
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chuvash [cv]
//! author : Anatoly Mironov : https://github.com/mirontoli

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var cv = moment.defineLocale('cv', {
        months: 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
        monthsShort: 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
        weekdays: 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
        weekdaysShort: 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
        weekdaysMin: 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD-MM-YYYY',
            LL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
            LLL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
            LLLL: 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
        },
        calendar: {
            sameDay: '[Паян] LT [сехетре]',
            nextDay: '[Ыран] LT [сехетре]',
            lastDay: '[Ӗнер] LT [сехетре]',
            nextWeek: '[Ҫитес] dddd LT [сехетре]',
            lastWeek: '[Иртнӗ] dddd LT [сехетре]',
            sameElse: 'L'
        },
        relativeTime: {
            future: function (output) {
                var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
                return output + affix;
            },
            past: '%s каялла',
            s: 'пӗр-ик ҫеккунт',
            m: 'пӗр минут',
            mm: '%d минут',
            h: 'пӗр сехет',
            hh: '%d сехет',
            d: 'пӗр кун',
            dd: '%d кун',
            M: 'пӗр уйӑх',
            MM: '%d уйӑх',
            y: 'пӗр ҫул',
            yy: '%d ҫул'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
        ordinal: '%d-мӗш',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return cv;
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Welsh [cy]
//! author : Robert Allen : https://github.com/robgallen
//! author : https://github.com/ryangreaves

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var cy = moment.defineLocale('cy', {
        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
        weekdaysParseExact: true,
        // time formats are the same as en-gb
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Heddiw am] LT',
            nextDay: '[Yfory am] LT',
            nextWeek: 'dddd [am] LT',
            lastDay: '[Ddoe am] LT',
            lastWeek: 'dddd [diwethaf am] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'mewn %s',
            past: '%s yn ôl',
            s: 'ychydig eiliadau',
            m: 'munud',
            mm: '%d munud',
            h: 'awr',
            hh: '%d awr',
            d: 'diwrnod',
            dd: '%d diwrnod',
            M: 'mis',
            MM: '%d mis',
            y: 'blwyddyn',
            yy: '%d flynedd'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
        ordinal: function (number) {
            var b = number,
                output = '',
                lookup = ['', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
            'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
            ];
            if (b > 20) {
                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
                    output = 'fed'; // not 30ain, 70ain or 90ain
                } else {
                    output = 'ain';
                }
            } else if (b > 0) {
                output = lookup[b];
            }
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return cy;
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Danish [da]
//! author : Ulrik Nielsen : https://github.com/mrbase

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var da = moment.defineLocale('da', {
        months: 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
        monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
        weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
        weekdaysShort: 'søn_man_tir_ons_tor_fre_lør'.split('_'),
        weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY HH:mm',
            LLLL: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
        },
        calendar: {
            sameDay: '[i dag kl.] LT',
            nextDay: '[i morgen kl.] LT',
            nextWeek: 'på dddd [kl.] LT',
            lastDay: '[i går kl.] LT',
            lastWeek: '[i] dddd[s kl.] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'om %s',
            past: '%s siden',
            s: 'få sekunder',
            m: 'et minut',
            mm: '%d minutter',
            h: 'en time',
            hh: '%d timer',
            d: 'en dag',
            dd: '%d dage',
            M: 'en måned',
            MM: '%d måneder',
            y: 'et år',
            yy: '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return da;
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : German (Austria) [de-at]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Martin Groller : https://github.com/MadMG
//! author : Mikolaj Dadela : https://github.com/mik01aj

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var deAt = moment.defineLocale('de-at', {
        months: 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY HH:mm',
            LLLL: 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime: {
            future: 'in %s',
            past: 'vor %s',
            s: 'ein paar Sekunden',
            m: processRelativeTime,
            mm: '%d Minuten',
            h: processRelativeTime,
            hh: '%d Stunden',
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return deAt;
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : German (Switzerland) [de-ch]
//! author : sschueller : https://github.com/sschueller

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    // based on: https://www.bk.admin.ch/dokumentation/sprachen/04915/05016/index.html?lang=de#

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var deCh = moment.defineLocale('de-ch', {
        months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jan._Febr._März_April_Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY HH.mm',
            LLLL: 'dddd, D. MMMM YYYY HH.mm'
        },
        calendar: {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime: {
            future: 'in %s',
            past: 'vor %s',
            s: 'ein paar Sekunden',
            m: processRelativeTime,
            mm: '%d Minuten',
            h: processRelativeTime,
            hh: '%d Stunden',
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return deCh;
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : German [de]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var de = moment.defineLocale('de', {
        months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY HH:mm',
            LLLL: 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime: {
            future: 'in %s',
            past: 'vor %s',
            s: 'ein paar Sekunden',
            m: processRelativeTime,
            mm: '%d Minuten',
            h: processRelativeTime,
            hh: '%d Stunden',
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return de;
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Maldivian [dv]
//! author : Jawish Hameed : https://github.com/jawish

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var months = ['ޖެނުއަރީ', 'ފެބްރުއަރީ', 'މާރިޗު', 'އޭޕްރީލު', 'މޭ', 'ޖޫން', 'ޖުލައި', 'އޯގަސްޓު', 'ސެޕްޓެމްބަރު', 'އޮކްޓޯބަރު', 'ނޮވެމްބަރު', 'ޑިސެމްބަރު'];
    var weekdays = ['އާދިއްތަ', 'ހޯމަ', 'އަންގާރަ', 'ބުދަ', 'ބުރާސްފަތި', 'ހުކުރު', 'ހޮނިހިރު'];

    var dv = moment.defineLocale('dv', {
        months: months,
        monthsShort: months,
        weekdays: weekdays,
        weekdaysShort: weekdays,
        weekdaysMin: 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
        longDateFormat: {

            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'D/M/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /މކ|މފ/,
        isPM: function (input) {
            return 'މފ' === input;
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'މކ';
            } else {
                return 'މފ';
            }
        },
        calendar: {
            sameDay: '[މިއަދު] LT',
            nextDay: '[މާދަމާ] LT',
            nextWeek: 'dddd LT',
            lastDay: '[އިއްޔެ] LT',
            lastWeek: '[ފާއިތުވި] dddd LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'ތެރޭގައި %s',
            past: 'ކުރިން %s',
            s: 'ސިކުންތުކޮޅެއް',
            m: 'މިނިޓެއް',
            mm: 'މިނިޓު %d',
            h: 'ގަޑިއިރެއް',
            hh: 'ގަޑިއިރު %d',
            d: 'ދުވަހެއް',
            dd: 'ދުވަސް %d',
            M: 'މަހެއް',
            MM: 'މަސް %d',
            y: 'އަހަރެއް',
            yy: 'އަހަރު %d'
        },
        preparse: function (string) {
            return string.replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '،');
        },
        week: {
            dow: 7, // Sunday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return dv;
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Greek [el]
//! author : Aggelos Karalias : https://github.com/mehiel

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    var el = moment.defineLocale('el', {
        monthsNominativeEl: 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
        monthsGenitiveEl: 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
        months: function (momentToFormat, format) {
            if (!momentToFormat) {
                return this._monthsNominativeEl;
            } else if (/D/.test(format.substring(0, format.indexOf('MMMM')))) {
                // if there is a day number before 'MMMM'
                return this._monthsGenitiveEl[momentToFormat.month()];
            } else {
                return this._monthsNominativeEl[momentToFormat.month()];
            }
        },
        monthsShort: 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
        weekdays: 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
        weekdaysShort: 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
        weekdaysMin: 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
        meridiem: function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'μμ' : 'ΜΜ';
            } else {
                return isLower ? 'πμ' : 'ΠΜ';
            }
        },
        isPM: function (input) {
            return (input + '').toLowerCase()[0] === 'μ';
        },
        meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendarEl: {
            sameDay: '[Σήμερα {}] LT',
            nextDay: '[Αύριο {}] LT',
            nextWeek: 'dddd [{}] LT',
            lastDay: '[Χθες {}] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 6:
                        return '[το προηγούμενο] dddd [{}] LT';
                    default:
                        return '[την προηγούμενη] dddd [{}] LT';
                }
            },
            sameElse: 'L'
        },
        calendar: function (key, mom) {
            var output = this._calendarEl[key],
                hours = mom && mom.hours();
            if (isFunction(output)) {
                output = output.apply(mom);
            }
            return output.replace('{}', hours % 12 === 1 ? 'στη' : 'στις');
        },
        relativeTime: {
            future: 'σε %s',
            past: '%s πριν',
            s: 'λίγα δευτερόλεπτα',
            m: 'ένα λεπτό',
            mm: '%d λεπτά',
            h: 'μία ώρα',
            hh: '%d ώρες',
            d: 'μία μέρα',
            dd: '%d μέρες',
            M: 'ένας μήνας',
            MM: '%d μήνες',
            y: 'ένας χρόνος',
            yy: '%d χρόνια'
        },
        dayOfMonthOrdinalParse: /\d{1,2}η/,
        ordinal: '%dη',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4st is the first week of the year.
        }
    });

    return el;
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (Australia) [en-au]
//! author : Jared Morse : https://github.com/jarcoal

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var enAu = moment.defineLocale('en-au', {
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enAu;
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (Canada) [en-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var enCa = moment.defineLocale('en-ca', {
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'YYYY-MM-DD',
            LL: 'MMMM D, YYYY',
            LLL: 'MMMM D, YYYY h:mm A',
            LLLL: 'dddd, MMMM D, YYYY h:mm A'
        },
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        }
    });

    return enCa;
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (United Kingdom) [en-gb]
//! author : Chris Gedrim : https://github.com/chrisgedrim

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var enGb = moment.defineLocale('en-gb', {
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enGb;
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (Ireland) [en-ie]
//! author : Chris Cartlidge : https://github.com/chriscartlidge

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var enIe = moment.defineLocale('en-ie', {
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD-MM-YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enIe;
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (New Zealand) [en-nz]
//! author : Luke McGregor : https://github.com/lukemcgregor

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var enNz = moment.defineLocale('en-nz', {
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enNz;
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Esperanto [eo]
//! author : Colin Dean : https://github.com/colindean
//! author : Mia Nordentoft Imperatori : https://github.com/miestasmia
//! comment : miestasmia corrected the translation by colindean

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var eo = moment.defineLocale('eo', {
        months: 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
        monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
        weekdays: 'dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato'.split('_'),
        weekdaysShort: 'dim_lun_mard_merk_ĵaŭ_ven_sab'.split('_'),
        weekdaysMin: 'di_lu_ma_me_ĵa_ve_sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'D[-a de] MMMM, YYYY',
            LLL: 'D[-a de] MMMM, YYYY HH:mm',
            LLLL: 'dddd, [la] D[-a de] MMMM, YYYY HH:mm'
        },
        meridiemParse: /[ap]\.t\.m/i,
        isPM: function (input) {
            return input.charAt(0).toLowerCase() === 'p';
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'p.t.m.' : 'P.T.M.';
            } else {
                return isLower ? 'a.t.m.' : 'A.T.M.';
            }
        },
        calendar: {
            sameDay: '[Hodiaŭ je] LT',
            nextDay: '[Morgaŭ je] LT',
            nextWeek: 'dddd [je] LT',
            lastDay: '[Hieraŭ je] LT',
            lastWeek: '[pasinta] dddd [je] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'post %s',
            past: 'antaŭ %s',
            s: 'sekundoj',
            m: 'minuto',
            mm: '%d minutoj',
            h: 'horo',
            hh: '%d horoj',
            d: 'tago', //ne 'diurno', ĉar estas uzita por proksimumo
            dd: '%d tagoj',
            M: 'monato',
            MM: '%d monatoj',
            y: 'jaro',
            yy: '%d jaroj'
        },
        dayOfMonthOrdinalParse: /\d{1,2}a/,
        ordinal: '%da',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return eo;
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Spanish (Dominican Republic) [es-do]

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
    var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var esDo = moment.defineLocale('es-do', {
        months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort: function (m, format) {
            if (!m) {
                return monthsShortDot;
            } else if (/-MMM-/.test(format)) {
                return monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        monthsParseExact: true,
        weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY h:mm A',
            LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
        },
        calendar: {
            sameDay: function () {
                return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            nextDay: function () {
                return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            nextWeek: function () {
                return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            lastDay: function () {
                return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            lastWeek: function () {
                return '[el] dddd [pasado a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'en %s',
            past: 'hace %s',
            s: 'unos segundos',
            m: 'un minuto',
            mm: '%d minutos',
            h: 'una hora',
            hh: '%d horas',
            d: 'un día',
            dd: '%d días',
            M: 'un mes',
            MM: '%d meses',
            y: 'un año',
            yy: '%d años'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return esDo;
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Spanish [es]
//! author : Julio Napurí : https://github.com/julionc

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
    var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var es = moment.defineLocale('es', {
        months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort: function (m, format) {
            if (!m) {
                return monthsShortDot;
            } else if (/-MMM-/.test(format)) {
                return monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        monthsParseExact: true,
        weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY H:mm',
            LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar: {
            sameDay: function () {
                return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            nextDay: function () {
                return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            nextWeek: function () {
                return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            lastDay: function () {
                return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            lastWeek: function () {
                return '[el] dddd [pasado a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'en %s',
            past: 'hace %s',
            s: 'unos segundos',
            m: 'un minuto',
            mm: '%d minutos',
            h: 'una hora',
            hh: '%d horas',
            d: 'un día',
            dd: '%d días',
            M: 'un mes',
            MM: '%d meses',
            y: 'un año',
            yy: '%d años'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return es;
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Estonian [et]
//! author : Henry Kehlmann : https://github.com/madhenry
//! improvements : Illimar Tambek : https://github.com/ragulka

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
            'm': ['ühe minuti', 'üks minut'],
            'mm': [number + ' minuti', number + ' minutit'],
            'h': ['ühe tunni', 'tund aega', 'üks tund'],
            'hh': [number + ' tunni', number + ' tundi'],
            'd': ['ühe päeva', 'üks päev'],
            'M': ['kuu aja', 'kuu aega', 'üks kuu'],
            'MM': [number + ' kuu', number + ' kuud'],
            'y': ['ühe aasta', 'aasta', 'üks aasta'],
            'yy': [number + ' aasta', number + ' aastat']
        };
        if (withoutSuffix) {
            return format[key][2] ? format[key][2] : format[key][1];
        }
        return isFuture ? format[key][0] : format[key][1];
    }

    var et = moment.defineLocale('et', {
        months: 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
        monthsShort: 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
        weekdays: 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
        weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
        weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[Täna,] LT',
            nextDay: '[Homme,] LT',
            nextWeek: '[Järgmine] dddd LT',
            lastDay: '[Eile,] LT',
            lastWeek: '[Eelmine] dddd LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s pärast',
            past: '%s tagasi',
            s: processRelativeTime,
            m: processRelativeTime,
            mm: processRelativeTime,
            h: processRelativeTime,
            hh: processRelativeTime,
            d: processRelativeTime,
            dd: '%d päeva',
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return et;
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Basque [eu]
//! author : Eneko Illarramendi : https://github.com/eillarra

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var eu = moment.defineLocale('eu', {
        months: 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
        monthsShort: 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
        monthsParseExact: true,
        weekdays: 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
        weekdaysShort: 'ig._al._ar._az._og._ol._lr.'.split('_'),
        weekdaysMin: 'ig_al_ar_az_og_ol_lr'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'YYYY[ko] MMMM[ren] D[a]',
            LLL: 'YYYY[ko] MMMM[ren] D[a] HH:mm',
            LLLL: 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
            l: 'YYYY-M-D',
            ll: 'YYYY[ko] MMM D[a]',
            lll: 'YYYY[ko] MMM D[a] HH:mm',
            llll: 'ddd, YYYY[ko] MMM D[a] HH:mm'
        },
        calendar: {
            sameDay: '[gaur] LT[etan]',
            nextDay: '[bihar] LT[etan]',
            nextWeek: 'dddd LT[etan]',
            lastDay: '[atzo] LT[etan]',
            lastWeek: '[aurreko] dddd LT[etan]',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s barru',
            past: 'duela %s',
            s: 'segundo batzuk',
            m: 'minutu bat',
            mm: '%d minutu',
            h: 'ordu bat',
            hh: '%d ordu',
            d: 'egun bat',
            dd: '%d egun',
            M: 'hilabete bat',
            MM: '%d hilabete',
            y: 'urte bat',
            yy: '%d urte'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return eu;
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Persian [fa]
//! author : Ebrahim Byagowi : https://github.com/ebraminio

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
        '0': '۰'
    };
    var numberMap = {
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '۰': '0'
    };

    var fa = moment.defineLocale('fa', {
        months: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
        monthsShort: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
        weekdays: 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
        weekdaysShort: 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
        weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        meridiemParse: /قبل از ظهر|بعد از ظهر/,
        isPM: function (input) {
            return (/بعد از ظهر/.test(input)
            );
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'قبل از ظهر';
            } else {
                return 'بعد از ظهر';
            }
        },
        calendar: {
            sameDay: '[امروز ساعت] LT',
            nextDay: '[فردا ساعت] LT',
            nextWeek: 'dddd [ساعت] LT',
            lastDay: '[دیروز ساعت] LT',
            lastWeek: 'dddd [پیش] [ساعت] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'در %s',
            past: '%s پیش',
            s: 'چند ثانیه',
            m: 'یک دقیقه',
            mm: '%d دقیقه',
            h: 'یک ساعت',
            hh: '%d ساعت',
            d: 'یک روز',
            dd: '%d روز',
            M: 'یک ماه',
            MM: '%d ماه',
            y: 'یک سال',
            yy: '%d سال'
        },
        preparse: function (string) {
            return string.replace(/[۰-۹]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        dayOfMonthOrdinalParse: /\d{1,2}م/,
        ordinal: '%dم',
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return fa;
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Finnish [fi]
//! author : Tarmo Aidantausta : https://github.com/bleadof

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' ');
    var numbersFuture = ['nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden', numbersPast[7], numbersPast[8], numbersPast[9]];
    function translate(number, withoutSuffix, key, isFuture) {
        var result = '';
        switch (key) {
            case 's':
                return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
            case 'm':
                return isFuture ? 'minuutin' : 'minuutti';
            case 'mm':
                result = isFuture ? 'minuutin' : 'minuuttia';
                break;
            case 'h':
                return isFuture ? 'tunnin' : 'tunti';
            case 'hh':
                result = isFuture ? 'tunnin' : 'tuntia';
                break;
            case 'd':
                return isFuture ? 'päivän' : 'päivä';
            case 'dd':
                result = isFuture ? 'päivän' : 'päivää';
                break;
            case 'M':
                return isFuture ? 'kuukauden' : 'kuukausi';
            case 'MM':
                result = isFuture ? 'kuukauden' : 'kuukautta';
                break;
            case 'y':
                return isFuture ? 'vuoden' : 'vuosi';
            case 'yy':
                result = isFuture ? 'vuoden' : 'vuotta';
                break;
        }
        result = verbalNumber(number, isFuture) + ' ' + result;
        return result;
    }
    function verbalNumber(number, isFuture) {
        return number < 10 ? isFuture ? numbersFuture[number] : numbersPast[number] : number;
    }

    var fi = moment.defineLocale('fi', {
        months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
        monthsShort: 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
        weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
        weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
        weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD.MM.YYYY',
            LL: 'Do MMMM[ta] YYYY',
            LLL: 'Do MMMM[ta] YYYY, [klo] HH.mm',
            LLLL: 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
            l: 'D.M.YYYY',
            ll: 'Do MMM YYYY',
            lll: 'Do MMM YYYY, [klo] HH.mm',
            llll: 'ddd, Do MMM YYYY, [klo] HH.mm'
        },
        calendar: {
            sameDay: '[tänään] [klo] LT',
            nextDay: '[huomenna] [klo] LT',
            nextWeek: 'dddd [klo] LT',
            lastDay: '[eilen] [klo] LT',
            lastWeek: '[viime] dddd[na] [klo] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s päästä',
            past: '%s sitten',
            s: translate,
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: translate,
            dd: translate,
            M: translate,
            MM: translate,
            y: translate,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fi;
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Faroese [fo]
//! author : Ragnar Johannesen : https://github.com/ragnar123

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var fo = moment.defineLocale('fo', {
        months: 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
        weekdays: 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
        weekdaysShort: 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
        weekdaysMin: 'su_má_tý_mi_hó_fr_le'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D. MMMM, YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Í dag kl.] LT',
            nextDay: '[Í morgin kl.] LT',
            nextWeek: 'dddd [kl.] LT',
            lastDay: '[Í gjár kl.] LT',
            lastWeek: '[síðstu] dddd [kl] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'um %s',
            past: '%s síðani',
            s: 'fá sekund',
            m: 'ein minutt',
            mm: '%d minuttir',
            h: 'ein tími',
            hh: '%d tímar',
            d: 'ein dagur',
            dd: '%d dagar',
            M: 'ein mánaði',
            MM: '%d mánaðir',
            y: 'eitt ár',
            yy: '%d ár'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fo;
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : French (Canada) [fr-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var frCa = moment.defineLocale('fr-ca', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact: true,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal: function (number, period) {
            switch (period) {
                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'D':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        }
    });

    return frCa;
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : French (Switzerland) [fr-ch]
//! author : Gaspard Bucher : https://github.com/gaspard

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var frCh = moment.defineLocale('fr-ch', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact: true,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal: function (number, period) {
            switch (period) {
                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'D':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return frCh;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : French [fr]
//! author : John Fischer : https://github.com/jfroffice

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var fr = moment.defineLocale('fr', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact: true,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
        ordinal: function (number, period) {
            switch (period) {
                // TODO: Return 'e' when day of month > 1. Move this case inside
                // block for masculine words below.
                // See https://github.com/moment/moment/issues/3375
                case 'D':
                    return number + (number === 1 ? 'er' : '');

                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fr;
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Frisian [fy]
//! author : Robin van der Vliet : https://github.com/robin0van0der0v

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_');
    var monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

    var fy = moment.defineLocale('fy', {
        months: 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
        monthsShort: function (m, format) {
            if (!m) {
                return monthsShortWithDots;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },
        monthsParseExact: true,
        weekdays: 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
        weekdaysShort: 'si._mo._ti._wo._to._fr._so.'.split('_'),
        weekdaysMin: 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD-MM-YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[hjoed om] LT',
            nextDay: '[moarn om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[juster om] LT',
            lastWeek: '[ôfrûne] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'oer %s',
            past: '%s lyn',
            s: 'in pear sekonden',
            m: 'ien minút',
            mm: '%d minuten',
            h: 'ien oere',
            hh: '%d oeren',
            d: 'ien dei',
            dd: '%d dagen',
            M: 'ien moanne',
            MM: '%d moannen',
            y: 'ien jier',
            yy: '%d jierren'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function (number) {
            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fy;
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Scottish Gaelic [gd]
//! author : Jon Ashdown : https://github.com/jonashdown

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var months = ['Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'];

    var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

    var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

    var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

    var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

    var gd = moment.defineLocale('gd', {
        months: months,
        monthsShort: monthsShort,
        monthsParseExact: true,
        weekdays: weekdays,
        weekdaysShort: weekdaysShort,
        weekdaysMin: weekdaysMin,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[An-diugh aig] LT',
            nextDay: '[A-màireach aig] LT',
            nextWeek: 'dddd [aig] LT',
            lastDay: '[An-dè aig] LT',
            lastWeek: 'dddd [seo chaidh] [aig] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'ann an %s',
            past: 'bho chionn %s',
            s: 'beagan diogan',
            m: 'mionaid',
            mm: '%d mionaidean',
            h: 'uair',
            hh: '%d uairean',
            d: 'latha',
            dd: '%d latha',
            M: 'mìos',
            MM: '%d mìosan',
            y: 'bliadhna',
            yy: '%d bliadhna'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
        ordinal: function (number) {
            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return gd;
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Galician [gl]
//! author : Juan G. Hurtado : https://github.com/juanghurtado

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var gl = moment.defineLocale('gl', {
        months: 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
        monthsShort: 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
        weekdaysShort: 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
        weekdaysMin: 'do_lu_ma_mé_xo_ve_sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY H:mm',
            LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar: {
            sameDay: function () {
                return '[hoxe ' + (this.hours() !== 1 ? 'ás' : 'á') + '] LT';
            },
            nextDay: function () {
                return '[mañá ' + (this.hours() !== 1 ? 'ás' : 'á') + '] LT';
            },
            nextWeek: function () {
                return 'dddd [' + (this.hours() !== 1 ? 'ás' : 'a') + '] LT';
            },
            lastDay: function () {
                return '[onte ' + (this.hours() !== 1 ? 'á' : 'a') + '] LT';
            },
            lastWeek: function () {
                return '[o] dddd [pasado ' + (this.hours() !== 1 ? 'ás' : 'a') + '] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: function (str) {
                if (str.indexOf('un') === 0) {
                    return 'n' + str;
                }
                return 'en ' + str;
            },
            past: 'hai %s',
            s: 'uns segundos',
            m: 'un minuto',
            mm: '%d minutos',
            h: 'unha hora',
            hh: '%d horas',
            d: 'un día',
            dd: '%d días',
            M: 'un mes',
            MM: '%d meses',
            y: 'un ano',
            yy: '%d anos'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return gl;
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Konkani Latin script [gom-latn]
//! author : The Discoverer : https://github.com/WikiDiscoverer

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['thodde secondanim', 'thodde second'],
            'm': ['eka mintan', 'ek minute'],
            'mm': [number + ' mintanim', number + ' mintam'],
            'h': ['eka horan', 'ek hor'],
            'hh': [number + ' horanim', number + ' hor'],
            'd': ['eka disan', 'ek dis'],
            'dd': [number + ' disanim', number + ' dis'],
            'M': ['eka mhoinean', 'ek mhoino'],
            'MM': [number + ' mhoineanim', number + ' mhoine'],
            'y': ['eka vorsan', 'ek voros'],
            'yy': [number + ' vorsanim', number + ' vorsam']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var gomLatn = moment.defineLocale('gom-latn', {
        months: 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split('_'),
        monthsShort: 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son\'var'.split('_'),
        weekdaysShort: 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
        weekdaysMin: 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'A h:mm [vazta]',
            LTS: 'A h:mm:ss [vazta]',
            L: 'DD-MM-YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY A h:mm [vazta]',
            LLLL: 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
            llll: 'ddd, D MMM YYYY, A h:mm [vazta]'
        },
        calendar: {
            sameDay: '[Aiz] LT',
            nextDay: '[Faleam] LT',
            nextWeek: '[Ieta to] dddd[,] LT',
            lastDay: '[Kal] LT',
            lastWeek: '[Fatlo] dddd[,] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s',
            past: '%s adim',
            s: processRelativeTime,
            m: processRelativeTime,
            mm: processRelativeTime,
            h: processRelativeTime,
            hh: processRelativeTime,
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er)/,
        ordinal: function (number, period) {
            switch (period) {
                // the ordinal 'er' only applies to day of the month
                case 'D':
                    return number + 'er';
                default:
                case 'M':
                case 'Q':
                case 'DDD':
                case 'd':
                case 'w':
                case 'W':
                    return number;
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        },
        meridiemParse: /rati|sokalli|donparam|sanje/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'rati') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'sokalli') {
                return hour;
            } else if (meridiem === 'donparam') {
                return hour > 12 ? hour : hour + 12;
            } else if (meridiem === 'sanje') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'rati';
            } else if (hour < 12) {
                return 'sokalli';
            } else if (hour < 16) {
                return 'donparam';
            } else if (hour < 20) {
                return 'sanje';
            } else {
                return 'rati';
            }
        }
    });

    return gomLatn;
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Hebrew [he]
//! author : Tomer Cohen : https://github.com/tomer
//! author : Moshe Simantov : https://github.com/DevelopmentIL
//! author : Tal Ater : https://github.com/TalAter

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var he = moment.defineLocale('he', {
        months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
        monthsShort: 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
        weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
        weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
        weekdaysMin: 'א_ב_ג_ד_ה_ו_ש'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [ב]MMMM YYYY',
            LLL: 'D [ב]MMMM YYYY HH:mm',
            LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
            l: 'D/M/YYYY',
            ll: 'D MMM YYYY',
            lll: 'D MMM YYYY HH:mm',
            llll: 'ddd, D MMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[היום ב־]LT',
            nextDay: '[מחר ב־]LT',
            nextWeek: 'dddd [בשעה] LT',
            lastDay: '[אתמול ב־]LT',
            lastWeek: '[ביום] dddd [האחרון בשעה] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'בעוד %s',
            past: 'לפני %s',
            s: 'מספר שניות',
            m: 'דקה',
            mm: '%d דקות',
            h: 'שעה',
            hh: function (number) {
                if (number === 2) {
                    return 'שעתיים';
                }
                return number + ' שעות';
            },
            d: 'יום',
            dd: function (number) {
                if (number === 2) {
                    return 'יומיים';
                }
                return number + ' ימים';
            },
            M: 'חודש',
            MM: function (number) {
                if (number === 2) {
                    return 'חודשיים';
                }
                return number + ' חודשים';
            },
            y: 'שנה',
            yy: function (number) {
                if (number === 2) {
                    return 'שנתיים';
                } else if (number % 10 === 0 && number !== 10) {
                    return number + ' שנה';
                }
                return number + ' שנים';
            }
        },
        meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
        isPM: function (input) {
            return (/^(אחה"צ|אחרי הצהריים|בערב)$/.test(input)
            );
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 5) {
                return 'לפנות בוקר';
            } else if (hour < 10) {
                return 'בבוקר';
            } else if (hour < 12) {
                return isLower ? 'לפנה"צ' : 'לפני הצהריים';
            } else if (hour < 18) {
                return isLower ? 'אחה"צ' : 'אחרי הצהריים';
            } else {
                return 'בערב';
            }
        }
    });

    return he;
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Hindi [hi]
//! author : Mayank Singhal : https://github.com/mayanksinghal

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    };
    var numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    var hi = moment.defineLocale('hi', {
        months: 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
        monthsShort: 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
        monthsParseExact: true,
        weekdays: 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
        weekdaysShort: 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
        weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
        longDateFormat: {
            LT: 'A h:mm बजे',
            LTS: 'A h:mm:ss बजे',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm बजे',
            LLLL: 'dddd, D MMMM YYYY, A h:mm बजे'
        },
        calendar: {
            sameDay: '[आज] LT',
            nextDay: '[कल] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[कल] LT',
            lastWeek: '[पिछले] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s में',
            past: '%s पहले',
            s: 'कुछ ही क्षण',
            m: 'एक मिनट',
            mm: '%d मिनट',
            h: 'एक घंटा',
            hh: '%d घंटे',
            d: 'एक दिन',
            dd: '%d दिन',
            M: 'एक महीने',
            MM: '%d महीने',
            y: 'एक वर्ष',
            yy: '%d वर्ष'
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
        meridiemParse: /रात|सुबह|दोपहर|शाम/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'रात') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'सुबह') {
                return hour;
            } else if (meridiem === 'दोपहर') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'शाम') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'रात';
            } else if (hour < 10) {
                return 'सुबह';
            } else if (hour < 17) {
                return 'दोपहर';
            } else if (hour < 20) {
                return 'शाम';
            } else {
                return 'रात';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return hi;
});

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Croatian [hr]
//! author : Bojan Marković : https://github.com/bmarkovic

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'm':
                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
            case 'mm':
                if (number === 1) {
                    result += 'minuta';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'minute';
                } else {
                    result += 'minuta';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'jedan sat' : 'jednog sata';
            case 'hh':
                if (number === 1) {
                    result += 'sat';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sata';
                } else {
                    result += 'sati';
                }
                return result;
            case 'dd':
                if (number === 1) {
                    result += 'dan';
                } else {
                    result += 'dana';
                }
                return result;
            case 'MM':
                if (number === 1) {
                    result += 'mjesec';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'mjeseca';
                } else {
                    result += 'mjeseci';
                }
                return result;
            case 'yy':
                if (number === 1) {
                    result += 'godina';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'godine';
                } else {
                    result += 'godina';
                }
                return result;
        }
    }

    var hr = moment.defineLocale('hr', {
        months: {
            format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
            standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
        },
        monthsShort: 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sutra u] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay: '[jučer u] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return '[prošlu] dddd [u] LT';
                    case 6:
                        return '[prošle] [subote] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prošli] dddd [u] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'prije %s',
            s: 'par sekundi',
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: 'dan',
            dd: translate,
            M: 'mjesec',
            MM: translate,
            y: 'godinu',
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return hr;
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Hungarian [hu]
//! author : Adam Brunner : https://github.com/adambrunner

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
    function translate(number, withoutSuffix, key, isFuture) {
        var num = number,
            suffix;
        switch (key) {
            case 's':
                return isFuture || withoutSuffix ? 'néhány másodperc' : 'néhány másodperce';
            case 'm':
                return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
            case 'mm':
                return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
            case 'h':
                return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
            case 'hh':
                return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
            case 'd':
                return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
            case 'dd':
                return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
            case 'M':
                return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
            case 'MM':
                return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
            case 'y':
                return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
            case 'yy':
                return num + (isFuture || withoutSuffix ? ' év' : ' éve');
        }
        return '';
    }
    function week(isFuture) {
        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
    }

    var hu = moment.defineLocale('hu', {
        months: 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
        monthsShort: 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
        weekdays: 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
        weekdaysShort: 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
        weekdaysMin: 'v_h_k_sze_cs_p_szo'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'YYYY.MM.DD.',
            LL: 'YYYY. MMMM D.',
            LLL: 'YYYY. MMMM D. H:mm',
            LLLL: 'YYYY. MMMM D., dddd H:mm'
        },
        meridiemParse: /de|du/i,
        isPM: function (input) {
            return input.charAt(1).toLowerCase() === 'u';
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower === true ? 'de' : 'DE';
            } else {
                return isLower === true ? 'du' : 'DU';
            }
        },
        calendar: {
            sameDay: '[ma] LT[-kor]',
            nextDay: '[holnap] LT[-kor]',
            nextWeek: function () {
                return week.call(this, true);
            },
            lastDay: '[tegnap] LT[-kor]',
            lastWeek: function () {
                return week.call(this, false);
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s múlva',
            past: '%s',
            s: translate,
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: translate,
            dd: translate,
            M: translate,
            MM: translate,
            y: translate,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return hu;
});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Armenian [hy-am]
//! author : Armendarabyan : https://github.com/armendarabyan

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var hyAm = moment.defineLocale('hy-am', {
        months: {
            format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
            standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
        },
        monthsShort: 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
        weekdays: 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
        weekdaysShort: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
        weekdaysMin: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY թ.',
            LLL: 'D MMMM YYYY թ., HH:mm',
            LLLL: 'dddd, D MMMM YYYY թ., HH:mm'
        },
        calendar: {
            sameDay: '[այսօր] LT',
            nextDay: '[վաղը] LT',
            lastDay: '[երեկ] LT',
            nextWeek: function () {
                return 'dddd [օրը ժամը] LT';
            },
            lastWeek: function () {
                return '[անցած] dddd [օրը ժամը] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s հետո',
            past: '%s առաջ',
            s: 'մի քանի վայրկյան',
            m: 'րոպե',
            mm: '%d րոպե',
            h: 'ժամ',
            hh: '%d ժամ',
            d: 'օր',
            dd: '%d օր',
            M: 'ամիս',
            MM: '%d ամիս',
            y: 'տարի',
            yy: '%d տարի'
        },
        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
        isPM: function (input) {
            return (/^(ցերեկվա|երեկոյան)$/.test(input)
            );
        },
        meridiem: function (hour) {
            if (hour < 4) {
                return 'գիշերվա';
            } else if (hour < 12) {
                return 'առավոտվա';
            } else if (hour < 17) {
                return 'ցերեկվա';
            } else {
                return 'երեկոյան';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'DDD':
                case 'w':
                case 'W':
                case 'DDDo':
                    if (number === 1) {
                        return number + '-ին';
                    }
                    return number + '-րդ';
                default:
                    return number;
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return hyAm;
});

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Indonesian [id]
//! author : Mohammad Satrio Utomo : https://github.com/tyok
//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var id = moment.defineLocale('id', {
        months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
        weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
        weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
        weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [pukul] HH.mm',
            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|siang|sore|malam/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'siang') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'sore' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'siang';
            } else if (hours < 19) {
                return 'sore';
            } else {
                return 'malam';
            }
        },
        calendar: {
            sameDay: '[Hari ini pukul] LT',
            nextDay: '[Besok pukul] LT',
            nextWeek: 'dddd [pukul] LT',
            lastDay: '[Kemarin pukul] LT',
            lastWeek: 'dddd [lalu pukul] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dalam %s',
            past: '%s yang lalu',
            s: 'beberapa detik',
            m: 'semenit',
            mm: '%d menit',
            h: 'sejam',
            hh: '%d jam',
            d: 'sehari',
            dd: '%d hari',
            M: 'sebulan',
            MM: '%d bulan',
            y: 'setahun',
            yy: '%d tahun'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return id;
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Icelandic [is]
//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function plural(n) {
        if (n % 100 === 11) {
            return true;
        } else if (n % 10 === 1) {
            return false;
        }
        return true;
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
            case 'm':
                return withoutSuffix ? 'mínúta' : 'mínútu';
            case 'mm':
                if (plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
                } else if (withoutSuffix) {
                    return result + 'mínúta';
                }
                return result + 'mínútu';
            case 'hh':
                if (plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
                }
                return result + 'klukkustund';
            case 'd':
                if (withoutSuffix) {
                    return 'dagur';
                }
                return isFuture ? 'dag' : 'degi';
            case 'dd':
                if (plural(number)) {
                    if (withoutSuffix) {
                        return result + 'dagar';
                    }
                    return result + (isFuture ? 'daga' : 'dögum');
                } else if (withoutSuffix) {
                    return result + 'dagur';
                }
                return result + (isFuture ? 'dag' : 'degi');
            case 'M':
                if (withoutSuffix) {
                    return 'mánuður';
                }
                return isFuture ? 'mánuð' : 'mánuði';
            case 'MM':
                if (plural(number)) {
                    if (withoutSuffix) {
                        return result + 'mánuðir';
                    }
                    return result + (isFuture ? 'mánuði' : 'mánuðum');
                } else if (withoutSuffix) {
                    return result + 'mánuður';
                }
                return result + (isFuture ? 'mánuð' : 'mánuði');
            case 'y':
                return withoutSuffix || isFuture ? 'ár' : 'ári';
            case 'yy':
                if (plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
                }
                return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
        }
    }

    var is = moment.defineLocale('is', {
        months: 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
        monthsShort: 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
        weekdays: 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
        weekdaysShort: 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
        weekdaysMin: 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY [kl.] H:mm',
            LLLL: 'dddd, D. MMMM YYYY [kl.] H:mm'
        },
        calendar: {
            sameDay: '[í dag kl.] LT',
            nextDay: '[á morgun kl.] LT',
            nextWeek: 'dddd [kl.] LT',
            lastDay: '[í gær kl.] LT',
            lastWeek: '[síðasta] dddd [kl.] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'eftir %s',
            past: 'fyrir %s síðan',
            s: translate,
            m: translate,
            mm: translate,
            h: 'klukkustund',
            hh: translate,
            d: translate,
            dd: translate,
            M: translate,
            MM: translate,
            y: translate,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return is;
});

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Italian [it]
//! author : Lorenzo : https://github.com/aliem
//! author: Mattia Larentis: https://github.com/nostalgiaz

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var it = moment.defineLocale('it', {
        months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
        monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
        weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
        weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
        weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Oggi alle] LT',
            nextDay: '[Domani alle] LT',
            nextWeek: 'dddd [alle] LT',
            lastDay: '[Ieri alle] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[la scorsa] dddd [alle] LT';
                    default:
                        return '[lo scorso] dddd [alle] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: function (s) {
                return (/^[0-9].+$/.test(s) ? 'tra' : 'in') + ' ' + s;
            },
            past: '%s fa',
            s: 'alcuni secondi',
            m: 'un minuto',
            mm: '%d minuti',
            h: 'un\'ora',
            hh: '%d ore',
            d: 'un giorno',
            dd: '%d giorni',
            M: 'un mese',
            MM: '%d mesi',
            y: 'un anno',
            yy: '%d anni'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return it;
});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Japanese [ja]
//! author : LI Long : https://github.com/baryon

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var ja = moment.defineLocale('ja', {
        months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
        weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
        weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY/MM/DD',
            LL: 'YYYY年M月D日',
            LLL: 'YYYY年M月D日 HH:mm',
            LLLL: 'YYYY年M月D日 HH:mm dddd',
            l: 'YYYY/MM/DD',
            ll: 'YYYY年M月D日',
            lll: 'YYYY年M月D日 HH:mm',
            llll: 'YYYY年M月D日 HH:mm dddd'
        },
        meridiemParse: /午前|午後/i,
        isPM: function (input) {
            return input === '午後';
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return '午前';
            } else {
                return '午後';
            }
        },
        calendar: {
            sameDay: '[今日] LT',
            nextDay: '[明日] LT',
            nextWeek: '[来週]dddd LT',
            lastDay: '[昨日] LT',
            lastWeek: '[前週]dddd LT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}日/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s後',
            past: '%s前',
            s: '数秒',
            m: '1分',
            mm: '%d分',
            h: '1時間',
            hh: '%d時間',
            d: '1日',
            dd: '%d日',
            M: '1ヶ月',
            MM: '%dヶ月',
            y: '1年',
            yy: '%d年'
        }
    });

    return ja;
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Javanese [jv]
//! author : Rony Lantip : https://github.com/lantip
//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var jv = moment.defineLocale('jv', {
        months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
        weekdays: 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
        weekdaysShort: 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
        weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [pukul] HH.mm',
            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /enjing|siyang|sonten|ndalu/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'enjing') {
                return hour;
            } else if (meridiem === 'siyang') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
                return hour + 12;
            }
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'enjing';
            } else if (hours < 15) {
                return 'siyang';
            } else if (hours < 19) {
                return 'sonten';
            } else {
                return 'ndalu';
            }
        },
        calendar: {
            sameDay: '[Dinten puniko pukul] LT',
            nextDay: '[Mbenjang pukul] LT',
            nextWeek: 'dddd [pukul] LT',
            lastDay: '[Kala wingi pukul] LT',
            lastWeek: 'dddd [kepengker pukul] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'wonten ing %s',
            past: '%s ingkang kepengker',
            s: 'sawetawis detik',
            m: 'setunggal menit',
            mm: '%d menit',
            h: 'setunggal jam',
            hh: '%d jam',
            d: 'sedinten',
            dd: '%d dinten',
            M: 'sewulan',
            MM: '%d wulan',
            y: 'setaun',
            yy: '%d taun'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return jv;
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Georgian [ka]
//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var ka = moment.defineLocale('ka', {
        months: {
            standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
            format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
        },
        monthsShort: 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
        weekdays: {
            standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
            format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
            isFormat: /(წინა|შემდეგ)/
        },
        weekdaysShort: 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
        weekdaysMin: 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendar: {
            sameDay: '[დღეს] LT[-ზე]',
            nextDay: '[ხვალ] LT[-ზე]',
            lastDay: '[გუშინ] LT[-ზე]',
            nextWeek: '[შემდეგ] dddd LT[-ზე]',
            lastWeek: '[წინა] dddd LT-ზე',
            sameElse: 'L'
        },
        relativeTime: {
            future: function (s) {
                return (/(წამი|წუთი|საათი|წელი)/.test(s) ? s.replace(/ი$/, 'ში') : s + 'ში'
                );
            },
            past: function (s) {
                if (/(წამი|წუთი|საათი|დღე|თვე)/.test(s)) {
                    return s.replace(/(ი|ე)$/, 'ის უკან');
                }
                if (/წელი/.test(s)) {
                    return s.replace(/წელი$/, 'წლის უკან');
                }
            },
            s: 'რამდენიმე წამი',
            m: 'წუთი',
            mm: '%d წუთი',
            h: 'საათი',
            hh: '%d საათი',
            d: 'დღე',
            dd: '%d დღე',
            M: 'თვე',
            MM: '%d თვე',
            y: 'წელი',
            yy: '%d წელი'
        },
        dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
        ordinal: function (number) {
            if (number === 0) {
                return number;
            }
            if (number === 1) {
                return number + '-ლი';
            }
            if (number < 20 || number <= 100 && number % 20 === 0 || number % 100 === 0) {
                return 'მე-' + number;
            }
            return number + '-ე';
        },
        week: {
            dow: 1,
            doy: 7
        }
    });

    return ka;
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Kazakh [kk]
//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var suffixes = {
        0: '-ші',
        1: '-ші',
        2: '-ші',
        3: '-ші',
        4: '-ші',
        5: '-ші',
        6: '-шы',
        7: '-ші',
        8: '-ші',
        9: '-шы',
        10: '-шы',
        20: '-шы',
        30: '-шы',
        40: '-шы',
        50: '-ші',
        60: '-шы',
        70: '-ші',
        80: '-ші',
        90: '-шы',
        100: '-ші'
    };

    var kk = moment.defineLocale('kk', {
        months: 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
        monthsShort: 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
        weekdays: 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
        weekdaysShort: 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
        weekdaysMin: 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Бүгін сағат] LT',
            nextDay: '[Ертең сағат] LT',
            nextWeek: 'dddd [сағат] LT',
            lastDay: '[Кеше сағат] LT',
            lastWeek: '[Өткен аптаның] dddd [сағат] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s ішінде',
            past: '%s бұрын',
            s: 'бірнеше секунд',
            m: 'бір минут',
            mm: '%d минут',
            h: 'бір сағат',
            hh: '%d сағат',
            d: 'бір күн',
            dd: '%d күн',
            M: 'бір ай',
            MM: '%d ай',
            y: 'бір жыл',
            yy: '%d жыл'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
        ordinal: function (number) {
            var a = number % 10,
                b = number >= 100 ? 100 : null;
            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return kk;
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Cambodian [km]
//! author : Kruy Vanna : https://github.com/kruyvanna

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var km = moment.defineLocale('km', {
        months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
        monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
        weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
        weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
        weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
            nextDay: '[ស្អែក ម៉ោង] LT',
            nextWeek: 'dddd [ម៉ោង] LT',
            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%sទៀត',
            past: '%sមុន',
            s: 'ប៉ុន្មានវិនាទី',
            m: 'មួយនាទី',
            mm: '%d នាទី',
            h: 'មួយម៉ោង',
            hh: '%d ម៉ោង',
            d: 'មួយថ្ងៃ',
            dd: '%d ថ្ងៃ',
            M: 'មួយខែ',
            MM: '%d ខែ',
            y: 'មួយឆ្នាំ',
            yy: '%d ឆ្នាំ'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return km;
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Kannada [kn]
//! author : Rajeev Naik : https://github.com/rajeevnaikte

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '೧',
        '2': '೨',
        '3': '೩',
        '4': '೪',
        '5': '೫',
        '6': '೬',
        '7': '೭',
        '8': '೮',
        '9': '೯',
        '0': '೦'
    };
    var numberMap = {
        '೧': '1',
        '೨': '2',
        '೩': '3',
        '೪': '4',
        '೫': '5',
        '೬': '6',
        '೭': '7',
        '೮': '8',
        '೯': '9',
        '೦': '0'
    };

    var kn = moment.defineLocale('kn', {
        months: 'ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್'.split('_'),
        monthsShort: 'ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬ_ಅಕ್ಟೋಬ_ನವೆಂಬ_ಡಿಸೆಂಬ'.split('_'),
        monthsParseExact: true,
        weekdays: 'ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ'.split('_'),
        weekdaysShort: 'ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ'.split('_'),
        weekdaysMin: 'ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ'.split('_'),
        longDateFormat: {
            LT: 'A h:mm',
            LTS: 'A h:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm',
            LLLL: 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar: {
            sameDay: '[ಇಂದು] LT',
            nextDay: '[ನಾಳೆ] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[ನಿನ್ನೆ] LT',
            lastWeek: '[ಕೊನೆಯ] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s ನಂತರ',
            past: '%s ಹಿಂದೆ',
            s: 'ಕೆಲವು ಕ್ಷಣಗಳು',
            m: 'ಒಂದು ನಿಮಿಷ',
            mm: '%d ನಿಮಿಷ',
            h: 'ಒಂದು ಗಂಟೆ',
            hh: '%d ಗಂಟೆ',
            d: 'ಒಂದು ದಿನ',
            dd: '%d ದಿನ',
            M: 'ಒಂದು ತಿಂಗಳು',
            MM: '%d ತಿಂಗಳು',
            y: 'ಒಂದು ವರ್ಷ',
            yy: '%d ವರ್ಷ'
        },
        preparse: function (string) {
            return string.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ರಾತ್ರಿ') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ಬೆಳಿಗ್ಗೆ') {
                return hour;
            } else if (meridiem === 'ಮಧ್ಯಾಹ್ನ') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'ಸಂಜೆ') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ರಾತ್ರಿ';
            } else if (hour < 10) {
                return 'ಬೆಳಿಗ್ಗೆ';
            } else if (hour < 17) {
                return 'ಮಧ್ಯಾಹ್ನ';
            } else if (hour < 20) {
                return 'ಸಂಜೆ';
            } else {
                return 'ರಾತ್ರಿ';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
        ordinal: function (number) {
            return number + 'ನೇ';
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return kn;
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Korean [ko]
//! author : Kyungwook, Park : https://github.com/kyungw00k
//! author : Jeeeyul Lee <jeeeyul@gmail.com>

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var ko = moment.defineLocale('ko', {
        months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
        weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
        weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
        longDateFormat: {
            LT: 'A h:mm',
            LTS: 'A h:mm:ss',
            L: 'YYYY.MM.DD',
            LL: 'YYYY년 MMMM D일',
            LLL: 'YYYY년 MMMM D일 A h:mm',
            LLLL: 'YYYY년 MMMM D일 dddd A h:mm',
            l: 'YYYY.MM.DD',
            ll: 'YYYY년 MMMM D일',
            lll: 'YYYY년 MMMM D일 A h:mm',
            llll: 'YYYY년 MMMM D일 dddd A h:mm'
        },
        calendar: {
            sameDay: '오늘 LT',
            nextDay: '내일 LT',
            nextWeek: 'dddd LT',
            lastDay: '어제 LT',
            lastWeek: '지난주 dddd LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s 후',
            past: '%s 전',
            s: '몇 초',
            ss: '%d초',
            m: '1분',
            mm: '%d분',
            h: '한 시간',
            hh: '%d시간',
            d: '하루',
            dd: '%d일',
            M: '한 달',
            MM: '%d달',
            y: '일 년',
            yy: '%d년'
        },
        dayOfMonthOrdinalParse: /\d{1,2}일/,
        ordinal: '%d일',
        meridiemParse: /오전|오후/,
        isPM: function (token) {
            return token === '오후';
        },
        meridiem: function (hour, minute, isUpper) {
            return hour < 12 ? '오전' : '오후';
        }
    });

    return ko;
});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Kyrgyz [ky]
//! author : Chyngyz Arystan uulu : https://github.com/chyngyz

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var suffixes = {
        0: '-чү',
        1: '-чи',
        2: '-чи',
        3: '-чү',
        4: '-чү',
        5: '-чи',
        6: '-чы',
        7: '-чи',
        8: '-чи',
        9: '-чу',
        10: '-чу',
        20: '-чы',
        30: '-чу',
        40: '-чы',
        50: '-чү',
        60: '-чы',
        70: '-чи',
        80: '-чи',
        90: '-чу',
        100: '-чү'
    };

    var ky = moment.defineLocale('ky', {
        months: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
        monthsShort: 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
        weekdays: 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
        weekdaysShort: 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
        weekdaysMin: 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Бүгүн саат] LT',
            nextDay: '[Эртең саат] LT',
            nextWeek: 'dddd [саат] LT',
            lastDay: '[Кече саат] LT',
            lastWeek: '[Өткен аптанын] dddd [күнү] [саат] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s ичинде',
            past: '%s мурун',
            s: 'бирнече секунд',
            m: 'бир мүнөт',
            mm: '%d мүнөт',
            h: 'бир саат',
            hh: '%d саат',
            d: 'бир күн',
            dd: '%d күн',
            M: 'бир ай',
            MM: '%d ай',
            y: 'бир жыл',
            yy: '%d жыл'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
        ordinal: function (number) {
            var a = number % 10,
                b = number >= 100 ? 100 : null;
            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ky;
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Luxembourgish [lb]
//! author : mweimerskirch : https://github.com/mweimerskirch
//! author : David Raison : https://github.com/kwisatz

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eng Minutt', 'enger Minutt'],
            'h': ['eng Stonn', 'enger Stonn'],
            'd': ['een Dag', 'engem Dag'],
            'M': ['ee Mount', 'engem Mount'],
            'y': ['ee Joer', 'engem Joer']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }
    function processFutureTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return 'a ' + string;
        }
        return 'an ' + string;
    }
    function processPastTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return 'viru ' + string;
        }
        return 'virun ' + string;
    }
    /**
     * Returns true if the word before the given number loses the '-n' ending.
     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
     *
     * @param number {integer}
     * @returns {boolean}
     */
    function eifelerRegelAppliesToNumber(number) {
        number = parseInt(number, 10);
        if (isNaN(number)) {
            return false;
        }
        if (number < 0) {
            // Negative Number --> always true
            return true;
        } else if (number < 10) {
            // Only 1 digit
            if (4 <= number && number <= 7) {
                return true;
            }
            return false;
        } else if (number < 100) {
            // 2 digits
            var lastDigit = number % 10,
                firstDigit = number / 10;
            if (lastDigit === 0) {
                return eifelerRegelAppliesToNumber(firstDigit);
            }
            return eifelerRegelAppliesToNumber(lastDigit);
        } else if (number < 10000) {
            // 3 or 4 digits --> recursively check first digit
            while (number >= 10) {
                number = number / 10;
            }
            return eifelerRegelAppliesToNumber(number);
        } else {
            // Anything larger than 4 digits: recursively check first n-3 digits
            number = number / 1000;
            return eifelerRegelAppliesToNumber(number);
        }
    }

    var lb = moment.defineLocale('lb', {
        months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact: true,
        weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
        weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
        weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm [Auer]',
            LTS: 'H:mm:ss [Auer]',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm [Auer]',
            LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
        },
        calendar: {
            sameDay: '[Haut um] LT',
            sameElse: 'L',
            nextDay: '[Muer um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[Gëschter um] LT',
            lastWeek: function () {
                // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
                switch (this.day()) {
                    case 2:
                    case 4:
                        return '[Leschten] dddd [um] LT';
                    default:
                        return '[Leschte] dddd [um] LT';
                }
            }
        },
        relativeTime: {
            future: processFutureTime,
            past: processPastTime,
            s: 'e puer Sekonnen',
            m: processRelativeTime,
            mm: '%d Minutten',
            h: processRelativeTime,
            hh: '%d Stonnen',
            d: processRelativeTime,
            dd: '%d Deeg',
            M: processRelativeTime,
            MM: '%d Méint',
            y: processRelativeTime,
            yy: '%d Joer'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return lb;
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Lao [lo]
//! author : Ryan Hart : https://github.com/ryanhart2

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var lo = moment.defineLocale('lo', {
        months: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
        monthsShort: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
        weekdays: 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
        weekdaysShort: 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
        weekdaysMin: 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'ວັນdddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
        isPM: function (input) {
            return input === 'ຕອນແລງ';
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ຕອນເຊົ້າ';
            } else {
                return 'ຕອນແລງ';
            }
        },
        calendar: {
            sameDay: '[ມື້ນີ້ເວລາ] LT',
            nextDay: '[ມື້ອື່ນເວລາ] LT',
            nextWeek: '[ວັນ]dddd[ໜ້າເວລາ] LT',
            lastDay: '[ມື້ວານນີ້ເວລາ] LT',
            lastWeek: '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'ອີກ %s',
            past: '%sຜ່ານມາ',
            s: 'ບໍ່ເທົ່າໃດວິນາທີ',
            m: '1 ນາທີ',
            mm: '%d ນາທີ',
            h: '1 ຊົ່ວໂມງ',
            hh: '%d ຊົ່ວໂມງ',
            d: '1 ມື້',
            dd: '%d ມື້',
            M: '1 ເດືອນ',
            MM: '%d ເດືອນ',
            y: '1 ປີ',
            yy: '%d ປີ'
        },
        dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
        ordinal: function (number) {
            return 'ທີ່' + number;
        }
    });

    return lo;
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Lithuanian [lt]
//! author : Mindaugas Mozūras : https://github.com/mmozuras

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var units = {
        'm': 'minutė_minutės_minutę',
        'mm': 'minutės_minučių_minutes',
        'h': 'valanda_valandos_valandą',
        'hh': 'valandos_valandų_valandas',
        'd': 'diena_dienos_dieną',
        'dd': 'dienos_dienų_dienas',
        'M': 'mėnuo_mėnesio_mėnesį',
        'MM': 'mėnesiai_mėnesių_mėnesius',
        'y': 'metai_metų_metus',
        'yy': 'metai_metų_metus'
    };
    function translateSeconds(number, withoutSuffix, key, isFuture) {
        if (withoutSuffix) {
            return 'kelios sekundės';
        } else {
            return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
        }
    }
    function translateSingular(number, withoutSuffix, key, isFuture) {
        return withoutSuffix ? forms(key)[0] : isFuture ? forms(key)[1] : forms(key)[2];
    }
    function special(number) {
        return number % 10 === 0 || number > 10 && number < 20;
    }
    function forms(key) {
        return units[key].split('_');
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        if (number === 1) {
            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
        } else if (withoutSuffix) {
            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
        } else {
            if (isFuture) {
                return result + forms(key)[1];
            } else {
                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
            }
        }
    }
    var lt = moment.defineLocale('lt', {
        months: {
            format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
            standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
            isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
        },
        monthsShort: 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
        weekdays: {
            format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
            standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
            isFormat: /dddd HH:mm/
        },
        weekdaysShort: 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
        weekdaysMin: 'S_P_A_T_K_Pn_Š'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'YYYY [m.] MMMM D [d.]',
            LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
            LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
            l: 'YYYY-MM-DD',
            ll: 'YYYY [m.] MMMM D [d.]',
            lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
            llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
        },
        calendar: {
            sameDay: '[Šiandien] LT',
            nextDay: '[Rytoj] LT',
            nextWeek: 'dddd LT',
            lastDay: '[Vakar] LT',
            lastWeek: '[Praėjusį] dddd LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'po %s',
            past: 'prieš %s',
            s: translateSeconds,
            m: translateSingular,
            mm: translate,
            h: translateSingular,
            hh: translate,
            d: translateSingular,
            dd: translate,
            M: translateSingular,
            MM: translate,
            y: translateSingular,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}-oji/,
        ordinal: function (number) {
            return number + '-oji';
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return lt;
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Latvian [lv]
//! author : Kristaps Karlsons : https://github.com/skakri
//! author : Jānis Elmeris : https://github.com/JanisE

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var units = {
        'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
        'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
        'h': 'stundas_stundām_stunda_stundas'.split('_'),
        'hh': 'stundas_stundām_stunda_stundas'.split('_'),
        'd': 'dienas_dienām_diena_dienas'.split('_'),
        'dd': 'dienas_dienām_diena_dienas'.split('_'),
        'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
        'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
        'y': 'gada_gadiem_gads_gadi'.split('_'),
        'yy': 'gada_gadiem_gads_gadi'.split('_')
    };
    /**
     * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
     */
    function format(forms, number, withoutSuffix) {
        if (withoutSuffix) {
            // E.g. "21 minūte", "3 minūtes".
            return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
        } else {
            // E.g. "21 minūtes" as in "pēc 21 minūtes".
            // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
            return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
        }
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        return number + ' ' + format(units[key], number, withoutSuffix);
    }
    function relativeTimeWithSingular(number, withoutSuffix, key) {
        return format(units[key], number, withoutSuffix);
    }
    function relativeSeconds(number, withoutSuffix) {
        return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
    }

    var lv = moment.defineLocale('lv', {
        months: 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
        monthsShort: 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
        weekdays: 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
        weekdaysShort: 'Sv_P_O_T_C_Pk_S'.split('_'),
        weekdaysMin: 'Sv_P_O_T_C_Pk_S'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY.',
            LL: 'YYYY. [gada] D. MMMM',
            LLL: 'YYYY. [gada] D. MMMM, HH:mm',
            LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm'
        },
        calendar: {
            sameDay: '[Šodien pulksten] LT',
            nextDay: '[Rīt pulksten] LT',
            nextWeek: 'dddd [pulksten] LT',
            lastDay: '[Vakar pulksten] LT',
            lastWeek: '[Pagājušā] dddd [pulksten] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'pēc %s',
            past: 'pirms %s',
            s: relativeSeconds,
            m: relativeTimeWithSingular,
            mm: relativeTimeWithPlural,
            h: relativeTimeWithSingular,
            hh: relativeTimeWithPlural,
            d: relativeTimeWithSingular,
            dd: relativeTimeWithPlural,
            M: relativeTimeWithSingular,
            MM: relativeTimeWithPlural,
            y: relativeTimeWithSingular,
            yy: relativeTimeWithPlural
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return lv;
});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Montenegrin [me]
//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var translator = {
        words: { //Different grammatical cases
            m: ['jedan minut', 'jednog minuta'],
            mm: ['minut', 'minuta', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mjesec', 'mjeseca', 'mjeseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var me = moment.defineLocale('me', {
        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sjutra u] LT',

            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay: '[juče u] LT',
            lastWeek: function () {
                var lastWeekDays = ['[prošle] [nedjelje] [u] LT', '[prošlog] [ponedjeljka] [u] LT', '[prošlog] [utorka] [u] LT', '[prošle] [srijede] [u] LT', '[prošlog] [četvrtka] [u] LT', '[prošlog] [petka] [u] LT', '[prošle] [subote] [u] LT'];
                return lastWeekDays[this.day()];
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'prije %s',
            s: 'nekoliko sekundi',
            m: translator.translate,
            mm: translator.translate,
            h: translator.translate,
            hh: translator.translate,
            d: 'dan',
            dd: translator.translate,
            M: 'mjesec',
            MM: translator.translate,
            y: 'godinu',
            yy: translator.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return me;
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Maori [mi]
//! author : John Corrigan <robbiecloset@gmail.com> : https://github.com/johnideal

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var mi = moment.defineLocale('mi', {
        months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
        monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
        monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
        weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
        weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
        weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [i] HH:mm',
            LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
        },
        calendar: {
            sameDay: '[i teie mahana, i] LT',
            nextDay: '[apopo i] LT',
            nextWeek: 'dddd [i] LT',
            lastDay: '[inanahi i] LT',
            lastWeek: 'dddd [whakamutunga i] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'i roto i %s',
            past: '%s i mua',
            s: 'te hēkona ruarua',
            m: 'he meneti',
            mm: '%d meneti',
            h: 'te haora',
            hh: '%d haora',
            d: 'he ra',
            dd: '%d ra',
            M: 'he marama',
            MM: '%d marama',
            y: 'he tau',
            yy: '%d tau'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return mi;
});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Macedonian [mk]
//! author : Borislav Mickov : https://github.com/B0k0

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var mk = moment.defineLocale('mk', {
        months: 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
        monthsShort: 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
        weekdays: 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
        weekdaysShort: 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
        weekdaysMin: 'нe_пo_вт_ср_че_пе_сa'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'D.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY H:mm',
            LLLL: 'dddd, D MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[Денес во] LT',
            nextDay: '[Утре во] LT',
            nextWeek: '[Во] dddd [во] LT',
            lastDay: '[Вчера во] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return '[Изминатата] dddd [во] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[Изминатиот] dddd [во] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'после %s',
            past: 'пред %s',
            s: 'неколку секунди',
            m: 'минута',
            mm: '%d минути',
            h: 'час',
            hh: '%d часа',
            d: 'ден',
            dd: '%d дена',
            M: 'месец',
            MM: '%d месеци',
            y: 'година',
            yy: '%d години'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal: function (number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-ев';
            } else if (last2Digits === 0) {
                return number + '-ен';
            } else if (last2Digits > 10 && last2Digits < 20) {
                return number + '-ти';
            } else if (lastDigit === 1) {
                return number + '-ви';
            } else if (lastDigit === 2) {
                return number + '-ри';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-ми';
            } else {
                return number + '-ти';
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return mk;
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Malayalam [ml]
//! author : Floyd Pink : https://github.com/floydpink

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var ml = moment.defineLocale('ml', {
        months: 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
        monthsShort: 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
        monthsParseExact: true,
        weekdays: 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
        weekdaysShort: 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
        weekdaysMin: 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
        longDateFormat: {
            LT: 'A h:mm -നു',
            LTS: 'A h:mm:ss -നു',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm -നു',
            LLLL: 'dddd, D MMMM YYYY, A h:mm -നു'
        },
        calendar: {
            sameDay: '[ഇന്ന്] LT',
            nextDay: '[നാളെ] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[ഇന്നലെ] LT',
            lastWeek: '[കഴിഞ്ഞ] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s കഴിഞ്ഞ്',
            past: '%s മുൻപ്',
            s: 'അൽപ നിമിഷങ്ങൾ',
            m: 'ഒരു മിനിറ്റ്',
            mm: '%d മിനിറ്റ്',
            h: 'ഒരു മണിക്കൂർ',
            hh: '%d മണിക്കൂർ',
            d: 'ഒരു ദിവസം',
            dd: '%d ദിവസം',
            M: 'ഒരു മാസം',
            MM: '%d മാസം',
            y: 'ഒരു വർഷം',
            yy: '%d വർഷം'
        },
        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'രാത്രി' && hour >= 4 || meridiem === 'ഉച്ച കഴിഞ്ഞ്' || meridiem === 'വൈകുന്നേരം') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'രാത്രി';
            } else if (hour < 12) {
                return 'രാവിലെ';
            } else if (hour < 17) {
                return 'ഉച്ച കഴിഞ്ഞ്';
            } else if (hour < 20) {
                return 'വൈകുന്നേരം';
            } else {
                return 'രാത്രി';
            }
        }
    });

    return ml;
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Marathi [mr]
//! author : Harshad Kale : https://github.com/kalehv
//! author : Vivek Athalye : https://github.com/vnathalye

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    };
    var numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    function relativeTimeMr(number, withoutSuffix, string, isFuture) {
        var output = '';
        if (withoutSuffix) {
            switch (string) {
                case 's':
                    output = 'काही सेकंद';break;
                case 'm':
                    output = 'एक मिनिट';break;
                case 'mm':
                    output = '%d मिनिटे';break;
                case 'h':
                    output = 'एक तास';break;
                case 'hh':
                    output = '%d तास';break;
                case 'd':
                    output = 'एक दिवस';break;
                case 'dd':
                    output = '%d दिवस';break;
                case 'M':
                    output = 'एक महिना';break;
                case 'MM':
                    output = '%d महिने';break;
                case 'y':
                    output = 'एक वर्ष';break;
                case 'yy':
                    output = '%d वर्षे';break;
            }
        } else {
            switch (string) {
                case 's':
                    output = 'काही सेकंदां';break;
                case 'm':
                    output = 'एका मिनिटा';break;
                case 'mm':
                    output = '%d मिनिटां';break;
                case 'h':
                    output = 'एका तासा';break;
                case 'hh':
                    output = '%d तासां';break;
                case 'd':
                    output = 'एका दिवसा';break;
                case 'dd':
                    output = '%d दिवसां';break;
                case 'M':
                    output = 'एका महिन्या';break;
                case 'MM':
                    output = '%d महिन्यां';break;
                case 'y':
                    output = 'एका वर्षा';break;
                case 'yy':
                    output = '%d वर्षां';break;
            }
        }
        return output.replace(/%d/i, number);
    }

    var mr = moment.defineLocale('mr', {
        months: 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
        monthsParseExact: true,
        weekdays: 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
        weekdaysShort: 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
        weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
        longDateFormat: {
            LT: 'A h:mm वाजता',
            LTS: 'A h:mm:ss वाजता',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm वाजता',
            LLLL: 'dddd, D MMMM YYYY, A h:mm वाजता'
        },
        calendar: {
            sameDay: '[आज] LT',
            nextDay: '[उद्या] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[काल] LT',
            lastWeek: '[मागील] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%sमध्ये',
            past: '%sपूर्वी',
            s: relativeTimeMr,
            m: relativeTimeMr,
            mm: relativeTimeMr,
            h: relativeTimeMr,
            hh: relativeTimeMr,
            d: relativeTimeMr,
            dd: relativeTimeMr,
            M: relativeTimeMr,
            MM: relativeTimeMr,
            y: relativeTimeMr,
            yy: relativeTimeMr
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'रात्री') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'सकाळी') {
                return hour;
            } else if (meridiem === 'दुपारी') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'सायंकाळी') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'रात्री';
            } else if (hour < 10) {
                return 'सकाळी';
            } else if (hour < 17) {
                return 'दुपारी';
            } else if (hour < 20) {
                return 'सायंकाळी';
            } else {
                return 'रात्री';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return mr;
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Malay [ms-my]
//! note : DEPRECATED, the correct one is [ms]
//! author : Weldan Jamili : https://github.com/weldan

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var msMy = moment.defineLocale('ms-my', {
        months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
        monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
        weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
        weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
        weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [pukul] HH.mm',
            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'tengahari') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'petang' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'tengahari';
            } else if (hours < 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar: {
            sameDay: '[Hari ini pukul] LT',
            nextDay: '[Esok pukul] LT',
            nextWeek: 'dddd [pukul] LT',
            lastDay: '[Kelmarin pukul] LT',
            lastWeek: 'dddd [lepas pukul] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dalam %s',
            past: '%s yang lepas',
            s: 'beberapa saat',
            m: 'seminit',
            mm: '%d minit',
            h: 'sejam',
            hh: '%d jam',
            d: 'sehari',
            dd: '%d hari',
            M: 'sebulan',
            MM: '%d bulan',
            y: 'setahun',
            yy: '%d tahun'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return msMy;
});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Malay [ms]
//! author : Weldan Jamili : https://github.com/weldan

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var ms = moment.defineLocale('ms', {
        months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
        monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
        weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
        weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
        weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [pukul] HH.mm',
            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'tengahari') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'petang' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'tengahari';
            } else if (hours < 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar: {
            sameDay: '[Hari ini pukul] LT',
            nextDay: '[Esok pukul] LT',
            nextWeek: 'dddd [pukul] LT',
            lastDay: '[Kelmarin pukul] LT',
            lastWeek: 'dddd [lepas pukul] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dalam %s',
            past: '%s yang lepas',
            s: 'beberapa saat',
            m: 'seminit',
            mm: '%d minit',
            h: 'sejam',
            hh: '%d jam',
            d: 'sehari',
            dd: '%d hari',
            M: 'sebulan',
            MM: '%d bulan',
            y: 'setahun',
            yy: '%d tahun'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ms;
});

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Burmese [my]
//! author : Squar team, mysquar.com
//! author : David Rossellat : https://github.com/gholadr
//! author : Tin Aung Lin : https://github.com/thanyawzinmin

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '၁',
        '2': '၂',
        '3': '၃',
        '4': '၄',
        '5': '၅',
        '6': '၆',
        '7': '၇',
        '8': '၈',
        '9': '၉',
        '0': '၀'
    };
    var numberMap = {
        '၁': '1',
        '၂': '2',
        '၃': '3',
        '၄': '4',
        '၅': '5',
        '၆': '6',
        '၇': '7',
        '၈': '8',
        '၉': '9',
        '၀': '0'
    };

    var my = moment.defineLocale('my', {
        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[ယနေ.] LT [မှာ]',
            nextDay: '[မနက်ဖြန်] LT [မှာ]',
            nextWeek: 'dddd LT [မှာ]',
            lastDay: '[မနေ.က] LT [မှာ]',
            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'လာမည့် %s မှာ',
            past: 'လွန်ခဲ့သော %s က',
            s: 'စက္ကန်.အနည်းငယ်',
            m: 'တစ်မိနစ်',
            mm: '%d မိနစ်',
            h: 'တစ်နာရီ',
            hh: '%d နာရီ',
            d: 'တစ်ရက်',
            dd: '%d ရက်',
            M: 'တစ်လ',
            MM: '%d လ',
            y: 'တစ်နှစ်',
            yy: '%d နှစ်'
        },
        preparse: function (string) {
            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return my;
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Norwegian Bokmål [nb]
//! authors : Espen Hovlandsdal : https://github.com/rexxars
//!           Sigurd Gartmann : https://github.com/sigurdga

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var nb = moment.defineLocale('nb', {
        months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort: 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
        monthsParseExact: true,
        weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
        weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
        weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY [kl.] HH:mm',
            LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
        },
        calendar: {
            sameDay: '[i dag kl.] LT',
            nextDay: '[i morgen kl.] LT',
            nextWeek: 'dddd [kl.] LT',
            lastDay: '[i går kl.] LT',
            lastWeek: '[forrige] dddd [kl.] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'om %s',
            past: '%s siden',
            s: 'noen sekunder',
            m: 'ett minutt',
            mm: '%d minutter',
            h: 'en time',
            hh: '%d timer',
            d: 'en dag',
            dd: '%d dager',
            M: 'en måned',
            MM: '%d måneder',
            y: 'ett år',
            yy: '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nb;
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Nepalese [ne]
//! author : suvash : https://github.com/suvash

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    };
    var numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    var ne = moment.defineLocale('ne', {
        months: 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
        monthsShort: 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
        monthsParseExact: true,
        weekdays: 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
        weekdaysShort: 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
        weekdaysMin: 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'Aको h:mm बजे',
            LTS: 'Aको h:mm:ss बजे',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, Aको h:mm बजे',
            LLLL: 'dddd, D MMMM YYYY, Aको h:mm बजे'
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'राति') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'बिहान') {
                return hour;
            } else if (meridiem === 'दिउँसो') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'साँझ') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 3) {
                return 'राति';
            } else if (hour < 12) {
                return 'बिहान';
            } else if (hour < 16) {
                return 'दिउँसो';
            } else if (hour < 20) {
                return 'साँझ';
            } else {
                return 'राति';
            }
        },
        calendar: {
            sameDay: '[आज] LT',
            nextDay: '[भोलि] LT',
            nextWeek: '[आउँदो] dddd[,] LT',
            lastDay: '[हिजो] LT',
            lastWeek: '[गएको] dddd[,] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%sमा',
            past: '%s अगाडि',
            s: 'केही क्षण',
            m: 'एक मिनेट',
            mm: '%d मिनेट',
            h: 'एक घण्टा',
            hh: '%d घण्टा',
            d: 'एक दिन',
            dd: '%d दिन',
            M: 'एक महिना',
            MM: '%d महिना',
            y: 'एक बर्ष',
            yy: '%d बर्ष'
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ne;
});

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Dutch (Belgium) [nl-be]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
    var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

    var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
    var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

    var nlBe = moment.defineLocale('nl-be', {
        months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
        monthsShort: function (m, format) {
            if (!m) {
                return monthsShortWithDots;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },

        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,

        weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
        weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
        weekdaysMin: 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[vandaag om] LT',
            nextDay: '[morgen om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[gisteren om] LT',
            lastWeek: '[afgelopen] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'over %s',
            past: '%s geleden',
            s: 'een paar seconden',
            m: 'één minuut',
            mm: '%d minuten',
            h: 'één uur',
            hh: '%d uur',
            d: 'één dag',
            dd: '%d dagen',
            M: 'één maand',
            MM: '%d maanden',
            y: 'één jaar',
            yy: '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function (number) {
            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nlBe;
});

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Dutch [nl]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
    var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

    var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
    var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

    var nl = moment.defineLocale('nl', {
        months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
        monthsShort: function (m, format) {
            if (!m) {
                return monthsShortWithDots;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },

        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,

        weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
        weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
        weekdaysMin: 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD-MM-YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[vandaag om] LT',
            nextDay: '[morgen om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[gisteren om] LT',
            lastWeek: '[afgelopen] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'over %s',
            past: '%s geleden',
            s: 'een paar seconden',
            m: 'één minuut',
            mm: '%d minuten',
            h: 'één uur',
            hh: '%d uur',
            d: 'één dag',
            dd: '%d dagen',
            M: 'één maand',
            MM: '%d maanden',
            y: 'één jaar',
            yy: '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal: function (number) {
            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nl;
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Nynorsk [nn]
//! author : https://github.com/mechuwind

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var nn = moment.defineLocale('nn', {
        months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
        weekdays: 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
        weekdaysShort: 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
        weekdaysMin: 'su_må_ty_on_to_fr_lø'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY [kl.] H:mm',
            LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
        },
        calendar: {
            sameDay: '[I dag klokka] LT',
            nextDay: '[I morgon klokka] LT',
            nextWeek: 'dddd [klokka] LT',
            lastDay: '[I går klokka] LT',
            lastWeek: '[Føregåande] dddd [klokka] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'om %s',
            past: '%s sidan',
            s: 'nokre sekund',
            m: 'eit minutt',
            mm: '%d minutt',
            h: 'ein time',
            hh: '%d timar',
            d: 'ein dag',
            dd: '%d dagar',
            M: 'ein månad',
            MM: '%d månader',
            y: 'eit år',
            yy: '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nn;
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Punjabi (India) [pa-in]
//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '੧',
        '2': '੨',
        '3': '੩',
        '4': '੪',
        '5': '੫',
        '6': '੬',
        '7': '੭',
        '8': '੮',
        '9': '੯',
        '0': '੦'
    };
    var numberMap = {
        '੧': '1',
        '੨': '2',
        '੩': '3',
        '੪': '4',
        '੫': '5',
        '੬': '6',
        '੭': '7',
        '੮': '8',
        '੯': '9',
        '੦': '0'
    };

    var paIn = moment.defineLocale('pa-in', {
        // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
        months: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
        monthsShort: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
        weekdays: 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
        weekdaysShort: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
        weekdaysMin: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
        longDateFormat: {
            LT: 'A h:mm ਵਜੇ',
            LTS: 'A h:mm:ss ਵਜੇ',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm ਵਜੇ',
            LLLL: 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
        },
        calendar: {
            sameDay: '[ਅਜ] LT',
            nextDay: '[ਕਲ] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[ਕਲ] LT',
            lastWeek: '[ਪਿਛਲੇ] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s ਵਿੱਚ',
            past: '%s ਪਿਛਲੇ',
            s: 'ਕੁਝ ਸਕਿੰਟ',
            m: 'ਇਕ ਮਿੰਟ',
            mm: '%d ਮਿੰਟ',
            h: 'ਇੱਕ ਘੰਟਾ',
            hh: '%d ਘੰਟੇ',
            d: 'ਇੱਕ ਦਿਨ',
            dd: '%d ਦਿਨ',
            M: 'ਇੱਕ ਮਹੀਨਾ',
            MM: '%d ਮਹੀਨੇ',
            y: 'ਇੱਕ ਸਾਲ',
            yy: '%d ਸਾਲ'
        },
        preparse: function (string) {
            return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
        meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ਰਾਤ') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ਸਵੇਰ') {
                return hour;
            } else if (meridiem === 'ਦੁਪਹਿਰ') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'ਸ਼ਾਮ') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ਰਾਤ';
            } else if (hour < 10) {
                return 'ਸਵੇਰ';
            } else if (hour < 17) {
                return 'ਦੁਪਹਿਰ';
            } else if (hour < 20) {
                return 'ਸ਼ਾਮ';
            } else {
                return 'ਰਾਤ';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return paIn;
});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Polish [pl]
//! author : Rafal Hirsz : https://github.com/evoL

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_');
    var monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
    function plural(n) {
        return n % 10 < 5 && n % 10 > 1 && ~~(n / 10) % 10 !== 1;
    }
    function translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'm':
                return withoutSuffix ? 'minuta' : 'minutę';
            case 'mm':
                return result + (plural(number) ? 'minuty' : 'minut');
            case 'h':
                return withoutSuffix ? 'godzina' : 'godzinę';
            case 'hh':
                return result + (plural(number) ? 'godziny' : 'godzin');
            case 'MM':
                return result + (plural(number) ? 'miesiące' : 'miesięcy');
            case 'yy':
                return result + (plural(number) ? 'lata' : 'lat');
        }
    }

    var pl = moment.defineLocale('pl', {
        months: function (momentToFormat, format) {
            if (!momentToFormat) {
                return monthsNominative;
            } else if (format === '') {
                // Hack: if format empty we know this is used to generate
                // RegExp by moment. Give then back both valid forms of months
                // in RegExp ready format.
                return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
            } else if (/D MMMM/.test(format)) {
                return monthsSubjective[momentToFormat.month()];
            } else {
                return monthsNominative[momentToFormat.month()];
            }
        },
        monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
        weekdays: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
        weekdaysShort: 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
        weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Dziś o] LT',
            nextDay: '[Jutro o] LT',
            nextWeek: '[W] dddd [o] LT',
            lastDay: '[Wczoraj o] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[W zeszłą niedzielę o] LT';
                    case 3:
                        return '[W zeszłą środę o] LT';
                    case 6:
                        return '[W zeszłą sobotę o] LT';
                    default:
                        return '[W zeszły] dddd [o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: '%s temu',
            s: 'kilka sekund',
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: '1 dzień',
            dd: '%d dni',
            M: 'miesiąc',
            MM: translate,
            y: 'rok',
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return pl;
});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Portuguese (Brazil) [pt-br]
//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var ptBr = moment.defineLocale('pt-br', {
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
        weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
            LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
        },
        calendar: {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return this.day() === 0 || this.day() === 6 ? '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'em %s',
            past: '%s atrás',
            s: 'poucos segundos',
            m: 'um minuto',
            mm: '%d minutos',
            h: 'uma hora',
            hh: '%d horas',
            d: 'um dia',
            dd: '%d dias',
            M: 'um mês',
            MM: '%d meses',
            y: 'um ano',
            yy: '%d anos'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº'
    });

    return ptBr;
});

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Portuguese [pt]
//! author : Jefferson : https://github.com/jalex79

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var pt = moment.defineLocale('pt', {
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays: 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
        weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY HH:mm',
            LLLL: 'dddd, D [de] MMMM [de] YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return this.day() === 0 || this.day() === 6 ? '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'em %s',
            past: 'há %s',
            s: 'segundos',
            m: 'um minuto',
            mm: '%d minutos',
            h: 'uma hora',
            hh: '%d horas',
            d: 'um dia',
            dd: '%d dias',
            M: 'um mês',
            MM: '%d meses',
            y: 'um ano',
            yy: '%d anos'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return pt;
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Romanian [ro]
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': 'minute',
            'hh': 'ore',
            'dd': 'zile',
            'MM': 'luni',
            'yy': 'ani'
        },
            separator = ' ';
        if (number % 100 >= 20 || number >= 100 && number % 100 === 0) {
            separator = ' de ';
        }
        return number + separator + format[key];
    }

    var ro = moment.defineLocale('ro', {
        months: 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
        monthsShort: 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
        weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
        weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY H:mm',
            LLLL: 'dddd, D MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[azi la] LT',
            nextDay: '[mâine la] LT',
            nextWeek: 'dddd [la] LT',
            lastDay: '[ieri la] LT',
            lastWeek: '[fosta] dddd [la] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'peste %s',
            past: '%s în urmă',
            s: 'câteva secunde',
            m: 'un minut',
            mm: relativeTimeWithPlural,
            h: 'o oră',
            hh: relativeTimeWithPlural,
            d: 'o zi',
            dd: relativeTimeWithPlural,
            M: 'o lună',
            MM: relativeTimeWithPlural,
            y: 'un an',
            yy: relativeTimeWithPlural
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ro;
});

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Russian [ru]
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
//! author : Коренберг Марк : https://github.com/socketpair

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
            'hh': 'час_часа_часов',
            'dd': 'день_дня_дней',
            'MM': 'месяц_месяца_месяцев',
            'yy': 'год_года_лет'
        };
        if (key === 'm') {
            return withoutSuffix ? 'минута' : 'минуту';
        } else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

    // http://new.gramota.ru/spravka/rules/139-prop : § 103
    // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
    var ru = moment.defineLocale('ru', {
        months: {
            format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
            standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
        },
        monthsShort: {
            // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
            format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
            standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
        },
        weekdays: {
            standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
            format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
        },
        weekdaysShort: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,

        // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
        monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

        // копия предыдущего
        monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

        // полные названия с падежами
        monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

        // Выражение, которое соотвествует только сокращённым формам
        monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY г.',
            LLL: 'D MMMM YYYY г., HH:mm',
            LLLL: 'dddd, D MMMM YYYY г., HH:mm'
        },
        calendar: {
            sameDay: '[Сегодня в] LT',
            nextDay: '[Завтра в] LT',
            lastDay: '[Вчера в] LT',
            nextWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[В следующее] dddd [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[В следующий] dddd [в] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[В следующую] dddd [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd [в] LT';
                    } else {
                        return '[В] dddd [в] LT';
                    }
                }
            },
            lastWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[В прошлое] dddd [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[В прошлый] dddd [в] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[В прошлую] dddd [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd [в] LT';
                    } else {
                        return '[В] dddd [в] LT';
                    }
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'через %s',
            past: '%s назад',
            s: 'несколько секунд',
            m: relativeTimeWithPlural,
            mm: relativeTimeWithPlural,
            h: 'час',
            hh: relativeTimeWithPlural,
            d: 'день',
            dd: relativeTimeWithPlural,
            M: 'месяц',
            MM: relativeTimeWithPlural,
            y: 'год',
            yy: relativeTimeWithPlural
        },
        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM: function (input) {
            return (/^(дня|вечера)$/.test(input)
            );
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночи';
            } else if (hour < 12) {
                return 'утра';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечера';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                    return number + '-й';
                case 'D':
                    return number + '-го';
                case 'w':
                case 'W':
                    return number + '-я';
                default:
                    return number;
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ru;
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Sindhi [sd]
//! author : Narain Sagar : https://github.com/narainsagar

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var months = ['جنوري', 'فيبروري', 'مارچ', 'اپريل', 'مئي', 'جون', 'جولاءِ', 'آگسٽ', 'سيپٽمبر', 'آڪٽوبر', 'نومبر', 'ڊسمبر'];
    var days = ['آچر', 'سومر', 'اڱارو', 'اربع', 'خميس', 'جمع', 'ڇنڇر'];

    var sd = moment.defineLocale('sd', {
        months: months,
        monthsShort: months,
        weekdays: days,
        weekdaysShort: days,
        weekdaysMin: days,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd، D MMMM YYYY HH:mm'
        },
        meridiemParse: /صبح|شام/,
        isPM: function (input) {
            return 'شام' === input;
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'صبح';
            }
            return 'شام';
        },
        calendar: {
            sameDay: '[اڄ] LT',
            nextDay: '[سڀاڻي] LT',
            nextWeek: 'dddd [اڳين هفتي تي] LT',
            lastDay: '[ڪالهه] LT',
            lastWeek: '[گزريل هفتي] dddd [تي] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s پوء',
            past: '%s اڳ',
            s: 'چند سيڪنڊ',
            m: 'هڪ منٽ',
            mm: '%d منٽ',
            h: 'هڪ ڪلاڪ',
            hh: '%d ڪلاڪ',
            d: 'هڪ ڏينهن',
            dd: '%d ڏينهن',
            M: 'هڪ مهينو',
            MM: '%d مهينا',
            y: 'هڪ سال',
            yy: '%d سال'
        },
        preparse: function (string) {
            return string.replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '،');
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sd;
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Northern Sami [se]
//! authors : Bård Rolstad Henriksen : https://github.com/karamell

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var se = moment.defineLocale('se', {
        months: 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
        monthsShort: 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
        weekdays: 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
        weekdaysShort: 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
        weekdaysMin: 's_v_m_g_d_b_L'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'MMMM D. [b.] YYYY',
            LLL: 'MMMM D. [b.] YYYY [ti.] HH:mm',
            LLLL: 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
        },
        calendar: {
            sameDay: '[otne ti] LT',
            nextDay: '[ihttin ti] LT',
            nextWeek: 'dddd [ti] LT',
            lastDay: '[ikte ti] LT',
            lastWeek: '[ovddit] dddd [ti] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s geažes',
            past: 'maŋit %s',
            s: 'moadde sekunddat',
            m: 'okta minuhta',
            mm: '%d minuhtat',
            h: 'okta diimmu',
            hh: '%d diimmut',
            d: 'okta beaivi',
            dd: '%d beaivvit',
            M: 'okta mánnu',
            MM: '%d mánut',
            y: 'okta jahki',
            yy: '%d jagit'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return se;
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Sinhalese [si]
//! author : Sampath Sitinamaluwa : https://github.com/sampathsris

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    /*jshint -W100*/

    var si = moment.defineLocale('si', {
        months: 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
        monthsShort: 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
        weekdays: 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
        weekdaysShort: 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
        weekdaysMin: 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'a h:mm',
            LTS: 'a h:mm:ss',
            L: 'YYYY/MM/DD',
            LL: 'YYYY MMMM D',
            LLL: 'YYYY MMMM D, a h:mm',
            LLLL: 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
        },
        calendar: {
            sameDay: '[අද] LT[ට]',
            nextDay: '[හෙට] LT[ට]',
            nextWeek: 'dddd LT[ට]',
            lastDay: '[ඊයේ] LT[ට]',
            lastWeek: '[පසුගිය] dddd LT[ට]',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%sකින්',
            past: '%sකට පෙර',
            s: 'තත්පර කිහිපය',
            m: 'මිනිත්තුව',
            mm: 'මිනිත්තු %d',
            h: 'පැය',
            hh: 'පැය %d',
            d: 'දිනය',
            dd: 'දින %d',
            M: 'මාසය',
            MM: 'මාස %d',
            y: 'වසර',
            yy: 'වසර %d'
        },
        dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
        ordinal: function (number) {
            return number + ' වැනි';
        },
        meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
        isPM: function (input) {
            return input === 'ප.ව.' || input === 'පස් වරු';
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'ප.ව.' : 'පස් වරු';
            } else {
                return isLower ? 'පෙ.ව.' : 'පෙර වරු';
            }
        }
    });

    return si;
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Slovak [sk]
//! author : Martin Minka : https://github.com/k2s
//! based on work of petrbela : https://github.com/petrbela

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_');
    var monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
    function plural(n) {
        return n > 1 && n < 5;
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                // a few seconds / in a few seconds / a few seconds ago
                return withoutSuffix || isFuture ? 'pár sekúnd' : 'pár sekundami';
            case 'm':
                // a minute / in a minute / a minute ago
                return withoutSuffix ? 'minúta' : isFuture ? 'minútu' : 'minútou';
            case 'mm':
                // 9 minutes / in 9 minutes / 9 minutes ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'minúty' : 'minút');
                } else {
                    return result + 'minútami';
                }
                break;
            case 'h':
                // an hour / in an hour / an hour ago
                return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';
            case 'hh':
                // 9 hours / in 9 hours / 9 hours ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'hodiny' : 'hodín');
                } else {
                    return result + 'hodinami';
                }
                break;
            case 'd':
                // a day / in a day / a day ago
                return withoutSuffix || isFuture ? 'deň' : 'dňom';
            case 'dd':
                // 9 days / in 9 days / 9 days ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'dni' : 'dní');
                } else {
                    return result + 'dňami';
                }
                break;
            case 'M':
                // a month / in a month / a month ago
                return withoutSuffix || isFuture ? 'mesiac' : 'mesiacom';
            case 'MM':
                // 9 months / in 9 months / 9 months ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'mesiace' : 'mesiacov');
                } else {
                    return result + 'mesiacmi';
                }
                break;
            case 'y':
                // a year / in a year / a year ago
                return withoutSuffix || isFuture ? 'rok' : 'rokom';
            case 'yy':
                // 9 years / in 9 years / 9 years ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'roky' : 'rokov');
                } else {
                    return result + 'rokmi';
                }
                break;
        }
    }

    var sk = moment.defineLocale('sk', {
        months: months,
        monthsShort: monthsShort,
        weekdays: 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
        weekdaysShort: 'ne_po_ut_st_št_pi_so'.split('_'),
        weekdaysMin: 'ne_po_ut_st_št_pi_so'.split('_'),
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[dnes o] LT',
            nextDay: '[zajtra o] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[v nedeľu o] LT';
                    case 1:
                    case 2:
                        return '[v] dddd [o] LT';
                    case 3:
                        return '[v stredu o] LT';
                    case 4:
                        return '[vo štvrtok o] LT';
                    case 5:
                        return '[v piatok o] LT';
                    case 6:
                        return '[v sobotu o] LT';
                }
            },
            lastDay: '[včera o] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[minulú nedeľu o] LT';
                    case 1:
                    case 2:
                        return '[minulý] dddd [o] LT';
                    case 3:
                        return '[minulú stredu o] LT';
                    case 4:
                    case 5:
                        return '[minulý] dddd [o] LT';
                    case 6:
                        return '[minulú sobotu o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'pred %s',
            s: translate,
            m: translate,
            mm: translate,
            h: translate,
            hh: translate,
            d: translate,
            dd: translate,
            M: translate,
            MM: translate,
            y: translate,
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sk;
});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Slovenian [sl]
//! author : Robert Sedovšek : https://github.com/sedovsek

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
            case 'm':
                return withoutSuffix ? 'ena minuta' : 'eno minuto';
            case 'mm':
                if (number === 1) {
                    result += withoutSuffix ? 'minuta' : 'minuto';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'minute' : 'minutami';
                } else {
                    result += withoutSuffix || isFuture ? 'minut' : 'minutami';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'ena ura' : 'eno uro';
            case 'hh':
                if (number === 1) {
                    result += withoutSuffix ? 'ura' : 'uro';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'uri' : 'urama';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'ure' : 'urami';
                } else {
                    result += withoutSuffix || isFuture ? 'ur' : 'urami';
                }
                return result;
            case 'd':
                return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
            case 'dd':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'dan' : 'dnem';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
                } else {
                    result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
                }
                return result;
            case 'M':
                return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
            case 'MM':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
                } else {
                    result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
                }
                return result;
            case 'y':
                return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
            case 'yy':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'leto' : 'letom';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'leti' : 'letoma';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'leta' : 'leti';
                } else {
                    result += withoutSuffix || isFuture ? 'let' : 'leti';
                }
                return result;
        }
    }

    var sl = moment.defineLocale('sl', {
        months: 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
        weekdaysShort: 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
        weekdaysMin: 'ne_po_to_sr_če_pe_so'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danes ob] LT',
            nextDay: '[jutri ob] LT',

            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[v] [nedeljo] [ob] LT';
                    case 3:
                        return '[v] [sredo] [ob] LT';
                    case 6:
                        return '[v] [soboto] [ob] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[v] dddd [ob] LT';
                }
            },
            lastDay: '[včeraj ob] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[prejšnjo] [nedeljo] [ob] LT';
                    case 3:
                        return '[prejšnjo] [sredo] [ob] LT';
                    case 6:
                        return '[prejšnjo] [soboto] [ob] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prejšnji] dddd [ob] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'čez %s',
            past: 'pred %s',
            s: processRelativeTime,
            m: processRelativeTime,
            mm: processRelativeTime,
            h: processRelativeTime,
            hh: processRelativeTime,
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return sl;
});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Albanian [sq]
//! author : Flakërim Ismani : https://github.com/flakerimi
//! author : Menelion Elensúle : https://github.com/Oire
//! author : Oerd Cukalla : https://github.com/oerd

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var sq = moment.defineLocale('sq', {
        months: 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
        monthsShort: 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
        weekdays: 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
        weekdaysShort: 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
        weekdaysMin: 'D_H_Ma_Më_E_P_Sh'.split('_'),
        weekdaysParseExact: true,
        meridiemParse: /PD|MD/,
        isPM: function (input) {
            return input.charAt(0) === 'M';
        },
        meridiem: function (hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Sot në] LT',
            nextDay: '[Nesër në] LT',
            nextWeek: 'dddd [në] LT',
            lastDay: '[Dje në] LT',
            lastWeek: 'dddd [e kaluar në] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'në %s',
            past: '%s më parë',
            s: 'disa sekonda',
            m: 'një minutë',
            mm: '%d minuta',
            h: 'një orë',
            hh: '%d orë',
            d: 'një ditë',
            dd: '%d ditë',
            M: 'një muaj',
            MM: '%d muaj',
            y: 'një vit',
            yy: '%d vite'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sq;
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Serbian Cyrillic [sr-cyrl]
//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var translator = {
        words: { //Different grammatical cases
            m: ['један минут', 'једне минуте'],
            mm: ['минут', 'минуте', 'минута'],
            h: ['један сат', 'једног сата'],
            hh: ['сат', 'сата', 'сати'],
            dd: ['дан', 'дана', 'дана'],
            MM: ['месец', 'месеца', 'месеци'],
            yy: ['година', 'године', 'година']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var srCyrl = moment.defineLocale('sr-cyrl', {
        months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
        monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
        monthsParseExact: true,
        weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
        weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
        weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[данас у] LT',
            nextDay: '[сутра у] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[у] [недељу] [у] LT';
                    case 3:
                        return '[у] [среду] [у] LT';
                    case 6:
                        return '[у] [суботу] [у] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[у] dddd [у] LT';
                }
            },
            lastDay: '[јуче у] LT',
            lastWeek: function () {
                var lastWeekDays = ['[прошле] [недеље] [у] LT', '[прошлог] [понедељка] [у] LT', '[прошлог] [уторка] [у] LT', '[прошле] [среде] [у] LT', '[прошлог] [четвртка] [у] LT', '[прошлог] [петка] [у] LT', '[прошле] [суботе] [у] LT'];
                return lastWeekDays[this.day()];
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'за %s',
            past: 'пре %s',
            s: 'неколико секунди',
            m: translator.translate,
            mm: translator.translate,
            h: translator.translate,
            hh: translator.translate,
            d: 'дан',
            dd: translator.translate,
            M: 'месец',
            MM: translator.translate,
            y: 'годину',
            yy: translator.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return srCyrl;
});

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Serbian [sr]
//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var translator = {
        words: { //Different grammatical cases
            m: ['jedan minut', 'jedne minute'],
            mm: ['minut', 'minute', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mesec', 'meseca', 'meseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var sr = moment.defineLocale('sr', {
        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sutra u] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedelju] [u] LT';
                    case 3:
                        return '[u] [sredu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay: '[juče u] LT',
            lastWeek: function () {
                var lastWeekDays = ['[prošle] [nedelje] [u] LT', '[prošlog] [ponedeljka] [u] LT', '[prošlog] [utorka] [u] LT', '[prošle] [srede] [u] LT', '[prošlog] [četvrtka] [u] LT', '[prošlog] [petka] [u] LT', '[prošle] [subote] [u] LT'];
                return lastWeekDays[this.day()];
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'za %s',
            past: 'pre %s',
            s: 'nekoliko sekundi',
            m: translator.translate,
            mm: translator.translate,
            h: translator.translate,
            hh: translator.translate,
            d: 'dan',
            dd: translator.translate,
            M: 'mesec',
            MM: translator.translate,
            y: 'godinu',
            yy: translator.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return sr;
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : siSwati [ss]
//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var ss = moment.defineLocale('ss', {
        months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
        monthsShort: 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
        weekdays: 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
        weekdaysShort: 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
        weekdaysMin: 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendar: {
            sameDay: '[Namuhla nga] LT',
            nextDay: '[Kusasa nga] LT',
            nextWeek: 'dddd [nga] LT',
            lastDay: '[Itolo nga] LT',
            lastWeek: 'dddd [leliphelile] [nga] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'nga %s',
            past: 'wenteka nga %s',
            s: 'emizuzwana lomcane',
            m: 'umzuzu',
            mm: '%d emizuzu',
            h: 'lihora',
            hh: '%d emahora',
            d: 'lilanga',
            dd: '%d emalanga',
            M: 'inyanga',
            MM: '%d tinyanga',
            y: 'umnyaka',
            yy: '%d iminyaka'
        },
        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
        meridiem: function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'ekuseni';
            } else if (hours < 15) {
                return 'emini';
            } else if (hours < 19) {
                return 'entsambama';
            } else {
                return 'ebusuku';
            }
        },
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ekuseni') {
                return hour;
            } else if (meridiem === 'emini') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
                if (hour === 0) {
                    return 0;
                }
                return hour + 12;
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: '%d',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ss;
});

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Swedish [sv]
//! author : Jens Alm : https://github.com/ulmus

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var sv = moment.defineLocale('sv', {
        months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
        monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
        weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
        weekdaysShort: 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
        weekdaysMin: 'sö_må_ti_on_to_fr_lö'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [kl.] HH:mm',
            LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
            lll: 'D MMM YYYY HH:mm',
            llll: 'ddd D MMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Idag] LT',
            nextDay: '[Imorgon] LT',
            lastDay: '[Igår] LT',
            nextWeek: '[På] dddd LT',
            lastWeek: '[I] dddd[s] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'om %s',
            past: 'för %s sedan',
            s: 'några sekunder',
            m: 'en minut',
            mm: '%d minuter',
            h: 'en timme',
            hh: '%d timmar',
            d: 'en dag',
            dd: '%d dagar',
            M: 'en månad',
            MM: '%d månader',
            y: 'ett år',
            yy: '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
        ordinal: function (number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'e' : b === 1 ? 'a' : b === 2 ? 'a' : b === 3 ? 'e' : 'e';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sv;
});

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Swahili [sw]
//! author : Fahad Kassim : https://github.com/fadsel

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var sw = moment.defineLocale('sw', {
        months: 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
        monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
        weekdays: 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
        weekdaysShort: 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
        weekdaysMin: 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[leo saa] LT',
            nextDay: '[kesho saa] LT',
            nextWeek: '[wiki ijayo] dddd [saat] LT',
            lastDay: '[jana] LT',
            lastWeek: '[wiki iliyopita] dddd [saat] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s baadaye',
            past: 'tokea %s',
            s: 'hivi punde',
            m: 'dakika moja',
            mm: 'dakika %d',
            h: 'saa limoja',
            hh: 'masaa %d',
            d: 'siku moja',
            dd: 'masiku %d',
            M: 'mwezi mmoja',
            MM: 'miezi %d',
            y: 'mwaka mmoja',
            yy: 'miaka %d'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return sw;
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tamil [ta]
//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var symbolMap = {
        '1': '௧',
        '2': '௨',
        '3': '௩',
        '4': '௪',
        '5': '௫',
        '6': '௬',
        '7': '௭',
        '8': '௮',
        '9': '௯',
        '0': '௦'
    };
    var numberMap = {
        '௧': '1',
        '௨': '2',
        '௩': '3',
        '௪': '4',
        '௫': '5',
        '௬': '6',
        '௭': '7',
        '௮': '8',
        '௯': '9',
        '௦': '0'
    };

    var ta = moment.defineLocale('ta', {
        months: 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
        monthsShort: 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
        weekdays: 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
        weekdaysShort: 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
        weekdaysMin: 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, HH:mm',
            LLLL: 'dddd, D MMMM YYYY, HH:mm'
        },
        calendar: {
            sameDay: '[இன்று] LT',
            nextDay: '[நாளை] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[நேற்று] LT',
            lastWeek: '[கடந்த வாரம்] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s இல்',
            past: '%s முன்',
            s: 'ஒரு சில விநாடிகள்',
            m: 'ஒரு நிமிடம்',
            mm: '%d நிமிடங்கள்',
            h: 'ஒரு மணி நேரம்',
            hh: '%d மணி நேரம்',
            d: 'ஒரு நாள்',
            dd: '%d நாட்கள்',
            M: 'ஒரு மாதம்',
            MM: '%d மாதங்கள்',
            y: 'ஒரு வருடம்',
            yy: '%d ஆண்டுகள்'
        },
        dayOfMonthOrdinalParse: /\d{1,2}வது/,
        ordinal: function (number) {
            return number + 'வது';
        },
        preparse: function (string) {
            return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        // refer http://ta.wikipedia.org/s/1er1
        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
        meridiem: function (hour, minute, isLower) {
            if (hour < 2) {
                return ' யாமம்';
            } else if (hour < 6) {
                return ' வைகறை'; // வைகறை
            } else if (hour < 10) {
                return ' காலை'; // காலை
            } else if (hour < 14) {
                return ' நண்பகல்'; // நண்பகல்
            } else if (hour < 18) {
                return ' எற்பாடு'; // எற்பாடு
            } else if (hour < 22) {
                return ' மாலை'; // மாலை
            } else {
                return ' யாமம்';
            }
        },
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'யாமம்') {
                return hour < 2 ? hour : hour + 12;
            } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
                return hour;
            } else if (meridiem === 'நண்பகல்') {
                return hour >= 10 ? hour : hour + 12;
            } else {
                return hour + 12;
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ta;
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Telugu [te]
//! author : Krishna Chaitanya Thota : https://github.com/kcthota

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var te = moment.defineLocale('te', {
        months: 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
        monthsShort: 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
        monthsParseExact: true,
        weekdays: 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
        weekdaysShort: 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
        weekdaysMin: 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
        longDateFormat: {
            LT: 'A h:mm',
            LTS: 'A h:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm',
            LLLL: 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar: {
            sameDay: '[నేడు] LT',
            nextDay: '[రేపు] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[నిన్న] LT',
            lastWeek: '[గత] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s లో',
            past: '%s క్రితం',
            s: 'కొన్ని క్షణాలు',
            m: 'ఒక నిమిషం',
            mm: '%d నిమిషాలు',
            h: 'ఒక గంట',
            hh: '%d గంటలు',
            d: 'ఒక రోజు',
            dd: '%d రోజులు',
            M: 'ఒక నెల',
            MM: '%d నెలలు',
            y: 'ఒక సంవత్సరం',
            yy: '%d సంవత్సరాలు'
        },
        dayOfMonthOrdinalParse: /\d{1,2}వ/,
        ordinal: '%dవ',
        meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'రాత్రి') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ఉదయం') {
                return hour;
            } else if (meridiem === 'మధ్యాహ్నం') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'సాయంత్రం') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'రాత్రి';
            } else if (hour < 10) {
                return 'ఉదయం';
            } else if (hour < 17) {
                return 'మధ్యాహ్నం';
            } else if (hour < 20) {
                return 'సాయంత్రం';
            } else {
                return 'రాత్రి';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return te;
});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tetun Dili (East Timor) [tet]
//! author : Joshua Brooks : https://github.com/joshbrooks
//! author : Onorio De J. Afonso : https://github.com/marobo

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var tet = moment.defineLocale('tet', {
        months: 'Janeiru_Fevereiru_Marsu_Abril_Maiu_Juniu_Juliu_Augustu_Setembru_Outubru_Novembru_Dezembru'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Aug_Set_Out_Nov_Dez'.split('_'),
        weekdays: 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sexta_Sabadu'.split('_'),
        weekdaysShort: 'Dom_Seg_Ters_Kua_Kint_Sext_Sab'.split('_'),
        weekdaysMin: 'Do_Seg_Te_Ku_Ki_Sex_Sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Ohin iha] LT',
            nextDay: '[Aban iha] LT',
            nextWeek: 'dddd [iha] LT',
            lastDay: '[Horiseik iha] LT',
            lastWeek: 'dddd [semana kotuk] [iha] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'iha %s',
            past: '%s liuba',
            s: 'minutu balun',
            m: 'minutu ida',
            mm: 'minutus %d',
            h: 'horas ida',
            hh: 'horas %d',
            d: 'loron ida',
            dd: 'loron %d',
            M: 'fulan ida',
            MM: 'fulan %d',
            y: 'tinan ida',
            yy: 'tinan %d'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return tet;
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Thai [th]
//! author : Kridsada Thanabulpong : https://github.com/sirn

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var th = moment.defineLocale('th', {
        months: 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
        monthsShort: 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
        monthsParseExact: true,
        weekdays: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
        weekdaysShort: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
        weekdaysMin: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'H:mm',
            LTS: 'H:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY เวลา H:mm',
            LLLL: 'วันddddที่ D MMMM YYYY เวลา H:mm'
        },
        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
        isPM: function (input) {
            return input === 'หลังเที่ยง';
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ก่อนเที่ยง';
            } else {
                return 'หลังเที่ยง';
            }
        },
        calendar: {
            sameDay: '[วันนี้ เวลา] LT',
            nextDay: '[พรุ่งนี้ เวลา] LT',
            nextWeek: 'dddd[หน้า เวลา] LT',
            lastDay: '[เมื่อวานนี้ เวลา] LT',
            lastWeek: '[วัน]dddd[ที่แล้ว เวลา] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'อีก %s',
            past: '%sที่แล้ว',
            s: 'ไม่กี่วินาที',
            m: '1 นาที',
            mm: '%d นาที',
            h: '1 ชั่วโมง',
            hh: '%d ชั่วโมง',
            d: '1 วัน',
            dd: '%d วัน',
            M: '1 เดือน',
            MM: '%d เดือน',
            y: '1 ปี',
            yy: '%d ปี'
        }
    });

    return th;
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tagalog (Philippines) [tl-ph]
//! author : Dan Hagman : https://github.com/hagmandan

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var tlPh = moment.defineLocale('tl-ph', {
        months: 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
        monthsShort: 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
        weekdays: 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
        weekdaysShort: 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
        weekdaysMin: 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'MM/D/YYYY',
            LL: 'MMMM D, YYYY',
            LLL: 'MMMM D, YYYY HH:mm',
            LLLL: 'dddd, MMMM DD, YYYY HH:mm'
        },
        calendar: {
            sameDay: 'LT [ngayong araw]',
            nextDay: '[Bukas ng] LT',
            nextWeek: 'LT [sa susunod na] dddd',
            lastDay: 'LT [kahapon]',
            lastWeek: 'LT [noong nakaraang] dddd',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'sa loob ng %s',
            past: '%s ang nakalipas',
            s: 'ilang segundo',
            m: 'isang minuto',
            mm: '%d minuto',
            h: 'isang oras',
            hh: '%d oras',
            d: 'isang araw',
            dd: '%d araw',
            M: 'isang buwan',
            MM: '%d buwan',
            y: 'isang taon',
            yy: '%d taon'
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: function (number) {
            return number;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return tlPh;
});

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Klingon [tlh]
//! author : Dominika Kruk : https://github.com/amaranthrose

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

    function translateFuture(output) {
        var time = output;
        time = output.indexOf('jaj') !== -1 ? time.slice(0, -3) + 'leS' : output.indexOf('jar') !== -1 ? time.slice(0, -3) + 'waQ' : output.indexOf('DIS') !== -1 ? time.slice(0, -3) + 'nem' : time + ' pIq';
        return time;
    }

    function translatePast(output) {
        var time = output;
        time = output.indexOf('jaj') !== -1 ? time.slice(0, -3) + 'Hu’' : output.indexOf('jar') !== -1 ? time.slice(0, -3) + 'wen' : output.indexOf('DIS') !== -1 ? time.slice(0, -3) + 'ben' : time + ' ret';
        return time;
    }

    function translate(number, withoutSuffix, string, isFuture) {
        var numberNoun = numberAsNoun(number);
        switch (string) {
            case 'mm':
                return numberNoun + ' tup';
            case 'hh':
                return numberNoun + ' rep';
            case 'dd':
                return numberNoun + ' jaj';
            case 'MM':
                return numberNoun + ' jar';
            case 'yy':
                return numberNoun + ' DIS';
        }
    }

    function numberAsNoun(number) {
        var hundred = Math.floor(number % 1000 / 100),
            ten = Math.floor(number % 100 / 10),
            one = number % 10,
            word = '';
        if (hundred > 0) {
            word += numbersNouns[hundred] + 'vatlh';
        }
        if (ten > 0) {
            word += (word !== '' ? ' ' : '') + numbersNouns[ten] + 'maH';
        }
        if (one > 0) {
            word += (word !== '' ? ' ' : '') + numbersNouns[one];
        }
        return word === '' ? 'pagh' : word;
    }

    var tlh = moment.defineLocale('tlh', {
        months: 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
        monthsShort: 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
        monthsParseExact: true,
        weekdays: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        weekdaysShort: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        weekdaysMin: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[DaHjaj] LT',
            nextDay: '[wa’leS] LT',
            nextWeek: 'LLL',
            lastDay: '[wa’Hu’] LT',
            lastWeek: 'LLL',
            sameElse: 'L'
        },
        relativeTime: {
            future: translateFuture,
            past: translatePast,
            s: 'puS lup',
            m: 'wa’ tup',
            mm: translate,
            h: 'wa’ rep',
            hh: translate,
            d: 'wa’ jaj',
            dd: translate,
            M: 'wa’ jar',
            MM: translate,
            y: 'wa’ DIS',
            yy: translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return tlh;
});

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Turkish [tr]
//! authors : Erhan Gundogan : https://github.com/erhangundogan,
//!           Burak Yiğit Kaya: https://github.com/BYK

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var suffixes = {
        1: '\'inci',
        5: '\'inci',
        8: '\'inci',
        70: '\'inci',
        80: '\'inci',
        2: '\'nci',
        7: '\'nci',
        20: '\'nci',
        50: '\'nci',
        3: '\'üncü',
        4: '\'üncü',
        100: '\'üncü',
        6: '\'ncı',
        9: '\'uncu',
        10: '\'uncu',
        30: '\'uncu',
        60: '\'ıncı',
        90: '\'ıncı'
    };

    var tr = moment.defineLocale('tr', {
        months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
        monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
        weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
        weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
        weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[bugün saat] LT',
            nextDay: '[yarın saat] LT',
            nextWeek: '[haftaya] dddd [saat] LT',
            lastDay: '[dün] LT',
            lastWeek: '[geçen hafta] dddd [saat] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s sonra',
            past: '%s önce',
            s: 'birkaç saniye',
            m: 'bir dakika',
            mm: '%d dakika',
            h: 'bir saat',
            hh: '%d saat',
            d: 'bir gün',
            dd: '%d gün',
            M: 'bir ay',
            MM: '%d ay',
            y: 'bir yıl',
            yy: '%d yıl'
        },
        dayOfMonthOrdinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
        ordinal: function (number) {
            if (number === 0) {
                // special case for zero
                return number + '\'ıncı';
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;
            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return tr;
});

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Talossan [tzl]
//! author : Robin van der Vliet : https://github.com/robin0van0der0v
//! author : Iustì Canun

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
    // This is currently too difficult (maybe even impossible) to add.

    var tzl = moment.defineLocale('tzl', {
        months: 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
        weekdays: 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
        weekdaysShort: 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
        weekdaysMin: 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
        longDateFormat: {
            LT: 'HH.mm',
            LTS: 'HH.mm.ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM [dallas] YYYY',
            LLL: 'D. MMMM [dallas] YYYY HH.mm',
            LLLL: 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
        },
        meridiemParse: /d\'o|d\'a/i,
        isPM: function (input) {
            return 'd\'o' === input.toLowerCase();
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'd\'o' : 'D\'O';
            } else {
                return isLower ? 'd\'a' : 'D\'A';
            }
        },
        calendar: {
            sameDay: '[oxhi à] LT',
            nextDay: '[demà à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[ieiri à] LT',
            lastWeek: '[sür el] dddd [lasteu à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'osprei %s',
            past: 'ja%s',
            s: processRelativeTime,
            m: processRelativeTime,
            mm: processRelativeTime,
            h: processRelativeTime,
            hh: processRelativeTime,
            d: processRelativeTime,
            dd: processRelativeTime,
            M: processRelativeTime,
            MM: processRelativeTime,
            y: processRelativeTime,
            yy: processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['viensas secunds', '\'iensas secunds'],
            'm': ['\'n míut', '\'iens míut'],
            'mm': [number + ' míuts', '' + number + ' míuts'],
            'h': ['\'n þora', '\'iensa þora'],
            'hh': [number + ' þoras', '' + number + ' þoras'],
            'd': ['\'n ziua', '\'iensa ziua'],
            'dd': [number + ' ziuas', '' + number + ' ziuas'],
            'M': ['\'n mes', '\'iens mes'],
            'MM': [number + ' mesen', '' + number + ' mesen'],
            'y': ['\'n ar', '\'iens ar'],
            'yy': [number + ' ars', '' + number + ' ars']
        };
        return isFuture ? format[key][0] : withoutSuffix ? format[key][0] : format[key][1];
    }

    return tzl;
});

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Central Atlas Tamazight Latin [tzm-latn]
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var tzmLatn = moment.defineLocale('tzm-latn', {
        months: 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
        monthsShort: 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
        weekdays: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        weekdaysShort: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        weekdaysMin: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[asdkh g] LT',
            nextDay: '[aska g] LT',
            nextWeek: 'dddd [g] LT',
            lastDay: '[assant g] LT',
            lastWeek: 'dddd [g] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dadkh s yan %s',
            past: 'yan %s',
            s: 'imik',
            m: 'minuḍ',
            mm: '%d minuḍ',
            h: 'saɛa',
            hh: '%d tassaɛin',
            d: 'ass',
            dd: '%d ossan',
            M: 'ayowr',
            MM: '%d iyyirn',
            y: 'asgas',
            yy: '%d isgasn'
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return tzmLatn;
});

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Central Atlas Tamazight [tzm]
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var tzm = moment.defineLocale('tzm', {
        months: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
        monthsShort: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
        weekdays: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        weekdaysShort: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        weekdaysMin: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
            nextWeek: 'dddd [ⴴ] LT',
            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
            lastWeek: 'dddd [ⴴ] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
            past: 'ⵢⴰⵏ %s',
            s: 'ⵉⵎⵉⴽ',
            m: 'ⵎⵉⵏⵓⴺ',
            mm: '%d ⵎⵉⵏⵓⴺ',
            h: 'ⵙⴰⵄⴰ',
            hh: '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
            d: 'ⴰⵙⵙ',
            dd: '%d oⵙⵙⴰⵏ',
            M: 'ⴰⵢoⵓⵔ',
            MM: '%d ⵉⵢⵢⵉⵔⵏ',
            y: 'ⴰⵙⴳⴰⵙ',
            yy: '%d ⵉⵙⴳⴰⵙⵏ'
        },
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return tzm;
});

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Ukrainian [uk]
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion Elensúle : https://github.com/Oire

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
            'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
            'dd': 'день_дні_днів',
            'MM': 'місяць_місяці_місяців',
            'yy': 'рік_роки_років'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвилина' : 'хвилину';
        } else if (key === 'h') {
            return withoutSuffix ? 'година' : 'годину';
        } else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
            'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
            'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
        };

        if (!m) {
            return weekdays['nominative'];
        }

        var nounCase = /(\[[ВвУу]\]) ?dddd/.test(format) ? 'accusative' : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(format) ? 'genitive' : 'nominative';
        return weekdays[nounCase][m.day()];
    }
    function processHoursFunction(str) {
        return function () {
            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
        };
    }

    var uk = moment.defineLocale('uk', {
        months: {
            'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
            'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
        },
        monthsShort: 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
        weekdays: weekdaysCaseReplace,
        weekdaysShort: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY р.',
            LLL: 'D MMMM YYYY р., HH:mm',
            LLLL: 'dddd, D MMMM YYYY р., HH:mm'
        },
        calendar: {
            sameDay: processHoursFunction('[Сьогодні '),
            nextDay: processHoursFunction('[Завтра '),
            lastDay: processHoursFunction('[Вчора '),
            nextWeek: processHoursFunction('[У] dddd ['),
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return processHoursFunction('[Минулої] dddd [').call(this);
                    case 1:
                    case 2:
                    case 4:
                        return processHoursFunction('[Минулого] dddd [').call(this);
                }
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'за %s',
            past: '%s тому',
            s: 'декілька секунд',
            m: relativeTimeWithPlural,
            mm: relativeTimeWithPlural,
            h: 'годину',
            hh: relativeTimeWithPlural,
            d: 'день',
            dd: relativeTimeWithPlural,
            M: 'місяць',
            MM: relativeTimeWithPlural,
            y: 'рік',
            yy: relativeTimeWithPlural
        },
        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
        meridiemParse: /ночі|ранку|дня|вечора/,
        isPM: function (input) {
            return (/^(дня|вечора)$/.test(input)
            );
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночі';
            } else if (hour < 12) {
                return 'ранку';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечора';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                case 'w':
                case 'W':
                    return number + '-й';
                case 'D':
                    return number + '-го';
                default:
                    return number;
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return uk;
});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Urdu [ur]
//! author : Sawood Alam : https://github.com/ibnesayeed
//! author : Zack : https://github.com/ZackVision

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var months = ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'];
    var days = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];

    var ur = moment.defineLocale('ur', {
        months: months,
        monthsShort: months,
        weekdays: days,
        weekdaysShort: days,
        weekdaysMin: days,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd، D MMMM YYYY HH:mm'
        },
        meridiemParse: /صبح|شام/,
        isPM: function (input) {
            return 'شام' === input;
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'صبح';
            }
            return 'شام';
        },
        calendar: {
            sameDay: '[آج بوقت] LT',
            nextDay: '[کل بوقت] LT',
            nextWeek: 'dddd [بوقت] LT',
            lastDay: '[گذشتہ روز بوقت] LT',
            lastWeek: '[گذشتہ] dddd [بوقت] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s بعد',
            past: '%s قبل',
            s: 'چند سیکنڈ',
            m: 'ایک منٹ',
            mm: '%d منٹ',
            h: 'ایک گھنٹہ',
            hh: '%d گھنٹے',
            d: 'ایک دن',
            dd: '%d دن',
            M: 'ایک ماہ',
            MM: '%d ماہ',
            y: 'ایک سال',
            yy: '%d سال'
        },
        preparse: function (string) {
            return string.replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '،');
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ur;
});

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Uzbek Latin [uz-latn]
//! author : Rasulbek Mirzayev : github.com/Rasulbeeek

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var uzLatn = moment.defineLocale('uz-latn', {
        months: 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split('_'),
        monthsShort: 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
        weekdays: 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
        weekdaysShort: 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
        weekdaysMin: 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'D MMMM YYYY, dddd HH:mm'
        },
        calendar: {
            sameDay: '[Bugun soat] LT [da]',
            nextDay: '[Ertaga] LT [da]',
            nextWeek: 'dddd [kuni soat] LT [da]',
            lastDay: '[Kecha soat] LT [da]',
            lastWeek: '[O\'tgan] dddd [kuni soat] LT [da]',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'Yaqin %s ichida',
            past: 'Bir necha %s oldin',
            s: 'soniya',
            m: 'bir daqiqa',
            mm: '%d daqiqa',
            h: 'bir soat',
            hh: '%d soat',
            d: 'bir kun',
            dd: '%d kun',
            M: 'bir oy',
            MM: '%d oy',
            y: 'bir yil',
            yy: '%d yil'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return uzLatn;
});

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Uzbek [uz]
//! author : Sardor Muminov : https://github.com/muminoff

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var uz = moment.defineLocale('uz', {
        months: 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
        monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
        weekdays: 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
        weekdaysShort: 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
        weekdaysMin: 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'D MMMM YYYY, dddd HH:mm'
        },
        calendar: {
            sameDay: '[Бугун соат] LT [да]',
            nextDay: '[Эртага] LT [да]',
            nextWeek: 'dddd [куни соат] LT [да]',
            lastDay: '[Кеча соат] LT [да]',
            lastWeek: '[Утган] dddd [куни соат] LT [да]',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'Якин %s ичида',
            past: 'Бир неча %s олдин',
            s: 'фурсат',
            m: 'бир дакика',
            mm: '%d дакика',
            h: 'бир соат',
            hh: '%d соат',
            d: 'бир кун',
            dd: '%d кун',
            M: 'бир ой',
            MM: '%d ой',
            y: 'бир йил',
            yy: '%d йил'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return uz;
});

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Vietnamese [vi]
//! author : Bang Nguyen : https://github.com/bangnk

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var vi = moment.defineLocale('vi', {
        months: 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
        monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
        monthsParseExact: true,
        weekdays: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
        weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysParseExact: true,
        meridiemParse: /sa|ch/i,
        isPM: function (input) {
            return (/^ch$/i.test(input)
            );
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'sa' : 'SA';
            } else {
                return isLower ? 'ch' : 'CH';
            }
        },
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM [năm] YYYY',
            LLL: 'D MMMM [năm] YYYY HH:mm',
            LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
            l: 'DD/M/YYYY',
            ll: 'D MMM YYYY',
            lll: 'D MMM YYYY HH:mm',
            llll: 'ddd, D MMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Hôm nay lúc] LT',
            nextDay: '[Ngày mai lúc] LT',
            nextWeek: 'dddd [tuần tới lúc] LT',
            lastDay: '[Hôm qua lúc] LT',
            lastWeek: 'dddd [tuần rồi lúc] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s tới',
            past: '%s trước',
            s: 'vài giây',
            m: 'một phút',
            mm: '%d phút',
            h: 'một giờ',
            hh: '%d giờ',
            d: 'một ngày',
            dd: '%d ngày',
            M: 'một tháng',
            MM: '%d tháng',
            y: 'một năm',
            yy: '%d năm'
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: function (number) {
            return number;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return vi;
});

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Pseudo [x-pseudo]
//! author : Andrew Hood : https://github.com/andrewhood125

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var xPseudo = moment.defineLocale('x-pseudo', {
        months: 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
        monthsShort: 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
        monthsParseExact: true,
        weekdays: 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
        weekdaysShort: 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
        weekdaysMin: 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[T~ódá~ý át] LT',
            nextDay: '[T~ómó~rró~w át] LT',
            nextWeek: 'dddd [át] LT',
            lastDay: '[Ý~ést~érdá~ý át] LT',
            lastWeek: '[L~ást] dddd [át] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'í~ñ %s',
            past: '%s á~gó',
            s: 'á ~féw ~sécó~ñds',
            m: 'á ~míñ~úté',
            mm: '%d m~íñú~tés',
            h: 'á~ñ hó~úr',
            hh: '%d h~óúrs',
            d: 'á ~dáý',
            dd: '%d d~áýs',
            M: 'á ~móñ~th',
            MM: '%d m~óñt~hs',
            y: 'á ~ýéár',
            yy: '%d ý~éárs'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output = ~~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return number + output;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return xPseudo;
});

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Yoruba Nigeria [yo]
//! author : Atolagbe Abisoye : https://github.com/andela-batolagbe

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var yo = moment.defineLocale('yo', {
        months: 'Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀'.split('_'),
        monthsShort: 'Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀'.split('_'),
        weekdays: 'Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta'.split('_'),
        weekdaysShort: 'Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá'.split('_'),
        weekdaysMin: 'Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A'
        },
        calendar: {
            sameDay: '[Ònì ni] LT',
            nextDay: '[Ọ̀la ni] LT',
            nextWeek: 'dddd [Ọsẹ̀ tón\'bọ] [ni] LT',
            lastDay: '[Àna ni] LT',
            lastWeek: 'dddd [Ọsẹ̀ tólọ́] [ni] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'ní %s',
            past: '%s kọjá',
            s: 'ìsẹjú aayá die',
            m: 'ìsẹjú kan',
            mm: 'ìsẹjú %d',
            h: 'wákati kan',
            hh: 'wákati %d',
            d: 'ọjọ́ kan',
            dd: 'ọjọ́ %d',
            M: 'osù kan',
            MM: 'osù %d',
            y: 'ọdún kan',
            yy: 'ọdún %d'
        },
        dayOfMonthOrdinalParse: /ọjọ́\s\d{1,2}/,
        ordinal: 'ọjọ́ %d',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return yo;
});

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chinese (China) [zh-cn]
//! author : suupic : https://github.com/suupic
//! author : Zeno Zeng : https://github.com/zenozeng

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var zhCn = moment.defineLocale('zh-cn', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY年MMMD日',
            LL: 'YYYY年MMMD日',
            LLL: 'YYYY年MMMD日Ah点mm分',
            LLLL: 'YYYY年MMMD日ddddAh点mm分',
            l: 'YYYY年MMMD日',
            ll: 'YYYY年MMMD日',
            lll: 'YYYY年MMMD日 HH:mm',
            llll: 'YYYY年MMMD日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: '[下]ddddLT',
            lastDay: '[昨天]LT',
            lastWeek: '[上]ddddLT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s内',
            past: '%s前',
            s: '几秒',
            m: '1 分钟',
            mm: '%d 分钟',
            h: '1 小时',
            hh: '%d 小时',
            d: '1 天',
            dd: '%d 天',
            M: '1 个月',
            MM: '%d 个月',
            y: '1 年',
            yy: '%d 年'
        },
        week: {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return zhCn;
});

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chinese (Hong Kong) [zh-hk]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris
//! author : Konstantin : https://github.com/skfd

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var zhHk = moment.defineLocale('zh-hk', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY年MMMD日',
            LL: 'YYYY年MMMD日',
            LLL: 'YYYY年MMMD日 HH:mm',
            LLLL: 'YYYY年MMMD日dddd HH:mm',
            l: 'YYYY年MMMD日',
            ll: 'YYYY年MMMD日',
            lll: 'YYYY年MMMD日 HH:mm',
            llll: 'YYYY年MMMD日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '中午') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: '[下]ddddLT',
            lastDay: '[昨天]LT',
            lastWeek: '[上]ddddLT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '週';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s內',
            past: '%s前',
            s: '幾秒',
            m: '1 分鐘',
            mm: '%d 分鐘',
            h: '1 小時',
            hh: '%d 小時',
            d: '1 天',
            dd: '%d 天',
            M: '1 個月',
            MM: '%d 個月',
            y: '1 年',
            yy: '%d 年'
        }
    });

    return zhHk;
});

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chinese (Taiwan) [zh-tw]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris

;(function (global, factory) {
     true ? factory(__webpack_require__(0)) : typeof define === 'function' && define.amd ? define(['../moment'], factory) : factory(global.moment);
})(this, function (moment) {
    'use strict';

    var zhTw = moment.defineLocale('zh-tw', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY年MMMD日',
            LL: 'YYYY年MMMD日',
            LLL: 'YYYY年MMMD日 HH:mm',
            LLLL: 'YYYY年MMMD日dddd HH:mm',
            l: 'YYYY年MMMD日',
            ll: 'YYYY年MMMD日',
            lll: 'YYYY年MMMD日 HH:mm',
            llll: 'YYYY年MMMD日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '中午') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: '[下]ddddLT',
            lastDay: '[昨天]LT',
            lastWeek: '[上]ddddLT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '週';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s內',
            past: '%s前',
            s: '幾秒',
            m: '1 分鐘',
            mm: '%d 分鐘',
            h: '1 小時',
            hh: '%d 小時',
            d: '1 天',
            dd: '%d 天',
            M: '1 個月',
            MM: '%d 個月',
            y: '1 年',
            yy: '%d 年'
        }
    });

    return zhTw;
});

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(createjs) {let moment = __webpack_require__(0);
var stage = new createjs.Stage('main-canvas');
var shape = new createjs.Shape();
shape.graphics.beginFill('red').drawRect(0, 0, 120, 120);
stage.addChild(shape);
var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
stage.addChild(circle);

let data = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 15, 7: 19, 8: 17, 9: 14, 10: 13, 11: 18, 12: 15, 13: 18, 14: 17, 15: 17, 16: 17, 17: 11, 18: 19, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0 };
let dataMap = (key, index) => {
  let shipments = Object.values(data)[index];
  if (shipments == 0) {
    return;
  };
  let hour = +key;
  let hourLabel = moment(key, 'h').format('hh:mm a');

  return { 'hour': hour, 'hourLabel': hourLabel, 'shipments': shipments };
};
data = Object.keys(data).map(dataMap).filter(Boolean);
debugger;

var g = new createjs.Graphics();
g.setStrokeStyle(0.5);
g.beginStroke("#000000");
g.beginFill("green");
g.moveTo(0, 0).lineTo(20, 30);
let newSegment = x => g.lineTo(...x);
values.map(v => newSegment(v));
stage.addChild(new createjs.Shape(g));

let newCircle = x => {
  var circle = new createjs.Shape();
  circle.graphics.beginFill("Green").drawCircle(...x, 5);
  stage.addChild(circle);
};
values.map(v => newCircle(v));

stage.update();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function () {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function () {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 2,
	"./af.js": 2,
	"./ar": 9,
	"./ar-dz": 3,
	"./ar-dz.js": 3,
	"./ar-kw": 4,
	"./ar-kw.js": 4,
	"./ar-ly": 5,
	"./ar-ly.js": 5,
	"./ar-ma": 6,
	"./ar-ma.js": 6,
	"./ar-sa": 7,
	"./ar-sa.js": 7,
	"./ar-tn": 8,
	"./ar-tn.js": 8,
	"./ar.js": 9,
	"./az": 10,
	"./az.js": 10,
	"./be": 11,
	"./be.js": 11,
	"./bg": 12,
	"./bg.js": 12,
	"./bn": 13,
	"./bn.js": 13,
	"./bo": 14,
	"./bo.js": 14,
	"./br": 15,
	"./br.js": 15,
	"./bs": 16,
	"./bs.js": 16,
	"./ca": 17,
	"./ca.js": 17,
	"./cs": 18,
	"./cs.js": 18,
	"./cv": 19,
	"./cv.js": 19,
	"./cy": 20,
	"./cy.js": 20,
	"./da": 21,
	"./da.js": 21,
	"./de": 24,
	"./de-at": 22,
	"./de-at.js": 22,
	"./de-ch": 23,
	"./de-ch.js": 23,
	"./de.js": 24,
	"./dv": 25,
	"./dv.js": 25,
	"./el": 26,
	"./el.js": 26,
	"./en-au": 27,
	"./en-au.js": 27,
	"./en-ca": 28,
	"./en-ca.js": 28,
	"./en-gb": 29,
	"./en-gb.js": 29,
	"./en-ie": 30,
	"./en-ie.js": 30,
	"./en-nz": 31,
	"./en-nz.js": 31,
	"./eo": 32,
	"./eo.js": 32,
	"./es": 34,
	"./es-do": 33,
	"./es-do.js": 33,
	"./es.js": 34,
	"./et": 35,
	"./et.js": 35,
	"./eu": 36,
	"./eu.js": 36,
	"./fa": 37,
	"./fa.js": 37,
	"./fi": 38,
	"./fi.js": 38,
	"./fo": 39,
	"./fo.js": 39,
	"./fr": 42,
	"./fr-ca": 40,
	"./fr-ca.js": 40,
	"./fr-ch": 41,
	"./fr-ch.js": 41,
	"./fr.js": 42,
	"./fy": 43,
	"./fy.js": 43,
	"./gd": 44,
	"./gd.js": 44,
	"./gl": 45,
	"./gl.js": 45,
	"./gom-latn": 46,
	"./gom-latn.js": 46,
	"./he": 47,
	"./he.js": 47,
	"./hi": 48,
	"./hi.js": 48,
	"./hr": 49,
	"./hr.js": 49,
	"./hu": 50,
	"./hu.js": 50,
	"./hy-am": 51,
	"./hy-am.js": 51,
	"./id": 52,
	"./id.js": 52,
	"./is": 53,
	"./is.js": 53,
	"./it": 54,
	"./it.js": 54,
	"./ja": 55,
	"./ja.js": 55,
	"./jv": 56,
	"./jv.js": 56,
	"./ka": 57,
	"./ka.js": 57,
	"./kk": 58,
	"./kk.js": 58,
	"./km": 59,
	"./km.js": 59,
	"./kn": 60,
	"./kn.js": 60,
	"./ko": 61,
	"./ko.js": 61,
	"./ky": 62,
	"./ky.js": 62,
	"./lb": 63,
	"./lb.js": 63,
	"./lo": 64,
	"./lo.js": 64,
	"./lt": 65,
	"./lt.js": 65,
	"./lv": 66,
	"./lv.js": 66,
	"./me": 67,
	"./me.js": 67,
	"./mi": 68,
	"./mi.js": 68,
	"./mk": 69,
	"./mk.js": 69,
	"./ml": 70,
	"./ml.js": 70,
	"./mr": 71,
	"./mr.js": 71,
	"./ms": 73,
	"./ms-my": 72,
	"./ms-my.js": 72,
	"./ms.js": 73,
	"./my": 74,
	"./my.js": 74,
	"./nb": 75,
	"./nb.js": 75,
	"./ne": 76,
	"./ne.js": 76,
	"./nl": 78,
	"./nl-be": 77,
	"./nl-be.js": 77,
	"./nl.js": 78,
	"./nn": 79,
	"./nn.js": 79,
	"./pa-in": 80,
	"./pa-in.js": 80,
	"./pl": 81,
	"./pl.js": 81,
	"./pt": 83,
	"./pt-br": 82,
	"./pt-br.js": 82,
	"./pt.js": 83,
	"./ro": 84,
	"./ro.js": 84,
	"./ru": 85,
	"./ru.js": 85,
	"./sd": 86,
	"./sd.js": 86,
	"./se": 87,
	"./se.js": 87,
	"./si": 88,
	"./si.js": 88,
	"./sk": 89,
	"./sk.js": 89,
	"./sl": 90,
	"./sl.js": 90,
	"./sq": 91,
	"./sq.js": 91,
	"./sr": 93,
	"./sr-cyrl": 92,
	"./sr-cyrl.js": 92,
	"./sr.js": 93,
	"./ss": 94,
	"./ss.js": 94,
	"./sv": 95,
	"./sv.js": 95,
	"./sw": 96,
	"./sw.js": 96,
	"./ta": 97,
	"./ta.js": 97,
	"./te": 98,
	"./te.js": 98,
	"./tet": 99,
	"./tet.js": 99,
	"./th": 100,
	"./th.js": 100,
	"./tl-ph": 101,
	"./tl-ph.js": 101,
	"./tlh": 102,
	"./tlh.js": 102,
	"./tr": 103,
	"./tr.js": 103,
	"./tzl": 104,
	"./tzl.js": 104,
	"./tzm": 106,
	"./tzm-latn": 105,
	"./tzm-latn.js": 105,
	"./tzm.js": 106,
	"./uk": 107,
	"./uk.js": 107,
	"./ur": 108,
	"./ur.js": 108,
	"./uz": 110,
	"./uz-latn": 109,
	"./uz-latn.js": 109,
	"./uz.js": 110,
	"./vi": 111,
	"./vi.js": 111,
	"./x-pseudo": 112,
	"./x-pseudo.js": 112,
	"./yo": 113,
	"./yo.js": 113,
	"./zh-cn": 114,
	"./zh-cn.js": 114,
	"./zh-hk": 115,
	"./zh-hk.js": 115,
	"./zh-tw": 116,
	"./zh-tw.js": 116
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 119;

/***/ })
/******/ ]);