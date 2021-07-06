var DataTypes = require("sequelize").DataTypes;
var _Submit = require("./Submit");

function initModels(sequelize) {
  var Submit = _Submit(sequelize, DataTypes);

  Submit.belongsTo(Project, { as: "Project", foreignKey: "ProjectID"});
  Project.hasMany(Submit, { as: "Submits", foreignKey: "ProjectID"});
  Submit.belongsTo(RocksOfProject, { as: "ProjectRock", foreignKey: "ProjectRockID"});
  RocksOfProject.hasMany(Submit, { as: "Submits", foreignKey: "ProjectRockID"});
  Submit.belongsTo(User, { as: "Submitter_User", foreignKey: "Submitter"});
  User.hasMany(Submit, { as: "Submits", foreignKey: "Submitter"});

  return {
    Submit,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
