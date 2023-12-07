const jwt = require("jsonwebtoken")

function verifyJWT(req, res, next, role) {
    const { authorization: authHeader } = req.headers
    if (!authHeader) {
        return res.status(401).send({ status: 401, message: 'Unauthorized access' })
    }
    if (authHeader.split(" ")[0] === role) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).send({ status: 401, message: err.message })
            }
            req.decoded = decoded
            next()
        })
    } else {
        return res.status(401).send({ status: 401, message: 'Unauthorized access' })
    }
}

function verifyOwner(req, res, next) {
    verifyJWT(req, res, next, "Owner")
}

function verifyAdmin(req, res, next) {
    verifyJWT(req, res, next, "Admin")
}

function verifyUser(req, res, next) {
    verifyJWT(req, res, next, "Bearer")
}

module.exports = {
    verifyOwner,
    verifyAdmin,
    verifyUser,
}