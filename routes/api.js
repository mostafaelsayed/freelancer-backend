let db = require('../models/database');
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
    });

    router.get('/signup', function(req, res) {
        console.log('hello signup');
        res.sendFile(path.resolve('frontend/public/views/signup.html'));
    });

    router.get('/login', function(req, res) {
        console.log('hello login');
        res.sendFile(path.resolve('frontend/public/views/login.html'));
    });

    router.post('/api/login', function(req, res) {
        console.log('req body login : ', util.inspect(req.body, utilOptions));
        let inputEmail = req.body.email;
        let inputPassword = req.body.password;

        db.connection.query(`select passwordHash from users where email = '${db.connection.escape(inputEmail)}' ; `, function(er1, res1) {
            if (!er1) {
                console.log('result get hash : ', util.inspect(res1, utilOptions));
                let hash = res1[0]['passwordHash'];

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
                        db.connection.beginTransaction(function(err3) {
                            if (!err3) {
                                // Store hash in DB.
                                let escapedEmail = db.connection.escape(inputEmail);
                                let escapedEmailLength = escapedEmail.length;
                                escapedEmail = escapedEmail.substring(1, escapedEmailLength - 1);

                                db.insertRows('users', ['email', 'passwordHash'], [[escapedEmail, hash]], function(err4, res4) {
                                    // do something in case error or success
                                    if (!err4) {
                                        // insert into users_roles tables
                                        //console.log('res insert user : ', util.inspect(res4, utilOptions));
                                        let insertedId = res4.insertId;

                                        //console.log('insertedId : ', insertedId);
                                        
                                        db.insertRows('users_roles', ['userId', 'roleId'], [[insertedId, 2]], function(err5) {
                                            if (!err5) {
                                                console.log('inserted user successfully');
                                                db.connection.commit(function(err6) {
                                                    if (!err6) {
                                                        console.log('Transaction complete');
                                                        res.send('signup completed');
                                                    }
                                                    else {
                                                        console.log('error complete transaction : ', util.inspect(err6, utilOptions));

                                                        db.connection.rollback(function() {
                                                            res.send('signup failed');
                                                        });
                                                    }
                                                });
                                            }
                                            else {
                                                console.log('error inserting user role : ', util.inspect(err5, utilOptions));

                                                db.connection.rollback(function() {
                                                    res.send('signup failed');
                                                });
                                            }
                                        })
                                    }
                                    else {
                                        console.log('error inserting hash : ', util.inspect(err4, utilOptions));

                                        db.connection.rollback(function() {
                                            res.send('signup failed');
                                        });
                                    }
                                });
                            }
                            else {
                                console.log('error begining transaction : ', util.inspect(err3, utilOptions));
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
        res.sendFile(path.resolve('frontend/public/views/home.html'));
    });

    router.get('/uploadpage', function(req, res) {
        //console.log('hello home');
        res.sendFile(path.resolve('frontend/upload.html'));
    });

    return router;
}