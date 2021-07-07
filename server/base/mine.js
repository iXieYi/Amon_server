/*
 * @Author: 凡琛
 * @Date: 2021-07-07 16:34:28
 * @LastEditTime: 2021-07-07 18:13:31
 * @LastEditors: Please set LastEditors
 * @Description: 个人信息维护
 * @FilePath: /Amon_server/server/base/mine.js
 */
const models = require('../models/index');
class mineManager {
  // 获取个人信息
  async getPersonalInfo(req, res) {
    const { userid = '', versionText = 'v0.0.1' } = req.headers;
    var mineData = {};
    var list = [];
    const user = await models.User.findOne({
      where: {
        UserID: userid
      }
    })
    // 查公司信息
    const Branch = await models.Branch.findOne({
      where: {
        BranchID: user.BranchID
      }
    });
    console.log('versionText', versionText);
    const { dataValues = {} } = user;
    // 个人信息
    const baseInfo = {
      "imageUrl": "http://www.hdec.com/cn/images/banner1.jpg",
      "name": user.RealName,
      "departmant": Branch.Name
    }
    list.push(baseInfo);
    const item_1 = {
      "icon": "http://www.hdec.com/cn/images/banner1.jpg",
      "itemName": "手机",
      "detail": user.PhoneNumber,
      "extInfo": {}
    }
    list.push(item_1);
    const item_2 = {
      "icon": "http://www.hdec.com/cn/images/banner1.jpg",
      "itemName": "邮箱",
      "detail": user.Email,
      "extInfo": {}
    }
    list.push(item_2);
    const item_3 = {
      "icon": "http://www.hdec.com/cn/images/banner1.jpg",
      "itemName": "二维码",
      "detail": "",
      "extInfo": {}
    }
    list.push(item_3);
    const item_4 = {
      "icon": "http://www.hdec.com/cn/images/banner1.jpg",
      "itemName": "版本",
      "detail": versionText,
      "extInfo": {}
    }
    list.push(item_4);
    const item_5 = {
      "icon": "http://www.hdec.com/cn/images/banner1.jpg",
      "itemName": "修改密码",
      "detail": "",
      "extInfo": {}
    }
    list.push(item_5);
    const item_6 = {
      "name": "退出登录"
    }
    list.push(item_6);
    mineData = {
      list
    }
    response(res, {
      success: true,
      msg: "个人信息获取成功",
      mineData
    });
  }
}

module.exports = new mineManager();