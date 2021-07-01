/*
 * @Author: 凡琛
 * @Date: 2021-06-15 17:46:51
 * @LastEditTime: 2021-07-01 16:32:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Amon_server/server/models/user.js
 */
'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        UserID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
        },
        /**登录用户名 */
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**登录密码 */
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**用户真实名称 */
        RealName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**职位id列表（1,2,3） */
        PositionID: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        /**部门id（单个） */
        BranchID: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        /**手机号码 */
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**是否启用：0禁止访问 1正常*/
        IsEnable: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        },
        CreateTime: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('CreateTime')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        UpdateTime: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('UpdateTime')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        Token: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return User;
};