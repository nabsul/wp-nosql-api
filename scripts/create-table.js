const ddb = require( '../controllers/dynamodb' );

ddb.createTable( {
	TableName: 'wp_nosql',
	KeySchema: [
		{
			AttributeName: 'dynamoPk',
			KeyType: 'HASH'
		},
		{
			AttributeName: 'dynamoId',
			KeyType: 'RANGE'
		},
	],
	AttributeDefinitions: [
		{
			AttributeName: 'dynamoPk',
			AttributeType: 'S'
		},
		{
			AttributeName: 'dynamoId',
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
