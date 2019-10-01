let db = require('./database').createConnection();
let util = require('util');

module.exports = {
  getProjects: function(req, callback) {
    let selector = {
      "selector": {
        "owner": req.session.user.email
      }
    }
    db.find(selector, function(err, result) {
        if (!err) {
          callback(undefined, result);
        }
        else {
          console.log('error get projects : ', util.inspect(err, utilOptions));
          callback(1);
        }
    });
  },
  addProject: function(projectData, callback) {
    db.insert(projectData, projectData.name, function(err) {
        if (!err) {
            callback();
        }
        else {
            console.log('error add project : ', util.inspect(err, utilOptions));
            callback(1);
        }
    });
  }
};