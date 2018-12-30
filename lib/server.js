const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const routes = require('./routes');
const fs =require('fs');
const path = require('path');
const R = require('ramda');

const { isNumeric } = require('./helpers/contracts');
const { getHttpPort, getHttpsPort } = require('./helpers/lenses');

const toPathArray = R.pipe(
  R.replace(/^\/+|\/+$/g, ''), // leading and trailing slashes
  R.split('/')
);

const getRoute = R.view(R.__, routes);

function server(request, response) {
  const { headers, method } = request; // HTTP request method: GET, POST...
  const { pathname, query } = url.parse(request.url, true);
  const pathArray = toPathArray(pathname).concat(method.toLowerCase());
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  // Payload?
  request
    .on('data', data => buffer += decoder.write(data))
    .on('end', () => {
      buffer += decoder.end()

      const controller = getRoute(R.lensPath(pathArray)) || routes.notFound;

      // controller
      controller(
        {
          query,
          method,
          headers,
          payload: JSON.parse(buffer || '{}')
        },
        (payload, status = 200) => {
          response.writeHead(
            status,
            {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          );
          response.end(JSON.stringify(typeof payload === 'object' ? payload : {}));
          // default payload
          console.log('Return response', status, payload);
        }
      );
    });
};

//

// --
function createHttpServer(http, config) {
  http.createServer(server).listen(
    config.httpPort,
    config.hostname,
    () => {
      console.log(`Server running at http://${config.hostname}:${config.httpPort}/`);
    }
  );
}

// function createHttpsServer(https, config) {
//   https.createServer(
//     {
//       key: fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
//       cert: fs.readFileSync(path.join(__dirname, './https/cert.pem'))
//     },
//     server
//   ).listen(
//     config.httpsPort,
//     () => {
//       console.log(`Server running at https://${config.hostname}:${config.httpsPort}/`);
//     }
//   );
// }

module.exports = {
  init: R.pipe(
    R.when(
      R.pipe(getHttpPort, isNumeric), // R.where?
      R.partial(createHttpServer, [require('http')])
    )
    // ,
    // R.when(
    //   R.pipe(getHttpsPort, isNumeric), // R.where?
    //   R.partial(createHttpsServer, [require('https')])
    // )
  )
};
