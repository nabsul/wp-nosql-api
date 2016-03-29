const Hapi = require( 'hapi' );
const port = 5000;

const server = new Hapi.Server();
server.connection( { port: port } );
server.register( [
	require( './routes/' ),
	require( './log' ),
], ( err ) => {
	/* $lab:coverage:off$ */
	if ( err ) {
		console.error( err );
		return;
	}
	/* $lab:coverage:on$ */

	server.start( () => {
		console.info( 'Server started at ' + server.info.uri );
	} );
} );

module.exports = server;
