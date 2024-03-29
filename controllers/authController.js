const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { usersCollection, passwordsCollection } = require("../mongoDBConfig/collections");
const { createDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile");
const { deleteFiles } = require('../utils/fileReadAndDelete');
const { generateOTP } = require('../utils/OTP');

const signup = async (req, res) => {
    try {
        req.body.avatar = uploadFile(req.file?.filename)
        const { password, email } = req.body;
        const dbPassword = await passwordsCollection().findOne({ email })
        if (!dbPassword) {
            delete req.body.password
            const hash = await bcrypt.hash(password, 10);
            const result = await passwordsCollection().insertOne({ hash, email })
            if (result) {
                req.body.otp = generateOTP()
                req.body.otpCreatedTime = new Date().getTime();
                const result2 = await createDoc(req, usersCollection)
                if (result2) {
                    return res.send({ creation: result2, otp: req.body.otp })
                }
                return res.status(500).send({ message: "Account could not be created" })
            }
            res.status(500).send({ message: "Account could not be created" })
        } else {
            if (req.file?.filename) {
                deleteFiles(req.file?.filename)
            }
            res.status(403).send({ message: "This email is already registered" })
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const dbPassword = await passwordsCollection().findOne({ email })
        if (dbPassword) {
            const match = await bcrypt.compare(password, dbPassword.hash);

            if (match) {
                const token = jwt.sign({ user: { email } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
                const user = await usersCollection().findOne({ email })
                return res.status(200).send({ status: 200, message: "Logged in successfully", token, user })
            }
            return res.status(403).send({ status: 403, message: "Password is incorrect" })
        }
        res.status(403).send({ status: 403, message: "This email is not registered" })
    } catch (err) {
        console.log(err)
    }
}

const changePassword = async (req, res) => {
    try {
        const { email } = req.decoded.user
        const { oldPassword, newPassword } = req.body;
        const dbPassword = await passwordsCollection().findOne({ email })
        if (dbPassword) {
            const match = await bcrypt.compare(oldPassword, dbPassword.hash);

            if (match) {
                const hash = await bcrypt.hash(newPassword, 10);
                const result = await passwordsCollection().updateOne({ email }, {
                    $set: { hash }
                })
                return res.status(200).send({ status: 200, message: "Password is changed successfully", result })
            }
            return res.status(403).send({ status: 403, message: "Old password is incorrect" })
        }
        res.status(403).send({ status: 403, message: "This email is not registered" })
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message)
    }
}

const forgotPassword = async (req, res) => {
    console.log(req.headers.authorization);
    // const product = await productsCollection().findOne({ _id: new ObjectId(req.params.id) })
    // deleteFiles(product.image.split("files/")[1])
    // const result = await deleteDoc(req, productsCollection)
    res.send({})
}

const verifyEmail = async (req, res) => {
    const { email, otp } = req.body
    const user = await usersCollection().findOne({ email })
    if (user?.otp === otp) {
        if ((new Date().getTime() - user.otpCreatedTime) < 3600000) {
            const token = jwt.sign({ user: { email } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
            const result = await usersCollection().updateOne({ email }, { $set: { isVerified: true } })
            res.send({result, user, token})
        } else {
            res.send({ error: "expired-otp" })
        }
    } else {
        res.send({ error: "wrong-otp" })
    }
}

const newOTP = async (req, res) => {
    const { email } = req.body
    const otp = generateOTP()
    const otpCreatedTime = new Date().getTime()
    const result = await usersCollection().updateOne({ email }, {
        $set: {
            otp,
            otpCreatedTime
        }
    })
    if (result) {
        res.send({ otp })
    }
}

const isLoggedIn = async (req, res) => {
    try {
        const { email } = req.decoded.user
        const user = await usersCollection().findOne({ email })
        res.status(200).send({ status: 200, message: 'logged in', user })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    signup,
    login,
    changePassword,
    forgotPassword,
    isLoggedIn,
    verifyEmail,
    newOTP,
}