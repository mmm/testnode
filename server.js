//require.paths.unshift(__dirname + '/lib');
//require.paths.unshift(__dirname);

var config = require('./config/config'),
    mongo = require('mongodb'),
    http = require('http');

db = new mongo.Db('mynodeapp', new mongo.Server(config.mongo_host, config.mongo_port, {}), {});

db.addListener("error", function(error) {
  console.log("Error connecting to mongo -- perhaps it isn't running?");
});

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(config.listen_port);

// Put a friendly message on the terminal
console.log("Server running at http://0.0.0.0:8000/");

