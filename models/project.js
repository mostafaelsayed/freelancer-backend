const db = require('./database').createConnection();
const util = require('util');
const utilOptions = { depth: null };

module.exports = {
  getProjects: function(userId, callback) {
    let query = `select * from test.projects where user_id = '${userId}';`;

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
  getProjectById: function(projectId, userId, callback) {
    let query = `select * from test.projects where id = '${projectId}' and user_id = '${userId}';`;

    db.query(query, function(err, result) {
        if (!err) {
          console.log('success get project by id');
          callback(undefined, result.rows[0]);
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