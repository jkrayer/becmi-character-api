const assert = require('assert');
const mocha = require('mocha');

const { get } = require('../lib/controllers/equipment');
const data = require('../lib/data/equipment');

function callback(...a) {
  return a;
}

describe('get', () => {
  it('should return a 406 and message when the given name does not exist', () => {
    assert.deepStrictEqual(get({query: {name: 'Zoomer'}}, callback), [{message: 'Invalid query string'}, 406]);
    assert.deepStrictEqual(get({query: {name: 'Paladin'}}, callback), [{message: 'Invalid query string'}, 406]);
  });
});

// TODO: Add a more malicious test
describe('get', () => {
  it('should return a 406 and message when bad data is given', () => {
    assert.deepStrictEqual(get(null, callback), [{message: 'Invalid query string'}, 406]);
    assert.deepStrictEqual(get({query: {name: () => {}}}, callback), [{message: 'Invalid query string'}, 406]);
  });
});

describe('get', () => {
  it('should return an object when a valid name is passed', () => {
    const result = get({query: {name: 'Thief'}}, callback);
    const resultKeys = Object.keys(result[0]);
    const dataKeys = Object.keys(result[0].data);

    assert.deepStrictEqual(resultKeys, ['message', 'data']);
    assert.deepStrictEqual(dataKeys, ['startingMoney', 'equipment', 'armor', 'weapons']);
  });
});

describe('get', () => {
  it('should return an object with filtered weapons and armor', () => {
    const result = get({query: {name: 'Magic-User'}}, callback);
    const allowedWeaponNames = result[0].data.weapons.map(a => a.name);

    assert.deepStrictEqual(allowedWeaponNames, ['Dagger', 'Silver Dagger']);
    assert.deepStrictEqual(result[0].data.armor, []);
  });
});

describe('get', () => {
  it('should return all weapons, armor and equipment', () => {
    const result = get({query: {}}, callback);

    assert.strictEqual(result[0].data.armor.length, data.armor.length);
    assert.strictEqual(result[0].data.weapons.length, data.weapons.length);
    assert.strictEqual(result[0].data.equipment.length, data.equipment.length);
  });
});
