const dynamo = require( './dynamodb' );

const params = {
	KeyConditionExpression: 'pk = :test',
	ExpressionAttributeValues: {
		':test': { S: 'test' },
	},
	Limit: 1,
};

const callback = ( err, data ) => {
	if ( err ) {
		console.dir( err );
		return;
	}

	console.dir( data, { depth: null } );

	if ( data.LastEvaluatedKey ) {
		dynamo.query( Object.assign( { ExclusiveStartKey: data.LastEvaluatedKey }, params ), callback );
	}
};

dynamo.query( params, callback );


dynamo.getItem( {
	Key: {
		pk: { S: 'test' },
		id: { S: '00002' },
	}
}, callback );
