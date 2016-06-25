const AWS = require( 'aws-sdk' );

AWS.config.apiVersions = {
	dynamodb: '2012-08-10',
};


const config = {
	accessKeyId: process.env.WP_NOSQL_ID,
	secretAccessKey: process.env.WP_NOSQL_KEY,
	region: 'us-west-2',
	endpoint: 'http://localhost:8000',
	params: {
		TableName: process.env.WP_NOSQL_TABLE,
	},
};

const dynamodb = new AWS.DynamoDB( config );


module.exports = dynamodb;
