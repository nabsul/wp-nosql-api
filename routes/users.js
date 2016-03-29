const models = require( '../models' );
const users = models.users;

const routes = [
	{
		method: 'GET',
		path: '/site/{site}/users',
		config: {
			handler: function( request, reply ) {
				users.fetchAll( {
					siteId: request.params.site
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'users_get_all',
		},
	},
	{
		method: 'GET',
		path: '/site/{site}/users/{id}',
		config: {
			handler: function( request, reply ) {
				users.fetch( {
					siteId: request.params.site,
					postId: request.params.id,
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'users_get_one',
		},
	},
	{
		method: 'PUT',
		path: '/site/{site}/users',
		config: {
			handler: function( request, reply ) {
				users.put( {
					siteId: request.params.site,
					item: request.payload,
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'users_put',
		},
	},
	{
		method: 'DELETE',
		path: '/site/{site}/users/{id}',
		config: {
			handler: function( request, reply ) {
				users.remove( {
					siteId: request.params.site,
					postId: request.params.id,
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'users_delete',
		},
	},
];

module.exports = routes;
