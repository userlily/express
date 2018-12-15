

'use strict'

/**
 * Created by lili
 * 数据库连接池
 */

const mysql = require('mysql'); //获取mysql模块
const config = require('../config.json');
const pool  = mysql.createPool({
            connectionLimit : config.mysqlDb.connectionLimit,
            host            : config.mysqlDb.host,
            user            : config.mysqlDb.user,
            password        : config.mysqlDb.password,
            database        : config.mysqlDb.database
});

module.exports = pool;