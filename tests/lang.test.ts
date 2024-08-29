/**
 * @author appleex
 * @date 2024-08-25 16:36
 */
import { assert } from 'chai';
import * as _ from '../src';
import { JSDOM } from 'jsdom';

describe('lang module', () => {
    describe('isNil function', () => {
        test('should return `true` for isNil', () => {
            assert.strictEqual(_.isNil(true), false)
        })
    })

    describe('isElement function', () => {
        test('===>>', () => {
            const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
            // console.log('===>>', _.isElement(dom.window.document.body))
            assert.equal(_.isElement(dom.window.document.body), true)
        })
    })
})
