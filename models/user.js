var db = require('./database').createConnection().db;

module.exports = {
  getFreelancers: function(callback) {
    db.view('users', 'freelancers', {
      'include_docs': true
    }, function(err, result) {
      callback(err, result);
    });
  },
  addFreelancer: function(freelancerDoc, callback) {
    db.insert(freelancerDoc, freelancerDoc.email, function(err, result) {
      callback(err, result);
    });
  }
};