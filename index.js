global.rootPath = __dirname;

var express = require('express');
var bodyParser = require("body-parser");
var matcher = require('clj-fuzzy');

var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/View'));

app.get('/',function(req, res){
	res.sendFile('index.html');
});

var addHandler = require('./app/action/add');
app.post('/add', addHandler);

var lookupHandler = require('./app/action/lookup');
app.get('/lookup', lookupHandler);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
