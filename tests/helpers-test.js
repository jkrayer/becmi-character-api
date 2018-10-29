const assert = require('assert');
const mocha = require('mocha');

const helpers = require('../lib/helpers');

  // xpAdjustMent
  const { xpAdjustMent } = helpers;
  assert.strictEqual(xpAdjustMent(18), 10);
  assert.strictEqual(xpAdjustMent(16), 10);
  assert.strictEqual(xpAdjustMent(13), 5);
  assert.strictEqual(xpAdjustMent(9), 0);
  assert.strictEqual(xpAdjustMent(6), -10);
  assert.strictEqual(xpAdjustMent(4), - 20);
  assert.strictEqual(xpAdjustMent(1), -20);
  assert.strictEqual(xpAdjustMent(null), -20);
  assert.strictEqual(xpAdjustMent(undefined), -20);
  assert.strictEqual(xpAdjustMent([]), -20);
  // {} Throw Syntax Error

  // scoreAdjustment
  const { scoreAdjustMent } = helpers;
  assert.strictEqual(scoreAdjustMent(18), 3);
  assert.strictEqual(scoreAdjustMent(17), 2);
  assert.strictEqual(scoreAdjustMent(15), 1);
  assert.strictEqual(scoreAdjustMent(12), 0);
  assert.strictEqual(scoreAdjustMent(8), -1);
  assert.strictEqual(scoreAdjustMent(5), -2);
  assert.strictEqual(scoreAdjustMent(3), -3);

  // intelligenceAdjustment
  const { intelligenceAdjustment } = helpers;
  const reg = /\+\d Languages?/;
  assert.strictEqual(reg.test(intelligenceAdjustment(19)), true);
  assert.strictEqual(reg.test(intelligenceAdjustment(16)), true);
  assert.strictEqual(reg.test(intelligenceAdjustment(14)), true);
  assert.strictEqual(typeof intelligenceAdjustment(10), 'string');
  assert.strictEqual(typeof intelligenceAdjustment(7), 'string');
  assert.strictEqual(typeof intelligenceAdjustment(4), 'string');
  assert.strictEqual(typeof intelligenceAdjustment(2), 'string');

  // charismaAdjustment
  const { charismaAdjustment } = helpers;
  reg = /Reaction Adjustment \d Maximum Retainers \d Morale \d{1,2}/;
  assert.strictEqual(reg.test(charismaAdjustMent(20)),true);
  assert.strictEqual(reg.test(charismaAdjustMent(17)),true);
  assert.strictEqual(reg.test(charismaAdjustMent(15)),true);
  assert.strictEqual(reg.test(charismaAdjustMent(11)),true);
  assert.strictEqual(reg.test(charismaAdjustMent(8),) true);
  assert.strictEqual(reg.test(charismaAdjustMent(5),) true);
  assert.strictEqual(reg.test(charismaAdjustMent(0),) true);

  // decimal
  const { decimal } = helpers;
  assert.strictEqual(decimal(1.34), 1);
  assert.strictEqual(decimal(1.94), 1);
  assert.strictEqual(decimal(7), 7);
  assert.strictEqual(decimal('127abc'), 127);
  assert.strictEqual(decimal('12.85t89'), 12);
  assert.strictEqual(decimal('3e10'), 3);
  assert.strictEqual(isNan(decimal('a123')), true);

  // xNums
  const { xNums } = helpers;
  assert.strictEqual(xNums(2, 6, [7, 5, 19, 6]), true);
  assert.strictEqual(xNums(5, 5, [1, 19, 20, 3, 5, 4, 5]), true);
  assert.strictEqual(xNums(4, 9, [5, 10, 8, 12, 11, 9]), false);
  assert.strictEqual(xNums(2, 4, [1, 5, 6, 7, 8, 10]), false);

  // trace
  const { trace } = helpers;
  // spy on console :(, stupid side effects ... or screw testing side effects
  const a = trace();
  const arr = [1, 2, 3];

  assert.strictEqual(typeof a, 'function');
  assert.strictEqual(a(123), 123);
  assert.deepStrictEqual(a(arr), arr);
