const db = require("../models");
const { responseSuccess, responseError } = require("../utils/response");
const Permission = db.Permission;
const User = db.User;
const Group = db.Group;
const Role = db.Role;
const Module = db.Module;
const { getUserPermissions } = require("../utils");

/**
 * @desc    Get all permissions
 * @route   GET /api/permissions
 */
exports.getAllPermissions = async (req, res) => {
  const permissions = await Permission.findAll({
    include: [
      {
        model: Module,
        attributes: ["id", "name"],
      },
      { model: Role, through: { attributes: [] } },
    ],
    order: [["createdAt", "DESC"]],
  });
  return responseSuccess(
    res,
    permissions,
    "Permissions retrieved successfully"
  );
};

/**
 * @desc    Get a permission by ID
 * @route   GET /api/permissions/:permissionId
 */
exports.getPermissionById = async (req, res) => {
  const { permissionId } = req.validated;
  const permission = await Permission.findByPk(permissionId, {
    include: [
      {
        model: Module,
        attributes: ["id", "name"],
      },
      { model: Role, through: { attributes: [] } },
    ],
  });
  return responseSuccess(res, permission, "Permission retrieved successfully");
};

/**
 * @desc    Create a new permission
 * @route   POST /api/permissions
 */
exports.createPermission = async (req, res) => {
  const { action, ModuleId } = req.validated;
  const newPermission = await Permission.create({ action, ModuleId });
  const permissionWithModule = await Permission.findByPk(newPermission.id, {
    attributes: {
      exclude: ["ModuleId"],
    },
    include: [
      {
        model: Module,
        attributes: ["id", "name"],
      },
    ],
  });
  return responseSuccess(
    res,
    permissionWithModule,
    "Permission created successfully"
  );
};

/**
 * @desc    Update a permission
 * @route   PUT /api/permissions/:permissionId
 */
exports.updatePermission = async (req, res) => {
  const updateData = req.validated;
  const permission = await Permission.findByPk(updateData.permissionId);
  await permission.update(updateData);
  return responseSuccess(res, permission, "Permission updated successfully");
};

/**
 * @desc    Delete a permission
 * @route   DELETE /api/permissions/:permissionId
 */
exports.deletePermission = async (req, res) => {
  const { permissionId } = req.validated;
  const permission = await Permission.findByPk(permissionId);
  await permission.destroy();
  return responseSuccess(res, null, "Permission deleted successfully");
};

/**
 * @desc    Get all permissions for the currently authenticated user
 * @route   GET /api/me/permissions
 */
exports.getMyPermissions = async (req, res) => {
  try {
    const permissionsArray = Array.from(await getUserPermissions(req.user.id));

    return responseSuccess(
      res,
      permissionsArray,
      "Permissions retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return responseError(res, "Failed to retrieve permissions", 500);
  }
};

/**
 * @desc    Test if the current user can perform an action
 * @route   POST /api/simulate-action
 */
exports.simulateAction = async (req, res) => {
  const { module, action } = req.validated;

  const userPermissions = await getUserPermissions(req.user.id);
  const requiredPermission = `${module}:${action}`;

  if (userPermissions.has(requiredPermission)) {
    return responseSuccess(
      res,
      { canPerform: true },
      "Simulation successful: User has permission."
    );
  } else {
    return responseError(
      res,
      null,
      "Simulation failed: User does not have permission.",
      403
    );
  }
};
