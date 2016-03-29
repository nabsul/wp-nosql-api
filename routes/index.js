const Hoek = require( 'hoek' );

const testRoute = {
	method: 'GET',
	path: '/',
	config: {
		handler: function( request, reply ) {
			reply( { message: 'hello world' } );
		},
		id: 'index',
	},
};

const routes = Hoek.flatten( [
	testRoute,
	require( './posts' ),
] );

exports.register = ( server, options, next ) => {
	server.route( routes );
	next();
};

exports.register.attributes = {
	name: 'base',
};
