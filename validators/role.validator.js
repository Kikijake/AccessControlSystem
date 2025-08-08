const db = require("../models");
const Role = db.Role;
const Permission = db.Permission;

exports.createRole = {
  name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Name is required and must be a string",
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Description is required and must be a string",
  },
};

exports.getRoleById = {
  roleId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Role ID must be an integer",
    custom: {
      options: async (value) => {
        const role = await Role.findByPk(value);
        if (!role) {
          return Promise.reject("Role not found");
        }
      },
    },
  },
};

exports.updateRole = {
  roleId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Role ID must be an integer",
    custom: {
      options: async (value) => {
        const role = await Role.findByPk(value);
        if (!role) {
          return Promise.reject("Role not found");
        }
      },
    },
  },
  name: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Name must be a string",
  },
  description: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Description must be a string",
  },
};

exports.deleteRole = {
  roleId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Role ID must be an integer",
    custom: {
      options: async (value) => {
        const role = await Role.findByPk(value);
        if (!role) {
          return Promise.reject("Role not found");
        }
      },
    },
  },
};

exports.assignPermissionToRole = {
  roleId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Role ID must be an integer",
    custom: {
      options: async (value) => {
        const role = await db.Role.findByPk(value);
        if (!role) {
          return Promise.reject("Role not found");
        }
      },
    },
  },
  permissionId: {
    in: ["body"],
    isInt: true,
    errorMessage: "Permission ID must be an integer",
    custom: {
      options: async (value) => {
        const permission = await Permission.findByPk(value);
        if (!permission) {
          return Promise.reject("Permission not found");
        }
      },
    },
  },
};
