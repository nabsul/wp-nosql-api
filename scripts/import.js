const mysql = require( 'mysql' );
const controller = require( '../controllers' );

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : process.env.MYSQL_USER,
	password : process.env.MYSQL_PW,
	database : process.env.MYSQL_DB,
});

connection.connect();

const upload = ( params ) => {
	connection.query('SELECT * FROM ' + params.table, function( err, rows ) {
		if (err) throw err;

		rows.forEach( ( row ) => {
			params.controller.put( {
				params: params.getParams( row ),
				payload: row,
			}, ( data ) => {
				console.dir( data );
			} );
		} );
	});
}

upload( {
	table: 'wp_posts',
	controller: controller.posts,
	getParams: ( row ) => { return { site: 1, post: row.ID }; },
} );

upload( {
	table: 'wp_postmeta',
	controller: controller.postsMeta,
	getParams: ( row ) => { return { site: 1, post: row.post_id, meta: row.meta_id }; },
} );

connection.end();
