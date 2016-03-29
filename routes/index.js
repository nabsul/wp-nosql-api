const Hoek = require( 'hoek' );

const routes = Hoek.flatten( [
	require( './users' ),
	require( './posts' ),
	require( './comments' ),
] );

exports.register = ( server, options, next ) => {
	server.route( routes );
	next();
};

exports.register.attributes = {
	name: 'base',
};
