module.exports = params => [
	{
		method: 'GET',
		path: params.basePath,
		config: {
			handler: params.controller.fetchAll,
			id: params.name + '_get_all',
		},
	},
	{
		method: 'GET',
		path: params.basePath + '/{' + params.paramName + '}',
		config: {
			handler: params.controller.fetch,
			id: params.name + '_get_one',
		},
	},
	{
		method: 'PUT',
		path: params.basePath,
		config: {
			handler: params.controller.put,
			id: params.name + '_put',
		},
	},
	{
		method: 'DELETE',
		path: params.basePath + '/{' + params.paramName + '}',
		config: {
			handler: params.controller.remove,
			id: params.name + '_delete',
		},
	},
];