const Controller = require( './controller' );

const controller = new Controller( {
	getPartitionName: params => 'site_' + params.site + '_users',
	getParamId: params => params.user,
	getPayloadId: payload => payload.ID,
} );

module.exports = controller.getExports();
