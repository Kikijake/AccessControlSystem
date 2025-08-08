const db = require("../models");
const User = db.User;

exports.getUserById = {
  userId: {
    in: ["params"],
    isInt: true,
    errorMessage: "User ID must be an integer",
    custom: {
      options: async (value) => {
        const user = await User.findByPk(value);
        if (!user) {
          return Promise.reject("User not found");
        }
      },
    },
  },
};

exports.updateUser = {
  userId: {
    in: ["params"],
    isInt: true,
    errorMessage: "User ID must be an integer",
    custom: {
      options: async (value) => {
        const user = await User.findByPk(value);
        if (!user) {
          return Promise.reject("User not found");
        }
      },
    },
  },
  username: {
    in: ["body"],
    isString: true,
    optional: true,
    errorMessage: "Username must be a string",
    custom: {
      options: async (value, { req }) => {
        const user = await User.findOne({ where: { username: value } });
        // The username is only invalid if it's taken by a *different* user
        if (user && user.id !== parseInt(req.params.userId)) {
          return Promise.reject("Username already in use");
        }
      },
    },
  },
  password: {
    in: ["body"],
    isString: true,
    optional: true,
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
};

exports.deleteUser = {
  userId: {
    in: ["params"],
    isInt: true,
    errorMessage: "User ID must be an integer",
    custom: {
      options: async (value) => {
        const user = await User.findByPk(value);
        if (!user) {
          return Promise.reject("User not found");
        }
      },
    },
  },
};
