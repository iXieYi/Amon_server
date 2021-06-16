/*
 * @Author: 凡琛
 * @Date: 2021-06-15 14:15:03
 * @LastEditTime: 2021-06-16 18:01:32
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
    console.log('req.cookies', req.cookies["connect.sid"]);
    console.log('req.session.id', req.session.id);
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
      
      // 生成token 存入数据库 (获取当前用户)
      const token = createToken({}, 1);
      user.token = token;
      await user.save();
      return res.send({
        state: true,
        msg: "登录成功！",
        token:token
      })
    } else {
      return res.send({
        state: false,
        msg: "用户名或密码错误！"
      })
    }
  }
  // 注销
  async logout(req, res, next) {
    resetToken(req,res);
    req.session.destroy(function () {
      res.send({
        msg: "用户注销"
      });
    });
  }
}

module.exports = new loginManager();
