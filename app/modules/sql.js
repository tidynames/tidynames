var pg = require('pg');
var config = require('../../config');

var SQL = {
  conString : "postgres://" + 
              config.SQL.user + ":" + 
              config.SQL.password + "@" + 
              config.SQL.host + "/" + 
              config.SQL.database,

  defaultErrorHandler : function(error) {
    console.error('error running query', err);
  }
};


//this starts initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(SQL.conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }

  SQL.client = client;
  SQL.done = done;
});


SQL.query = function(query, params, successHandler, errorHandler) {
  SQL.client.query(query, params || [], function(err, result) {
      //call `done()` to release the client back to the pool
      SQL.done();

      if(err) {
        return (errorHandler || SQL.defaultErrorHandler)(err);
      }
      successHandler(result);
    });
};

module.exports = SQL;
