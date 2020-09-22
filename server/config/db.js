'use strict';
var mysql = require('mysql');
// 数据库配置
module.exports = {
  /**
   * 数据库配置
   */
  config: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'student',
    port: 3306
  },
  conn: null,
  /**
   * 创建连接池并连接
   * @param callback
   */
  openConn: function (callback) {
    var me = this;
    me.conn = mysql.createConnection(me.config);
  },
  /**
   * 释放连接池
   * @param conn
   */
  closeConn: function () {
    var me = this;
    me.conn.end(function (err) {
      console.log(err);
    });
  },
  /**
   * 执行连接
   * @param config
   */
  exec: function (config) {
    const me = this;
    me.openConn();
    me.conn.query(config.sql, config.params, function (err, res) {
      if (err) {
        console.log(err);
      } else if (config.callback) {
        config.callback(res);
      }
      // 关闭数据库连接
      me.closeConn();
    });
  }
};
