/*
 * @Author: 凡琛
 * @Date: 2021-06-16 11:37:30
 * @LastEditTime: 2021-06-16 17:25:24
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
  exp = exp ? exp : 60 * 60 * 24;     //设定的过期时间,不设置就默认1天 
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
    var data = {};              // 通过回调函数自定义返回信息，不然默认是创建token时传进去的obj和时间信息，这里加上状态码这些
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
// userid
const checkLoginStatus = async (req, res) => {
  const token = req.query.token;
  const user = await models.user.findOne({
    where: {
      token: token
    }
  });
  const isEffective = user ? token == user.token : false;
  console.log('isEffective', isEffective); 
  if (!isEffective) {
    res.send({
      msg: "未登录，请登录后重试！"
    });
  }
  return isEffective;
}



module.exports = { createToken, varifyToken, checkLoginStatus };

