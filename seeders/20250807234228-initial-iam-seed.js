'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { Op } = Sequelize; // Make sure to have access to operators

    try {
      // 1. Create Modules
      const moduleData = [
        {
          name: "Users",
          description: "Manage system users",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Groups",
          description: "Manage user groups",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Roles",
          description: "Manage access roles",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Permissions",
          description: "Manage role permissions",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Modules",
          description: "Manage system modules",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      await queryInterface.bulkInsert("Modules", moduleData); // 👈 Removed returning option
      // 👇 Fetch the records we just created
      const modules = await queryInterface.sequelize.query(
        'SELECT * FROM "Modules" WHERE name IN (:names)',
        {
          replacements: { names: moduleData.map((m) => m.name) },
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );

      // 2. Create Permissions for each Module
      const actions = ["create", "read", "update", "delete"];
      let permissionsToCreate = [];
      modules.forEach((module) => {
        actions.forEach((action) => {
          permissionsToCreate.push({
            action: action,
            ModuleId: module.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });
      await queryInterface.bulkInsert("Permissions", permissionsToCreate); // 👈 Removed returning option
      // 👇 Fetch the permissions
      const permissions = await queryInterface.sequelize.query(
        'SELECT * FROM "Permissions"',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      // 3. Create Roles
      const roleData = [
        {
          name: "Super Admin",
          description: "Has all permissions",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User Manager",
          description: "Can manage users only",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      await queryInterface.bulkInsert("Roles", roleData); // 👈 Removed returning option
      // 👇 Fetch roles
      const roles = await queryInterface.sequelize.query(
        'SELECT * FROM "Roles"',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );
      const superAdminRole = roles.find((r) => r.name === "Super Admin");
      const userManagerRole = roles.find((r) => r.name === "User Manager");

      // 4. Create Groups
      const groupData = [
        {
          name: "Administrators",
          description: "System administrators group",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Human Resources",
          description: "HR department group",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      await queryInterface.bulkInsert("Groups", groupData); // 👈 Removed returning option
      // 👇 Fetch groups
      const groups = await queryInterface.sequelize.query(
        'SELECT * FROM "Groups"',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );
      const adminGroup = groups.find((g) => g.name === "Administrators");
      const hrGroup = groups.find((g) => g.name === "Human Resources");

      // 5. Create Users
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("password123", salt);
      const userData = [
        {
          username: "admin",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "hr_manager",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      await queryInterface.bulkInsert("Users", userData);
      // 👇 Fetch users
      const users = await queryInterface.sequelize.query(
        'SELECT * FROM "Users"',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );
      const adminUser = users.find((u) => u.username === "admin");
      const hrUser = users.find((u) => u.username === "hr_manager");

      // -- 6. ESTABLISH RELATIONSHIPS -- (This part remains the same)
      const superAdminPermissions = permissions.map((p) => ({
        RoleId: superAdminRole.id,
        PermissionId: p.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await queryInterface.bulkInsert("RolePermissions", superAdminPermissions);

      const userModule = modules.find((m) => m.name === "Users");
      const userManagerPermissions = permissions
        .filter((p) => p.ModuleId === userModule.id)
        .map((p) => ({
          RoleId: userManagerRole.id,
          PermissionId: p.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      await queryInterface.bulkInsert(
        "RolePermissions",
        userManagerPermissions
      );

      await queryInterface.bulkInsert("GroupRoles", [
        {
          GroupId: adminGroup.id,
          RoleId: superAdminRole.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GroupId: hrGroup.id,
          RoleId: userManagerRole.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      await queryInterface.bulkInsert("UserGroups", [
        {
          GroupId: adminGroup.id,
          UserId: adminUser.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          GroupId: hrGroup.id,
          UserId: hrUser.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error in seeder:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    // Revert changes in reverse order
    await queryInterface.bulkDelete("UserGroups", null, {});
    await queryInterface.bulkDelete("GroupRoles", null, {});
    await queryInterface.bulkDelete("RolePermissions", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Groups", null, {});
    await queryInterface.bulkDelete("Roles", null, {});
    await queryInterface.bulkDelete("Permissions", null, {});
    await queryInterface.bulkDelete("Modules", null, {});
  },
};
