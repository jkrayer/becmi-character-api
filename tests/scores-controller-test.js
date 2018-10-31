const assert = require('assert');
const mocha = require('mocha');

const { get } = require('../lib/controllers/scores');

function callback(...a) {
  return a;
}

// TODO: Add a more malicious test
describe('get', () => {
  it('should return a 406 and message when query is not an object', () => {
    assert.deepStrictEqual(get(null, callback), [{message: 'Invalid query string'}, 406]);
    assert.deepStrictEqual(get({query: {name: () => {}}}, callback), [{message: 'Invalid query string'}, 406]);
  });
});

describe('get', () => {
  it('should return a 406 if the query object does not have the correct keys', () => {
    assert.deepStrictEqual(get({query: {some: '15', other: '15', object: '15', Dexterity: '15', Constitution: '15', Charisma: '15'}}, callback), [{message: 'Invalid query string'}, 406]);
    assert.deepStrictEqual(get({query: {name: 'Paladin'}}, callback), [{message: 'Invalid query string'}, 406]);
  });
});

describe('get', () => {
  it('should return a 406 if the values are not all parsable into numbers', () => {
    assert.deepStrictEqual(get({query: {Strength: '15', Intelligence: '15', Wisdom: '15', Dexterity: '15', Constitution: 'a15', Charisma: 'e15'}}, callback), [{message: 'Invalid query string'}, 406]);
  });
});

describe('get', () => {
  it('should return a message when two or more scores are 6 or lower', () => {
    assert.deepStrictEqual(get({query: {Strength: '15', Intelligence: '15', Wisdom: '5', Dexterity: '15', Constitution: '6', Charisma: '15'}}, callback), [{ message: 'Reroll: At least two of your scores are 6 or less.'}]);
    assert.deepStrictEqual(get({query: {Strength: '6', Intelligence: '15', Wisdom: '6', Dexterity: '15', Constitution: '6', Charisma: '15'}}, callback), [{ message: 'Reroll: At least two of your scores are 6 or less.'}]);
    assert.deepStrictEqual(get({query: {Strength: '15', Intelligence: '15', Wisdom: '3', Dexterity: '15', Constitution: '4', Charisma: '15'}}, callback), [{ message: 'Reroll: At least two of your scores are 6 or less.'}]);
  });
});

describe('get', () => {
  it('should return a message when four or more scores are 9 or lower', () => {
    assert.deepStrictEqual(get({query: {Strength: '9', Intelligence: '8', Wisdom: '5', Dexterity: '15', Constitution: '7', Charisma: '15'}}, callback), [{ message: 'Reroll: At least four of your scores are 9 or less.'}]);
    assert.deepStrictEqual(get({query: {Strength: '9', Intelligence: '9', Wisdom: '9', Dexterity: '9', Constitution: '9', Charisma: '15'}}, callback), [{ message: 'Reroll: At least four of your scores are 9 or less.'}]);
  });
});

describe('get', () => {
  describe('Fighter first', () => {
    it('should return a sorted list of basic characters based on scores', () => {
      const result = get({query: {Strength: '18', Intelligence: '8', Wisdom: '10', Dexterity: '15', Constitution: '8', Charisma: '15'}}, callback)[0].data.characters;

      assert.strictEqual(result.length, 4, 'More than 4 classes were returned');
      assert.strictEqual(result[0].name, 'Fighter', 'First class returned was not Fighter');
      assert.strictEqual(result[3].name, 'Magic-User', 'Last class returned was not Magic-User');
    });
  });

  describe('Thief first', () => {
    it('should return a sorted list of basic characters based on scores', () => {
      const result = get({query: {Strength: '10', Intelligence: '10', Wisdom: '10', Dexterity: '17', Constitution: '10', Charisma: '15'}}, callback)[0].data.characters;

      assert.strictEqual(result.length, 7, 'More than 7 classes were returned');
      assert.strictEqual(result[0].name, 'Thief', 'First class returned was not Thief');
      assert.strictEqual(result[3].name, 'Fighter', 'Last class returned was not Fighter');
    });
  });
});
