const User = require("../../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const handleLogin = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ "message": "Neophodno je uneti i korisničko ime i lozinku " })
    const foundUser = await User.findOne({ username: username }).exec()
    if (!foundUser) return res.status(401).json({ message: "Korisnik ne postoji!"}) // Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        const roles = Object.values(foundUser.roles)
        // create JWT
        const accessToken = jwt.sign(
            { "UserInfo": { "username": foundUser.username, "roles": roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        )
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        console.log(result)
        res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 }) // secure: true, => necessary in browser
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
}

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    const refreshToken = cookies.jwt
    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec()
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
        return res.sendStatus(204)
    }
    // Delete refreshToken in db
    foundUser.refreshToken = ""
    const result = await foundUser.save()
    console.log(result)
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    res.sendStatus(204)
}

const refreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({ refreshToken }).exec()
    if (!foundUser) return res.sendStatus(403) //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30s" }
            )
            res.json({ accessToken })
        }
    )
}

const checkAuth = async (req, res) => {
    res.status(200).render("checkAuth.ejs")
}

module.exports = { handleLogin, handleLogout, refreshToken, checkAuth }