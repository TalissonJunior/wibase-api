const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/index.ts', 
        './src/public/scss/app.scss'
    ],
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/public/views/**/*', to: 'views/', flatten: true },
            { from: './src/configurations/**/*.json', to: 'configurations/', flatten: true },
        ])
    ],
    resolve: {
        extensions: ['.ts', '.scss', '.js'],
        modules: [
            './node_modules',
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
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