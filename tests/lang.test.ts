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
})
