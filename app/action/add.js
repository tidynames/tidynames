var SQL = require(global.rootPath + '/app/modules/sql');
var Promise = require('promise');

function addName(name, type) {
	return SQL.query("INSERT INTO name(value, type) VALUES($1, $2);", [name, type]);
}


module.exports = function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;

	var promises = [];

	firstName.toLowerCase().split(' ').forEach(function(name) {
		if(!name.length) {
			return;
		}
		promises.push(addName(name, 'F'));
	});

	lastName.toLowerCase().split(' ').forEach(function(name) {
		if(!name.length) {
			return;
		}
		promises.push(addName(name, 'L'));
	});

	var name = lastName + ', ' + firstName;

	Promise.all(promises)
		.then(function(result) {
			res.end(name);
		})
		.catch(function(err) {
			res.end(err);
		});
}