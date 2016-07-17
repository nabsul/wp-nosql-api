const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPkFromParams: params => 'site_' + params.site + '_post_' + params.post + '_comments',
	getRkFromParams: params => params.comment,
	getRkFromPayload: payload => payload.comment_ID,
} );

module.exports = controller.getExports();
