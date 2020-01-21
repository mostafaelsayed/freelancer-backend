let express = require('express');
let router = express.Router();
let project = require('../models/project');
const util = require('util');
const utilOptions = { depth: null };

module.exports = function() {
    router.get('/getProjects', function(req, res) {
        project.getProjects(res.locals.userId, function(err, result) {
            if (!err) {
                console.log('success get user projects');
                res.json(result);
            }
            else {
                console.log('error get user projects : ', util.inspect(err, utilOptions));
                res.json({message: 'error get projects'});
            }
        });
    });

    router.get('/getProjectById', function(req, res) {
        project.getProjectById(req.query.projectId, res.locals.userId, function(err, result) {
            if (!err) {
                res.json(result);
            }
            else {
                res.json({message: 'error get project'});
            }
        });
    });

    router.post('/addProject', function(req, res) {
        req.body.user_id = res.locals.userId;
        
        project.addProject(req.body, function(err) {
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