const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPkFromParams: params => 'site_' + params.site + '_posts',
	getRkFromParams: params => params.post,
	getRkFromPayload: payload => payload.ID,
} );

module.exports = controller.getExports();
