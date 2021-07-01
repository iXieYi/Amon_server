/*
 * @Author: 凡琛
 * @Date: 2021-06-15 17:46:51
 * @LastEditTime: 2021-06-30 14:32:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Amon_server/server/models/user.js
 */
'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
        },
        /**登录用户名 */
        login_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**登录密码 */
        login_password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**用户真实名称 */
        real_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**职位id列表（1,2,3） */
        position_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        /**职位名称列表（开发,总经理） */
        position_name: {
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
        /**手机号码 */
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**是否启用：0禁止访问 1正常*/
        is_enabled: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
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
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
    });

    return User;
};