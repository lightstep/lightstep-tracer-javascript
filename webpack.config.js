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
                            //
                            '@babel/transform-template-literals',
                            '@babel/transform-literals',
                            //'@babel/transform-function-name',
                            '@babel/transform-arrow-functions',
                            '@babel/transform-block-scoped-functions',
                            '@babel/transform-classes',
                            '@babel/transform-object-super',
                            // '@babel/transform-shorthand-properties',
                            '@babel/transform-duplicate-keys',
                            '@babel/transform-computed-properties',
                            // '@babel/transform-for-of',
                            '@babel/transform-sticky-regex',
                            '@babel/transform-unicode-regex',
                            '@babel/check-constants',
                            '@babel/transform-spread',
                            '@babel/transform-parameters',
                            '@babel/transform-destructuring',
                            '@babel/transform-block-scoping',
                            //'@babel/transform-typeof-symbol',
                            '@babel/transform-modules-commonjs',
                        ],
                    },
                },
            },
        ],
    },
};
