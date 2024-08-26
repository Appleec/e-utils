import getTag from './internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @since 0.1.1
 * @category Lang
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 */
function isArray(value) {
    return isObjectLike(value) && getTag(value) === '[object Array]';
}

export default isArray;
