/**
 * @author appleex
 * @date 2024-08-25 16:36
 */
import { assert } from 'chai';
import * as _ from '../src';

describe('string module', () => {
    describe('toUpperFirst function', () => {
        test('`abc` ==> `Abc`', () => {
            assert.equal(_.toUpperFirst('abc'), 'Abc');
        })
    })
})
