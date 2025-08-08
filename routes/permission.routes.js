const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permission.controller");
const validate = require("../validators");
const permissionValidator = require("../validators/permission.validator");
const { checkPermission } = require("../middleware/permission.middleware");

router
  .route("/")
  .get(
    checkPermission("Permissions", "read"),
    permissionController.getAllPermissions
  )
  .post(
    checkPermission("Permissions", "create"),
    validate(permissionValidator.createPermission),
    permissionController.createPermission
  );

router
  .route("/:permissionId")
  .get(
    checkPermission("Permissions", "read"),
    validate(permissionValidator.getPermissionById),
    permissionController.getPermissionById
  )
  .put(
    checkPermission("Permissions", "update"),
    validate(permissionValidator.updatePermission),
    permissionController.updatePermission
  )
  .delete(
    checkPermission("Permissions", "delete"),
    validate(permissionValidator.deletePermission),
    permissionController.deletePermission
  );

module.exports = router;
