/*
 * @Author: 凡琛
 * @Date: 2021-06-15 14:15:03
 * @LastEditTime: 2021-07-01 17:14:34
 * @LastEditors: Please set LastEditors
 * @Description: 用户登录接口
 * @FilePath: /Amon_server/server/base/login.js
 */
const _ = require('lodash'),
  crypto = require('crypto'),
  logger = require('../common/logger'),
  models = require('../models/index'),
  Op = models.Sequelize.Op;

//引入token组件
const { createToken, resetToken } = require('../common/token');

class loginManager {
  //登录
  async login(req, res, next) {
    // console.log('req.cookies', req.cookies["connect.sid"]);
    // console.log('req.session.id', req.session.id);
    //登录接口校验
    const { UserName = '', Password = '' } = req.body;
    if (UserName === '' || Password === '') {
      return response(res, {
        success: false,
        msg: "用户名或密码不可为空",
      });
    }
    const user = await models.User.findOne({
      where: {
        UserName: UserName
      }
    });
    if (user === null) {
      return response(res, {
        success: false,
        msg: "用户名或密码错误！",
      });
    }
    if (user.IsEnable == 0) {
      return response(res, {
        success: false,
        msg: "禁止登录，请联系管理员！",
      });
    }
    if (crypto.createHash('md5').update(Password).digest('hex') === user.Password) {
      req.session.user = user;
      // const userPosition = await models.Position.findAll({
      //   where: {
      //     id: {
      //       [Op.in]: user.PositionID.split(',')
      //     }
      //   },
      // });
      // let menuId = [];
      // if (userPosition.length > 0) {
      //   userPosition.forEach(element => {
      //     menuId = _.union(menuId, element.MenuID.split(','));
      //   });
      // }

      // const userMenu = await models.Menu.findAll({
      //   where: {
      //     id: {
      //       [Op.in]: menuId

      //     },
      //     IsEnabled: 1,
      //   },
      // });
      // req.session.menu = userMenu;

      logger.info("用户：" + UserName + " 登录成功！");
      // 生成token 存入数据库 (获取当前用户)
      const token = createToken({}, 1);
      user.Token = token;
      await user.save();
      return response(res, {
        success: true,
        UserName,
        userId: user.UserID,
        msg: "登录成功！",
        token
      });
    } else {
      return response(res, {
        success: false,
        msg: "用户名或密码错误！",
      });
    }
  }
  // 注销
  async logout(req, res, next) {
    console.log('sssssss');
    resetToken(req, res);
    req.session.destroy(function () {
      response(res, {
        success: true,
        msg: "用户注销成功",
      });
    });
  }
}

module.exports = new loginManager();
