const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let config = {
  target: 'web',
  entry: path.join(__dirname,'src/main.js'),
  output: {
    filename: 'bundle-[hash:8].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './default-index.ejs',
      filename: './index.html'
    }),
  ],
  devServer: {
    port: '8088',
    overlay: {
      errors: true, // 页面不刷新 仅更新组件数据 webpack会自动添加 HMR 插件。所以模块热更新最终还是 HMR 这个插件起的作用。
    },
    open: true,
  }
}

module.exports = config;