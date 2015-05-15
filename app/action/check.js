var validator = require(global.rootPath + '/app/modules/validator');

module.exports = function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;

	var response = '';

	validator.checkMismatch(firstName, lastName).then(function(mismatches) {
		var types = { 'F': 'firstname', 'L' : 'lastname' };

		if(Object.getOwnPropertyNames(mismatches).length) {
			Object.getOwnPropertyNames(mismatches).forEach(function(type) {
				response += 'Are you sure it is a ' + types[type] + ': ' + mismatches[type].join(', ') + "\n";
			});

			res.end(response);
		} else {
			res.end('Name looks just fine');
		}
	});
}