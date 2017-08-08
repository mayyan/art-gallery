const path = require('path');

module.exports = {
    entry: './src/javascripts/index.js',
    output: {
        filename: 'index_bundle.js',
        path: path.resolve(__dirname, 'dist/javascripts')
    }
};