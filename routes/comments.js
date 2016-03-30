const comments = require( '../controllers' ).comments;

module.exports = [
	{
		method: 'GET',
		path: '/site/{site}/posts/{post}/comments',
		config: {
			handler: comments.fetchAll,
			id: 'comments_get_all',
		},
	},
	{
		method: 'GET',
		path: '/site/{site}/posts/{post}/comments/{comment}',
		config: {
			handler: comments.fetch,
			id: 'comments_get_one',
		},
	},
	{
		method: 'PUT',
		path: '/site/{site}/posts/{post}/comments',
		config: {
			handler: comments.put,
			id: 'comments_put',
		},
	},
	{
		method: 'DELETE',
		path: '/site/{site}/posts/{post}/comments/{comment}',
		config: {
			handler: comments.remove,
			id: 'comments_delete',
		},
	},
];