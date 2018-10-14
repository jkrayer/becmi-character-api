const { data } = require('./data/characters');
const R = require('ramda');

function xpAdjustMent(prime) {
  if (prime > 15) return 10;
  if (prime > 12) return 5;
  if (prime > 8) return 0;
  if (prime > 5) return -10;
  return -20;
};

function scoreAdjustment(score) {
  if (score > 17) return '+3';
  if (score > 15) return '+2';
  if (score > 12) return '+1';
  if (score > 8) return '0';
  if (score > 5) return '-1';
  if (score > 3) return '-2';
  return '-3';
}

function intelligenceAdjustment(score) {
  if (score > 17) return '+3 Languages';
  if (score > 15) return '+2 Languages';
  if (score > 12) return '+1 Language';
  if (score > 8) return 'No adjustments; can read and write Common and Alignment languages';
  if (score > 5) return 'Can write simple Common words';
  if (score > 3) return 'Cannot read or write Common';
  return 'Has trouble with speaking, cannot read or write.';
}

function charismaAdjustment(score) {
  if (score > 17) return 'Reaction Adjustment 2 Maximum Retainers 7 Morale 10';
  if (score > 15) return 'Reaction Adjustment 1 Maximum Retainers 6 Morale 9';
  if (score > 12) return 'Reaction Adjustment 1 Maximum Retainers 5 Morale 8';
  if (score > 8) return 'Reaction Adjustment 0 Maximum Retainers 4 Morale 7';
  if (score > 5) return 'Reaction Adjustment -1 Maximum Retainers 3 Morale 6';
  if (score > 3) return 'Reaction Adjustment -1 Maximum Retainers 2 Morale 5';
  return 'Reaction Adjustment -2 Maximum Retainers 2 Morale 4';
}

// String -> Any -> Any
function trace(msg) {
  return function(a) {
    console.log(msg, a);
    return a;
  }
}

// Returns true if the object contains [amount] or more numbers <= [num]
// Number -> Number Object -> Boolean
function xNums(num, amount, obj) {
  return R.pipe(
    R.values,
    R.filter(R.lte(R.__, num)),
    R.length,
    R.gte(R.__, amount)
  )(obj);
}

module.exports = {
  xpAdjustMent,
  scoreAdjustment,
  intelligenceAdjustment,
  charismaAdjustment,
  trace,
  xNums
};
