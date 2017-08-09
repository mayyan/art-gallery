const path = require('path');

module.exports = {
    entry: './src/javascripts/index.js',
    output: {
        filename: 'index_bundle.js',
        path: path.resolve(__dirname, 'dist/javascripts')
    },
    externals: {
        jQuery: 'jQuery',
        // Masonry: 'Masonry',
        // imagesLoaded: 'imagesLoaded'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }]
    }
};