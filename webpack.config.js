const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.jsx",
  mode: "production",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.min.css", // назва вихідного CSS-файлу
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
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // мінімізує CSS
    ],
  },
};
