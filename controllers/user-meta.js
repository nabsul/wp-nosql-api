const Controller = require( './controller' );

const controller = new Controller( {
	getPartitionName: params => 'site_' + params.site + '_user_' + params.user + '_meta',
	getParamId: params => params.meta,
	getPayloadId: payload => payload.meta_key,
} );

module.exports = controller.getExports();
