'use strict';
const ddb = require( '../lib/dynamodb' ).dynamoDb;
const Async = require ( 'async' );

const createTable = ( params, callback ) => {
	ddb.createTable( {
		TableName: params.tableName,
		KeySchema: [ { AttributeName: params.pk, KeyType: 'HASH' }, { AttributeName: params.rk, KeyType: 'RANGE' } ],
		AttributeDefinitions: [ { AttributeName: params.pk, AttributeType: 'S' }, { AttributeName: params.rk, AttributeType: 'S' } ],
		ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
	}, ( error, data ) => {
		if ( error ) return callback( error );
		callback( data );
	} )
};

const tables = [
	{ tableName: 'wp_nosql', pk: 'partitionKey', rk: 'rowKey' }
];

Async.map( tables, createTable, ( error, data ) => {
	console.dir( error );
	console.dir( data );
} );
