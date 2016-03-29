const Code = require( 'code' );
const Lab = require( 'lab' );
const server = require( '../' );

const lab = exports.lab = Lab.script();

lab.experiment( 'base server', () => {
	lab.it( 'returns Hello World', ( done ) => {
		server.inject( '/', ( res ) => {
			Code.expect( res.statusCode ).to.equal( 200 );
			Code.expect( res.result ).to.only.contain( { message: 'hello world' } );
			done();
		} );
	} );
} );
