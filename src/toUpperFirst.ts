/**
 * @author appleex
 * @date 2024-08-26 21:07
 */
import createCaseFirst from './internal/createCaseFirst';
/**
 * Converts the first character of `string` to upper case.
 *
 * @summary toUpperFirst
 * @static
 * @since 0.1.2
 * @category String
 * @param {string} str The value to string.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toUpperFirst('fred')
 * // => 'Fred'
 *
 * _.toUpperFirst('FRED')
 * // => 'FRED'
 *
 */

// function toUpperFirst(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }

// function toUpperFirst(str: string): string {
//     return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
// }

const toUpperFirst = createCaseFirst('toUpperCase');

export default toUpperFirst;
