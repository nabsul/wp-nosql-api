const ddb = require( '../controllers/dynamodb' );

ddb.deleteTable( {
	TableName: 'wp_nosql',
}, ( err, data ) => {
	if ( err ) throw err;
	console.dir( data );
} );
