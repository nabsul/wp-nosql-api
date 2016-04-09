const mysql = require( 'mysql' );
const controller = require( '../controllers' );

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : process.env.MYSQL_USER,
	password : process.env.MYSQL_PW,
	database : process.env.MYSQL_DB,
});

connection.connect();

const upload = params =>
	connection.query('SELECT * FROM ' + params.table, function( err, rows ) {
		if (err) throw err;

		rows.forEach( ( row ) => {
			params.controller.put( {
				params: params.getParams( row ),
				payload: row,
			}, ( data ) => {
				console.log( params.table + ' ' + JSON.stringify( params.getParams( row ) ) );
			} );
		} );
	});

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
	getParams: ( row ) => { return { site: 1, post: row.post_id }; },
} );

upload( {
	table: 'wp_commentmeta LEFT JOIN wp_comments ON wp_commentmeta.comment_id=wp_comments.comment_id',
	controller: controller.commentMeta,
	getParams: ( row ) => { return { site: 1, post: row.post_id, comment: row.comment_id }; },
} );

upload( {
	table: 'wp_links',
	controller: controller.links,
	getParams: ( row ) => { return { site: 1 }; },
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
	getParams: ( row ) => { return { site: 1, term: row.term_id }; },
} );

upload( {
	table: 'wp_term_taxonomy',
	controller: controller.termRelationships,
	getParams: ( row ) => { return { site: 1, term: row.term_id }; },
} );

upload( {
	table: 'wp_users',
	controller: controller.users,
	getParams: ( row ) => { return { site: 1 }; },
} );

upload( {
	table: 'wp_usersmeta',
	controller: controller.users,
	getParams: ( row ) => { return { site: 1, user: row.user_id }; },
} );

connection.end();
