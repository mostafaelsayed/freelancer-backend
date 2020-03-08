const db = require('../database/connection').createConnection();
const util = require('util');
const utilOptions = { depth: null };

module.exports = {
  getProjects: function(userId, callback) {
    const query = `select * from ${db.schema}.projects where user_id = '${userId}';`;

    db.client.query(query, function(err, result) {
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
    const query = `select * from ${db.schema}.projects where id = '${projectId}' and user_id = '${userId}';`;

    db.client.query(query, function(err, result) {
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
    const query = `insert into ${db.schema}.projects(name, description, user_id) values ('${projectData.name}', '${projectData.description}', '${projectData.user_id}')`;

    db.client.query(query, function(err) {
      if (!err) {
        console.log('success add project');
        callback();
      }
      else {
        console.log('error add project : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },

  editProject: function(projectData, callback) {
    const query = `update ${db.schema}.projects set name = '${projectData.name}', description = '${projectData.description}' where id = '${projectData.id}' and user_id = '${projectData.user_id}';`;

    db.client.query(query, function(err) {
      if (!err) {
        console.log('success edit project');
        callback();
      }
      else {
        console.log('error edit project : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },

  deleteProject: function(projectData, callback) {
    const query = `delete from ${db.schema}.projects where id = '${projectData.id}' and user_id = '${projectData.user_id}';`;

    db.client.query(query, function(err) {
      if (!err) {
        console.log('success delete project');
        callback();
      }
      else {
        console.log('error delete project : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  }
};