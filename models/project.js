const db = require('../database/connection').createConnection();
const util = require('util');
const utilOptions = { depth: null };

module.exports = {
  getProjects: function(userId, callback) {
    const query = `select * from ${db.schema}.projects where user_id = '${userId}';`;

    db.client.query(query, function(err, result) {
      if (!err) {
        console.log('success get projects');
        callback(undefined, result.rows);
      }
      else {
        console.log('error get projects : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },
  getAssignedProjects: function(userId, callback) {
    const query = `select * from ${db.schema}.user_projects where assigned_user_id = '${userId}';`;

    db.client.query(query, function(err, result) {
      if (!err) {
        console.log('success get assigned projects');
        callback(undefined, result.rows);
      }
      else {
        console.log('error get assigned projects : ', util.inspect(err, utilOptions));
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
    const query = `insert into ${db.schema}.projects(name, description, user_id) values ('${(projectData.name).trim()}', '${(projectData.description).trim()}', '${projectData.user_id}')`;

    db.client.query(query, function(err, result) {
      if (!err) {
        console.log('add project result : ', util.inspect(result, utilOptions));
        const query2 = `insert into ${db.schema}.user_projects(user_id, project_id) values('${projectData.user_id}', '${result.id}')`
        
        db.client.query(query2, function(err2, result2) {
          if (!err2) {
            console.log('success add project : ', result);
            callback();
          }
          else {
            console.log('error add project : ', util.inspect(err, utilOptions));
            callback(1);
          }
        });
        
      }
      else {
        console.log('error add project : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },

  editProject: function(projectData, callback) {
    const query = `update ${db.schema}.projects set name = '${(projectData.name).trim()}', description = '${(projectData.description).trim()}' where id = '${projectData.id}' and user_id = '${projectData.user_id}';`;

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