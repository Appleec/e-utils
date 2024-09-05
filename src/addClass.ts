/**
 * @author appleex
 * @date 2024-09-04 06:03
 */
import hasClass from "./hasClass";

/**
 * `DOM` element adds a new `class`.
 *
 * @since 0.2.0
 * @category Dom
 * @param {HTMLElement} element - HTMLElement.
 * @param {String} className - Class Name.
 * @returns {void} No return value.
 * @example
 *
 * var el = "<div></div>"
 *
 * addClass(el, 'test')
 * // => "<div class='test'></div>"
 */
function addClass(element: HTMLElement, className: string): void {
    if (!hasClass(element, className)) {
        element.className += ' ' + className;
    }
}

export default addClass;
