
//  an instance of mysql for the application
var mysql = require('mysql')

// create a 'connection pool' 
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : '',
    password        : '',
    database        : 'library'
});

// export it for use in our applicaiton
module.exports.pool = pool;