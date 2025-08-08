const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");
const validate = require("../validators");
const roleValidator = require("../validators/role.validator");
const { checkPermission } = require("../middleware/permission.middleware");

router
  .route("/")
  .get(checkPermission("Roles", "read"), roleController.getAllRoles)
  .post(
    checkPermission("Roles", "create"),
    validate(roleValidator.createRole),
    roleController.createRole
  );

router
  .route("/:roleId")
  .get(
    checkPermission("Roles", "read"),
    validate(roleValidator.getRoleById),
    roleController.getRoleById
  )
  .put(
    checkPermission("Roles", "update"),
    validate(roleValidator.updateRole),
    roleController.updateRole
  )
  .delete(
    checkPermission("Roles", "delete"),
    validate(roleValidator.deleteRole),
    roleController.deleteRole
  );

router.post(
  "/:roleId/permissions",
  checkPermission("Roles", "update"),
  validate(roleValidator.assignPermissionToRole),
  roleController.assignPermissionToRole
);

module.exports = router;
