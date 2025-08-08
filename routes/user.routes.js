const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validate = require("../validators");
const userValidator = require("../validators/user.validator");
const { checkPermission } = require("../middleware/permission.middleware");

router
  .route("/")
  .get(checkPermission("Users", "read"), userController.getAllUsers)

router
  .route("/:userId")
  .get(
    checkPermission("Users", "read"),
    validate(userValidator.getUserById),
    userController.getUserById
  )
  .put(
    checkPermission("Users", "update"),
    validate(userValidator.updateUser),
    userController.updateUser
  )
  .delete(
    checkPermission("Users", "delete"),
    validate(userValidator.deleteUser),
    userController.deleteUser
  );

module.exports = router;
