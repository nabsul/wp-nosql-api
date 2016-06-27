const Async = require( 'async' );
const connection = require( './connection' );
const ddb = require( '../../lib/dynamodb' );

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

		Async.series( tasks, ( err ) => {
			if ( err ) return callback( err );
			return callback( null, 'updated post taxonomy' );
		} );
	} );
};

module.exports = ( callback ) => Async.series( [ addTaxonomy, updatePostTaxonomy ], callback );
