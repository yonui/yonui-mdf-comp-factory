let path = require("path");
// let HtmlWebpackPlugin = require("html-webpack-plugin");
// 专门抽离css插件，如果需要抽离多个，可以拷贝多个
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(path.resolve(__dirname), path.resolve(__filename));
module.exports = {
    // optimization: {//优化
    //     minimizer: [
    //       new UglifyJsPlugin({
    //         cache: true,
    //         parallel: true,//并发打包
    //         sourceMap: true // set to true if you want JS source maps
    //       }),
    //       new OptimizeCSSAssetsPlugin({})//压缩css必要也要压缩js使用UglifyJsPlugin插件
    //     ]
    //   },
  mode: "development", //模式 development production
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
     libraryTarget: "umd"
  },
  plugins: [//放着多有的webpack插件
    new MiniCssExtractPlugin({
      filename:'css/index.css'
        // filename:'[name].css',//抽离文件名
        // chunkFilename: '[id].css'
    })
    
  ],
  // externals:{ //排除无用的打包
  //   jquery:jQuery
  // },
  module: {
    //模块 处理
    rules: [
      {
        test:/\.js$/,
        use:{
          loader:"babel-loader",
          options:{
             presets:['@babel/preset-env','@babel/preset-react'],
             plugins:[
              // ["@babel/plugin-proposal-decorators", { "legacy": true }],
              '@babel/plugin-proposal-class-properties',
              "@babel/plugin-transform-runtime"
            ]
          }
          
        },
        exclude:/node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {//将处理后的代码默认插入到顶部,否则打包的样式会引下自己的样式
              insertAt: "top"
            }
          },
          "css-loader"
        ]
      },
      {
        // 可以处理less文件(less->css)，sass安装包： node-sass sass-loader
        test: /\.less$/,
        use: [
            MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  }
};
