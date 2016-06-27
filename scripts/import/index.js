'use strict';
const Async = require( 'async' );
const connection = require( './connection' );
const importTables = require( './import-tables' );
const addMeta = require( './add-meta' );
const addTaxonomy = require( './add-taxonomy' );

Async.series( [ importTables, addMeta, addTaxonomy ], ( error, result ) => {
	if ( error ) throw error;
	console.dir( result );
	connection.end();
} );
