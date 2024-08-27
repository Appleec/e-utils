import createCaseFirst from './internal/createCaseFirst';

/**
 * Converts the first character of `string` to lower case.
 *
 * @since 0.1.2
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toLowerFirst('Fred')
 * // => 'fred'
 *
 * _.toLowerFirst('FRED')
 * // => 'fRED'
 */
const toLowerFirst = createCaseFirst('toLowerCase');

export default toLowerFirst;
