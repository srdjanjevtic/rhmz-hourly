const express = require("express")
const router = express.Router()
const { getAdditional } = require('../../controllers/hourly/getRHMZ')

router.get('/', getAdditional)

module.exports = router