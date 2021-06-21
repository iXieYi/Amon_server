/*
 * @Author: your name
 * @Date: 2021-06-11 23:04:25
 * @LastEditTime: 2021-06-21 15:48:12
 * @LastEditors: Please set LastEditors
 * @Description: 图片服务器配置
 * @FilePath: /coderyuan-image-server/config.js
 */
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');


let _instance;

const name_id = '10100203' // 测试编码
/**
 * Some const key defined for fetch configs.
 */
const keys = {
  KEY_IMAGE_DIR: 'img_dir',
  KEY_LOG_ENABLE: 'log_enable',
  KEY_ACCESS_TOKEN: 'access_token',
  KEY_RESOLVER_ENABLE: 'resolver_enable',
  KEY_UPLOADER_ENABLE: 'uploader_enable',
  KEY_WATERMARK_PATH: 'watermark_path',
  KEY_GEN_WEBP: 'generate_webp',
  KEY_ADD_WATERMARK: 'add_watermark',
  KEY_MAX_IMAGE_SIZE: 'max_image_size',
  KEY_URL_PREFIX: 'image_server_url_prefix',
  KEY_BIND_LOCAL: 'bind_local_address',
  KEY_MAX_COUNT:'max_file_count'
};
const env = {
  development:'http://127.0.0.1:3000/files/',
  production:'http://10.218.66.200:3000/files/'
}

/**
 * A manager for managing configs.
 */
class ConfigManager {

  constructor() {
    try {
      this._allConfigs = yaml.safeLoad(fs.readFileSync('./server/image/config.yml'));//这里路径是相对启动文件app.js的路径
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Get single instance.
   * 
   * @returns {ConfigManager}
   */
  static getInstance() {
    if (!_instance) {
      _instance = new ConfigManager();
    }
    return _instance;
  }

  static key_url_prefix() {
    return env[process.env.CURRENT_ENV];
  }
  /**
   * get config value by key
   * 
   * @param {string} key 
   * @returns {string|number} value
   */
  getValue(key) {
    if (!this._allConfigs) {
      return null;
    }
    if (!key in this._allConfigs) {
      return null;
    }
    return this._allConfigs[key];
  }

  /**
   * 保存到temp临时文件夹，并且确认目标文件夹存在
   * 
   * @returns {string|null} 临时文件夹绝对路径
   */
  getImageTempPath() {
    const imageDir = this.getValue(keys.KEY_IMAGE_DIR);
    if (!imageDir || !fs.existsSync(imageDir)) {
      return null;
    }
    const tempDir = path.join(imageDir, '.temp/');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    return tempDir;
  }
  /**
   * @description:  创建目标子文件夹路径
   * @param {string} image_id 类别id （例如：10100203）
   * @return {string } filePathRelative 回传相对地址
   */
createImageToDestPath(image_id) {
    const imageDir = this.getValue(keys.KEY_IMAGE_DIR);
    if (!imageDir || !fs.existsSync(imageDir)) {
      return null;
    }
    // 截取文件夹路径 目前支持4级路径
    const dir_level_1 = image_id.substring(0, 1),
      dir_level_2 = image_id.substring(1, 3),
      dir_level_3 = image_id.substring(3, 6),
      dir_level_4 = image_id.substring(6);

    // 校验 & 创建
    const filePath = path.join(imageDir, dir_level_1, dir_level_2, dir_level_3, dir_level_4);
    const filePathRelative = path.join(dir_level_1, dir_level_2, dir_level_3, dir_level_4);
    mkdirp.sync(filePath, function (err) {
      if (err) console.error(err)
      else console.log('pow!')
    });
    return filePathRelative;
  }
}

module.exports.ConfigManager = ConfigManager;
module.exports.keys = keys;