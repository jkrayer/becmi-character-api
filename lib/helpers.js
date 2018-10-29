const { data } = require('./data/characters');
const R = require('ramda');

//------ Private Methods ------

// Contains all of the common comparisons for score based abilities
// Array -> Number -> any
function adjustments(messages, score) {
  if (score > 17) return messages[0];
  if (score > 15) return messages[1];
  if (score > 12) return messages[2];
  if (score > 8) return messages[3];
  if (score > 5) return messages[4];
  if (score > 3) return messages[5];
  return messages[6];
};

//------ Public Methods ------

// Return % bonus to XP for high primse requisite(s)
// Number -> Number
const xpAdjustMent = R.partial(adjustments, [[10, 10, 5, 0, -10, -20, -20]]);

// Return common ability score bonus
// Number -> Number
const scoreAdjustment = R.partial(adjustments, [[3, 2, 1, 0, -1, -2, -3]]);

// Return Intelligence ability score bonus
// Number -> String
const intelligenceAdjustment = R.partial(adjustments, [[
  '+3 Languages',
  '+2 Languages',
  '+1 Language',
  'No adjustments; can read and write Common and Alignment languages',
  'Can write simple Common words',
  'Cannot read or write Common',
  'Has trouble with speaking, cannot read or write.'
]]);

// Return Charisma ability score bonus
// Number -> String
const charismaAdjustment = R.partial(adjustments, [[
  'Reaction Adjustment 2 Maximum Retainers 7 Morale 10',
  'Reaction Adjustment 1 Maximum Retainers 6 Morale 9',
  'Reaction Adjustment 1 Maximum Retainers 5 Morale 8',
  'Reaction Adjustment 0 Maximum Retainers 4 Morale 7',
  'Reaction Adjustment -1 Maximum Retainers 3 Morale 6',
  'Reaction Adjustment -1 Maximum Retainers 2 Morale 5',
  'Reaction Adjustment -2 Maximum Retainers 2 Morale 4'
]]);

// String -> [Number|NaN]
const decimal = R.partialRight(parseInt, [10]);

// Returns true if the object contains [amount] or more numbers <= [num]
// Number -> Number -> Object -> Boolean
function xNums(num, amount, obj) {
  return R.pipe(
    R.values,
    R.filter(R.lte(R.__, num)),
    R.length,
    R.gte(R.__, amount)
  )(obj);
}

// Trace is used for debugging composed functions
// String -> Any -> Any
function trace(msg = '') {
  return function(a) {
    console.log(msg, a);
    return a;
  }
}

module.exports = {
  xpAdjustMent,
  scoreAdjustment,
  intelligenceAdjustment,
  charismaAdjustment,
  decimal,
  xNums,
  trace
};
