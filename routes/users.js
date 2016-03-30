const users = require( '../controllers' ).users;

module.exports = [
	{
		method: 'GET',
		path: '/site/{site}/users',
		config: {
			handler: users.fetchAll,
			id: 'users_get_all',
		},
	},
	{
		method: 'GET',
		path: '/site/{site}/users/{user}',
		config: {
			handler: users.fetch,
			id: 'users_get_one',
		},
	},
	{
		method: 'PUT',
		path: '/site/{site}/users',
		config: {
			handler: users.put,
			id: 'users_put',
		},
	},
	{
		method: 'DELETE',
		path: '/site/{site}/users/{user}',
		config: {
			handler: users.remove,
			id: 'users_delete',
		},
	},
];
