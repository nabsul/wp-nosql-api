'use strict';
const Hoek = require( 'hoek' );
const Boom = require( 'boom' );
const crud = require( './crud' );

const replyHandler = ( err, data, reply ) => {
	if ( err ) {
		return reply( Boom.badImplementation( 'error encountered', err ) );
	}

	reply( data );
};

class Controller {
	constructor( params ) {
		this.getPartitionName = params.getPartitionName;
		this.getParamId = params.getParamId;
		this.getPayloadId = params.getPayloadId;
	}

	getPartition( params ) {
		return { dynamoPk: this.getPartitionName( params ) };
	}

	getLookup( params ) {
		return {
			dynamoPk: this.getPartitionName( params ),
			dynamoId: this.getParamId( params ).toString(),
		};
	};

	fetchAll( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		crud.fetchAll( this.getPartition( request.params ), cb );
	};

	fetch( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		crud.fetch( this.getLookup( request.params ), cb );
	};

	put( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		const data = this.getPartition( request.params );
		data.dynamoId = this.getPayloadId( request.payload );
		crud.put( Hoek.merge( data, request.payload ), cb );
	};

	remove( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		crud.remove( this.getLookup( request.params ), cb );
	};

	getExports() {
		return {
			fetchAll: ( request, reply ) => { this.fetchAll( request, reply ); } ,
				fetch: ( request, reply ) => { this.fetch( request, reply ); } ,
			put: ( request, reply ) => { this.put( request, reply ); } ,
			remove: ( request, reply ) => { this.remove( request, reply ); } ,
		};
	}
}

module.exports = Controller;
