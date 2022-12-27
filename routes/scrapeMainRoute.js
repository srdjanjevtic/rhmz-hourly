const express = require('express')
const router = express.Router()
const {scrapeMain} = require('../controllers/scrapeController')

router.get('/', scrapeMain)

module.exports = router