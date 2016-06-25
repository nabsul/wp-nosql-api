const mysql = require( 'mysql' );
const ddb = require( '../controllers/dynamodb' );

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : process.env.MYSQL_USER,
	password : process.env.MYSQL_PW,
	database : process.env.MYSQL_DB,
});

connection.connect();

connection.query( 'SELECT * FROM wp_posts', ( err, rows ) => {
	if ( err ) throw err;

	rows.forEach( ( row ) => {
		ddb.putItem( {
			Item: {
				dynamoPk: { S: 'site_1_posts' },
				dynamoId: { S: row.ID.toString() },
				data: { S: JSON.stringify( row ) },
			},
		}, ( error, data ) => {
			if ( error ) throw error;
			console.dir( data );
		} );
	} );
} );

/*
const upload = ( params ) =>
	connection.query('SELECT * FROM ' + params.table, ( err, rows ) => {
		if (err) throw err;
		console.log( params.table + ': ' + rows.length );
		rows.forEach( ( row ) => {
			params.controller.put( {
				params: params.getParams( row ),
				payload: row,
			}, ( data ) => {
				//console.log( params.table + ' ' + JSON.stringify( params.getParams( row ) ) );
			} );
		} );
	} );

upload( {
	table: 'wp_posts',
	controller: controller.posts,
	getParams: ( row ) => { return { site: 1 }; },
} );

upload( {
	table: 'wp_postmeta',
	controller: controller.postsMeta,
	getParams: ( row ) => { return { site: 1, post: row.post_id }; },
} );

upload( {
	table: 'wp_comments',
	controller: controller.comments,
	getParams: ( row ) => { return { site: 1, post: row.comment_post_ID }; },
} );

upload( {
	table: 'wp_commentmeta LEFT JOIN wp_comments ON wp_commentmeta.comment_id=wp_comments.comment_id',
	controller: controller.commentMeta,
	getParams: ( row ) => { return { site: 1, post: row.post_id, comment: row.comment_id }; },
} );

upload( {
	table: 'wp_options',
	controller: controller.options,
	getParams: ( row ) => { return { site: 1 }; },
} );

upload( {
	table: 'wp_terms',
	controller: controller.terms,
	getParams: ( row ) => { return { site: 1 }; },
} );

upload( {
	table: 'wp_termmeta',
	controller: controller.termMeta,
	getParams: ( row ) => { return { site: 1, term: row.term_id }; },
} );

upload( {
	table: 'wp_term_relationships',
	controller: controller.termRelationships,
	getParams: ( row ) => { return { site: 1, term: row.term_taxonomy_id }; },
} );

upload( {
	table: 'wp_term_taxonomy',
	controller: controller.termTaxonomy,
	getParams: ( row ) => { return { site: 1, term: row.term_id }; },
} );

upload( {
	table: 'wp_users',
	controller: controller.users,
	getParams: ( row ) => { return { site: 1 }; },
} );

upload( {
	table: 'wp_usermeta',
	controller: controller.users,
	getParams: ( row ) => { return { site: 1, user: row.user_id }; },
} );

*/

connection.end();
