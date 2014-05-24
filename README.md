# Rocambole Method Rename

A tool to rename method names in JS files through [Rocambole](https://github.com/millermedeiros/rocambole).

[![Build Status](https://travis-ci.org/leobalter/rocambole-method-rename.svg)](https://travis-ci.org/leobalter/rocambole-method-rename)

## Instalation:

```sh
$ npm install rocambole-method-rename
```

## Usage example

```js
// TL;DR, it returns a string
require( "rocambole-method-rename" )( src, "oldMethodName", "newMethodName" );
```

### Other:

```js
(function() {
	var path = require( "path" ),
		rmr = require( "rocambole-method-rename" ),
		src = path.join( __dirname, "source.js" ),
		result;

	// Sends a file path
	// Returns a string
	result = rmr( src, "oldMethodName", "newMethodName" );
})();
```

## Contributing

Issues and PRs are very welcome!

Please write tests with new features.

**Grunt!**
