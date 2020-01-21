let util = require('util');
const utilOptions = {showHidden: false, depth: null};
;
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'mostafa',
    port: 5432,
  });


module.exports = {
    createConnection: function() {
            
        client.connect().then((success) => {
            console.log('successfully connected to postgres database');
        });
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


        return client;
    }
}