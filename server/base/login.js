/*
 * @Author: 凡琛
 * @Date: 2021-06-15 14:15:03
 * @LastEditTime: 2021-06-16 09:40:00
 * @LastEditors: Please set LastEditors
 * @Description: 用户登录接口
 * @FilePath: /Amon_server/server/base/login.js
 */
const _ = require('lodash'),
  crypto = require('crypto'),
  logger = require('../common/logger'),
  models = require('../models/index'),
  Op = models.Sequelize.Op;

class loginManager {
  async login(req, res, next) {
    //登录接口校验
    let loginname = req.body.loginName;
    let password = req.body.password;
    // TODO 兜底逻辑
    const user = await models.user.findOne({
      where: {
        login_name: loginname
      }
    });
    if (user === null) {
      return res.send({
        state: false,
        msg: "用户名或密码错误！"
      })
    }
    if (user.is_enabled == 0) {
      return res.send({
        state: false,
        msg: "禁止登录，请联系管理员！"
      })
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

      logger.info("用户：" + loginname + "登录成功！");
      return res.send({
        state: true,
        msg: "登录成功！"
      })
    } else {
      return res.send({
        state: false,
        msg: "用户名或密码错误！"
      })
    }
  }
}

module.exports = new loginManager();
