/**
 * @author appleex
 * @date 2024-09-04 05:51
 */

/**
 * Determine whether a `DOM` element has a `class` attribute.
 *
 * @since 0.2.0
 * @category Dom
 * @param {HTMLElement} element The value is HTMLElement.
 * @param {string} className The value is ClassName.
 * @returns {boolean} True if element has class attribute, otherwise false.
 * @example
 *
 * var _wrapper = document.querySelector('.wrapper');
 *
 * hasClass(_wrapper, 'wrapper');
 * // => true
 *
 */
function hasClass(element: HTMLElement, className: string): boolean {
    return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

export default hasClass;
