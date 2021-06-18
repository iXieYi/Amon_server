/*
 * @Author: your name
 * @Date: 2021-06-15 14:47:25
 * @LastEditTime: 2021-06-18 12:18:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Amon_server/server/common/logger.js
 */
const log4js = require('log4js');

log4js.configure({
    appenders: {
        infoLogs: {
            type: 'dateFile',
            filename: 'logs/info/file.log',
            pattern: "yyyy-MM-dd",
            alwaysIncludePattern: true,
            keepFileExt: true,
            compress: true,
            layout: {
                type: 'basic'
            }
        },
        errorLogs: {
            type: 'file',   
            filename: 'logs/error/file.log',
            pattern: "yyyy-MM-dd",
            alwaysIncludePattern: true,
            keepFileExt: true,
            compress: true
        },
        justErrors: {
            type: 'logLevelFilter', // 过滤指定level的文件
            appender: 'errorLogs',  // appender
            level: 'error'  // 过滤得到error以上的日志
        },
        display: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['infoLogs', 'errorLogs', 'justErrors','display'],
            level: 'DEBUG'
        }
    },
    "pm2": true
});

const logger = log4js.getLogger();

module.exports = logger;