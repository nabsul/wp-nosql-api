const mysql = require( 'mysql' );

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : null,
	database : 'dynamo',
});

connection.connect();

module.exports = connection;
