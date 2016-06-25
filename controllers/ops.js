const dynamo = require( './dynamodb' );
const _ = require( 'lodash' );

const getLookupParams = ( pk, id ) => {
	return {
		Key: {
			dynamoPk: { S: pk.toString() },
			dynamoId: { S: id.toString() },
		},
	};
};

const addKeys = ( pk, id, item ) => {
	return Object.assign( {}, item, { dynamoPk: pk, dynamoId: id } );
};

const dynamoToApi = ( item ) => {
	return _.mapValues( item, ( value ) => value.S );
};

const apiToDynamo = ( item ) => {
	return _.mapValues( item, ( value ) => {
		return { S: value };
	} );
};

const fetchPartition = ( pk, callback ) => {
	const query = {
		KeyConditionExpression: 'dynamoPk = :pk',
		ExpressionAttributeValues: {
			':pk': { S: pk },
		},
	};

	dynamo.query( query, ( err, data ) => {
		if ( err ) {
			return callback( err );
		}

		return callback( null, data.Items.map( dynamoToApi ) );
	} );
};

const fetch = ( pk, id, callback ) => {
	if ( ! callback && 'function' === typeof id ) {
		callback = id;
		return fetchPartition( pk, callback );
	}

	dynamo.getItem( getLookupParams( pk, id ), ( err, data ) => {
		if ( err ) {
			return callback( err );
		}

		if ( ! data.Item ) {
			return callback( null, null );
		}

		callback( null, dynamoToApi( data.Item ) );
	} );
};

const put = ( pk, id, item, callback ) => {
	dynamo.putItem( {
		Item: apiToDynamo( addKeys( pk, id, item ) ),
	}, ( err ) => {
		if ( err ) {
			return callback( err );
		}

		fetch( pk, id, callback );
	} );
};

const remove = ( pk, id, callback ) => {
	dynamo.deleteItem( getLookupParams( pk, id ), ( err, data ) => {
		if ( err ) {
			return callback( err );
		}

		callback( null, data );
	} );
};

module.exports = {
	fetch,
	put,
	remove,
};
