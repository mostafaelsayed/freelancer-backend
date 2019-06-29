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

    router.get('/', function(req, res) {
        //console.log('hello home');
        res.send('hello');
    });

    router.get('/uploadpage', function(req, res) {
        //console.log('hello home');
        res.send('upload page here');
    });

    return router;
};