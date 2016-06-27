const Hoek = require( 'hoek' );
const controllers = require( '../controllers' );
const Generator = require( './generator' );

const routes = Hoek.flatten( [
	Generator( 'options', 'option', '/site/{site}/options', controllers.options ),
	Generator( 'users', 'user', '/site/{site}/users', controllers.users ),
	Generator( 'usermeta', 'meta', '/site/{site}/users/{user}/meta', controllers.userMeta ),
	Generator( 'posts', 'post', '/site/{site}/posts', controllers.posts ),
	Generator( 'postmeta', 'meta', '/site/{site}/posts/{post}/meta', controllers.postsMeta ),
	Generator( 'comments', 'comment', '/site/{site}/posts/{post}/comments', controllers.comments ),
	Generator( 'commentmeta', 'meta', '/site/{site}/posts/{post}/comments/{comment}/meta', controllers.commentMeta ),
	Generator( 'terms', 'term', '/site/{site}/terms', controllers.terms ),
	Generator( 'termmeta', 'meta', '/site/{site}/terms/{term}/meta', controllers.termMeta ),
	Generator( 'termrelationships', 'relationship', '/site/{site}/terms/{term}/relationship', controllers.termRelationships ),
	Generator( 'termtaxonomy', 'taxonomy', '/site/{site}/terms/{term}/taxonomy', controllers.termTaxonomy ),
] );

exports.register = ( server, options, next ) => {
	server.route( routes );
	next();
};

exports.register.attributes = {
	name: 'base',
};
