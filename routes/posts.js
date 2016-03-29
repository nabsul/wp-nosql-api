const models = require( '../models' );
const posts = models.posts;

const routes = [
	{
		method: 'GET',
		path: '/site/{site}/posts',
		config: {
			handler: function( request, reply ) {
				posts.fetchAll( {
					siteId: request.params.site
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'posts_get_all',
		},
	},
	{
		method: 'GET',
		path: '/site/{site}/posts/{id}',
		config: {
			handler: function( request, reply ) {
				posts.fetch( {
					siteId: request.params.site,
					postId: request.params.id,
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'posts_get_one',
		},
	},
	{
		method: 'PUT',
		path: '/site/{site}/posts',
		config: {
			handler: function( request, reply ) {
				posts.put( {
					siteId: request.params.site,
					item: request.payload,
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'posts_put',
		},
	},
	{
		method: 'DELETE',
		path: '/site/{site}/posts/{id}',
		config: {
			handler: function( request, reply ) {
				posts.remove( {
					siteId: request.params.site,
					postId: request.params.id,
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'posts_delete',
		},
	},
];

module.exports = routes;
