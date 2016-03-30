const Controller = require( './controller' );

const controller = new Controller( {
	getPartitionName: params => 'site_' + params.site + '_terms_' + params.term + '_taxonomy',
	getParamId: params => params.taxonomy,
	getPayloadId: payload => payload.term_taxonomy_id,
} );

module.exports = controller.getExports();
