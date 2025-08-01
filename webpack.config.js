const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader", // Вставляє стилі в DOM
          "css-loader", // Розпізнає @import і url()
          "sass-loader", // Компілює Sass в CSS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          globOptions: {
            ignore: ["**/index.html"], // ← ось ця стрічка вирішує конфлікт
          },
        },
      ],
    }),

    new ESLintPlugin({
      extensions: ["js", "jsx"],
    }),
  ],
  devServer: {
    static: [
      path.resolve(__dirname, "dist"),
      path.resolve(__dirname, "public"),
    ],

    port: 3000,
    hot: true,
    client: {
      overlay: true,
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
