/*
 * @Author: 凡琛
 * @Date: 2021-06-21 16:50:02
 * @LastEditTime: 2021-07-01 17:44:51
 * @LastEditors: Please set LastEditors
 * @Description: 项目管理接口
 * @FilePath: /Amon_server/server/base/project.js
 */
const crypto = require('crypto');
const logger = require('../common/logger');
const models = require('../models/index');
const moment = require('moment');
const { isNull } = require('lodash');
Op = models.Sequelize.Op;

class projectManager {
  /** 获取项目列表 */
  async getProjectList(req, res) {
    let offset = +req.query.offset || 0,
      limit = +req.query.limit || 15;

    const data = await models.Project.findAndCountAll({
      where: {},
      limit: limit,
      offset: offset
    });
    response(res, {
      success: true,
      data,
      msg: "项目列表",
    });
  }

  /** 新增项目 */
  async createProject(req, res) {
    const {
      ProjectName = '',             // 项目名称，强校验
      ProjectType = 0,              // 项目类别，强校验
      Stage = 0,                    // 项目状态，强校验
      Investigated = '',
      Location = '',                // 地址信息
      ProjectDescribe = '',                // 描述
      Memo3 = '',                    // 备注信息
      StartDate,                    // 开始时间，强校验
      EndDate                       // 结束时间，强校验
    } = req.body;
    // 校验项目是否已经存在
    let project = await models.Project.findAll({
      where: {
        ProjectName: ProjectName
      }
    });
    if (project.length > 0) {
      return response(res, {
        success: false,
        msg: "项目已存在！",
      });
    }
    // 数据处理
    const CreateDate = moment().format('YYYY-MM-DD HH:mm:ss');
    // 创建项目
    await models.Project.create({
      ProjectName,
      ProjectType,
      Stage,
      Investigated,
      Location,
      ProjectDescribe,
      Memo3,
      CreateDate,
      StartDate,
      EndDate
    }).then(function (result) {
      response(res, {
        success: true,
        msg: "项目创建成功",
      }).catch(function (error) {
        logger.info("项目创建失败: " + error);
      });
    });
  }

  /** 删除项目 */
  async deleteProject(req, res) {
    const { ProjectID } = req.body;
    if (isNull(ProjectID)) {
      return response(res, {
        success: false,
        msg: "ProjectID 不可为空",
      });
    }
    // 判断项目是否存在
    const project = await models.Project.findOne({
      where: {
        ProjectID: ProjectID
      }
    });
    if (!project) {
      return response(res, {
        success: false,
        msg: "项目不存在，请检查项目id是否正确",
      });
    }
    // 删除项目
    await models.Project.destroy({
      where: {
        ProjectID: ProjectID
      }
    }).then(function (result) {
      response(res, {
        success: true,
        msg: "项目删除成功",
      });
    }).catch(function (error) {
      logger.info("项目删除失败: " + error);
    });
  }

  /** 编辑项目 */
  async editProject(req, res) {
    const {
      ProjectID = '',
      ProjectName = '',             // 项目名称，强校验
      ProjectType = 0,              // 项目类别，强校验
      Stage = 0,                    // 项目状态，强校验
      Investigated = '',
      Location = '',                // 地址信息
      ProjectDescribe = '',                // 描述
      Memo3 = '',                    // 备注信息
      StartDate = '',                    // 开始时间，强校验
      EndDate = ''                      // 结束时间，强校验
    } = req.body;
    // ProjectID 判断
    if (ProjectID == '') {
      return response(res, {
        success: false,
        msg: "ProjectID 参数为空",
      });
    }
    const project = await models.Project.findByPk(ProjectID);
    console.log('project', project);
    // 判断是否存在
    if (!project) {
      return response(res, {
        success: false,
        msg: "项目不存在",
      });
    }
    //信息修改
    if (ProjectName !== '') {
      // 校验项目名是否与其他项目冲突
      const projects = await models.Project.findAll({
        where: {
          ProjectName: ProjectName
        }
      });
      if (projects.length > 0) {
        return response(res, {
          success: false,
          msg: "项目名不可用",
        });
      } else {
        project.ProjectName = ProjectName;
      }
    }
    if (!ProjectType) project.ProjectType = ProjectType;
    if (!Stage) project.Stage = Stage;
    if (Investigated !== '') project.Investigated = Investigated;
    if (Location !== '') project.Location = Location;
    if (ProjectDescribe !== '') project.ProjectDescribe = ProjectDescribe;
    if (Memo3 !== '') project.Memo3 = Memo3;
    if (StartDate !== '') project.StartDate = StartDate;
    if (EndDate !== '') project.EndDate = EndDate;
    await project.save();
    response(res, {
      success: true,
      msg: "修改完成",
    });
  }
}

module.exports = new projectManager();