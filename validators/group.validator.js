const db = require("../models");
const User = db.User;
const Group = db.Group;

exports.createGroup = {
  name: {
    in: ["body"],
    isString: true,
    errorMessage: "Name is required",
  },
  description: {
    in: ["body"],
    isString: true,
    errorMessage: "Description is required",
  },
};

exports.getGroupById = {
  groupId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Group ID must be an integer",
    custom: {
      options: async (value) => {
        const group = await Group.findByPk(value);
        if (!group) {
          return Promise.reject("Group not found");
        }
        return Promise.resolve();
      },
    },
  },
};

exports.updateGroup = {
  groupId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Group ID must be an integer",
    custom: {
      options: async (value) => {
        const group = await Group.findByPk(value);
        if (!group) {
          return Promise.reject("Group not found");
        }
        return Promise.resolve();
      },
    },
  },
  name: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Name need to be a string",
  },
  description: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Description need to be a string",
  },
};

exports.deleteGroup = {
  groupId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Group ID must be an integer",
    custom: {
      options: async (value) => {
        const group = await Group.findByPk(value);
        if (!group) {
          return Promise.reject("Group not found");
        }
        return Promise.resolve();
      },
    },
  },
};

exports.assignUserToGroup = {
  userId: {
    in: ["body"],
    isInt: true,
    errorMessage: "User ID must be an integer",
    custom: {
      options: async (value) => {
        const user = await User.findByPk(value);
        if (!user) {
          return Promise.reject("User not found");
        }
        return Promise.resolve();
      },
    },
  },
  groupId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Group ID must be an integer",
    custom: {
      options: async (value) => {
        const group = await Group.findByPk(value);
        if (!group) {
          return Promise.reject("Group not found");
        }
        return Promise.resolve();
      },
    },
  },
};

exports.assignRoleToGroup = {
  roleId: {
    in: ["body"],
    isInt: true,
    errorMessage: "Role ID must be an integer",
    custom: {
      options: async (value) => {
        const role = await db.Role.findByPk(value);
        if (!role) {
          return Promise.reject("Role not found");
        }
        return Promise.resolve();
      },
    },
  },
  groupId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Group ID must be an integer",
    custom: {
      options: async (value) => {
        const group = await Group.findByPk(value);
        if (!group) {
          return Promise.reject("Group not found");
        }
        return Promise.resolve();
      },
    },
  },
};
