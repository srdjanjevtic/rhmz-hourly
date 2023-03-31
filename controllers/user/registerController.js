const bcrypt = require("bcrypt")
const User = require("../../model/User")
const asyncHandler = require("express-async-handler")

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, email, roles } = req.body
    if (!username || !password || !email) {
        return res.status(400).json({ message:"Niste popunili sva polja." })
    }
    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message:"Korisnik sa tim korisničkim imenom već postoji." })
    }
    const salt = 10
    const hashedPassword = await bcrypt.hash(password, salt)
    const userObject = { username, "password": hashedPassword, email, roles }
    const user = await User.create(userObject)
    if (user) {
        // return res.status(200).render("index", {username})
        return res.status(201).json({ message: `Novi korisnički nalog ${username} kreiran` })
    } else {
        return res.status(400).json({ message:"Pogrešno uneti podaci." })
    }
})

module.exports = { registerUser }