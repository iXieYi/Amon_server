/*
 * @Author: 凡琛
 * @Date: 2021-06-16 11:37:30
 * @LastEditTime: 2021-07-01 17:29:06
 * @LastEditors: Please set LastEditors
 * @Description: Token 处理函数
 * @FilePath: /Amon_server/server/common/token.js
 */

//引入token生成组件
const jwt = require('jsonwebtoken');
const { isEqual } = require('lodash');
const config = require('../config');
const models = require('../models/index');
const secret = config.session_secret;

/**
 * @description: 创建Token
 * @param {*} data 自定义数据
 * @param {*} exp  token失效时间(单位：天)
 * @return {*} token 值
 */
const createToken = function (data, exp) {
  let obj = {};
  obj.data = data ? data : null;
  obj.type = 'jsonWebToken';
  obj.ctime = new Date().getTime();   //token的创建时间
  exp = exp ? exp * (60 * 60 * 24) : 60 * 60 * 24;     //设定的过期时间,不设置就默认1天 
  let token = jwt.sign(obj, secret, { expiresIn: exp });
  return token;
};

/**
 * @description: 校验Token有效性
 * @param {*} token  token 值
 * @return {*} 校验结果
 */
const varifyToken = (token) => {
  var info = jwt.verify(token, secret, (error, res) => {
    var data = {};
    if (error) {
      data.code = '500';        // 自个定义失败码
      data.msg = 'token验证失败';
      data.obj = error;         // 存失败信息，比如过期等
    } else {
      data.code = '200';
      data.msg = 'token验证成功';
      data.obj = res;
    }
    return data;
  });
  return info;
};
/**
 * @description: 检测用户登录态
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const checkLoginStatus = async (req, res) => {
  const { token = '', userid = '' } = req.headers;
  // token 有效性校验
  const info = varifyToken(token);
  var resultInfo = {
    tokenInfo: info,
    isEffective: false
  };
  // TODO 失败信息怎么获取前段
  if (info.code == '500') {
    return resultInfo;
  }
  // 查询数据库
  const user = await models.User.findOne({
    where: {
      UserID: userid
    }
  });
  // token 一致性校验
  const isEffective = user ? token == user.Token : false;
  resultInfo.isEffective = isEffective;
  return resultInfo;
}
/**
 * @description: 重置Token
 * @param {*} async
 * @param {*} res
 * @return {*}
 */
const resetToken = async (req, res) => {
  const { userid } = req.headers;
  const user = await models.User.findOne({
    where: {
      UserID: userid
    }
  });
  user.Token = null;
  await user.save();
}



module.exports = { createToken, varifyToken, checkLoginStatus, resetToken };

