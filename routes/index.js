const Hoek = require( 'hoek' );
const controllers = require( '../controllers' );
const Generator = require( './generator' );

const routes = Hoek.flatten( [
	Generator( 'options', 'option', '/site/{site}/options', controllers.options ),
	Generator( 'users', 'user', '/site/{site}/users', controllers.users ),
	Generator( 'posts', 'post', '/site/{site}/posts', controllers.posts ),
	Generator( 'comments', 'comment', '/site/{site}/posts/{post}/comments', controllers.comments ),
	Generator( 'terms', 'term', '/site/{site}/terms', controllers.terms ),
] );

exports.register = ( server, options, next ) => {
	server.route( routes );
	next();
};

exports.register.attributes = {
	name: 'base',
};
