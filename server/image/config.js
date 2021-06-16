/*
 * @Author: your name
 * @Date: 2021-06-11 23:04:25
 * @LastEditTime: 2021-06-16 10:45:21
 * @LastEditors: Please set LastEditors
 * @Description: 图片服务器配置
 * @FilePath: /coderyuan-image-server/config.js
 */
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
// const path = require('../image/config.yml');

let _instance;

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
    KEY_BIND_LOCAL: 'bind_local_address'
};

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
     * Get the temporary directory for saving temporary images and ensure the directory is existed.
     * 
     * @returns {string|null} full temporary directory path
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
}

module.exports.ConfigManager = ConfigManager;
module.exports.keys = keys;