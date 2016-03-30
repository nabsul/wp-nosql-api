const posts = require( '../controllers' ).posts;

module.exports = [
	{
		method: 'GET',
		path: '/site/{site}/posts',
		config: {
			handler: posts.fetchAll,
			id: 'posts_get_all',
		},
	},
	{
		method: 'GET',
		path: '/site/{site}/posts/{post}',
		config: {
			handler: posts.fetch,
			id: 'posts_get_one',
		},
	},
	{
		method: 'PUT',
		path: '/site/{site}/posts',
		config: {
			handler: posts.put,
			id: 'posts_put',
		},
	},
	{
		method: 'DELETE',
		path: '/site/{site}/posts/{post}',
		config: {
			handler: posts.remove,
			id: 'posts_delete',
		},
	},
];
