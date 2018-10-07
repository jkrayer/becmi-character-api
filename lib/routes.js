const { whatCanIBe } = require('./helpers');

module.exports = {
  notAllowed: (data, cb) => cb({}, 405),
  notFound: function notFound (data, cb) { return cb({message: 'The path you requested can not be found.'}, 404); },
  api: {
    scores: {
      post: (data, cb) => cb(whatCanIBe(data.payload))
    }
  }
};
