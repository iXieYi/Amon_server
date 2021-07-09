/*
 * @Author: 凡琛
 * @Date: 2021-06-13 20:23:30
 * @LastEditTime: 2021-07-07 11:49:44
 * @LastEditors: Please set LastEditors
 * @Description: 图片上传服务
 * @FilePath: /Amon_server/routes/uploader.js
 */

const path = require('path');
const fs = require('fs');
const multer = require('multer');
const LogUtil = require('./log');
const config = require('./config');
const UniResult = require('../common/universal-result');
const { response } = require('../common/response');

// 获取基本配置信息
const TARGET_DIR = config.ConfigManager.getInstance().getValue(config.keys.KEY_IMAGE_DIR);
const URL_RREFIX = config.ConfigManager.key_url_prefix();
const MAX_IMAGE_SIZE = config.ConfigManager.getInstance().getValue(config.keys.KEY_MAX_IMAGE_SIZE);
// 初始化 multer

// 单文件上传
const upload = multer({
  dest: config.ConfigManager.getInstance().getImageTempPath(),
  fileFilter: (req, file, callback) => {
    console.log(file);
    // const pToken = req.body.accessToken;
    // const configToken = config.ConfigManager.getInstance().getValue(config.keys.KEY_ACCESS_TOKEN);
    // Check token
    // if (pToken !== configToken) {
    //   callback(new Error('token is invalid'), false);
    //   return;
    // }
    callback(null, true);
  },
  limits: {
    fileSize: Math.ceil(MAX_IMAGE_SIZE * 1024 * 1024)
  }
}).single('file');

// 多文件上传
const uploadFiles = multer({
  dest: config.ConfigManager.getInstance().getImageTempPath(),
  fileFilter: (req, file, callback) => {
    // const pToken = req.body.accessToken;
    // const configToken = config.ConfigManager.getInstance().getValue(config.keys.KEY_ACCESS_TOKEN);
    // Check token
    // if (pToken !== configToken) {
    //   callback(new Error('token is invalid'), false);
    //   return;
    // }
    callback(null, true);
  },
  limits: {
    fileSize: Math.ceil(MAX_IMAGE_SIZE * 1024 * 1024)
  }
}).array('files', config.ConfigManager.getInstance().getValue(config.keys.KEY_MAX_COUNT));

// 单文件转存
const moveFile = (res, currentPath, destPath, fileName) => {
  fs.rename(currentPath, destPath, (err) => {
    if (err) {
      LogUtil.error(err);
      response(res, null, err);
      return false;
    } else {
      fileName = fileName.replace(/\\/g, "/");
      response(res, {
        success: true,
        msg: '上传成功',
        url: `${URL_RREFIX}${fileName}`
      });
    }
  });
};
// 多文件转存
const moveFiles = (res, currentPath, destPath, fileName) => {
  fs.rename(currentPath, destPath, (err) => {
    if (err) {
      LogUtil.error(err);
      response(res, null, err);
      return false;
    }
  });
};
class uploadManager {
  // 单文件上传服务
  async uploadFile(req, res) {
    upload(req, res, (err) => {
      const { file_id = '',type = '' } = req.body;
      var target_dir = config.ConfigManager.getInstance().createImageToDestPath(file_id);
      if (err) {
        LogUtil.error(err);
        return response(res, null, err);
      }
      let file = req.file;
      if (!file) {
        return response(res, UniResult.Errors.PARAM_ERROR);
      }
      let ext = path.parse(file.originalname).ext;
      var ext_p = ext.toLowerCase();
      if (type == 'image') {
        switch (ext.toLowerCase()) {
          case ".jpg":
          case ".gif":
          case ".png":
            ext_p = ext.toLowerCase();
            break;
          default:
            ext_p = ".png";
            break;
        }
      } else if (type == 'video') {
        switch (ext.toLowerCase()) {
          case '.mov':
          case '.mp4':
            ext_p = ext.toLowerCase();
            break;
          default:
            ext_p = ".mp4";
            break;
        }
        target_dir = path.join(target_dir,'video');
      }
      let fileName = `${file.filename}${ext_p}`;
      let imageFilePath = path.join(TARGET_DIR, target_dir, fileName);
      //获取相对文件名
      const relativeName = path.join(target_dir, fileName);
      //转存文件
      moveFile(res, file.path, imageFilePath, relativeName);
    });
  }

  // 多文件上传服务
  async uploadFiles(req, res) {
    uploadFiles(req, res, (err) => {
      const { file_id = '', type = '' } = req.body;
      const target_dir = config.ConfigManager.getInstance().createImageToDestPath(file_id);
      console.log('target_dir', target_dir);
      if (err) {
        LogUtil.error(err);
        return response(res, null, err);
      }
      let files = req.files;
      console.log('批量上传', files.length);
      if (!files || files.length <= 0) {
        return response(res, UniResult.Errors.PARAM_ERROR);
      }
      var urls = [];
      files.forEach(file => {
        const ext = path.parse(file.originalname).ext;
        var ext_p = ext.toLowerCase();
        if (type == 'image') {
          switch (ext.toLowerCase()) {
            case ".jpg":
            case ".gif":
            case ".png":
              ext_p = ext.toLowerCase();
              break;
            default:
              ext_p = ".png";
              break;
          }
        } else if (type == 'video') {
          switch (ext.toLowerCase()) {
            case '.mov':
            case '.mp4':
              ext_p = ext.toLowerCase();
              break;
            default:
              ext_p = ".mp4";
              break;
          }
          target_dir = path.join(target_dir,'video');
        }
        let fileName = `${file.filename}${ext_p}`;
        let imageFilePath = path.join(TARGET_DIR, target_dir, fileName);
        const relativeName = path.join(target_dir, fileName);
        moveFiles(res, file.path, imageFilePath, relativeName);
        // TODO 文件转存失败兜底？
        const url = URL_RREFIX + relativeName;
        urls.push(url);
      });
      response(res, {
        success: true,
        msg: '批量上传成功',
        urls
      });
    });
  }
}
module.exports = new uploadManager();
