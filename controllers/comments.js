'use strict';
const Boom = require( 'boom' );
const docs = require( '../lib/dynamodb' ).dynamoDocs;
const Controller = require( '../lib/controller' );

const replyHandler = ( err, data, reply ) => {
	if ( err ) {

		return reply( Boom.badImplementation( 'error encountered', err ) );
	}

	reply( data );
};

class CommentsController {
	constructor( params ) {
	}

	fetchAll( request, reply ) {
		docs.scan( {
			FilterExpression: 'contains( partitionKey, :comment_string )',
			ExpressionAttributeValues: {
				':comment_string': '_comments',
			}
		}, ( error, data ) => {
			console.dir( error );
			console.dir( data );
			reply( data.Items );
		} );
	};

	search( request, reply ) {
		reply( new Boom.badImplementation( 'endpoint not implemented' ) );
	}

	fetch( request, reply ) {
		reply( new Boom.badImplementation( 'endpoint not implemented' ) );
	};

	post( request, reply ) {
		reply( new Boom.badImplementation( 'endpoint not implemented' ) );
	};

	put( request, reply ) {
		reply( new Boom.badImplementation( 'endpoint not implemented' ) );
	};

	remove( request, reply ) {
		reply( new Boom.badImplementation( 'endpoint not implemented' ) );
	};

	getExports() {
		return {
			fetchAll: ( request, reply ) => this.fetchAll( request, reply ),
			search: ( request, reply ) => this.search( request, reply ),
			fetch: ( request, reply ) => this.fetch( request, reply ),
			post: ( request, reply ) => this.post( request, reply ),
			put: ( request, reply ) => this.put( request, reply ),
			update: ( request, reply ) => this.update( request, reply ),
			remove: ( request, reply ) => this.remove( request, reply ),
		};
	}
}

const controller = new CommentsController();

module.exports = controller.getExports();
