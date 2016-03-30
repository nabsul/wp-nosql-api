const Controller = require( './controller' );

const controller = new Controller( {
	getPartitionName: params => 'site_' + params.site + '_links',
	getParamId: params => params.link,
	getPayloadId: payload => payload.link_id,
} );

module.exports = controller.getExports();
