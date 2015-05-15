var SQL = require(global.rootPath + '/app/modules/sql');

module.exports = function(req, res){
    var bestMatches = [];
	if (req.query.name)  {
        bestMatches = lookup(req.query.name);
    }

	res.send(bestMatches);
}

function lookupInDb(name)  {
    // for n in select * from name
    //   levenshtein(name, n)
    //   if score < threshold
    //     append (n, score) to the return list
}

function lookup(name)  {
    var matches = [];
    var parts = name.split(' ');
    for (p in parts)  {
        console.log('Looking up', parts[p]);
        matches.push(lookupInDb(parts[p].replace(/\s/g, '').toLowerCase()));
    }
    return matches;  
}
