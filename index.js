"use strict";

var path = require( "path" ),
	fs = require( "fs" ),
	rocambole = require( "rocambole" );

module.exports = function( file, oldName, newName ) {
	var contents = getFileContents( file );

	return filterMethods( contents, oldName, newName );
};

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
}

function filterMethods( contents, oldName, newName ) {
	var parsed;

	parsed = rocambole.moonwalk( contents, function( node ) {
		var name, myNode;

		if ( node.type !== "ExpressionStatement" ) {
			return;
		}

		name = node.expression.callee.toString();

		if ( name !== oldName ) {
			return;
		}

		myNode = node;

		while ( myNode.parent ) {
			myNode = myNode.parent;
			if ( !isScopedExpression( name, myNode ) ) {
				node.expression.callee.name = newName;
				node.startToken.value = newName;
			}
		}
	}).toString();

	return parsed;
}

function isScopedExpression( name, myNode ) {
	var inScope = false;

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
