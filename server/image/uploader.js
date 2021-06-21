/*
 * @Author: 凡琛
 * @Date: 2021-06-13 20:23:30
 * @LastEditTime: 2021-06-21 11:05:56
 * @LastEditors: Please set LastEditors
 * @Description: 图片上传服务
 * @FilePath: /Amon_server/routes/uploader.js
 */

const path = require('path');
const fs = require('fs');
const multer = require('multer');
const webpConverter = require('./webp-converter');
const LogUtil = require('./log');
const config = require('./config');
const WaterMarker = require('./watermarker');

const UniResult = require('../common/universal-result');
const { response } = require('../common/response');
const { randNum } = require('../common/utils');
// 获取基本配置信息
const TARGET_DIR = config.ConfigManager.getInstance().getValue(config.keys.KEY_IMAGE_DIR);
const GEN_WEBP = config.ConfigManager.getInstance().getValue(config.keys.KEY_GEN_WEBP);
const ADD_WATERMARK = config.ConfigManager.getInstance().getValue(config.keys.KEY_ADD_WATERMARK);
const URL_RREFIX = config.ConfigManager.key_url_prefix();
const MAX_IMAGE_SIZE = config.ConfigManager.getInstance().getValue(config.keys.KEY_MAX_IMAGE_SIZE);
// 初始化 multer
const upload = multer({
  dest: config.ConfigManager.getInstance().getImageTempPath(),
  fileFilter: (req, file, callback) => {
    console.log(file);
    const pToken = req.query.accessToken;
    const configToken = config.ConfigManager.getInstance().getValue(config.keys.KEY_ACCESS_TOKEN);
    // Check token
    if (pToken !== configToken) {
      callback(new Error('token is invalid'), false);
      return;
    }
    callback(null, true);
  },
  limits: {
    fileSize: Math.ceil(MAX_IMAGE_SIZE * 1024 * 1024)
  }
}).single('image');

class uploadManager {
  async uploadFile(req, res) {
    const noWaterMark = (req.query.nomark === '1');
    const { user_id = '', image_id = '' } = req.query;
    const target_dir = config.ConfigManager.getInstance().createImageToDestPath(image_id);
    upload(req, res, (err) => {
      if (err) {
        LogUtil.error(err);
        return response(res, null, err);
      }
      let file = req.file;
      if (!file) {
        return response(res, UniResult.Errors.PARAM_ERROR);
      }
      let ext = path.parse(file.originalname).ext;
      //用UUID来替换，userId + 时间戳 + 2位随机数
      let ts = user_id + (new Date() * 1) + randNum(2);
      let fileName = `${ts}${ext}`;
      let imageFilePath = path.join(TARGET_DIR,target_dir, fileName);
      //获取相对文件名
      const relativeName =  path.join(target_dir, fileName);
      // If enable watermark, add watermark and save to target path.
      if (ADD_WATERMARK && !noWaterMark) {
        const markedPath = file.path + '_marked';
        WaterMarker.markAndSave(file.path, markedPath, (err) => {
          if (!err) {
            fs.unlink(file.path, (err) => {
              if (err) {
                LogUtil.error(err);
              }
            });
            moveFile(markedPath, imageFilePath, relativeName);
            return;
          } else {
            LogUtil.error(err);
            response(res, null, err);
          }
        })
      } else {
        // If not enable watermark or get an error when adding watermark, rename directly.
        moveFile(file.path, imageFilePath, relativeName);
      }
    });
    const moveFile = (currentPath, destPath, fileName) => {
      fs.rename(currentPath, destPath, (err) => {
        if (err) {
          LogUtil.error(err);
          response(res, null, err);
          return;
        } else {
          // If enable webp, convert the image to webp but ignore the result.
          if (GEN_WEBP) {
            webpConverter.convertToWebP(destPath, destPath + '.webp');
          }
          response(res, {
            url: `${URL_RREFIX}${fileName}`
          });
        }
      });
    };
  }
}
module.exports = new uploadManager();
