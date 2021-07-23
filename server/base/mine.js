/*
 * @Author: 凡琛
 * @Date: 2021-07-07 16:34:28
 * @LastEditTime: 2021-07-23 15:01:29
 * @LastEditors: Please set LastEditors
 * @Description: 个人信息维护
 * @FilePath: /Amon_server/server/base/mine.js
 */
const models = require('../models/index');
class mineManager {
  // 获取个人信息
  async getPersonalInfo(req, res) {
    const { userid = '' } = req.headers;
    const { version = 'v0.0.1' } = req.body;
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
    console.log('version', version);
    const { dataValues = {}, Admin = false } = user;
    // 个人信息
    const baseInfo = {
      "imageUrl": user.Avatar,
      "name": user.RealName,
      "departmant": Branch.Name
    }
    list.push(baseInfo);
    if (Admin) { // 管理员权限  TODO 需要配置为项目人员也可具备的权限 但只能到页面
      const item_0 = {
        "icon": "assets/images/icon/company.png",
        "itemName": "组织架构管理",
        "detail": '管理员',
        "jumpUrl": "/company",
        "extInfo": {}
      }
      list.push(item_0);
    }
    // 
    const item_1 = {
      "icon": "assets/images/icon/phone.png",
      "itemName": "手机",
      "detail": user.PhoneNumber,
      "extInfo": {}
    }
    list.push(item_1);
    const item_2 = {
      "icon": "assets/images/icon/email.png",
      "itemName": "邮箱",
      "detail": user.Email,
      "extInfo": {}
    }
    list.push(item_2);
    const item_3 = {
      "icon": "assets/images/icon/qrcode.png",
      "itemName": "二维码",
      "detail": "",
      "extInfo": {}
    }
    list.push(item_3);
    const item_4 = {
      "icon": "assets/images/icon/version.png",
      "itemName": "版本",
      "detail": version,
      "extInfo": {}
    }
    list.push(item_4);
    const item_5 = {
      "icon": "assets/images/icon/password.png",
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