const environmentVariables = {
  development: {
    httpPort: process.env.PORT || 3000,
    httpsPort: process.env.PORT || 3001,
    hostname: '127.0.0.1'
  },
  production: {
    httpPort: 80,
    httpsPort: 80,
    hostname: 'becmi-api.herokuapp.com'
  }
};

const environment = process.env.NODE_ENV || '';

module.exports = environmentVariables[environment] || environmentVariables.development;
