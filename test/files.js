var path = require( "path" ),
	rmr = require( "../index.js" ),
	fileContents = rmr.fileContents,
	jsFiles = rmr.jsFiles;

exports.jsFiles = function( t ) {
	var files = jsFiles( path.resolve( __dirname, "source" ) );

	t.ok( files.length );
	t.done();
};

exports.readMultipleFiles = function( t ) {
	var expectedFiles,
		originalFiles = jsFiles( path.resolve( __dirname, "source" ) );

	expectedFiles = originalFiles.map(function( file ) {
		return file.replace( "/test/source/example_", "/test/expected/example_" );
	});

	originalFiles.forEach(function( file, i ) {
		var actual, replaced;

		actual = fileContents( file );

		replaced = rmr( actual, "bola", "replaced" );

		t.equal( replaced, fileContents( expectedFiles[ i ] ) );
	});
	
	t.done();
};
