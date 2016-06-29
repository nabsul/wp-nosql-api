'use strict';
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
		this.getPkFromParams = params.getPkFromParams;
		this.getRkFromParams = params.getRkFromParams;
		this.getRkFromPayload = params.getRkFromPayload;
	}

	fetchAll( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		ddb.fetchPartition( this.getPkFromParams( request.params ), cb );
	};

	fetch( request, reply ) {
		console.dir( request.params );
		const pk = this.getPkFromParams( request.params );
		const rk = this.getRkFromParams( request.params );
		const cb = ( err, data ) => replyHandler( err, data, reply);
		ddb.fetch( pk, rk, cb );
	};

	post( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		const partitionKey = this.getPkFromParams( request.params );
		const rowKey = this.getRkFromPayload( request.payload );
		const item = Object.assign( { partitionKey, rowKey }, request.payload );
		console.log( 'putting' );
		console.dir( item );
		ddb.put( item, cb );
	};

	put( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		const partitionKey = this.getPkFromParams( request.params );
		const rowKey = this.getRkFromPayload( request.payload );
		const item = Object.assign( { partitionKey, rowKey }, request.payload );
		ddb.put( item, cb );
	};

	remove( request, reply ) {
		const cb = ( err, data ) => replyHandler( err, data, reply);
		const pk = this.getPkFromParams( request.params );
		const rk = this.getRkFromParams( request.params );
		ddb.remove( pk, rk, cb );
	};

	getExports() {
		return {
			fetchAll: ( request, reply ) => this.fetchAll( request, reply ),
			fetch: ( request, reply ) => this.fetch( request, reply ),
			post: ( request, reply ) => this.post( request, reply ),
			put: ( request, reply ) => this.put( request, reply ),
			update: ( request, reply ) => this.update( request, reply ),
			remove: ( request, reply ) => this.remove( request, reply ),
		};
	}
}

module.exports = Controller;
