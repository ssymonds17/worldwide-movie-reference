// Imports modules for http, fs and url
const http = require('http'),
  fs = require('fs'),
  url = require('url');

// Sets up the local server
http.createServer((request, response) => {
  let addr = request.url,
  q = url.parse(addr, true),
  filePath = '';

  // If pathname includes documentation then
  // return the documentation/html file, if not then index.html
  if (q.pathname.includes('documentation')) {
    filePath = './documentation.html';
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }

    response.writeHead(200, {'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

  // Add instance of server request to log.txt file with URL and timestamp
  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' +
   new Date() + '\n\n', function(err) {
     if (err) {
       console.log(err);
     } else {
       console.log('Added to log.');
     }
   })

// Port 8080
}).listen(8080);

console.log('Server is up and running');
