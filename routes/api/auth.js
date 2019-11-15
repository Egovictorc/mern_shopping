const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const config = require("config")
const jwt = require("jsonwebtoken")


const auth = require("../../middleware/auth")

// User Model
const User = require("../../models/User")
// te POST api/AuthenticatorAssertionResponse@
router.post("/", (req, res) => {
    const { email, password } = req.body;
    // simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: "please enter all fields" })
    }
    // check for existing user
    User.findOne({ email })
        .then((user) => {
            if (!user) return res.status(400).json({ msg: "user does not exist" })

            // validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })
                    jwt.sign(
                        { id: user.id },
                        config.get("jwtSecret"),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })



})
// @route GET api/auth/user
// @desc Get user data
// @access Private

router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
    .select("-password")
    .then( user => res.json(user))
})


module.exports = router;