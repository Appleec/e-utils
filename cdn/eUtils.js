var eUtils = (function (exports) {
    'use strict';

    function isNil(value) {
      return value == null;
    }

    function isNull(value) {
      return value === null;
    }

    function isObject(value) {
      const type = typeof value;
      return value != null && (type === "object" || type === "function");
    }

    function isObjectLike(value) {
      return typeof value === "object" && value !== null;
    }

    const toString$1 = Object.prototype.toString;
    function getTag(value) {
      if (value == null) {
        return value === void 0 ? "[object Undefined]" : "[object Null]";
      }
      return toString$1.call(value);
    }

    function isSymbol(value) {
      const type = typeof value;
      return type === "symbol" || type === "object" && value != null && getTag(value) === "[object Symbol]";
    }

    function isBoolean(value) {
      return value === true || value === false || isObjectLike(value) && getTag(value) === "[object Boolean]";
    }

    function isUndefined(value) {
      return value === void 0;
    }

    function isString(value) {
      const type = typeof value;
      return type === "string" || type === "object" && value != null && !Array.isArray(value) && getTag(value) === "[object String]";
    }

    function isNumber(value) {
      return typeof value === "number" || isObjectLike(value) && getTag(value) === "[object Number]";
    }

    function isFunction(value) {
      return typeof value === "function";
    }

    function isArray(value) {
      return isObjectLike(value) && getTag(value) === "[object Array]";
    }

    const MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value === "number" && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
    }

    function isArrayLike(value) {
      return value != null && !isFunction(value) && isLength(value.length);
    }

    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    function isDate(value) {
      return isObjectLike(value) && getTag(value) === "[object Date]" && value !== "Invalid Date";
    }

    function isArguments(value) {
      return isObjectLike(value) && getTag(value) === "[object Arguments]";
    }

    function isPlainObject(value) {
      if (!isObjectLike(value) || getTag(value) !== "[object Object]") {
        return false;
      }
      if (Object.getPrototypeOf(value) === null) {
        return true;
      }
      let proto = value;
      while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
      }
      return Object.getPrototypeOf(value) === proto;
    }

    function isElement(value) {
      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
    }

    const freeGlobal = typeof global === "object" && global !== null && global.Object === Object && global;

    const freeGlobalThis = typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object && globalThis;
    const freeSelf = typeof self === "object" && self !== null && self.Object === Object && self;
    const root = freeGlobalThis || freeGlobal || freeSelf || Function("return this")();

    const nativeIsBuffer = root?.Buffer?.isBuffer;
    const isBuffer = typeof nativeIsBuffer === "function" ? nativeIsBuffer : () => false;

    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }

    const INFINITY$1 = 1 / 0;
    function toString(value) {
      if (value == null) {
        return "";
      }
      if (typeof value === "string") {
        return value;
      }
      if (Array.isArray(value)) {
        return `${value.map((other) => other == null ? other : toString(other))}`;
      }
      if (isSymbol(value)) {
        return value.toString();
      }
      const result = `${value}`;
      return result === "0" && 1 / value === -INFINITY$1 ? "-0" : result;
    }

    function toPlainObject(value) {
      value = Object(value);
      const result = {};
      for (const key in value) {
        result[key] = value[key];
      }
      return result;
    }

    const NAN = 0 / 0;
    const reTrim = /^\s+|\s+$/g;
    const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    const reIsBinary = /^0b[01]+$/i;
    const reIsOctal = /^0o[0-7]+$/i;
    const freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value === "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        const other = typeof value.valueOf === "function" ? value.valueOf() : value;
        value = isObject(other) ? `${other}` : other;
      }
      if (typeof value !== "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      const isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }

    function isNumberLike(value) {
      return isNumber(value) && !isNaN(value);
    }

    const INFINITY = 1 / 0;
    const MAX_INTEGER = 17976931348623157e292;
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        const sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    function toInteger(value) {
      const result = toFinite(value);
      const remainder = result % 1;
      return remainder ? result - remainder : result;
    }

    function isEmail(value) {
      return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
    }

    function isURL(value) {
      return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(value);
    }

    function isFile(value) {
      return isObjectLike(value) && getTag(value) === "[object File]";
    }

    function isFinite(value) {
      return typeof value == "number" && root.isFinite(value);
    }

    function isBlob(value) {
      return isObjectLike(value) && getTag(value) === "[object Blob]";
    }

    function isPromise(value) {
      return value && typeof value.then === "function";
    }

    function slice(array, start, end) {
      let length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      start = start == null ? 0 : start;
      end = end === void 0 ? length : end;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      let index = -1;
      const result = new Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    function castSlice(array, start, end) {
      const { length } = array;
      end = end === void 0 ? length : end;
      return !start && end >= length ? array : slice(array, start, end);
    }

    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      const { length } = array;
      let index = fromIndex + (-1);
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    function baseIsNaN(value) {
      return value !== value;
    }

    function strictIndexOf(array, value, fromIndex) {
      let index = fromIndex - 1;
      const { length } = array;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }

    function charsEndIndex(strSymbols, chrSymbols) {
      let index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }

    function charsStartIndex(strSymbols, chrSymbols) {
      let index = -1;
      const length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }

    function asciiToArray(string) {
      return string.split("");
    }

    const rsAstralRange$2 = "\\ud800-\\udfff";
    const rsComboMarksRange$2 = "\\u0300-\\u036f";
    const reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f";
    const rsComboSymbolsRange$2 = "\\u20d0-\\u20ff";
    const rsComboMarksExtendedRange$2 = "\\u1ab0-\\u1aff";
    const rsComboMarksSupplementRange$2 = "\\u1dc0-\\u1dff";
    const rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2 + rsComboMarksExtendedRange$2 + rsComboMarksSupplementRange$2;
    const rsVarRange$2 = "\\ufe0e\\ufe0f";
    const rsZWJ$2 = "\\u200d";
    const reHasUnicode = RegExp(`[${rsZWJ$2 + rsAstralRange$2 + rsComboRange$2 + rsVarRange$2}]`);
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }

    const rsAstralRange$1 = "\\ud800-\\udfff";
    const rsComboMarksRange$1 = "\\u0300-\\u036f";
    const reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f";
    const rsComboSymbolsRange$1 = "\\u20d0-\\u20ff";
    const rsComboMarksExtendedRange$1 = "\\u1ab0-\\u1aff";
    const rsComboMarksSupplementRange$1 = "\\u1dc0-\\u1dff";
    const rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1 + rsComboMarksExtendedRange$1 + rsComboMarksSupplementRange$1;
    const rsVarRange$1 = "\\ufe0e\\ufe0f";
    const rsAstral = `[${rsAstralRange$1}]`;
    const rsCombo$1 = `[${rsComboRange$1}]`;
    const rsFitz$1 = "\\ud83c[\\udffb-\\udfff]";
    const rsModifier$1 = `(?:${rsCombo$1}|${rsFitz$1})`;
    const rsNonAstral$1 = `[^${rsAstralRange$1}]`;
    const rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    const rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    const rsZWJ$1 = "\\u200d";
    const reOptMod$1 = `${rsModifier$1}?`;
    const rsOptVar$1 = `[${rsVarRange$1}]?`;
    const rsOptJoin$1 = `(?:${rsZWJ$1}(?:${[rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|")})${rsOptVar$1 + reOptMod$1})*`;
    const rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1;
    const rsNonAstralCombo = `${rsNonAstral$1}${rsCombo$1}?`;
    const rsSymbol = `(?:${[rsNonAstralCombo, rsCombo$1, rsRegional$1, rsSurrPair$1, rsAstral].join("|")})`;
    const reUnicode = RegExp(`${rsFitz$1}(?=${rsFitz$1})|${rsSymbol + rsSeq$1}`, "g");
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }

    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }

    function trim(value, chars) {
      if (value && chars === void 0) {
        return value.trim();
      }
      if (!value || !chars) {
        return value || "";
      }
      const strSymbols = stringToArray(value);
      const chrSymbols = stringToArray(chars);
      const start = charsStartIndex(strSymbols, chrSymbols);
      const end = charsEndIndex(strSymbols, chrSymbols) + 1;
      return castSlice(strSymbols, start, end).join("");
    }

    function toUpper(value = "") {
      return toString(value).toUpperCase();
    }

    function createCaseFirst(methodName) {
      return (string) => {
        if (!string) {
          return "";
        }
        const strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
        const chr = strSymbols ? strSymbols[0] : string[0];
        const trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
        return chr[methodName]() + trailing;
      };
    }

    const toUpperFirst = createCaseFirst("toUpperCase");

    function toLower(value = "") {
      return toString(value).toLowerCase();
    }

    const toLowerFirst = createCaseFirst("toLowerCase");

    const rsAstralRange = "\\ud800-\\udfff";
    const rsComboMarksRange = "\\u0300-\\u036f";
    const reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    const rsComboSymbolsRange = "\\u20d0-\\u20ff";
    const rsComboMarksExtendedRange = "\\u1ab0-\\u1aff";
    const rsComboMarksSupplementRange = "\\u1dc0-\\u1dff";
    const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
    const rsDingbatRange = "\\u2700-\\u27bf";
    const rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
    const rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
    const rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
    const rsPunctuationRange = "\\u2000-\\u206f";
    const rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
    const rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
    const rsVarRange = "\\ufe0e\\ufe0f";
    const rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    const rsApos = "['\u2019]";
    const rsBreak = `[${rsBreakRange}]`;
    const rsCombo = `[${rsComboRange}]`;
    const rsDigit = "\\d";
    const rsDingbat = `[${rsDingbatRange}]`;
    const rsLower = `[${rsLowerRange}]`;
    const rsMisc = `[^${rsAstralRange}${rsBreakRange + rsDigit + rsDingbatRange + rsLowerRange + rsUpperRange}]`;
    const rsFitz = "\\ud83c[\\udffb-\\udfff]";
    const rsModifier = `(?:${rsCombo}|${rsFitz})`;
    const rsNonAstral = `[^${rsAstralRange}]`;
    const rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    const rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    const rsUpper = `[${rsUpperRange}]`;
    const rsZWJ = "\\u200d";
    const rsMiscLower = `(?:${rsLower}|${rsMisc})`;
    const rsMiscUpper = `(?:${rsUpper}|${rsMisc})`;
    const rsOptContrLower = `(?:${rsApos}(?:d|ll|m|re|s|t|ve))?`;
    const rsOptContrUpper = `(?:${rsApos}(?:D|LL|M|RE|S|T|VE))?`;
    const reOptMod = `${rsModifier}?`;
    const rsOptVar = `[${rsVarRange}]?`;
    const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join("|")})${rsOptVar + reOptMod})*`;
    const rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])";
    const rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])";
    const rsSeq = rsOptVar + reOptMod + rsOptJoin;
    const rsEmoji = `(?:${[rsDingbat, rsRegional, rsSurrPair].join("|")})${rsSeq}`;
    const reUnicodeWords = RegExp([
      `${rsUpper}?${rsLower}+${rsOptContrLower}(?=${[rsBreak, rsUpper, "$"].join("|")})`,
      `${rsMiscUpper}+${rsOptContrUpper}(?=${[rsBreak, rsUpper + rsMiscLower, "$"].join("|")})`,
      `${rsUpper}?${rsMiscLower}+${rsOptContrLower}`,
      `${rsUpper}+${rsOptContrUpper}`,
      rsOrdUpper,
      rsOrdLower,
      `${rsDigit}+`,
      rsEmoji
    ].join("|"), "g");
    function unicodeWords(string) {
      return string.match(reUnicodeWords);
    }

    const hasUnicodeWord = RegExp.prototype.test.bind(
      /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
    );
    const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    function asciiWords(string) {
      return string.match(reAsciiWord);
    }
    function words(string = "", pattern) {
      {
        const result = hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        return result || [];
      }
    }

    const kebabCase = (string = "") => words(toString(string).replace(/['\u2019]/g, "")).reduce(
      (result, word, index) => result + (index ? "-" : "") + word.toLowerCase(),
      ""
    );

    const camelCase = (string) => words(toString(string).replace(/['\u2019]/g, "")).reduce((result, word, index) => {
      word = word.toLowerCase();
      return result + (index ? toUpperFirst(word) : word);
    }, "");

    const reTrimStart = /^\s+/;
    const nativeParseInt = root.parseInt;
    function parseInt$1(string, radix = 10) {
      if (radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      return nativeParseInt(`${string}`.replace(reTrimStart, ""), radix || 0);
    }

    function pascalCase(value) {
      let str = camelCase(value);
      return toUpperFirst(str);
    }

    function timestamp() {
      return +Date.now();
    }

    function parseTime(time, format) {
      if (arguments.length === 0) {
        return null;
      }
      let cFormat = format || "YYYY-MM-DD hh:mm:ss";
      let date;
      if (typeof time === "object") {
        date = time;
      } else {
        if (typeof time === "string" && /^[0-9]+$/.test(time)) {
          time = parseInt(time);
        }
        if (typeof time === "number" && time.toString().length === 10) {
          time = time * 1e3;
        }
        date = new Date(time);
      }
      const oFormat = {
        Y: date.getFullYear(),
        // year
        M: date.getMonth() + 1,
        // month
        D: date.getDate(),
        // day
        h: date.getHours(),
        // hours
        m: date.getMinutes(),
        // minute
        s: date.getSeconds(),
        // second
        a: date.getDay(),
        // week
        q: Math.floor((date.getMonth() + 3) / 3),
        //
        S: date.getMilliseconds()
        // millisecond
      };
      return cFormat.replace(/(Y|M|D|h|m|s|a|q|S)+/g, (result, key) => {
        let value = oFormat[key];
        if (key === "a") {
          return ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"][value];
        }
        if (result.length > 0 && value < 10) {
          value = "0" + value;
        }
        return value || 0;
      });
    }

    const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|./g;
    function cleanEscapedString(input) {
      const escapedStringRegExp = /^'([^]*?)'?$/;
      const doubleQuoteRegExp = /''/g;
      const matched = input.match(escapedStringRegExp);
      if (!matched) {
        return input;
      }
      return matched[1].replace(doubleQuoteRegExp, "'");
    }
    function formatTime(value, format) {
      let cFormat = format || "YYYY-MM-DD hh:mm:ss";
      let date;
      if (isObject(value)) {
        date = value;
      } else {
        if (isString(value) && /^[0-9]+$/.test(value)) value = parseInt(value);
        if (isNumber(value) && value.toString().length === 10) value = +value * 1e3;
        date = new Date(value);
      }
      const oFormat = {
        Y: date.getFullYear(),
        // year
        M: date.getMonth() + 1,
        // month
        D: date.getDate(),
        // day
        h: date.getHours(),
        // hours
        m: date.getMinutes(),
        // minute
        s: date.getSeconds(),
        // second
        a: date.getDay(),
        // week
        q: Math.floor((date.getMonth() + 3) / 3),
        //
        S: date.getMilliseconds()
        // millisecond
      };
      return cFormat.match(formattingTokensRegExp).map((substring) => {
        if (substring === "''") {
          return { isToken: false, value: "'" };
        }
        const firstCharacter = substring[0];
        if (firstCharacter === "'") {
          return { isToken: false, value: cleanEscapedString(substring) };
        }
        if (Object.keys(oFormat).includes(firstCharacter)) {
          return { isToken: true, value: substring };
        }
        return { isToken: false, value: substring };
      }).map((part) => {
        if (!part.isToken) return part.value;
        const substring = part.value;
        const firstCharacter = substring[0];
        const value2 = oFormat[firstCharacter];
        if (firstCharacter === "a") {
          return ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"][value2];
        }
        return value2.toString().padStart(2, "0");
      }).join("");
    }

    function currentTime(format) {
      const date = /* @__PURE__ */ new Date();
      return format ? formatTime(date, format) : formatTime(date, "YYYY-MM-DD hh:mm:ss");
    }

    function toDate(value) {
      if (isDate(value)) return value;
      if (!isNaN(+value)) return /* @__PURE__ */ new Date(+value);
      value = value.toString().replace(/-/g, "/");
      return new Date(value);
    }

    function formatTimeToHm(date, earlier) {
      if (isString(date)) {
        try {
          date = toDate(date);
        } catch (e) {
          return 0;
        }
      }
      if (isDate(date)) {
        if (!earlier || !isNumber(earlier)) {
          earlier = 0;
        }
        return date.getHours() * 100 + (date.getMinutes() - earlier);
      } else {
        return 0;
      }
    }

    function startOfDay(date) {
      const d = toDate(date);
      d.setHours(0, 0, 0, 0);
      return d;
    }
    function isSameDay(dateLeft, dateRight) {
      const dateLeftStartOfDay = startOfDay(dateLeft);
      const dateRightStartOfDay = startOfDay(dateRight);
      return +dateLeftStartOfDay === +dateRightStartOfDay;
    }

    function startOfWeek(date, options) {
      const weekStartsOn = options?.weekStartsOn ?? 0;
      const _date = toDate(date);
      const day = _date.getDay();
      const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
      _date.setDate(_date.getDate() - diff);
      _date.setHours(0, 0, 0, 0);
      return _date;
    }
    function isSameWeek(dateLeft, dateRight, options) {
      const dateLeftStartOfWeek = startOfWeek(dateLeft, options);
      const dateRightStartOfWeek = startOfWeek(dateRight, options);
      return +dateLeftStartOfWeek === +dateRightStartOfWeek;
    }

    function isSameMonth(dateLeft, dateRight) {
      const _dateLeft = toDate(dateLeft);
      const _dateRight = toDate(dateRight);
      return _dateLeft.getFullYear() === _dateRight.getFullYear() && _dateLeft.getMonth() === _dateRight.getMonth();
    }

    function formatTimeToLast(time, option) {
      if (("" + time).length === 10) {
        time = parseInt(time) * 1e3;
      } else {
        time = +time;
      }
      const d = new Date(time);
      const now = Date.now();
      const diff = (now - +d) / 1e3;
      if (diff < 30) {
        return "\u521A\u521A";
      } else if (diff < 3600) {
        return Math.ceil(diff / 60) + "\u5206\u949F\u524D";
      } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + "\u5C0F\u65F6\u524D";
      } else if (diff < 3600 * 24 * 2) {
        return "1\u5929\u524D";
      }
      if (option) {
        return formatTime(time, option);
      } else {
        return d.getMonth() + 1 + "\u6708" + d.getDate() + "\u65E5" + d.getHours() + "\u65F6" + d.getMinutes() + "\u5206";
      }
    }

    function hasClass(element, className) {
      return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }

    function downloadFile(data, filename, mime, bom) {
      var blobData = typeof bom !== "undefined" ? [bom, data] : [data];
      var blob = new Blob(blobData, { type: mime || "application/octet-stream" });
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        var URL = window.webkitURL || window.URL;
        var blobURL = URL.createObjectURL(blob);
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
          tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        setTimeout(function() {
          document.body.removeChild(tempLink);
          URL.revokeObjectURL(blobURL);
        }, 100);
      }
    }

    const IN_BROWSER = typeof window !== "undefined";
    const ieVersion$1 = IN_BROWSER && document.documentMode ? Number(document.documentMode) : 0;
    function setStyle(el, styleName, value) {
      if (!el || !styleName) return;
      if (typeof styleName === "object") {
        for (let prop in styleName) {
          if (styleName.hasOwnProperty(prop)) {
            setStyle(el, prop, styleName[prop]);
          }
        }
      } else {
        styleName = camelCase(styleName);
        if (styleName === "opacity" && ieVersion$1 < 9) {
          el.style.filter = isNaN(value) ? "" : "alpha(opacity=" + value * 100 + ")";
        } else {
          el.style[styleName] = value;
        }
      }
    }

    const ieVersion = typeof document !== "undefined" && document.documentMode ? Number(document.documentMode) : 0;
    const getStyle = ieVersion < 9 ? function(el, styleName) {
      if (!el || !styleName) return null;
      styleName = camelCase(styleName);
      if (styleName === "float") styleName = "styleFloat";
      try {
        switch (styleName) {
          case "opacity":
            try {
              return el.filter.item("alpha").opacity / 100;
            } catch (e) {
              return 1;
            }
          default:
            return el.style[styleName] || el.currentStyle ? el.currentStyle[styleName] : null;
        }
      } catch (e) {
        return el.style[styleName];
      }
    } : function(el, styleName) {
      if (!el || !styleName) return null;
      styleName = camelCase(styleName);
      if (styleName === "float") styleName = "cssFloat";
      try {
        const computed = document.defaultView.getComputedStyle(el, "");
        return el.style[styleName] || computed ? computed[styleName] : null;
      } catch (e) {
        return el.style[styleName];
      }
    };

    function addClass(element, className) {
      if (!hasClass(element, className)) {
        element.className += " " + className;
      }
    }

    function removeClass(el, className) {
      if (hasClass(el, className)) {
        const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        el.className = el.className.replace(reg, " ");
      }
    }

    function toggleClass(ele, className) {
      if (!ele || !className) {
        return;
      }
      let classString = ele.className;
      const nameIndex = classString.indexOf(className);
      if (nameIndex === -1) {
        classString += "" + className;
      } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
      }
      ele.className = classString;
    }

    function stopDefault(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }

    function stopBubble(e) {
      e = e || window.event;
      e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }

    function isScroll(el, vertical) {
      const determinedDirection = vertical !== null && vertical !== void 0;
      const overflow = determinedDirection ? vertical ? getStyle(el, "overflow-y") : getStyle(el, "overflow-x") : getStyle(el, "overflow");
      return overflow.match(/(scroll|auto|overlay)/);
    }

    function getScrollContainer(el, vertical) {
      let parent = el;
      while (parent) {
        if ([window, document, document.documentElement].includes(parent)) {
          return window;
        }
        if (isScroll(parent, vertical)) {
          return parent;
        }
        parent = parent.parentNode;
      }
      return parent;
    }

    function smoothScrollTo(element, target, duration) {
      target = Math.round(target);
      duration = Math.round(duration);
      if (duration < 0) {
        return Promise.reject("bad duration");
      }
      if (duration === 0) {
        element.scrollTop = target;
        return Promise.resolve();
      }
      const start_time = Date.now();
      const end_time = start_time + duration;
      const start_top = element.scrollTop;
      const distance = target - start_top;
      const smooth_step = function(start, end, point) {
        if (point <= start) {
          return 0;
        }
        if (point >= end) {
          return 1;
        }
        const x = (point - start) / (end - start);
        return x * x * (3 - 2 * x);
      };
      return new Promise(function(resolve, reject) {
        let previous_top = element.scrollTop;
        const scroll_frame = function() {
          if (element.scrollTop !== previous_top) {
            reject("interrupted");
            return;
          }
          const now = Date.now();
          const point = smooth_step(start_time, end_time, now);
          const frameTop = Math.round(start_top + distance * point);
          element.scrollTop = frameTop;
          if (now >= end_time) {
            resolve(void 0);
            return;
          }
          if (element.scrollTop === previous_top && element.scrollTop !== frameTop) {
            resolve();
            return;
          }
          previous_top = element.scrollTop;
          setTimeout(scroll_frame, 0);
        };
        setTimeout(scroll_frame, 0);
      });
    }

    function addCommas(value) {
      if (value === "-") {
        return value;
      }
      let valStr = value.toString();
      let flag = false;
      if (valStr.slice(-1) === "%") {
        flag = true;
        valStr = valStr.slice(0, -1);
      }
      const aIntNum = valStr.split(".");
      aIntNum[0] = aIntNum[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      if (aIntNum[1] && aIntNum[1].length >= 5) {
        aIntNum[1] = aIntNum[1].replace(/(\d{3})/g, "$1 ");
      }
      return flag ? `${aIntNum.join(".")}%` : aIntNum.join(".");
    }

    function convertToUnit(value, unit = "px") {
      if (isNil(value) || value === "") return void 0;
      if (isNaN(+value)) return toString(value);
      return `${toNumber(value)}${unit}`;
    }

    const keyCodes = Object.freeze({
      enter: 13,
      tab: 9,
      delete: 46,
      esc: 27,
      space: 32,
      up: 38,
      down: 40,
      left: 37,
      right: 39,
      end: 35,
      home: 36,
      del: 46,
      backspace: 8,
      insert: 45,
      pageup: 33,
      pagedown: 34
    });

    function isMobile() {
      return !!navigator.userAgent.match(/mobile/i);
    }

    function isJSONParse(value) {
      try {
        const o = JSON.parse(value);
        return !!(typeof o === "object" && o);
      } catch (e) {
        return false;
      }
    }

    function convertFileSizeToUnit(bytes, binary = false) {
      const base = binary ? 1024 : 1e3;
      if (bytes < base) {
        return `${bytes} B`;
      }
      const prefix = binary ? ["Ki", "Mi", "Gi"] : ["k", "M", "G"];
      let unit = -1;
      while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
        bytes /= base;
        ++unit;
      }
      return `${bytes.toFixed(1)} ${prefix[unit]}B`;
    }

    function base64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || "";
      sliceSize = sliceSize || 512;
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, {
        type: contentType
      });
      return blob;
    }

    function byteLength(value) {
      if (!isString(value)) return value;
      let s = value.length;
      for (let i = value.length - 1; i >= 0; i--) {
        const code = value.charCodeAt(i);
        if (code > 127 && code <= 2047) s++;
        else if (code > 2047 && code <= 65535) s += 2;
        if (code >= 56320 && code <= 57343) i--;
      }
      return s;
    }

    function debounce(fn, wait, immediate) {
      let timer;
      return function() {
        let context = this, args = arguments;
        if (!timer && immediate) {
          timer = -1;
          return fn.apply(context, args);
        }
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(context, args);
        }, wait);
      };
    }

    function throttle(fn, wait, immediate) {
      let lastTime = 0;
      return function() {
        let timestamp = Date.now();
        if (!lastTime && !immediate) {
          lastTime = timestamp;
        }
        if (timestamp - lastTime >= wait) {
          lastTime = timestamp;
          return fn.apply(this, arguments);
        }
      };
    }

    function sleep(wait, callback) {
      return new Promise((resolve) => setTimeout(async () => {
        await callback?.();
        resolve();
      }, wait));
    }

    function isCreditCard(str) {
      const provinces = "11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91";
      let codeLen = str.length;
      if (codeLen !== 18 && codeLen !== 15) {
        return false;
      }
      if (provinces.indexOf(str.substring(0, 2)) === -1) {
        return false;
      }
      let birthCode = codeLen === 18 ? str.substring(6, 14) : "19" + str.substring(6, 12);
      let year = birthCode.substring(0, 4) - 0;
      let month = birthCode.substring(4, 6) - 1;
      let day = birthCode.substring(6, 8) - 0;
      let brithday = new Date(year, month, day);
      if (brithday.getFullYear() !== year || brithday.getMonth() !== month || brithday.getDate() !== day) {
        return false;
      }
      if (codeLen === 18) {
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
        let code = str.substring(17);
        let sum = 0;
        for (let i = 0; i < 17; i++) {
          sum += str[i] * factor[i];
        }
        if (parity[sum % 11] == code.toUpperCase()) {
          return true;
        }
        return false;
      }
      return true;
    }

    exports.addClass = addClass;
    exports.addCommas = addCommas;
    exports.base64toBlob = base64toBlob;
    exports.byteLength = byteLength;
    exports.camelCase = camelCase;
    exports.convertFileSizeToUnit = convertFileSizeToUnit;
    exports.convertToUnit = convertToUnit;
    exports.currentTime = currentTime;
    exports.debounce = debounce;
    exports.downloadFile = downloadFile;
    exports.eq = eq;
    exports.formatTime = formatTime;
    exports.formatTimeToHm = formatTimeToHm;
    exports.formatTimeToLast = formatTimeToLast;
    exports.getScrollContainer = getScrollContainer;
    exports.getStyle = getStyle;
    exports.hasClass = hasClass;
    exports.isArguments = isArguments;
    exports.isArray = isArray;
    exports.isArrayLike = isArrayLike;
    exports.isArrayLikeObject = isArrayLikeObject;
    exports.isBlob = isBlob;
    exports.isBoolean = isBoolean;
    exports.isBuffer = isBuffer;
    exports.isCreditCard = isCreditCard;
    exports.isDate = isDate;
    exports.isElement = isElement;
    exports.isEmail = isEmail;
    exports.isFile = isFile;
    exports.isFinite = isFinite;
    exports.isFunction = isFunction;
    exports.isJSONParse = isJSONParse;
    exports.isMobile = isMobile;
    exports.isNil = isNil;
    exports.isNull = isNull;
    exports.isNumber = isNumber;
    exports.isNumberLike = isNumberLike;
    exports.isObject = isObject;
    exports.isObjectLike = isObjectLike;
    exports.isPlainObject = isPlainObject;
    exports.isPromise = isPromise;
    exports.isSameDay = isSameDay;
    exports.isSameMonth = isSameMonth;
    exports.isSameWeek = isSameWeek;
    exports.isScroll = isScroll;
    exports.isString = isString;
    exports.isSymbol = isSymbol;
    exports.isURL = isURL;
    exports.isUndefined = isUndefined;
    exports.kebabCase = kebabCase;
    exports.keyCodes = keyCodes;
    exports.parseInt = parseInt$1;
    exports.parseTime = parseTime;
    exports.pascalCase = pascalCase;
    exports.removeClass = removeClass;
    exports.setStyle = setStyle;
    exports.sleep = sleep;
    exports.smoothScrollTo = smoothScrollTo;
    exports.stopBubble = stopBubble;
    exports.stopDefault = stopDefault;
    exports.throttle = throttle;
    exports.timestamp = timestamp;
    exports.toFinite = toFinite;
    exports.toInteger = toInteger;
    exports.toLower = toLower;
    exports.toLowerFirst = toLowerFirst;
    exports.toNumber = toNumber;
    exports.toPlainObject = toPlainObject;
    exports.toString = toString;
    exports.toUpper = toUpper;
    exports.toUpperFirst = toUpperFirst;
    exports.toggleClass = toggleClass;
    exports.trim = trim;

    return exports;

})({});
