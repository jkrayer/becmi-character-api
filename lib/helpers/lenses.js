const R = require('ramda');

// Object -> a
const getArmorIds = R.view(R.lensPath(['armor', 'ids']));

// Object -> a
const getClassName = R.view(R.lensProp('name'));

// Object -> a
const getHttpPort = R.view(R.lensProp('httpPort'));

// Object -> a
const getHttpsPort = R.view(R.lensProp('httpsPort'));

// Object -> a
const getQuery = R.view(R.lensProp('query'));

// Object -> a
const getWeaponIds = R.view(R.lensPath(['weapons', 'ids']));

module.exports = {
    getArmorIds,
    getClassName,
    getHttpPort,
    getHttpsPort,
    getQuery,
    getWeaponIds
}
