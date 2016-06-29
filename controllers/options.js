const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPkFromParams: params => 'site_' + params.site + '_options',
	getRkFromParams: params => params.option,
	getRkFromPayload: payload => payload.option_name,
} );

module.exports = controller.getExports();
