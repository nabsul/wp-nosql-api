const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPartitionName: params => 'site_' + params.site + '_post_' + params.post + '_comments',
	getParamId: params => params.comment,
	getPayloadId: payload => payload.comment_ID,
} );

module.exports = controller.getExports();
