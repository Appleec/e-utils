/**
 * Checks if `value` is `undefined`.
 *
 * @since 0.1.1
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * isUndefined(void 0)
 * // => true
 *
 * isUndefined(null)
 * // => false
 */
function isUndefined(value: any): boolean {
    return value === undefined;
}

export default isUndefined;
