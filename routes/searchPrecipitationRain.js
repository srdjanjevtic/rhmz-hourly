const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/searchPrecipitationRain(.ejs)?", (req, res) => {
    res.render(path.join(__dirname, "..", "views", "searchPrecipitationRain.ejs"));
});

module.exports = router;