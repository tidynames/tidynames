var SQL = require(global.rootPath + '/app/modules/sql');
var matcher = require('clj-fuzzy');
var Promise = require('promise');
var THRESHOLD = 2;

module.exports = function(req, res){
    findBestMatches(req.query.name).then(function(bestMatches)  {
		var pairs = [];
        for (i = 0; i < bestMatches[0].length; i++)  {
            for (j = 0; j < bestMatches[1].length; j++) {
				pairs.push([bestMatches[0][i], bestMatches[1][j]]);
				pairs.push([bestMatches[1][j], bestMatches[0][i]]);
            }
        }
		return pairs;

    }).then(function(pairs)  {
		var promises = [];
		for (p in pairs)  {
			promises.push(lookupFullNameByNamePair(pairs[p]));
		}
		return Promise.all(promises);
	}).then(function(result) {
		res.send(result);
	});
};

function findBestMatches(name)  {
    var promises = [];
    if (name)  {
        var parts = name.split(' ');
        if (parts.length >= 2)  {
	        promises.push(lookupInDb(parts[0].trim().toLowerCase()));
	        promises.push(lookupInDb(parts[1].trim().toLowerCase()));
        }
    }
    return Promise.all(promises);
}

function lookupInDb(name, type)  {
    return SQL.query("SELECT id, value, type FROM name").then(function(result) {
      var matches = [];
      for (r in result.rows)  {
         var score = matcher.metrics.levenshtein(name, result.rows[r].value);
         if (score <= THRESHOLD)  {
             matches.push([result.rows[r], score]);
         }
      }
      return matches;
    });
}

function lookupFullNameByNamePair(pair) {
	return SQL.query("SELECT name_ids[1] n1, name_ids[2] n2" +
	"	FROM (" +
	"		SELECT array_agg(name_id ORDER BY ordering, n.type) AS name_ids" +
	"	FROM full_name fn" +
	"	JOIN name n ON n.id = fn.name_id" +
	"	GROUP BY person_id" +
	") as sub" +
	"	WHERE name_ids[1] = $1 AND name_ids[2] = $2" +
	"	", [pair[0][0].id, pair[1][0].id]).then(function(res) {
		return res.rows[0] ? [pair[0][0].value + ' ' + pair[1][0].value, pair[0][1] + pair[1][1]] : undefined;
	});
}
