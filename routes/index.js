const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/auth.middleware");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const groupRoutes = require("./group.routes");
const roleRoutes = require("./role.routes");
const moduleRoutes = require("./module.routes");
const permissionRoutes = require("./permission.routes");

router.use("/auth", authRoutes);

router.use(protect);
router.use("/users", userRoutes);
router.use("/groups", groupRoutes);
router.use("/roles", roleRoutes);
router.use("/modules", moduleRoutes);
router.use("/permissions", permissionRoutes);


module.exports = router;
