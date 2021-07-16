var DataTypes = require("sequelize").DataTypes;
var _MediaClassify = require("./MediaClassify");

function initModels(sequelize) {
  var MediaClassify = _MediaClassify(sequelize, DataTypes);

  MediaClassify.belongsTo(Media, { as: "Medium", foreignKey: "MediaID"});
  Media.hasMany(MediaClassify, { as: "MediaClassifies", foreignKey: "MediaID"});
  MediaClassify.belongsTo(Submit, { as: "Submit", foreignKey: "SubmitID"});
  Submit.hasMany(MediaClassify, { as: "MediaClassifies", foreignKey: "SubmitID"});

  return {
    MediaClassify,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
