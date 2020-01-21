const db = require('./database').createConnection();
const util = require('util');
const utilOptions = { depth: null };

module.exports = {
  getUsers: function(callback) {
    db.view('general', 'users', {
      'include_docs': true
    }, function(err, result) {
      if (!err) {
        callback(undefined, result);
      }
      else {
        console.log('error get users : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },
  addUser: function(userData, callback) {
    db.insert(userData, userData.email, function(err) {
      if (!err) {
        callback();
      }
      else {
        console.log('error add user : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  }
};