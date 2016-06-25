const dynamo = require( '../controllers/dynamodb' );
const _ = require( 'lodash' );

dynamo.scan( {}, ( err, data ) => {
	if ( err ) throw err;

	_.sortBy( data.Items, i => i.dynamoPk.S ).forEach( ( i ) => {
		console.log( i.dynamoPk.S + ' / ' + i.dynamoId.S );
	} );

	const groups = _.groupBy( data.Items, i => i.dynamoPk.S );
	_.sortBy( Object.keys( groups ), k => k ).forEach( ( g ) => {
		console.log( g + ': ' + groups[g].length );
	} );

	console.log( 'total: ' + data.Items.length );
} );
