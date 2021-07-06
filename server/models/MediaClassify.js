const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('MediaClassify', {
    MediaClassifyID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    MediaID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Media',
        key: 'MediaID'
      }
    },
    SubmitID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Submit',
        key: 'SubmitID'
      }
    },
    InitialType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10100100
    },
    Longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 119.28
    },
    Latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 26.08
    },
    Submitter: {
      type: DataTypes.DECIMAL(20, 0),
      allowNull: false
    },
    SubmitTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    CheckedType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10100100
    },
    Checker: {
      type: DataTypes.DECIMAL(20, 0),
      allowNull: true
    },
    CheckComment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CheckTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ExamineType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10100100
    },
    Examiner: {
      type: DataTypes.DECIMAL(20, 0),
      allowNull: true
    },
    ExamineComment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ExamineTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AuditedType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10100100
    },
    Auditor: {
      type: DataTypes.DECIMAL(20, 0),
      allowNull: true
    },
    AuditComment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    AutitTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ApprovedType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10100100
    },
    Approver: {
      type: DataTypes.DECIMAL(20, 0),
      allowNull: true
    },
    AppriveComment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ApproveTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CurrentStage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    FinnalType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10100100
    },
    Adopted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    IsImage: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    LastChangedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ClassifyMemo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MediaClassify',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MediaClassifyID" },
        ]
      },
      {
        name: "fk_MediaClassify_Submit_1",
        using: "BTREE",
        fields: [
          { name: "SubmitID" },
        ]
      },
      {
        name: "fk_MediaClassify_Media_1",
        using: "BTREE",
        fields: [
          { name: "MediaID" },
        ]
      },
    ]
  });
};
