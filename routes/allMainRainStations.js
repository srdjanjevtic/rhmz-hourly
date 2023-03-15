const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/allMainRainStations(.ejs)?', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'allMainRainStations.ejs'));
});

module.exports = router;