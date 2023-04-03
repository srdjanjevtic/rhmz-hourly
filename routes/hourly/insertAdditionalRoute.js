const express = require("express");
const router = express.Router();
const insertData = require("../../controllers/hourly/additionalStationsController");

router.post("/", insertData);

module.exports = router;