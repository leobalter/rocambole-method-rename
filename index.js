"use strict";

var rocambole = require( "rocambole" ),
	files = require( "./lib/files.js" );

module.exports = function( contents, oldName, newName ) {
	var parsed;

	parsed = rocambole.moonwalk( contents, function( node ) {
		var name, myNode;

		if ( node.type !== "ExpressionStatement" ) {
			return;
		}

		try {
			name = node.expression.callee.toString();
		} catch ( e ) {
			return;
		}

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
};

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

// Utils
module.exports.jsFiles = files.jsFiles;
module.exports.fileContents = files.fileContents;
