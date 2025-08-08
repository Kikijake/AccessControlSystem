const db = require("../models");
const { responseSuccess } = require("../utils/response");
const Role = db.Role;
const Permission = db.Permission;
const Module = db.Module;

/**
 * @desc    Get all roles
 * @route   GET /api/roles
 */
exports.getAllRoles = async (req, res) => {
  const roles = await Role.findAll(
    {
      include: {
        model: Permission,
        through: { attributes: [] },
        include: { model: Module },
      },
    },
    {
      order: [["createdAt", "DESC"]],
    }
  );
  return responseSuccess(res, roles, "Roles retrieved successfully");
};

/**
 * @desc    Get a role by ID
 * @route   GET /api/roles/:roleId
 */
exports.getRoleById = async (req, res) => {
  const { roleId } = req.validated;
  const role = await Role.findByPk(roleId);
  return responseSuccess(res, role, "Role retrieved successfully");
};

/**
 * @desc    Create a new role
 * @route   POST /api/roles
 */
exports.createRole = async (req, res) => {
  const { name, description } = req.body;
  const role = await Role.create({ name, description });
  return responseSuccess(res, role, "Role created successfully");
};

/**
 * @desc    Update a role
 * @route   PUT /api/roles/:roleId
 */
exports.updateRole = async (req, res) => {
  const updateData = req.validated;
  const role = await Role.findByPk(updateData.roleId);
  await role.update(updateData);
  return responseSuccess(res, role, "Role updated successfully");
};

/**
 * @desc    Delete a role
 * @route   DELETE /api/roles/:roleId
 */
exports.deleteRole = async (req, res) => {
  const { roleId } = req.validated;
  const role = await Role.findByPk(roleId);
  await role.destroy();
  return responseSuccess(res, null, "Role deleted successfully");
};

/**
 * @desc    Assign a permission to a role
 * @route   POST /api/roles/:roleId/permissions
 */
exports.assignPermissionToRole = async (req, res) => {
  const { permissionId, roleId } = req.validated;
  const role = await Role.findByPk(roleId, {
    include: {
      model: Permission,
      include: { model: Module },
      through: { attributes: [] },
    },
  });
  const permission = await Permission.findByPk(permissionId);

  await role.addPermission(permission);
  return responseSuccess(res, role, "Permission assigned to role successfully");
};
