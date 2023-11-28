'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    userId: DataTypes.UUID,
    cartId: DataTypes.UUID,
    items: DataTypes.ARRAY(DataTypes.JSON),
    payment: DataTypes.JSON,
    delivery: DataTypes.JSON,
    comments: DataTypes.STRING,
    status: DataTypes.ENUM('created', 'completed'),
    total: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};