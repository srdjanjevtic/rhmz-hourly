const express = require("express")
const router = express.Router()
const { getAllAdditional } = require('../../controllers/hourly/getRHMZ')

router.get('/', getAllAdditional)

module.exports = router