const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPartitionName: params => 'site_' + params.site + '_posts',
	getParamId: params => params.post,
	getPayloadId: payload => payload.ID,
} );

module.exports = controller.getExports();
