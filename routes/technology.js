const express = require('express');
const router = express.Router();
let technology = require('../models/technology');

module.exports = function() {

    router.get('/getTechnologies', function(req, res) {
        technology.getTechnologies(function(err, result) {
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

    router.post('/addTechnology', function(req, res) {
        technology.addTechnology(req.body, function(err, result) {
            if (err) {
                console.log('error add technology in router');
                res.json({
                    message: 'error add technology'
                });
            }
            else {
                console.log('success add technology in router');
                
                res.json({
                    message: 'success add technology',
                    id: result.id
                });
            }
        });
    });

    router.get('/getTechnologyById/:id', function(req, res) {
        technology.getTechnologyById(req.params.id, function(err, result) {
            if (err) {
                console.log('error getTechnologyById in router');
                res.json({
                    message: 'error get technology'
                });
            }
            else {
                console.log('success getTechnologyById in router');
                
                res.json(result);
            }
        });
    });

    router.put('/editTechnology', function(req, res) {
        technology.editTechnology(req.body, function(err, result) {
            if (err) {
                console.log('error editTechnology in router');
                res.json({
                    message: 'error update technology'
                });
            }
            else {
                console.log('success editTechnology in router');
                
                res.json({
                    message: 'success update technology'
                });
            }
        });
    });

    return router;

}