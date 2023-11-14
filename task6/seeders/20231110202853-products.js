'use strict';
const { faker } = require("@faker-js/faker");
const { v4: uuid } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', new Array(3).fill(null).map(() => ({
      id: uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 1, max: 100 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    })));
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
