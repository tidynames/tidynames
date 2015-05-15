var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/lookup', function (req, res) {
	console.log('name: ' + req.query.name);
	res.send('Hello World!');
});

app.post('/add',function(req, res){
	var name = req.body.name;
	console.log(name);
	res.end("some information");
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
