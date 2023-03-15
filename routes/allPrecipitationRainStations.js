const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/allPrecipitationRainStations(.ejs)?', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'allPrecipitationRainStations.ejs'));
});

module.exports = router;