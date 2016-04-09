const dynamo = require( '../controllers/dynamodb' );

dynamo.scan( {}, ( err, data ) => {
	if ( err ) {
		return console.dir( err );
	}

	data.Items.forEach( i => console.dir( { pk: i.dynamoPk.S, id: i.dynamoId.S } ) );
	console.dir(data, {depth:0})
} );
