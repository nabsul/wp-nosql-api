const dynamo = require( './dynamodb' );

const getLookupParams = ( params ) => {
	return {
		Key: {
			dynamoPk: { S: params.dynamoPk },
			dynamoId: { S: params.dynamoId },
		},
	};
};

const dynamoToApi = ( item ) => {
	const ret = {};

	Object.keys( item ).forEach( ( k ) => {
		if ( 'dynamoPk' !== k && 'dynamoId' !== k ) {
			ret[ k ] = item[ k ].S;
		}
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
	console.dir(params);
	const query = {
		KeyConditionExpression: 'dynamoPk = :pk',
		ExpressionAttributeValues: {
			':pk': { S: params.dynamoPk },
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
	dynamo.getItem( getLookupParams( params ), ( err, data ) => {
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
	dynamo.putItem( {
		Item: apiToDynamo( item ),
	}, ( err ) => {
		if ( err ) {
			return callback( err );
		}

		fetch( item, callback );
	} );
};

const remove = ( params, callback ) => {
	dynamo.deleteItem( getLookupParams( params ), ( err, data ) => {
		if ( err ) {
			return callback( err );
		}

		callback( null, null );
	} );
};

module.exports = {
	fetchAll,
	fetch,
	put,
	remove,
};
