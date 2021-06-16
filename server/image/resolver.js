/*
 * @Author:凡琛
 * @Date: 2021-06-13 21:58:35
 * @LastEditTime: 2021-06-16 10:26:47
 * @LastEditors: Please set LastEditors
 * @Description: 图像访问解析
 * @FilePath: /Amon_server/routes/resolver.js
 */
const URL = require('url');
const path = require('path');
const fs = require('fs');
const staticServer = require('node-static');
const config = require('./config');
const LogUtil = require('./log');
var express = require('express');
const RESOURCE_ROOT = config.ConfigManager.getInstance().getValue(config.keys.KEY_IMAGE_DIR);
// 文件服务
const _fileServer = new staticServer.Server(RESOURCE_ROOT, {
  cache: null,
  gzip: true
});
// 获取文件路径
const _getImagePath = (isAbsolutePath, needWebp, pathInfo) => {
  return path.join(
    isAbsolutePath ? RESOURCE_ROOT : '',
    pathInfo.dir,
    pathInfo.name + pathInfo.ext + (needWebp ? '.webp' : '')
  );
};

class imageManager {
  async getImageFromSource(req, res) {
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
}
module.exports = new imageManager();