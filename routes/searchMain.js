const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/searchMain(.ejs)?', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'searchMain.ejs'));
});

module.exports = router;