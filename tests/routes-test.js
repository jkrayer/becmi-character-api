const assert = require('assert');
const mocha = require('mocha');

const routes = require('../lib/routes');

function callback(...a) {
  return a;
}

  // notFound
  describe('notFound', () => {
    it('should return an error message and a 404 code', () => {
      const { notFound } = routes;
      assert.deepStrictEqual(notFound(undefined, callback), [{message: 'The path you requested can not be found.'}, 404]);
    });
  });
