const express = require("express");
const router = express.Router();
const { scrapePrecipitationRain } = require("../../controllers/rain/scrapeController");

router.get("/", scrapePrecipitationRain);

module.exports = router;