const express = require("express");
const router = express.Router();
const { refreshToken } = require("../../controllers/user/authController");

router.get("/", refreshToken);

module.exports = router;