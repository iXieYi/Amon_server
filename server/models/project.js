/*
 * @Author: 凡琛
 * @Date: 2021-06-21 16:06:37
 * @LastEditTime: 2021-06-21 18:32:06
 * @LastEditors: Please set LastEditors
 * @Description: 项目信息
 * @FilePath: /Amon_server/server/models/project.js
 */
'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  let Project = sequelize.define('project', {
    ProjectID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    ProjectName: {
      type: DataTypes.STRING,
      primaryKey: false,
      unique: true,
    },
    Location: {
      type: DataTypes.STRING,
      primaryKey: false,
      unique: true,
    },
    ProjectType: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      unique: true,
    },
    Stage: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      unique: true,
    },
    Describe: {
      type: DataTypes.STRING,
      primaryKey: false,
      unique: true,
    },
    Memo: {
      type: DataTypes.STRING,
      primaryKey: false,
      unique: true,
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