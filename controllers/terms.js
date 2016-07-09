const Controller = require( '../lib/controller' );

const controller = new Controller( {
	getPkFromParams: params => 'site_' + params.site + '_categories',
	getRkFromParams: params => params.term,
	getRkFromPayload: payload => payload.term_id,
} );

module.exports = controller.getExports();
