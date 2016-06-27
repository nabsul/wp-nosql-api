const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPartitionName: params => 'site_' + params.site + '_terms',
	getParamId: params => params.term,
	getPayloadId: payload => payload.term_id,
} );

module.exports = controller.getExports();
