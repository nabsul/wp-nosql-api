const crud = require( './crud' );

const getPartition = ( siteId ) => {
	return 'site_' + siteId + '_posts';
};

const fetchAll = ( params, callback ) => {
	crud.fetchAll( {
		pk: getPartition( params.siteId )
	}, callback );
};

const fetch = ( params, callback ) => {
	crud.fetch( {
		pk: getPartition( params.siteId ),
		id: params.postId,
	}, callback );
};

const put = ( params, callback ) => {
	crud.put( Object.assign( { pk: getPartition( params.siteId ) }, params.item ), callback );
};

const remove = ( params, callback ) => {
	crud.remove( {
		pk: getPartition( params.siteId ),
		id: params.postId,
	}, callback );
};

module.exports = {
	fetchAll,
	fetch,
	put,
	remove,
};
