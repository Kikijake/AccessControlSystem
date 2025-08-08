const db = require("../models");
const Permission = db.Permission;
const Module = db.Module;

exports.createPermission = {
  action: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    // You can enforce specific action names for consistency
    isIn: {
      options: [["create", "read", "update", "delete"]],
      errorMessage: "Action must be one of: create, read, update, delete",
    },
    errorMessage: "Action is required",
  },
  ModuleId: {
    in: ["body"],
    isInt: true,
    notEmpty: true,
    errorMessage: "ModuleId is required and must be an integer",
    custom: {
      options: async (value) => {
        const module = await Module.findByPk(value);
        if (!module) {
          return Promise.reject("Module not found for the given ModuleId");
        }
      },
    },
  },
};

exports.getPermissionById = {
  permissionId: {
    in: ["params"],
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

exports.updatePermission = {
  permissionId: {
    in: ["params"],
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
  action: {
    in: ["body"],
    isString: true,
    optional: true,
    isIn: {
      options: [["create", "read", "update", "delete"]],
      errorMessage: "Action must be one of: create, read, update, delete",
    },
  },
};

exports.deletePermission = {
  permissionId: {
    in: ["params"],
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

exports.simulateAction = {
  module: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Module is required",
  },
  action: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Action is required",
  },
};