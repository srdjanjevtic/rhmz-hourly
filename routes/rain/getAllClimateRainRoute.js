const express = require("express")
const router = express.Router()
const { getAllClimateRain } = require('../../controllers/rain/getClimateRainStationsController')

router.get('/', getAllClimateRain)

module.exports = router