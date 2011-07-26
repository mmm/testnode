//require.paths.unshift(__dirname + '/lib');
//require.paths.unshift(__dirname);

var config = require('./config/config'),
    mongo = require('mongodb'),
    http = require('http');

db = new mongo.Db('mynodeapp', new mongo.Server(config.mongo_host, config.mongo_port, {}), {});
db.addListener("error", function(error) {
  console.log("Error connecting to mongo");
});

var hit = function(request, response){
  db.connect(mongourl, function(err, connection){
    connection.collection('addresses', function(err, collection){
      hit_record = { 'ip': request.connection.remoteAddress, 'ts': new Date() };

      collection.insert( hit_record, {safe:true}, function(err){
        if(err) { 
          console.log(err.stack);
        }
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(JSON.stringify(object_to_insert));
        response.end("Hello " + request.connection.remoteAddress + "\n");
      });
    });
  });
}

var show_hits = function(request, response){
  db.connect(mongourl, function(err, connection){
    connection.collection('addresses', function(err, collection){
      collection.find({}, {limit:10, sort:[['_id','desc']]}, function(err, cursor){
        cursor.toArray(function(err, items){
          res.writeHead(200, {'Content-Type': 'text/plain'});
          for(i=0; i<items.length;i++){
            res.write(JSON.stringify(items[i]) + "\n");
          }
          res.end();
        });
      });
    });
  });
}



var server = http.createServer(function (request, response) {
  var address = request.connection.remoteAddress;

  var url = require('url').parse(req.url);

  if(url.pathname === '/list') {
    show_hits(request, response);
  } else {
    hit(request, response);
  }

});
server.listen(config.listen_port);

console.log("Server running at http://0.0.0.0:8000/");

