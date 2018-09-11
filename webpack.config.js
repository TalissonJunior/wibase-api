const path = require('path');

module.exports = {
    entry: `./src/index.ts`,
    target: 'node',
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        libraryTarget: "commonjs"
    },
    resolve: {
        // Add in `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts'],
        modules: [
            './node_modules',
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ]
            },
            {
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader', // Translate CSS into CommonJS
                    },
                    {
                        loader: 'sass-loader', // Compiles Sass to CSS
                    }
                ]
            },
        ]
    }
};