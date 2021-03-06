const environmentVariables = {
  development: {
    httpPort: process.env.PORT || '3000',
    httpsPort: process.env.PORT || '3001',
    hostname: '127.0.0.1'
  },
  production: {
    httpPort: process.env.PORT || '80',
    httpsPort: process.env.PORT || '80',
    hostname: '72.79.22.130'
  }
};

const environment = process.env.NODE_ENV || '';

module.exports = environmentVariables[environment] || environmentVariables.development;
