/*
 * @Author: 凡琛
 * @Date: 2021-06-30 09:52:56
 * @LastEditTime: 2021-06-30 13:20:05
 * @LastEditors: Please set LastEditors
 * @Description: 样本图像发布接口
 * @FilePath: /Amon_server/server/base/publish.js
 */
const models = require('../models/index');
Op = models.Sequelize.Op;

class publishManager {
  // 样本采集发布页面
  async publishSampleImage(req, res, next) {
    console.log('req.body', req.body);
    // 
    response(res, {
      success: true,
      SubmitID: 222222222,
      msg: "发布成功",
    });
  }
}

module.exports = new publishManager();

