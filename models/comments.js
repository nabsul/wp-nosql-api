const crud = require( './crud' );

const getPartition = ( params ) => {
	return 'site_' + params.siteId + '_post_' + params.postId + '_comments';
};

const fetchAll = ( params, callback ) => {
	crud.fetchAll( {
		pk: getPartition( params )
	}, callback );
};

const fetch = ( params, callback ) => {
	crud.fetch( {
		pk: getPartition( params ),
		id: params.commentId,
	}, callback );
};

const put = ( params, callback ) => {
	crud.put( Object.assign( { pk: getPartition( params ) }, params.item ), callback );
};

const remove = ( params, callback ) => {
	crud.remove( {
		pk: getPartition( params ),
		id: params.commentId,
	}, callback );
};

module.exports = {
	fetchAll,
	fetch,
	put,
	remove,
};
