const path = require('path');

module.exports = {
    entry: './app/assets/src/main.tsx',
    output: {
        path: path.resolve(__dirname + '/app/assets/javascripts'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};
