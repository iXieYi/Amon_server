/*
 * @Author: 凡琛
 * @Date: 2021-07-05 17:44:07
 * @LastEditTime: 2021-07-05 18:01:34
 * @LastEditors: Please set LastEditors
 * @Description: 样本提交
 * @FilePath: /Amon_server/server/models/submit.js
 */
'use strict';

const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
    let Submit = sequelize.define('Submit', {
        /** 提交ID */
        SubmitID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        /** 项目ID */
        ProjectID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        /** 项目岩石类别ID */
        ProjectRockID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        /** 岩石颜色 */
        Color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Occurrence: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Weathering: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Integrity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Longitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        Latitude: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        GeoDescfibe: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Sumitter: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Memo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        SubmitTime: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('SubmitTime')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
    });
    return Submit;
}