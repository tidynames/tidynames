var SQL = require(global.rootPath + '/app/modules/sql');

function addName(name, type) {
	return SQL.query("INSERT INTO name(value, type) VALUES($1, $2);", [name, type]);
}


module.exports = function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;

	firstName.toLowerCase().split(' ').forEach(function(name) {
		name.length && addName(name, 'F');
	});

	lastName.toLowerCase().split(' ').forEach(function(name) {
		name.length && addName(name, 'L');
	});

	var name = lastName + ', ' + firstName;

	console.log(name);
	res.end(name);
}