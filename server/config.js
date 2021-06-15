/*
 * @Author: 凡琛
 * @Date: 2021-06-13 20:09:01
 * @LastEditTime: 2021-06-15 20:49:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Amon_server/config.js
 */

// 服务配置

'use strict';

module.exports = {
  debug: true,
  host: 'localhost',
  port: 3000,
  session_secret: 'rocks_express',
  site: {
    name: '岩石识别', // 名称
    description: '岩石识别服务', // 描述
    keywords: 'Node.js, Express',
  },
  // sqldb
  sqldb: {
    db: 'mysql',
    host: '127.0.0.1',
    database: 'express_admin',
    username: 'root',
    password: '123456',
    timezone: '+08:00' //for writing to database
  },
  // redis
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    pass: '',
  }
};
