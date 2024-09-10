/**
 * @author appleex
 * @date 2024-09-10 21:50
 */
import hasClass from "./hasClass";

/**
 * Remove a specified `class` from a `DOM` element.
 *
 * @summary removeClass
 * @name removeClass
 * @since 0.2.0
 * @category Dom
 *
 * @param {HTMLElement} el The value to process.
 * @param {string} className The value to process.
 * @returns {void}
 *
 * @example
 *
 * // `<div class="wrapper test"></div>`
 * const el = document.querySelector('div');
 *
 * removeClass(el, 'test');
 * // => <div class="wrapper "></div>
 *
 */
function removeClass(el: HTMLElement, className: string): void {
    if (hasClass(el, className)) {
        const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

/*
    Tests
 */
// import { JSDOM } from "jsdom";
// const dom = new JSDOM(`<div class="wrapper test"></div>`);
// const el = dom.window.document.querySelector('div');
//
// removeClass(el, 'test');
//
// console.log('=>', el.outerHTML);

export default removeClass;
