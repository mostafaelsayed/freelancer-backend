let db = require('./database').createConnection();
let util = require('util');

module.exports = {
  getProjects: function(req, callback) {
    let query = `select * from test.projects where user_id = '${req.session.user.id}';`;

    db.query(query, function(err, result) {
        if (!err) {
          console.log('success get all projects');
          callback(undefined, result.rows);
        }
        else {
          console.log('error get projects : ', util.inspect(err, utilOptions));
          callback(1);
        }
    });
  },
  getProject: function(name, callback) {
    let selector = {
      "selector": {
        "name": name
      }
    }
    db.find(selector, function(err, result) {
        if (!err) {
          callback(undefined, result.docs[0]);
        }
        else {
          console.log('error get projects : ', util.inspect(err, utilOptions));
          callback(1);
        }
    });
  },
  addProject: function(projectData, callback) {
    let query = `insert into test.projects(name, description, user_id) values ('${projectData.name}', '${projectData.description}', '${projectData.user_id}')`;

    db.query(query, function(err) {
        if (!err) {
          console.log('success add project');
            callback();
        }
        else {
            console.log('error add project : ', util.inspect(err, utilOptions));
            callback(1);
        }
    });
  }
};