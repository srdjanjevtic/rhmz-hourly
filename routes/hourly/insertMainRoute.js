const express = require('express');
const router = express.Router();
const insertData = require('../../controllers/hourly/mainStationsController');

router.post('/', insertData);

module.exports = router;