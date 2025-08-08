'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GroupRoles", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      GroupId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Groups", key: "id" },
        onDelete: "CASCADE",
      },
      RoleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Roles", key: "id" },
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("GroupRoles");
  },
};
