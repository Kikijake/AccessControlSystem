'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("UserGroups", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
      },
      GroupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Groups", key: "id" },
        onDelete: "CASCADE",
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("UserGroups");
  }
};
