const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../validators");
const authValidator = require("../validators/auth.validator");
const { checkPermission } = require("../middleware/permission.middleware");
const { protect } = require("../middleware/auth.middleware");

router.post("/login", validate(authValidator.login), authController.login);
router.use(protect);
router.post("/register",checkPermission("Users", "create"),  validate(authValidator.register), authController.register);

module.exports = router;