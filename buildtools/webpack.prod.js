const path = require('path');
const merge = require('webpack-merge');
const common = require('../webpack.config.js');

module.exports = merge(common, {
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: "commonjs"
    },
    mode: 'production',
});