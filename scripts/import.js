'use strict';
const mysql = require( 'mysql' );
const Async = require( 'async' );
const ddb = require( '../lib/dynamodb' );

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : process.env.MYSQL_USER || 'root',
	password : process.env.MYSQL_PW || null,
	database : process.env.MYSQL_DB || 'dynamo',
});

connection.connect();

const putItem = ( params, row, callback ) => {
	const partitionKey = params.getPk( row );
	const rowKey = params.getRk( row );
	const item = Object.assign( {}, row, { partitionKey, rowKey } );
	ddb.put( item, ( error ) => {
		if ( error ) return callback( error );
		console.log( 'added: ' + partitionKey + ' / ' + rowKey );
		callback( null, rowKey );
	} );
};

const importTable = ( params, callback ) => {
	connection.query( 'SELECT * FROM ' + params.table, ( err, rows ) => {
		if ( err ) throw err;

		Async.series( rows.map( r => ( cb ) => putItem( params, r, cb ) ), ( error, result ) => {
			if ( error ) return callback( error );
			callback( null, 'imported ' + params.table );
		} );
	} );
};

const importTasks = [
	{
		table: 'wp_options',
		getPk: () => 'site_1_options',
		getRk: r => r.option_name,
	},
	{
		table: 'wp_users',
		getPk: () => 'site_1_users',
		getRk: r => r.user_login,
	},
	{
		table: 'wp_usermeta',
		getPk: r => 'site_1_user_' + r.user_id + '_meta',
		getRk: r => r.meta_key,
	},
	{
		table: 'wp_posts',
		getPk: () => 'site_1_posts',
		getRk: r => r.ID.toString(),
	},
	{
		table: 'wp_postmeta',
		getPk: r => 'site_1_post_' + r.post_id + '_meta',
		getRk: r => r.meta_key,
	},
	{
		table: 'wp_comments',
		getPk: r => 'site_1_post_' + r.comment_post_ID + '_comments',
		getRk: r => r.comment_ID.toString(),
	},
	{
		table: 'wp_commentmeta',
		getPk: r => 'site_1_post_' + r.comment_post_ID + '_comment_' + r.comment_ID + '_meta',
		getRk: r => r.meta_key,
	},
].map( params => ( callback ) => importTable( params, callback ) );

const addTaxonomy = ( callback ) => {
	const query = 'SELECT * FROM wp_terms AS A LEFT JOIN wp_term_taxonomy AS B ON A.term_id=B.term_id';
	connection.query( query, ( err, rows ) => {
		if ( err ) return callback( err );

		const tasks = rows.map( ( row ) => ( cb ) => {
			const partitionKey = 'site_1_categories';
			const rowKey = row.slug;
			const item = Object.assign( {}, row, { partitionKey, rowKey } );
			ddb.put( item, ( e, r ) => {
				if ( e ) return cb( e );

				console.log( 'added: ' + partitionKey + ' / ' + rowKey );
				cb( null, r );
			} );
		} );

		Async.series( tasks, ( error ) => {
			if ( error ) return callback( error );
			return callback( null, 'imported categories' );
		} );
	} );
};

const updatePostTaxonomy = ( callback ) => {
	const query = 'SELECT * FROM wp_term_relationships AS A LEFT JOIN wp_terms AS B ON A.term_taxonomy_id=B.term_id ORDER BY object_id, term_order';
	connection.query( query, ( error, rows ) => {
		if ( error ) return callback( error );

		const tasks = rows.map( ( row ) => ( cb ) => {
			ddb.fetch( 'site_1_posts', row.object_id.toString(), ( err, post ) => {
				if ( err ) return cb( err );

				const arr = post.terms || [];
				arr.push( row.slug );
				post.terms = arr;

				console.log( 'updating post ' + post.ID + ' with term ' + row.slug );
				ddb.put( post, cb );
			} )
		} );

		Async.parallel( tasks, callback );
	} );
};

Async.series( [ ...importTasks, addTaxonomy, updatePostTaxonomy ], ( error, result ) => {
	console.dir( error );
	console.dir( result );
	connection.end();
} );
