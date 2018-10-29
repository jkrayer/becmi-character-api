const assert = require('assert');
const mocha = require('mocha');

const routes = require('../lib/routes');

  function callback(...a) {
    return a;
  }

  // notFound
  const { notFound } = routes;
  assert.deepStrictEqual(notFound(undefined, null), [{message: 'The path you requested can not be found.'}, 404]);
