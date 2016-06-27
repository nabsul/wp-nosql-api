'use strict';
const Hoek = require( 'hoek' );
const Boom = require( 'boom' );
const ddb = require( './dynamodb' );

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

	fetchAll( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		ddb.fetchPartition( this.getPartitionName( request.params ), cb );
	};

	fetch( request, reply ) {
		console.dir( request.params );
		const pk = this.getPartitionName( request.params );
		const rk = this.getParamId( request.params );
		const cb = ( err, data ) => replyHandler( err, data, reply);
		ddb.fetch( pk, rk, cb );
	};

	put( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		const data = this.getPartition( request.params );
		data.dynamoId = this.getPayloadId( request.payload );
		ddb.put( Hoek.merge( data, request.payload ), cb );
	};

	remove( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		ddb.remove( this.getLookup( request.params ), cb );
	};

	getExports() {
		return {
			fetchAll: ( request, reply ) => this.fetchAll( request, reply ),
			fetch: ( request, reply ) => this.fetch( request, reply ),
			put: ( request, reply ) => this.put( request, reply ),
			update: ( request, reply ) => this.update( request, reply ),
			remove: ( request, reply ) => this.remove( request, reply ),
		};
	}
}

module.exports = Controller;
