/**
 * @author appleex
 * @date 2024-09-04 22:00
 */
import toNumber from "./toNumber";
import toString from "./toString";
import isNumber from "./isNumber";
import isNil from "./isNil";

/**
 * Unit conversion.
 *
 * @since 0.2.0
 * @category Util
 * @param {*} value The value to check.
 * @param {string} [unit='px'] The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * convertToUnit();
 * // => undefined
 *
 * convertToUnit(16);
 * // => 16px
 *
 * convertToUnit('a');
 * // => a
 *
 * convertToUnit('16', 'g');
 * // => 16g
 */
function convertToUnit(value: any, unit: string = 'px'): undefined | string {
    if (isNil(value) || value === '') return undefined;

    if (isNaN(+value)) return toString(value);

    return `${toNumber(value)}${unit}`;
}

// console.log("=>(convertToUnit.ts:19) convertToUnit", convertToUnit());
// console.log("=>(convertToUnit.ts:20) convertToUnitnull", convertToUnit(null));
// console.log("=>(convertToUnit.ts:21) convertToUnit'", convertToUnit(''));
// console.log("=>(convertToUnit.ts:29) convertToUnit45", convertToUnit(45));
// console.log("=>(convertToUnit.ts:30) convertToUnit'adx", convertToUnit(45, 'db'));
// console.log("=>(convertToUnit.ts:24) convertToUnit{a: 1}", convertToUnit({a: 1}));
// console.log("=>(convertToUnit.ts:47) convertToUnit'45", 'g', convertToUnit('45', 'g'));

// function convertToUnit(str, unit = 'px') {
//     if (str == null || str === '') {
//         return undefined;
//     } else if (isNaN(+str)) {
//         return String(str);
//     } else {
//         return `${Number(str)}${unit}`;
//     }
// }

export default convertToUnit;
