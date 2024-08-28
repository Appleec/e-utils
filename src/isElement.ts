import isObjectLike from './isObjectLike';
import isPlainObject from './isPlainObject';

/**
 * Checks if `value` is likely a DOM element.
 *
 * @since 0.1.3
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * isElement(document.body)
 * // => true
 *
 * isElement('<body>')
 * // => false
 */
function isElement(value: HTMLElement): boolean {
    return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

export default isElement;
