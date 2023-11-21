const bcrypt = require('bcrypt');
const { usersCollection, passwordsCollection } = require("../mongoDBConfig/collections")
const { createDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")

const signup = async (req, res) => {
    try {
        req.body.avatar = uploadFile(req.file?.filename)
        const { password, email } = req.body;
        delete req.body.password
        const hash = await bcrypt.hash(password, 10);
        const result = await passwordsCollection().insertOne({ hash, email })
        const result2 = await createDoc(req, usersCollection)
        res.send(result2)
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message)
    }
}

const changePassword = async (req, res) => {
    try {
        const { password, email } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const result = await passwordsCollection().updateOne({ email }, {
            $set: { password: hash }
        })
        res.send(result)
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message)
    }
}

const forgotPassword = async (req, res) => {
    // const product = await productsCollection().findOne({ _id: new ObjectId(req.params.id) })
    // deleteFiles(product.image.split("files/")[1])
    // const result = await deleteDoc(req, productsCollection)
    res.send({})
}

const login = async (req, res) => {
    const { email, password } = req.body
    const dbPassword = await passwordsCollection().findOne({ email: email })
    if (dbPassword) {
        const match = await bcrypt.compare(password, dbPassword.hash);

        if (match) {
            return res.status(200).send({ status: 200, message: "Your account is created successfully" })
        }
        return res.status(401).send({ status: 401, message: "Password is incorrect" })
    }
    res.status(401).send({ status: 401, message: "This email is not registered" })
}

module.exports = {
    signup,
    login,
    changePassword,
    forgotPassword,
}