const express = require('express');
const router = express.Router();
const insertData = require('../controllers/additionalStationsController');

router.post('/', insertData);

module.exports = router;