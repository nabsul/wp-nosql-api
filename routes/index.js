const Hoek = require( 'hoek' );
const controllers = require( '../controllers' );
const Generator = require( './generator' );

const routes = Hoek.flatten( [
	Generator( {
		name: 'options',
		paramName: 'option',
		basePath: '/site/{site}/options',
		controller: controllers.options,
	} ),
	Generator( {
		name: 'users',
		paramName: 'user',
		basePath: '/site/{site}/users',
		controller: controllers.users,
	} ),
	Generator( {
		name: 'usermeta',
		paramName: 'meta',
		basePath: '/site/{site}/users/{user}/meta',
		controller: controllers.userMeta,
	} ),
	Generator( {
		name: 'posts',
		paramName: 'post',
		basePath: '/site/{site}/posts',
		controller: controllers.posts,
	} ),
	Generator( {
		name: 'postmeta',
		paramName: 'meta',
		basePath: '/site/{site}/posts/{post}/meta',
		controller: controllers.postsMeta,
	} ),
	Generator( {
		name: 'comments',
		paramName: 'comment',
		basePath: '/site/{site}/posts/{post}/comments',
		controller: controllers.comments,
	} ),
	Generator( {
		name: 'commentmeta',
		paramName: 'meta',
		basePath: '/site/{site}/posts/{post}/comments/{comment}/meta',
		controller: controllers.commentMeta,
	} ),
	Generator( {
		name: 'terms',
		paramName: 'term',
		basePath: '/site/{site}/terms',
		controller: controllers.terms,
	} ),
	Generator( {
		name: 'termmeta',
		paramName: 'meta',
		basePath: '/site/{site}/terms/{term}/meta',
		controller: controllers.termMeta,
	} ),
	Generator( {
		name: 'termrelationships',
		paramName: 'relationship',
		basePath: '/site/{site}/terms/{term}/relationship',
		controller: controllers.termRelationships,
	} ),
	Generator( {
		name: 'termtaxonomy',
		paramName: 'taxonomy',
		basePath: '/site/{site}/terms/{term}/taxonomy',
		controller: controllers.termTaxonomy,
	} ),
] );

exports.register = ( server, options, next ) => {
	server.route( routes );
	next();
};

exports.register.attributes = {
	name: 'base',
};
