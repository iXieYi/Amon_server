/*
 * @Author: 凡琛
 * @Date: 2021-06-17 09:06:16
 * @LastEditTime: 2021-06-18 15:27:13
 * @LastEditors: Please set LastEditors
 * @Description: 用户请求鉴权
 * @FilePath: /Amon_server/server/middleware/auth.js
 */
const { checkLoginStatus } = require('../common/token');

class authMiddleware {
    /**用户登录校验 */
    async loginRequired(req, res, next) {
        const result = await checkLoginStatus(req, res);
        const { tokenInfo = {} } = result;
        // console.log('tokenInfo',tokenInfo);
        if (!result.isEffective) {
            return response(res, {
                state: false,
                tokenInfo,
                msg:'用户登录失效',
              });
        }
        await next();
    }
     /**用户鉴权 TODO */
    async authUserPermission(req, res, next){

    }
}

module.exports = new authMiddleware();