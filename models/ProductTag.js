const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    productId: {
      TYPE: DataTypes.INTEGER,
      references: {
        keu: 'id',
        model: 'product'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        keu: 'id',
        model: 'product'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);


module.exports = ProductTag;
