const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    UserID: {
      type: DataTypes.DECIMAL(20, 0),
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
    UserName: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    RealName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PositionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Position',
        key: 'PositionID'
      }
    },
    BranchID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Branch',
        key: 'BranchID'
      }
    },
    PhoneNumber: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    QrCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    IsEnable: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    CreateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "登录令牌"
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "fk_User_Position_1",
        using: "BTREE",
        fields: [
          { name: "PositionID" },
        ]
      },
      {
        name: "fk_User_Branch_1",
        using: "BTREE",
        fields: [
          { name: "BranchID" },
        ]
      },
      {
        name: "fk_User_Project_1",
        using: "BTREE",
        fields: [
          { name: "ProjectID" },
        ]
      },
    ]
  });
};
