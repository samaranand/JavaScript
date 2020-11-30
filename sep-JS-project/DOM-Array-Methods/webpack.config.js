const path = require('path');
// const htmlWeb = require('html-webpack-plugin');


module.exports = {
    entry: './src/script.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'script.js'
    }
}