const jwt = require("jsonwebtoken");
const db = require("../models");
const { responseError } = require("../utils/response");
const User = db.User;
require("dotenv").config();

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      if (!req.user) {
        return responseError(res, {}, "Not authorized, User not found", 401);
      }

      next();
    } catch (error) {
      console.error(error);
      return responseError(res, {}, "Not authorized, token failed", 401);
    }
  }

  if (!token) {
    return responseError(res, {}, "Not authorized, no token", 401);
  }
};
