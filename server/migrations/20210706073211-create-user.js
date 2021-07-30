'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING(128)
      },
      email: {
        type: Sequelize.STRING(128)
      },
      password: {
        type: Sequelize.STRING
      },
      listAs: {
        type: Sequelize.STRING(4)
      },
      gender: {
        type: Sequelize.STRING(16)
      },
      phone: {
        type: Sequelize.STRING(32)
      },
      address: {
        type: Sequelize.TEXT
      },
      subscribe: {
        type: Sequelize.STRING(16)
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};