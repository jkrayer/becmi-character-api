const assert = require('assert');
const mocha = require('mocha');

const constracts = require('../lib/contracts');

  // isObject
  const { isObject } = contracts;
  assert.strictEqual(isObject({}), true);
  assert.strictEqual(isObject([]), false);
  assert.strictEqual(isObject(null), false);

  // isString
  let abc; // Undefined
  const { isString } = contracts;
  assert.strictEqual(isString('abc'), true);
  assert.strictEqual(isString('123'), true);
  assert.strictEqual(isString(abc), false);
  assert.strictEqual(isString(123), false);

  // isUndefined
  const o = {};
  const { isUndefined } = contracts;
  assert.strictEqual(isUndefined(void 0), true);
  assert.strictEqual(isUndefined(o.a), true);
  assert.strictEqual(isUndefined(abc), true);
  assert.strictEqual(isUndefined(0), false);
  assert.strictEqual(isUndefined(''), false);
  assert.strictEqual(isUndefined(false), false);
  assert.strictEqual(isUndefined(null), false);
  assert.strictEqual(isUndefined(NaN), false);
