var pg = require('pg');
var config = require('../../config');
var Promise = require('promise');

var SQL = {
  conString : "postgres://" + 
              config.SQL.user + ":" + 
              config.SQL.password + "@" + 
              config.SQL.host + "/" + 
              config.SQL.database
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


SQL.query = function(query, params) {
  return new Promise(function (resolve, reject) {
    SQL.client.query(query, params || [], function(err, result) {
        //call `done()` to release the client back to the pool
        SQL.done();

        if(err) {
          reject(err)
        } else {
          resolve(result);
        }
      });
  });
};

module.exports = SQL;
