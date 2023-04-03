const express = require("express");
const router = express.Router();
const { checkAuth } = require("../../controllers/user/authController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.get("/", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), checkAuth);

module.exports = router;