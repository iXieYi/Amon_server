const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RockClass', {
    RockCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10100100,
      primaryKey: true
    },
    RockName: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    FirstClassName: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    SecondClassName: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    ThirdClassName: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    FourthClassName: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    EnglishName: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'RockClass',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RockCode" },
        ]
      },
    ]
  });
};
