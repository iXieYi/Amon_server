/*
 * @Author: 凡琛
 * @Date: 2021-06-15 20:30:13
 * @LastEditTime: 2021-07-01 14:25:12
 * @LastEditors: Please set LastEditors
 * @Description: 职位信息
 * @FilePath: /Amon_server/server/models/position.js
 */
'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    let Position = sequelize.define('Position', {
        PositionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        /**职位名称 */
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**部门id（单个） */
        BranchID: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        /**部门名称 */
        BranchName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**菜单权限集合（1,2,3,4） */
        MenuID: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
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
    });

    return Position;
};