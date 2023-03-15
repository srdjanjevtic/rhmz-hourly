const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/searchClimateRain(.ejs)?", (req, res) => {
    res.render(path.join(__dirname, "..", "views", "searchClimateRain.ejs"));
});

module.exports = router;