const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../validators");
const authValidator = require("../validators/auth.validator");
const { checkPermission } = require("../middleware/permission.middleware");

router.post("/register",checkPermission("Users", "create"),  validate(authValidator.register), authController.register);
router.post("/login", validate(authValidator.login), authController.login);

module.exports = router;