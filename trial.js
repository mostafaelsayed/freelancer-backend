let db = require('./database/connection').createConnection();

//let getColumnTypeQuery = `SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'users' AND COLUMN_NAME = 'passwordHash';`;

//let insert = `insert into ${db.schema}.trial values('123', '3'), ('123456', '4')`;

db.connection.query(insert, function(er, res) {
    if (!er) {
        console.log(res);
    }
    else {
        console.log(er);
    }
})