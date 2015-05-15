var SQL = require(global.rootPath + '/app/modules/sql');
var matcher = require('clj-fuzzy');
var Promise = require('promise');

module.exports = function(req, res){
    findBestMatches(req.query.name).then(function(bestMatches)  {
        res.send(bestMatches);
    });
}

function findBestMatches(name)  {
    var promises = [];
    if (name)  {
        var parts = name.split(' ');
		for (p in parts)  {
            if (parts[p].trim())  {
		        promises.push(lookupInDb(parts[p].trim().toLowerCase()));
            }
		}
    }
    return Promise.all(promises);
}

function lookupInDb(name)  {
    return SQL.query("SELECT value FROM name").then(function(result) {
      var matches = [];
      for (r in result.rows)  {
         var score = matcher.metrics.levenshtein(name, result.rows[r].value);
         matches.push([result.rows[r].value, score]);
      }
      return matches;
    });
}
