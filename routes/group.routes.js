const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.controller");
const validate = require("../validators");
const groupValidator = require("../validators/group.validator");
const { checkPermission } = require("../middleware/permission.middleware");

router
  .route("/")
  .get(checkPermission("Groups", "read"), groupController.getAllGroups)
  .post(
    validate(groupValidator.createGroup),
    checkPermission("Groups", "create"),
    groupController.createGroup
  );

router
  .route("/:groupId")
  .get(
    validate(groupValidator.getGroupById),
    checkPermission("Groups", "read"),
    groupController.getGroupById
  )
  .put(
    validate(groupValidator.updateGroup),
    checkPermission("Groups", "update"),
    groupController.updateGroup
  )
  .delete(
    validate(groupValidator.deleteGroup),
    checkPermission("Groups", "delete"),
    groupController.deleteGroup
  );

router.post(
  "/:groupId/users",
  validate(groupValidator.assignUserToGroup),
  checkPermission("Groups", "update"),
  groupController.assignUserToGroup
);
router.post(
  "/:groupId/roles",
  validate(groupValidator.assignRoleToGroup),
  checkPermission("Groups", "update"),
  groupController.assignRoleToGroup
);

module.exports = router;
