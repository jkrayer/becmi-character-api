const { data, STR, INT, WIS, DEX, CON, CHA } = require('../data/characters');
const helpers = require('../helpers');
const R = require('ramda');

// Takes an object of scores and returns an object of scores and modifiers
function getAdjustments(scores) {
  return {
    STR: [scores[STR], helpers.scoreAdjustment(scores[STR])],
    INT: [scores[INT], helpers.intelligenceAdjustment(scores[INT])],
    WIS: [scores[WIS], helpers.scoreAdjustment(scores[WIS])],
    DEX: [scores[DEX], helpers.scoreAdjustment(scores[DEX])],
    CON: [scores[CON], helpers.scoreAdjustment(scores[CON])],
    CHA: [scores[CHA], helpers.charismaAdjustment(scores[CHA])]
  };
}

// Object -> Boolean
const twoSixes = R.partial(helpers.xNums, [6, 2]);

// Object -> Boolean
const fourNines = R.partial(helpers.xNums, [9, 4]);

// Object -> Object
function getClasses(scores) {
  return {
    message: 'success',
    data: {
      scores: getAdjustments(scores),
      characters: data.filter(function(klass) {
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
      .sort((a, b) => b.xpAdjustMent - a.xpAdjustMent)
    }
  };
}

// Takes an Object of Scores and returns what types of characters the player can be
// Obj -> Obj
const whatCanIBe = R.pipe(
  R.ifElse(
    twoSixes,
    a => ({ message: 'Reroll: At least two of your scores are 6 or less.' }),
    R.ifElse(
      fourNines,
      a => ({ message: 'Reroll: At least four of your scores are 9 or less.' }),
      getClasses
    )
  )
);

module.exports = {
  post: (data, cb) => cb(whatCanIBe(data.payload))
};
