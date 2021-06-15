/*
 * @Author:凡琛
 * @Date: 2021-06-13 21:58:35
 * @LastEditTime: 2021-06-15 14:46:10
 * @LastEditors: Please set LastEditors
 * @Description: 图像访问解析
 * @FilePath: /Amon_server/routes/resolver.js
 */
const URL = require('url');
const path = require('path');
const fs = require('fs');
const staticServer = require('node-static');
const config = require('../server/image/config');
const LogUtil = require('../server/image/log');
var express = require('express');

const RESOURCE_ROOT = config.ConfigManager.getInstance().getValue(config.keys.KEY_IMAGE_DIR);
const SERVER_PORT = config.ConfigManager.getInstance().getValue(config.keys.KEY_RESOLVE_SERVER_PORT);


var router = express.Router();
var _fileServer = new staticServer.Server(RESOURCE_ROOT, {
    cache: null,
    gzip: true
});
router.use('/', (req, res) => {
    // 根据不同文件路径做分发
    getImageFromSource(req,res);
});
const _getImagePath = (isAbsolutePath, needWebp, pathInfo) => {
    return path.join(
        isAbsolutePath ? RESOURCE_ROOT : '',
        pathInfo.dir,
        pathInfo.name + pathInfo.ext + (needWebp ? '.webp' : '')
    );
};

const getImageFromSource = (req,res) => {
    const url = URL.parse(req.url);

    const pathInfo = path.parse(url.pathname);
    if (!pathInfo.name) {
        LogUtil.error(`URL: ${req.url} is illegal.`);
        res.statusCode = 404;
        res.end();
        return;
    }
    const fullWebpFilePath = _getImagePath(true, true, pathInfo);
    const relativeWebpFilePath = _getImagePath(false, true, pathInfo);
    const fullNormalFilePath = _getImagePath(true, false, pathInfo);
    const relativeNormalFilePath = _getImagePath(false, false, pathInfo);

    const accepts = req.headers['accept'];
    LogUtil.info(`Target File Path: ${fullNormalFilePath}`);
    // If HTTP header accepts contains 'image/webp' (like Chrome), return webp file.
    if (accepts && accepts.indexOf('image/webp') !== -1 && fs.existsSync(fullWebpFilePath)) {
        LogUtil.info(`URL: ${req.url} Accepts: ${accepts} send webp`);
        _fileServer.serveFile(relativeWebpFilePath, 200, { 'Content-Type': 'image/webp' }, req, res);
    } else if (fs.existsSync(fullNormalFilePath)) {  // If not (like Safari), return png/jpg file.
        LogUtil.info(`URL: ${req.url} Accepts: ${accepts} send normal`);
        _fileServer.serveFile(relativeNormalFilePath, 200, {}, req, res);
    } else {  // file not existed.
        LogUtil.error(`URL: ${req.url} Accepts: ${accepts} file not found, send nothing`);
        res.statusCode = 404;
        res.end();
    }
}

module.exports = router;