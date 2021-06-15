/*
 * @Author: 凡琛
 * @Date: 2021-06-15 20:30:13
 * @LastEditTime: 2021-06-15 20:49:37
 * @LastEditors: Please set LastEditors
 * @Description: 职位信息
 * @FilePath: /Amon_server/server/models/position.js
 */
'use strict';
 const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    let Position = sequelize.define('position', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        /**职位名称 */
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**部门id（单个） */
        branch_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        /**部门名称 */
        branch_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**菜单权限集合（1,2,3,4） */
        menu_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt: {
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