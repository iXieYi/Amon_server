const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Submit', {
    SubmitID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Submitter: {
      type: DataTypes.DECIMAL(20, 0),
      allowNull: true,
      references: {
        model: 'User',
        key: 'UserID'
      }
    },
    SubmitTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ProjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Project',
        key: 'ProjectID'
      }
    },
    ProjectRockID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'RocksOfProject',
        key: 'ProjectRockID'
      }
    },
    Location: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 119.28
    },
    Latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 26.08
    },
    LongitudeMarker: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "地图选点经度"
    },
    LatitudeMarker: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "地图选段纬度"
    },
    GeoDescribe: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Memo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Integrity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    Color: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Occurrence: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Weathering: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Submit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SubmitID" },
        ]
      },
      {
        name: "fk_Submit_Project_1",
        using: "BTREE",
        fields: [
          { name: "ProjectID" },
        ]
      },
      {
        name: "fk_Submit_RocksOfProject_1",
        using: "BTREE",
        fields: [
          { name: "ProjectRockID" },
        ]
      },
      {
        name: "fk_Submit_User_1",
        using: "BTREE",
        fields: [
          { name: "Submitter" },
        ]
      },
    ]
  });
};
