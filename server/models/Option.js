const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Option', {
    OptionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "操作ID"
    },
    OptionName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "操作名"
    },
    CreateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    UpdateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间"
    }
  }, {
    sequelize,
    tableName: 'Option',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "OptionID" },
        ]
      },
    ]
  });
};
