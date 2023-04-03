const express = require("express");
const router = express.Router();
const { getPrecipitationRain } = require("../../controllers/rain/getPrecipitationRainStationsController");

router.get("/", getPrecipitationRain);

module.exports = router;