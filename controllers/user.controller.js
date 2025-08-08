const db = require("../models");
const { responseSuccess } = require("../utils/response");
const bcrypt = require("bcryptjs");
const User = db.User;
const Group = db.Group;

/**
 * @desc    Get all users
 * @route   GET /api/users
 */
exports.getAllUsers = async (req, res) => {
  const { search } = req.query;
  let whereClause = {};

  if (search) {
    whereClause.username = { [db.Sequelize.Op.like]: `%${search}%` };
  }
  const users = await User.findAll({
    where: whereClause,
    include: {
      model: Group,
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });
  return responseSuccess(res, users, "Users retrieved successfully");
};

/**
 * @desc    Get a user by ID
 * @route   GET /api/users/:userId
 */
exports.getUserById = async (req, res) => {
  const { userId } = req.validated;
  const user = await User.findByPk(userId, {
    include: {
      model: Group,
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });
  return responseSuccess(res, user, "User retrieved successfully");
};


/**
 * @desc    Update a user
 * @route   PUT /api/users/:userId
 */
exports.updateUser = async (req, res) => {
  const updateData = req.validated;
  const user = await User.findByPk(updateData.userId);
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(updateData.password, salt);
  }

  await user.update(updateData);
  return responseSuccess(res, user, "User updated successfully");
};

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:userId
 */
exports.deleteUser = async (req, res) => {
  const { userId } = req.validated;
  const user = await User.findByPk(userId);
  await user.destroy();
  return responseSuccess(res, null, "User deleted successfully");
};
