const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Project', {
    ProjectID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ProjectName: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    ProjectType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    Stage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Investigator: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    StartDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ProjectDescribe: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Memo3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CreateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'Project',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ProjectID" },
        ]
      },
    ]
  });
};
