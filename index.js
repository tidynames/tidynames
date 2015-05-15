var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var matcher = require('clj-fuzzy');

app.use(bodyParser.urlencoded({ extended: false }));

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