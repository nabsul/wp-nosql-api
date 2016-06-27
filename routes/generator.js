module.exports = ( name, paramName, basePath, controller ) => [
	{
		method: 'GET',
		path: basePath,
		config: {
			handler: controller.fetchAll,
			id: name + '_get_all',
		},
	},
	{
		method: 'GET',
		path: basePath + '/{' + paramName + '}',
		config: {
			handler: controller.fetch,
			id: name + '_get_one',
		},
	},
	{
		method: 'PUT',
		path: basePath,
		config: {
			handler: controller.put,
			id: name + '_put',
		},
	},
	{
		method: 'DELETE',
		path: basePath + '/{' + paramName + '}',
		config: {
			handler: controller.remove,
			id: name + '_delete',
		},
	},
];