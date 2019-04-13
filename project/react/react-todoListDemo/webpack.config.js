const path = require('path');
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin');
//text 非javascript代码打包成一个单独的静态资源文件，有可能做缓存
//webpack4安装的时候
//第一步 npm i extract-text-webpack-plugin@next
//第二步 contenthash 改成 chunkhash 
const ExtractPlugin = require('extract-text-webpack-plugin')

// 负责将html文档虚拟到根目录下
let htmlWebpackPlugin = new HTMLWebpackPlugin({
  // 虚拟的html文件名 index.html
  filename: 'index.html',
  // 虚拟html的模板为 src下的index.html
  template: path.resolve(__dirname, './public/index.html')
})

const isDev = process.env.NODE_ENV === 'development';

let config = {
  target: 'web',
  mode: process.env.NODE_ENV || 'production',
  entry: path.join(__dirname,'src/index.js'),
  output: {
    filename: 'bindle.[hash:8].js',
    path: path.join(__dirname,'dist')
  },
  module: {
    rules: [
      { 
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        // 配置js/jsx语法解析
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|svg|jpg|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: '1024',
            name: '[name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
}

if(isDev){
  config.devServer = {
    // 服务端口为8010
    port: 8010,
    // 自动压缩代码
    compress: true,
    // host: '0.0.0.0',
    overlay: {
      errors: true, // 页面不刷新 仅更新组件数据 webpack会自动添加 HMR 插件。所以模块热更新最终还是 HMR 这个插件起的作用。
    },
    hot: true,
    // 自动打开浏览器
    open: true
  }
}else{
  console.log("====正在打包====")

  // config.module.rules.push(
  //   {
  //     test: /\.css$/,
  //     use: ExtractPlugin.extract({
  //       fallback: 'style-loader',
  //       use: ['css-loader']
  //     })
  //   }
  // )
  config.plugins.push(
    new ExtractPlugin('css/style.[chunkhash:8].css')
  )
}

module.exports = config;