let db = require('../models/database').createConnection();
let util = require('util');
let bcrypt = require('bcryptjs');
let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

module.exports = function() {

    router.post('/login', function(req, res) {
        console.log('req body login : ', util.inspect(req.body, utilOptions));
        let inputEmail = req.body.email;
        let inputPassword = req.body.password;

        // get document by id
        db.query(`select * from test.users where email = '${inputEmail}';`, function(er1, res1) {
            if (!er1) {
                console.log('result get user : ', util.inspect(res1, utilOptions));
                let hash = res1.rows[0]['password_hash'];

                // compare the hash of the input password with the stored hash
                bcrypt.compare(inputPassword, hash, function(er2, res2) {
                    if (!er2) {
                        console.log('res2 : ', util.inspect(res2, utilOptions));
                        console.log('er2 : ', util.inspect(er2, utilOptions));
                        if (res2 === true) {
                            console.log('success login');
                            //req.session.user = {};

                            req.session.user = {
                                email: inputEmail,
                                id: res1.rows[0]['id']
                            };
                            req.session.save(function(err) {
                                // session saved
                                if (err) {
                                    console.log('error saving session : ', err);
                                }
                              });

                            res.json({message: 'success login', token: jwt.sign({email: inputEmail}, '987fdgo1z09qjla0934lksdp0', {expiresIn: 24*60*60 })});
                            
                        }
                        else {
                            console.log('fail login : ', util.inspect(er2, utilOptions));
                            res.json({message: 'fail login'});
                        }
                    }
                    else {
                        console.log('error comparing password : ', util.inspect(er2, utilOptions));
                        res.json({message: 'fail login'});
                    }
                });
            }
            else {
                console.log('error get hash : ', util.inspect(er1, utilOptions));
                res.json({message: 'fail login'});
            }
        });
    });

    router.post('/signup', function(req, res) {
        console.log('req body signup : ', util.inspect(req.body, utilOptions));
        let inputEmail = req.body.email;
        let inputPassword = req.body.password;
        
        bcrypt.genSalt(10, function(err1, salt) {
            if (!err1) {
                bcrypt.hash(inputPassword, salt, function(err2, hash) {
                    if (!err2) {
                        db.query(`insert into test.users(email, password_hash) values('${inputEmail}', '${hash}');`, function(err3, res3) {
                            if (!err3) {
                                // Store hash in DB.
                                //let escapedEmail = db.connection.escape(inputEmail);
                                //let escapedEmailLength = escapedEmail.length;
                                //escapedEmail = escapedEmail.substring(1, escapedEmailLength - 1);
                                console.log('success insert user : ', util.inspect(res3, utilOptions));
                                req.session.user = {
                                    email: inputEmail,
                                    id: res3.id
                                };

                                res.json(res3);
                            }
                            else {
                                console.log('error signup : ', util.inspect(err3, utilOptions));
                                res.json({message: 'signup failed'});
                            }
                        });
                    }
                    else {
                        console.log('error hashing password : ', util.inspect(err2, utilOptions));
                        res.json({message: 'signup failed'});
                    }
                });
            }
            else {
                console.log('error genSalt : ', util.inspect(err1, utilOptions));
                res.json({message: 'signup failed'});
            }
        });
    });

    router.get('/api/getUsers', function(req, res) {

    });

    return router;
};