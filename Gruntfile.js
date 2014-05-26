module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		nodeunit: {
			all: [
				"test/*.js"
			]
		},
		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			all: [
				"index.js",
				"test/*.js"
			]
		}
	});

	grunt.loadNpmTasks( "grunt-contrib-nodeunit" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );

	grunt.registerTask( "default", [ "jshint", "nodeunit" ] );
};