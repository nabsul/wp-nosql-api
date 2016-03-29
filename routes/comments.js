const models = require( '../models' );
const comments = models.comments;

const routes = [
	{
		method: 'GET',
		path: '/site/{site}/comments',
		config: {
			handler: function( request, reply ) {
				comments.fetchAll( {
					siteId: request.params.site
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'comments_get_all',
		},
	},
	{
		method: 'GET',
		path: '/site/{site}/comments/{id}',
		config: {
			handler: function( request, reply ) {
				comments.fetch( {
					siteId: request.params.site,
					postId: request.params.id,
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'comments_get_one',
		},
	},
	{
		method: 'PUT',
		path: '/site/{site}/comments',
		config: {
			handler: function( request, reply ) {
				comments.put( {
					siteId: request.params.site,
					item: request.payload,
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'comments_put',
		},
	},
	{
		method: 'DELETE',
		path: '/site/{site}/comments/{id}',
		config: {
			handler: function( request, reply ) {
				comments.remove( {
					siteId: request.params.site,
					postId: request.params.id,
				}, ( err, data ) => {
					reply( data );
				} );
			},
			id: 'comments_delete',
		},
	},
];

module.exports = routes;
