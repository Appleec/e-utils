import getTag from './internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @since 0.1.3
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments }())
 * // => true
 *
 * _.isArguments([1, 2, 3])
 * // => false
 */
function isArguments(value) {
    return isObjectLike(value) && getTag(value) === '[object Arguments]';
}

export default isArguments;
