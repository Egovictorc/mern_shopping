const jwt = require("jsonwebtoken")
const config = require("config")

function auth(req, res, next) {
    const token = req.header("x-auth-token")

    // check for token
    if (!token) {
        return res.status(401).send({ msg: "No token, authorization denied" });
    }

    try { 
        // verify
        const decoded = jwt.verify(token, config.get("jwtSecret"))

        // add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({msg: "Token is not valid"})
    }
}

module.exports = auth;