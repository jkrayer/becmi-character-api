const api = require('./controllers/');

module.exports = {
  notFound: (data, cb) => cb({message: 'The path you requested can not be found.'}, 404),
  api
};
