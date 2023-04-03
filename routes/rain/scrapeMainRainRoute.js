const express = require("express");
const router = express.Router();
const { scrapeMainRain } = require("../../controllers/rain/scrapeController");

router.get("/", scrapeMainRain);

module.exports = router;