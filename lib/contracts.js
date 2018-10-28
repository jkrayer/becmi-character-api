const R = require('ramda');

// a -> Boolean
const isObject = R.pipe(R.type, R.equals('Object'));

// a -> Boolean
const isString = R.pipe(R.type, R.equals('String'));

// a -> Boolean
const isUndefined = R.pipe(R.type, R.equals('Undefined'));

module.exports = {
  isObject,
  isString,
  isUndefined
};
