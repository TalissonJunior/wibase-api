const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['./src/index.ts', './src/scss/app.scss'],
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/views/**/*', to: 'views/', flatten: true },
        ])
    ],
    resolve: {
        // Add in `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.scss'],
        modules: [
            './node_modules',
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/[name].bundle.css',
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader?-url'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ]
    }
};