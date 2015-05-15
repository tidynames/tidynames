var express = require('express');
var app = express();

var SQL = require('./app/modules/sql');

app.get('/', function (req, res) {
	SQL.query("SELECT * FROM name", [], function(result) {
  		res.send('it works!');

  		console.log(result);
  	}); 
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
