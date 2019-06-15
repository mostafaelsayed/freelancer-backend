let mysql = require('mysql');
let util = require('util');
const utilOptions = {showHidden: false, depth: null};

module.exports = {
    // createConnection: function() {
    //     let connection =  mysql.createConnection({
    //         host     : 'localhost',
    //         user     : 'root',
    //         password : '1amplenty7',
    //         database : 'freelancer',
    //         port: 3306,
    //         multipleStatements: true,
    //     });

    //     return connection;
    // },

    // createPoolConnection: function() {
    //     let connection =  mysql.createPool({
    //         host     : 'localhost',
    //         user     : 'root',
    //         password : '1amplenty7',
    //         database : 'freelancer',
    //         port: 3306,
    //         multipleStatements: true,
    //     });

    //     return connection;
    // },

    connection: mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1amplenty7',
        database : 'freelancer',
        port: 3306,
        multipleStatements: true,
    }),

    // poolConnection: mysql.createPool({
    //     host     : 'localhost',
    //     user     : 'root',
    //     password : '1amplenty7',
    //     database : 'freelancer',
    //     port: 3306,
    //     multipleStatements: true,
    // }),
    
    iterationCount: 0,
    numberOfInserts: 0,

    initSQLconnection: function(callback=null) {
        mysql.exports.connection.connect(function(err) {
            if (err) {
                console.log('error connecting : ', util.inspect(err, utilOptions));

                if (callback != null) {
                    callback(err, undefined);
                }
            }
            else {
                console.log('success connecting to db');

                if (callback != null) {
                    callback(undefined, 1);
                }
            }
            //console.log('connected as id ' + connection.threadId);
        });
    },

    constructStringFromArray: function(arr, column=0) {
        let len = arr.length;
        let returnedString = '';

        if (column === 0) {
            returnedString = '"' + arr[0] + '"';

            for (let i = 1; i < len; i++) {
                returnedString = returnedString + ',' + '"' + arr[i] + '"';
            }
        }
        else if (column === 1) {
            returnedString = '`' + arr[0] + '`';
            
            for (let i = 1; i < len; i++) {
                returnedString = returnedString + ',' + '`' + arr[i] + '`';
            }
        }

        //console.log('returnedString : ', returnedString);
        return returnedString;
    },

    insertRows: function(table, columns, arrOfValues, callback=null) {
        let rowsLength = arrOfValues.length;
        let columnsString = module.exports.constructStringFromArray(columns, 1);
        let valuesString = module.exports.constructStringFromArray(arrOfValues[0]);
        table = '`' + table + '`';
        let insertStmt = `insert into ${table}(${columnsString}) values (${valuesString})`;

        for (var i = 1; i < rowsLength; i++) {
            valuesString = ',' + module.exports.constructStringFromArray(arrOfValues[i]);
            insertStmt = insertStmt + ',(' + valuesString + ')' 
        }

        insertStmt = insertStmt + ';';

        module.exports.numberOfInserts++;
        console.log('inside insert ', module.exports.numberOfInserts);

        //console.log('insertStmt : ', insertStmt);

        module.exports.connection.query(insertStmt, function(er, result) {
            if (er) {
                console.log('error insert : ', util.inspect(er, utilOptions));

                if (callback != null) {
                    callback(er, undefined);
                }
            }
            else {
                console.log('success insert. result is : ', util.inspect(result, utilOptions));
                //let n2 = d.getTime();
                //console.log('time is :' + ((n2 - n1) / 1000));
                //module.exports.iterationCount++;
                //console.log('inserted chunk number : ', module.exports.iterationCount);
                if (callback != null) {
                    callback(undefined, result);
                }
            }
        });
    },

    insertRowsInChunks: function(table, columns, arrOfValues, project, chunkSize, callback=null) {
        let ind1 = 0;
        let ind2 = chunkSize;

        while (ind1 < arrOfValues.length) {
            let values = arrOfValues.slice(ind1, ind2);
            module.exports.insertRows(table, columns, values, project, callback);
            ind1 += chunkSize;
            ind2 += chunkSize;
        }
    }
}