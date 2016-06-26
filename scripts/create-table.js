const ddb = require( '../lib/dynamodb' ).dynamoDb;

ddb.createTable( {
	TableName: 'wp_nosql',
	KeySchema: [
		{
			AttributeName: 'partitionKey',
			KeyType: 'HASH'
		},
		{
			AttributeName: 'rowKey',
			KeyType: 'RANGE'
		},
	],
	AttributeDefinitions: [
		{
			AttributeName: 'partitionKey',
			AttributeType: 'S'
		},
		{
			AttributeName: 'rowKey',
			AttributeType: 'S'
		},
	],
	ProvisionedThroughput:  {
		ReadCapacityUnits: 1,
		WriteCapacityUnits: 1
	},
}, ( error, data ) => {
	console.dir( error );
	console.dir( data );
} );
