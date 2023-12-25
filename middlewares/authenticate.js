const { HttpError } = require("../helpers")
const jwt = require("jsonwebtoken")
const { User } = require("../models")

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers
        const [bearer, token] = authorization.split(" ")
        if (bearer !== "Bearer" || !token) {
            throw HttpError(400, "Token is required")
        }
        try {
            const { id } = jwt.verify(token, SECRET_KEY)
            const user = await User.findById(id)
            if (!user || !user.token || user.token !== token) {
                throw HttpError(401, "Not authenticated")
            }
            req.user = user
            next()
        } catch (error) {
            throw HttpError(401, "JWT verification failed")
        }
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message || "authenticate: Internal Server Error",
        })
    }
}

module.exports = authenticate
