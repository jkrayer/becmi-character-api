const R = require('ramda');
const { data: characterData } = require('../data/characters');
const { startingMoney, armor, weapons, equipment } = require('../data/equipment');
const { isObject, isUndefined } = require('../helpers/contracts');
const { getArmorIds, getClassName, getQuery, getWeaponIds } = require('../helpers/lenses');

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
  isObject,
  R.either(
    R.isEmpty,
    isValidClass
  )
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
const getEquipment = R.pipe(
  getQuery,
  R.ifElse(
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
  )
);

module.exports = {
  get: (data, cb) => cb.apply(null, getEquipment(data))
};
