const bcrypt = require("bcrypt")
const User = require("../../model/User")
const asyncHandler = require("express-async-handler")

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean()
    if (!users?.length) {
        return res.status(400).json({ message: "Nema korisnika u bazi." })
    }
    res.json({ users, total: `${users.length} korisnika u bazi.`})
})

// @desc Update an user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email, roles, active, password } = req.body
    // Confirm data
    if (!id || !username || !email || !roles || typeof active !== "boolean") {
        return res.status(400).json({message: "Potrebno je popuniti sva polja."})
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({message:"Korisnik nije pronađen!"})
    }
    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()
    // Allow updates to original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message:"Dupli nalog!"})
    }
    user.username = username
    user.email = email
    user.roles = roles
    user.active = active
    if (password) {
        const salt = 10
        user.password = await bcrypt.hash(password, salt)
    }
    const updatedUser = await user.save()
    res.json({message:`${updatedUser.username} updated`})
})

// @desc Delete an user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message:"Potreban je ID korisnika!"})
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "Korisnik nije nađen" })
    }
    const deletedUser = await user.deleteOne()
    const reply = `Korisnik ${deletedUser.username} sa ID_jem ${deletedUser._id} je obrisan iz baze`
    res.json(reply)
})

module.exports = { getAllUsers, updateUser, deleteUser }