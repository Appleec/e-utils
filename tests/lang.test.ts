/**
 * @author appleex
 * @date 2024-08-25 16:36
 */
import { assert } from 'chai';
import * as _ from '../src';

describe('lang module', () => {
    describe('isNil function', () => {
        test('should return `true` for isNil', () => {
            assert.strictEqual(_.isNil(true), false)
        })
    })

    describe('isElement function', () => {
        test('===>>', () => {
            document.body.innerHTML = `<div class="wrapper">Hello world</div>`;

            const el = document.querySelector('.wrapper');

            // console.log('=>', el && el.outerHTML);

            if (el) {
                // console.log('===>>', _.isElement(dom.window.document.body))
                assert.equal(_.isElement(el), true)

                // _.addClass(el, 'test');
                // console.log('=>', el.outerHTML);
            }
        })
    })
})
