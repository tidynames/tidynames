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

function lookup(name)  {
  
}

app.get('/lookup', function (req, res) {
	if (req.query.name)  {
        var parts = req.query.name.split(' ');
        for (p in parts)  {
            //lookup(parts[p].replace(/\s/g, '').toLower());
        }
    }
	res.send('Hello World!');
});

var addHandler = require('./app/action/add');
app.post('/add', addHandler);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
