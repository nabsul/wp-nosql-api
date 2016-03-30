const dynamo = require( '../controllers/dynamodb' );

dynamo.scan( {}, ( err, data ) => {
	if ( err ) return console.dir( err );

	data.Items.forEach( item => {
		const key = {
			Key: {
				dynamoPk: { S: item.dynamoPk.S },
				dynamoId: { S: item.dynamoId.S },
			},
		};
		dynamo.deleteItem( key, ( err, data ) => {
			if ( err ) return console.dir( err );
			console.dir( data );
		} );
	} );
} );
