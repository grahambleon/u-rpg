const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, "./src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../server/public/dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, "public/"),
    },
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:8000",
      },
      {
        context: ["/socket.io"],
        target: "http://localhost:8000",
        ws: true
      }
    ],
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(s(a|c)ss)$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.template.html"),
    }),
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
