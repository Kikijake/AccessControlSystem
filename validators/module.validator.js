const db = require("../models");
const Module = db.Module;

exports.createModule = {
  name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Name is required and must be a string",
    custom: {
      options: async (name) => {
        const existingModule = await Module.findOne({ where: { name } });
        if (existingModule) {
          throw new Error("Name already exists");
        }
        return true;
      },
    },
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Description is required and must be a string",
  },
};

exports.getModuleById = {
  moduleId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Module ID must be an integer",
    custom: {
      options: async (value) => {
        const module = await Module.findByPk(value);
        if (!module) {
          return Promise.reject("Module not found");
        }
      },
    },
  },
};

exports.updateModule = {
  moduleId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Module ID must be an integer",
    custom: {
      options: async (value) => {
        const module = await Module.findByPk(value);
        if (!module) {
          return Promise.reject("Module not found");
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

exports.deleteModule = {
  moduleId: {
    in: ["params"],
    isInt: true,
    errorMessage: "Module ID must be an integer",
    custom: {
      options: async (value) => {
        const module = await Module.findByPk(value);
        if (!module) {
          return Promise.reject("Module not found");
        }
      },
    },
  },
};
