'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RolePermissions", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      RoleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Roles", key: "id" },
        onDelete: "CASCADE",
      },
      PermissionId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Permissions", key: "id" },
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RolePermissions");
  },
};
