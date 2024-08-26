/**
 * @author appleex
 * @date 2024-08-26 21:07
 */

/**
 * toUpperFirst
 *
 * @summary toUpperFirst
 * @static
 * @since 0.1.0
 * @category String
 * @param {string} str The value to string.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toUpperFirst('abc');
 * // => Abc
 *
 */

// function toUpperFirst(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }

function toUpperFirst(str: string): string {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

export default toUpperFirst;
