module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		nodeunit: {
			all: [
				"test/core.js"
			]
		}
	});

	grunt.loadNpmTasks( "grunt-contrib-nodeunit" );

	grunt.registerTask( "default", [ "nodeunit" ] );
};