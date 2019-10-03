let express = require('express');
let router = express.Router();
let project = require('../models/project');

module.exports = function() {
    router.get('/api/getProjects', function(req, res) {
        project.getProjects(req, function(err, result) {
            if (!err) {
                res.json(result);
            }
            else {
                res.json({message: 'error get projects'});
            }
        });
    });

    router.get('/api/getProject', function(req, res) {
        project.getProject(req.query.projectName, function(err, result) {
            if (!err) {
                res.json(result);
            }
            else {
                res.json({message: 'error get project'});
            }
        });
    });

    router.post('/api/addProject', function(req, res) {
        project.addProject(req.body.projectData, function(err) {
            if (!err) {
                res.json({message: 'success add project'});
            }
            else {
                res.json({message: 'error add project'});
            }
        });
    });

    return router;
}