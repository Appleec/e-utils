/**
 * @author appleex
 * @date 2024-08-25 16:36
 */
import { assert } from 'chai';
import * as _ from '../src';

describe('string module', () => {
    describe('toUpper function', () => {
        test('_.toUpper`', () => {
            // console.log('===>>', _.toUpper('--foo-bar--'));
            assert.equal(_.toUpper('--foo-bar--'), '--FOO-BAR--');
            assert.equal(_.toUpper('fooBar'), 'FOOBAR');
        })
    })
    describe('toUpperFirst function', () => {
        test('_.toUpperFirst`', () => {
            console.log('===>>', _.toUpperFirst('abc dsf'))
            assert.equal(_.toUpperFirst('abc'), 'Abc');
        })
    })
})
