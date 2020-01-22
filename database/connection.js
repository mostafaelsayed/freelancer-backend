const util = require('util');
const utilOptions = { depth: null };

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'mostafa',
    port: 5432,
});

client.connect().then((success) => {
    console.log('successfully connected to postgres database');
}).catch((err) => {
    console.log('error connecting to postgres database : ', util.inspect(err, utilOptions));
});


module.exports = {
    createConnection: function() {
          
        //client.connect()

        return {client, schema: 'test'};
    }
}