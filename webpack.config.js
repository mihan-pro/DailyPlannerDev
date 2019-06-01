

const path = require('path');

module.exports = {
    entry: './main.js',
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'pathOrUrlWhenProductionBuild'
    },
    module: {
        rules: [
        ]
    },
    resolve: {
    },
    devtool: 'source-map',
    plugins: [
    ]
};
