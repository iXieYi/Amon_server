/*
 * @Author:凡琛
 * @Date: 2021-06-13 21:58:35
 * @LastEditTime: 2021-06-29 14:49:51
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
const file = require('./file');
const RESOURCE_ROOT = config.ConfigManager.getInstance().getValue(config.keys.KEY_IMAGE_DIR);
// 文件服务
// const _fileServer = new staticServer.Server(RESOURCE_ROOT, {
//   cache: 3600,
//   gzip: true
// });
// 获取文件路径
const _getImagePath = (isAbsolutePath, pathInfo) => {
  return path.join(
    isAbsolutePath ? RESOURCE_ROOT : '',
    pathInfo.dir,
    pathInfo.name + pathInfo.ext
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
    // 文件路径
    const fullNormalFilePath = _getImagePath(true, pathInfo);
    const relativeNormalFilePath = _getImagePath(false, pathInfo);
    const accepts = req.headers['accept'];
    LogUtil.info(`Target File Path: ${fullNormalFilePath}`);
    //文件存在
    if (fs.existsSync(fullNormalFilePath)) {
      LogUtil.info(`URL: ${req.url} Accepts: ${accepts} send normal`);
      file.readFileBySuffixName(fullNormalFilePath, fs, req, res);

    } else { // 文件不存在
      LogUtil.error(`URL: ${req.url} Accepts: ${accepts} 文件不存在`);
      res.statusCode = 404;
      response(res, {
        success: false,
        msg: "文件不存在",
      });
    }
  }
}
module.exports = new imageManager();