const assert = require('assert');
const mocha = require('mocha');

const contracts = require('../lib/contracts');

  // isObject
  describe('isObject', () => {
    it('should only return true for {} and Contructor return', () => {
      const { isObject } = contracts;
      function A() {}

      assert.strictEqual(isObject({}), true);
      assert.strictEqual(isObject(new A()), true);
      assert.strictEqual(isObject([]), false);
      assert.strictEqual(isObject(null), false);
    });
  });

  // isString
  describe('isString', () => {
    it('should only return true for strings', () => {
      const { isString } = contracts;
      let abc;

      assert.strictEqual(isString('abc'), true);
      assert.strictEqual(isString('123'), true);
      assert.strictEqual(isString(abc), false);
      assert.strictEqual(isString(123), false);
    });
  });

  // isUndefined
  describe('isUndefined', () => {
    it('should only return true for undefined', () => {
      const { isUndefined } = contracts;
      const o = {};
      let abc;

      assert.strictEqual(isUndefined(void 0), true);
      assert.strictEqual(isUndefined(o.a), true);
      assert.strictEqual(isUndefined(abc), true);
      assert.strictEqual(isUndefined(0), false);
      assert.strictEqual(isUndefined(''), false);
      assert.strictEqual(isUndefined(false), false);
      assert.strictEqual(isUndefined(null), false);
      assert.strictEqual(isUndefined(NaN), false);
    });
  });
