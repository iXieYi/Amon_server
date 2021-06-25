/*
 * @Author: 凡琛
 * @Date: 2021-06-15 11:59:44
 * @LastEditTime: 2021-06-25 12:53:12
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
const projectManager = require('./server/base/project');

/** 服务首页 */
router.get('/', function (req, res, next) {
    res.render('index', { title: '岩石识别服务' });
});

/** 用户管理 */
router.post('/login', loginManager.login);             // 登录
router.get('/logout', loginManager.logout);            // 注销
router.post('/createUser', signUpManager.createUser);  // 注册
router.post('/deleteUser', signUpManager.deleteUser);  // 删除用户
router.post('/editUser', signUpManager.editUser);      // 编辑用户

/** 文件管理 */
router.post('/uploadFile', auth.loginRequired, uploadManager.uploadFile);    // 单文件上传
router.post('/uploadFiles', auth.loginRequired, uploadManager.uploadFiles);  // 批量上传
router.use('/files', imageManager.getImageFromSource);                      // 文件解析(要用use)

/** 项目管理 */
router.get('/getProjectList', auth.loginRequired, projectManager.getProjectList);               // 获取项目列表
router.post('/createProject', projectManager.createProject);                // 创建项目
router.post('/deleteProject', projectManager.deleteProject);                // 删除项目
router.post('/editProject', projectManager.editProject);                    // 编辑项目信息

/** 未找到路由 */
router.use((req, res) => {
    res.render('404');
});

module.exports = router;