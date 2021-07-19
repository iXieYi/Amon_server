/*
 * @Author: 凡琛
 * @Date: 2021-06-30 09:52:56
 * @LastEditTime: 2021-07-19 14:58:40
 * @LastEditors: Please set LastEditors
 * @Description: 样本图像发布接口
 * @FilePath: /Amon_server/server/base/publish.js
 */
const models = require('../models/index');
const logger = require('../common/logger');
Op = models.Sequelize.Op;

class publishManager {
  // 样本采集发布页面
  async publishSampleImage(req, res, next) {
    // console.log('req.body', req.body);
    const {
      ProjectID = '',
      ProjectRockID = '',
      Location = '',
      Longitude = '',
      Latitude = '',
      LongitudeMarker = '',
      LatitudeMarker = '',
      Submitter = '',
      GeoDescribe = '',
      Memo = '',
      Integrity = 2,
      Color = '',
      Occurrence = '',
      Weathering = 3
    } = req.body;
    // 创建提交记录
    await models.Submit.create({
      ProjectID,
      ProjectRockID,
      Location,
      Longitude,
      Latitude,
      LongitudeMarker,
      LatitudeMarker,
      Submitter,
      GeoDescribe,
      Memo,
      Integrity,
      Color,
      Occurrence,
      Weathering
    }).then(function (result) {
      addMediaData(req, res, result.SubmitID);
      return response(res, { success: true, msg: "提交成功" });
    }).catch(function (error) {
      response(res, { success: false, msg: "提交失败", err: error });
    });

  }
}

// 添加校审记录
const createMediaClassify = async (req, res, FileURI, SubmitID) => {
  const {
    InitialType = '',
    LongitudeMarker = '',
    LatitudeMarker = '',
    Submitter = '',
  } = req.body;
  // 创建校核记录
  models.MediaClassify.create({
    FileURI,
    SubmitID,
    Submitter,
    InitialType,
    Longitude: LongitudeMarker,
    Latitude: LatitudeMarker,
    CurrentStage: 1,
    FinnalType: 1,
    Adopted: true,
    IsImage: true,
  }).then(function (result) {
  }).catch(function (error) {
    logger.error('校核记录创建失败', error);
  });
};
// 添加媒体记录
const addMediaData = async (req, res, SubmitID) => {
  const {
    videoUrl = '',
    imageUrls = [],
  } = req.body;

  // 创建video媒体记录
  if (videoUrl != '') {
    createMediaClassify(req, res, videoUrl, SubmitID);
  }
  // 创建image媒体记录
  if (imageUrls && imageUrls.length > 0) {
    for (let index = 0; index < imageUrls.length; index++) {
      const imageUrl = imageUrls[index];
      createMediaClassify(req, res, imageUrl, SubmitID);
    }
  }
};
module.exports = new publishManager();

