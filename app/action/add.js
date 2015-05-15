var SQL = require(global.rootPath + '/app/modules/sql');
var Promise = require('promise');

function addName(name, type) {
	return SQL.query("INSERT INTO name(value, type) VALUES($1, $2) returning id", [name, type]);
}


module.exports = function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;

	var promises = [];
	var personId = parseInt(Math.random() * 1000000);
	firstName.toLowerCase().split(' ').forEach(function(name) {
		if(!name.length) {
			return;
		}
		promises.push(addName(name, 'F').then(function(id)  {
			return SQL.query("INSERT INTO full_name(person_id, name_id, ordering) VALUES($1, $2, 1)", [personId, id.rows[0].id])
		}));
	});

	lastName.toLowerCase().split(' ').forEach(function(name) {
		if(!name.length) {
			return;
		}
		promises.push(addName(name, 'L').then(function(id)  {
			return SQL.query("INSERT INTO full_name(person_id, name_id, ordering) VALUES($1, $2, 2)", [personId, id.rows[0].id])
		}));
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