var path = require( "path" ),
	fs = require( "fs" ),
	rmr = require( "../index.js" ),
	fileContents = rmr.fileContents;

exports.example_1 = function( t ) {
	var fileIn = path.resolve( __dirname, "source/example_1.js" ),
		fileOut = path.resolve( __dirname, "expected/example_1.js" ),
		actual, expected;

	actual = rmr( fileContents( fileIn ), "bola", "replaced" );
	expected = fs.readFileSync( fileOut ).toString();

	t.equal( actual, expected );

	t.done();
};

exports.example_2 = function( t ) {
	var fileIn = path.resolve( __dirname, "source/example_2.js" ),
		fileOut = path.resolve( __dirname, "expected/example_2.js" ),
		actual, expected;

	actual = rmr( fileContents( fileIn ), "bola", "replaced" );
	expected = fs.readFileSync( fileOut ).toString();

	t.equal( actual, expected );

	t.done();
};
