const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPartitionName: params => 'site_' + params.site + '_post_' + params.post + '_meta',
	getParamId: params => params.meta,
	getPayloadId: payload => payload.meta_key,
} );

module.exports = controller.getExports();
