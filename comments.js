// Create web server
// Run: node comments.js
// Load in browser: http://localhost:3000

var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];

var server = http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;

  if (path === '/post') {
    comments.push(query.comment);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Success');
  } else if (path === '/get') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(comments));
  } else {
    fs.readFile(__dirname + '/index.html', function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  }
});

server.listen(3000);
console.log('Server listening on port 3000');