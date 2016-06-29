const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPkFromParams: params => 'site_' + params.site + '_users',
	getRkFromParams: params => params.user,
	getRkFromPayload: payload => payload.ID,
} );

module.exports = controller.getExports();
