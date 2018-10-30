const R = require('ramda');

// Object -> a
const getQuery = R.view(R.lensProp('query'));

module.exports = {
    getQuery
}
