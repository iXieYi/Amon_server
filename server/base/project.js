/*
 * @Author: 凡琛
 * @Date: 2021-06-21 16:50:02
 * @LastEditTime: 2021-06-22 10:54:38
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
    const {
      ProjectID = '',
      ProjectName = '',             // 项目名称，强校验
      ProjectType = 0,              // 项目类别，强校验
      Stage = 0,                    // 项目状态，强校验
      Department = '',              // 部门，   强校验
      Location = '',                // 地址信息
      Describe = '',                // 描述
      Memo = '',                    // 备注信息
      StartDate,                    // 开始时间，强校验
      EndDate                       // 结束时间，强校验
    } = req.body;
    // 校验项目是否已经存在
    let project = await models.project.findAll({
      where: {
        ProjectName: ProjectName
      }
    });
    if (project.length > 0) {
      return response(res, {
        state: false,
        msg: "项目已存在！",
      });
    }
    // 数据处理
    const CreateDate = moment().format('YYYY-MM-DD HH:mm:ss');
    // const ProjectID = '2021062201' // 项目id 生成规则？
    // 创建项目
    await models.project.create({
      ProjectID,
      ProjectName,
      ProjectType,
      Stage,
      Department,
      Location,
      Describe,
      Memo,
      CreateDate,
      StartDate,
      EndDate
    }).then(function (result) {
      response(res, {
        state: true,
        ProjectID: ProjectID,
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
        state: false,
        msg: "ProjectID 不可为空",
      });
    }
    // 判断项目是否存在
    const project = await models.project.findOne({
      where: {
        ProjectID: ProjectID
      }
    });
    if (!project) {
      return response(res, {
        state: false,
        msg: "项目不存在，请检查项目id是否正确",
      });
    }
    // 删除项目
    await models.project.destroy({
      where: {
        ProjectID: ProjectID
      }
    }).then(function (result) {
      response(res, {
        state: true,
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
      Department = '',              // 部门，   强校验
      Location = '',                // 地址信息
      Describe = '',                // 描述
      Memo = '',                    // 备注信息
      StartDate = '',                    // 开始时间，强校验
      EndDate = ''                      // 结束时间，强校验
    } = req.body;
    // ProjectID 判断
    if (ProjectID == '') {
      return response(res, {
        state: false,
        msg: "ProjectID 参数为空",
      });
    }
    const project = await models.project.findByPk(ProjectID);
    console.log('project', project);
    // 判断是否存在
    if (!project) {
      return response(res, {
        state: false,
        msg: "项目不存在",
      });
    }
    //信息修改
    if (ProjectName !== '') {
      // 校验项目名是否与其他项目冲突
      const projects = await models.project.findAll({
        where: {
          ProjectName: ProjectName
        }
      });
      if (projects.length > 0) {
        return response(res, {
          state: false,
          msg: "项目名不可用",
        });
      }else{
        project.ProjectName = ProjectName;
      }
    }
    if (!ProjectType) project.ProjectType = ProjectType;
    if (!Stage) project.Stage = Stage;
    if (Department !== '') project.Department = Department;
    if (Location !== '') project.Location = Location;
    if (Describe !== '') project.Describe = Describe;
    if (Memo !== '') project.Memo = Memo;
    if (StartDate !== '') project.StartDate = StartDate;
    if (EndDate !== '') project.EndDate = EndDate;
    await project.save();
    response(res, {
      state: true,
      msg: "修改完成",
    });
  }
}

module.exports = new projectManager();