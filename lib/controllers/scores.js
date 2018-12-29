const assert = require('assert');
const R = require('ramda');
const { data, STR, INT, WIS, DEX, CON, CHA } = require('../data/characters');
const helpers = require('../helpers/helpers');
const { getQuery } = require('../helpers/lenses');
const { isNumeric, isObject } = require('../helpers/contracts');

// Object -> Object -> Boolean
function deepStrictEqual(arr, brr) {
  try {
    assert.deepStrictEqual(arr, brr);
  } catch(e) {
    return false;
  }

  return true;
}

// Object -> Boolean
const verifyQuery = R.allPass([
  isObject,
  R.pipe(
    R.keys,
    R.partial(deepStrictEqual, [[STR, INT, WIS, DEX, CON, CHA]])
  ),
  R.pipe(
    R.values,
    R.all(isNumeric)
  )
]);

// Object -> Object
function getAdjustments(scores) {
  return [
    ['Strength', scores[STR], helpers.scoreAdjustment(scores[STR])],
    ['Intelligence', scores[INT], helpers.intelligenceAdjustment(scores[INT])],
    ['Wisdom', scores[WIS], helpers.scoreAdjustment(scores[WIS])],
    ['Dexterity', scores[DEX], helpers.scoreAdjustment(scores[DEX])],
    ['Constitution', scores[CON], helpers.scoreAdjustment(scores[CON])],
    ['Charisma', scores[CHA], helpers.charismaAdjustment(scores[CHA])]
  ];
}

// Object -> Object
const filterClasses = (function(charData) {
  return (scores) => charData.filter(function(klass) {
      if (Array.isArray(klass.min)) {
        for (let i = 0; i < klass.min.length; i++) {
          if (scores[klass.min[i][0]] < klass.min[i][1]) return false;
        }
      }
      return true;
    })
    .map(function(klass) {
      klass.xpAdjustMent = klass.prime.map(p => scores[p]).map(helpers.xpAdjustMent).reduce((a, v) => a > v ? a : v, -40)
      return klass;
    })
    .sort((a, b) => b.xpAdjustMent - a.xpAdjustMent);
}(data));

// Object -> Object
function getResponse(query) {
  return [{
    message: 'success',
    data: {
      scores: getAdjustments(query),
      characters: filterClasses(query)
    }
  }]; // being returned to an applied function so needs to be an array
}

// Object -> [Object]
const whatCanIBe = R.pipe(
  getQuery,
  R.ifElse(
    verifyQuery,
    R.pipe(
      R.map(helpers.decimal),
      R.ifElse(
        R.partial(helpers.xNums, [6, 2]), // two sizes
         query => [{ message: 'Reroll: At least two of your scores are 6 or less.' }], // ()
         R.ifElse(
           R.partial(helpers.xNums, [9, 4]), // four nines
           query => [{ message: 'Reroll: At least four of your scores are 9 or less.' }], // ()
           getResponse
         )
      )
    ),
    () => [{message: 'Invalid query string'}, 406]
  )
);

module.exports = {
  get: (data, cb) => cb.apply(null, whatCanIBe(data))
};
