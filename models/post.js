const dynamo = require( './dynamodb' );

const getPartition = ( siteId ) => {
	return 'site_' + siteId + '_posts';
};

const getKeyValue = ( params ) => {
	return {
		Key: {
			pk: { S: getPartition( params.siteId ) },
			id: { S: params.postId },
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

const apiToDynamo = ( siteId, item ) => {
	const ret =  {
		pk: { S: getPartition( siteId ) },
	};

	Object.keys( item ).forEach( ( k ) => {
		ret[ k ] = { S: item[ k ] };
	} );

	return ret;
};

const fetchAll = ( params, callback ) => {
	const query = {
		KeyConditionExpression: 'pk = :pk',
		ExpressionAttributeValues: {
			':pk': { S: getPartition( params.siteId ) },
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

		callback( null, dynamoToApi( data.Item ) );
	} );
};

const put = ( params, callback ) => {
	console.dir(params);
	dynamo.putItem( {
		Item: apiToDynamo( params.siteId, params.item )
	}, ( err, data ) => {
		if ( err ) {
			console.dir(err);
			return callback( err );
		}

		console.dir(data);
		callback( null, params.item );
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
