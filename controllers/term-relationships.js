const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPartitionName: params => 'site_' + params.site + '_taxonomy_' + params.term + '_relationships',
	getParamId: params => params.relationship,
	getPayloadId: payload => payload.object_id,
} );

module.exports = controller.getExports();
