'use strict';
const mysql = require( 'mysql' );
const ops = require( '../controllers/ops' );
const Async = require( 'async' );

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : process.env.MYSQL_USER || 'root',
	password : process.env.MYSQL_PW || null,
	database : process.env.MYSQL_DB || 'dynamo',
});

connection.connect();


connection.query( 'SELECT * FROM wp_options', ( err, rows ) => {
	if ( err ) throw err;

	rows.forEach( ( row ) => {
		const pk = 'site_1_options';
		const id = row.option_name;
		ops.put( pk, id, row, ( error, data ) => {
			if ( error ) throw error;
			console.log( 'added: ' + data.dynamoPk + ' / ' + data.dynamoId );
		} );
	} );
} );

connection.query( 'SELECT * FROM wp_users', ( err, rows ) => {
	if ( err ) throw err;

	rows.forEach( ( row ) => {
		const pk = 'site_1_users';
		const id = row.user_login;
		ops.put( pk, id, row, ( error, data ) => {
			if ( error ) throw error;
			console.log( 'added: ' + data.dynamoPk + ' / ' + data.dynamoId );
		} );
	} );
} );

connection.query( 'SELECT * FROM wp_usermeta', ( err, rows ) => {
	if ( err ) throw err;

	rows.forEach( ( row ) => {
		const pk = 'site_1_user_' + row.user_id + '_meta';
		const id = row.meta_key;
		ops.put( pk, id, row, ( error, data ) => {
			if ( error ) throw error;
			console.log( 'added: ' + data.dynamoPk + ' / ' + data.dynamoId );
		} );
	} );
} );

connection.query( 'SELECT * FROM wp_posts', ( err, rows ) => {
	if ( err ) throw err;

	rows.forEach( ( row ) => {
		const pk = 'site_1_posts';
		const id = row.ID.toString();
		ops.put( pk, id, row, ( error, data ) => {
			if ( error ) throw error;
			console.log( 'added: ' + data.dynamoPk + ' / ' + data.dynamoId );
		} );
	} );
} );

connection.query( 'SELECT * FROM wp_postmeta', ( err, rows ) => {
	if ( err ) throw err;

	rows.forEach( ( row ) => {
		const pk = 'site_1_post_' + row.post_id + '_meta';
		const id = row.meta_key;
		ops.put( pk, id, row, ( err, data ) => {
			if ( err ) throw err;
			console.log( 'added: ' + data.dynamoPk + ' / ' + data.dynamoId );
		} );
	} );
} );

connection.query( 'SELECT * FROM wp_comments', ( err, rows ) => {
	if ( err ) throw err;

	rows.forEach( ( row ) => {
		const pk = 'site_1_post_' + row.comment_post_ID + '_comments';
		const id = row.comment_ID.toString();
		ops.put( pk, id, row, ( error, data ) => {
			if ( error ) throw error;
			console.log( 'added: ' + data.dynamoPk + ' / ' + data.dynamoId );
		} );
	} );
} );

connection.query( 'SELECT * FROM wp_commentmeta AS A LEFT JOIN wp_comments AS B ON A.comment_id=B.comment_id', ( err, rows ) => {
	if ( err ) throw err;

	rows.forEach( ( row ) => {
		const pk = 'site_1_post_' + row.comment_post_ID + '_comment_' + row.comment_ID + '_meta';
		const id = row.meta_key;
		ops.put( pk, id, row, ( error, data ) => {
			if ( error ) throw error;
			console.log( 'added: ' + data.dynamoPk + ' / ' + data.dynamoId );
		} );
	} );
} );

connection.end();
