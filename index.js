const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const routes = require('./lib/routes');
const config = require('./config');

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
console.log('end', buffer)
      // choose handler
      const chosenHandler = routes[trimmedPath] || routes.notFound;

      // Data to send to handler
      const data = {
        trimmedPath,
        query,
        method,
        headers,
        payload: buffer // helpers.jsonToObject(buffer)
      };

      chosenHandler(data, function(status, payload) {
        response.setHeader('Content-Type', 'application/json'); // Need this to take different headers
        response.writeHead(Number(status) || 200);
        response.end(JSON.stringify(typeof payload === 'object' ? payload : {}));

        console.log('Return response', status, payload);
      });
    });
};

// Create HTTP Server
http.createServer(server)
  .listen(config.port.http, function() {
    console.log('The server is listening on port', config.port.http);
  });
