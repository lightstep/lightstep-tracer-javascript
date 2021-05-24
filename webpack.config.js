const path = require('path');

const webpack = require('webpack');

const DEBUG = process.env.NODE_ENV === 'development';

// Modify the webpack settings based on the configuration
const plugins = [];
const defines = {
    DEBUG            : false,
    PLATFORM_BROWSER : true,
};
const bundleSuffix = (DEBUG) ? '' : '.min';
let devtool;

if (DEBUG) {
    defines.DEBUG = true;
    devtool = 'source-map';
}

//
// Webpack configuration
//
const bundleName = `lightstep-tracer${bundleSuffix}`;

module.exports = {
    stats: {
        errorDetails: true
    },
    mode    : DEBUG ? 'development' : 'production',
    entry   : './src/lib.js',
    target  : 'web',
    devtool : devtool,
    output  : {
        path          : path.resolve(__dirname, 'dist'),
        filename      : `${bundleName}.js`,
        library       : 'lightstep',
        libraryTarget : 'umd',
    },
    plugins : [
        new webpack.DefinePlugin(defines),
    ].concat(plugins),
    resolve : {
        alias : { },
    },
    module : {
        rules : [
            {
                test    : /\.js$/,
                include : /src\//,
                exclude : /node_modules/,
                use     : {
                    loader  : 'babel-loader',
                    options : {
                        cacheDirectory : true,
                        plugins        : [
                            'add-module-exports',
                            //
                            // Manually specify the *subset* of the ES2015 preset
                            // to use. This reduces the output file size and improves
                            // interoperability (e.g. Symbol polyfills on IE still
                            // don't work great).
                            //
                            'babel-plugin-transform-es2015-template-literals',
                            'babel-plugin-transform-es2015-literals',
                            //'babel-plugin-transform-es2015-function-name',
                            'babel-plugin-transform-es2015-arrow-functions',
                            'babel-plugin-transform-es2015-block-scoped-functions',
                            'babel-plugin-transform-es2015-classes',
                            'babel-plugin-transform-es2015-object-super',
                            // 'babel-plugin-transform-es2015-shorthand-properties',
                            'babel-plugin-transform-es2015-duplicate-keys',
                            'babel-plugin-transform-es2015-computed-properties',
                            // 'babel-plugin-transform-es2015-for-of',
                            'babel-plugin-transform-es2015-sticky-regex',
                            'babel-plugin-transform-es2015-unicode-regex',
                            'babel-plugin-check-es2015-constants',
                            'babel-plugin-transform-es2015-spread',
                            'babel-plugin-syntax-object-rest-spread',
                            'babel-plugin-transform-object-rest-spread',
                            'babel-plugin-transform-es2015-parameters',
                            'babel-plugin-transform-es2015-destructuring',
                            'babel-plugin-transform-es2015-block-scoping',
                            //'babel-plugin-transform-es2015-typeof-symbol',
                            'babel-plugin-transform-es2015-modules-commonjs'
                        ],
                    },
                },
            },
        ],
    },
};
