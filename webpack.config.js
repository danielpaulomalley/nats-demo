const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "/public"),
    filename: "lib/[name].[chunkhash].js",
    assetModuleFilename: "img/[name][ext][query]",
  },
  devServer: {
    port: 8005,
    allowedHosts: "all"
    //client: { webSocketURL: "ws://localhost:8005/ws" },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", "css", ".woff", "ttf", "woff2"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        dependency: { not: ["url"] },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "/src/index.html"),
    })
  ],
};
