const express = require("express")
const router = express.Router()
const { getMainRain } = require('../../controllers/rain/getMainRainStationsController')

router.get('/', getMainRain)

module.exports = router