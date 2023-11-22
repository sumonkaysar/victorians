const jwt = require("jsonwebtoken")

function verifyJWT(req, res, next) {
    const { authorization: authHeader } = req.headers
    if (!authHeader) {
        return res.status(401).send({ status: 401, message: 'Unauthorized access' })
    }
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).send({ status: 401, message: err.message })
        }
        req.decoded = decoded
        next()
    })
}

module.exports = {
    verifyJWT,
}