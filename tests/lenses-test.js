const assert = require('assert');
const mocha = require('mocha');

const lenses = require('../lib/helpers/lenses');

  // notFound
  describe('getQuery', () => {
    it('should return undefined when query is not available on the object', () => {
      const { getQuery } = lenses;
      assert.strictEqual(getQuery(null), undefined);
      assert.strictEqual(getQuery([]), undefined);
      assert.strictEqual(getQuery({}), undefined);
      assert.strictEqual(getQuery({que: 'A string'}), undefined);
    });
  });
