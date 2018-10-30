const assert = require('assert');
const mocha = require('mocha');

const helpers = require('../lib/helpers');

  // xpAdjustMent
  describe('xpAdjustMent', () => {
    it('should return certain numbers', () => {
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
    });
  });

  // scoreAdjustment
  describe('scoreAdjustment', () => {
    it('should return certain numbers', () => {
      const { scoreAdjustment } = helpers;
      assert.strictEqual(scoreAdjustment(18), 3);
      assert.strictEqual(scoreAdjustment(17), 2);
      assert.strictEqual(scoreAdjustment(15), 1);
      assert.strictEqual(scoreAdjustment(12), 0);
      assert.strictEqual(scoreAdjustment(8), -1);
      assert.strictEqual(scoreAdjustment(5), -2);
      assert.strictEqual(scoreAdjustment(3), -3);
    });
  });

  // intelligenceAdjustment
  describe('intelligenceAdjustment', () => {
    it('should return a string', () => {
      const { intelligenceAdjustment } = helpers;
      const reg = /\+\d Languages?/;
      assert.strictEqual(reg.test(intelligenceAdjustment(19)), true);
      assert.strictEqual(reg.test(intelligenceAdjustment(16)), true);
      assert.strictEqual(reg.test(intelligenceAdjustment(14)), true);
      assert.strictEqual(typeof intelligenceAdjustment(10), 'string');
      assert.strictEqual(typeof intelligenceAdjustment(7), 'string');
      assert.strictEqual(typeof intelligenceAdjustment(4), 'string');
      assert.strictEqual(typeof intelligenceAdjustment(2), 'string');
    });
  });

  // charismaAdjustment
  describe('charismaAdjustment', () => {
    it('should return a string', () => {
      const { charismaAdjustment } = helpers;
      reg = /Reaction Adjustment -?\d Maximum Retainers \d Morale \d{1,2}/;
      assert.strictEqual(reg.test(charismaAdjustment(20)),true);
      assert.strictEqual(reg.test(charismaAdjustment(17)),true);
      assert.strictEqual(reg.test(charismaAdjustment(15)),true);
      assert.strictEqual(reg.test(charismaAdjustment(11)),true);
      assert.strictEqual(reg.test(charismaAdjustment(8)), true);
      assert.strictEqual(reg.test(charismaAdjustment(5)), true);
      assert.strictEqual(reg.test(charismaAdjustment(0)), true);
    });
  });

  // decimal
  describe('decimal', () => {
    it(' should return a whole number', () => {
      const { decimal } = helpers;
      assert.strictEqual(decimal(1.34), 1);
      assert.strictEqual(decimal(1.94), 1);
      assert.strictEqual(decimal(7), 7);
      assert.strictEqual(decimal('127abc'), 127);
      assert.strictEqual(decimal('12.85t89'), 12);
      assert.strictEqual(decimal('3e10'), 3);
      assert.strictEqual(isNaN(decimal('a123')), true);
    });
  });

  // xNums
  describe('xNums', () => {
    it('should return a boolean. true when <=num occurs num or more times in an array', () => {
      const { xNums } = helpers;
      assert.strictEqual(xNums(6, 2, [7, 5, 19, 6]), true);
      assert.strictEqual(xNums(5, 5, [1, 19, 20, 3, 5, 4, 5]), true);
      assert.strictEqual(xNums(9, 4, [5, 10, 8, 12, 11, 9]), false);
      assert.strictEqual(xNums(4, 2, [1, 5, 6, 7, 8, 10]), false);
    });
  });

  // trace
  describe('trace', () => {
    it('should return a function that returns the value given to it', () => {
      const { trace } = helpers;
      // spy on console :(, stupid side effects ... or screw testing side effects
      const a = trace();
      const arr = [1, 2, 3];

      assert.strictEqual(typeof a, 'function');
      assert.strictEqual(a(123), 123);
      assert.deepStrictEqual(a(arr), arr);
    });
  });
