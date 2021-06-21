/*
 * @Author: 凡琛
 * @Date: 2021-06-21 16:50:02
 * @LastEditTime: 2021-06-21 18:59:08
 * @LastEditors: Please set LastEditors
 * @Description: 项目管理接口
 * @FilePath: /Amon_server/server/base/project.js
 */
const crypto = require('crypto');
const logger = require('../common/logger');
const models = require('../models/index');
Op = models.Sequelize.Op;

class projectManager {
  /** 获取项目列表 */
  async getProjectList(req, res) {
    let offset = +req.query.offset || 0,
      limit = +req.query.limit || 15;

    const data = await models.project.findAndCountAll({
      where: {},
      limit: limit,
      offset: offset
    });
    response(res, {
      state: true,
      data,
      msg: "项目列表",
    });
  }
  
  /** 新增项目 */
  async createProject(req, res) {

  }

  /** 删除项目 */
  async deleteProject(req, res) {

  }

  /** 编辑项目 */
  async editProject(req, res) {

  }
}

module.exports = new projectManager();