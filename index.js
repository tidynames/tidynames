var express = require('express');
var bodyParser = require("body-parser");
var matcher = require('clj-fuzzy');
var path    = require("path");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/index.html'));
});

function lookup(name)  {
  
}

app.get('/lookup', function (req, res) {
	if (req.query.name)  {
        var parts = req.query.name.split(' ');
        for (p in parts)  {
            lookup(parts[p].replace(/\s/g, '').toLower());
        }
    }
	res.send('Hello World!');
});

app.post('/add',function(req, res){
	var name = req.body.name;
	console.log(name);
	res.end("some information");
});

app.get('/:name?', function (req, res) {
  if (req.params.name)  {
      var dummy = 'John';
      var result = "Dice: " +
	  clj_fuzzy.metrics.dice(req.params.name, dummy) + "<br>" +
      "Sorensen: " +
	  clj_fuzzy.metrics.sorensen(req.params.name, dummy) + "<br>" +
      "Levenshtein: " +
	  clj_fuzzy.metrics.levenshtein(req.params.name, dummy) + "<br>" +
      "Hamming: " +
	  clj_fuzzy.metrics.hamming(req.params.name, dummy) + "<br>" +
      "Jaccard: " +
	  clj_fuzzy.metrics.jaccard(req.params.name, dummy) + "<br>" +
      "Tanimoto: " +
	  clj_fuzzy.metrics.tanimoto(req.params.name, dummy) + "<br>" +
      "Jaro: " +
	  clj_fuzzy.metrics.jaro(req.params.name, dummy) + "<br>" +
      "Jaro-Winckler: " +
	  clj_fuzzy.metrics.jaro_winkler(req.params.name, dummy) + "<br>" +
      "MRA: " +
	  clj_fuzzy.metrics.mra_comparison(req.params.name, dummy) + "<br>" +
      "Tversky: " +
	  clj_fuzzy.metrics.tversky(req.params.name, dummy);
      res.send(result);
  }
  else  {
    res.send('Please specify a word to check!');
  }

});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
