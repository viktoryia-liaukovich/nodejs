'use strict';
const { v4: uuid } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = new Array(3).fill(null).map(() => ({
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const carts = new Array(3).fill(null).map(() => ({
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    carts.forEach((cart, i) => {
      users[i].cartId = cart.id;
      cart.userId = users[i].id;
    });

    await queryInterface.bulkInsert('Users', users, { returning: true });
    await queryInterface.bulkInsert('Carts', carts, { returning: true });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
