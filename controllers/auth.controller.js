// controllers/auth.controller.js
const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { responseError, responseSuccess } = require("../utils/response");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.validated;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return responseError(res, null, "User already exists");
    }

    const user = await User.create({ username, password });

    return responseSuccess(res, { id: user.id, username: user.username }, "User registered successfully");
  } catch (error) {
    return responseError(res, null, "Server error", 500);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.validated;

    const user = await User.unscoped().findOne({ where: { username } });
    if (!user) {
      return responseError(res, null, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responseError(res, null, "Invalid credentials");
    }

    const payload = {
      id: user.id,
      username: user.username,
    };
  
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        return responseSuccess(res, { token }, "Login successful");
      }
    );
  } catch (error) {
    return responseError(res, error, "Server error", 500);
  }
};
