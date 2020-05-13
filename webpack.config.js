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
                            '@babel/plugin-check-constants',
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-syntax-object-rest-spread',
                            '@babel/plugin-transform-arrow-functions',
                            '@babel/plugin-transform-block-scoped-functions',
                            '@babel/plugin-transform-block-scoping',
                            '@babel/plugin-transform-classes',
                            '@babel/plugin-transform-computed-properties',
                            '@babel/plugin-transform-destructuring',
                            '@babel/plugin-transform-duplicate-keys',
                            '@babel/plugin-transform-literals',
                            '@babel/plugin-transform-modules-commonjs',
                            '@babel/plugin-transform-object-super',
                            '@babel/plugin-transform-parameters',
                            '@babel/plugin-transform-spread',
                            '@babel/plugin-transform-sticky-regex',
                            '@babel/plugin-transform-template-literals',
                            '@babel/plugin-transform-unicode-regex',
                        ],
                    },
                },
            },
        ],
    },
};
