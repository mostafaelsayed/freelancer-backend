const db = require('../database/connection').createConnection();
const util = require('util');
const utilOptions = { depth: null };

module.exports = {
  getTechnologies: function(callback) {
    const query = `select * from ${db.schema}.technologies;`;

    db.client.query(query, function(err, result) {
      if (!err) {
        console.log('success get technologies in model');
        callback(undefined, result.rows);
      }
      else {
        console.log('error get technologies in model : ', util.inspect(err, utilOptions));
        callback(1);
      }
    })
  },
  getProjects: function(userId, callback) {
    const query = `select * from ${db.schema}.projects where user_id = '${userId}';`;

    db.client.query(query, function(err, result) {
      if (!err) {
        console.log('success get projects in model');
        callback(undefined, result.rows);
      }
      else {
        console.log('error get projects in model : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },
  getSpecificProjects: function(callback) {
    const query = `select * from ${db.schema}.projects;`;

    db.client.query(query, function(err, result) {
      if (!err) {
        console.log('success get specific projects in model');
        callback(undefined, result.rows);
      }
      else {
        console.log('error get specific projects in model : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },
  getAssignedProjects: function(userId, callback) {
    const query = `select * from ${db.schema}.user_projects where assigned_user_id = '${userId}';`;

    db.client.query(query, function(err, result) {
      if (!err) {
        console.log('success get assigned projects in model in model');
        callback(undefined, result.rows);
      }
      else {
        console.log('error get assigned projects in model : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },
  getProjectById: function(projectId, callback, user_id) {
    let query = '';

    if (user_id) {
      query = `select * from ${db.schema}.projects where id = '${projectId}'
        and user_id = '${user_id}';`;
    }
    else {
      query = `select * from ${db.schema}.projects where id = '${projectId}';`;
    }

    db.client.query(query, function(err, result) {
      if (!err) {
        console.log('success get project by id in model');
        callback(undefined, result.rows[0]);
      }
      else {
        console.log('error get projects in model : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },
  addProject: function(projectData, callback) {
    const values = [projectData.name.trim(), projectData.description.trim(),
      projectData.user_id, projectData.technologies];
    const query = `insert into ${db.schema}.projects(name, description, user_id, technologies) values ($1, $2, $3, $4) RETURNING id;`;

    db.client.query(query, values, function(err, result) {
      if (!err) {
        // console.log('add project result : ', util.inspect(result, utilOptions));
        // const query2 = `insert into ${db.schema}.user_projects(user_id, project_id) values('${projectData.user_id}', '${result.rows[0].id}')`
        console.log('success add project in model : ', result);
        callback();
      }
      else {
        console.log('error add project in model : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },

  editProject: function(projectData, callback) {
    const values = [projectData.name.trim(), projectData.description.trim(),
      projectData.technologies, projectData.id, projectData.user_id];
    const query = `update ${db.schema}.projects set name = $1, description = $2, technologies = $3 where id = $4 and user_id = $5;`;

    db.client.query(query, values, function(err) {
      if (!err) {
        console.log('success edit project in model');
        callback();
      }
      else {
        console.log('error edit project in model : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },

  deleteProject: function(projectData, callback) {
    const query = `delete from ${db.schema}.projects where id = '${projectData.id}' and user_id = '${projectData.user_id}';`;

    db.client.query(query, function(err) {
      if (!err) {
        console.log('success delete project in model');
        callback();
      }
      else {
        console.log('error delete project in model : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  }
};