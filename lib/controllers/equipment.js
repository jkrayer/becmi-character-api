const R = require('ramda');
const { data: characterData } = require('../data/characters');
const { startingMoney, armor, weapons, equipment } = require('../data/equipment');
const { isObject, isString, isUndefined } = require('../contracts');

//
const getQuery = R.view(R.lensProp('query'));

// Object -> a
const getClassName = R.view(R.lensProp('name'));

// Object -> a
const getArmorIds = R.view(R.lensPath(['armor', 'ids']));

// Object -> a
const getWeaponIds = R.view(R.lensPath(['weapons', 'ids']));

// Array of Class Names
const classNames = R.map(getClassName, characterData);

// Object -> Boolean
const isValidClass = R.pipe(
  getClassName,                            // query -> String("Cleric")
  R.partialRight(R.indexOf, [classNames]), // String("Cleric") -> Number(key)
  R.partialRight(R.gt, [-1])               // Number(key) -> Boolean
);

// Object -> Boolean
const verifyQuery = R.allPass([
  isObject,                        // the argument is an object
  R.pipe(getClassName, isString),  // it has a 'name' attribute whose value is a string
  isValidClass
]);

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
    className => classObject => getClassName(classObject) === className, // String("Cleric") -> Function(Object) -> Boolean
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
const getArmor = makeEquipmentFilter(getArmorIds, armor);

// [Object] -> [Object]
const getWeapons = makeEquipmentFilter(getWeaponIds, weapons);

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
  get: (data, cb) => cb.apply(null, getEquipment(getQuery(data)))
};
