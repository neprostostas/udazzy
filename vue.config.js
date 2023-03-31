const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  outputDir: path.resolve("cordova/www"),
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    },
    devtool: 'source-map'
  },
  transpileDependencies: true,
  publicPath: '',
})

