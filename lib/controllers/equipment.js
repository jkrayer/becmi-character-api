const R = require('ramda');
const characterData = require('../data/characters');
const {startingMoney, armor, weapons, equipment} = require('../data/equipment');
const { isObject, isString, isUndefined } = require('../contracts');

// Object -> a
const getClassName = R.view(R.lensProp('name')); // get the value of the 'name' attribute of a given object

// [Object] -> Function -> Function
function isValidClass(data, getName) {
  // Object -> Boolean
  return R.pipe(
    getName,
    R.partialRight(R.indexOf, [R.map(getName, data)]), // get the index of name from the array of names
    R.partialRight(R.gt, [-1])                         // make sure the index is valid
  );
}

// Object -> Boolean
const verifyQuery = R.allPass([
  isObject,                        // the argument is an object
  R.pipe(getClassName, isString),  // it has a 'name' attribute whose value is a string
  isValidClass(characterData, getClassName)
]);

// Object -> Object
const getArmor = R.view(R.lensPath(['armor', 'ids']));

// Object -> Object
const getWeapons = R.view(R.lensPath(['weapons', 'ids']));

// Function -> Object
const getCharacterByName = R.pipe(
  R.partialRight(R.filter, [characterData]),
  R.head
);

// [Objects] -> [Numbers] -> [Objects]
function filterEquipment(equipment, includeIds) {
  return equipment.filter(equip => includeIds.indexOf(equip.id) > -1);
}

// Function -> [Object] -> [Object]
function makeEquipmentFilter(lens, equip) {
  return R.pipe(
    getClassName, // query -> cleric
    className => classObject => getClassName(classObject) === className, // String -> Function(Object) -> Boolean
    getCharacterByName, // [characterData] -> Predicate -> characterData
    lens, // some property on characterData
    R.ifElse(
      isUndefined,
      () => equip,
      R.partial(filterEquipment, [equip])
    )
  );
}

// [Object] -> [Object]
const getArmor = makeEquipmentFilter(getArmor, armor);

// [Object] -> [Object]
const getWeapons = makeEquipmentFilter(getWeapons, weapons);

// Object => [Object]
const getEquipment = R.ifElse(
  verifyQuery,
  query => [{
    message: 'success',
    data: {
      startingMoney,
      equipment,
      armor: getArmor(query),
      weapons: getWeapons(query)
    }
  }],
  () => [{message: 'Invalid query string'}, 406]
);

module.exports = {
  get: (data, cb) => cb.apply(null, getEquipment(data.query))
};
