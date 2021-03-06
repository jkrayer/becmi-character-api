const assert = require('assert');
const mocha = require('mocha');

const lenses = require('../lib/helpers/lenses');

// getArmorIds
describe('getArmorIds', () => {
  const { getArmorIds } = lenses;

  describe('the negative cases', () => {
    it('should return undefined when [armor, ids] is not available on the object', () => {
      assert.strictEqual(getArmorIds(null), undefined);
      assert.strictEqual(getArmorIds([]), undefined);
      assert.strictEqual(getArmorIds({}), undefined);
      assert.strictEqual(getArmorIds({armor: {f: null}}), undefined);
    });
  });

  describe('the positive case', () => {
    it('should return the value of correct path', () => {
      const ids = [1, 3, 5];

      assert.strictEqual(getArmorIds({armor: {ids: null}}), null);
      assert.deepStrictEqual(getArmorIds({armor: {ids}}), ids);
    });
  });
});

// getClassName
describe('getClassName', () => {
  const { getClassName } = lenses;

  it('should return undefined when the className is not available', () => {
    assert.strictEqual(getClassName({}), undefined);
    assert.strictEqual(getClassName([]), undefined);
    assert.strictEqual(getClassName({ classname: 'Fighter' }), undefined);
    assert.strictEqual(getClassName({a: {className: 'Thief'}}), undefined);
  });
});

// getHttpPort
describe('getHttpPort', () => {
  const { getHttpPort } = lenses;

  it('should return the value of httpPort on the provided object', () => {
    assert.strictEqual(getHttpPort({ httpPort: 1}), 1);
    assert.strictEqual(getHttpPort({ httpPort: null}), null);
    assert.strictEqual(getHttpPort({ httpPort: 'string'}), 'string');
    assert.strictEqual(getHttpPort({}), undefined);
  });
});

// getHttpsPort
describe('getHttpsPort', () => {
  const { getHttpsPort } = lenses;

  it('should return the value of httpsPort on the provided object', () => {
    assert.strictEqual(getHttpsPort({ httpsPort: 123}), 123);
    assert.strictEqual(getHttpsPort({ httpsPort: null}), null);
    assert.strictEqual(getHttpsPort({ httpsPort: 'a string'}), 'a string');
    assert.strictEqual(getHttpsPort({}), undefined);
  });
});


// getQuery
describe('getQuery', () => {
  it('should return undefined when query is not available on the object', () => {
    const { getQuery } = lenses;
    assert.strictEqual(getQuery(null), undefined);
    assert.strictEqual(getQuery([]), undefined);
    assert.strictEqual(getQuery({}), undefined);
    assert.strictEqual(getQuery({que: 'A string'}), undefined);
  });
});

// Object -> a
// const getWeaponIds = R.view(R.lensPath(['weapons', 'ids']));
describe('getWeaponIds', () => {
  const { getWeaponIds } = lenses;

  describe('the negative cases', () => {
    it('should return undefined when [weapon, ids] is not available on the object', () => {
      assert.strictEqual(getWeaponIds({weapons: {}}), undefined);
      assert.strictEqual(getWeaponIds(['weapons', 'ids']), undefined);
      assert.strictEqual(getWeaponIds({weapons: { IDS: [1, 2]}}), undefined);
      assert.strictEqual(getWeaponIds({WEAPONS: {ids: [5]}}), undefined);
    });
  });

  describe('the positive case', () => {
    it('should return the value of correct path', () => {
      const ids = [1, 3, 5];

      assert.strictEqual(getWeaponIds({weapons: {ids: ''}}), '');
      assert.deepStrictEqual(getWeaponIds({weapons: {ids}}), ids);
    });
  });
});
