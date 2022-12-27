const express = require("express")
const router = express.Router()
const { getOneMain } = require('../controllers/getRHMZ')

router.get('/', getOneMain)

module.exports = router