var path = require( "path" ),
	fs = require( "fs" ),
	rmr = require( "../index.js" );

exports.example_1 = function( t ) {
	var fileIn = path.join( __dirname, 'source/example_1.js' ),
		fileOut = path.join( __dirname, 'expected/example_1.js' ),
		actual, expected;

	expected = fs.readFileSync( fileOut ).toString();

	actual = rmr( fileIn, "bola", "replaced" );

	t.equal( actual, expected );

	t.done();
};

exports.example_2 = function( t ) {
	var fileIn = path.join( __dirname, 'source/example_2.js' ),
		fileOut = path.join( __dirname, 'expected/example_2.js' ),
		actual, expected;

	expected = fs.readFileSync( fileOut ).toString();

	actual = rmr( fileIn, "bola", "replaced" );

	t.equal( actual, expected );

	t.done();
};