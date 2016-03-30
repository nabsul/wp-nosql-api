const dynamo = require( '../controllers/dynamodb' );

dynamo.scan( {}, ( err, data ) => {
	if ( err ) {
		return console.dir( err );
	}

	console.dir( data );
} );
