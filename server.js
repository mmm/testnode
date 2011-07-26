//require.paths.unshift(__dirname + '/lib');
//require.paths.unshift(__dirname);

var config = require('./config/config'),
    mongo = require('mongodb'),
    http = require('http');

db = new mongo.Db('mynodeapp', new mongo.Server(config.mongo_host, config.mongo_port, {}), {});
db.addListener("error", function(error) {
  console.log("Error connecting to mongo");
});

var server = http.createServer(function (request, response) {
  var address = request.connection.remoteAddress;

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello " + address + "\n");
});
server.listen(config.listen_port);

console.log("Server running at http://0.0.0.0:8000/");

