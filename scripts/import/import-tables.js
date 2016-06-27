const Async = require( 'async' );
const connection = require( './connection' );
const ddb = require( '../../lib/dynamodb' );

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

const directImports = [
	{ table: 'wp_options', getPk: () => 'site_1_options', getRk: r => r.option_name },
	{ table: 'wp_users', getPk: () => 'site_1_users', getRk: r => r.user_login },
	{ table: 'wp_posts', getPk: () => 'site_1_posts', getRk: r => r.ID.toString() },
	{ table: 'wp_comments', getPk: r => 'site_1_post_' + r.comment_post_ID + '_comments', getRk: r => r.comment_ID.toString() },
].map( params => ( callback ) => importTable( params, callback ) );

module.exports = ( callback ) => Async.series( directImports, callback );
