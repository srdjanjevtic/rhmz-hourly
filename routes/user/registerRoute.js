const express = require("express")
const router = express.Router()
const { registerUser } = require('../../controllers/user/registerController')

router.post('/', registerUser)

module.exports = router