/*
 * @Author: your name
 * @Date: 2021-06-18 14:04:46
 * @LastEditTime: 2021-06-18 14:47:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Amon_server/server/common/response.js
 */
const Result = require('./universal-result');

class response {
  /**
   * Send JSON response.
   * @param {UniResult} data 
   * @param {Error|null} err 
   */
  response(res,data, err = null) {
    if (data) {
      res.json(Result.UniResult.getSuccess(data));
    } else {
      res.json(Result.UniResult.getError(-1, err.message));
    }
    res.end();
  };
}
module.exports = new response();
