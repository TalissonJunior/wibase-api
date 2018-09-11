const path = require('path');
const merge = require('webpack-merge');
const common = require('../webpack.config.js');

module.exports = merge(common, {
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../.tmp'),
        libraryTarget: "commonjs",
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    mode: 'development',
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: '../.tmp'
    }
});