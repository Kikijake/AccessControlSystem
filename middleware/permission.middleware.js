const { responseError } = require("../utils/response");
const db = require("../models");
const { getUserPermissions } = require("../utils");


exports.checkPermission = (module, action) => {
  return async (req, res, next) => {
    const userPermissions = await getUserPermissions(req.user.id);

    const requiredPermission = `${module}:${action}`;

    if (userPermissions.has(requiredPermission)) {
      next();
    } else {
      return responseError(res, null, "Forbidden: You do not have the required permission.", 403);
    }
  };
};
