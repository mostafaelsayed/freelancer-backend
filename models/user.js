const util = require('util');
const utilOptions = { depth: null };
const db = require('../database/connection').createConnection();

module.exports = {
  getUsers: function(callback) {
    let query = `select * from ${db.schema}.users`;

    db.client.query(query, (err, success) => {
      if (!err) {
        console.log('success get all users');
        callback(undefined, success);
      }
      else {
        console.log('error get all users : ', util.inspect(err, utilOptions));
        callback('error get all users');
      }
    });
  },
  addUser: function(userData, callback) {
    let query = `insert into ${db.schema}.users(email, password_hash) values('${userData.inputEmail}', '${userData.hash}') returning *;`;

    db.client.query(query, (err, success) => {
      if (!err) {
        console.log('success add user');
        callback(undefined, success);
      }
      else {
        console.log('error add user : ', util.inspect(err, utilOptions));
        callback('error add user');
      }
    });
  },
  getUser: function(inputEmail, callback) {
    let query = `select * from ${db.schema}.users where email = '${inputEmail}';`;

    db.client.query(query, (err, success) => {
      if (err) {
        callback('error find user');
      }
      else {
        callback(undefined, success);
      }
    });

  }
};