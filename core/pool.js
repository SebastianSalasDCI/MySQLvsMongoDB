const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'testUser', // use your mysql username.
    password: 'test', // user your mysql password.
    database: 'www'
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error(err);
    
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
