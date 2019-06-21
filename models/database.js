let util = require('util');
const utilOptions = {showHidden: false, depth: null};

module.exports = {
    createConnection: function() {
        // const Sequelize = require('sequelize');

        // // Option 1: Passing parameters separately
        // const sequelize = new Sequelize('freelancer', process.env.DB_USERNAME || 'root', process.env.DB_PASSWORD || 'mostafa', {
        //     host: process.env.DB_HOST || 'localhost',
        //     dialect: 'mysql'
        // });

        // sequelize.authenticate().then(() => {
        //     console.log('Connection has been established successfully.');
        // }).catch(err => {
        //     console.error('Unable to connect to the database:', err);
        // });

        // return sequelize;

        // Option 2: Passing a connection URI
        //const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');



        // Load the Cloudant library.
        var Cloudant = require('@cloudant/cloudant');

        var account = process.env.DB_USERNAME || '685fb89f-93c1-4d19-a96a-5f4994ecc65a-bluemix'; // Set this to your own account.
        var password = process.env.DB_PASSWORD || '3381fae3cc57bbe208a27e239b43d7f48f7052daad3868e7d6b7b005e8a23e41';

        // Initialize the library with my account.
        var cloudant = Cloudant({ account: account, password: password });

        return cloudant.db.use('freelancer');
    }
}