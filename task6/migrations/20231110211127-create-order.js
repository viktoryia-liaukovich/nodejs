'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      cartId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      items: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: []
      },
      payment: {
        type: Sequelize.JSON,
        defaultValue: {
          type: 'paypal',
          address: 'London',
          creditCard: '1234-1234-1234-1234'
        }
      },
      delivery: {
        type: Sequelize.JSON,
        defaultValue: {
          type: 'post',
          address: 'London'
        }
      },
      comments: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('created', 'completed')
      },
      total: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};