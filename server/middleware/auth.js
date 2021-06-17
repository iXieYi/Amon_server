/*
 * @Author: 凡琛
 * @Date: 2021-06-17 09:06:16
 * @LastEditTime: 2021-06-17 13:24:39
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
            return res.send({
                msg: tokenInfo.msg
            });
        }
        await next();
    }
}

module.exports = new authMiddleware();