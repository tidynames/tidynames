var SQL = require(global.rootPath + '/app/modules/sql');
var Promise = require('promise');

function checkSame(name, type) {
	return SQL.query("SELECT count(*) FROM name WHERE value=$1 AND type=$2 GROUP BY value;", [name, type]);
}

function checkOther(name, type) {
	return SQL.query("SELECT count(*) FROM name WHERE value=$1 AND type!=$2 GROUP BY value;", [name, type]);
}



module.exports = {
	
	checkMismatch : function(firstName, lastName) {

		return new Promise(function (resolve, reject) {

			var promises = [];

			var names = [];

			firstName.toLowerCase().split(' ').forEach(function(name) {
				if(name.length < 2) {
					return;
				}
				promises.push(checkSame(name, 'F'));
				promises.push(checkOther(name, 'F'));
				names.push({ name: name, type: 'F' });
			});
			
			lastName.toLowerCase().split(' ').forEach(function(name) {
				if(name.length < 2) {
					return;
				}
				promises.push(checkSame(name, 'L'));
				promises.push(checkOther(name, 'L'));
				names.push({ name: name, type: 'L' });
			});

			Promise.all(promises)
				.then(function(results) {
					var mismatched = {};

					for(var i = 1; i < results.length; i+=2) {
						if(results[i-1].rowCount < results[i].rowCount) {
							var namesDetails = names[(i-1)/2];
							(mismatched[namesDetails.type] || (mismatched[namesDetails.type] = []))
								.push(namesDetails.name);
						}
					}
					resolve(mismatched);
				})
				.catch(function(err) {
					reject(err)
				});
		});
	}
}