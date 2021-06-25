/*
 * @Author: your name
 * @Date: 2021-06-18 14:28:46
 * @LastEditTime: 2021-06-25 10:30:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Amon_server/server/common/universal-result.js
 */
/**
 * @file 通用返回结果
 */
class UniResult {

    static getResult(code, data, msg) {
        return {
            code: code,
            data: data,
            msg: msg
        };
    }

    static getError(errCode, msg) {
        return UniResult.getResult(errCode, null, msg);
    }

    static getSuccess(data, msg) {
        return UniResult.getResult(200, data, msg);
    }

    static getNoDataSuccess(msg) {
        return UniResult.getSuccess(null, msg);
    }
}

const Errors = {
    DB_ERROR: UniResult.getError(-201, '数据库错误'),
    SERVER_ERROR: UniResult.getError(-202, '服务器错误'),
    UNKNOW_ERROR: UniResult.getError(-203, '未知错误'),

    PARAM_ERROR: UniResult.getError(-210, '参数错误'),
    NOT_FOUND: UniResult.getError(-211, '资源不存在')
};

const Success = {
    DEFAULT_SUECCESS: UniResult.getNoDataSuccess('操作成功')
};

module.exports.UniResult = UniResult;
module.exports.Errors = Errors;
module.exports.Success = Success;