const dynamo = require( '../lib/dynamodb' );

dynamo.dynamoDb.scan( {}, ( error, data ) => {
	if ( error ) throw error;

	data.Items.forEach( item => {
		dynamo.remove( item.partitionKey.S, item.rowKey.S, ( err ) => {
			if ( err ) throw err;
			console.log( 'deleted: ' + item.partitionKey.S + ' - ' + item.rowKey.S )
		} );
	} );
} );
