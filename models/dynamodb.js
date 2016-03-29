const AWS = require( 'aws-sdk' );

AWS.config.apiVersions = {
	dynamodb: '2012-08-10',
};

const config = {
	params: {
		TableName: 'wp_nosql',
	},
	accessKeyId: process.env.WP_NOSQL_ID,
	secretAccessKey: process.env.WP_NOSQL_KEY,
	region: 'us-west-2',
};

const dynamodb = new AWS.DynamoDB( config );

module.exports = dynamodb;
