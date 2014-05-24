"use strict";

var path = require( "path" ),
	fs = require( "fs" ),
	rocambole = require( "rocambole" ),
	nodeUpdate = ( "rocambole-node-update" );

module.export = filterMethods;

function getFileContents( file ) {
	try {
		file = path.resolve( __dirname, file );
		return fs.readFileSync( file ).toString();
	} catch ( ex ) {
		console.error(
			"Can't read source file: '" + file + "'\nException: " + ex.message
		);
		process.exit( 2 );
	}
};

function filterMethods( contents, oldName, newName ) {
	var i, l, x, 
		parsed, nodes,
		name, myNode,
		gotcha;

	nodes = [];

	parsed = rocambole.moonwalk( contents, function( node ) {
		if ( node.type !== "ExpressionStatement" ) {
			return;
		}

		nodes.push( node );

	}).toString();

	for ( i = 0, l = nodes.length; i < l; i++ ) {
		myNode = nodes[ i ];
		gotcha = false;

		name = myNode.expression.callee.toString();

		while ( !gotcha && myNode.parent ) {
			myNode = myNode.parent;
			gotcha = isScopedExpression( name, myNode.parent );
		}

		console.log( name, gotcha );
	}

	return parsed;
}

function isScopedExpression( name, myNode ) {
	var rocambole = require( "rocambole" );

	var inScope = false,
		parents = [];

	try {
		rocambole.moonwalk( myNode, function( node ) {
			if ( node.type === "VariableDeclaration" ) {
				for ( var i in node.declarations ) {
				 	if ( name === node.declarations[ i ].id.name ) {
				 		inScope = true;
				 	}
				}
			}
		});
	} catch( e ) {}

	return inScope;
}

filterMethods( getFileContents( "test.js" ), 'start' );