let express = require('express');
let router = express.Router();
let project = require('../models/project');
const util = require('util');
const utilOptions = { depth: null };
const prepareForArrayInsert = require('../helpers/data-prep').prepareForArrayInsert;

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

    router.get('/getAssignedProjects', function(req, res) {
        project.getAssignedProjects(res.locals.userId, function(err, result) {
            if (!err) {
                console.log('success get assigned projects');

                res.json({
                    'message': 'done get assigned projects',
                    assignedProjects: result
                });
            }
            else {
                console.log('error get assigned projects');

                res.json({
                    'message': 'error get assigned projects'
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
            // project.getAssignedProjects(res.locals.userId, function(err, result) {
            //     if (!err) {
            //         console.log('success get assigned projects');
            //         res.json(result);
            //     }
            //     else {
            //         console.log('error get assigned projects : ', util.inspect(err, utilOptions));
            //         res.json({message: 'error get assigned projects'});
            //     }
            // });
            console.log('not authorized to get assigned projects');
            res.json({message: 'error get assigned projects'}).status(403);
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

    router.post('/assignProject', function(req, res) {
        req.body.toBeAssignedUserId = res.locals.userId;

        project.assignProject(req.body, function(err, result) {
            if (!err) {
                console.log('success assign project');
                res.json({'message': 'done assign project'}).status(200);
            }
            else {
                console.log('error assign project : ', util.inspect(err, utilOptions));
                res.json({'message': 'error assign project'});
            }
        });
    });

    router.post('/unAssignProject', function(req, res) {
        req.body.toBeUnAssignedUserId = res.locals.userId;
        project.unAssignProject(req.body, function(err, result) {
            if (!err) {
                console.log('success unassign project');
                res.json({'message': 'done unassign project'}).status(200);
            }
            else {
                console.log('error unassign project : ', util.inspect(err, utilOptions));
                res.json({'message': 'error unassign project'});
            }
        })
    });

    router.post('/addProject', function(req, res) {
        req.body.user_id = res.locals.userId;
       
        req.body.technologies = prepareForArrayInsert(req.body.technologies);
        req.body.period = prepareForArrayInsert(req.body.period);
        
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

        req.body.technologies = prepareForArrayInsert(req.body.technologies);
        
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