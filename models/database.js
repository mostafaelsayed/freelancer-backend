//const util = require('util');
//const utilOptions = {showHidden: false, depth: null};

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

        return client;
    }
}