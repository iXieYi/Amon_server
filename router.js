/*
 * @Author: 凡琛
 * @Date: 2021-06-15 11:59:44
 * @LastEditTime: 2021-06-21 15:52:32
 * @LastEditors: Please set LastEditors
 * @Description: 统一配置路由
 * @FilePath: /Amon_server/server/router.js
 */

const router = require('express').Router();
const auth = require('./server/middleware/auth');
const loginManager = require('./server/base/login');
const uploadManager = require('./server/image/uploader');
const imageManager = require('./server/image/resolver');
const signUpManager = require('./server/base/signup');

//服务首页
router.get('/', function(req, res, next) {
    res.render('index', { title: '岩石识别服务' });
});

// 登录
router.post('/login',loginManager.login);
// 注销
router.get('/logout',loginManager.logout);
// 注册
router.post('/createUser',signUpManager.createUser);
// 删除用户
router.post('/deleteUser',signUpManager.deleteUser);
// 编辑用户信息
router.post('/editUser',signUpManager.editUser);

// 单文件上传
router.post('/uploadFile',auth.loginRequired,uploadManager.uploadFile);
// 批量上传
router.post('/uploadFiles',auth.loginRequired,uploadManager.uploadFiles);

// 文件解析(要用use)
router.use('/files',imageManager.getImageFromSource);

module.exports = router; 