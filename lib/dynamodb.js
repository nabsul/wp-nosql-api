'use strict';
const AWS = require( 'aws-sdk' );
const _ = require( 'lodash' );

AWS.config.apiVersions = {
	dynamodb: '2012-08-10',
};

const config = {
	accessKeyId: process.env.WP_NOSQL_ID || 'ABC',
	secretAccessKey: process.env.WP_NOSQL_KEY || 'ABC',
	region: 'us-west-2',
	endpoint: 'http://localhost:8000',
	params: {
		TableName: process.env.WP_NOSQL_TABLE || 'wp_nosql',
	},
};

const dynamoDb = new AWS.DynamoDB( config );
const dynamoDocs = new AWS.DynamoDB.DocumentClient( config );

const fetchPartition = ( partitionKey, callback ) => {
	const query = {
		KeyConditionExpression: 'partitionKey = :pk',
		ExpressionAttributeValues: {
			':pk': partitionKey,
		},
	};

	dynamoDocs.query( query, callback );
};

const fetch = ( partitionKey, rowKey, callback ) => {
	dynamoDocs.get( { Key: { partitionKey, rowKey } }, ( error, result ) => {
		if ( error ) return callback( error );
		callback( null, result.Item );
	} );
};

const put = ( item, callback ) => {
	item = _.pickBy( item, v => v );
	dynamoDocs.put( { Item: item }, callback );
};

const remove = ( partitionKey, rowKey, callback ) => {
	dynamoDocs.delete( { Key: { partitionKey, rowKey } }, callback );
};

module.exports = {
	dynamoDb,
	dynamoDocs,
	fetch,
	fetchPartition,
	put,
	remove,
};
