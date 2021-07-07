/*
 * @Author: 凡琛
 * @Date: 2021-06-15 20:30:13
 * @LastEditTime: 2021-07-07 17:20:52
 * @LastEditors: Please set LastEditors
 * @Description: 部门管理
 * @FilePath: /Amon_server/server/models/branch.js
 */
'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    let Branch = sequelize.define('Branch', {
        BranchID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        /**部门名称 */
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**部门编码（第一级01，第二级0101，依次类推） */
        Code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        /**上一级部门id */
        ParentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        /**层级 */
        Level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        /**排序 */
        Sort: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        CreatedTime: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        UpdatedTime: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Branch;
};