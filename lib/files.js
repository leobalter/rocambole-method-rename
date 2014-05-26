"use strict";

var fs = require( "fs" ),
	path = require( "path" );

function jsFiles( dir ) {
	var testFiles;

	dir = path.resolve( ".", dir );
	testFiles = fs.readdirSync( dir );

	testFiles = testFiles
		.filter(function( file ) {
			return file.match( /\.js$/ );
		})
		.map(function( file ) {
			return path.resolve( dir, file );
		});

	return testFiles;
}

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
	jsFiles: jsFiles,
	fileContents: fileContents
};
