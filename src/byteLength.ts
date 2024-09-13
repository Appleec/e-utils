import isString from "./isString";

/**
 * Calculate byte length
 *
 * @summary byteLength.
 * @static
 * @since 0.2.0
 * @category Util
 * @param {string} value The value to check.
 * @returns {number} Returns the byte length of an utf8 string.
 * @example
 *
 * byteLength('abcd');
 * // => 4
 *
 * byteLength('你是谁');
 * // => 9
 *
 *
 */
function byteLength(value) {
  // returns the byte length of an utf8 string
  if (!isString(value)) return value;
  let s = value.length;
  for (let i = value.length - 1; i >= 0; i--) {
    const code = value.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--;
  }
  return s;
}

// console.log('=>', byteLength(45));
// console.log('=>', byteLength(null));

export default byteLength;
