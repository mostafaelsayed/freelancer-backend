let db = require('../models/database').createConnection();
//let async = require('async');
let util = require('util');
const utilOptions = {depth: null};
let path = require('path');
let bcrypt = require('bcryptjs');
let express = require('express');
let router = express.Router();

module.exports = function() {
    router.get('/myprofile', function(req, res) {
        console.log('hello myprofile');
        res.send('send profile page');
    });

    router.get('/signup', function(req, res) {
        console.log('hello signup');
        res.send('send signup page');
    });

    router.get('/login', function(req, res) {
        console.log('hello login');
        res.send('send login page');
    });

    router.post('/api/login', function(req, res) {
        console.log('req body login : ', util.inspect(req.body, utilOptions));
        let inputEmail = req.body.email;
        let inputPassword = req.body.password;

        // get document by id
        db.get(inputEmail, function(er1, res1) {
            if (!er1) {
                console.log('result get hash : ', util.inspect(res1, utilOptions));
                let hash = res1['passwordHash'];

                // compare the hash of the input password with the stored hash
                bcrypt.compare(inputPassword, hash, function(er2, res2) {
                    if (!er2) {
                        if (res2 === true) {
                            console.log('success login');
                            res.send('success login');
                        }
                        else {
                            console.log('fail login');
                            res.send('fail login');
                        }
                    }
                    else {
                        console.log('error comparing password : ', util.inspect(er2, utilOptions));
                        res.send('fail login');
                    }
                });
            }
            else {
                console.log('error get hash : ', util.inspect(er1, utilOptions));
                res.send('fail login');
            }
        });
    });

    router.post('/api/signup', function(req, res) {
        console.log('req body signup : ', util.inspect(req.body, utilOptions));
        let inputEmail = req.body.email;
        let inputPassword = req.body.password;
        
        bcrypt.genSalt(10, function(err1, salt) {
            if (!err1) {
                bcrypt.hash(inputPassword, salt, function(err2, hash) {
                    if (!err2) {
                        db.insert({email: inputEmail, passwordHash: hash}, inputEmail, function(err3, res3) {
                            if (!err3) {
                                // Store hash in DB.
                                //let escapedEmail = db.connection.escape(inputEmail);
                                //let escapedEmailLength = escapedEmail.length;
                                //escapedEmail = escapedEmail.substring(1, escapedEmailLength - 1);

                                res.json(res3);
                            }
                            else {
                                console.log('error signup : ', util.inspect(err3, utilOptions));
                                res.send('signup failed');
                            }
                        });
                    }
                    else {
                        console.log('error hashing password : ', util.inspect(err2, utilOptions));
                        res.send('signup failed');
                    }
                });
            }
            else {
                console.log('error genSalt : ', util.inspect(err1, utilOptions));
                res.send('signup failed');
            }
        });        
    });

    router.get('/', function(req, res) {
        //console.log('hello home');
        res.send('hello');
    });

    router.get('/uploadpage', function(req, res) {
        //console.log('hello home');
        res.send('upload page here');
    });

    return router;
}