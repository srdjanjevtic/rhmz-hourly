const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/searchMainRain(.ejs)?", (req, res) => {
    res.render(path.join(__dirname, "..", "views", "searchMainRain.ejs"));
});

module.exports = router;