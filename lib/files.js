"use strict";

var fs = require( "fs" ),
	path = require( "path" );

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

function setFileContents( file, src ) {
	try {
		file = path.resolve( __dirname, file );
		return fs.writeFileSync( file, src ) ;
	} catch ( ex ) {
		console.error(
			"Can't write file: '" + file + "'\nException: " + ex.message
		);
		process.exit( 2 );
	}
}

function fileContents( file, src ) {
	if ( !src ) {
		return getFileContents( file );
	} else {
		return setFileContents( file, src );
	}
}

module.exports = {
	fileContents: fileContents
};
