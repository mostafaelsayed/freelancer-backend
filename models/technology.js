const db = require('../database/connection').createConnection();
const util = require('util');
const utilOptions = { depth: null };

module.exports = {

    getTechnologies: function(callback) {
        const query = `select * from ${db.schema}."technologies";`;
    
        db.client.query(query, function(err, result) {
          if (!err) {
            console.log('success get technologies in model');
            callback(undefined, result.rows);
          }
          else {
            console.log('error get technologies in model : ', util.inspect(err, utilOptions));
            callback(1);
          }
        });
    },

    addTechnology: function(technologyData, callback) {
        const values = [technologyData.name];
        const query = `insert into ${db.schema}."technologies"("name") values ($1) Returning "id";`;
    
        db.client.query(query, values, function(err, result) {
          if (!err) {
            console.log('success add technology in model');
            callback(undefined, {
                id: result.rows[0]['id']
            });
          }
          else {
            console.log('error add technology in model : ', util.inspect(err, utilOptions));
            callback(1);
          }
        });
    },

    getTechnologyById: function(id, callback) {
      const values = [id];
      const query = `select * from ${db.schema}."technologies" where id = $1;`;

      db.client.query(query, values, function(err, result) {
        if (!err) {
          console.log('success getTechnologyById in model');
          callback(undefined, result.rows[0]);
        }
        else {
          console.log('error getTechnologyById in model : ', util.inspect(err, utilOptions));
          callback(1);
        }
      });
    },

    editTechnology: function(technologyData, callback) {
      const values = [technologyData.name, technologyData.id];
      const query = `update ${db.schema}."technologies" set name = $1 where id = $2;`;

      db.client.query(query, values, function(err, result) {
        if (!err) {
          console.log('success editTechnology in model');
          callback(undefined, 1);
        }
        else {
          console.log('error editTechnology in model : ', util.inspect(err, utilOptions));
          callback(1);
        }
      });
    },

    deleteTechnology: function(id, callback) {
      const values = [id];
      const query = `delete from ${db.schema}."technologies" where id = $1`;

      db.client.query(query, values, function(err, result) {
        if (!err) {
          console.log('success deleteTechnology in model');
          callback(undefined, 1);
        }
        else {
          console.log('error deleteTechnology in model : ', util.inspect(err, utilOptions));
          callback(1);
        }
      });
    }

}