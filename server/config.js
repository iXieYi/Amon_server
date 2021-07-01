/*
 * @Author: 凡琛
 * @Date: 2021-06-13 20:09:01
 * @LastEditTime: 2021-06-30 22:15:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Amon_server/config.js
 */

// 服务配置

'use strict';
const env_sql = {
  // development: '10.218.66.200',
  development: '172.16.1.150',
  // development: '127.0.0.1',
  production: '172.17.0.2'
}
const env_redis = {
  // development: '10.218.66.200',
  development: '172.16.1.150',
  // development: '127.0.0.1',
  production: '172.17.0.3'
}

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
    host: env_sql[process.env.CURRENT_ENV],
    database: 'RecRock',
    username: 'root',
    password: '123456',
    timezone: '+08:00' //for writing to database
  },
  // redis
  redis: {
    host: env_redis[process.env.CURRENT_ENV],
    port: 6379,
    db: 0,
    pass: '',
  }
};
