/*
 * @Author: your name
 * @Date: 2021-06-13 20:47:16
 * @LastEditTime: 2021-06-15 21:47:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /Amon_server/server/image/webp-converter.js
 */
const LogUtil = require('./log');
const { exec } = require('child_process');

class WebPConverter {

    /**
     * Convert image to WebP file. (without callback)
     * 
     * @param {string} input 
     * @param {string} output 
     */
    static convertToWebP(input, output) {
        exec(`cwebp "${input}" -o "${output}"`);
    }
}

module.exports = WebPConverter;