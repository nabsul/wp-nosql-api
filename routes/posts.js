const routes = [
	{
		method: 'GET',
		path: '/posts',
		config: {
			handler: function( request, reply ) {
				reply( { message: 'hello world' } );
			},
			id: 'posts_get_all',
		},
	},
	{
		method: 'GET',
		path: '/posts/{id}',
		config: {
			handler: function( request, reply ) {
				reply( { message: 'hello world' } );
			},
			id: 'posts_get_one',
		},
	},
	{
		method: 'POST',
		path: '/posts',
		config: {
			handler: function( request, reply ) {
				reply( { message: 'hello world' } );
			},
			id: 'posts_post',
		},
	},
	{
		method: 'PUT',
		path: '/posts/{id}',
		config: {
			handler: function( request, reply ) {
				reply( { message: 'hello world' } );
			},
			id: 'posts_put',
		},
	},
	{
		method: 'DELETE',
		path: '/posts/{id}',
		config: {
			handler: function( request, reply ) {
				reply( { message: 'hello world' } );
			},
			id: 'posts_delete',
		},
	},
];

module.exports = routes;
