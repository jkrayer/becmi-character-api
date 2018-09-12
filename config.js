const environmentVariables = {
  development: {
    httpPort: 3000,
    // httpsPort: 3001,
    hostname: '127.0.0.1',
    root: 'http://localhost:3000/'
  },
  production: {
    httpPort: 80,
    httpsPort: 443
  }
};

const environment = process.env.NODE_ENV || '';

module.exports = environmentVariables[environment] || environmentVariables.development;
