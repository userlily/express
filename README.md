##  git常用命令  sss
`$ git rm -r ./aa.text`  // 删除文件文件夹
<br/>  
`$ git add ./aa.text`  // 添加工作区文件到临时区
<br/>
`$ git commit -m '第一次提交'`  //  把临时区的文件提交到当前版本库分支
<br/>
`$ git push -u origin master`  // 把版本库版提交到线上
<br/>
`$ git pull` // 同步线上版本

## 项目创建过程

### 1、创建版本库    
`$ git remote add origin git@github.com:userlily/express.git`
<br/>
`$ git push -u origin master`
<br/>
创建   .gitignore文件   
### 2、快速生成express项目
`$ npm install -g express-generator`
<br/> 
`$ express -h 查看生成项目的命令;     express -e ./express`
<br/>
`$ npm  i  &&  npm start`
<br/>  
### 3、配置webStorm开发环境 代码提醒
file >> settings >> plugins  搜索安装 nodejs
<br/>
file >> settings >> language >> nodejs and npm     enable nodejs 插件  
### 4、添加文件修改自动重启服务器功能
`$ npm  i nodemon --save-dev`  
</br>
添加nodemog.json 文件对文件检测配置
<br/>
在package.json中修改
<br/>
`"nodemon": "nodemon  ./bin/www",
<br/>
"start": "npm run nodemon",`
### 5、添加webpack  编译es6和sass
> 使用 JetBrains WebStorm IDE 时，你可能会发现保存修改过的文件，并不会按照预期触发观察者。尝试在设置中禁用安全写入(safe write)选项，该选项确定在原文件被覆盖之前，文件是否先保存到临时位置：取消选中 File > Settings... > System Settings > Use "safe write" (save changes to a temporary file first)

<br/>
安装webpack一堆包和  一个npm可以运行多命令的包
<br/>

```
    "clean-webpack-plugin": "^1.0.0", // 清除文件件
    "concurrently": "^4.1.0", // npm  一个命令运行多个命令
    "css-loader": "^2.0.1", 
    "file-loader": "^2.0.0", 
    "mini-css-extract-plugin": "^0.5.0", // js中分离出css
    "node-sass": "^4.11.0", 
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.27.1", 
    "webpack-cli": "^3.1.2" // webpack命令
```

****

创建前端的源码文件 src

*****

配置 webpack.config.js

```
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index/index.js')
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

  
```

### 6、增减redis和session

```
'use strict'
const session = require("express-session");
const RedisStore = require('connect-redis')(session);

module.exports = session({                //设置session中间件

  store: new RedisStore({
    "host": "127.0.0.1",
    "port": "6379",
    "pass": "",
    "db": 1,
    "ttl": 1800, //session默认存储在redis中的时间  单位是s      默认时间为一天
    "logErrors": true
  }), //session存储到redis中
  secret: 'keyboard cat',    //签名
  resave: false,
  rolling: true,      //每次请求都更新cookie 的时间
  saveUninitialized: false,   // 强制将“未初始化”的会话保存到存储区。会话是新的但未修改时是未初始化状态
  cookie: {
    path: '/',   //路径
    httpOnly: true,
    maxAge: 1000 * 60 * 60   //cookie 保存的最大时间   单位是毫秒
  }

})


```

###  7、增加controller层services层models层和常用数据库操作工具，数据库初始化工具  增加全局配置文件
