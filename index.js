const config = require('./config');
const { init } = require('./lib/server');

init(config);

module.exports = init;
