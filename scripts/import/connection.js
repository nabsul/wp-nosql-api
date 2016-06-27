const mysql = require( 'mysql' );

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : process.env.MYSQL_USER || 'root',
	password : process.env.MYSQL_PW || null,
	database : process.env.MYSQL_DB || 'dynamo',
});

connection.connect();

module.exports = connection;
