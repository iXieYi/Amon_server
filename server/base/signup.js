/*
 * @Author: 凡琛
 * @Date: 2021-06-17 08:50:55
 * @LastEditTime: 2021-06-17 11:54:50
 * @LastEditors: Please set LastEditors
 * @Description: 用户注册接口
 * @FilePath: /Amon_server/server/base/signup
 */
const models = require('../models/index');
const crypto = require('crypto');
const { isNull } = require('lodash');
class signUpManager {
  /** 新增用户 */
  async createUser(req, res, next) {
    const { userName = '', branch_id = 0, position_id = '', position_name = '', real_name = '', mobile = '', is_enabled = true } = req.body;
    //检查用户名
    let usr = await models.user.findAll({
      where: {
        login_name: userName
      }
    });
    if (usr.length > 0) {
      res.send({
        state: false,
        msg: "用户名已存在！"
      });
      return;
    }
    //生成user_id


    //根据单位id查询
    const branch_model = await models.branch.findByPk(branch_id);
    const login_password = crypto.createHash('md5').update(req.body.login_password).digest('hex');
    await models.user.create({
      user_id: req.body.user_id,
      login_name: userName,
      login_password,
      branch_id,
      branch_name: !branch_model ? '' : branch_model.name,
      position_id,
      position_name,
      real_name,
      mobile,
      is_enabled
    });
    res.send({
      state: true,
      msg: "注册成功"
    });
  }

  /* 编辑用户信息 */
  async editUser(req, res, next) {
    // 解析请求参数
    const { user_id = '',login_password, branch_id = '', position_id = '', real_name = '', mobile = '', is_enabled = null } = req.body;
    
    if (user_id == '') {
      res.send({
        state: false,
        msg: "user_id 为空"
      });
      return;
    }
    let model = await models.user.findByPk(user_id);
    console.log('model',model);
    // 判断用户是否存在
    if (!model) {
      res.send({
        state: false,
        msg: "用户不存在"
      });
      return;
    }

    //修改单位信息
    if (branch_id !== '') {
      model.branch_id = branch_id;
      // 根据单位id修改对应的单位名称
      if (model.branch_id !== 0) {
        const branch_model = await models.branch.findByPk(model.branch_id);
        model.branch_name = !branch_model ? '' : branch_model.name;
      }
    }
    // 修改职位信息
    if (position_id !== '') {
      model.position_id = position_id;
      // 根据职位id修改对应的职位名称
      if (model.position_id !== 0) {
        const position_model = await models.position.findByPk(model.position_id);
        model.position_name = !position_model ? '' : position_model.name;
      }
    }

    // 修改姓名
    if (real_name !== '') model.real_name = real_name;
    // 修改电话
    if (mobile !== '') model.mobile = mobile;
    // 修改账号状态
    if (is_enabled !== null) model.is_enabled = is_enabled;
    //修改密码
    if (login_password !== '') {
      model.login_password = crypto.createHash('md5').update(req.body.login_password).digest('hex');
    }
    await model.save();
    res.send({
      state: true,
      msg: "修改完成"
    });
  }

  /** 删除用户 */
  async deleteUser(req, res, next) {
    const { user_id } = req.body;
    if (isNull(user_id)) {
      res.send({
        state: true,
        msg: "user_id 不可为空"
      });
      return;
    }
    // 判断用户是否存在
    const usr = await models.user.findAll({
      where: {
        user_id: user_id
      }
    });
    if (usr.length <= 0) {
      res.send({
        state: true,
        msg: "用户不存在"
      });
      return;
    }

    // 删除用户
    await models.user.destroy({
      where: {
        user_id: user_id
      }
    });

    res.send({
      state: true,
      msg: "删除成功"
    });
  }

  /** 校验用户是否存在  TODO */
  async checkUserExist() {
    let usr, userName, userId;
    if (userName) {
      usr = await models.user.findAll({
        where: {
          userName: userName
        }
      });
    } else if (user_id) {
      usr = await models.user.findAll({
        where: {
          user_id: userId
        }
      });
    }
    const isExist = usr.length > 0 ? true : false;
    return isExist;
  }
}


module.exports = new signUpManager();