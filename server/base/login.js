/*
 * @Author: 凡琛
 * @Date: 2021-06-15 14:15:03
 * @LastEditTime: 2021-06-25 17:53:39
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
    const { userName = '', password = '' } = req.body;
    if (userName === '' || password === '') {
      return response(res, {
        success: false,
        msg: "用户名或密码不可为空",
      });
    }
    const user = await models.user.findOne({
      where: {
        login_name: userName
      }
    });
    if (user === null) {
      return response(res, {
        success: false,
        msg: "用户名或密码错误！",
      });
    }
    if (user.is_enabled == 0) {
      return response(res, {
        success: false,
        msg: "禁止登录，请联系管理员！",
      });
    }
    if (crypto.createHash('md5').update(password).digest('hex') === user.login_password) {
      req.session.user = user;
      const userPosition = await models.position.findAll({
        where: {
          id: {
            [Op.in]: user.position_id.split(',')
          }
        },
      });
      let menuId = [];
      if (userPosition.length > 0) {
        userPosition.forEach(element => {
          menuId = _.union(menuId, element.menu_id.split(','));
        });
      }

      const userMenu = await models.menu.findAll({
        where: {
          id: {
            [Op.in]: menuId

          },
          is_enabled: 1,
        },
      });
      req.session.menu = userMenu;

      logger.info("用户：" + userName + " 登录成功！");
      // 生成token 存入数据库 (获取当前用户)
      const token = createToken({}, 1);
      user.token = token;
      await user.save();
      return response(res, {
        success: true,
        userName: user.login_name,
        userId: user.user_id,
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
