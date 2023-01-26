const express = require("express")
const router = express.Router()
const { getMain } = require('../../controllers/hourly/getRHMZ')

router.get('/', getMain)

module.exports = router