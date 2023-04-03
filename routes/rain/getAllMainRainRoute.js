const express = require("express");
const router = express.Router();
const { getAllMainRain } = require("../../controllers/rain/getMainRainStationsController.js");

router.get("/", getAllMainRain);

module.exports = router;