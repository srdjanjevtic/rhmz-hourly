const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/searchAdditional(.ejs)?", (req, res) => {
    res.render(path.join(__dirname, "..", "views", "searchAdditional.ejs"));
});

module.exports = router;