const R = require('ramda');
const { trace } = require('./helpers');

// a -> Boolean
const isNumber = R.ifElse(
  isNaN,
  x => false,
  R.pipe(
    R.type,
    R.equals('Number')
  )
);

// a -> Boolean
const isObject = R.pipe(R.type, R.equals('Object'));

// a -> Boolean
const isString = R.pipe(R.type, R.equals('String'));

// a -> Boolean
const isUndefined = R.pipe(R.type, R.equals('Undefined'));

// a -> Boolean
const isNumeric = R.ifElse(
  isString,
  str => /^\d+$/.test(str),
  x => false
);

module.exports = {
  isNumber,
  isNumeric,
  isObject,
  isString,
  isUndefined
};
