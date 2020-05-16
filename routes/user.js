
const util = require('util');
const utilOptions = { depth: null };
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const getToken = require('../helpers/authentication-helper').getToken;
const verifyToken = require('../helpers/authentication-helper').verifyToken;
const user = require('../models/user');
const prepareForArrayInsert = require('../helpers/data-prep').prepareForArrayInsert;

module.exports = function() {

    router.post('/signup', function(req, res) {
        console.log('req body signup : ', util.inspect(req.body, utilOptions));
        let inputEmail = req.body.email;
        let inputRoles = prepareForArrayInsert(req.body.roles);
        const inputPassword = req.body.password;
        
        bcrypt.genSalt(10, function(err1, salt) {
            if (!err1) {
                bcrypt.hash(inputPassword, salt, function(err2, hash) {
                    if (!err2) {
                        user.addUser({inputEmail, inputRoles, hash}, function(err3, res3) {
                            if (!err3) {
                                // Store hash in DB.
                                //let escapedEmail = db.connection.escape(inputEmail);
                                //let escapedEmailLength = escapedEmail.length;
                                //escapedEmail = escapedEmail.substring(1, escapedEmailLength - 1);
                                console.log('success insert user : ', util.inspect(res3, utilOptions));

                                const token = getToken({
                                    email: inputEmail,
                                    id: res3.rows[0]['id'],
                                    role: res3.rows[0]['roles']
                                });

                                if (inputRoles.length > 1) {
                                    res.json({
                                        message: 'specify roles',
                                        token,
                                        user: {id: res3.rows[0]['id'], email: inputEmail, role: res3.rows[0]['roles']}
                                    });
                                }
                                else {
                                    res.json({
                                        message: 'success register',
                                        token,
                                        user: {id: res3.rows[0]['id'], email: inputEmail, role: res3.rows[0]['roles'][0]}
                                    });
                                }
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

    router.post('/login', function(req, res) {
        console.log('req body login : ', util.inspect(req.body, utilOptions));
        let inputEmail = req.body.email;
        let inputPassword = req.body.password;

        // get document by id
        user.getUser(inputEmail, function(er1, res1) {
            if (!er1 && res1.rows[0]) {
                console.log('result get user : ', util.inspect(res1, utilOptions));
                const hash = res1.rows[0]['passwordHash'];

                // compare the hash of the input password with the stored hash
                bcrypt.compare(inputPassword, hash, function(er2, res2) {
                    if (!er2) {
                        console.log('res2 : ', util.inspect(res2, utilOptions));
                        
                        if (res2 === true) {
                            console.log('success login');

                            const token = getToken({
                                id: res1.rows[0]['id'],
                                email: inputEmail,
                                role: res1.rows[0]['roles']
                            });

                            if (res1.rows[0]['roles'].length > 1) {
                                if (req.body.specifiedRole && res1.rows[0]['roles'].includes(req.body.specifiedRole)) {
                                    res.json({message: 'success login', token, user: {id: res1.rows[0]['id'], email: inputEmail, role: req.body.specifiedRole}});
                                }
                                else {
                                    res.json({
                                        message: 'specify roles',
                                        token,
                                        user: {id: res1.rows[0]['id'], email: inputEmail, role: res1.rows[0]['roles']}
                                    });
                                }
                            }
                            else {
                                console.log("login role : ", res1.rows[0]['roles']);

                                res.json({message: 'success login', token, user: {id: res1.rows[0]['id'], email: inputEmail, role: res1.rows[0]['roles'][0]}});
                            }
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
                console.log('error get user by email : ', util.inspect(er1, utilOptions));
                res.json({message: 'fail login'});
            }
        });
    });

    router.post('/changeRole', function(req, res) {
        verifyToken(req.headers['authorization']).then((decoded) => {
            let newToken = getToken({
                id: decoded.id,
                email: decoded.email,
                role: req.body.role
            });

            console.log('decoded in change role : ', util.inspect(decoded, utilOptions));
            console.log('role in change role : ', util.inspect(req.body.role, utilOptions));

            res.json({message: 'done choose role', token: newToken}).status(200);
        }).catch((err) => {
            console.log('error specify role : ', util.inspect(err, utilOptions));
            res.json('error specify role').status(500);
        })

        
    });

    router.get('/getUsers', function(req, res) {

    });

    return router;
};