const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Media', {
    MediaID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ProjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Project',
        key: 'ProjectID'
      }
    },
    MineralID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MineralClass',
        key: 'MineralID'
      }
    },
    RockCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10100100,
      references: {
        model: 'RockClass',
        key: 'RockCode'
      }
    },
    MediaType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    FileURI: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "含相对路径的文件名"
    },
    InputTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Providor: {
      type: DataTypes.DECIMAL(20,0),
      allowNull: true
    },
    Memo2: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Media',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MediaID" },
        ]
      },
      {
        name: "fk_Media_RockClass_1",
        using: "BTREE",
        fields: [
          { name: "RockCode" },
        ]
      },
      {
        name: "fk_Media_MineralClass_1",
        using: "BTREE",
        fields: [
          { name: "MineralID" },
        ]
      },
      {
        name: "fk_Media_Project_1",
        using: "BTREE",
        fields: [
          { name: "ProjectID" },
        ]
      },
    ]
  });
};
