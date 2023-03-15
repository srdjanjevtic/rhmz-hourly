const express = require("express")
const router = express.Router()
const { getClimateRain } = require('../../controllers/rain/getClimateRainStationsController')

router.get('/', getClimateRain)

module.exports = router