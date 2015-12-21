module.exports = {
    entry: "babel!./src/main.js",
    output: {
        path: __dirname + "/dist",
        filename: "game.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};
