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

    router.get('/getTechnologies', function(req, res) {
        project.getTechnologies(function(err, result) {
            if (!err) {
                console.log('success get technologies');
                
                res.json({
                    technologies: result
                });
            }
            else {
                console.log('error get technologies : ', util.inspect(err, utilOptions));

                res.json({
                    message: 'error get technologies'
                });
            }
        })
    });

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

    router.get('/getSpecificProjects', function(req, res) {
        project.getSpecificProjects(function(err, result) {
            if (!err) {
                console.log('success get specific projects');
                res.json(result);
            }
            else {
                console.log('error get specific projects : ', util.inspect(err, utilOptions));
                res.json({message: 'error get specific projects'});
            }
        });
    });

    router.get('/getProjectById', function(req, res) {
        if (res.locals.role == 'freelancer') {
            project.getProjectById(req.query.projectId, function(err, result) {
                if (!err) {
                    res.json(result);
                }
                else {
                    res.json({message: 'error get project'});
                }
            });
        }
        else {
            project.getProjectById(req.query.projectId, function(err, result) {
                if (!err) {
                    res.json(result);
                }
                else {
                    res.json({message: 'error get project'});
                }
            }, res.locals.userId);
        }
    });

    router.post('/addProject', function(req, res) {
        req.body.user_id = res.locals.userId;
        
        let technologies = req.body.technologies.join(',');
        technologies = technologies.replace("'", '');
        technologies = technologies.replace('"', '');
        let inputTechnologies = '{' + technologies + '}';
        req.body.technologies = inputTechnologies;
        
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

        let technologies = req.body.technologies.join(',');
        technologies = technologies.replace("'", '');
        technologies = technologies.replace('"', '');
        let inputTechnologies = '{' + technologies + '}';
        req.body.technologies = inputTechnologies;
        
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