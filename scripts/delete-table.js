const ddb = require( '../lib/dynamodb' ).dynamoDb;

ddb.deleteTable( {}, ( err, data ) => {
	if ( err ) throw err;
	console.dir( data );
} );
