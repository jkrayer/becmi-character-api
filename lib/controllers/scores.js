const { data, STR, INT, WIS, DEX, CON, CHA } = require('../data/characters');
const helpers = require('../helpers');
const R = require('ramda');

function getAdjustments(scores) {
  return Object.assign({}, scores, {
    modifiers: {
      STR: helpers.scoreAdjustment(scores[STR]),
      INT: helpers.intelligenceAdjustment(scores[INT]),
      WIS: helpers.scoreAdjustment(scores[WIS]),
      DEX: helpers.scoreAdjustment(scores[DEX]),
      CON: helpers.scoreAdjustment(scores[CON]),
      CHA: helpers.charismaAdjustment(scores[CHA])
    }
  });
};

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

// Obj(scores) => Message
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