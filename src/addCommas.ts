/**
 * @author appleex
 * @date 2024-09-04 21:25
 */

/**
 * Add comma separator.
 *
 * @since 0.2.0
 * @category Util
 * @param {number|string} value - The value to check.
 * @returns {string} Returns the string.
 * @example
 *
 * addCommas(20000)
 * // => 20,000
 *
 * addCommas('20000')
 * // => 20,000
 *
 * addCommas('120%')
 * // => 120%
 *
 * addCommas(20000.0015)
 * // => 20,000.0015
 *
 */
function addCommas(value: number | string): string {
    if (value === '-') {
        return value;
    }

    let valStr = value.toString();
    let flag = false;

    if (valStr.slice(-1) === '%') {
        flag = true;
        valStr = valStr.slice(0, -1);
    }

    const aIntNum = valStr.split('.');

    aIntNum[0] = aIntNum[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    // if (aIntNum[0].length >= 5) {
    // }

    if (aIntNum[1] && aIntNum[1].length >= 5) {
        aIntNum[1] = aIntNum[1].replace(/(\d{3})/g, '$1 ');
    }

    return flag ? `${aIntNum.join('.')}%` : aIntNum.join('.');
}

// console.log("=>(addCommas.ts:43) addCommas20000", addCommas(20000));
// console.log("=>(addCommas.ts:44) addCommas20000.999", addCommas(20000.999));

export default addCommas;
