const Async = require( 'async' );
const connection = require( './connection' );
const ddb = require( '../../lib/dynamodb' );

const updateItem = ( row, params, callback ) => {
	const pk = params.getPk( row );
	const rk = params.getRk( row );
	ddb.fetch( pk, rk, ( error, item ) => {
		if ( error ) return callback( error );
		item.meta = item.meta || {};
		item.meta[ row.meta_key ] = row.meta_value || null;
		console.log( 'added meta to ' + item.partitionKey + ' / ' + item.rowKey + ' : ' + row.meta_key );
		ddb.put( item, callback );
	} );
};

const addMeta = ( params, callback ) => {
	connection.query( params.query, ( error, rows ) => {
		if ( error ) return callback( error );
		Async.mapSeries( rows, ( row, cb ) => updateItem( row, params, cb ), ( err ) => {
			if ( err ) return callback( err );
			callback( null, 'imported ' + params.table );
		} );
	})
};

const metaTasks = [
	{
		table: 'wp_usermeta',
		query: 'SELECT * FROM wp_usermeta AS A LEFT JOIN wp_users AS B ON A.user_id=B.ID',
		getPk: () => 'site_1_users',
		getRk: ( row ) => row.user_login,
	},
	{
		table: 'wp_postmeta',
		query: 'SELECT * FROM wp_postmeta',
		getPk: () => 'site_1_posts',
		getRk: ( row ) => row.post_id.toString()
	},
	{
		table: 'wp_commentmeta',
		query: 'SELECT * FROM wp_commentmeta AS A LEFT JOIN wp_comments AS B ON A.comment_id=B.comment_id',
		getPk: ( row ) => 'site_1_post_' + row.comment_post_ID.toString() + '_comments',
		getRk: ( row ) => row.comment_id.toString()
	},
].map( ( params ) => ( callback ) => addMeta( params, callback ) );

module.exports = ( callback ) => Async.series( metaTasks, callback );
