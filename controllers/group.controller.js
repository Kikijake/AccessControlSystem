const db = require("../models");
const { responseSuccess } = require("../utils/response");
const Group = db.Group;
const User = db.User;
const Role = db.Role;

/**
 * @desc    Get all groups
 * @route   GET /api/groups
 */
exports.getAllGroups = async (req, res) => {
  const groups = await Group.findAll({
    include: [
      { model: User, through: { attributes: [] } },
      { model: Role, through: { attributes: [] } },
    ],
  });
  return responseSuccess(res, groups, "Groups retrieved successfully");
};

/**
 * @desc    Get a group by ID
 * @route   GET /api/groups/:groupId
 */
exports.getGroupById = async (req, res) => {
  const { groupId } = req.validated;
  const group = await Group.findByPk(groupId, {
    include: [
      { model: User, through: { attributes: [] } },
      { model: Role, through: { attributes: [] } },
    ],
  });
  return responseSuccess(res, group, "Group retrieved successfully");
};

/**
 * @desc    Create a new group
 * @route   POST /api/groups
 */
exports.createGroup = async (req, res) => {
  const { name, description } = req.body;
  const group = await Group.create({ name, description });
  return responseSuccess(res, group, "Group created successfully");
};

/**
 * @desc    Update a group
 * @route   PUT /api/groups/:groupId
 */
exports.updateGroup = async (req, res) => {
  const updateData = req.validated;
  const group = await Group.findByPk(updateData.groupId);
  group.update(updateData);
  return responseSuccess(res, group, "Group updated successfully");
};

/**
 * @desc    Delete a group
 * @route   DELETE /api/groups/:groupId
 */
exports.deleteGroup = async (req, res) => {
  const { groupId } = req.validated;
  const group = await Group.findByPk(groupId);
  await group.destroy();
  return responseSuccess(res, null, "Group deleted successfully");
};

/**
 * @desc    Assign a user to a group
 * @route   POST /api/groups/:groupId/users
 */
exports.assignUserToGroup = async (req, res) => {
  const { userId, groupId } = req.validated;
  const group = await Group.findByPk(groupId, {
    include: { model: User, through: { attributes: [] } },
  });
  const user = await User.findByPk(userId);

  await group.addUser(user);
  return responseSuccess(
    res,
    group,
    `User ${user.username} assigned to group ${group.name}`
  );
};

/**
 * @desc    Assign a role to a group
 * @route   POST /api/groups/:groupId/roles
 */
exports.assignRoleToGroup = async (req, res) => {
  const { roleId, groupId } = req.validated;
  const group = await Group.findByPk(groupId, {
    include: { model: Role, through: { attributes: [] } },
  });
  const role = await Role.findByPk(roleId);

  await group.addRole(role);
  return responseSuccess(
    res,
    group,
    `Role ${role.name} assigned to group ${group.name}`
  );
};
