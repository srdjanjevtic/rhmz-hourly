const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/allAdditionalStations(.ejs)?', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'allAdditionalStations.ejs'));
});

module.exports = router;