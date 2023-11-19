const express = require("express")
const cors = require("cors")
const { connect } = require("./mongoDBConfig/mongoClient")
const productsRouter = require("./routes/productsRouter")

const port = process.env.PORT || 5000
const app = express()

// middlewares
app.use(cors())
app.use(express.json())

connect()
    .then(() => {
        // products routes
        app.use("/products", productsRouter)
    })
    .catch(err => console.log(err))

app.get("/", (_, res) => {
    res.send("Server is running")
})

app.listen(port, () => console.log("Server is running on port:", port))