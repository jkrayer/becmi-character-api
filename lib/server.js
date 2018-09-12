const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// const handlers = require('./handlers')
// const tokens = require('./tokens');
// const helpers = require('./helpers');

const http = require('http');
const https = require('https');
const config = require('../config');
const fs =require('fs');
const path = require('path');
console.log(13, config)
// // Router
// const router = {
//   ping: handlers.ping,
//   users: handlers.users,
//   tokens
// };

//
function server(request, response) {
  const { headers, method } = request; // HTTP request method: GET, POST...
  const { pathname, query } = url.parse(request.url, true);
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, ''); // leading and trailing slashes
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  // Payload?
  request
    .on('data', data => buffer += decoder.write(data))
    .on('end', () => {
      buffer += decoder.end()

console.log(34, buffer);
// !router.path 404
// !router.path.method 405
// !router[path] ? routes.404 : router[path][method] ? routes.405 : router[path][method];

      // choose handler
      const chosenHandler = (d, cb) => {
        console.log(42, d, cb);
        cb(200, {data:''})
      }; // router[trimmedPath] || handlers.notFound;

      // Data to send to handler
      const data = {
        trimmedPath,
        query,
        method,
        headers,
        payload: helpers.jsonToObject(buffer)
      };

      chosenHandler(data, function(status, payload) {
        // status || 200
        status = typeof status === 'number' ? status : 200;
        payload = JSON.stringify(typeof payload === 'object' ? payload : {});

        response.setHeader('Content-Type', 'application/json');
        response.writeHead(status);
        response.end(payload);
        // default payload
        console.log('Return response', status, payload);
      });
    });
};

function init() {
  http.createServer(server).listen(
    config.httpPort,
    config.hostname,
    () => {
      console.log(`Server running at http://${config.hostname}:${config.httpPort}/`);
    }
  );

  if (config.httpsPort) {
    https.createServer(
      {
        key: fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, './https/cert.pem'))
      },
      server
    ).listen(
      config.httpsPort,
      () => {
        console.log(`Server running at https://${config.hostname}:${config.httpsPort}/`);
      }
    );
  }
}

module.exports = {
  init
};
