/*
 * @Author: 凡琛
 * @Date: 2021-06-18 15:53:38
 * @LastEditTime: 2021-06-18 17:25:50
 * @LastEditors: Please set LastEditors
 * @Description: 通用工具类
 * @FilePath: /Amon_server/server/common/utils.js
 */

const { toNumber } = require('lodash');
const logger = require('../common/logger');
const models = require('../models/index');
Op = models.Sequelize.Op;

const currentDate = () => {
    // 获取当前日期
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
    String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
    var yyyyMMdd = curr_year + "" + curr_month + "" + curr_date;
    return yyyyMMdd;
}

const createUseId = async () => {
    const prefix = currentDate();
    var user_id = prefix;
    //查数据库已有的user_id
    await models.user.findAll({
        where: {
            user_id: {
                [Op.like]: `${prefix}%`
            }
        }
    }).then(function (result) {
        if (result.length <= 0) {
            user_id = prefix + '0001';
        } else {
            // 遍历最大值 + 1 （ TODO 溢出问题? ）
            var max_id = 0;
            result.forEach(user => {
                const id = toNumber(user.user_id);
                if (id > max_id) max_id = id;
                console.log('user', typeof (max_id), max_id);
            });
            user_id = max_id + 1;
        }
    }).catch(function (error) {
        logger.info("user_id创建error: "+error);
    });
    logger.info("user_id: " + user_id + " 创建");
    return user_id.toString();
}

module.exports = { currentDate, createUseId }