const commentMeta = require( '../controllers' ).commentMeta;

module.exports = [
	{
		method: 'GET',
		path: '/site/{site}/posts/{post}/comments/{comment}/meta',
		config: {
			handler: comments.fetchAll,
			id: 'comments_get_all',
		},
	},
	{
		method: 'GET',
		path: '/site/{site}/posts/{post}/comments/{comment}/meta/{meta}',
		config: {
			handler: comments.fetch,
			id: 'comments_get_one',
		},
	},
	{
		method: 'PUT',
		path: '/site/{site}/posts/{post}/comments/{comment}/meta',
		config: {
			handler: comments.put,
			id: 'comments_put',
		},
	},
	{
		method: 'DELETE',
		path: '/site/{site}/posts/{post}/comments/{comment}/meta/{meta}',
		config: {
			handler: comments.remove,
			id: 'comments_delete',
		},
	},
];
