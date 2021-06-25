/*
 * @Author: 凡琛
 * @Date: 2021-06-17 09:06:16
 * @LastEditTime: 2021-06-25 17:40:21
 * @LastEditors: Please set LastEditors
 * @Description: 用户请求鉴权
 * @FilePath: /Amon_server/server/middleware/auth.js
 */
const { checkLoginStatus } = require('../common/token');

class authMiddleware {
  /**用户登录校验 */
  async loginRequired(req, res, next) {
    const { token = '', user_id = '' } = req.headers;
    console.log(req.headers);
    if (!token || !user_id) {
      return response(res, {
        success: false,
        msg: 'token & user_id不可为空',
      });
    }
    const result = await checkLoginStatus(req, res);
    const { tokenInfo = {} } = result;
    // console.log('tokenInfo',tokenInfo);
    if (!result.isEffective) {
      return response(res, {
        success: false,
        tokenInfo,
        msg: '用户登录失效',
      });
    }
    await next();
  }
  /**用户鉴权 TODO */
  async authUserPermission(req, res, next) {

  }
}

module.exports = new authMiddleware();