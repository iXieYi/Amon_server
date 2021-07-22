/*
 * @Author: 凡琛
 * @Date: 2021-06-18 15:53:38
 * @LastEditTime: 2021-07-22 11:35:04
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

/*  创建用户id */
const createUseId = async () => {
  const prefix = currentDate();
  var UserID = prefix;
  //查数据库已有的user_id
  const usr = await models.User.findAll({
    where: {
      UserID: {
        [Op.like]: `${prefix}%`
      }
    }
  }).then(function (result) {
    if (result.length <= 0) {
      UserID = prefix + '0001';
    } else {
      // 遍历最大值 + 1 （ TODO 溢出问题? ）
      var max_id = 0;
      result.forEach(user => {
        const id = toNumber(user.UserID);
        if (id > max_id) max_id = id;
        console.log('user', typeof (max_id), max_id);
      });
      UserID = max_id + 1;
    }
  }).catch(function (error) {
    logger.info("user_id创建error: " + error);
  });
  logger.info("UserID: " + UserID + " 创建");
  return UserID;
}

const randNum = (n) => {
  var num = '';
  for (var i = 0; i < n; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

const isEist = (list, key) => {
  var eist = false;
  list.forEach(element => {
    if (element['name'] == key) {
      eist = true
    }
  });
  return eist;
}
const getListIndex = (list, key) => {
  var index = -1;
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    if (element['name'] == key) {
      index = i;
    }
  }
  return index;
}

const rockFormatData = (list) => {
  var result = [];
  list.forEach(item => {
    if (item['FirstClassName'] != null && item['FirstClassName'] != '') {
      // 一级是否不存在
      var index_level_1 = getListIndex(result, item['FirstClassName']);
      if (index_level_1 == -1) {
        const code = (item['RockCode'].toString()).substr(0, 1) + '00000';
        result.push({
          name: item['FirstClassName'],
          level: 1.0,
          code,
          child: []
        });
        index_level_1 = getListIndex(result, item['FirstClassName']);
      }
    }
    if (item['SecondClassName'] != null && item['SecondClassName'] != '') {
      // 二级是否不存在
      var index_level_2 = getListIndex(result[index_level_1].child, item['SecondClassName']);
      if (index_level_2 == -1) {
        const code = (item['RockCode'].toString()).substr(0, 2) + '0000';
        result[index_level_1].child.push({
          name: item['SecondClassName'],
          level: 2.0,
          code,
          child: []
        });
        index_level_2 = getListIndex(result[index_level_1].child, item['SecondClassName']);
      }
    }
    if (item['ThirdClassName'] != null && item['ThirdClassName'] != '') {
      // 三级是否不存在
      var index_level_3 = getListIndex(result[index_level_1].child[index_level_2].child, item['ThirdClassName']);
      if (index_level_3 == -1) {
        const code = (item['RockCode'].toString()).substr(0, 4) + '00';
        result[index_level_1].child[index_level_2].child.push({
          name: item['ThirdClassName'],
          level: 3.0,
          code,
          child: []
        });
        index_level_3 = getListIndex(result[index_level_1].child[index_level_2].child, item['ThirdClassName']);
      }
    }
    if (item['FourthClassName'] != null && item['FourthClassName'] != '') {
      // 四级是否不存在
      var index_level_4 = getListIndex(result[index_level_1].child[index_level_2].child[index_level_3].child, item['FourthClassName']);
      if (index_level_4 == -1) {
        const code = (item['RockCode'].toString());
        result[index_level_1].child[index_level_2].child[index_level_3].child.push({
          name: item['FourthClassName'],
          level: 4.0,
          code,
          child: []
        });
      }
    }
  });
  return result;

}

// 追加id码
const addItemToList = (id, listStr) => {
  var result;
  let list = [];
  if (listStr != null && listStr != '') list = listStr.split(',');
  if ((id != '' && id != null) && (listStr == null || list.indexOf(id) == -1)) {
    list.push(id);
    result = list.join(',');
    return result;
  } else {
    return listStr;
  }
}

// 删除指定的id码
const removeItemToList = (id, listStr) => {
  var result;
  let list = [];
  var findIndex;
  if (listStr != null && listStr != '') list = listStr.split(',');
  if ((id != '' && id != null) && (listStr == null || (findIndex = list.indexOf(id)) != -1)) {
    list.splice(findIndex, 1);
    result = list.join(',');
    return result;
  } else {
    return listStr;
  }
}



module.exports = { randNum, currentDate, createUseId, rockFormatData, addItemToList, removeItemToList }