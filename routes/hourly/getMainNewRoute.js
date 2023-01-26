const express = require("express")
const router = express.Router()
const { getMainNew } = require('../../controllers/hourly/getRHMZ')

router.post('/', getMainNew)

module.exports = router