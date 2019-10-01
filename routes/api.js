let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

module.exports = function() {
    router.get('/api/myprofile', function(req, res) {
        console.log('hello myprofile');
        res.send('send profile page');
    });

    router.get("/api/getToken", function(req, res) {
        if (req.session.user) {
            // Generate JWT - set expire to 1 day
            res.json({success: true,
                token: jwt.sign({email:req.session.user.email}, '987fdgo1z09qjla0934lksdp0', {expiresIn: 24*60*60 })
            });
        }
        else {
            res.json({token: null});
        }
    });

    router.get('/', function(req, res) {
        //console.log('hello home');
        res.send('hello');
    });

    router.get('/api/upload', function(req, res) {
        //console.log('hello home');
        res.send('upload here');
    });

    return router;
};