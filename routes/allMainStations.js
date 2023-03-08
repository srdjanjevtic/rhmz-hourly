const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/allMainStations(.ejs)?', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'allMainStations.ejs'));
});

module.exports = router;