const crud = require( './crud' );

const getPartition = ( siteId ) => {
	return 'site_' + siteId + '_users';
};

const fetchAll = ( params, callback ) => {
	crud.fetchAll( {
		pk: getPartition( params.userId )
	}, callback );
};

const fetch = ( params, callback ) => {
	crud.fetch( {
		pk: getPartition( params.siteId ),
		id: params.userId,
	}, callback );
};

const put = ( params, callback ) => {
	crud.put( Object.assign( { pk: getPartition( params.siteId ) }, params.item ), callback );
};

const remove = ( params, callback ) => {
	crud.remove( {
		pk: getPartition( params.siteId ),
		id: params.userId,
	}, callback );
};

module.exports = {
	fetchAll,
	fetch,
	put,
	remove,
};
