import getTag from './internal/getTag';
import isObjectLike from './isObjectLike';

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @since 0.1.3
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * _.isPlainObject(new Foo)
 * // => false
 *
 * _.isPlainObject([1, 2, 3])
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 })
 * // => true
 *
 * _.isPlainObject(Object.create(null))
 * // => true
 */
function isPlainObject(value) {
    if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
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

export default isPlainObject;
