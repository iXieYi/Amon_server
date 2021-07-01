/*
 * @Author: 凡琛
 * @Date: 2021-06-15 20:30:13
 * @LastEditTime: 2021-07-01 15:28:57
 * @LastEditors: Please set LastEditors
 * @Description: 菜单编辑
 * @FilePath: /Amon_server/server/models/menu.js
 */
'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    let Menu = sequelize.define('Menu', {
        MenuID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        /**菜单名称 */
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**页面地址 */
        PageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**控件地址 */
        ControlUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**上一级菜单id */
        ParentId: {
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
        /**图标 */
        Icon: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**是否显示：0否 1是*/
        IsShow: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        },
        /**是否启用：0禁用 1正常*/
        IsEnabled: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        },
        createdTime: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedTime: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
    });

    return Menu;
};