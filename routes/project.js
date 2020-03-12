let express = require('express');
let router = express.Router();
let project = require('../models/project');
const util = require('util');
const utilOptions = { depth: null };

module.exports = function() {
    // router.get('/getAllProjects', function(req, res) {
    //     project.getProjects(res.locals.userId, function(err, result) {
    //         if (!err) {
    //             console.log('success get user projects');
    //             res.json(result);
    //         }
    //         else {
    //             console.log('error get user projects : ', util.inspect(err, utilOptions));
    //             res.json({message: 'error get projects'});
    //         }
    //     });
    // });

    router.get('/getProjects', function(req, res) {
        
        if (res.locals.role == 'client') {
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
        }
        else {
            project.getAssignedProjects(res.locals.userId, function(err, result) {
                if (!err) {
                    console.log('success get assigned projects');
                    res.json(result);
                }
                else {
                    console.log('error get assigned projects : ', util.inspect(err, utilOptions));
                    res.json({message: 'error get assigned projects'});
                }
            });
        }
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

    router.post('/editProject', function(req, res) {
        req.body.user_id = res.locals.userId;
        
        project.editProject(req.body, function(err) {
            if (!err) {
                res.json({message: 'success edit project'});
            }
            else {
                res.json({message: 'error edit project'});
            }
        });
    });

    router.post('/deleteProject', function(req, res) {
        req.body.user_id = res.locals.userId;
        
        project.deleteProject(req.body, function(err) {
            if (!err) {
                res.json({message: 'success delete project'});
            }
            else {
                res.json({message: 'error delete project'});
            }
        });
    });

    return router;
}