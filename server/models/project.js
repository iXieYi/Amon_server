/*
 * @Author: 凡琛
 * @Date: 2021-06-21 16:06:37
 * @LastEditTime: 2021-07-01 14:20:56
 * @LastEditors: Please set LastEditors
 * @Description: 项目信息
 * @FilePath: /Amon_server/server/models/project.js
 */
'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  let Project = sequelize.define('Project', {
    ProjectID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    ProjectName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    ProjectType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    Investigated: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    Stage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ProjectDescribe: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    Memo3: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    CreateDate: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('CreateDate')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    StartDate: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('StartDate')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    EndDate: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('EndDate')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  },
    {
      freezeTableName: true,
      timestamps: false
    });
  return Project;
};