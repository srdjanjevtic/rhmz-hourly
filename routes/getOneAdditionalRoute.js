const express = require("express")
const router = express.Router()
const { getOneAdditional } = require('../controllers/getRHMZ')

router.get('/', getOneAdditional)

module.exports = router