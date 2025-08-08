const db = require("../models");
const { responseSuccess } = require("../utils/response");
const Module = db.Module;
const Permission = db.Permission;

/**
 * @desc    Get all modules
 * @route   GET /api/modules
 */
exports.getAllModules = async (req, res) => {
  const modules = await Module.findAll({
    include: { model: Permission},
    order: [["createdAt", "DESC"]],
  });
  return responseSuccess(res, modules, "Modules retrieved successfully");
};

/**
 * @desc    Get a module by ID
 * @route   GET /api/modules/:moduleId
 */
exports.getModuleById = async (req, res) => {
  const { moduleId } = req.validated;
  const module = await Module.findByPk(moduleId);
  return responseSuccess(res, module, "Module retrieved successfully");
};

/**
 * @desc    Create a new module
 * @route   POST /api/modules
 */
exports.createModule = async (req, res) => {
  const { name, description } = req.body;
  const module = await Module.create({ name, description });
  return responseSuccess(res, module, "Module created successfully");
};

/**
 * @desc    Update a module
 * @route   PUT /api/modules/:moduleId
 */
exports.updateModule = async (req, res) => {
  const updateData = req.validated;
  const module = await Module.findByPk(updateData.moduleId);
  await module.update(updateData);
  return responseSuccess(res, module, "Module updated successfully");
};

/**
 * @desc    Delete a module
 * @route   DELETE /api/modules/:moduleId
 */
exports.deleteModule = async (req, res) => {
  const { moduleId } = req.validated;
  const module = await Module.findByPk(moduleId);
  await module.destroy();
  return responseSuccess(res, null, "Module deleted successfully");
};
