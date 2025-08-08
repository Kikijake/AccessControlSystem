
const db = require("../models");
const Group = db.Group;
const User = db.User;
const Role = db.Role;
const Permission = db.Permission;
const Module = db.Module;

exports.getUserPermissions = async (userId) => {
  const user = await User.findByPk(userId, {
    include: {
      model: Group,
      include: {
        model: Role,
        include: {
          model: Permission,
          include: { model: Module },
        },
      },
    },
  });

  const permissionsSet = new Set();
  if (user && user.Groups) {
    user.Groups.forEach((group) => {
      group.Roles.forEach((role) => {
        role.Permissions.forEach((permission) => {
          permissionsSet.add(`${permission.Module.name}:${permission.action}`);
        });
      });
    });
  }
  return permissionsSet;
}
