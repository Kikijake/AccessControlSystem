const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/module.controller");
const validate = require("../validators");
const moduleValidator = require("../validators/module.validator");
const { checkPermission } = require("../middleware/permission.middleware");

router
  .route("/")
  .get(checkPermission("Modules", "read"), moduleController.getAllModules)
  .post(
    checkPermission("Modules", "create"),
    validate(moduleValidator.createModule),
    moduleController.createModule
  );

router
  .route("/:moduleId")
  .get(
    checkPermission("Modules", "read"),
    validate(moduleValidator.getModuleById),
    moduleController.getModuleById
  )
  .put(
    checkPermission("Modules", "update"),
    validate(moduleValidator.updateModule),
    moduleController.updateModule
  )
  .delete(
    checkPermission("Modules", "delete"),
    validate(moduleValidator.deleteModule),
    moduleController.deleteModule
  );

module.exports = router;
