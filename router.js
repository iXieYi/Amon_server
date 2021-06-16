/*
 * @Author: 凡琛
 * @Date: 2021-06-15 11:59:44
 * @LastEditTime: 2021-06-16 10:09:38
 * @LastEditors: Please set LastEditors
 * @Description: 统一配置路由
 * @FilePath: /Amon_server/server/router.js
 */

const router = require('express').Router();
const loginManager = require('./server/base/login');
const uploadManager = require('./server/image/uploader');
const imageManager = require('./server/image/resolver');

// 登录
router.post('/login',loginManager.login);

// 文件上传
router.post('/uploadFile',uploadManager.uploadFile);

// 文件解析要用 use
router.use('/images',imageManager.getImageFromSource);

module.exports = router; 