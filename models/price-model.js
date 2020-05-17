const db = require('../database/connection').createConnection();
const util = require('util');
const utilOptions = { depth: null };

module.exports = {

    getPriceModels: function(callback) {
        const query = `select * from ${db.schema}."priceModels";`;
    
        db.client.query(query, function(err, result) {
          if (!err) {
            console.log('success getPriceModels in model');
            callback(undefined, result.rows);
          }
          else {
            console.log('error getPriceModels in model : ', util.inspect(err, utilOptions));
            callback(1);
          }
        });
    },

    addPriceModel: function(priceModelData, callback) {
        const values = [priceModelData.name];
        const query = `insert into ${db.schema}."priceModels"("name") values ($1) Returning "id";`;
    
        db.client.query(query, values, function(err, result) {
          if (!err) {
            console.log('success addPriceModel in model');
            callback(undefined, {
                id: result.rows[0]['id']
            });
          }
          else {
            console.log('error addPriceModel in model : ', util.inspect(err, utilOptions));
            callback(1);
          }
        });
    },

    getPriceModelyById: function(id, callback) {
      const values = [id];
      const query = `select * from ${db.schema}."priceModels" where id = $1;`;

      db.client.query(query, values, function(err, result) {
        if (!err) {
          console.log('success getPriceModelyById in model');
          callback(undefined, result.rows[0]);
        }
        else {
          console.log('error getPriceModelyById in model : ', util.inspect(err, utilOptions));
          callback(1);
        }
      });
    },

    editPriceModel: function(priceModelData, callback) {
      const values = [priceModelData.name, priceModelData.id];
      const query = `update ${db.schema}."priceModels" set name = $1 where id = $2;`;

      db.client.query(query, values, function(err, result) {
        if (!err) {
          console.log('success editPriceModel in model');
          callback(undefined, 1);
        }
        else {
          console.log('error editPriceModel in model : ', util.inspect(err, utilOptions));
          callback(1);
        }
      });
    },

    deletePriceModel: function(id, callback) {
      const values = [id];
      const query = `delete from ${db.schema}."priceModels" where id = $1`;

      db.client.query(query, values, function(err, result) {
        if (!err) {
          console.log('success deletePriceModel in model');
          callback(undefined, 1);
        }
        else {
          console.log('error deletePriceModel in model : ', util.inspect(err, utilOptions));
          callback(1);
        }
      });
    }

}