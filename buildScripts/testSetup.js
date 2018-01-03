//This file isnt transpiled so must use es5 and CommonJS

//Register babel to transpile before our test are run
require('babel-register')();

//Disable webpack features that Mocha doesn't understand
require.extensions['.css'] = function() {};
