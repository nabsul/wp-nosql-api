const dynamo = require( '../lib/dynamodb' ).dynamoDb;
const _ = require( 'lodash' );

dynamo.scan( {}, ( err, data ) => {
	if ( err ) throw err;

	_.sortBy( data.Items, i => i.partitionKey.S ).forEach( ( i ) => {
		console.log( i.partitionKey.S + ' / ' + i.rowKey.S );
	} );

	const groups = _.groupBy( data.Items, i => i.partitionKey.S );
	_.sortBy( Object.keys( groups ), k => k ).forEach( ( g ) => {
		console.log( g + ': ' + groups[g].length );
	} );

	console.log( 'total: ' + data.Items.length );
} );
