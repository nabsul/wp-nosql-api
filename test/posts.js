const Code = require( 'code' );
const Lab = require( 'lab' );
const server = require( '../' );

const lab = exports.lab = Lab.script();

lab.experiment( 'posts endpoint', () => {
	lab.it( 'get all', ( done ) => {
		server.inject( { method: 'GET', url: '/posts' }, ( res ) => {
			Code.expect( res.statusCode ).to.equal( 200 );
			Code.expect( res.result ).to.only.contain( { message: 'hello world' } );
			done();
		} );
	} );

	lab.it( 'get one', ( done ) => {
		server.inject( { method: 'GET', url: '/posts/1' }, ( res ) => {
			Code.expect( res.statusCode ).to.equal( 200 );
			Code.expect( res.result ).to.only.contain( { message: 'hello world' } );
			done();
		} );
	} );

	lab.it( 'add one', ( done ) => {
		server.inject( { method: 'POST', url: '/posts', payload: {} }, ( res ) => {
			Code.expect( res.statusCode ).to.equal( 200 );
			Code.expect( res.result ).to.only.contain( { message: 'hello world' } );
			done();
		} );
	} );

	lab.it( 'update one', ( done ) => {
		server.inject( { method: 'PUT', url: '/posts/1' }, ( res ) => {
			Code.expect( res.statusCode ).to.equal( 200 );
			Code.expect( res.result ).to.only.contain( { message: 'hello world' } );
			done();
		} );
	} );

	lab.it( 'delete one', ( done ) => {
		server.inject( { method: 'DELETE', url: '/posts/1' }, ( res ) => {
			Code.expect( res.statusCode ).to.equal( 200 );
			Code.expect( res.result ).to.only.contain( { message: 'hello world' } );
			done();
		} );
	} );
} );
