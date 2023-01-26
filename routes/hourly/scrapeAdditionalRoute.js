const express = require('express')
const router = express.Router()
const {scrapeAdditional} = require('../../controllers/hourly/scrapeController')

router.get('/', scrapeAdditional)

module.exports = router