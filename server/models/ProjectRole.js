/*
 * @Author: your name
 * @Date: 2021-07-21 19:24:47
 * @LastEditTime: 2021-07-21 20:04:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /Amon_server/server/models/ProjectRole.js
 */
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ProjectRole', {
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      comment: "角色编号"
    },
    ProjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "项目编号",
      references: {
        model: 'Project',
        key: 'ProjectID'
      }
    },
    RoleName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "角色名称"
    },
    RoleLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "角色等级"
    },
    Sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "排序值"
    },
    CreateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    UpdateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'ProjectRole',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RoleID" },
        ]
      },
      {
        name: "fk_ProjectRole_Project_1",
        using: "BTREE",
        fields: [
          { name: "ProjectID" },
        ]
      },
    ]
  });
};
