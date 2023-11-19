require("dotenv").config()

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.izymjcc.mongodb.net/?retryWrites=true&w=majority`

module.exports = URI