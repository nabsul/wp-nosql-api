const dynamo = require( './dynamodb' );

const getKeyValue = ( params ) => {
	return {
		Key: {
			pk: { S: params.pk },
			id: { S: params.id },
		}
	};
};

const dynamoToApi = ( item ) => {
	const ret = {};

	Object.keys( item ).forEach( ( k ) => {
		ret[ k ] = item[ k ].S;
	} );

	return ret;
};

const apiToDynamo = ( item ) => {
	const ret =  {};

	Object.keys( item ).forEach( ( k ) => {
		ret[ k ] = { S: item[ k ] };
	} );

	return ret;
};

const fetchAll = ( params, callback ) => {
	const query = {
		KeyConditionExpression: 'pk = :pk',
		ExpressionAttributeValues: {
			':pk': { S: params.pk },
		},
	};

	dynamo.query( query, ( err, data ) => {
		if ( err ) {
			return callback( err );
		}

		return callback( null, data.Items.map( dynamoToApi ) );
	} );
};

const fetch = ( params, callback ) => {
	dynamo.getItem( getKeyValue( params ), ( err, data ) => {
		if ( err ) {
			return callback( err );
		}

		if ( ! data.Item ) {
			return callback( null, null );
		}

		callback( null, dynamoToApi( data.Item ) );
	} );
};

const put = ( item, callback ) => {
	console.dir( item );
	dynamo.putItem( {
		Item: apiToDynamo( item )
	}, ( err ) => {
		if ( err ) {
			return callback( err );
		}

		callback( null, item );
	} );
};

const remove = ( params, callback ) => {
	dynamo.deleteItem( getKeyValue( params ), ( err, data ) => {
		if ( err ) {
			return callback( err );
		}

		callback( null, dynamoToApi( data.Item ) );
	} );
};

module.exports = {
	fetchAll,
	fetch,
	put,
	remove,
};
