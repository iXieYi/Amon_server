/*
 * @Author: 凡琛
 * @Date: 2021-07-12 16:17:04
 * @LastEditTime: 2021-07-12 20:39:14
 * @LastEditors: Please set LastEditors
 * @Description: 岩石类别处理
 * @FilePath: /Amon_server/server/base/rockClass.js
 */
const models = require('../models/index');
const utils = require('../common/utils');
class rockClassManager {

  // 获取岩石类别
  async getRockClassToJson(req, res) {
    const rockClass = await models.RockClass.findAll();
    console.log(rockClass.length);
    // 格式化输出
    var rock = utils.rockFormatData(rockClass);

    response(res, {
      success: true,
      msg: "岩石信息获取成功",
      rock
    });
  }
}
module.exports = new rockClassManager();
