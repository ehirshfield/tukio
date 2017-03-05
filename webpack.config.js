module.exports = {
    entry: "./src/app",
    output: {
        filename: "public/bundle.js"
    },

    module: {
        loaders: [{
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader?name=/assets/img/[name].[ext]'
        }, {
            test: /\.jsx?$/,
            include: [/src/, '/src/validations/'],
            loader: "babel-loader",
            query: {
                presets: ["react", "es2015"]
            }
        }],
    },
    resolve: {
        extensions: [".jsx", ".json", ".js"]
    },
    devtool: "eval-source-map"
};