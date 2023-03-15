const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/allClimateRainStations(.ejs)?', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'allClimateRainStations.ejs'));
});

module.exports = router;