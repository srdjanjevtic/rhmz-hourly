const express = require("express");
const router = express.Router();
const { getAllPrecipitationRain } = require("../../controllers/rain/getPrecipitationRainStationsController");

router.get("/", getAllPrecipitationRain);

module.exports = router;