const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const SentryPlugin = require("@sentry/webpack-plugin");
module.exports = {
  entry: "./server.js",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"], // other stuff
    fallback: {
      fs: false,
      sequelize: false,
      tls: false,
      net: false,
      "pg-hstore": false,
      child_process: false,
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    new SentryPlugin({
      release: process.env.RELEASE,
      include: "./dist",
    }),
  ],
  // output: {
  //   filename: "server.js",
  //   path: path.resolve(__dirname, "dist"),
  // },
};
