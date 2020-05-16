const db = require('../database/connection').createConnection();
const util = require('util');
const utilOptions = { depth: null };

module.exports = {
  getProjects: function(userId, callback) {
    const query = `select * from ${db.schema}."projects" where "userId" = '${userId}';`;

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
    const query = `select * from ${db.schema}."projects";`;

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
    const query = `select * from ${db.schema}."userProjects" inner join ${db.schema}."projects"
      on ${db.schema}."projects"."id" = ${db.schema}."userProjects"."projectId" where "assignedUserId" = '${userId}';`;

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
  getProjectById: function(projectId, callback, userId) {
    let query = '';

    if (userId) {
      query = `select * from ${db.schema}."projects" where "id" = '${projectId}'
        and "userId" = '${userId}';`;
    }
    else {
      query = `select * from ${db.schema}."projects" where "id" = '${projectId}';`;
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
  assignProject: function(projectData, callback) {
    const values = [projectData.userId, projectData.id, projectData.toBeAssignedUserId];
    const query = `insert into ${db.schema}."userProjects"("userId", "projectId", "assignedUserId")
      values ($1, $2, $3) RETURNING "id";`;
    
    db.client.query(query, values, function(err, result) {
      if (!err) {
        console.log('success assign project in model : ', result);
        callback();
      }
      else {
        console.log('error assign project in model : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },
  unAssignProject: function(projectData, callback) {
    const values = [projectData.id, projectData.toBeUnAssignedUserId];
    const query = `delete from ${db.schema}."userProjects" where "projectId" = $1 and "assignedUserId" = $2;`;

    db.client.query(query, values, function(err, result) {
      if (!err) {
        console.log('success unassign project in model : ', result);
        callback();
      }
      else {
        console.log('error unassign project in model : ', util.inspect(err, utilOptions));
        callback(1);
      }
    });
  },
  addProject: function(projectData, callback) {
    const values = [projectData.name.trim(), projectData.description.trim(),
      projectData.userId, projectData.technologies, projectData.period];
    const query = `insert into ${db.schema}."projects"("name", "description", "userId", "technologies", "period")
      values ($1, $2, $3, $4, $5) RETURNING "id";`;

    db.client.query(query, values, function(err, result) {
      if (!err) {
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
      projectData.technologies, projectData.period, projectData.id, projectData.userId];
    const query = `update ${db.schema}."projects" set "name" = $1, "description" = $2, "technologies" = $3, "period" = $4
      where "id" = $5 and "userId" = $6;`;

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
    const query = `delete from ${db.schema}."projects" where "id" = '${projectData.id}' and "userId" = '${projectData.userId}';`;

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