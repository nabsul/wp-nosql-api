'use strict';
const Boom = require( 'boom' );
const ddb = require( '../lib/dynamodb' );
const docs = ddb.dynamoDocs;

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
		}, ( error, data ) => replyHandler( error, data.Items, reply ) );
	};

	search( request, reply ) {
		const query = ddb.getQueryParams( request.payload );
		console.dir( query );

		if ( 0 < query.FilterExpression.length ) {
			query.FilterExpression += ' AND ';
		}

		query.FilterExpression += 'contains( partitionKey, :comment_string )';
		query.ExpressionAttributeValues[ ':comment_string'] = '_comments';

		docs.scan( query, ( error, data ) => replyHandler( error, data, reply ) );
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
