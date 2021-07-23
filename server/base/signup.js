/*
 * @Author: 凡琛
 * @Date: 2021-06-17 08:50:55
 * @LastEditTime: 2021-07-23 16:03:49
 * @LastEditors: Please set LastEditors
 * @Description: 用户注册接口
 * @FilePath: /Amon_server/server/base/signup
 */
const models = require('../models/index');
const crypto = require('crypto');
const { isNull } = require('lodash');
const { createUseId } = require('../common/utils');
Op = models.Sequelize.Op;

class signUpManager {
  /** 新增用户 */
  async createUser(req, res, next) {
    const {
      UserName = '',
      BranchID = 0,
      PositionID = 0,
      RealName = '',
      PhoneNumber = '',
      IsEnable = true
    } = req.body;
    //检查用户名
    let usr = await models.User.findAll({
      where: {
        UserName: UserName
      }
    });
    if (usr.length > 0) {
      return response(res, {
        state: false,
        msg: "用户名已存在！",
      });
    }
    // 创建用户ID
    const UserID = await createUseId();
    //根据单位id查询
    const Password = crypto.createHash('md5').update(req.body.Password).digest('hex');
    await models.User.create({
      UserID,
      UserName,
      Password,
      BranchID,
      PositionID,
      RealName,
      PhoneNumber,
      IsEnable
    });
    response(res, {
      success: true,
      UserID: UserID,
      msg: "注册成功",
    });
  }

  /* 编辑用户信息 */
  async editUser(req, res, next) {
    // 解析请求参数
    const {
      UserID = '',
      Password,
      BranchID = '',
      PositionID = '',
      RealName = '',
      PhoneNumber = '',
      IsEnable = null,
    } = req.body;

    if (UserID == '') {
      return response(res, {
        success: false,
        msg: "user_id 为空",
      });
    }
    let model = await models.User.findByPk(UserID);
    // 判断用户是否存在
    if (!model) {
      return response(res, {
        success: false,
        msg: "用户不存在",
      });
    }

    //修改单位信息
    if (BranchID !== '') {
      model.BranchID = BranchID;
    }
    // 修改职位信息
    if (PositionID !== '') {
      model.PositionID = PositionID;
    }

    // 修改姓名
    if (RealName !== '') model.RealName = RealName;
    // 修改电话
    if (PhoneNumber !== '') model.PhoneNumber = PhoneNumber;
    // 修改账号状态
    if (IsEnable !== null) model.IsEnable = IsEnable;
    //修改密码
    if (Password !== '') {
      model.Password = crypto.createHash('md5').update(req.body.Password).digest('hex');
    }
    await model.save();
    response(res, {
      success: true,
      msg: "修改完成",
    });
  }

  /** 删除用户 */
  async deleteUser(req, res, next) {
    const { UserID } = req.body;
    if (isNull(UserID)) {
      return response(res, {
        success: false,
        msg: "UserID 不可为空",
      });
    }
    // 判断用户是否存在
    const usr = await models.User.findOne({
      where: {
        UserID: UserID
      }
    });
    if (!usr) {
      return response(res, {
        success: false,
        msg: "用户不存在",
      });
    }

    // 删除用户
    await models.User.destroy({
      where: {
        UserID: UserID
      }
    });
    response(res, {
      state: true,
      msg: "删除成功",
    });
  }

  /** 注册列表数据 */
  async getSignUpInfo(req, res, next) {
    const { AccessToken = '' } = req.query;
    if (AccessToken == 'RockRec') {
      var data = [];
      var PracticeQualification = {
        title: "执业资格",
        type: "PracticeQualification",
        items: [
          {
            id: 1,
            title: "一级注册岩土工程师",
            "desc": ""
          },
          {
            id: 2,
            title: "一级注册结构工程师",
            desc: ""
          },
          {
            id: 3,
            title: "一级注册建筑工程师",
            desc: ""
          }
        ]
      };
      var Major = {
        title: "执业资格",
        type: "Major",
        items: [
          {
            id: 1,
            title: "土木专业",
            "desc": ""
          },
          {
            id: 2,
            title: "测绘专业",
            desc: ""
          },
          {
            id: 3,
            title: "计算机专业",
            desc: ""
          }
        ]
      };
      var JobTitle = {
        title: "助力工程师",
        type: "JobTitle",
        items: [
          {
            id: 1,
            title: "工程师",
            "desc": ""
          },
          {
            id: 2,
            title: "高级工程师",
            desc: ""
          },
          {
            id: 3,
            title: "正高级工程师",
            desc: ""
          }
        ]
      };
      var ResearchDirection = {
        title: "助力工程师",
        type: "ResearchDirection",
        items: [
          {
            id: 1,
            title: "勘察设计",
            "desc": ""
          },
          {
            id: 2,
            title: "软件研发",
            desc: ""
          },
          {
            id: 3,
            title: "数字化BIM",
            desc: ""
          }
        ]
      };
      data.push(PracticeQualification);
      data.push(Major);
      data.push(JobTitle);
      data.push(ResearchDirection);
      response(res, {
        state: true,
        msg: "请求成功",
        data
      });
    } else {
      response(res, {
        state: false,
        msg: "无效请求",
      });
    }
  }
}


module.exports = new signUpManager();