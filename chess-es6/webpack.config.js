var path = require('path');
var webpack = require('webpack');
var ClosureCompilerPlugin = require('webpack-closure-compiler');

var closureCompiler = new ClosureCompilerPlugin();
closureCompiler.options['language_in'] = 'ECMASCRIPT6_STRICT';  // override the plugin's hard-coded default value of 'ES5';
closureCompiler.options['compilation_level'] = 'SIMPLE';   // 2015.09.01 the 'ADVANCED' setting was causing my unit tests to break
// closureCompiler.options['language_out'] = 'ES5';  // the default setting is 'ES5'

module.exports = {
    context: __dirname,
    entry: {
        'chess-es6': './bundle.js',
    },
    output: {
        path: path.join(__dirname, '../', 'app', 'assets', 'javascripts', 'generated'),
        filename: "[name]-bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: '/node_modules/'
            }
        ]
    }
};