
module.exports = {
  notAllowed: (data, cb) => cb({}, 405),
  notFound: (data, cb) => cb({}, 404),
  api: {}
};
