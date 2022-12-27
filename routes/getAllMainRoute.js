const express = require("express")
const router = express.Router()
const { getAllMain } = require('../controllers/getRHMZ')

router.get('/', getAllMain)

module.exports = router