const { data } = require('../data/characters');
const { getNumbers, xpAdjustMent } = require('../helpers');

function whatCanIBe(scores) {

  if (getNumbers(scores, 6, 2)) {
    return { message: 'Reroll: At least two of your scores are 6 or less.'};
  }

  if (getNumbers(scores, 9, 4)) {
    return { message: 'Reroll: At least four of your scores are 9 or less.'};
  }

  return {
    message: '',
    data: data
      .filter(function(klass) {
        if (Array.isArray(klass.min)) {
          for (let i = 0; i < klass.min.length; i++) {
            if (scores[klass.min[i][0]] < klass.min[i][1]) return false;
          }
        }
        return true;
      })
      .map(function(klass) {
        klass.scores = scores;
        klass.xpAdjustment = klass.prime.map(p => scores[p]).map(xpAdjustMent).reduce((a, v) => a > v ? a : v, -40)
        return klass;
      })
      .sort((a, b) => b.xpAdjustment - a.xpAdjustment)
  };
}


module.exports = {
  post: (data, cb) => cb(whatCanIBe(data.payload))
}
