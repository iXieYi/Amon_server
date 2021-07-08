/*
 * @Author: 凡琛
 * @Date: 2021-06-30 09:52:56
 * @LastEditTime: 2021-07-08 14:17:52
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
      Submitter = '',
      GeoDescribe = '',
      Memo = ''
    } = req.body;
    // 创建提交记录
    await models.Submit.create({
      ProjectID,
      ProjectRockID,
      Location,
      Longitude,
      Latitude,
      Submitter,
      GeoDescribe,
      Memo,
    }).then(function (result) {
      addMediaData(req, res, result.SubmitID);
      return response(res, { success: true, msg: "提交成功" });
    }).catch(function (error) {
      response(res, { success: false, msg: "提交失败", err: error });
    });

  }
}

// 添加校审记录
const createMediaClassify = async (req, res, MediaID, SubmitID) => {
  const {
    InitialType = '',
    Longitude = '',
    Latitude = '',
    Submitter = '',
    GeoDescribe = '',
  } = req.body;
  // 创建校核记录
  await models.MediaClassify.create({
    MediaID,
    SubmitID,
    Submitter,
    InitialType,
    Longitude,
    Latitude,
    GeoDescribe,
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
  var MediaID;
  const {
    ProjectID = '',
    InitialType = '',
    Submitter = '',
    videoUrl = '',
    imageUrls = [],
    GeoDescribe = '',
    Memo = ''
  } = req.body;

  // 创建video媒体记录
  if (videoUrl != '') {
    await models.Media.create({
      ProjectID,
      RockCode: InitialType,
      MediaType: 1,
      GeoDescribe,
      Providor: Submitter,
      Memo2: Memo,
      FileURI: videoUrl
    }).then(function (result) {
      MediaID = result.MediaID;
      createMediaClassify(req, res, MediaID, SubmitID);
    }).catch(function (error) {
      logger.error('创建video资源失败', error);
    });
  }
  // 创建image媒体记录
  if (imageUrls && imageUrls.length > 0) {
    for (let index = 0; index < imageUrls.length; index++) {
      const imageUrl = imageUrls[index];
      await models.Media.create({
        ProjectID,
        RockCode: InitialType,
        MediaType: 1,
        GeoDescribe,
        Providor: Submitter,
        Memo2: Memo,
        FileURI: imageUrl
      }).then(function (result) {
        MediaID = result.MediaID;
        createMediaClassify(req, res, MediaID, SubmitID);
      }).catch(function (error) {
        logger.error('创建image资源失败', error);
      });
    }
  }
};
module.exports = new publishManager();

