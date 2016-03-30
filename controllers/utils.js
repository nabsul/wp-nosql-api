const Boom = require( 'boom' );

module.exports.replyHandler = ( err, data, reply ) => {
	if ( err ) {
		reply( Boom.badImplementation( 'error encountered', err ) );
	}

	reply( data );
};
