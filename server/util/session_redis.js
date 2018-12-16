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

