const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index/index.js'),
    login: path.resolve(__dirname, './src/login/index.js'),
  },
  output: {
    publicPath: '/', //不用html模板的方式和这和路径就没有什么关系了
    path: path.resolve(__dirname, './public/build'),
    filename: './js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../img', // 相对css的目录
              outputPath: './img',  // 相对output的目录
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new CleanWebpackPlugin([path.resolve(__dirname,'./public/build')]),
  ],
  mode: 'development',
  devtool: 'source-map',
  stats: 'errors-only',
  watchOptions: {
    poll: 100,  // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
    aggregateTimeout: 100,  // 防止重复按键保存，100毫米内算按键一次保存
    ignored: ['public', 'node_modules','.idea','routes','views'],  //不监测
  }
};
