const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPartitionName: params => 'site_' + params.site + '_options',
	getParamId: params => params.option,
	getPayloadId: payload => payload.option_name,
} );

module.exports = controller.getExports();
