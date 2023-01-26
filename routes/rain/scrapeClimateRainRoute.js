const express = require('express')
const router = express.Router()
const {scrapeClimateRain} = require('../../controllers/rain/scrapeController')

router.get('/', scrapeClimateRain)

module.exports = router